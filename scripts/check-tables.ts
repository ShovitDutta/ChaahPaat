// scripts/check-tables.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

async function checkTables() {
  const connectionString = process.env.AUTH_DRIZZLE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL!;

  const connection = postgres(connectionString, {
    ssl: { rejectUnauthorized: false },
    max: 5,
  });

  const db = drizzle(connection);

  try {
    console.log('Checking database tables...');
    
    // Get list of tables in the database
    const result = await connection`
      SELECT table_name, table_schema 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'accounts', 'sessions', 'verification_tokens')
      ORDER BY table_name;
    `;
    
    console.log('Tables found in public schema:', result);
    
    if (result.length === 0) {
      console.log('No Auth.js tables found in public schema. They might be in a different schema.');
      
      // Check all schemas
      const allTables = await connection`
        SELECT table_name, table_schema 
        FROM information_schema.tables 
        WHERE table_name IN ('users', 'accounts', 'sessions', 'verification_tokens')
        ORDER BY table_schema, table_name;
      `;
      
      console.log('All Auth.js related tables found:', allTables);
    }
    
    // Check if drizzle migration table exists
    const migrations = await connection`
      SELECT table_name, table_schema 
      FROM information_schema.tables 
      WHERE table_name = '__drizzle_migrations';
    `;
    
    console.log('Migration table found:', migrations);
    
    await connection.end();
  } catch (error) {
    console.error('Error checking tables:', error);
    await connection.end();
  }
}

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

checkTables();