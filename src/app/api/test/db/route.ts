import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";

export async function GET() {
  try {
    // Test database connection by querying users table
    const userCountResult = await db.select({ count: users.id }).from(users).limit(1);

    return new Response(JSON.stringify({
      success: true,
      message: 'Database connection successful!',
      userCount: userCountResult.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}