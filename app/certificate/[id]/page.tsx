export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { GCSigil } from "@/components/gc-sigil";
import { MODULES } from "@/lib/training/data";
import { MODULE_NUMBERS } from "@/lib/training/constants";
import { formatLongDate } from "@/lib/utils";
import { PrintButton } from "./print-button";

export default async function CertificatePage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient();

  const { data: certificate } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!certificate) notFound();

  const lang = certificate.language ?? "en";
  const L = lang === "en";

  // Fetch all module progress for this session
  const { data: progress } = await supabase
    .from("module_progress")
    .select("*")
    .eq("session_id", certificate.session_id)
    .order("module_index");

  const modules = MODULES(lang);
  const pct = Math.round((certificate.overall_score / certificate.overall_total) * 100);

  const moduleLabelsEN = [
    "Origin & Doctrine",
    "The Collections",
    "Iroise 769 — In Depth",
    "The Conversation",
    "Custodians & Experience",
    "International Presence",
  ];
  const moduleNamesFR = [
    "Origine et Doctrine",
    "Les Collections",
    "Iroise 769 — En Profondeur",
    "La Conversation",
    "Allocataires et Expérience",
    "Présence Internationale",
  ];
  const moduleNames = L ? moduleLabelsEN : moduleNamesFR;

  const issuedDate = formatLongDate(certificate.issued_at, lang);

  const printHint = L
    ? "For best results: in the print dialog, set Layout to Landscape and uncheck Headers and footers."
    : "Pour un meilleur rendu : dans la boîte d'impression, choisissez Paysage et décochez En-têtes et pieds de page.";

  // Split modules into two columns of 3 for landscape layout
  const leftModules = [0, 1, 2];
  const rightModules = [3, 4, 5];

  return (
    <>
      {/* Print-only global styles */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 15mm 20mm;
          }
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gc-dark-blue print:bg-white">
        {/* Action bar — hidden on print */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-gc-mid-blue">
          <p className="text-gc-dim font-sans text-xs tracking-widest">
            {L ? "CERTIFICATE OF INITIATION" : "CERTIFICAT D'INITIATION"}
          </p>
          <PrintButton
            label={L ? "PRINT / SAVE AS PDF" : "IMPRIMER / ENREGISTRER EN PDF"}
            hint={printHint}
          />
        </div>

        {/* Certificate body */}
        <main className="max-w-4xl mx-auto px-8 py-10 print:max-w-none print:px-0 print:py-0 print:text-black">

          {/* Top section: sigil + title + name */}
          <div className="flex flex-col items-center mb-6 print:mb-4">
            <GCSigil size={72} />
            <p className="text-center font-sans text-xs tracking-[0.35em] text-gc-gold print:text-yellow-700 mt-3 mb-1">
              GRANDE CHARTE · CHAMPAGNE
            </p>
            <h1 className="text-center font-serif text-3xl print:text-2xl text-gc-cream print:text-black tracking-wide">
              {L ? "Certificate of Initiation" : "Certificat d'Initiation"}
            </h1>
          </div>

          <div className="border-t border-gc-gold/40 mb-5 print:mb-3" />

          <p className="text-center font-serif text-gc-dim print:text-gray-500 text-sm mb-2">
            {L ? "This certifies that" : "Ce document certifie que"}
          </p>
          <h2 className="text-center font-serif text-4xl print:text-3xl text-gc-cream print:text-black mb-4 tracking-wide">
            {certificate.participant_name}
          </h2>
          <p className="text-center font-serif text-gc-dim print:text-gray-600 text-sm leading-relaxed max-w-xl mx-auto mb-5">
            {L
              ? "has completed the doctrinal initiation of Maison Grande Charte and demonstrated the required mastery of its language, doctrine, and principles."
              : "a complété l'initiation doctrinale de la Maison Grande Charte et a démontré la maîtrise requise de son langage, de sa doctrine et de ses principes."}
          </p>

          <div className="border-t border-gc-gold/40 mb-5 print:mb-3" />

          {/* Module scores — two columns for landscape */}
          <div className="mb-5">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-gold print:text-yellow-700 mb-3 text-center">
              {L ? "MODULE SCORES" : "SCORES PAR MODULE"}
            </p>
            <div className="grid grid-cols-2 gap-4 print:gap-3">
              {[leftModules, rightModules].map((col, colIdx) => (
                <div key={colIdx} className="border border-gc-mid-blue print:border-gray-300">
                  {col.map((i) => {
                    const prog = progress?.find((p) => p.module_index === i);
                    const moduleScore = prog?.best_score ?? 0;
                    return (
                      <div
                        key={i}
                        className={`flex items-center px-4 py-2.5 border-b border-gc-mid-blue/40 print:border-gray-200 last:border-0 ${
                          i % 2 === 0 ? "bg-gc-mid-blue/10 print:bg-gray-50" : ""
                        }`}
                      >
                        <span className="font-serif text-gc-gold print:text-yellow-700 text-sm w-8 flex-shrink-0">
                          {MODULE_NUMBERS[i]}
                        </span>
                        <span className="font-sans text-gc-dim print:text-gray-500 text-xs tracking-wide flex-1">
                          {moduleNames[i]}
                        </span>
                        <span className="font-serif text-gc-cream print:text-black text-sm flex-shrink-0">
                          {moduleScore}/3
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Overall */}
            <div className="mt-3 flex items-center justify-end gap-4 px-5 py-2.5 border border-gc-gold/40 print:border-yellow-600/40">
              <span className="font-sans text-xs tracking-[0.2em] text-gc-dim print:text-gray-500">
                {L ? "OVERALL" : "TOTAL"}
              </span>
              <span className="font-serif text-gc-cream print:text-black text-lg">
                {certificate.overall_score}/{certificate.overall_total}
              </span>
              <span className="font-sans text-gc-gold print:text-yellow-700 text-sm">· {pct}%</span>
            </div>
          </div>

          <div className="border-t border-gc-gold/40 mb-4 print:mb-3" />

          {/* Issued date */}
          <p className="text-center font-sans text-xs tracking-[0.2em] text-gc-dim print:text-gray-500 mb-4">
            {L ? "Issued" : "Émis le"}: {issuedDate}
          </p>

          {/* Disclaimer */}
          <p className="text-center font-serif text-xs italic text-gc-dim print:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            {L
              ? "Completion of this initiation does not automatically authorise representation. Final readiness requires doctrinal validation by the House."
              : "La réalisation de cette initiation n'autorise pas automatiquement la représentation. La validation finale requiert une validation doctrinale par la Maison."}
          </p>
        </main>
      </div>
    </>
  );
}
