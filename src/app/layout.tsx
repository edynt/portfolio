import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tri Nguyen | Senior Fullstack Developer",
  description:
    "Senior Fullstack Developer with 5+ years of experience building high-performance web applications. Expert in Node.js, TypeScript, React, and cloud technologies. Available for remote opportunities worldwide.",
  keywords: [
    "senior fullstack developer",
    "fullstack developer",
    "web developer",
    "react developer",
    "nodejs developer",
    "typescript",
    "remote developer",
    "vietnam developer",
    "e-commerce developer",
    "performance optimization",
  ],
  authors: [{ name: "Tri Nguyen" }],
  creator: "Tri Nguyen",
  openGraph: {
    title: "Tri Nguyen | Senior Fullstack Developer",
    description:
      "5+ years building scalable web applications. Expert in Node.js, React, TypeScript. Open to remote opportunities.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tri Nguyen | Senior Fullstack Developer",
    description:
      "5+ years building scalable web applications. Expert in Node.js, React, TypeScript.",
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-white`}>
        {/* Ambient background glows */}
        <div className="ambient-glow w-96 h-96 bg-primary-500 top-0 left-1/4" />
        <div className="ambient-glow w-80 h-80 bg-accent-cyan top-1/3 right-1/4" />
        <div className="ambient-glow w-72 h-72 bg-accent-pink bottom-1/4 left-1/3" />
        {children}
      </body>
    </html>
  );
}
