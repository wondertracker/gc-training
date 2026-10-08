import { notFound } from "next/navigation";
import { Lesson } from "@/components/lesson";
import { trainingUser, moduleIndex } from "@/lib/training/server-user";
export default async function ModulePage({
  params,
}: {
  params: Promise<{ index: string }>;
}) {
  const resolvedParams = await params;
  const index = moduleIndex(resolvedParams.index);
  if (index === null) notFound();
  const user = await trainingUser();
  return <Lesson index={index} userId={user.id} />;
}
