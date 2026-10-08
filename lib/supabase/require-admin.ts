import { redirect } from "next/navigation";
import { createClient } from "./server";
import { createAdminClient } from "./admin";
export async function requireAdmin() {
  const s = await createClient();
  const {
    data: { user },
  } = await s.auth.getUser();
  if (!user) redirect("/auth/login");
  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") redirect("/");
  return admin;
}
