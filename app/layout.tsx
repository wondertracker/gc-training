import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Preferences } from "@/components/preferences";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
export const metadata: Metadata = {
  title: "La Maison, en pratique · Grande Charte",
  description:
    "Le parcours de formation interne de la Maison Grande Charte. Liberté. Temps. Audace.",
  robots: { index: false, follow: false },
  icons: { icon: "/gc-sigle.png", apple: "/gc-sigle.png" },
};
const themeScript = `(function(){try{var t=localStorage.getItem('gc-theme');document.documentElement.dataset.theme=t==='blue'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches)?'blue':'light'}catch(e){}})()`;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = (await cookies()).get("gc-lang")?.value === "en" ? "en" : "fr";
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Preferences key={lang} initialLanguage={lang}>
          {children}
        </Preferences>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
