"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8787A]/[0.015] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-6">
          <span className="text-[#E8787A] text-sm font-mono tracking-wider">06</span>
          <span className="w-12 h-px bg-[#E8787A]/50" />
          <span className="text-sm text-[#8a8a8a] uppercase tracking-widest">{t.experience?.label || "Experience"}</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-16">
          {(t.experience?.heading || "Where I've Worked").split(" ").map((w: string, i: number, a: string[]) => (
            <span key={i}>{i === a.length - 1 ? <span className="gradient-text">{w}</span> : w + " "}</span>
          ))}
        </motion.h2>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-[#1e1e1e]" />
          <div className="space-y-10">
            {(t.experience?.roles || []).map((exp: any, i: number) => (
              <motion.div key={exp.company} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }} className="relative pl-8 md:pl-20">
                <div className="absolute left-0 md:left-8 top-2">
                  <div className="absolute -left-[5px] -top-[5px] w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-[#E8787A]" />
                </div>
                <div className="card-glow">
                  <div className="bg-[#111111] rounded-2xl p-8 hover:bg-[#161616] transition-colors duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#f5f5f5]">{exp.role}</h3>
                        <p className="text-[#E8787A] font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-[#8a8a8a] font-mono shrink-0">{exp.period}</span>
                    </div>
                    <p className="text-[#8a8a8a] leading-relaxed mb-5 text-sm">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((h: string) => (
                        <li key={h} className="flex items-start gap-3 text-sm text-[#8a8a8a]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8787A] mt-1.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
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
