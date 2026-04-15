"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import Link from "next/link";
import { GCSigil } from "@/components/gc-sigil";
import { LangToggle } from "@/components/lang-toggle";
import { PROLOGUE_EN, PROLOGUE_FR } from "@/lib/training/data";

export default function ProloguePage() {
  const [lang, setLang] = useState("en");
  const prologue = lang === "en" ? PROLOGUE_EN : PROLOGUE_FR;

  return (
    <div className="min-h-screen bg-gc-cream text-gc-body">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-gc-dark-blue border-b border-gc-mid-blue px-6 py-4 flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <GCSigil size={32} />
          <Link
            href="/"
            className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-gold transition-colors"
          >
            ← {lang === "en" ? "ALL MODULES" : "TOUS LES MODULES"}
          </Link>
        </div>
        <LangToggle lang={lang} onToggle={setLang} />
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-14">
        {/* Label */}
        <p className="font-sans text-xs tracking-[0.3em] text-gc-rose mb-6">
          {prologue.label}
        </p>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl text-gc-body mb-10 leading-tight">
          {prologue.title}
        </h1>

        {/* Body paragraphs */}
        <div className="space-y-6 mb-12">
          {prologue.body.map((para, i) => (
            <p key={i} className="font-serif text-base leading-relaxed text-gc-body">
              {para}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gc-mid-blue/30 my-10" />

        {/* Commitment */}
        <div className="mb-10">
          <p className="font-sans text-xs tracking-[0.25em] text-gc-dim mb-5">
            {lang === "en" ? "YOUR COMMITMENT" : "VOTRE ENGAGEMENT"}
          </p>
          <ul className="space-y-3">
            {prologue.commitment.map((line, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gc-gold mt-0.5 flex-shrink-0">—</span>
                <span className="font-serif text-base text-gc-body leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quote */}
        <blockquote className="border-l-2 border-gc-gold pl-6 py-2 mb-12">
          <p className="font-serif text-lg italic text-gc-body leading-relaxed">
            "{prologue.quote}"
          </p>
        </blockquote>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/module/0"
            className="w-full sm:w-auto text-center border border-gc-dark-blue text-gc-dark-blue px-10 py-4 font-sans text-xs tracking-widest hover:bg-gc-dark-blue hover:text-gc-cream transition-colors duration-200"
          >
            {lang === "en" ? "BEGIN MODULE I →" : "COMMENCER LE MODULE I →"}
          </Link>
        </div>
      </main>
    </div>
  );
}
