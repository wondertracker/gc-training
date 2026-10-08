export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Programme } from "@/components/programme";
export default async function HomePage() {
  const s = await createClient();
  const {
    data: { user },
  } = await s.auth.getUser();
  if (!user) redirect("/auth/login");
  const [{ data: profile }, { data: session, error: sessionError }] =
    await Promise.all([
      s.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
      s
        .from("training_sessions")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle(),
    ]);
  const [
    { data: progress, error: progressError },
    { data: certificate, error: certificateError },
  ] = session
    ? await Promise.all([
        s.from("module_progress").select("*").eq("session_id", session.id),
        s
          .from("certificates")
          .select("*")
          .eq("session_id", session.id)
          .maybeSingle(),
      ])
    : [
        { data: [], error: null },
        { data: null, error: null },
      ];
  return (
    <Programme
      name={profile?.full_name}
      progress={progress || []}
      certificate={certificate}
      error={
        sessionError || progressError || certificateError ? "load" : undefined
      }
    />
  );
}
