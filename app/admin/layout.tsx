export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { GCSigil } from "@/components/gc-sigil";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single();

  if (profile?.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-gc-dark-blue text-gc-cream flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-gc-mid-blue flex flex-col flex-shrink-0">
        <div className="px-5 py-6 border-b border-gc-mid-blue">
          <GCSigil size={32} color="#C9A84C" />
          <p className="font-sans text-xs tracking-[0.25em] text-gc-gold mt-3">GRANDE CHARTE</p>
          <p className="font-sans text-xs tracking-widest text-gc-dim">ADMIN</p>
        </div>
        <nav className="flex-1 py-4">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-5 py-3 text-gc-dim hover:text-gc-cream hover:bg-gc-mid-blue/20 transition-colors font-sans text-xs tracking-widest"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            DASHBOARD
          </Link>
          <Link
            href="/admin/trainees"
            className="flex items-center gap-3 px-5 py-3 text-gc-dim hover:text-gc-cream hover:bg-gc-mid-blue/20 transition-colors font-sans text-xs tracking-widest"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1.5 12c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            TRAINEES
          </Link>
        </nav>
        <div className="px-5 py-4 border-t border-gc-mid-blue">
          <Link
            href="/"
            className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-cream transition-colors"
          >
            ← TRAINING
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
