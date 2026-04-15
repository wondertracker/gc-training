export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { createAdminClient } from "@/lib/supabase/admin";
import { MODULE_NUMBERS } from "@/lib/training/constants";
import { formatDateShort } from "@/lib/utils";

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  // Total trainees — count all profiles (no role filter; profiles may not have role='trainee')
  const { count: traineeCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Total sessions
  const { count: sessionCount } = await supabase
    .from("training_sessions")
    .select("*", { count: "exact", head: true });

  // Total certificates
  const { count: certCount } = await supabase
    .from("certificates")
    .select("*", { count: "exact", head: true });

  // Fetch all module_progress in one query — derive pass rate + avg score in JS
  const { data: allProgress } = await supabase
    .from("module_progress")
    .select("module_index, best_score, total_questions, passed");

  const moduleStats = Array.from({ length: 6 }, (_, i) => {
    const rows = (allProgress ?? []).filter((p) => p.module_index === i);
    const totalAttempts = rows.length;
    const passCount = rows.filter((p) => p.passed).length;
    const avgScore = totalAttempts > 0
      ? rows.reduce((sum, p) => sum + (p.best_score ?? 0), 0) / totalAttempts
      : 0;
    const avgTotal = totalAttempts > 0
      ? rows.reduce((sum, p) => sum + (p.total_questions ?? 3), 0) / totalAttempts
      : 3;
    return { index: i, totalAttempts, passCount, avgScore, avgTotal };
  });

  // Recent completions (last 10 certificates)
  const { data: recentCerts } = await supabase
    .from("certificates")
    .select("*, profiles(full_name)")
    .order("issued_at", { ascending: false })
    .limit(10);

  const completionRate = sessionCount
    ? Math.round(((certCount ?? 0) / sessionCount) * 100)
    : 0;

  const moduleLabels = [
    "Origin & Doctrine",
    "The Collections",
    "Iroise 769 — In Depth",
    "The Conversation",
    "Custodians & Experience",
    "International Presence",
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-gc-cream mb-1">Dashboard</h1>
        <p className="font-sans text-xs text-gc-dim tracking-widest">Overview of training activity</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "TRAINEES", value: traineeCount ?? 0 },
          { label: "SESSIONS", value: sessionCount ?? 0 },
          { label: "CERTIFICATES", value: certCount ?? 0 },
          { label: "COMPLETION RATE", value: `${completionRate}%` },
        ].map((stat) => (
          <div key={stat.label} className="border border-gc-mid-blue px-5 py-5">
            <p className="font-sans text-xs tracking-[0.2em] text-gc-dim mb-2">{stat.label}</p>
            <p className="font-serif text-3xl text-gc-cream">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Module stats */}
      <div className="mb-10">
        <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-5">MODULE PERFORMANCE</p>
        <div className="space-y-3">
          {moduleStats.map((m) => {
            const passRate = m.totalAttempts > 0
              ? Math.round((m.passCount / m.totalAttempts) * 100)
              : 0;
            const avgPct = m.avgTotal > 0
              ? Math.round((m.avgScore / m.avgTotal) * 100)
              : 0;
            const avgDisplay = m.avgScore.toFixed(1);
            return (
              <div key={m.index} className="flex items-center gap-4">
                <span className="font-serif text-gc-gold text-sm w-6 flex-shrink-0">
                  {MODULE_NUMBERS[m.index]}
                </span>
                <span className="font-sans text-xs text-gc-dim tracking-wide w-44 flex-shrink-0 truncate">
                  {moduleLabels[m.index]}
                </span>
                <div className="flex-1 h-1.5 bg-gc-mid-blue/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gc-green rounded-full transition-all"
                    style={{ width: `${avgPct}%` }}
                  />
                </div>
                <span className="font-sans text-xs text-gc-dim w-40 text-right flex-shrink-0">
                  {m.totalAttempts > 0
                    ? <>{passRate}% pass · {avgDisplay}/{Math.round(m.avgTotal)} avg</>
                    : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent completions */}
      {recentCerts && recentCerts.length > 0 && (
        <div>
          <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">RECENT COMPLETIONS</p>
          <div className="border border-gc-mid-blue">
            {recentCerts.map((cert: any, i: number) => (
              <div
                key={cert.id}
                className={`flex items-center justify-between px-5 py-3 border-b border-gc-mid-blue/40 last:border-0 ${
                  i % 2 === 0 ? "bg-gc-mid-blue/10" : ""
                }`}
              >
                <div>
                  <p className="font-sans text-sm text-gc-cream">
                    {cert.profiles?.full_name ?? cert.participant_name}
                  </p>
                  <p className="font-sans text-xs text-gc-dim mt-0.5">
                    {cert.overall_score}/{cert.overall_total} · {Math.round((cert.overall_score / cert.overall_total) * 100)}%
                  </p>
                </div>
                <p className="font-sans text-xs text-gc-dim">{formatDateShort(cert.issued_at)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
