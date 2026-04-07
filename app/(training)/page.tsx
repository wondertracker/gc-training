export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/training/data";
import type { ModuleProgress, TrainingSession } from "@/lib/training/types";
import { HomeClient } from "./home-client";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const lang = profile?.language ?? "en";

  // Fetch or create training session
  let { data: session } = await supabase
    .from("training_sessions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!session) {
    const { data: newSession } = await supabase
      .from("training_sessions")
      .insert({ user_id: user.id, language: lang })
      .select()
      .single();
    session = newSession;
  }

  // Fetch module progress
  let progress: ModuleProgress[] = [];
  if (session) {
    const { data } = await supabase
      .from("module_progress")
      .select("*")
      .eq("session_id", session.id)
      .order("module_index");
    progress = data ?? [];
  }

  // Check for certificate
  let certificate = null;
  if (session) {
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .eq("session_id", session.id)
      .single();
    certificate = data;
  }

  const modules = MODULES(lang);

  return (
    <HomeClient
      profile={profile}
      session={session}
      progress={progress}
      certificate={certificate}
      modules={modules}
      lang={lang}
      userId={user.id}
    />
  );
}
