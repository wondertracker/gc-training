"use client";
import { useState } from "react";
import Link from "next/link";
import { MODULES } from "@/lib/training/data";
import { usePreferences } from "./preferences";
import { SectionContent } from "./section-content";
export function ReferenceLibrary({ preview = false }: { preview?: boolean }) {
  const { lang } = usePreferences();
  const en = lang === "en";
  const [query, setQuery] = useState("");
  const modules = MODULES(lang);
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const needle = normalize(query.trim());
  const results = modules
    .flatMap((m, index) => m.sections.map((s) => ({ m, index, s })))
    .filter(
      ({ m, s }) =>
        !needle ||
        normalize(m.label + " " + JSON.stringify(s)).includes(needle),
    );
  return (
    <div className="reading">
      <p className="eyebrow">
        {en ? "Keep a reference close" : "Garder un repère à portée de main"}
      </p>
      <h1>{en ? "The reference library." : "Les repères."}</h1>
      <p className="muted">
        {en
          ? "Find a specification, a useful phrase or a point to check. These release figures do not indicate current stock."
          : "Retrouvez une fiche, une formulation ou un point à vérifier. Les chiffres des éditions n’indiquent pas les stocks actuels."}
      </p>
      <label htmlFor="reference-search">
        {en ? "Search the programme" : "Rechercher dans le parcours"}
      </label>
      <input
        id="reference-search"
        type="search"
        className="reference-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={
          en ? "Meunier, dosage, immersion…" : "Meunier, dosage, immersion…"
        }
      />
      <p role="status" className="muted text-sm">
        {results.length} {en ? "reference sections" : "rubriques"}
      </p>
      {results.map(({ m, index, s }) => (
        <details key={`${m.number}-${s.id}`}>
          <summary>
            {m.number} · {s.title}
          </summary>
          <SectionContent section={s} en={en} />
          <p className="muted text-xs">{m.source}</p>
          <Link href={`${preview ? "/preview" : ""}/module/${index}`}>
            {en ? "Open the module" : "Ouvrir le module"} ↗
          </Link>
        </details>
      ))}
      {!results.length && (
        <p>
          {en
            ? "Try another word, such as ‘dosage’ or ‘Iroise’."
            : "Essayez un autre terme, par exemple « dosage » ou « Iroise »."}
        </p>
      )}
    </div>
  );
}
