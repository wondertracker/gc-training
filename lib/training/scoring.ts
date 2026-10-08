import type { Module } from "./types";
export function scoreAnswers(module: Module, answers: unknown): number | null {
  const questions = module.quiz.questions.filter((q) => q.type !== "scenario");
  if (
    !Array.isArray(answers) ||
    answers.length !== questions.length ||
    !Array.from(answers).every(
      (a, i) =>
        Number.isInteger(a) && a >= 0 && a < (questions[i].opts?.length || 0),
    )
  )
    return null;
  return questions.reduce((sum, q, i) => sum + (answers[i] === q.a ? 1 : 0), 0);
}
export function nextProgress(
  previous: {
    best_score: number;
    attempts: number;
    passed: boolean;
    passed_at: string | null;
  } | null,
  score: number,
  now: string,
) {
  const best = Math.max(previous?.best_score || 0, score);
  return {
    best_score: best,
    attempts: (previous?.attempts || 0) + 1,
    passed: best >= 2,
    passed_at: previous?.passed_at || (best >= 2 ? now : null),
    last_attempted_at: now,
  };
}
