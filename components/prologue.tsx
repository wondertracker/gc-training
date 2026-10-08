"use client";
import Link from "next/link";
import { usePreferences } from "./preferences";
import { PROLOGUE_FR, PROLOGUE_EN } from "@/lib/training/data";
export function PrologueView({ preview = false }: { preview?: boolean }) {
  const { lang } = usePreferences();
  const p = lang === "en" ? PROLOGUE_EN : PROLOGUE_FR;
  return (
    <article className="reading">
      <p className="eyebrow">{p.label}</p>
      <h1>{p.title}</h1>
      {p.body.map((t) => (
        <p key={t}>{t}</p>
      ))}
      <ul>
        {p.commitment.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <blockquote>{p.quote}</blockquote>
      <Link className="primary" href={`${preview ? "/preview" : ""}/module/0`}>
        {lang === "en" ? "Begin the programme" : "Commencer le parcours"} ↗
      </Link>
    </article>
  );
}
