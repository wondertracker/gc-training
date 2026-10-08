"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GCSigil } from "./gc-sigil";
import { Appearance, usePreferences } from "./preferences";
import { createClient } from "@/lib/supabase/client";
export function TrainingShell({
  children,
  admin = false,
  preview = false,
  auth = true,
}: {
  children: React.ReactNode;
  admin?: boolean;
  preview?: boolean;
  auth?: boolean;
}) {
  const { lang, setLanguage } = usePreferences();
  const en = lang === "en";
  const router = useRouter();
  const path = usePathname();
  const base = preview ? "/preview" : "";
  return (
    <>
      <a className="skip-link" href="#main">
        {en ? "Skip to content" : "Aller au contenu"}
      </a>
      <header className="house-header no-print">
        <Link className="wordmark" href={base || "/"}>
          <GCSigil size={38} />
          <span>
            GRANDE CHARTE
            <small>
              {en ? "THE HOUSE, IN PRACTICE" : "LA MAISON, EN PRATIQUE"}
            </small>
          </span>
        </Link>
        <div className="header-tools">
          <Appearance />
          <div
            className="language-switch"
            aria-label={en ? "Language" : "Langue"}
          >
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                aria-pressed={lang === l}
                onClick={() => setLanguage(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {auth && !preview && (
            <button
              className="quiet logout"
              onClick={async () => {
                const { error } = await createClient().auth.signOut();
                if (!error) {
                  router.replace("/auth/login");
                  router.refresh();
                }
              }}
            >
              {en ? "Sign out" : "Quitter"}
            </button>
          )}
        </div>
        {auth && (
          <nav aria-label={en ? "Training" : "Formation"}>
            {[
              [base || "/", en ? "Your programme" : "Mon parcours"],
              [`${base}/reperes`, en ? "Reference library" : "Les repères"],
              [`${base}/carnet`, en ? "My notebook" : "Mon carnet"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            {admin && <Link href="/admin">Administration</Link>}
            {preview && (
              <span className="preview-label">
                {en ? "Local preview" : "Aperçu local"}
              </span>
            )}
          </nav>
        )}
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="house-footer no-print">
        GRANDE CHARTE ·{" "}
        {en ? "Freedom. Time. Audacity." : "Liberté. Temps. Audace."}
      </footer>
    </>
  );
}
