import { Notebook } from "@/components/notebook";
import { trainingUser } from "@/lib/training/server-user";
export default async function Notes() {
  const user = await trainingUser();
  return <Notebook userId={user.id} />;
}
