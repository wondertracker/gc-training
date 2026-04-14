"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GCSigil } from "@/components/gc-sigil";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  // The callback route already exchanged the code and set the session.
  // We just need to confirm the session is present before showing the form.
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/auth/login");
      } else {
        setReady(true);
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  const inputClass =
    "w-full bg-transparent border border-gc-mid-blue text-gc-cream placeholder-gc-dim px-4 py-3 text-sm font-sans focus:outline-none focus:border-gc-gold transition-colors";

  if (!ready) {
    return (
      <div className="min-h-screen bg-gc-dark-blue flex items-center justify-center">
        <div className="w-5 h-5 border border-gc-gold/40 border-t-gc-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gc-dark-blue flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <GCSigil size={80} />
      </div>

      {/* Wordmark */}
      <div className="text-center mb-10">
        <p className="text-gc-gold font-sans text-xs tracking-[0.3em] mb-1">GRANDE CHARTE · CHAMPAGNE</p>
        <h1 className="font-serif text-2xl text-gc-cream tracking-wide">Training Programme</h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm border border-gc-mid-blue">
        <div className="border-b border-gc-mid-blue px-8 py-4">
          <p className="text-gc-gold text-xs font-sans tracking-widest">SET NEW PASSWORD</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gc-dim text-xs font-sans tracking-widest mb-2">
                NEW PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Min. 8 characters"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-gc-dim text-xs font-sans tracking-widest mb-2">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="Repeat your password"
                className={inputClass}
              />
            </div>

            {error && (
              <p className="text-gc-red text-xs font-sans py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gc-gold text-gc-dark-blue py-3 text-xs font-sans tracking-widest hover:bg-gc-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "UPDATING…" : "UPDATE PASSWORD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
