import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Use the Neon pooled connection string which is recommended for serverless
    url: process.env.AUTH_DRIZZLE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL || "",
  },
});