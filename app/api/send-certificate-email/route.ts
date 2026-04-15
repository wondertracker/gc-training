import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getResend } from '@/lib/email/resend'
import { CompletionEmail, completionSubject } from '@/lib/email/templates/completion'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://gc-training.vercel.app'

export async function POST(request: NextRequest) {
  try {
    const { userId, certificateId, language } = await request.json()

    if (!userId || !certificateId) {
      return NextResponse.json({ error: 'Missing userId or certificateId' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Get user email from auth.users
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId)
    if (userError || !user?.email) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get profile name
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId)
      .single()

    // Get certificate scores
    const { data: certificate } = await supabase
      .from('certificates')
      .select('overall_score, overall_total')
      .eq('id', certificateId)
      .single()

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    const lang = language ?? 'en'
    const certificateUrl = `${APP_URL}/certificate/${certificateId}`

    const { error: emailError } = await getResend().emails.send({
      from: 'Grande Charte <onboarding@resend.dev>',
      to: user.email,
      subject: completionSubject(lang),
      react: CompletionEmail({
        name: profile?.full_name ?? user.email,
        lang,
        certificateUrl,
        overallScore: certificate.overall_score,
        overallTotal: certificate.overall_total,
      }),
    })

    if (emailError) {
      console.error('Resend error:', emailError)
      return NextResponse.json({ error: emailError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('send-certificate-email error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
