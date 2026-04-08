"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GCSigil } from "@/components/gc-sigil";
import { MODULES } from "@/lib/training/data";
import { PASS_THRESHOLD } from "@/lib/training/constants";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const moduleIndex = parseInt(params.index as string, 10);

  const [lang, setLang] = useState("en");
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showRubric, setShowRubric] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Current answer state for this question
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const modules = MODULES(lang);
  const mod = modules[moduleIndex];
  const quiz = mod?.quiz;
  const question = quiz?.questions[questionIdx];
  const isScenario = question?.type === "scenario";
  const isLastQuestion = questionIdx === (quiz?.questions.length ?? 0) - 1;
  const L = lang === "en";

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/auth/login"); return; }
      setUserId(user.id);
      // Get language from profile
      const { data: profile } = await supabase
        .from("profiles").select("language").eq("id", user.id).single();
      if (profile?.language) setLang(profile.language);
      // Get session
      const { data: session } = await supabase
        .from("training_sessions").select("id").eq("user_id", user.id).single();
      if (session) setSessionId(session.id);
    });
  }, [router]);

  if (!mod || !quiz || !question) return null;

  function handleConfirm() {
    if (selected === null && !isScenario) return;
    setConfirmed(true);
    if (!isScenario && selected === question.a) {
      setScore((s) => s + 1);
    }
  }

  async function handleNext() {
    if (isLastQuestion) {
      await submitResults();
    } else {
      setQuestionIdx((i) => i + 1);
      setSelected(null);
      setConfirmed(false);
      setShowRubric(false);
    }
  }

  async function submitResults() {
    console.log('submitResults started', { userId, sessionId });
    if (!userId || submitting) return;
    setSubmitting(true);

    try {
      const supabase = createClient();
      const passed = score >= PASS_THRESHOLD;
      const moduleLabel = mod.label;

      // Ensure training_session exists; create if not
      let activeSessionId = sessionId;
      if (!activeSessionId) {
        let existingSession = null;
        try {
          const { data, error } = await supabase
            .from("training_sessions")
            .select("id")
            .eq("user_id", userId)
            .single();
          console.log('session SELECT result', { data, error });
          existingSession = data;
        } catch (err) {
          console.error('session SELECT threw:', err);
        }

        if (existingSession) {
          activeSessionId = existingSession.id;
        } else {
          try {
            const { data: newSession, error } = await supabase
              .from("training_sessions")
              .insert({ user_id: userId, started_at: new Date().toISOString() })
              .select("id")
              .single();
            console.log('session INSERT result', { data: newSession, error });
            activeSessionId = newSession?.id ?? null;
          } catch (err) {
            console.error('session INSERT threw:', err);
          }
        }

        if (activeSessionId) setSessionId(activeSessionId);
      }

      console.log('activeSessionId after session block:', activeSessionId);

      if (!activeSessionId) {
        console.error('No activeSessionId — aborting');
        setSubmitting(false);
        return;
      }

      // Fetch existing module_progress row
      let existing = null;
      try {
        const { data, error } = await supabase
          .from("module_progress")
          .select("*")
          .eq("session_id", activeSessionId)
          .eq("module_index", moduleIndex)
          .single();
        console.log('module_progress SELECT result', { data, error });
        existing = data;
      } catch (err) {
        console.error('module_progress SELECT threw:', err);
      }

      const newBestScore = Math.max(existing?.best_score ?? 0, score);
      const wasAlreadyPassed = existing?.passed ?? false;
      const nowPassed = wasAlreadyPassed || passed;

      console.log('upsert payload', {
        session_id: activeSessionId,
        module_index: moduleIndex,
        module_label: moduleLabel,
        best_score: newBestScore,
        passed: nowPassed,
        attempts: (existing?.attempts ?? 0) + 1,
      });

      try {
        const { data, error } = await supabase.from("module_progress").upsert({
          session_id: activeSessionId,
          module_index: moduleIndex,
          module_label: moduleLabel,
          best_score: newBestScore,
          total_questions: 3,
          passed: nowPassed,
          attempts: (existing?.attempts ?? 0) + 1,
          last_attempted_at: new Date().toISOString(),
          passed_at: nowPassed && !wasAlreadyPassed ? new Date().toISOString() : (existing?.passed_at ?? null),
        }, { onConflict: "session_id,module_index" });
        console.log('module_progress UPSERT result', { data, error });
      } catch (err) {
        console.error('module_progress UPSERT threw:', err);
      }

      // Check if all 6 modules passed
      let allProgress = null;
      try {
        const { data, error } = await supabase
          .from("module_progress")
          .select("*")
          .eq("session_id", activeSessionId);
        console.log('all_progress SELECT result', { data, error });
        allProgress = data;
      } catch (err) {
        console.error('all_progress SELECT threw:', err);
      }

      const progressMap = new Map((allProgress ?? []).map((p: any) => [p.module_index, p]));
      progressMap.set(moduleIndex, {
        ...(progressMap.get(moduleIndex) ?? {}),
        passed: nowPassed,
        best_score: newBestScore,
      });
      const trulyAllPassed = [0, 1, 2, 3, 4, 5].every((i) => progressMap.get(i)?.passed);
      console.log('trulyAllPassed:', trulyAllPassed, 'progressMap:', Object.fromEntries(progressMap));

      if (trulyAllPassed) {
        let existingCert = null;
        try {
          const { data, error } = await supabase
            .from("certificates")
            .select("id")
            .eq("session_id", activeSessionId)
            .single();
          console.log('certificate SELECT result', { data, error });
          existingCert = data;
        } catch (err) {
          console.error('certificate SELECT threw:', err);
        }

        if (!existingCert) {
          let totalScore = 0;
          for (let i = 0; i < 6; i++) {
            totalScore += progressMap.get(i)?.best_score ?? 0;
          }

          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, language")
            .eq("id", userId)
            .single();

          try {
            const { data, error } = await supabase.from("certificates").insert({
              session_id: activeSessionId,
              user_id: userId,
              participant_name: profile?.full_name ?? "",
              overall_score: totalScore,
              overall_total: 18,
              language: profile?.language ?? "en",
            });
            console.log('certificate INSERT result', { data, error });
          } catch (err) {
            console.error('certificate INSERT threw:', err);
          }

          await supabase
            .from("training_sessions")
            .update({ completed_at: new Date().toISOString() })
            .eq("id", activeSessionId);
        }
      }

      console.log('redirecting to /result/' + moduleIndex);
      router.push(`/result/${moduleIndex}`);

    } catch (err) {
      console.error('submitResults failed:', err);
      setSubmitting(false);
    }
  }

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen bg-gc-dark-blue text-gc-cream">
      {/* Header */}
      <header className="border-b border-gc-mid-blue px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GCSigil size={28} />
          <div>
            <p className="text-gc-gold font-sans text-xs tracking-[0.25em]">GRANDE CHARTE</p>
            <p className="text-gc-dim font-sans text-xs tracking-widest">
              {L ? "MODULE" : "MODULE"} {mod.number} · {L ? "VERIFICATION" : "VÉRIFICATION"}
            </p>
          </div>
        </div>
        {/* Progress dots */}
        <div className="flex gap-2">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < questionIdx
                  ? "bg-gc-gold"
                  : i === questionIdx
                  ? "bg-gc-gold ring-2 ring-gc-gold/30"
                  : "bg-gc-mid-blue"
              }`}
            />
          ))}
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 md:px-6 py-12">
        {/* Question number */}
        <p className="font-sans text-xs tracking-[0.3em] text-gc-dim mb-5">
          {isScenario
            ? (L ? "SCENARIO · SELF-ASSESSMENT" : "SCÉNARIO · AUTO-ÉVALUATION")
            : `${L ? "QUESTION" : "QUESTION"} ${questionIdx + 1} / 3`}
        </p>

        {/* Question */}
        <h2 className="font-serif text-xl md:text-2xl text-gc-cream leading-relaxed mb-8">
          {question.q}
        </h2>

        {/* MCQ options */}
        {!isScenario && question.opts && (
          <div className="space-y-3 mb-8">
            {question.opts.map((opt, i) => {
              let borderClass = "border-gc-mid-blue hover:border-gc-gold";
              let textClass = "text-gc-cream";
              let bgClass = "";

              if (confirmed) {
                if (i === question.a) {
                  borderClass = "border-gc-green";
                  bgClass = "bg-gc-green/10";
                  textClass = "text-gc-green";
                } else if (i === selected && i !== question.a) {
                  borderClass = "border-gc-red";
                  bgClass = "bg-gc-red/10";
                  textClass = "text-gc-red";
                } else {
                  borderClass = "border-gc-mid-blue/40";
                  textClass = "text-gc-dim";
                }
              } else if (selected === i) {
                borderClass = "border-gc-gold";
                bgClass = "bg-gc-gold/10";
              }

              return (
                <button
                  key={i}
                  onClick={() => !confirmed && setSelected(i)}
                  disabled={confirmed}
                  className={`w-full flex items-center gap-4 px-5 py-4 border text-left transition-colors ${borderClass} ${bgClass} ${confirmed ? "cursor-default" : "cursor-pointer"}`}
                >
                  <span className={`font-sans text-xs tracking-widest flex-shrink-0 w-5 ${textClass}`}>
                    {optionLetters[i]}
                  </span>
                  <span className={`font-serif text-sm leading-relaxed ${textClass}`}>{opt}</span>
                  {confirmed && i === question.a && (
                    <svg className="ml-auto flex-shrink-0 text-gc-green" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Explanation after confirm */}
        {confirmed && !isScenario && question.exp && (
          <div className="mb-8 border-l-2 border-gc-gold pl-4 py-1">
            <p className="font-sans text-xs tracking-widest text-gc-gold mb-2">
              {L ? "EXPLANATION" : "EXPLICATION"}
            </p>
            <p className="font-serif text-sm text-gc-cream leading-relaxed">{question.exp}</p>
          </div>
        )}

        {/* Scenario rubric */}
        {isScenario && (
          <div className="mb-8">
            <button
              onClick={() => setShowRubric(!showRubric)}
              className="w-full border border-gc-mid-blue px-5 py-4 text-left hover:border-gc-gold transition-colors flex items-center justify-between"
            >
              <span className="font-sans text-xs tracking-widest text-gc-cream">
                {L ? "SHOW RESPONSE CRITERIA" : "AFFICHER LES CRITÈRES DE RÉPONSE"}
              </span>
              <span className="text-gc-gold">{showRubric ? "−" : "+"}</span>
            </button>

            {showRubric && question.rubric && (
              <div className="border border-gc-mid-blue border-t-0 px-5 pb-5 pt-4 bg-gc-mid-blue/10">
                <p className="font-sans text-xs tracking-widest text-gc-gold mb-4">
                  {L ? "RESPONSE CRITERIA" : "CRITÈRES DE RÉPONSE"}
                </p>
                <ol className="space-y-3">
                  {question.rubric.map((line, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-sans text-xs text-gc-gold flex-shrink-0 mt-0.5">{i + 1}.</span>
                      <span className="font-serif text-sm text-gc-cream leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Confirm / Next buttons */}
        <div className="flex justify-end gap-3">
          {!isScenario && !confirmed && (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className="border border-gc-gold text-gc-gold px-6 py-3 font-sans text-xs tracking-widest hover:bg-gc-gold hover:text-gc-dark-blue transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {L ? "CONFIRM" : "CONFIRMER"}
            </button>
          )}

          {(confirmed || isScenario) && (
            <button
              onClick={handleNext}
              disabled={submitting}
              className="bg-gc-gold text-gc-dark-blue px-6 py-3 font-sans text-xs tracking-widest hover:bg-gc-cream transition-colors disabled:opacity-50"
            >
              {submitting
                ? (L ? "SAVING…" : "ENREGISTREMENT…")
                : isLastQuestion
                ? (L ? "SEE RESULTS →" : "VOIR LES RÉSULTATS →")
                : isScenario
                ? (L ? "UNDERSTOOD. CONTINUE. →" : "COMPRIS. CONTINUER. →")
                : (L ? "NEXT →" : "SUIVANT →")}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
