import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import CandyBoxHeader from "@/components/CandyBoxHeader";
import MobileBottomNav from "@/components/MobileBottomNav";
import DesktopSidebar from "@/components/DesktopSidebar";
import Web3Provider from "@/components/Web3Provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "T Manas Chakravarty | Full Stack Blockchain Developer",
  description:
    "Final-year B.Tech CSE student specializing in Cybersecurity and Blockchain development. Building scalable full-stack applications with modern frameworks, smart contracts, and API integrations across 7+ blockchain ecosystems.",
  keywords: [
    "Blockchain Developer",
    "Full Stack Developer",
    "Web3",
    "Smart Contracts",
    "Solidity",
    "React",
    "Next.js",
    "Ethereum",
    "DeFi",
    "Manas Chakravarty",
  ],
  authors: [{ name: "T Manas Chakravarty" }],
  creator: "T Manas Chakravarty",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Manas Chakravarty | Full Stack Blockchain Developer",
    description:
      "Building the decentralized future, one smart contract at a time. 15+ internships | 5+ hackathon wins | 7+ blockchain ecosystems.",
    siteName: "Manas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Chakravarty | Full Stack Blockchain Developer",
    description: "Building the decentralized future, one smart contract at a time.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased selection:bg-yellow-500/20`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="bg-glow" />
          <Web3Provider>
            <CandyBoxHeader />
            <DesktopSidebar />
            <MobileBottomNav />
            <main className="page-wrapper min-h-screen relative z-10">
              {children}
            </main>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
