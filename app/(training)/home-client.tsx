"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GCSigil } from "@/components/gc-sigil";
import { LangToggle } from "@/components/lang-toggle";
import { MODULES } from "@/lib/training/data";
import type { Profile, TrainingSession, ModuleProgress, Certificate, Module } from "@/lib/training/types";

interface Props {
  profile: Profile | null;
  session: TrainingSession | null;
  progress: ModuleProgress[];
  certificate: Certificate | null;
  modules: Module[];
  lang: string;
  userId: string;
}

export function HomeClient({ profile, session, progress, certificate, modules: initialModules, lang: initialLang, userId }: Props) {
  const router = useRouter();
  const [lang, setLang] = useState(initialLang);
  const modules = MODULES(lang);

  useEffect(() => {
    const stored = localStorage.getItem("gc-lang");
    if (stored && stored !== initialLang) {
      setLang(stored);
    }
  }, [initialLang]);

  function getModuleProgress(index: number) {
    return progress.find((p) => p.module_index === index);
  }

  function isUnlocked(index: number): boolean {
    if (index === 0) return true;
    const prev = getModuleProgress(index - 1);
    return prev?.passed === true;
  }

  async function handleLangToggle(newLang: string) {
    setLang(newLang);
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ language: newLang })
      .eq("id", userId);
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  const allPassed = modules.every((_, i) => getModuleProgress(i)?.passed);
  const L = lang === "en";

  return (
    <div className="min-h-screen bg-gc-dark-blue text-gc-cream">
      {/* Header */}
      <header className="border-b border-gc-mid-blue px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <GCSigil size={40} />
          <div>
            <p className="text-gc-gold font-sans text-xs tracking-[0.25em]">GRANDE CHARTE</p>
            <p className="text-gc-dim font-sans text-xs tracking-widest">
              {L ? "TRAINING PROGRAMME" : "PROGRAMME DE FORMATION"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <LangToggle lang={lang} onToggle={handleLangToggle} />
          {profile?.role === "admin" && (
            <Link
              href="/admin"
              className="font-sans text-gc-dim hover:text-gc-cream transition-colors"
              style={{ fontSize: "10px", letterSpacing: "0.18em" }}
            >
              ADMIN →
            </Link>
          )}
          <button
            onClick={handleSignOut}
            className="text-gc-dim text-xs font-sans tracking-widest hover:text-gc-cream transition-colors"
          >
            {L ? "SIGN OUT" : "DÉCONNEXION"}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Greeting */}
        <div className="mb-10">
          <h2 className="font-serif text-gc-dim text-sm mb-1">
            {L ? "Welcome," : "Bienvenue,"}
          </h2>
          <h1 className="font-serif text-2xl text-gc-cream">
            {profile?.full_name || "Ambassador"}
          </h1>
        </div>

        {/* Certificate banner */}
        {allPassed && certificate && (
          <div className="mb-8 border border-gc-gold p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-gc-gold font-sans text-xs tracking-widest mb-1">
                {L ? "INITIATION COMPLETE" : "INITIATION COMPLÈTE"}
              </p>
              <p className="font-serif text-gc-cream text-sm">
                {L ? "All six modules passed." : "Les six modules sont validés."}
              </p>
            </div>
            <Link
              href={`/certificate/${certificate.id}`}
              className="whitespace-nowrap border border-gc-gold text-gc-gold px-4 py-2 text-xs font-sans tracking-widest hover:bg-gc-gold hover:text-gc-dark-blue transition-colors"
            >
              {L ? "VIEW CERTIFICATE →" : "VOIR LE CERTIFICAT →"}
            </Link>
          </div>
        )}

        {/* Prologue */}
        <Link
          href="/prologue"
          className="block mb-8 border border-gc-mid-blue px-5 py-4 hover:border-gc-gold transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gc-dim font-sans text-xs tracking-widest mb-1">
                {L ? "BEFORE YOU BEGIN" : "AVANT DE COMMENCER"}
              </p>
              <p className="font-serif text-gc-cream text-base group-hover:text-gc-gold transition-colors">
                {L ? "The Doctrinal Prologue" : "Le Prologue Doctrinal"}
              </p>
            </div>
            <span className="text-gc-dim group-hover:text-gc-gold transition-colors">→</span>
          </div>
        </Link>

        {/* Module grid */}
        <div className="space-y-3">
          <p className="text-gc-dim font-sans text-xs tracking-widest mb-4">
            {L ? "MODULES" : "MODULES"}
          </p>

          {modules.map((mod, index) => {
            const prog = getModuleProgress(index);
            const unlocked = isUnlocked(index);
            const passed = prog?.passed ?? false;
            const attempted = (prog?.attempts ?? 0) > 0;
            const score = prog?.best_score ?? 0;

            return (
              <ModuleRow
                key={index}
                index={index}
                mod={mod}
                passed={passed}
                attempted={attempted}
                score={score}
                unlocked={unlocked}
                lang={lang}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

interface ModuleRowProps {
  index: number;
  mod: Module;
  passed: boolean;
  attempted: boolean;
  score: number;
  unlocked: boolean;
  lang: string;
}

function ModuleRow({ index, mod, passed, attempted, score, unlocked, lang }: ModuleRowProps) {
  const L = lang === "en";

  if (!unlocked) {
    return (
      <div className="border border-gc-mid-blue/40 px-5 py-4 flex items-center justify-between opacity-40 cursor-not-allowed">
        <div className="flex items-center gap-4">
          <span className="font-serif text-gc-dim text-sm w-6">{mod.number}</span>
          <span className="font-sans text-gc-dim text-sm tracking-wide">{mod.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gc-dim font-sans text-xs tracking-wider">
            {L ? "LOCKED" : "VERROUILLÉ"}
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gc-dim">
            <rect x="2" y="6" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </div>
      </div>
    );
  }

  if (passed) {
    return (
      <Link
        href={`/module/${index}`}
        className="block border border-gc-green/40 px-5 py-4 hover:border-gc-green transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-gc-green text-sm w-6">{mod.number}</span>
            <span className="font-sans text-gc-cream text-sm tracking-wide">{mod.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gc-green font-sans text-xs tracking-wider">
              {L ? "PASSED" : "VALIDÉ"} · {score}/3
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gc-green">
              <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </Link>
    );
  }

  if (attempted) {
    return (
      <Link
        href={`/module/${index}`}
        className="block border border-gc-red/40 px-5 py-4 hover:border-gc-red transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-gc-rose text-sm w-6">{mod.number}</span>
            <span className="font-sans text-gc-cream text-sm tracking-wide">{mod.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gc-rose font-sans text-xs tracking-wider">
              {L ? "INCOMPLETE" : "INCOMPLET"} · {score}/3
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Available, not yet attempted
  return (
    <Link
      href={`/module/${index}`}
      className="block border border-gc-mid-blue px-5 py-4 hover:border-gc-gold transition-colors group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-serif text-gc-gold text-sm w-6">{mod.number}</span>
          <span className="font-sans text-gc-cream text-sm tracking-wide">{mod.label}</span>
        </div>
        <span className="text-gc-gold font-sans text-xs tracking-wider group-hover:translate-x-1 transition-transform">
          {L ? "BEGIN →" : "COMMENCER →"}
        </span>
      </div>
    </Link>
  );
}
