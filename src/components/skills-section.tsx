"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/portfolio-data";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Technologies I use to build scalable, performant applications
          </p>
        </motion.div>

        {/* Tech Stack Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-center mb-8">
            Complete Tech Stack
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Languages */}
            <div>
              <h4 className="text-sm font-medium text-primary-400 mb-3">
                Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.languages.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div>
              <h4 className="text-sm font-medium text-primary-400 mb-3">
                Frontend
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.frontend.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h4 className="text-sm font-medium text-primary-400 mb-3">
                Backend
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.backend.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div>
              <h4 className="text-sm font-medium text-primary-400 mb-3">
                Databases
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.databases.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* DevOps */}
            <div>
              <h4 className="text-sm font-medium text-primary-400 mb-3">
                DevOps & Cloud
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.devops.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-sm font-medium text-primary-400 mb-3">
                Tools & Others
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.tools.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* AI */}
            <div>
              <h4 className="text-sm font-medium text-primary-400 mb-3">
                AI & Productivity
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.ai.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
