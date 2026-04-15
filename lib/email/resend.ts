import { Resend } from 'resend'

// Lazy singleton — avoids throwing at build time when RESEND_API_KEY is absent
let _resend: Resend | null = null

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}
