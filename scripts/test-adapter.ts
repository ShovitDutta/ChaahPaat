// scripts/test-adapter.ts
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../src/lib/drizzle/db";
import { users, accounts } from "../src/lib/drizzle/schema";

// Test creating the adapter to see if it works
try {
  const adapter = DrizzleAdapter(db);
  console.log("✅ DrizzleAdapter created successfully");
  
  // The adapter should have methods for all Auth.js operations
  console.log("Adapter methods available:", Object.keys(adapter));
  
  // Test one of the adapter functions directly
  if (adapter.getUser) {
    console.log("✅ getUser method is available");
  } else {
    console.log("❌ getUser method is missing");
  }
  
  if (adapter.linkAccount) {
    console.log("✅ linkAccount method is available");
  } else {
    console.log("❌ linkAccount method is missing");
  }
  
} catch (error) {
  console.error("❌ Error creating DrizzleAdapter:", error);
}