"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin, Download } from "lucide-react";
import { personalInfo, keyHighlights } from "@/data/portfolio-data";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-6 pt-20 pb-12"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-green-400 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {personalInfo.availability}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-primary-400 font-semibold mb-3"
        >
          {personalInfo.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-sm md:text-base text-theme-muted mb-4"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-theme-secondary mb-4 max-w-2xl mx-auto"
        >
          {personalInfo.subtitle}
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-2 text-theme-muted text-sm mb-8"
        >
          <MapPin size={14} />
          <span>{personalInfo.location}</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-primary-600 hover:bg-primary-500 transition-all font-medium shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40 text-white"
          >
            Let&apos;s Work Together
          </a>
          <a
            href="/cv/cv.pdf"
            target="_blank"
            className="px-8 py-3 rounded-full glass hover:bg-white/10 transition-colors font-medium flex items-center gap-2"
          >
            <Download size={18} />
            Download Resume
          </a>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {keyHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="glass-card rounded-xl p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">
                {highlight.metric}
              </div>
              <div className="text-sm font-medium text-theme-primary">
                {highlight.label}
              </div>
              <div className="text-xs text-theme-muted">{highlight.description}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1 },
          y: { repeat: Infinity, duration: 2 },
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-theme-secondary hover:text-theme-primary transition-colors"
        aria-label="Scroll to About section"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
