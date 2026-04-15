"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { GCSigil } from "@/components/gc-sigil";
import { LangToggle } from "@/components/lang-toggle";
import { MODULES } from "@/lib/training/data";
import { createClient } from "@/lib/supabase/client";
import type { Section } from "@/lib/training/types";

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleIndex = parseInt(params.index as string, 10);

  const [lang, setLang] = useState("en");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [openPillar, setOpenPillar] = useState<number | null>(null);
  const [openCuvee, setOpenCuvee] = useState<number | null>(null);
  const [openScenario, setOpenScenario] = useState<number | null>(null);

  const modules = MODULES(lang);
  const mod = modules[moduleIndex];
  const sections = mod?.sections ?? [];
  const section = sections[sectionIdx];
  const isLast = sectionIdx === sections.length - 1;
  const L = lang === "en";

  // Load language from profile
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase.from("profiles").select("language").eq("id", user.id).single().then(({ data }) => {
          if (data?.language) setLang(data.language);
        });
      }
    });
  }, []);

  function handleNext() {
    if (isLast) {
      router.push(`/module/${moduleIndex}/quiz`);
    } else {
      setSectionIdx((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (sectionIdx === 0) {
      router.push("/");
    } else {
      setSectionIdx((i) => i - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (!mod || !section) return null;

  return (
    <div className="min-h-screen bg-gc-cream text-gc-body">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-gc-dark-blue border-b border-gc-mid-blue px-4 md:px-6 py-4 no-print">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <GCSigil size={28} />
            <div className="min-w-0">
              <Link href="/" className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-gold transition-colors block">
                ← {L ? "ALL MODULES" : "TOUS LES MODULES"}
              </Link>
              <p className="text-gc-cream font-sans text-xs tracking-widest truncate">
                {L ? "MODULE" : "MODULE"} {mod.number} · {section.label}
              </p>
            </div>
          </div>
          <LangToggle lang={lang} onToggle={setLang} />
        </div>
        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mt-3 flex gap-1.5">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => { setSectionIdx(i); window.scrollTo({ top: 0 }); }}
              className={`h-0.5 flex-1 transition-colors duration-200 ${i <= sectionIdx ? "bg-gc-gold" : "bg-gc-mid-blue"}`}
              aria-label={`Section ${i + 1}`}
            />
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 md:px-6 py-12">
        {/* Section label */}
        <p className="font-sans text-xs tracking-[0.3em] text-gc-rose mb-4">{section.label}</p>

        {/* Section title */}
        <h1 className="font-serif text-2xl md:text-3xl text-gc-body mb-8 leading-tight">{section.title}</h1>

        {/* Body paragraphs */}
        {section.body && section.body.length > 0 && (
          <div className="space-y-5 mb-10">
            {section.body.map((para, i) => (
              <p key={i} className="font-serif text-base leading-relaxed text-gc-body">{para}</p>
            ))}
          </div>
        )}

        {/* Quote block */}
        {section.quote && (
          <blockquote className="border-l-2 border-gc-gold pl-5 py-1 mb-8">
            <p className="font-serif text-base italic text-gc-body leading-relaxed">"{section.quote}"</p>
          </blockquote>
        )}

        {/* Facts table */}
        {section.facts && section.facts.length > 0 && (
          <div className="mb-10 border border-gc-mid-blue/40">
            {section.facts.map((fact, i) => (
              <div
                key={i}
                className={`flex gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-gc-warm" : "bg-gc-cream"} border-b border-gc-mid-blue/20 last:border-0`}
              >
                <span className="font-sans text-xs tracking-wider text-gc-dim w-36 flex-shrink-0">{fact.label}</span>
                <span className="font-sans text-sm text-gc-body">{fact.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Standards table */}
        {section.standards && section.standards.length > 0 && (
          <div className="mb-10 border border-gc-mid-blue/40">
            {section.standards.map((s, i) => (
              <div
                key={i}
                className={`flex gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-gc-warm" : "bg-gc-cream"} border-b border-gc-mid-blue/20 last:border-0`}
              >
                <span className="font-sans text-xs tracking-wider text-gc-dim w-40 flex-shrink-0">{s.p}</span>
                <span className="font-sans text-sm text-gc-body">{s.e}</span>
              </div>
            ))}
          </div>
        )}

        {/* Specs table (Iroise) */}
        {section.specs && section.specs.length > 0 && (
          <div className="mb-10 border border-gc-mid-blue/40">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-dim px-4 py-3 border-b border-gc-mid-blue/40 bg-gc-warm">
              {L ? "TECHNICAL SPECIFICATIONS" : "SPÉCIFICATIONS TECHNIQUES"}
            </p>
            {section.specs.map((s, i) => (
              <div
                key={i}
                className={`flex gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-gc-cream" : "bg-gc-warm"} border-b border-gc-mid-blue/20 last:border-0`}
              >
                <span className="font-sans text-xs tracking-wider text-gc-dim w-40 flex-shrink-0">{s.p}</span>
                <span className="font-sans text-sm text-gc-body">{s.e}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sensory note */}
        {section.sensory && (
          <div className="mb-10 bg-gc-warm border border-gc-mid-blue/30 px-5 py-4">
            <p className="font-sans text-xs tracking-[0.2em] text-gc-dim mb-2">
              {L ? "SENSORY PROFILE" : "PROFIL SENSORIEL"}
            </p>
            <p className="font-serif text-sm italic text-gc-body leading-relaxed">{section.sensory}</p>
          </div>
        )}

        {/* Timeline */}
        {section.timeline && section.timeline.length > 0 && (
          <div className="mb-10">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">
              {L ? "COLLECTION TIMELINE" : "CHRONOLOGIE DES COLLECTIONS"}
            </p>
            <div className="space-y-0 border-l-2 border-gc-gold ml-4">
              {section.timeline.map((t, i) => (
                <div key={i} className="relative pl-6 pb-6 last:pb-0">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gc-gold -translate-x-[7px]" />
                  <p className="font-sans text-xs tracking-widest text-gc-gold mb-0.5">{t.year}</p>
                  <p className="font-serif text-sm font-medium text-gc-body">{t.name}</p>
                  <p className="font-sans text-xs text-gc-dim mt-0.5">{t.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pillars accordion */}
        {section.pillars && section.pillars.length > 0 && (
          <div className="mb-10 space-y-2">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">
              {L ? "THE THREE PILLARS" : "LES TROIS PILIERS"}
            </p>
            {section.pillars.map((pillar, i) => (
              <div key={i} className="border border-gc-mid-blue/40">
                <button
                  onClick={() => setOpenPillar(openPillar === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gc-warm transition-colors"
                >
                  <div>
                    <span className="font-serif text-base text-gc-body">{pillar.name}</span>
                    <span className="font-sans text-xs text-gc-dim ml-3 italic">{pillar.sub}</span>
                  </div>
                  <span className="text-gc-gold text-lg">{openPillar === i ? "−" : "+"}</span>
                </button>
                {openPillar === i && (
                  <div className="px-5 pb-5 bg-gc-warm border-t border-gc-mid-blue/20">
                    <p className="font-serif text-sm leading-relaxed text-gc-body pt-4">{pillar.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Cuvees accordion */}
        {section.cuvees && section.cuvees.length > 0 && (
          <div className="mb-10 space-y-2">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">
              {L ? "THE CUVÉES" : "LES CUVÉES"}
            </p>
            {section.cuvees.map((cuvee, i) => (
              <div key={i} className="border border-gc-mid-blue/40">
                <button
                  onClick={() => setOpenCuvee(openCuvee === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gc-warm transition-colors"
                >
                  <span className="font-serif text-base text-gc-body">{cuvee.name}</span>
                  <span className="text-gc-gold text-lg">{openCuvee === i ? "−" : "+"}</span>
                </button>
                {openCuvee === i && (
                  <div className="px-5 pb-5 bg-gc-warm border-t border-gc-mid-blue/20">
                    <div className="pt-4 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-sans text-gc-dim tracking-wider block mb-0.5">{L ? "BLEND" : "ASSEMBLAGE"}</span>
                          <span className="font-sans text-gc-body">{cuvee.blend}</span>
                        </div>
                        <div>
                          <span className="font-sans text-gc-dim tracking-wider block mb-0.5">{L ? "DOSAGE" : "DOSAGE"}</span>
                          <span className="font-sans text-gc-body">{cuvee.dosage}</span>
                        </div>
                        <div>
                          <span className="font-sans text-gc-dim tracking-wider block mb-0.5">{L ? "AGING" : "ÉLEVAGE"}</span>
                          <span className="font-sans text-gc-body">{cuvee.aging}</span>
                        </div>
                        <div>
                          <span className="font-sans text-gc-dim tracking-wider block mb-0.5">{L ? "BOTTLES" : "FLACONS"}</span>
                          <span className="font-sans text-gc-body">{cuvee.bottles}</span>
                        </div>
                      </div>
                      <p className="font-serif text-sm italic text-gc-body leading-relaxed pt-2 border-t border-gc-mid-blue/20">
                        {cuvee.spirit}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Vocabulary to avoid */}
        {section.avoid && section.avoid.length > 0 && (
          <div className="mb-10">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">
              {L ? "VOCABULARY TO AVOID" : "VOCABULAIRE À ÉVITER"}
            </p>
            <div className="space-y-3">
              {section.avoid.map((item, i) => (
                <div key={i} className="border border-gc-red/30 px-4 py-3">
                  <p className="font-sans text-xs font-medium text-gc-red tracking-wider mb-1.5">{item.w}</p>
                  <p className="font-sans text-xs text-gc-body leading-relaxed">{item.r}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lexicon tags */}
        {section.lexicon && Object.keys(section.lexicon).length > 0 && (
          <div className="mb-10">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">
              {L ? "LEXICAL REGISTER" : "REGISTRE LEXICAL"}
            </p>
            {Object.entries(section.lexicon).map(([cuvee, words]) => (
              <div key={cuvee} className="mb-4">
                <p className="font-sans text-xs tracking-wider text-gc-gold mb-2">{cuvee}</p>
                <div className="flex flex-wrap gap-2">
                  {words.map((word, i) => (
                    <span
                      key={i}
                      className="border border-gc-green/50 text-gc-green font-sans text-xs px-3 py-1 tracking-wide"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Constitutional principle */}
        {section.constitutional && (
          <div className="mb-8 bg-gc-dark-blue text-gc-cream px-5 py-4 border-l-2 border-gc-gold">
            <p className="font-sans text-xs tracking-[0.2em] text-gc-gold mb-2">
              {L ? "CONSTITUTIONAL PRINCIPLE" : "PRINCIPE CONSTITUTIONNEL"}
            </p>
            <p className="font-serif text-sm leading-relaxed">{section.constitutional}</p>
          </div>
        )}

        {/* Rule */}
        {section.rule && (
          <div className="mb-8 bg-gc-warm border border-gc-mid-blue/30 px-5 py-4">
            <p className="font-sans text-xs tracking-[0.2em] text-gc-dim mb-2">
              {L ? "THE RULE" : "LA RÈGLE"}
            </p>
            <p className="font-serif text-sm italic text-gc-body leading-relaxed">{section.rule}</p>
          </div>
        )}

        {/* If-unsure panel */}
        {section.ifUnsure && (
          <div className="mb-8 border border-gc-rose/40 bg-gc-warm px-5 py-4">
            <p className="font-sans text-xs tracking-[0.2em] text-gc-rose mb-2">
              {L ? "IF UNSURE — SAY THIS" : "EN CAS DE DOUTE — DITES CECI"}
            </p>
            <p className="font-serif text-sm italic text-gc-body leading-relaxed">"{section.ifUnsure}"</p>
          </div>
        )}

        {/* Posture list */}
        {section.posture && section.posture.length > 0 && (
          <div className="mb-8">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">
              {L ? "POSTURE" : "POSTURE"}
            </p>
            <ul className="space-y-2">
              {section.posture.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gc-gold mt-0.5 flex-shrink-0 text-sm">·</span>
                  <span className="font-serif text-sm text-gc-body leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Internal/External grid */}
        {section.internalExternal && (
          <div className="mb-8 grid grid-cols-2 gap-3">
            <div className="border border-gc-mid-blue/40 px-4 py-3">
              <p className="font-sans text-xs tracking-widest text-gc-dim mb-2">
                {L ? "INTERNAL" : "INTERNE"}
              </p>
              <p className="font-serif text-sm text-gc-body leading-relaxed">{section.internalExternal.internal}</p>
            </div>
            <div className="border border-gc-gold/40 px-4 py-3">
              <p className="font-sans text-xs tracking-widest text-gc-gold mb-2">
                {L ? "EXTERNAL" : "EXTERNE"}
              </p>
              <p className="font-serif text-sm text-gc-body leading-relaxed">{section.internalExternal.external}</p>
            </div>
          </div>
        )}

        {/* Allocation note */}
        {section.allocationNote && (
          <div className="mb-8 border-l-2 border-gc-gold pl-5 py-1">
            <p className="font-sans text-xs tracking-[0.2em] text-gc-gold mb-2">
              {L ? "ALLOCATION" : "ALLOCATION"}
            </p>
            <p className="font-serif text-sm text-gc-body leading-relaxed">{section.allocationNote}</p>
          </div>
        )}

        {/* Invariants */}
        {section.invariants && section.invariants.length > 0 && (
          <div className="mb-8 bg-gc-dark-blue text-gc-cream px-5 py-5">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-gold mb-4">
              {L ? "INVARIANTS — THESE NEVER CHANGE" : "INVARIANTS — CECI NE CHANGE JAMAIS"}
            </p>
            <ul className="space-y-3">
              {section.invariants.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gc-gold flex-shrink-0">—</span>
                  <span className="font-serif text-sm leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Governance note */}
        {section.governanceNote && (
          <div className="mb-8 border border-gc-dim/30 px-4 py-3">
            <p className="font-sans text-xs tracking-[0.2em] text-gc-dim mb-2">
              {L ? "GOVERNANCE NOTE" : "NOTE DE GOUVERNANCE"}
            </p>
            <p className="font-sans text-xs text-gc-dim leading-relaxed italic">{section.governanceNote}</p>
          </div>
        )}

        {/* Conversation scenarios accordion */}
        {section.scenarios && section.scenarios.length > 0 && (
          <div className="mb-10">
            <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-4">
              {L ? "CONVERSATION SCENARIOS" : "SCÉNARIOS DE CONVERSATION"}
            </p>
            {section.scenarios.map((sc, i) => (
              <div key={i} className="border border-gc-mid-blue/40 mb-2">
                <button
                  onClick={() => setOpenScenario(openScenario === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-gc-warm transition-colors"
                >
                  <span className="font-serif text-sm italic text-gc-body leading-relaxed">{sc.trigger}</span>
                  <span className="text-gc-gold text-lg flex-shrink-0">{openScenario === i ? "−" : "+"}</span>
                </button>
                {openScenario === i && (
                  <div className="px-5 pb-5 bg-gc-warm border-t border-gc-mid-blue/20">
                    <p className="font-sans text-xs tracking-widest text-gc-gold mb-3 pt-4">
                      {L ? "RESPONSE" : "RÉPONSE"}
                    </p>
                    <p className="font-serif text-sm leading-relaxed text-gc-body">{sc.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gc-mid-blue/30">
          <button
            onClick={handleBack}
            className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-body transition-colors py-2"
          >
            ← {L ? "BACK" : "RETOUR"}
          </button>

          <button
            onClick={handleNext}
            className="border border-gc-dark-blue text-gc-dark-blue px-6 py-3 font-sans text-xs tracking-widest hover:bg-gc-dark-blue hover:text-gc-cream transition-colors duration-200"
          >
            {isLast
              ? (L ? "VERIFICATION →" : "VÉRIFICATION →")
              : (L ? "CONTINUE →" : "CONTINUER →")}
          </button>
        </div>
      </main>
    </div>
  );
}
