export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { MODULES } from "@/lib/training/data";
import { formatDateShort } from "@/lib/utils";
export default async function Dashboard() {
  const s = await requireAdmin();
  const en = (await cookies()).get("gc-lang")?.value === "en";
  const modules = MODULES(en ? "en" : "fr");
  const results = await Promise.all([
    s
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .neq("role", "admin"),
    s.from("training_sessions").select("id", { count: "exact", head: true }),
    s.from("certificates").select("id", { count: "exact", head: true }),
    s.from("module_progress").select("module_index,best_score,passed"),
    s
      .from("certificates")
      .select("id,participant_name,overall_score,overall_total,issued_at")
      .order("issued_at", { ascending: false })
      .limit(10),
  ]);
  if (results.some((r) => r.error))
    return (
      <p className="wrap error" role="alert">
        {en
          ? "Training activity could not be loaded. Please retry."
          : "L’activité n’a pas pu être chargée. Réessayez."}
      </p>
    );
  const [users, sessions, certs, progress, recent] = results;
  return (
    <div className="wrap">
      <p className="eyebrow">Administration</p>
      <h1>{en ? "Training activity." : "L’activité du parcours."}</h1>
      <p className="muted">
        {en
          ? "Saved progress and knowledge checks. This dashboard does not show who is currently online."
          : "Progression enregistrée et vérifications de connaissances. Ce tableau ne montre pas les personnes connectées en temps réel."}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        {[
          [en ? "Participants" : "Participants", users.count || 0],
          [en ? "Sessions" : "Parcours commencés", sessions.count || 0],
          [en ? "Completion records" : "Attestations", certs.count || 0],
          [
            en ? "Completed sessions" : "Parcours terminés",
            `${sessions.count ? Math.round(((certs.count || 0) / sessions.count) * 100) : 0}%`,
          ],
        ].map(([l, v]) => (
          <div key={l} className="note">
            <small>{l}</small>
            <p className="text-3xl mt-3 mb-0">{v}</p>
          </div>
        ))}
      </div>
      <h2>{en ? "Knowledge checks" : "Les vérifications"}</h2>
      <p className="muted text-sm">
        {en
          ? "The average uses each participant’s best saved score, including records from the previous programme."
          : "La moyenne utilise le meilleur score enregistré par participant, y compris les résultats de l’ancien parcours."}
      </p>
      <div className="module-list">
        {modules.map((m, i) => {
          const rows = (progress.data || []).filter(
            (p) => p.module_index === i,
          );
          const passed = rows.filter((p) => p.passed).length;
          const avg = rows.length
            ? rows.reduce((n, p) => n + p.best_score, 0) / rows.length
            : 0;
          return (
            <div className="module-row" key={i}>
              <span className="module-number">{m.number}</span>
              <div>
                <h3>{m.label}</h3>
                <p>
                  {rows.length}{" "}
                  {en
                    ? "participants with a result"
                    : "participants avec un résultat"}{" "}
                  · {passed} {en ? "passed" : "validés"}
                </p>
              </div>
              <div className="module-status">
                {rows.length
                  ? `${avg.toFixed(1)}/3`
                  : en
                    ? "No results"
                    : "Aucun résultat"}
                <br />
                {en ? "Average best score" : "Moyenne des meilleurs scores"}
              </div>
            </div>
          );
        })}
      </div>
      <h2 className="mt-12">
        {en ? "Recent completions" : "Les dernières attestations"}
      </h2>
      {recent.data?.length ? (
        recent.data.map((c) => (
          <div className="intro-row" key={c.id}>
            <div>
              <p>{c.participant_name}</p>
              <small>
                {c.overall_score}/{c.overall_total} ·{" "}
                {formatDateShort(c.issued_at)}
              </small>
            </div>
            <a href={`/certificate/${c.id}`}>{en ? "View" : "Consulter"} ↗</a>
          </div>
        ))
      ) : (
        <p className="muted">
          {en
            ? "No completion records yet."
            : "Aucune attestation pour le moment."}
        </p>
      )}
    </div>
  );
}
