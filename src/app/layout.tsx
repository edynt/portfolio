import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tri Nguyen | Fullstack Developer",
  description:
    "Fullstack Developer with 5+ years of experience building high-performance web applications. Expert in Node.js, TypeScript, React, and cloud technologies. Available for remote opportunities worldwide.",
  keywords: [
    "fullstack developer portfolio",
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
    title: "Tri Nguyen | Fullstack Developer",
    description:
      "5+ years building scalable web applications. Expert in Node.js, React, TypeScript. Open to remote opportunities.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tri Nguyen | Fullstack Developer",
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
  return children;
}
