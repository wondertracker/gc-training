"use client";
import { useState } from "react";
import { CONTENT_VERSION } from "./content-v2";
import { useStoredString } from "./browser-storage";
export interface Draft {
  step: number;
  answers: number[];
  scenario: string;
  reviewed: boolean;
  note: string;
}
export const emptyDraft: Draft = {
  step: 0,
  answers: [],
  scenario: "",
  reviewed: false,
  note: "",
};
export const draftKey = (user: string, index: number) =>
  `gc-training:${CONTENT_VERSION}:${user}:${index}`;
function parseDraft(raw: string | null): Draft {
  if (!raw) return { ...emptyDraft };
  try {
    const d = JSON.parse(raw);
    return {
      step: Number.isInteger(d.step) && d.step >= 0 && d.step <= 3 ? d.step : 0,
      answers:
        Array.isArray(d.answers) &&
        d.answers.every(
          (a: unknown) =>
            Number.isInteger(a) && Number(a) >= -1 && Number(a) < 3,
        )
          ? d.answers.slice(0, 3)
          : [],
      scenario: typeof d.scenario === "string" ? d.scenario : "",
      reviewed: d.reviewed === true,
      note: typeof d.note === "string" ? d.note : "",
    };
  } catch {
    return { ...emptyDraft };
  }
}
export function readDraft(user: string, index: number): Draft {
  return parseDraft(localStorage.getItem(draftKey(user, index)));
}
export function useDraft(user: string, index: number) {
  const { raw, available, ready, write } = useStoredString(
    draftKey(user, index),
  );
  const [unsaved, setUnsaved] = useState<{ key: string; draft: Draft } | null>(
    null,
  );
  const key = draftKey(user, index);
  const draft = unsaved?.key === key ? unsaved.draft : parseDraft(raw);
  const update = (patch: Partial<Draft>) => {
    const next = { ...draft, ...patch };
    if (write(JSON.stringify(next))) setUnsaved(null);
    else setUnsaved({ key, draft: next });
  };
  return { draft, update, ready, saved: available && !unsaved };
}
