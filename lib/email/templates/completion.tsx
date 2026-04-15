import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface CompletionEmailProps {
  name: string
  lang: string
  certificateUrl: string
  overallScore: number
  overallTotal: number
}

export function CompletionEmail({
  name,
  lang,
  certificateUrl,
  overallScore,
  overallTotal,
}: CompletionEmailProps) {
  const L = lang !== 'fr'
  const pct = Math.round((overallScore / overallTotal) * 100)

  const subject = L
    ? 'Your Certificate of Initiation — Grande Charte'
    : "Votre Certificat d'Initiation — Grande Charte"

  const previewText = L
    ? `Congratulations ${name} — your certificate has been issued.`
    : `Félicitations ${name} — votre certificat a été émis.`

  const greeting = L ? `Dear ${name},` : `Cher·ère ${name},`

  const body = L
    ? 'You have completed the doctrinal initiation of Maison Grande Charte. Your certificate has been issued and is available at the link below.'
    : "Vous avez complété l'initiation doctrinale de la Maison Grande Charte. Votre certificat a été émis et est disponible via le lien ci-dessous."

  const ctaLabel = L ? 'View Your Certificate →' : 'Voir votre certificat →'

  const scoreLabel = L ? 'Overall score' : 'Score total'

  const disclaimer = L
    ? 'Completion of this initiation does not automatically authorise representation. Final readiness requires doctrinal validation by the House.'
    : "La réalisation de cette initiation n'autorise pas automatiquement la représentation. La validation finale requiert une validation doctrinale par la Maison."

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src="https://gc-training.vercel.app/gc-sigle.png"
              width="72"
              height="72"
              alt="Grande Charte"
              style={logo}
            />
          </Section>

          {/* House name */}
          <Text style={houseName}>GRANDE CHARTE · CHAMPAGNE</Text>

          {/* Heading */}
          <Heading style={heading}>
            {L ? 'Initiation Complete.' : 'Initiation Complète.'}
          </Heading>

          <Hr style={divider} />

          {/* Body */}
          <Text style={bodyText}>{greeting}</Text>
          <Text style={bodyText}>{body}</Text>

          {/* CTA */}
          <Section style={ctaSection}>
            <Button style={ctaButton} href={certificateUrl}>
              {ctaLabel}
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Score */}
          <Text style={scoreText}>
            {scoreLabel}: {overallScore}/{overallTotal} · {pct}%
          </Text>

          <Hr style={divider} />

          {/* Disclaimer */}
          <Text style={disclaimerText}>{disclaimer}</Text>

          {/* Footer */}
          <Text style={footer}>Grande Charte · Champagne</Text>

        </Container>
      </Body>
    </Html>
  )
}

export function completionSubject(lang: string): string {
  return lang === 'fr'
    ? "Votre Certificat d'Initiation — Grande Charte"
    : 'Your Certificate of Initiation — Grande Charte'
}

// Styles
const DARK_BLUE = '#0A1628'
const GOLD = '#C9A84C'
const ROSE = '#C4956A'
const CREAM = '#F5F0E8'
const DIM = '#7A8A9E'

const main: React.CSSProperties = {
  backgroundColor: DARK_BLUE,
  fontFamily: 'Georgia, "Times New Roman", serif',
}

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
}

const logoSection: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '16px',
}

const logo: React.CSSProperties = {
  margin: '0 auto',
}

const houseName: React.CSSProperties = {
  color: ROSE,
  fontFamily: 'Arial, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.35em',
  textAlign: 'center',
  margin: '0 0 8px',
}

const heading: React.CSSProperties = {
  color: CREAM,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '28px',
  fontWeight: 'normal',
  textAlign: 'center',
  margin: '0 0 24px',
  letterSpacing: '0.02em',
}

const divider: React.CSSProperties = {
  borderColor: `${GOLD}40`,
  margin: '24px 0',
}

const bodyText: React.CSSProperties = {
  color: CREAM,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 12px',
}

const ctaSection: React.CSSProperties = {
  textAlign: 'center',
  margin: '28px 0',
}

const ctaButton: React.CSSProperties = {
  backgroundColor: GOLD,
  color: DARK_BLUE,
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px',
  letterSpacing: '0.15em',
  padding: '14px 32px',
  textDecoration: 'none',
  display: 'inline-block',
}

const scoreText: React.CSSProperties = {
  color: GOLD,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '16px',
  textAlign: 'center',
  margin: '0',
}

const disclaimerText: React.CSSProperties = {
  color: DIM,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '12px',
  fontStyle: 'italic',
  lineHeight: '1.6',
  textAlign: 'center',
  margin: '0',
}

const footer: React.CSSProperties = {
  color: DIM,
  fontFamily: 'Arial, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.2em',
  textAlign: 'center',
  margin: '24px 0 0',
}
