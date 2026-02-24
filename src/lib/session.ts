import "server-only";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import type { SessionPayload } from "@/lib/auth";

export type { SessionPayload };

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  return verifySession(token);
}
