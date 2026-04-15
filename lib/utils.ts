import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

/** Bilingual long date: "1 January 2024" or "1 janvier 2024". Used on certificates. */
export function formatLongDate(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const months = lang === "fr" ? MONTHS_FR : MONTHS_EN;
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/** English datetime with fallback: "01 Jan 2024, 14:30". Used in admin views. */
export function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
}

/** English short date with fallback: "01 Jan 2024". Used in admin views. */
export function formatDateShort(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
