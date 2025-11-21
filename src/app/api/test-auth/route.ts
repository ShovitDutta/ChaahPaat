import { auth } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return new Response("Not authenticated", { status: 401 });
  }

  return new Response(`Hello ${session.user?.name || session.user?.email}! Your user ID is: ${session.user?.id}`, {
    status: 200,
  });
}