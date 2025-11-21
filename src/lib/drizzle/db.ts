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

export const connection = globalForDb.connection ?? postgres(connectionString, {
  max: 20,
  // Ensure SSL is properly configured for Neon
  ssl: { rejectUnauthorized: false },
});
export const db = drizzle(connection);

if (process.env.NODE_ENV !== "production") globalForDb.connection = connection;