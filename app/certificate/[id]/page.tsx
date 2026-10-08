export const dynamic = "force-dynamic";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { TrainingShell } from "@/components/training-shell";
import { GCSigil } from "@/components/gc-sigil";
import { formatLongDate } from "@/lib/utils";
import { EmailButton } from "./email-button";
import { PrintButton } from "./print-button";
export default async function Certificate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const auth = await createClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) redirect("/auth/login");
  if (!/^[a-f\d-]{36}$/i.test(resolvedParams.id)) notFound();
  const s = createAdminClient();
  const { data: profile } = await s
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  let query = s.from("certificates").select("*").eq("id", resolvedParams.id);
  if (profile?.role !== "admin") query = query.eq("user_id", user.id);
  const { data: c, error } = await query.maybeSingle();
  if (error)
    return (
      <TrainingShell>
        <p className="reading error" role="alert">
          L’attestation n’a pas pu être chargée. / The completion record could
          not be loaded.
        </p>
      </TrainingShell>
    );
  if (!c) notFound();
  const en = c.language !== "fr";
  return (
    <TrainingShell admin={profile?.role === "admin"}>
      <div className="reading certificate" lang={en ? "en" : "fr"}>
        <div className="actions no-print">
          <Link className="secondary" href="/">
            {en ? "My programme" : "Mon parcours"}
          </Link>
          <PrintButton
            label={en ? "Print / Save as PDF" : "Imprimer / Enregistrer en PDF"}
            hint={
              en
                ? "Choose A4 landscape and turn off headers and footers."
                : "Choisissez A4 paysage et désactivez les en-têtes et pieds de page."
            }
          />
        </div>
        {c.user_id === user.id && <EmailButton id={c.id} en={en} />}
        <div className="flex justify-center my-5">
          <GCSigil size={65} />
        </div>
        <p className="eyebrow">GRANDE CHARTE · CHAMPAGNE</p>
        <h1>{en ? "Completion record" : "Attestation de parcours"}</h1>
        <p className="certificate-name mt-8">{c.participant_name}</p>
        <p>
          {en
            ? "has completed the six knowledge checks in the House’s training programme."
            : "a validé les six vérifications de connaissances du parcours de formation de la Maison."}
        </p>
        <p className="muted text-sm">
          {en
            ? "This record refers to the programme taken on its issue date. It does not establish a new validation after the content has changed."
            : "Cette attestation concerne le parcours suivi à sa date d’émission. Elle ne constitue pas une nouvelle validation après une modification du contenu."}
        </p>
        <p>
          {en ? "Recorded score on issue" : "Score enregistré à l’émission"} :{" "}
          <strong>
            {c.overall_score}/{c.overall_total}
          </strong>
        </p>
        <p className="muted">{formatLongDate(c.issued_at, c.language)}</p>
        <p className="muted text-sm">
          {en
            ? "This record reflects knowledge questionnaires. Written situations are self-assessed. It does not grant a representation mandate or certify practical mastery. Further attempts do not change the score recorded here."
            : "Ce document rend compte des questionnaires de connaissances. Les mises en situation sont auto-évaluées. Il ne confère pas de mandat de représentation et ne certifie pas une maîtrise pratique. Les nouvelles tentatives ne modifient pas le score enregistré ici."}
        </p>
      </div>
    </TrainingShell>
  );
}
