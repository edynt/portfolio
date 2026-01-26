"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-8 px-6 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-theme-secondary text-sm flex items-center justify-center gap-1">
          &copy; {currentYear} Made with <Heart size={14} className="text-red-500" /> by Tri Nguyen
        </p>
      </div>
    </motion.footer>
  );
}
