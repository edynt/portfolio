import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/contexts/theme-context";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="scroll-smooth"
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {/* Ambient background glows */}
            <div className="ambient-glow w-96 h-96 bg-primary-500 top-0 left-1/4" />
            <div className="ambient-glow w-80 h-80 bg-accent-cyan top-1/3 right-1/4" />
            <div className="ambient-glow w-72 h-72 bg-accent-pink bottom-1/4 left-1/3" />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
