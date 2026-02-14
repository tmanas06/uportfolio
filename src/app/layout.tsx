import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "t manas chakravarty| Full Stack Blockchain Developer",
  description:
    "Solana dApps, Next.js, Hackathon Winner. Building scalable full-stack applications with modern frameworks, smart contracts, and API integrations across 7+ blockchain ecosystems.",
  keywords: [
    "Blockchain Developer",
    "Full Stack Developer",
    "Web3",
    "Solana",
    "Smart Contracts",
    "Solidity",
    "React",
    "Next.js",
    "Ethereum",
    "DeFi",
    "Manas Chakravarty",
    "tmanas",
  ],
  authors: [{ name: "T Manas Chakravarty" }],
  creator: "T Manas Chakravarty",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "t manas chakravarty | Full Stack Blockchain Developer",
    description:
      "Solana dApps, Next.js, Hackathon Winner. 15+ internships | 5+ hackathon wins | 7+ blockchain ecosystems.",
    siteName: "t manas chakravarty Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "t manas chakravarty | Full Stack Blockchain Developer",
    description:
      "Solana dApps, Next.js, Hackathon Winner. Building the decentralized future.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} font-mono antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
