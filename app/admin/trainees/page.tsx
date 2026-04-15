export const dynamic = 'force-dynamic';

import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { MODULE_NUMBERS } from "@/lib/training/constants";
import { formatDateShort } from "@/lib/utils";

export default async function TraineesPage({
  searchParams,
}: {
  searchParams: { q?: string; sort?: string };
}) {
  const supabase = createAdminClient();
  const query = searchParams.q ?? "";
  const sort = searchParams.sort ?? "name";

  // training_sessions.user_id references auth.users(id), not profiles(id),
  // so PostgREST can't resolve the nested relation. Fetch separately and join.
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: sessions } = await supabase
    .from("training_sessions")
    .select("id, user_id, started_at, completed_at, language");

  const sessionIds = (sessions ?? []).map((s: any) => s.id);

  const { data: allProgress } = sessionIds.length > 0
    ? await supabase
        .from("module_progress")
        .select("session_id, module_index, best_score, passed")
        .in("session_id", sessionIds)
    : { data: [] };

  const { data: allCerts } = sessionIds.length > 0
    ? await supabase
        .from("certificates")
        .select("id, session_id, overall_score, overall_total, issued_at")
        .in("session_id", sessionIds)
    : { data: [] };

  // Filter and enrich
  let rows = (profiles ?? []).map((p: any) => {
    const session = (sessions ?? []).find((s: any) => s.user_id === p.id);
    const progress = session
      ? (allProgress ?? []).filter((mp: any) => mp.session_id === session.id)
      : [];
    const cert = session
      ? (allCerts ?? []).find((c: any) => c.session_id === session.id)
      : null;
    const modulesPassed = progress.filter((mp: any) => mp.passed).length;
    const scores: (number | null)[] = [0,1,2,3,4,5].map(i => {
      const mp = progress.find((m: any) => m.module_index === i);
      return mp ? mp.best_score : null;
    });
    return {
      id: p.id,
      full_name: p.full_name,
      language: p.language,
      created_at: p.created_at,
      session,
      modulesPassed,
      scores,
      cert,
    };
  });

  // Filter
  if (query) {
    const q = query.toLowerCase();
    rows = rows.filter(
      (r) => r.full_name.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sort === "date") {
    rows.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else if (sort === "completion") {
    rows.sort((a, b) => (b.cert ? 1 : 0) - (a.cert ? 1 : 0) || b.modulesPassed - a.modulesPassed);
  } else if (sort === "name") {
    rows.sort((a, b) => (a.full_name ?? "").localeCompare(b.full_name ?? ""));
  }
  // default order already from DB: created_at desc

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-gc-cream mb-1">Trainees</h1>
          <p className="font-sans text-xs text-gc-dim tracking-widest">{rows.length} registered</p>
        </div>
        {/* Search */}
        <form method="GET" className="flex gap-2">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search by name…"
            className="bg-transparent border border-gc-mid-blue text-gc-cream placeholder-gc-dim px-3 py-2 text-xs font-sans focus:outline-none focus:border-gc-gold"
          />
          <button type="submit" className="border border-gc-mid-blue px-3 py-2 text-xs font-sans text-gc-dim hover:text-gc-cream hover:border-gc-gold transition-colors">
            SEARCH
          </button>
        </form>
      </div>

      {/* Sort controls */}
      <div className="flex gap-4 mb-5">
        {[
          { value: "name", label: "NAME" },
          { value: "date", label: "DATE" },
          { value: "completion", label: "COMPLETION" },
        ].map((s) => (
          <Link
            key={s.value}
            href={`/admin/trainees?sort=${s.value}${query ? `&q=${query}` : ""}`}
            className={`font-sans text-xs tracking-widest py-1 transition-colors ${
              sort === s.value ? "text-gc-gold border-b border-gc-gold" : "text-gc-dim hover:text-gc-cream"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="border border-gc-mid-blue overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gc-mid-blue bg-gc-mid-blue/20">
              <th className="text-left px-4 py-3 font-sans text-xs tracking-widest text-gc-dim">NAME</th>
              <th className="text-left px-4 py-3 font-sans text-xs tracking-widest text-gc-dim">REGISTERED</th>
              <th className="text-left px-4 py-3 font-sans text-xs tracking-widest text-gc-dim">LANG</th>
              <th className="text-center px-4 py-3 font-sans text-xs tracking-widest text-gc-dim">PASSED</th>
              {MODULE_NUMBERS.map((n) => (
                <th key={n} className="text-center px-2 py-3 font-sans text-xs tracking-widest text-gc-dim">{n}</th>
              ))}
              <th className="text-left px-4 py-3 font-sans text-xs tracking-widest text-gc-dim">CERTIFICATE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-gc-mid-blue/30 last:border-0 hover:bg-gc-mid-blue/10 transition-colors ${
                  i % 2 === 0 ? "" : "bg-gc-mid-blue/5"
                }`}
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/trainees/${row.id}`}
                    className="font-sans text-sm text-gc-cream hover:text-gc-gold transition-colors"
                  >
                    {row.full_name}
                  </Link>
                </td>
                <td className="px-4 py-3 font-sans text-xs text-gc-dim">{formatDateShort(row.created_at)}</td>
                <td className="px-4 py-3 font-sans text-xs text-gc-dim uppercase">{row.language}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-sans text-xs ${row.modulesPassed === 6 ? "text-gc-green" : "text-gc-dim"}`}>
                    {row.modulesPassed}/6
                  </span>
                </td>
                {row.scores.map((s, idx) => (
                  <td key={idx} className="px-2 py-3 text-center">
                    <span className={`font-sans text-xs ${
                      s === null ? "text-gc-mid-blue" :
                      s >= 2 ? "text-gc-green" : "text-gc-rose"
                    }`}>
                      {s === null ? "—" : `${s}/3`}
                    </span>
                  </td>
                ))}
                <td className="px-4 py-3">
                  {row.cert ? (
                    <Link
                      href={`/certificate/${row.cert.id}`}
                      className="font-sans text-xs text-gc-gold hover:underline"
                    >
                      {formatDateShort(row.cert.issued_at)}
                    </Link>
                  ) : (
                    <span className="font-sans text-xs text-gc-mid-blue">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="font-sans text-gc-dim text-xs tracking-widest">No trainees found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
