"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio-data";

export default function EducationSection() {
  return (
    <section id="education" className="py-24 px-6 section-alt">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Academic background and professional training
          </p>
        </motion.div>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 group hover:border-primary-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl glass bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors shrink-0">
                  <GraduationCap size={24} className="text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary-400 transition-colors">
                      {edu.institution}
                    </h3>
                    <span className="text-sm text-theme-muted shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-theme-secondary text-sm">{edu.degree}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
