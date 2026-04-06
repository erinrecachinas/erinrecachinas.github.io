import type { Metadata } from "next";
import { Arvo, Nunito } from "next/font/google";
import "./globals.css";

const arvo = Arvo({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-arvo",
});

const nunito = Nunito({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Erin Recachinas",
  authors: [{ name: "Erin Veasey" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${arvo.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
