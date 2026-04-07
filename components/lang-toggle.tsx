"use client";

interface LangToggleProps {
  lang: string;
  onToggle: (lang: string) => void;
  className?: string;
}

export function LangToggle({ lang, onToggle, className = "" }: LangToggleProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => onToggle("en")}
        className={`px-2 py-0.5 text-xs font-sans tracking-widest transition-colors ${
          lang === "en"
            ? "text-gc-gold border-b border-gc-gold"
            : "text-gc-dim hover:text-gc-cream"
        }`}
      >
        EN
      </button>
      <span className="text-gc-dim text-xs">·</span>
      <button
        onClick={() => onToggle("fr")}
        className={`px-2 py-0.5 text-xs font-sans tracking-widest transition-colors ${
          lang === "fr"
            ? "text-gc-gold border-b border-gc-gold"
            : "text-gc-dim hover:text-gc-cream"
        }`}
      >
        FR
      </button>
    </div>
  );
}
