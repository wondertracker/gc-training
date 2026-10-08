interface CompletionEmailProps {
  name: string;
  lang: string;
  certificateUrl: string;
  overallScore: number;
  overallTotal: number;
}
function escape(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
}
export function CompletionEmail({
  name,
  lang,
  certificateUrl,
  overallScore,
  overallTotal,
}: CompletionEmailProps) {
  const en = lang !== "fr";
  const title = en ? "Your completion record" : "Votre attestation de parcours";
  const intro = en
    ? "You have completed the six knowledge checks in the House’s training programme. Your completion record is available below."
    : "Vous avez validé les six vérifications de connaissances du parcours de formation de la Maison. Votre attestation est disponible ci-dessous.";
  const disclaimer = en
    ? "This record reflects knowledge questionnaires. Written situations are self-assessed. It does not grant a representation mandate or certify practical mastery."
    : "Ce document rend compte des questionnaires de connaissances. Les mises en situation sont auto-évaluées. Il ne confère pas de mandat de représentation et ne certifie pas une maîtrise pratique.";
  return `<!doctype html><html lang="${en ? "en" : "fr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head><body style="margin:0;background:#f7f5f0;color:#14283b;font-family:Arial,sans-serif"><table role="presentation" style="width:100%;border-collapse:collapse"><tr><td style="padding:40px 20px"><table role="presentation" style="width:100%;max-width:560px;margin:auto;border-collapse:collapse"><tr><td><p style="color:#835234;font-size:11px;letter-spacing:3px">GRANDE CHARTE · CHAMPAGNE</p><h1 style="font-size:30px;font-weight:400;line-height:1.2">${title}</h1><p style="line-height:1.8">${en ? "Hello" : "Bonjour"} ${escape(name)},</p><p style="line-height:1.8">${intro}</p><p style="margin:30px 0"><a href="${escape(certificateUrl)}" style="display:inline-block;background:#835234;color:#fffdf9;padding:15px 24px;text-decoration:none">${en ? "View my record" : "Consulter mon attestation"} ↗</a></p><p>${en ? "Recorded score" : "Score enregistré"} : ${overallScore}/${overallTotal}</p><p style="font-size:12px;line-height:1.8;color:#536370;border-top:1px solid #c9cdcd;padding-top:20px">${disclaimer}</p><p style="color:#835234;font-size:12px">${en ? "Freedom. Time. Audacity." : "Liberté. Temps. Audace."}</p></td></tr></table></td></tr></table></body></html>`;
}
export function completionSubject(lang: string) {
  return lang === "fr"
    ? "Votre attestation de parcours · Grande Charte"
    : "Your completion record · Grande Charte";
}
