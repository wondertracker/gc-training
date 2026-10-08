export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { MODULES } from "@/lib/training/data";
import { formatDateShort } from "@/lib/utils";
export default async function Participant({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const resolvedParams = await params;
  const s = await requireAdmin();
  if (!/^[a-f\d-]{36}$/i.test(resolvedParams.user_id)) notFound();
  const en = (await cookies()).get("gc-lang")?.value === "en";
  const [
    { data: profile, error: profileError },
    { data: session, error: sessionError },
  ] = await Promise.all([
    s.from("profiles").select("*").eq("id", resolvedParams.user_id).maybeSingle(),
    s
      .from("training_sessions")
      .select("*")
      .eq("user_id", resolvedParams.user_id)
      .maybeSingle(),
  ]);
  if (profileError || sessionError)
    return (
      <p className="wrap error" role="alert">
        {en
          ? "The participant could not be loaded."
          : "Le participant n’a pas pu être chargé."}
      </p>
    );
  if (!profile) notFound();
  const [
    { data: progress, error: progressError },
    { data: certificate, error: certError },
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
    <div className="wrap">
      <Link href="/admin/trainees">
        ← {en ? "Participants" : "Participants"}
      </Link>
      <h1 className="mt-8">{profile.full_name}</h1>
      <p className="muted">
        {en ? "Registered" : "Inscrit le"} {formatDateShort(profile.created_at)}{" "}
        · {profile.language?.toUpperCase()}
      </p>
      {(progressError || certError) && (
        <p className="error" role="alert">
          {en
            ? "Some progress could not be loaded."
            : "Une partie de la progression n’a pas pu être chargée."}
        </p>
      )}
      <div className="module-list">
        {MODULES(en ? "en" : "fr").map((m, i) => {
          const p = progress?.find((t) => t.module_index === i);
          return (
            <div className="module-row" key={i}>
              <span className="module-number">{m.number}</span>
              <div>
                <h3>{m.label}</h3>
                <p>
                  {p
                    ? `${p.attempts} ${en ? "attempts" : "tentatives"} · ${formatDateShort(p.last_attempted_at)}`
                    : en
                      ? "No result"
                      : "Aucun résultat"}
                </p>
              </div>
              <span className="module-status">
                {p
                  ? `${p.best_score}/3 · ${p.passed ? (en ? "Passed" : "Validé") : en ? "To review" : "À reprendre"}`
                  : "·"}
              </span>
            </div>
          );
        })}
      </div>
      {certificate && (
        <div className="note">
          <p>
            {en ? "Completion record issued" : "Attestation émise le"}{" "}
            {formatDateShort(certificate.issued_at)} ·{" "}
            {certificate.overall_score}/{certificate.overall_total}
          </p>
          <Link href={`/certificate/${certificate.id}`}>
            {en ? "View the record" : "Consulter l’attestation"} ↗
          </Link>
        </div>
      )}
      <p className="muted mt-8">
        {en
          ? "Personal notes and written practice responses remain on the participant’s device. They are not displayed here."
          : "Les notes et réponses d’entraînement restent sur l’appareil du participant. Elles ne sont pas affichées ici."}
      </p>
    </div>
  );
}
