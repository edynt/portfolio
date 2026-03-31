"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/portfolio-data";
import ThemeToggle from "./theme-toggle";

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
  if (href.startsWith("#")) {
    if (isHomePage) {
      return (
        <a href={href} className={className} onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={`/${href}`} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border border-transparent ${
        scrolled ? "glass !border-transparent py-4" : "py-6"
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
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
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
