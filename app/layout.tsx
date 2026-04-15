import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "GC Training Programme — Grande Charte",
  description: "Doctrinal initiation programme for ambassadors and partners of Maison Grande Charte.",
  icons: {
    icon: "/gc-sigle.png",
    apple: "/gc-sigle.png",
  },
  openGraph: {
    title: "GC Training Programme — Grande Charte",
    description: "Doctrinal initiation programme for ambassadors and partners of Maison Grande Charte.",
    url: "https://gc-training.vercel.app",
    siteName: "Grande Charte Training Programme",
    images: [
      {
        url: "https://gc-training.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grande Charte — Champagne",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GC Training Programme — Grande Charte",
    description: "Doctrinal initiation programme for ambassadors and partners of Maison Grande Charte.",
    images: ["https://gc-training.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/gc-sigle.png" />
        <link rel="apple-touch-icon" href="/gc-sigle.png" />
      </head>
      <body className="min-h-screen bg-gc-dark-blue text-gc-cream font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
