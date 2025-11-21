import { auth } from "@/auth";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return new Response("Not authenticated", { status: 401 });
  }

  try {
    // Query user from database to verify Drizzle integration
    const dbUser = await db.select().from(users).where(eq(users.id, session.user?.id!)).limit(1);

    return new Response(JSON.stringify({
      message: `Hello ${session.user?.name || session.user?.email}!`,
      userId: session.user?.id,
      userEmail: session.user?.email,
      userInDb: dbUser.length > 0, // This will be true if user exists in database
      dbUserDetails: dbUser[0] || null
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database query error:", error);

    return new Response(JSON.stringify({
      message: `Hello ${session.user?.name || session.user?.email}! (Note: Database verification failed)`,
      userId: session.user?.id,
      userEmail: session.user?.email,
      error: error instanceof Error ? error.message : String(error)
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}