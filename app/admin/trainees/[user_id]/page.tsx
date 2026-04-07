export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MODULE_NUMBERS } from "@/lib/training/constants";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
}
function formatDateShort(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

const moduleLabels = [
  "Origin & Doctrine",
  "The Collections",
  "Iroise 769 — In Depth",
  "The Conversation",
  "Custodians & Experience",
  "International Presence",
];

export default async function TraineeDetailPage({ params }: { params: { user_id: string } }) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.user_id)
    .single();

  if (!profile) notFound();

  const { data: session } = await supabase
    .from("training_sessions")
    .select("*")
    .eq("user_id", params.user_id)
    .single();

  let progress: any[] = [];
  if (session) {
    const { data } = await supabase
      .from("module_progress")
      .select("*")
      .eq("session_id", session.id)
      .order("module_index");
    progress = data ?? [];
  }

  let certificate = null;
  if (session) {
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .eq("session_id", session.id)
      .single();
    certificate = data;
  }

  const modulesPassed = progress.filter((p) => p.passed).length;
  const overallScore = progress.reduce((sum, p) => sum + (p.best_score ?? 0), 0);

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/trainees" className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-cream transition-colors block mb-4">
          ← ALL TRAINEES
        </Link>
        <h1 className="font-serif text-2xl text-gc-cream mb-1">{profile.full_name}</h1>
        <p className="font-sans text-xs text-gc-dim tracking-widest">
          Registered {formatDateShort(profile.created_at)} · Language: {profile.language?.toUpperCase()}
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="border border-gc-mid-blue px-4 py-4">
          <p className="font-sans text-xs tracking-widest text-gc-dim mb-2">MODULES PASSED</p>
          <p className={`font-serif text-2xl ${modulesPassed === 6 ? "text-gc-green" : "text-gc-cream"}`}>
            {modulesPassed}/6
          </p>
        </div>
        <div className="border border-gc-mid-blue px-4 py-4">
          <p className="font-sans text-xs tracking-widest text-gc-dim mb-2">OVERALL SCORE</p>
          <p className="font-serif text-2xl text-gc-cream">{overallScore}/18</p>
        </div>
        <div className="border border-gc-mid-blue px-4 py-4">
          <p className="font-sans text-xs tracking-widest text-gc-dim mb-2">CERTIFICATE</p>
          {certificate ? (
            <Link href={`/certificate/${certificate.id}`} className="font-sans text-xs text-gc-gold hover:underline">
              View →
            </Link>
          ) : (
            <p className="font-sans text-xs text-gc-dim">Not issued</p>
          )}
        </div>
      </div>

      {/* Per-module progress */}
      <div className="mb-10">
        <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">MODULE PROGRESS</p>
        <div className="border border-gc-mid-blue">
          {MODULE_NUMBERS.map((num, i) => {
            const mp = progress.find((p) => p.module_index === i);
            return (
              <div
                key={i}
                className={`px-5 py-4 border-b border-gc-mid-blue/30 last:border-0 flex items-start justify-between gap-4 ${
                  i % 2 === 0 ? "bg-gc-mid-blue/5" : ""
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <span className="font-serif text-gc-gold text-sm w-6 flex-shrink-0 mt-0.5">{num}</span>
                  <div>
                    <p className="font-sans text-sm text-gc-cream">{moduleLabels[i]}</p>
                    {mp && (
                      <p className="font-sans text-xs text-gc-dim mt-1">
                        {mp.attempts} attempt{mp.attempts !== 1 ? "s" : ""} · Last: {formatDateShort(mp.last_attempted_at)}
                        {mp.passed_at ? ` · Passed: ${formatDateShort(mp.passed_at)}` : ""}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  {mp ? (
                    <>
                      <span className={`font-sans text-sm ${mp.passed ? "text-gc-green" : "text-gc-rose"}`}>
                        {mp.best_score}/3
                      </span>
                      <span className={`font-sans text-xs tracking-widest px-2 py-0.5 border ${
                        mp.passed
                          ? "border-gc-green/40 text-gc-green"
                          : "border-gc-rose/40 text-gc-rose"
                      }`}>
                        {mp.passed ? "PASSED" : "INCOMPLETE"}
                      </span>
                    </>
                  ) : (
                    <span className="font-sans text-xs text-gc-mid-blue tracking-widest">NOT ATTEMPTED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate details */}
      {certificate && (
        <div className="mb-10">
          <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">CERTIFICATE</p>
          <div className="border border-gc-gold/40 px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-sans text-xs tracking-widest text-gc-gold">ISSUED</p>
              <p className="font-sans text-xs text-gc-dim">{formatDateShort(certificate.issued_at)}</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-sans text-xs tracking-widest text-gc-dim">OVERALL SCORE</p>
              <p className="font-serif text-gc-cream">
                {certificate.overall_score}/{certificate.overall_total} ·{" "}
                {Math.round((certificate.overall_score / certificate.overall_total) * 100)}%
              </p>
            </div>
            <Link
              href={`/certificate/${certificate.id}`}
              className="inline-block mt-2 border border-gc-gold text-gc-gold px-4 py-2 font-sans text-xs tracking-widest hover:bg-gc-gold hover:text-gc-dark-blue transition-colors"
            >
              VIEW CERTIFICATE →
            </Link>
          </div>
        </div>
      )}

      {/* Session info */}
      {session && (
        <div>
          <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">SESSION</p>
          <div className="border border-gc-mid-blue px-5 py-4 space-y-2">
            <div className="flex justify-between">
              <span className="font-sans text-xs text-gc-dim">Started</span>
              <span className="font-sans text-xs text-gc-cream">{formatDate(session.started_at)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans text-xs text-gc-dim">Completed</span>
              <span className="font-sans text-xs text-gc-cream">{formatDate(session.completed_at)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans text-xs text-gc-dim">Language</span>
              <span className="font-sans text-xs text-gc-cream uppercase">{session.language}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
