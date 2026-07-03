import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Manas Chakravarty — Full Stack & Blockchain Developer",
  description:
    "Final-year CSE student (9.44 CGPA) building scalable full-stack apps, smart contracts, and Solana dApps across 7+ blockchain ecosystems. 5 hackathon wins, 15+ internships.",
  keywords: [
    "Blockchain Developer", "Full Stack Developer", "Web3", "Solana",
    "Smart Contracts", "Solidity", "React", "Next.js", "Ethereum",
    "DeFi", "Manas Chakravarty", "tmanas",
  ],
  authors: [{ name: "T Manas Chakravarty" }],
  creator: "T Manas Chakravarty",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Manas Chakravarty — Full Stack & Blockchain Developer",
    description: "15+ internships · 5 hackathon wins · 7+ blockchain ecosystems.",
    siteName: "Manas Chakravarty",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
