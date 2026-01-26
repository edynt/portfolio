"use client";

import { motion } from "framer-motion";
import { skills, techStack } from "@/data/portfolio-data";

function SkillBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-theme-secondary">{name}</span>
        <span className="text-xs text-theme-muted">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full glass overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan"
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const skillCategories = [
    { title: "Frontend", icon: "🎨", skills: skills.frontend },
    { title: "Backend", icon: "⚙️", skills: skills.backend },
    { title: "Database", icon: "🗄️", skills: skills.database },
    { title: "DevOps", icon: "🚀", skills: skills.devops },
  ];

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
          <p className="text-theme-muted text-sm mt-2">
            * Percentages indicate my confidence level with each technology
          </p>
        </motion.div>

        {/* Skill bars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">{category.icon}</span>
                <h3 className="text-base font-semibold">{category.title}</h3>
              </div>
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={categoryIndex * 0.1 + skillIndex * 0.05}
                />
              ))}
            </motion.div>
          ))}
        </div>

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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
