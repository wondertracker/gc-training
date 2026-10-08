"use client";
import Image from "next/image";
import Link from "next/link";
import { usePreferences } from "./preferences";
import { MODULES } from "@/lib/training/data";
import type { ModuleProgress, Certificate } from "@/lib/training/types";
export function Programme({
  name,
  progress = [],
  certificate = null,
  preview = false,
  error,
}: {
  name?: string;
  progress?: ModuleProgress[];
  certificate?: Certificate | null;
  preview?: boolean;
  error?: string;
}) {
  const { lang } = usePreferences();
  const en = lang === "en";
  const modules = MODULES(lang);
  const base = preview ? "/preview" : "";
  const completed = progress.filter((p) => p.passed).length;
  const next = modules.findIndex(
    (_, i) => !progress.find((p) => p.module_index === i)?.passed,
  );
  const index = next < 0 ? 0 : next;
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <p className="eyebrow">
            {en
              ? "Your initiation · Six encounters"
              : "Votre initiation · Six rencontres"}
          </p>
          <h1>
            {en ? (
              <>
                The House,
                <br />
                in practice.
              </>
            ) : (
              <>
                La Maison,
                <br />
                en pratique.
              </>
            )}
          </h1>
          <p className="hero-copy">
            {en
              ? "Understand the wines. Find your own words. Create a conversation worthy of the House."
              : "Comprendre les vins. Trouver votre parole. Créer une conversation à la hauteur de la Maison."}
          </p>
          <div className="actions">
            <Link className="primary" href={`${base}/module/${index}`}>
              {en ? "Continue the programme" : "Poursuivre le parcours"} ↗
            </Link>
            <Link className="secondary" href={`${base}/prologue`}>
              {en ? "Before you begin" : "Avant de commencer"}
            </Link>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label={en ? "Modules passed" : "Modules validés"}
            aria-valuemin={0}
            aria-valuemax={6}
            aria-valuenow={completed}
          >
            <span style={{ width: `${(completed / 6) * 100}%` }} />
          </div>
          <small>
            {completed}/6{" "}
            {en ? "saved passes in your account" : "validations enregistrées dans votre compte"}
            {name ? ` · ${name}` : ""}
          </small>
        </div>
        <figure>
          <Image
            src="/training/iroise.jpg"
            width={848}
            height={1136}
            alt={
              en
                ? "Iroise bottle, marked by its time beneath the sea"
                : "Flacon Iroise, marqué par son temps sous la mer"
            }
            priority
          />
          <figcaption>Iroise 769 · © Alban Couturier</figcaption>
        </figure>
      </section>
      {error && (
        <p role="alert" className="note error">
          {en
            ? "Your saved progress could not be loaded. Try again before taking a quiz."
            : "Votre progression n’a pas pu être chargée. Réessayez avant de passer un questionnaire."}
        </p>
      )}
      {certificate && (
        <div className="note">
          <p>
            {en
              ? "Your completion record is available."
              : "Votre attestation est disponible."}
          </p>
          <Link href={`/certificate/${certificate.id}`}>
            {en ? "View the record" : "Voir l’attestation"} ↗
          </Link>
        </div>
      )}
      <div className="intro-row">
        <h2>
          {en
            ? "Six ways into the House."
            : "Six portes d’entrée dans la Maison."}
        </h2>
        <small>
          {en ? "Read · Check · Practise" : "Lire · Vérifier · Pratiquer"}
        </small>
      </div>
      <div className="module-list">
        {modules.map((m, i) => {
          const p = progress.find((p) => p.module_index === i);
          return (
            <Link
              className="module-row"
              key={m.number}
              href={`${base}/module/${i}`}
            >
              <span className="module-number">{m.number}</span>
              <div>
                <h3>{m.label}</h3>
                <p>{m.objective}</p>
              </div>
              <span className="module-status">
                {m.duration} min
                <br />
                {p?.passed
                  ? `${en ? "Recorded" : "Enregistré"} · ${p.best_score}/3`
                  : p
                    ? en
                      ? "Review"
                      : "À reprendre"
                    : en
                      ? "Discover"
                      : "Découvrir"}{" "}
                ↗
              </span>
            </Link>
          );
        })}
      </div>
      <p className="muted mt-6 text-sm">
        {en
          ? "Read the modules in order or revisit a reference whenever you need it. Account results are preserved across editions. Earlier scores do not establish a new validation of the V2 content."
          : "Suivez l’ordre du parcours, ou retrouvez un repère selon votre besoin. Les résultats du compte sont conservés entre les éditions. Les scores antérieurs ne constituent pas une nouvelle validation du contenu V2."}
      </p>
    </div>
  );
}
