import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GC Training Programme · Grande Charte",
  description: "Doctrinal initiation programme for Maison Grande Charte ambassadors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gc-dark-blue text-gc-cream font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
