"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export default function Quiz() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const q = t.quiz || { title: "", subtitle: "", start: "Start", restart: "Restart", questions: [], results: [] };

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers, optionIdx];
    setAnswers(newAnswers);
    if (step < (q.questions?.length || 3) - 1) {
      setStep(step + 1);
    } else {
      // Calculate result based on answers
      const score = newAnswers.reduce((a, b) => a + b, 0);
      const maxScore = newAnswers.length * 2;
      const ratio = score / maxScore;
      const idx = ratio < 0.25 ? 0 : ratio < 0.5 ? 1 : ratio < 0.75 ? 2 : 3;
      setResult(Math.min(idx, (q.results?.length || 4) - 1));
    }
  };

  const restart = () => { setStarted(false); setStep(0); setAnswers([]); setResult(null); };

  return (
    <section className="relative py-20" ref={ref}>
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="card-glow">
          <div className="bg-[#111111] rounded-2xl p-8 md:p-12 text-center">
            <AnimatePresence mode="wait">
              {!started ? (
                <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#E8787A]/10 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8787A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><circle cx="12" cy="17" r="0.5" fill="#E8787A" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{q.title}</h3>
                  <p className="text-[#8a8a8a] mb-8 text-sm">{q.subtitle}</p>
                  <button onClick={() => setStarted(true)} data-cursor="hover" className="px-8 py-3 rounded-full bg-[#E8787A] text-[#0a0a0a] font-semibold hover:bg-[#F2A5A7] transition-all duration-300">
                    {q.start} &rarr;
                  </button>
                </motion.div>
              ) : result !== null ? (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#E8787A]/20 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8787A" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 gradient-text">{q.results?.[result]?.title}</h3>
                  <p className="text-[#8a8a8a] mb-8">{q.results?.[result]?.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="#contact" data-cursor="hover" className="px-8 py-3 rounded-full bg-[#E8787A] text-[#0a0a0a] font-semibold hover:bg-[#F2A5A7] transition-all duration-300">
                      {t.nav?.letsTalk || "Let's Talk"} &rarr;
                    </a>
                    <button onClick={restart} data-cursor="hover" className="px-8 py-3 rounded-full border border-[#1e1e1e] text-[#8a8a8a] hover:border-[#E8787A]/50 hover:text-[#E8787A] transition-all duration-300">
                      {q.restart}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={`q-${step}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                  {/* Progress */}
                  <div className="flex gap-2 justify-center mb-8">
                    {q.questions?.map((_: any, i: number) => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i <= step ? "w-10 bg-[#E8787A]" : "w-6 bg-[#1e1e1e]"}`} />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-8">{q.questions?.[step]?.q}</h3>
                  <div className="space-y-3">
                    {q.questions?.[step]?.options?.map((option: string, i: number) => (
                      <button key={option} onClick={() => handleAnswer(i)} data-cursor="hover" className="w-full text-left px-6 py-4 rounded-xl border border-[#1e1e1e] text-[#8a8a8a] hover:border-[#E8787A]/50 hover:text-[#f5f5f5] hover:bg-[#E8787A]/5 transition-all duration-300 text-sm">
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
