export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { GCSigil } from "@/components/gc-sigil";
import { AdminNavLinks } from "@/components/admin-nav-links";

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
          <GCSigil size={32} />
          <p className="font-sans text-xs tracking-[0.25em] text-gc-gold mt-3">GRANDE CHARTE</p>
          <p className="font-sans text-xs tracking-widest text-gc-dim">ADMIN</p>
        </div>
        <AdminNavLinks />
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
