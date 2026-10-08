export const dynamic = "force-dynamic";
import Link from "next/link";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { TrainingShell } from "@/components/training-shell";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  const en = (await cookies()).get("gc-lang")?.value === "en";
  return (
    <TrainingShell admin>
      <div className="admin-container">
        <nav className="admin-tabs" aria-label="Administration">
          <Link href="/admin">{en ? "Overview" : "Vue d’ensemble"}</Link>
          <Link href="/admin/trainees">
            {en ? "Participants" : "Participants"}
          </Link>
        </nav>
        {children}
      </div>
    </TrainingShell>
  );
}
