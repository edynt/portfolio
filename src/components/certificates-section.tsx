"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certificates } from "@/data/portfolio-data";

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certificates</span>
          </h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Professional certifications and achievements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.verifyUrl || cert.image || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 group hover:border-primary-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl glass bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                  <Award size={24} className="text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-400 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-theme-muted text-sm">{cert.issuer}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{cert.verifyUrl ? "Verify" : "View"}</span>
                    <ExternalLink size={12} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
