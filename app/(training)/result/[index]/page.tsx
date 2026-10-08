import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { trainingUser, moduleIndex } from "@/lib/training/server-user";
import { MODULES } from "@/lib/training/data";
export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ index: string }>;
  searchParams: Promise<{ score?: string; certificate?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const index = moduleIndex(resolvedParams.index);
  if (index === null) notFound();
  const user = await trainingUser();
  const s = await createClient();
  const lang = (await cookies()).get("gc-lang")?.value === "en" ? "en" : "fr";
  const en = lang === "en";
  const trainingModule = MODULES(lang)[index];
  const { data: session, error: sessionError } = await s
    .from("training_sessions")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();
  const [{ data: progress, error: progressError }, { data: certificate }] =
    session
      ? await Promise.all([
          s
            .from("module_progress")
            .select("*")
            .eq("session_id", session.id)
            .eq("module_index", index)
            .maybeSingle(),
          s
            .from("certificates")
            .select("id")
            .eq("session_id", session.id)
            .maybeSingle(),
        ])
      : [{ data: null, error: null }, { data: null }];
  return (
    <article className="reading">
      <p className="eyebrow">
        {trainingModule.number} · {trainingModule.label}
      </p>
      <h1>
        {progress?.passed
          ? en
            ? "A reference point acquired."
            : "Un repère acquis."
          : en
            ? "Take time to review."
            : "Prenez le temps de reprendre."}
      </h1>
      {sessionError || progressError ? (
        <p role="alert" className="error">
          {en
            ? "Saved progress could not be loaded."
            : "La progression enregistrée n’a pas pu être chargée."}
        </p>
      ) : progress ? (
        <>
          <p className="text-5xl">{progress.best_score}/3</p>
          <p className="muted">
            {en
              ? "Best saved knowledge score. Pass threshold: 2/3."
              : "Meilleur score de connaissances enregistré. Seuil de validation : 2/3."}
          </p>
        </>
      ) : (
        <p>
          {en
            ? "No result has been saved for this module yet."
            : "Aucun résultat n’a encore été enregistré pour ce module."}
        </p>
      )}
      {resolvedSearch.certificate === "pending" && (
        <p className="note">
          {en
            ? "Your score is saved, but completion processing needs another attempt. Return to the quiz to retry."
            : "Votre score est enregistré, mais la finalisation du parcours doit être réessayée. Retournez au questionnaire pour reprendre."}
        </p>
      )}
      <p>
        {en
          ? "Your written response is in your notebook on this device. Review it, refine it, then practise aloud."
          : "Votre réponse écrite est dans votre carnet sur cet appareil. Relisez-la, affinez-la, puis entraînez-vous à voix haute."}
      </p>
      <div className="actions">
        {certificate ? (
          <Link className="primary" href={`/certificate/${certificate.id}`}>
            {en ? "View my completion record" : "Voir mon attestation"}
          </Link>
        ) : progress?.passed && index < 5 ? (
          <Link className="primary" href={`/module/${index + 1}`}>
            {en ? "Next module" : "Module suivant"} ↗
          </Link>
        ) : (
          <Link className="primary" href={`/module/${index}/quiz`}>
            {en ? "Try again" : "Reprendre la vérification"}
          </Link>
        )}
        <Link className="secondary" href="/carnet">
          {en ? "My notebook" : "Mon carnet"}
        </Link>
      </div>
      <Link href={`/module/${index}`}>
        {en ? "Review the module" : "Relire le module"}
      </Link>
    </article>
  );
}
