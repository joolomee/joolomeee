"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SITE_CONFIG } from "@/lib/constants";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "30+", label: "Projects Delivered" },
    { value: "4M+", label: "Users Impacted" },
    { value: "3", label: "Countries" },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-accent text-sm font-mono tracking-wider">01</span>
          <span className="w-12 h-px bg-accent/50" />
          <span className="text-sm text-muted uppercase tracking-widest">About</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-8"
            >
              I design with <span className="gradient-text">purpose</span>,
              <br />
              build with <span className="gradient-text">precision</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-muted leading-relaxed text-base"
            >
              <p>
                I&apos;m {SITE_CONFIG.name}, a {SITE_CONFIG.title} based in{" "}
                {SITE_CONFIG.location}. With over 5 years of experience, I bridge the gap
                between design and development &mdash; creating digital experiences that
                are as beautiful as they are functional.
              </p>
              <p>
                Currently, I&apos;m the Marketing Designer at{" "}
                <span className="text-foreground font-medium">CogniFit</span>, the
                world&apos;s leading neuroscience-based brain training platform. I design
                interfaces, craft brand identities, and develop marketing strategies that
                reach millions of users worldwide.
              </p>
              <p>
                My approach combines strategic thinking with creative execution. I believe
                great design isn&apos;t just about aesthetics &mdash; it&apos;s about
                solving problems, telling stories, and driving real business results.
              </p>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-accent hover:text-foreground transition-colors text-sm font-medium"
            >
              <span>Connect on LinkedIn</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.a>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="gradient-border group"
              >
                <div className="bg-surface rounded-2xl p-8 text-center hover:bg-surface-hover transition-colors duration-300">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
