"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { navLinks } from "@/data/portfolio-data";
import ThemeToggle from "./theme-toggle";

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

function NavLink({
  href,
  children,
  className,
  onClick,
  isHomePage,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isHomePage: boolean;
}) {
  // Hash links: on home page use <a>, on other pages navigate to /<hash>
  if (href.startsWith("#")) {
    if (isHomePage) {
      return (
        <a href={href} className={className} onClick={onClick}>
          {children}
        </a>
      );
    }
    // From blog/other pages: use Link to navigate to home + hash
    return (
      <Link
        href={`/${href}` as Parameters<typeof Link>[0]["href"]}
        className={className}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href as Parameters<typeof Link>[0]["href"]}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [langOpen, setLangOpen] = useState(false);
  const [loadingLocale, setLoadingLocale] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoadingLocale(null);
  }, [locale]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = useCallback(
    (code: string) => {
      setLoadingLocale(code);
      router.replace(
        pathname as Parameters<typeof router.replace>[0],
        { locale: code }
      );
      setLangOpen(false);
    },
    [pathname, router]
  );

  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  return (
    <div className="relative" ref={langRef}>
      <button
        onClick={() => setLangOpen((v) => !v)}
        disabled={loadingLocale !== null}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-xl transition-colors ${
          langOpen
            ? "glass text-theme-primary"
            : "text-theme-secondary hover:text-theme-primary"
        }`}
      >
        {loadingLocale ? (
          <svg
            className="animate-spin w-3.5 h-3.5 text-primary-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          <span>{currentLang.flag}</span>
        )}
        <span className="text-xs font-semibold">{locale.toUpperCase()}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-150 ${langOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4.5l4 3 4-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {langOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 glass-card rounded-2xl py-2 z-50">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              disabled={loadingLocale !== null}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 mx-1 rounded-xl text-sm transition-colors hover:bg-white/5 ${
                locale === l.code
                  ? "text-primary-400 font-semibold"
                  : "text-theme-secondary"
              }`}
              style={{ width: "calc(100% - 8px)" }}
            >
              {loadingLocale === l.code ? (
                <svg
                  className="animate-spin w-4 h-4 text-primary-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <span>{l.flag}</span>
              )}
              <span>{l.label}</span>
              {locale === l.code && !loadingLocale && (
                <span className="ml-auto text-primary-400 text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isBlogPage = pathname.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="/"
          className="text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          TN.
        </motion.a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  href={link.href}
                  isHomePage={isHomePage}
                  className="text-theme-secondary hover:text-theme-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          {isBlogPage && <LanguageSwitcher />}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          {isBlogPage && <LanguageSwitcher />}
          <ThemeToggle />
          <button
            className="text-theme-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-4 mx-6 rounded-xl overflow-hidden"
          >
            <ul className="py-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    href={link.href}
                    isHomePage={isHomePage}
                    className="block px-6 py-3 text-theme-secondary hover:text-theme-primary hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
