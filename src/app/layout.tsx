import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tri Nguyen | Fullstack Developer",
  description: "Fullstack & Web Developer specializing in React, Next.js, Node.js, and modern web technologies. Building beautiful, performant web applications.",
  keywords: ["fullstack developer", "web developer", "react", "nextjs", "nodejs", "typescript"],
  authors: [{ name: "Tri Nguyen" }],
  openGraph: {
    title: "Tri Nguyen | Fullstack Developer",
    description: "Fullstack & Web Developer specializing in modern web technologies",
    type: "website",
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
