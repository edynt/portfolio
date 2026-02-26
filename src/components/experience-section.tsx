"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, ChevronRight, Zap } from "lucide-react";
import { experiences } from "@/data/portfolio-data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            6+ years of building impactful products at leading companies
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-primary-500/20 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, expIndex) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: expIndex * 0.1 }}
                className={`relative md:w-[calc(50%-2rem)] ${
                  expIndex % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`hidden md:block absolute top-8 w-4 h-4 rounded-full bg-primary-500 border-4 border-[#0f0f23] ${
                    expIndex % 2 === 0 ? "-right-[2.5rem]" : "-left-[2.5rem]"
                  }`}
                />

                <div className="glass-card rounded-2xl overflow-hidden">
                  {/* Company header */}
                  <div className="bg-gradient-to-r from-primary-600/20 to-transparent p-6 border-b border-white/5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 size={18} className="text-primary-400" />
                          <h3 className="text-xl font-bold">{exp.company}</h3>
                        </div>
                        <p className="text-theme-muted text-sm">
                          {exp.companyDescription}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-full glass text-primary-300 text-sm font-medium">
                          {exp.position}
                        </span>
                        <div className="flex items-center gap-1 mt-2 text-theme-muted text-sm justify-end">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                          <span className="text-theme-muted">•</span>
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="p-6 space-y-6">
                    {exp.projects.map((project, projectIndex) => (
                      <div key={projectIndex}>
                        {/* Project header */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 rounded-lg glass mt-0.5">
                            <Briefcase size={16} className="text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-semibold">{project.name}</h4>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-accent-cyan/20 text-accent-cyan">
                                {project.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-theme-muted mt-1">
                              <span>{project.duration}</span>
                              <span>•</span>
                              <span className="text-primary-400">
                                {project.impact}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <ul className="space-y-2 mb-4 ml-11">
                          {project.highlights.slice(0, 4).map((highlight, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-theme-secondary"
                            >
                              <Zap
                                size={14}
                                className="text-yellow-500 mt-0.5 flex-shrink-0"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 ml-11">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-xs rounded glass text-theme-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="px-2 py-0.5 text-xs rounded glass text-theme-muted">
                              +{project.technologies.length - 5}
                            </span>
                          )}
                        </div>

                        {/* Separator between projects */}
                        {projectIndex < exp.projects.length - 1 && (
                          <div className="border-t border-white/5 mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
