"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { usePreferences } from "@/components/preferences";
import { TrainingShell } from "@/components/training-shell";
export default function Reset() {
  const { lang } = usePreferences();
  const en = lang === "en";
  const [ready, setReady] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => setReady(Boolean(user)))
      .catch(() => setReady(false));
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError(
        en
          ? "The passwords do not match."
          : "Les mots de passe ne correspondent pas.",
      );
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { error } = await createClient().auth.updateUser({ password });
      if (error) throw error;
      router.replace("/");
      router.refresh();
    } catch {
      setError(
        en
          ? "Could not update the password. Please retry."
          : "Le mot de passe n’a pas pu être modifié. Réessayez.",
      );
      setBusy(false);
    }
  }
  return (
    <TrainingShell auth={false}>
      <div className="reading auth-form">
        <h1>{en ? "A new password." : "Un nouveau mot de passe."}</h1>
        {ready === null ? (
          <p role="status">
            {en ? "Checking the link…" : "Vérification du lien…"}
          </p>
        ) : !ready ? (
          <>
            <p>
              {en
                ? "This link has expired or is invalid. Request a new link from the sign-in page."
                : "Ce lien est expiré ou invalide. Demandez un nouveau lien depuis la page de connexion."}
            </p>
            <Link href="/auth/login">
              {en ? "Return to sign in" : "Retour à la connexion"}
            </Link>
          </>
        ) : (
          <form onSubmit={submit}>
            <label htmlFor="new-password">
              {en
                ? "New password, at least 8 characters"
                : "Nouveau mot de passe, au moins 8 caractères"}
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirm-password">
              {en ? "Confirm the password" : "Confirmer le mot de passe"}
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="primary" disabled={busy}>
              {busy
                ? en
                  ? "Updating…"
                  : "Enregistrement…"
                : en
                  ? "Save password"
                  : "Enregistrer le mot de passe"}
            </button>
          </form>
        )}
      </div>
    </TrainingShell>
  );
}
