"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SKILLS } from "@/lib/constants";

const categories = [
  { key: "design" as const, label: "Design", icon: "pen" },
  { key: "development" as const, label: "Development", icon: "terminal" },
  { key: "branding" as const, label: "Branding", icon: "star" },
  { key: "tools" as const, label: "Tools & Platforms", icon: "grid" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-accent text-sm font-mono tracking-wider">04</span>
          <span className="w-12 h-px bg-accent/50" />
          <span className="text-sm text-muted uppercase tracking-widest">Skills & Tools</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          My <span className="gradient-text">Toolkit</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted text-lg max-w-2xl mb-16"
        >
          The technologies, tools, and methodologies I use to bring ideas to life.
        </motion.p>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="gradient-border group"
            >
              <div className="bg-surface rounded-2xl p-8 hover:bg-surface-hover transition-colors duration-300 h-full">
                <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {SKILLS[cat.key].map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 + j * 0.05 }}
                      className="px-4 py-2 rounded-full border border-border text-sm text-muted hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee of skills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 overflow-hidden border-y border-border py-6"
        >
          <div className="marquee flex gap-8 whitespace-nowrap">
            {[
              "UI/UX Design",
              "Brand Identity",
              "Web Development",
              "Marketing Design",
              "Design Systems",
              "Prototyping",
              "Motion Design",
              "Art Direction",
              "Responsive Design",
              "SEO Optimization",
              "User Research",
              "Visual Design",
              "UI/UX Design",
              "Brand Identity",
              "Web Development",
              "Marketing Design",
              "Design Systems",
              "Prototyping",
              "Motion Design",
              "Art Direction",
              "Responsive Design",
              "SEO Optimization",
              "User Research",
              "Visual Design",
            ].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="text-2xl font-bold text-border hover:text-accent/30 transition-colors duration-500"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
