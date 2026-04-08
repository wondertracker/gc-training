"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GCSigil } from "@/components/gc-sigil";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"signin" | "register">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Auto sign in after registration (email confirm disabled)
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError("Account created. Please sign in.");
        setTab("signin");
        setLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    }
  }

  const inputClass =
    "w-full bg-transparent border border-gc-mid-blue text-gc-cream placeholder-gc-dim px-4 py-3 text-sm font-sans focus:outline-none focus:border-gc-gold transition-colors";

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
        {/* Tab bar */}
        <div className="flex border-b border-gc-mid-blue">
          <button
            onClick={() => { setTab("signin"); setError(null); }}
            className={`flex-1 py-3 text-xs font-sans tracking-widest transition-colors ${
              tab === "signin"
                ? "text-gc-gold bg-gc-mid-blue/20"
                : "text-gc-dim hover:text-gc-cream"
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => { setTab("register"); setError(null); }}
            className={`flex-1 py-3 text-xs font-sans tracking-widest transition-colors ${
              tab === "register"
                ? "text-gc-gold bg-gc-mid-blue/20"
                : "text-gc-dim hover:text-gc-cream"
            }`}
          >
            REGISTER
          </button>
        </div>

        <div className="p-8">
          {tab === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-gc-dim text-xs font-sans tracking-widest mb-2">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-gc-dim text-xs font-sans tracking-widest mb-2">PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
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
                {loading ? "SIGNING IN…" : "SIGN IN"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gc-dim text-xs font-sans tracking-widest mb-2">FULL NAME</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-gc-dim text-xs font-sans tracking-widest mb-2">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-gc-dim text-xs font-sans tracking-widest mb-2">PASSWORD</label>
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
              {error && (
                <p className="text-gc-red text-xs font-sans py-2">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gc-gold text-gc-dark-blue py-3 text-xs font-sans tracking-widest hover:bg-gc-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "CREATING ACCOUNT…" : "CREATE ACCOUNT"}
              </button>
            </form>
          )}
        </div>
      </div>

      <p className="mt-10 text-gc-dim text-xs font-sans tracking-wider text-center max-w-xs">
        Access is by invitation. Contact the House if you do not have credentials.
      </p>
    </div>
  );
}
