import { notFound } from "next/navigation";
import { TrainingShell } from "@/components/training-shell";
import { Programme } from "@/components/programme";
import { Lesson } from "@/components/lesson";
import { QuizView } from "@/components/quiz";
import { ReferenceLibrary } from "@/components/reference-library";
import { Notebook } from "@/components/notebook";
import { PrologueView } from "@/components/prologue";
export default async function Preview({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const resolvedParams = await params;
  if (process.env.NODE_ENV !== "development") notFound();
  const path = resolvedParams.path || [];
  let view: React.ReactNode;
  if (!path.length) view = <Programme preview />;
  else if (path.length === 1 && path[0] === "reperes")
    view = <ReferenceLibrary preview />;
  else if (path.length === 1 && path[0] === "carnet")
    view = <Notebook userId="local-preview" preview />;
  else if (path.length === 1 && path[0] === "prologue")
    view = <PrologueView preview />;
  else if (path[0] === "module" && /^[0-5]$/.test(path[1]) && path.length === 2)
    view = <Lesson index={Number(path[1])} userId="local-preview" preview />;
  else if (
    path[0] === "module" &&
    /^[0-5]$/.test(path[1]) &&
    path.length === 3 &&
    path[2] === "quiz"
  )
    view = <QuizView index={Number(path[1])} userId="local-preview" preview />;
  else notFound();
  return <TrainingShell preview>{view}</TrainingShell>;
}
