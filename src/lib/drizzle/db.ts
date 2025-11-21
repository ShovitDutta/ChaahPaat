import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// For production, we don't want to recreate the connection on every request
const globalForDb = globalThis as unknown as {
  connection: postgres.Sql | undefined;
};

// Using a single connection for the development environment
// In production, we might want to use a connection pool
const connectionString = process.env.AUTH_DRIZZLE_URL || process.env.DATABASE_URL!;

export const connection = globalForDb.connection ?? postgres(connectionString, { max: 20 });
export const db = drizzle(connection);

if (process.env.NODE_ENV !== "production") globalForDb.connection = connection;