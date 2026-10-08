"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useStoredString } from "@/lib/training/browser-storage";
import { useRouter, usePathname } from "next/navigation";
export type Language = "fr" | "en";
type Theme = "light" | "blue" | "system";
const Context = createContext({
  lang: "fr" as Language,
  theme: "light" as Theme,
  setLanguage: (_: Language) => {
    void _;
  },
  setTheme: (_: Theme) => {
    void _;
  },
});
export function Preferences({
  children,
  initialLanguage = "fr",
  preview = false,
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
  preview?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState(initialLanguage);
  const {
    raw: savedTheme,
    ready: themeReady,
    write: writeTheme,
  } = useStoredString("gc-theme");
  const [volatileTheme, updateTheme] = useState<Theme | null>(null);
  const theme: Theme =
    volatileTheme ||
    (savedTheme === "blue" || savedTheme === "system" ? savedTheme : "light");
  useEffect(() => {
    if (!themeReady) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      document.documentElement.dataset.theme =
        theme === "system" ? (media.matches ? "blue" : "light") : theme;
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme, themeReady]);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setTheme = (next: Theme) => {
    if (writeTheme(next)) updateTheme(null);
    else updateTheme(next);
  };
  const setLanguage = (next: Language) => {
    setLang(next);
    document.cookie = `gc-lang=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    try {
      localStorage.setItem("gc-lang", next);
    } catch {}
    if (!preview && !pathname.startsWith("/preview"))
      void fetch("/api/language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: next }),
      })
        .then(() => router.refresh())
        .catch(() => {});
  };
  return (
    <Context.Provider value={{ lang, theme, setLanguage, setTheme }}>
      {children}
    </Context.Provider>
  );
}
export function usePreferences() {
  return useContext(Context);
}
export function Appearance() {
  const { lang, theme, setTheme } = usePreferences();
  return (
    <label className="appearance">
      <span className="sr-only">
        {lang === "fr" ? "Apparence" : "Appearance"}
      </span>
      <select
        aria-label={lang === "fr" ? "Apparence" : "Appearance"}
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
      >
        <option value="light">{lang === "fr" ? "Clair" : "Light"}</option>
        <option value="blue">
          {lang === "fr" ? "Bleu Maison" : "House blue"}
        </option>
        <option value="system">
          {lang === "fr" ? "Selon l’appareil" : "Device setting"}
        </option>
      </select>
    </label>
  );
}
