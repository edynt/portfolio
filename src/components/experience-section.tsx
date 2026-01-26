"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { experiences } from "@/data/portfolio-data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey and the projects I&apos;ve worked on
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, expIndex) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: expIndex * 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              {/* Company header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <div className="p-2 rounded-lg glass">
                    <Briefcase size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <p className="text-primary-400">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  <span className="text-sm">{exp.period}</span>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-6">
                {exp.projects.map((project, projectIndex) => (
                  <div
                    key={projectIndex}
                    className="border-l-2 border-primary-500/30 pl-4 ml-2"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronRight
                        size={16}
                        className="text-primary-400 flex-shrink-0"
                      />
                      <h4 className="font-medium">
                        {project.name}{" "}
                        <span className="text-gray-500 text-sm font-normal">
                          ({project.type} - {project.duration})
                        </span>
                      </h4>
                    </div>

                    <ul className="space-y-1 mb-3 ml-6">
                      {project.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="text-gray-400 text-sm flex items-start gap-2"
                        >
                          <span className="text-primary-400 mt-1.5 w-1 h-1 rounded-full bg-primary-400 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 ml-6">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-full glass text-primary-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 6 && (
                        <span className="px-2 py-0.5 text-xs rounded-full glass text-gray-400">
                          +{project.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
