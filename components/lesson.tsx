"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MODULES } from "@/lib/training/data";
import { useDraft } from "@/lib/training/local-notes";
import { usePreferences } from "./preferences";
import { SectionContent } from "./section-content";
export function Lesson({
  index,
  userId,
  preview = false,
}: {
  index: number;
  userId: string;
  preview?: boolean;
}) {
  const { lang } = usePreferences();
  const en = lang === "en";
  const m = MODULES(lang)[index];
  const { draft, update, ready, saved } = useDraft(userId, index);
  const heading = useRef<HTMLHeadingElement>(null);
  const base = preview ? "/preview" : "";
  if (!ready)
    return (
      <div className="reading" role="status">
        {en ? "Opening your module…" : "Ouverture de votre module…"}
      </div>
    );
  const step = Math.min(draft.step, m.sections.length - 1);
  const section = m.sections[step];
  const go = (n: number) => {
    update({ step: n });
    requestAnimationFrame(() => {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: "start" });
    });
  };
  return (
    <div className="wrap">
      <p className="eyebrow">
        {m.number} · {m.label} · {m.duration} min
      </p>
      <div className="lesson-grid">
        <nav
          className="lesson-steps"
          aria-label={en ? "Module sections" : "Étapes du module"}
        >
          {m.sections.map((s, i) => (
            <button
              key={s.id}
              aria-current={i === step ? "step" : undefined}
              onClick={() => go(i)}
            >
              {s.id} · {s.title}
            </button>
          ))}
          <Link
            className="secondary mt-6"
            href={`${base}/module/${index}/quiz`}
          >
            {en ? "Check & practise" : "Vérifier et pratiquer"} ↗
          </Link>
        </nav>
        <article className="lesson-content">
          <Image
            className="lesson-image"
            src={m.image}
            width={848}
            height={600}
            alt={m.imageAlt}
            priority
          />
          <p className="eyebrow">{en ? "Your objective" : "Votre objectif"}</p>
          <p className="muted">{m.objective}</p>
          <h1 ref={heading} tabIndex={-1}>
            {section.title}
          </h1>
          <SectionContent section={section} en={en} />
          <div className="actions">
            <button
              className="secondary"
              disabled={step === 0}
              onClick={() => go(step - 1)}
            >
              {en ? "Previous" : "Précédent"}
            </button>
            {step < m.sections.length - 1 ? (
              <button className="primary" onClick={() => go(step + 1)}>
                {en ? "Continue" : "Continuer"} →
              </button>
            ) : (
              <Link className="primary" href={`${base}/module/${index}/quiz`}>
                {en ? "Check & practise" : "Vérifier et pratiquer"} ↗
              </Link>
            )}
          </div>
          <label htmlFor="module-note">
            {en ? "A thought to keep" : "Une idée à conserver"}
          </label>
          <textarea
            id="module-note"
            value={draft.note}
            onChange={(e) => update({ note: e.target.value })}
            placeholder={
              en
                ? "A question, a useful phrase, a detail to check…"
                : "Une question, une phrase utile, un détail à vérifier…"
            }
          />
          <p className="save-status" role="status">
            {saved
              ? en
                ? "Saved on this device. Find it in your notebook."
                : "Enregistré sur cet appareil. À retrouver dans votre carnet."
              : en
                ? "Local saving is unavailable. Copy your note before leaving."
                : "L’enregistrement local est indisponible. Copiez votre note avant de quitter."}
          </p>
          <p className="muted text-xs">{m.source}</p>
        </article>
      </div>
    </div>
  );
}
