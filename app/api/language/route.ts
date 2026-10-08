import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (body?.language !== "fr" && body?.language !== "en")
    return NextResponse.json({ error: "Invalid language" }, { status: 400 });
  const s = await createClient();
  const {
    data: { user },
  } = await s.auth.getUser();
  if (user) {
    const { error } = await s
      .from("profiles")
      .update({ language: body.language })
      .eq("id", user.id);
    if (error)
      return NextResponse.json(
        { error: "Could not save preference" },
        { status: 500 },
      );
  }
  return NextResponse.json({ ok: true });
}
