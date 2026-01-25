"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6">
              Let&apos;s talk about your project
            </h3>
            <p className="text-gray-400 mb-8">
              I&apos;m always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl glass">
                  <Mail className="text-primary-400" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-white hover:text-primary-400 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl glass">
                  <MapPin className="text-primary-400" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={personalInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"
              >
                <Twitter size={24} />
              </a>
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
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl glass bg-transparent border border-white/10 focus:border-primary-500 focus:outline-none transition-colors placeholder-gray-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl glass bg-transparent border border-white/10 focus:border-primary-500 focus:outline-none transition-colors placeholder-gray-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl glass bg-transparent border border-white/10 focus:border-primary-500 focus:outline-none transition-colors placeholder-gray-500 resize-none"
                  placeholder="Tell me about your project..."
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
