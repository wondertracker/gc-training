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

  return (
    <div className="min-h-screen bg-gc-dark-blue print:bg-white">
      {/* Print / action bar */}
      <div className="no-print flex items-center justify-between px-6 py-4 border-b border-gc-mid-blue">
        <p className="text-gc-dim font-sans text-xs tracking-widest">
          {L ? "CERTIFICATE OF INITIATION" : "CERTIFICAT D'INITIATION"}
        </p>
        <PrintButton label={L ? "PRINT CERTIFICATE" : "IMPRIMER LE CERTIFICAT"} />
      </div>

      {/* Certificate body */}
      <main className="max-w-2xl mx-auto px-6 py-16 print:py-8 print:text-black">
        {/* Sigil */}
        <div className="flex justify-center mb-6 print:mb-4">
          <GCSigil size={80} />
        </div>

        {/* House name */}
        <p className="text-center font-sans text-xs tracking-[0.35em] text-gc-gold print:text-yellow-700 mb-2">
          GRANDE CHARTE · CHAMPAGNE
        </p>

        {/* Certificate title */}
        <h1 className="text-center font-serif text-3xl text-gc-cream print:text-black mb-8 tracking-wide">
          {L ? "Certificate of Initiation" : "Certificat d'Initiation"}
        </h1>

        {/* Horizontal rule */}
        <div className="border-t border-gc-gold/40 mb-8" />

        {/* This certifies */}
        <p className="text-center font-serif text-gc-dim print:text-gray-500 text-sm mb-3">
          {L ? "This certifies that" : "Ce document certifie que"}
        </p>

        {/* Name */}
        <h2 className="text-center font-serif text-4xl text-gc-cream print:text-black mb-6 tracking-wide">
          {certificate.participant_name}
        </h2>

        {/* Statement */}
        <p className="text-center font-serif text-gc-dim print:text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-10">
          {L
            ? "has completed the doctrinal initiation of Maison Grande Charte and demonstrated the required mastery of its language, doctrine, and principles."
            : "a complété l'initiation doctrinale de la Maison Grande Charte et a démontré la maîtrise requise de son langage, de sa doctrine et de ses principes."}
        </p>

        {/* Horizontal rule */}
        <div className="border-t border-gc-gold/40 mb-8" />

        {/* Module scores table */}
        <div className="mb-8">
          <p className="font-sans text-xs tracking-[0.25em] text-gc-gold print:text-yellow-700 mb-4 text-center">
            {L ? "MODULE SCORES" : "SCORES PAR MODULE"}
          </p>
          <div className="border border-gc-mid-blue print:border-gray-300">
            {MODULE_NUMBERS.map((num, i) => {
              const prog = progress?.find((p) => p.module_index === i);
              const moduleScore = prog?.best_score ?? 0;
              return (
                <div
                  key={i}
                  className={`flex items-center px-5 py-3 border-b border-gc-mid-blue/40 print:border-gray-200 last:border-0 ${
                    i % 2 === 0 ? "bg-gc-mid-blue/10 print:bg-gray-50" : ""
                  }`}
                >
                  <span className="font-serif text-gc-gold print:text-yellow-700 text-sm w-8">{num}</span>
                  <span className="font-sans text-gc-dim print:text-gray-500 text-xs tracking-wide flex-1">{moduleNames[i]}</span>
                  <span className="font-serif text-gc-cream print:text-black text-sm">{moduleScore}/3</span>
                </div>
              );
            })}
          </div>

          {/* Overall */}
          <div className="mt-3 flex items-center justify-end gap-4 px-5 py-3 border border-gc-gold/40 print:border-yellow-600/40">
            <span className="font-sans text-xs tracking-[0.2em] text-gc-dim print:text-gray-500">
              {L ? "OVERALL" : "TOTAL"}
            </span>
            <span className="font-serif text-gc-cream print:text-black text-lg">
              {certificate.overall_score}/{certificate.overall_total}
            </span>
            <span className="font-sans text-gc-gold print:text-yellow-700 text-sm">· {pct}%</span>
          </div>
        </div>

        {/* Horizontal rule */}
        <div className="border-t border-gc-gold/40 mb-6" />

        {/* Issued date */}
        <p className="text-center font-sans text-xs tracking-[0.2em] text-gc-dim print:text-gray-500 mb-10">
          {L ? "Issued" : "Émis le"}: {issuedDate}
        </p>

        {/* Disclaimer */}
        <p className="text-center font-serif text-xs italic text-gc-dim print:text-gray-400 leading-relaxed max-w-lg mx-auto">
          {L
            ? "Completion of this initiation does not automatically authorise representation. Final readiness requires doctrinal validation by the House."
            : "La réalisation de cette initiation n'autorise pas automatiquement la représentation. La validation finale requiert une validation doctrinale par la Maison."}
        </p>
      </main>
    </div>
  );
}
