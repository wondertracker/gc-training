import { notFound } from "next/navigation";
import { QuizView } from "@/components/quiz";
import { trainingUser, moduleIndex } from "@/lib/training/server-user";
export default async function QuizPage({
  params,
}: {
  params: Promise<{ index: string }>;
}) {
  const resolvedParams = await params;
  const index = moduleIndex(resolvedParams.index);
  if (index === null) notFound();
  const user = await trainingUser();
  return <QuizView index={index} userId={user.id} />;
}
