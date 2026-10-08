import { NextResponse } from "next/server";
import { sameOrigin } from "@/lib/training/request-origin";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { MODULES } from "@/lib/training/data";
import { scoreAnswers, nextProgress } from "@/lib/training/scoring";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  const auth = await createClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user)
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  const body = await request.json().catch(() => null);
  if (
    !body ||
    !Number.isInteger(body.index) ||
    body.index < 0 ||
    body.index > 5 ||
    (body.language !== "fr" && body.language !== "en") ||
    typeof body.scenario !== "string" ||
    body.scenario.trim().length < 60 ||
    body.scenario.length > 12000 ||
    body.reviewed !== true
  )
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  const trainingModule = MODULES(body.language)[body.index];
  const score = scoreAnswers(trainingModule, body.answers);
  if (score === null)
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  try {
    // IDs, scores and certificate totals are derived here, never trusted from the browser.
    const s = createAdminClient();
    const { error: sessionInsert } = await s
      .from("training_sessions")
      .upsert(
        { user_id: user.id, language: body.language },
        { onConflict: "user_id", ignoreDuplicates: true },
      );
    if (sessionInsert) throw sessionInsert;
    const { data: session, error: sessionRead } = await s
      .from("training_sessions")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (sessionRead || !session)
      throw sessionRead || new Error("Missing session");
    const now = new Date().toISOString();
    let saved = false;
    for (let retry = 0; retry < 4 && !saved; retry++) {
      const { data: previous, error: readError } = await s
        .from("module_progress")
        .select("id,module_label,best_score,attempts,passed,passed_at")
        .eq("session_id", session.id)
        .eq("module_index", body.index)
        .maybeSingle();
      if (readError) throw readError;
      const patch = {
        ...nextProgress(previous, score, now),
        module_label: previous?.module_label || trainingModule.label,
        total_questions: 3,
      };
      if (previous) {
        const { data, error } = await s
          .from("module_progress")
          .update(patch)
          .eq("id", previous.id)
          .eq("attempts", previous.attempts)
          .select("id");
        if (error) throw error;
        saved = Boolean(data?.length);
      } else {
        const { error } = await s
          .from("module_progress")
          .insert({
            ...patch,
            session_id: session.id,
            module_index: body.index,
          });
        if (error && error.code !== "23505") throw error;
        saved = !error;
      }
    }
    if (!saved)
      return NextResponse.json(
        { error: "Concurrent submission. Please retry." },
        { status: 409 },
      );
    const { data: progress, error: progressError } = await s
      .from("module_progress")
      .select("module_index,best_score,passed")
      .eq("session_id", session.id);
    if (progressError) throw progressError;
    let certificateId: string | null = null;
    let certificatePending = false;
    if (
      [0, 1, 2, 3, 4, 5].every(
        (i) => progress?.find((p) => p.module_index === i)?.passed,
      )
    ) {
      const { data: existing, error: existingError } = await s
        .from("certificates")
        .select("id")
        .eq("session_id", session.id)
        .maybeSingle();
      if (existingError) throw existingError;
      certificateId = existing?.id || null;
      if (!certificateId) {
        const { data: profile } = await s
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle();
        const { data: created, error } = await s
          .from("certificates")
          .insert({
            session_id: session.id,
            user_id: user.id,
            participant_name:
              profile?.full_name || user.user_metadata?.full_name || "",
            overall_score: progress!.reduce((sum, p) => sum + p.best_score, 0),
            overall_total: 18,
            language: body.language,
          })
          .select("id")
          .single();
        if (error?.code === "23505") {
          const { data } = await s
            .from("certificates")
            .select("id")
            .eq("session_id", session.id)
            .single();
          certificateId = data?.id || null;
        } else if (error) {
          certificatePending = true;
        } else certificateId = created.id;
      }
      if (certificateId) {
        const { error } = await s
          .from("training_sessions")
          .update({ completed_at: now })
          .eq("id", session.id)
          .is("completed_at", null);
        if (error) certificatePending = true;
      }
    }
    return NextResponse.json({
      score,
      bestScore: progress?.find((p) => p.module_index === body.index)
        ?.best_score,
      certificateId,
      certificatePending,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not save results. Please retry." },
      { status: 503 },
    );
  }
}
