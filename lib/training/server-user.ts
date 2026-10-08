import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function trainingUser() {
  const s = await createClient();
  const {
    data: { user },
  } = await s.auth.getUser();
  if (!user) redirect("/auth/login");
  return user;
}
export function moduleIndex(raw: string) {
  return /^[0-5]$/.test(raw) ? Number(raw) : null;
}
