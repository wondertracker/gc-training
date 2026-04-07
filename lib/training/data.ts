import type { Module } from "./types";

export { PROLOGUE_EN, PROLOGUE_FR } from "./data-prologue";

export {
  SECTIONS_EN_I, SECTIONS_FR_I, QUIZ_EN_I, QUIZ_FR_I,
  SECTIONS_EN_II, SECTIONS_FR_II, QUIZ_EN_II, QUIZ_FR_II,
  SECTIONS_EN_III, SECTIONS_FR_III, QUIZ_EN_III, QUIZ_FR_III,
} from "./data-modules-1-3";

export {
  SECTIONS_EN_IV, SECTIONS_FR_IV, QUIZ_EN_IV, QUIZ_FR_IV,
  SECTIONS_EN_V, SECTIONS_FR_V, QUIZ_EN_V, QUIZ_FR_V,
  SECTIONS_EN_VI, SECTIONS_FR_VI, QUIZ_EN_VI, QUIZ_FR_VI,
} from "./data-modules-4-6";

import {
  SECTIONS_EN_I, SECTIONS_FR_I, QUIZ_EN_I, QUIZ_FR_I,
  SECTIONS_EN_II, SECTIONS_FR_II, QUIZ_EN_II, QUIZ_FR_II,
  SECTIONS_EN_III, SECTIONS_FR_III, QUIZ_EN_III, QUIZ_FR_III,
} from "./data-modules-1-3";

import {
  SECTIONS_EN_IV, SECTIONS_FR_IV, QUIZ_EN_IV, QUIZ_FR_IV,
  SECTIONS_EN_V, SECTIONS_FR_V, QUIZ_EN_V, QUIZ_FR_V,
  SECTIONS_EN_VI, SECTIONS_FR_VI, QUIZ_EN_VI, QUIZ_FR_VI,
} from "./data-modules-4-6";

export function MODULES(lang: string): Module[] {
  const L = lang === "en";
  return [
    {
      number: "I",
      label: L ? "Origin & Doctrine" : "Origine et Doctrine",
      sections: L ? SECTIONS_EN_I : SECTIONS_FR_I,
      quiz: L ? QUIZ_EN_I : QUIZ_FR_I,
    },
    {
      number: "II",
      label: L ? "The Collections" : "Les Collections",
      sections: L ? SECTIONS_EN_II : SECTIONS_FR_II,
      quiz: L ? QUIZ_EN_II : QUIZ_FR_II,
    },
    {
      number: "III",
      label: L ? "Iroise 769 — In Depth" : "Iroise 769 — En Profondeur",
      sections: L ? SECTIONS_EN_III : SECTIONS_FR_III,
      quiz: L ? QUIZ_EN_III : QUIZ_FR_III,
    },
    {
      number: "IV",
      label: L ? "The Conversation" : "La Conversation",
      sections: L ? SECTIONS_EN_IV : SECTIONS_FR_IV,
      quiz: L ? QUIZ_EN_IV : QUIZ_FR_IV,
    },
    {
      number: "V",
      label: L ? "Custodians & Experience" : "Allocataires et Experience",
      sections: L ? SECTIONS_EN_V : SECTIONS_FR_V,
      quiz: L ? QUIZ_EN_V : QUIZ_FR_V,
    },
    {
      number: "VI",
      label: L ? "International Presence" : "Presence Internationale",
      sections: L ? SECTIONS_EN_VI : SECTIONS_FR_VI,
      quiz: L ? QUIZ_EN_VI : QUIZ_FR_VI,
    },
  ];
}

