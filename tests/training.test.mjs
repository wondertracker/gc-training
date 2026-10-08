import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
function load(path) {
  const result = ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  );
  const exports = {};
  new Function("exports", result.outputText)(exports);
  return exports;
}
const { MODULES } = load("../lib/training/content-v2.ts");
const { scoreAnswers, nextProgress } = load("../lib/training/scoring.ts");
test("all six modules are complete in both languages", () => {
  for (const lang of ["fr", "en"]) {
    const modules = MODULES(lang);
    assert.equal(modules.length, 6);
    for (const m of modules) {
      assert.ok(m.objective && m.image && m.source);
      assert.equal(m.sections.length, 4);
      assert.ok(m.sections.every((s) => s.title && s.body?.length >= 1));
      const questions = m.quiz.questions.filter((q) => q.type !== "scenario");
      assert.equal(questions.length, 3);
      questions.forEach((q) => {
        assert.equal(q.opts.length, 3);
        assert.ok(q.a >= 0 && q.a < 3);
        assert.ok(q.exp);
      });
      assert.equal(
        m.quiz.questions.filter((q) => q.type === "scenario").length,
        1,
      );
      assert.equal(m.quiz.questions.at(-1).rubric.length, 3);
    }
  }
});
test("English and French preserve scored facts and answers", () => {
  const fr = MODULES("fr"),
    en = MODULES("en");
  fr.forEach((m, i) => {
    assert.deepEqual(
      m.quiz.questions.map((q) => q.a),
      en[i].quiz.questions.map((q) => q.a),
    );
    assert.deepEqual(
      m.sections.flatMap(
        (s) =>
          s.cuvees?.map((c) => [
            c.name,
            c.blend,
            c.dosage.replace(",", "."),
            c.bottles,
          ]) || [],
      ),
      en[i].sections.flatMap(
        (s) =>
          s.cuvees?.map((c) => [
            c.name,
            c.blend,
            c.dosage.replace(",", "."),
            c.bottles,
          ]) || [],
      ),
    );
  });
});
test("source corrections preserve dosage, blends and ageing", () => {
  const c = MODULES("fr")[1].sections[1].cuvees;
  assert.equal(c.find((c) => c.name.includes("2004")).dosage, "3,6 g/L");
  assert.equal(c.find((c) => c.name.includes("2004")).aging, "13 ans");
  assert.equal(c.find((c) => c.name.includes("2007")).dosage, "3,6 g/L");
  assert.equal(c.find((c) => c.name.includes("Rosé")).dosage, "8 g/L");
  assert.ok(
    c.find((c) => c.name.includes("Rosé")).blend.includes("33 % Meunier"),
  );
});
test("server scoring rejects incomplete or malformed submissions", () => {
  const m = MODULES("fr")[0];
  for (const answers of [
    null,
    [],
    [0, 1],
    [-1, 1, 2],
    [3, 1, 2],
    [1, "1", 2],
    [1, 1, 2, 0],
    new Array(3),
  ])
    assert.equal(scoreAnswers(m, answers), null);
});
test("all correct answers score three and wrong answers score zero", () => {
  for (const m of MODULES("fr")) {
    const answers = m.quiz.questions
      .filter((q) => q.type !== "scenario")
      .map((q) => q.a);
    assert.equal(scoreAnswers(m, answers), 3);
    assert.equal(
      scoreAnswers(
        m,
        answers.map((a) => (a + 1) % 3),
      ),
      0,
    );
  }
});
test("retakes keep best score and original pass date", () => {
  const previous = {
    best_score: 3,
    attempts: 2,
    passed: true,
    passed_at: "2026-01-01",
  };
  assert.deepEqual(nextProgress(previous, 0, "2026-10-07"), {
    best_score: 3,
    attempts: 3,
    passed: true,
    passed_at: "2026-01-01",
    last_attempted_at: "2026-10-07",
  });
});
test("threshold and first attempt are explicit", () => {
  assert.equal(nextProgress(null, 1, "now").passed, false);
  assert.equal(nextProgress(null, 2, "now").passed, true);
  assert.equal(nextProgress(null, 2, "now").passed_at, "now");
});

const { CompletionEmail } = load("../lib/email/templates/completion.tsx");
test("email escapes participant names and links", () => {
  const html = CompletionEmail({
    name: "<script>alert(1)</script>",
    lang: "fr",
    certificateUrl: 'https://example.com/?a=1&b="x"',
    overallScore: 15,
    overallTotal: 18,
  });
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("&amp;b=&quot;x&quot;"));
  assert.ok(html.includes("15/18"));
});
