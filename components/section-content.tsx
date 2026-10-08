import type { Section } from "@/lib/training/types";
export function SectionContent({
  section,
  en,
}: {
  section: Section;
  en: boolean;
}) {
  return (
    <>
      {section.body?.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {section.facts && (
        <dl className="fact-list">
          {section.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {section.cuvees?.map((c) => (
        <details key={c.name}>
          <summary>{c.name}</summary>
          <dl className="fact-list">
            {[
              [en ? "Blend" : "Assemblage", c.blend],
              ["Dosage", c.dosage],
              [en ? "Ageing" : "Élevage", c.aging],
              [en ? "Release quantity" : "Tirage", c.bottles],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p>{c.spirit}</p>
        </details>
      ))}
    </>
  );
}
