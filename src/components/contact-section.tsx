"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Phone,
  Download,
  ArrowRight,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I&apos;m actively looking for new opportunities. Whether you have a
            role in mind or just want to chat, I&apos;d love to hear from you!
          </p>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-8 mb-12 text-center bg-gradient-to-r from-primary-600/20 to-accent-cyan/20"
        >
          <h3 className="text-2xl font-bold mb-3">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            I&apos;m open to full-time remote positions, contract work, and
            interesting freelance projects. Let&apos;s discuss how I can
            contribute to your team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${personalInfo.email}?subject=Job Opportunity`}
              className="px-8 py-3 rounded-full bg-primary-600 hover:bg-primary-500 transition-all font-medium shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40 flex items-center gap-2"
            >
              <Mail size={18} />
              Send Me an Email
              <ArrowRight size={16} />
            </a>
            <a
              href="/cv/cv.pdf"
              target="_blank"
              className="px-8 py-3 rounded-full glass hover:bg-white/10 transition-colors font-medium flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <p className="text-gray-400 mb-8">
              Whether you&apos;re a recruiter, a startup founder, or someone
              looking to collaborate, I&apos;d love to connect. Drop me a
              message and I&apos;ll get back to you within 24 hours.
            </p>

            <div className="space-y-5 mb-8">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl glass group-hover:bg-primary-600/20 transition-colors">
                  <Mail className="text-primary-400" size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-white group-hover:text-primary-400 transition-colors font-medium">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl glass group-hover:bg-primary-600/20 transition-colors">
                  <Phone className="text-primary-400" size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Phone / WhatsApp
                  </p>
                  <p className="text-white group-hover:text-primary-400 transition-colors font-medium">
                    {personalInfo.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl glass">
                  <MapPin className="text-primary-400" size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-white font-medium">
                    {personalInfo.location}
                  </p>
                  <p className="text-sm text-green-400">
                    Open to remote worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-gray-500 mb-3">Find me on</p>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Github size={20} />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Linkedin size={20} />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8"
            action={`mailto:${personalInfo.email}`}
            method="POST"
            encType="text/plain"
          >
            <h4 className="text-lg font-semibold mb-6">Send a Quick Message</h4>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl glass bg-transparent border border-white/10 focus:border-primary-500 focus:outline-none transition-colors placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl glass bg-transparent border border-white/10 focus:border-primary-500 focus:outline-none transition-colors placeholder-gray-600"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl glass bg-transparent border border-white/10 focus:border-primary-500 focus:outline-none transition-colors placeholder-gray-600"
                  placeholder="Job Opportunity / Project Inquiry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl glass bg-transparent border border-white/10 focus:border-primary-500 focus:outline-none transition-colors placeholder-gray-600 resize-none"
                  placeholder="Tell me about the opportunity..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
