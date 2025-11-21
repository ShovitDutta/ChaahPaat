import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// For production, we don't want to recreate the connection on every request
const globalForDb = globalThis as unknown as {
  connection: postgres.Sql | undefined;
};

// Use appropriate connection string for Neon
// For serverless environments like Vercel, use the pooled connection string
const connectionString =
  process.env.AUTH_DRIZZLE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL!;

// Neon/PostgreSQL connection options
const connectionOptions = {
  max: 20,
  ssl: { rejectUnauthorized: false },
  // Ensure prepared statements work properly
  prepare: false, // Disable prepared statements to match Neon requirements
};

export const connection = globalForDb.connection ?? postgres(connectionString, connectionOptions);
export const db = drizzle(connection, { logger: true }); // Enable logger to see actual queries

if (process.env.NODE_ENV !== "production") globalForDb.connection = connection;