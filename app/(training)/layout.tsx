export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TrainingShell } from "@/components/training-shell";
export default async function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) redirect("/auth/login");
  const { data: profile } = await client
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  return (
    <TrainingShell admin={profile?.role === "admin"}>{children}</TrainingShell>
  );
}
