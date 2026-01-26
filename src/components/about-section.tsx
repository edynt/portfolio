"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Mail, Phone, Globe, CheckCircle } from "lucide-react";
import {
  personalInfo,
  coreCompetencies,
  languages,
} from "@/data/portfolio-data";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A passionate developer focused on building products that make a
            difference
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left column - Avatar & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Avatar */}
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="glass-card rounded-2xl p-4 relative z-10">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-cyan/20 rounded-full blur-2xl" />
            </div>

            {/* Contact Info Card */}
            <div className="glass-card rounded-2xl p-6 max-w-sm mx-auto lg:mx-0">
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors text-sm"
                >
                  <Mail size={16} className="text-primary-400 flex-shrink-0" />
                  <span className="truncate">{personalInfo.email}</span>
                </a>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors text-sm"
                >
                  <Phone size={16} className="text-primary-400 flex-shrink-0" />
                  <span>{personalInfo.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <MapPin size={16} className="text-primary-400 flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              {/* Languages */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <Globe size={14} />
                  Languages
                </h4>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-300">{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Bio & Competencies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <h3 className="text-2xl font-semibold mb-4">
              Building scalable solutions that drive business growth
            </h3>

            {/* Bio paragraphs */}
            <div className="text-gray-400 mb-8 space-y-4 leading-relaxed">
              {personalInfo.bio.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Core Competencies */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4">Core Competencies</h4>
              <div className="grid grid-cols-2 gap-3">
                {coreCompetencies.map((competency) => (
                  <div
                    key={competency}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle
                      size={16}
                      className="text-green-400 flex-shrink-0"
                    />
                    <span className="text-gray-300">{competency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What I bring */}
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4">What I Bring to Your Team</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">🚀</div>
                  <h5 className="font-medium text-sm mb-1">Performance</h5>
                  <p className="text-xs text-gray-500">
                    Optimize for speed and scalability
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">💡</div>
                  <h5 className="font-medium text-sm mb-1">Problem Solver</h5>
                  <p className="text-xs text-gray-500">
                    Turn complex problems into simple solutions
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">🤝</div>
                  <h5 className="font-medium text-sm mb-1">Team Player</h5>
                  <p className="text-xs text-gray-500">
                    Collaborate effectively across teams
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
