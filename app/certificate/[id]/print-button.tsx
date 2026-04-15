'use client';

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="border border-gc-gold text-gc-gold px-5 py-2 font-sans text-xs tracking-widest hover:bg-gc-gold hover:text-gc-dark-blue transition-colors"
    >
      {label}
    </button>
  );
}
