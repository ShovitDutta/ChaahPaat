import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./src/lib/drizzle/db";

console.log("Starting migration...");

const runMigrations = async () => {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

runMigrations();