'use client';

export function PrintButton({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex flex-col items-end gap-1.5 no-print">
      <button
        onClick={() => window.print()}
        className="border border-gc-gold text-gc-gold px-5 py-2 font-sans text-xs tracking-widest hover:bg-gc-gold hover:text-gc-dark-blue transition-colors"
      >
        {label}
      </button>
      <p className="font-sans text-xs text-gc-dim max-w-xs text-right leading-relaxed">
        {hint}
      </p>
    </div>
  );
}
