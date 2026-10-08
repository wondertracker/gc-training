"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MODULES } from "@/lib/training/data";
import { scoreAnswers } from "@/lib/training/scoring";
import { useDraft } from "@/lib/training/local-notes";
import { usePreferences } from "./preferences";
export function QuizView({
  index,
  userId,
  preview = false,
}: {
  index: number;
  userId: string;
  preview?: boolean;
}) {
  const { lang } = usePreferences();
  const en = lang === "en";
  const m = MODULES(lang)[index];
  const mcq = m.quiz.questions.filter((q) => q.type !== "scenario");
  const scenario = m.quiz.questions.find((q) => q.type === "scenario")!;
  const { draft, update, ready, saved } = useDraft(userId, index);
  const [revealed, setRevealed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<number | null>(null);
  const router = useRouter();
  const submitting = useRef(false);
  const base = preview ? "/preview" : "";
  if (!ready)
    return (
      <p className="reading" role="status">
        {en ? "Opening your draft…" : "Ouverture de votre brouillon…"}
      </p>
    );
  const allAnswered =
    draft.answers.length === 3 &&
    draft.answers.every((a) => Number.isInteger(a) && a >= 0);
  const score = scoreAnswers(m, draft.answers);
  async function submit() {
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setError("");
    if (preview) {
      setDone(score);
      setBusy(false);
      submitting.current = false;
      return;
    }
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index,
          language: lang,
          answers: draft.answers,
          scenario: draft.scenario,
          reviewed: draft.reviewed,
        }),
      });
      if (!response.ok) throw new Error("save");
      const data = await response.json();
      const warning = data.certificatePending ? "&certificate=pending" : "";
      router.push(`/result/${index}?score=${data.score}${warning}`);
      router.refresh();
    } catch {
      setError(
        en
          ? "The result could not be saved. Your draft is still here. Please retry."
          : "Le résultat n’a pas pu être enregistré. Votre brouillon est conservé ici. Réessayez.",
      );
      setBusy(false);
      submitting.current = false;
    }
  }
  return (
    <article className="reading">
      <p className="eyebrow">
        {m.number} · {m.label}
      </p>
      <h1>
        {en ? "Understand. Then practise." : "Comprendre. Puis pratiquer."}
      </h1>
      <p className="muted">
        {en
          ? "Three knowledge questions, followed by a written situation. The knowledge check passes at 2/3. The written response is self-assessed, not graded by the House."
          : "Trois questions de connaissances, puis une situation écrite. La vérification est validée à 2/3. La réponse écrite est auto-évaluée, sans correction par la Maison."}
      </p>
      {mcq.map((q, i) => (
        <fieldset className="quiz-options" key={i}>
          <legend>
            <span className="eyebrow">{i + 1}/3</span>
            <h2>{q.q}</h2>
          </legend>
          {q.opts?.map((o, j) => (
            <label className="quiz-option" key={j}>
              <input
                type="radio"
                name={`question-${i}`}
                checked={draft.answers[i] === j}
                disabled={revealed}
                onChange={() => {
                  const a = [0, 1, 2].map((k) => draft.answers[k] ?? -1);
                  a[i] = j;
                  update({ answers: a });
                }}
              />
              <span>{o}</span>
            </label>
          ))}
          {revealed && (
            <div className="quiz-feedback" role="status">
              <strong
                className={draft.answers[i] === q.a ? "success" : "error"}
              >
                {draft.answers[i] === q.a
                  ? en
                    ? "Correct"
                    : "Juste"
                  : en
                    ? "To review"
                    : "À revoir"}
              </strong>
              <p>{q.exp}</p>
              <Link href={`${base}/module/${index}`}>
                {en ? "Review the module" : "Revoir le module"} ↗
              </Link>
            </div>
          )}
        </fieldset>
      ))}
      {!revealed ? (
        <button
          className="primary"
          disabled={
            !allAnswered || draft.answers.some((a) => !Number.isInteger(a))
          }
          onClick={() => setRevealed(true)}
        >
          {en ? "Check my answers" : "Vérifier mes réponses"}
        </button>
      ) : (
        <>
          <p className="note">
            {en ? "This attempt" : "Cette tentative"} : {score}/3.{" "}
            {score !== null && score < 2
              ? en
                ? "Review the explanations before trying again."
                : "Relisez les explications avant de réessayer."
              : en
                ? "Continue with the situation below."
                : "Poursuivez avec la situation ci-dessous."}
          </p>
          <button
            className="secondary"
            onClick={() => {
              setRevealed(false);
              update({ answers: [] });
              setDone(null);
            }}
          >
            {en ? "Try again" : "Réessayer"}
          </button>
          <section className="mt-12">
            <p className="eyebrow">{en ? "In practice" : "En situation"}</p>
            <h2>{scenario.q}</h2>
            <label htmlFor="scenario-answer">
              {en
                ? "Your response, in your own words"
                : "Votre réponse, dans vos propres mots"}
            </label>
            <textarea
              id="scenario-answer"
              maxLength={12000}
              value={draft.scenario}
              onChange={(e) =>
                update({ scenario: e.target.value, reviewed: false })
              }
            />
            <p className="save-status">
              {draft.scenario.trim().length}/60{" "}
              {en ? "characters minimum" : "caractères minimum"}.{" "}
              {saved
                ? en
                  ? "Saved on this device."
                  : "Enregistré sur cet appareil."
                : en
                  ? "Local saving unavailable. Copy your draft."
                  : "Enregistrement local indisponible. Copiez votre brouillon."}
            </p>
            {draft.scenario.trim().length >= 60 && (
              <div className="note">
                <p>
                  {en
                    ? "Compare your response with these criteria:"
                    : "Comparez votre réponse à ces critères :"}
                </p>
                <ul>
                  {scenario.rubric?.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={draft.reviewed}
                    onChange={(e) => update({ reviewed: e.target.checked })}
                  />
                  <span>
                    {en
                      ? "I have reviewed my response against these criteria."
                      : "J’ai relu ma réponse à partir de ces critères."}
                  </span>
                </label>
              </div>
            )}
            <p className="muted text-sm">
              {en
                ? "Your text stays in your local notebook. Only the knowledge score is saved to your training account."
                : "Votre texte reste dans votre carnet local. Seul le score de connaissances est enregistré dans votre compte de formation."}
            </p>
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            <button
              className="primary"
              onClick={submit}
              disabled={
                busy || !draft.reviewed || draft.scenario.trim().length < 60
              }
            >
              {busy
                ? en
                  ? "Saving…"
                  : "Enregistrement…"
                : en
                  ? "Finish this check"
                  : "Terminer cette vérification"}
            </button>
            {done !== null && (
              <p role="status" className="note">
                {en
                  ? "Local preview complete. Score"
                  : "Aperçu local terminé. Score"}{" "}
                : {done}/3.{" "}
                {en
                  ? "No account data was written."
                  : "Aucune donnée de compte n’a été enregistrée."}
              </p>
            )}
          </section>
        </>
      )}
    </article>
  );
}
