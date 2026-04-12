"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PROJECTS } from "@/lib/constants";

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-accent text-sm font-mono tracking-wider">03</span>
          <span className="w-12 h-px bg-accent/50" />
          <span className="text-sm text-muted uppercase tracking-widest">Selected Work</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted text-lg max-w-2xl mb-16"
        >
          A selection of projects that showcase my approach to design, branding,
          and digital product development.
        </motion.p>

        {/* Projects */}
        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block gradient-border"
      >
        <div className="bg-surface rounded-2xl p-8 md:p-12 hover:bg-surface-hover transition-all duration-500 overflow-hidden relative">
          {/* Color accent glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: project.color }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <span className="text-xs text-accent font-mono tracking-wider uppercase mb-2 block">
                  {project.subtitle}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-muted group-hover:text-accent transition-colors duration-300 shrink-0">
                <span className="text-sm">View Project</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted leading-relaxed max-w-3xl mb-8">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs rounded-full border border-border text-muted group-hover:border-accent/30 group-hover:text-accent/80 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
