import { NextResponse } from "next/server";
import { sameOrigin } from "@/lib/training/request-origin";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getResend } from "@/lib/email/resend";
import {
  CompletionEmail,
  completionSubject,
} from "@/lib/email/templates/completion";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  const auth = await createClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user?.email)
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  const body = await request.json().catch(() => null);
  if (
    typeof body?.certificateId !== "string" ||
    !/^[a-f\d-]{36}$/i.test(body.certificateId)
  )
    return NextResponse.json({ error: "Invalid certificate" }, { status: 400 });
  try {
    const s = createAdminClient();
    const { data: c, error } = await s
      .from("certificates")
      .select(
        "id,user_id,participant_name,overall_score,overall_total,language",
      )
      .eq("id", body.certificateId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (error)
      return NextResponse.json(
        { error: "Could not load certificate" },
        { status: 503 },
      );
    if (!c) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL)
      return NextResponse.json(
        { error: "Email delivery is not configured" },
        { status: 409 },
      );
    const url = new URL(
      `/certificate/${c.id}`,
      process.env.NEXT_PUBLIC_APP_URL || "https://gc-training.vercel.app",
    ).toString();
    const { error: sendError } = await getResend().emails.send(
      {
        from: process.env.RESEND_FROM_EMAIL,
        to: user.email,
        subject: completionSubject(c.language),
        html: CompletionEmail({
          name: c.participant_name,
          lang: c.language,
          certificateUrl: url,
          overallScore: c.overall_score,
          overallTotal: c.overall_total,
        }),
      },
      { idempotencyKey: `completion/${c.id}` },
    );
    if (sendError)
      return NextResponse.json(
        { error: "Could not send email" },
        { status: 502 },
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Could not send email" },
      { status: 503 },
    );
  }
}
