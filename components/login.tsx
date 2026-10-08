"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { usePreferences } from "@/components/preferences";
import { TrainingShell } from "@/components/training-shell";
export function Login({ callbackError = false }: { callbackError?: boolean }) {
  const { lang } = usePreferences();
  const en = lang === "en";
  const [mode, setMode] = useState<"signin" | "register" | "recovery">(
    "signin",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    if (hash.get("type") === "recovery" && hash.get("access_token")) {
      void createClient()
        .auth.setSession({
          access_token: hash.get("access_token")!,
          refresh_token: hash.get("refresh_token") || "",
        })
        .then(({ error }) => {
          if (!error) {
            window.history.replaceState(null, "", "/auth/login");
            router.replace("/auth/reset-password");
          }
        });
    }
  }, [router, en]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const s = createClient();
      if (mode === "recovery") {
        const { error } = await s.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
        });
        if (error) throw error;
        setMessage(
          en
            ? "If this address has an account, a reset link will be sent."
            : "Si cette adresse possède un compte, un lien de réinitialisation sera envoyé.",
        );
      } else if (mode === "register") {
        const { data, error } = await s.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        if (data.session) {
          router.replace("/");
          router.refresh();
        } else
          setMessage(
            en
              ? "Check your email to confirm your account before signing in."
              : "Consultez votre boîte mail pour confirmer votre compte avant de vous connecter.",
          );
      } else {
        const { error } = await s.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace("/");
        router.refresh();
      }
    } catch {
      setError(
        en
          ? "The request could not be completed. Check your details and try again."
          : "La demande n’a pas abouti. Vérifiez vos informations et réessayez.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <TrainingShell auth={false}>
      <div className="wrap auth-grid">
        <div>
          <p className="eyebrow">
            {en
              ? "The internal training programme"
              : "Le parcours de formation interne"}
          </p>
          <Image
            className="auth-photo"
            src="/training/iroise.jpg"
            width={848}
            height={1136}
            alt={en ? "Iroise 769 bottle" : "Flacon Iroise 769"}
            priority
          />
          <small>Iroise 769 · © Alban Couturier</small>
        </div>
        <section className="auth-form">
          <h1>{en ? "Enter the House." : "Entrer dans la Maison."}</h1>
          <p className="muted">
            {en
              ? "Six encounters to understand the wines and find your own words."
              : "Six rencontres pour comprendre les vins et trouver votre parole."}
          </p>
          <div className="auth-tabs">
            {(["signin", "register"] as const).map((m) => (
              <button
                key={m}
                aria-pressed={mode === m}
                onClick={() => {
                  setMode(m);
                  setError("");
                  setMessage("");
                }}
              >
                {m === "signin"
                  ? en
                    ? "Sign in"
                    : "Se connecter"
                  : en
                    ? "Create an account"
                    : "Créer un compte"}
              </button>
            ))}
          </div>
          {mode === "recovery" && (
            <h2>
              {en ? "Reset your password" : "Réinitialiser le mot de passe"}
            </h2>
          )}
          {callbackError && (
            <p className="error" role="alert">
              {en
                ? "The sign-in link could not be verified. Request another link."
                : "Ce lien n’a pas pu être vérifié. Demandez un nouveau lien."}
            </p>
          )}
          <form onSubmit={submit}>
            {mode === "register" && (
              <>
                <label htmlFor="full-name">
                  {en ? "Full name" : "Nom complet"}
                </label>
                <input
                  id="full-name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={120}
                />
              </>
            )}
            <label htmlFor="email">
              {en ? "Email address" : "Adresse e-mail"}
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {mode !== "recovery" && (
              <>
                <label htmlFor="password">
                  {en ? "Password" : "Mot de passe"}
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete={
                    mode === "register" ? "new-password" : "current-password"
                  }
                  required
                  minLength={mode === "register" ? 8 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {mode === "register" && (
                  <p className="muted text-sm">
                    {en ? "At least 8 characters." : "Au moins 8 caractères."}
                  </p>
                )}
              </>
            )}
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="note" role="status">
                {message}
              </p>
            )}
            <button className="primary w-full" disabled={busy}>
              {busy
                ? en
                  ? "Please wait…"
                  : "Un instant…"
                : mode === "recovery"
                  ? en
                    ? "Send the reset link"
                    : "Envoyer le lien"
                  : mode === "register"
                    ? en
                      ? "Create my account"
                      : "Créer mon compte"
                    : en
                      ? "Sign in"
                      : "Se connecter"}
            </button>
          </form>
          <button
            className="quiet mt-4"
            onClick={() => {
              setMode(mode === "recovery" ? "signin" : "recovery");
              setError("");
              setMessage("");
            }}
          >
            {mode === "recovery"
              ? en
                ? "Back to sign in"
                : "Retour à la connexion"
              : en
                ? "Forgot password?"
                : "Mot de passe oublié ?"}
          </button>
        </section>
      </div>
    </TrainingShell>
  );
}
