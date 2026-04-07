export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { GCSigil } from "@/components/gc-sigil";
import { MODULES } from "@/lib/training/data";
export default async function ResultPage({ params }: { params: { index: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const moduleIndex = parseInt(params.index, 10);

  const { data: profile } = await supabase
    .from("profiles").select("*").eq("id", user.id).single();
  const lang = profile?.language ?? "en";
  const L = lang === "en";

  const modules = MODULES(lang);
  const mod = modules[moduleIndex];

  const { data: session } = await supabase
    .from("training_sessions").select("id").eq("user_id", user.id).single();

  let progress = null;
  if (session) {
    const { data } = await supabase
      .from("module_progress")
      .select("*")
      .eq("session_id", session.id)
      .eq("module_index", moduleIndex)
      .single();
    progress = data;
  }

  // Check for certificate (all modules passed)
  let certificate = null;
  if (session) {
    const { data } = await supabase
      .from("certificates").select("*").eq("session_id", session.id).single();
    certificate = data;
  }

  const score = progress?.best_score ?? 0;
  const passed = progress?.passed ?? false;
  const nextModuleIndex = moduleIndex + 1;

  return (
    <div className="min-h-screen bg-gc-dark-blue text-gc-cream">
      <header className="border-b border-gc-mid-blue px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GCSigil size={28} color="#C9A84C" />
          <div>
            <p className="text-gc-gold font-sans text-xs tracking-[0.25em]">GRANDE CHARTE</p>
            <p className="text-gc-dim font-sans text-xs tracking-widest">
              {L ? "MODULE" : "MODULE"} {mod?.number} · {L ? "RESULT" : "RÉSULTAT"}
            </p>
          </div>
        </div>
        <Link href="/" className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-cream transition-colors">
          {L ? "ALL MODULES" : "TOUS LES MODULES"}
        </Link>
      </header>

      <main className="max-w-lg mx-auto px-4 md:px-6 py-16">
        {passed ? (
          <>
            {/* PASSED */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full border-2 border-gc-green flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6 10-10" stroke="#3A7A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-sans text-xs tracking-[0.3em] text-gc-green mb-3">
                {L ? "VERIFICATION PASSED" : "VÉRIFICATION VALIDÉE"}
              </p>
              <div className="font-serif text-6xl text-gc-cream mb-2">{score}</div>
              <div className="font-sans text-gc-dim text-sm tracking-wider">/ 3</div>
            </div>

            {/* Score bars */}
            <div className="flex justify-center gap-2 mb-12">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-12 h-1.5 rounded-full ${i < score ? "bg-gc-green" : "bg-gc-mid-blue"}`}
                />
              ))}
            </div>

            {/* Module label */}
            <p className="text-center font-serif text-gc-dim text-base mb-12">
              {mod?.label}
            </p>

            {/* Primary CTA */}
            {certificate ? (
              <div className="space-y-3">
                <div className="border border-gc-gold p-5 text-center mb-4">
                  <p className="font-sans text-xs tracking-widest text-gc-gold mb-2">
                    {L ? "ALL MODULES COMPLETE" : "TOUS LES MODULES VALIDÉS"}
                  </p>
                  <p className="font-serif text-gc-cream text-sm">
                    {L ? "Your certificate has been issued." : "Votre certificat a été émis."}
                  </p>
                </div>
                <Link
                  href={`/certificate/${certificate.id}`}
                  className="block w-full text-center bg-gc-gold text-gc-dark-blue py-4 font-sans text-xs tracking-widest hover:bg-gc-cream transition-colors"
                >
                  {L ? "VIEW YOUR CERTIFICATE →" : "VOIR VOTRE CERTIFICAT →"}
                </Link>
              </div>
            ) : moduleIndex < 5 ? (
              <Link
                href={`/module/${nextModuleIndex}`}
                className="block w-full text-center bg-gc-gold text-gc-dark-blue py-4 font-sans text-xs tracking-widest hover:bg-gc-cream transition-colors mb-3"
              >
                {`MODULE ${modules[nextModuleIndex]?.number} →`}
              </Link>
            ) : (
              <Link
                href="/"
                className="block w-full text-center bg-gc-gold text-gc-dark-blue py-4 font-sans text-xs tracking-widest hover:bg-gc-cream transition-colors mb-3"
              >
                {L ? "ALL MODULES →" : "TOUS LES MODULES →"}
              </Link>
            )}

            {/* Secondary CTAs */}
            <div className="flex gap-4 justify-center mt-4">
              <Link
                href={`/module/${moduleIndex}/quiz`}
                className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-cream transition-colors py-2"
              >
                {L ? "Retake" : "Refaire"}
              </Link>
              <span className="text-gc-mid-blue">·</span>
              <Link
                href="/"
                className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-cream transition-colors py-2"
              >
                {L ? "All Modules" : "Tous les Modules"}
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* FAILED */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full border-2 border-gc-rose/60 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-gc-rose text-2xl">×</span>
              </div>
              <p className="font-sans text-xs tracking-[0.3em] text-gc-rose mb-3">
                {L ? "VERIFICATION INCOMPLETE" : "VÉRIFICATION INCOMPLÈTE"}
              </p>
              <div className="font-serif text-6xl text-gc-cream mb-2">{score}</div>
              <div className="font-sans text-gc-dim text-sm tracking-wider">/ 3</div>
            </div>

            {/* Score bars */}
            <div className="flex justify-center gap-2 mb-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-12 h-1.5 rounded-full ${i < score ? "bg-gc-rose" : "bg-gc-mid-blue"}`}
                />
              ))}
            </div>

            <p className="text-center font-sans text-xs text-gc-dim tracking-wider mb-12">
              {L ? "Minimum: 2 of 3 questions correct." : "Minimum : 2 questions correctes sur 3."}
            </p>

            {/* Primary CTA */}
            <Link
              href={`/module/${moduleIndex}/quiz`}
              className="block w-full text-center bg-gc-rose/80 text-gc-dark-blue py-4 font-sans text-xs tracking-widest hover:bg-gc-rose transition-colors mb-4"
            >
              {L ? "RETAKE QUIZ →" : "REFAIRE LE QUIZ →"}
            </Link>

            {/* Secondary CTAs */}
            <div className="flex gap-4 justify-center">
              <Link
                href={`/module/${moduleIndex}`}
                className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-cream transition-colors py-2"
              >
                {L ? "Review Module" : "Revoir le Module"}
              </Link>
              <span className="text-gc-mid-blue">·</span>
              <Link
                href="/"
                className="text-gc-dim font-sans text-xs tracking-widest hover:text-gc-cream transition-colors py-2"
              >
                {L ? "All Modules" : "Tous les Modules"}
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
