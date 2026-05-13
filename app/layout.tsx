import type { Metadata, Viewport } from "next";
import { Caprasimo, Quicksand, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const caprasimo = Caprasimo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mic's Pampered Pooches — Glasgow's friendliest dog groomer",
  description:
    "Boutique one-dog-at-a-time grooming room on Clarkston Road, Glasgow. Fully qualified, fully insured, pet first-aid trained.",
  openGraph: {
    title: "Mic's Pampered Pooches",
    description:
      "Tail-wag-guaranteed grooming in Glasgow's southside. Book a free meet-and-greet with Mic.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1208",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${caprasimo.variable} ${quicksand.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
