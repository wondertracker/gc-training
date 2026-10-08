import { Login } from "@/components/login";
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return <Login callbackError={Boolean(params.error)} />;
}
