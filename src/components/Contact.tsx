"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const f = t.contact?.form || { name: "Name", email: "Email", service: "Service", message: "Message", send: "Send", sending: "Sending...", sent: "Sent!", serviceOptions: [] };

  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Mailto fallback
    const subject = encodeURIComponent(`[joolomee] ${form.service || "New Project"} — ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`);
    window.location.href = `mailto:geral@joolomee.com?subject=${subject}&body=${body}`;
    setTimeout(() => { setStatus("sent"); setTimeout(() => setStatus("idle"), 3000); }, 1000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8787A]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="flex items-center justify-center gap-4 mb-6">
          <span className="text-[#E8787A] text-sm font-mono tracking-wider">07</span>
          <span className="w-12 h-px bg-[#E8787A]/50" />
          <span className="text-sm text-[#8a8a8a] uppercase tracking-widest">{t.contact?.label || "Contact"}</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {(t.contact?.heading || "").split(" ").map((w: string, i: number, a: string[]) => (
            <span key={i}>{i >= a.length - 2 ? <span className="gradient-text">{w} </span> : w + " "}</span>
          ))}
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-[#8a8a8a] text-center max-w-xl mx-auto mb-12">
          {t.contact?.subtitle}
        </motion.p>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <input type="text" required placeholder={f.name} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-[#111111] border border-[#1e1e1e] rounded-xl px-5 py-4 text-[#f5f5f5] placeholder-[#555] focus:border-[#E8787A]/50 focus:outline-none transition-colors text-sm" />
            <input type="email" required placeholder={f.email} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full bg-[#111111] border border-[#1e1e1e] rounded-xl px-5 py-4 text-[#f5f5f5] placeholder-[#555] focus:border-[#E8787A]/50 focus:outline-none transition-colors text-sm" />
          </div>
          <select required value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} className="w-full bg-[#111111] border border-[#1e1e1e] rounded-xl px-5 py-4 text-[#f5f5f5] focus:border-[#E8787A]/50 focus:outline-none transition-colors text-sm appearance-none cursor-pointer" style={{ color: form.service ? "#f5f5f5" : "#555" }}>
            <option value="" disabled>{f.service}</option>
            {(f.serviceOptions || []).map((o: string) => <option key={o} value={o}>{o}</option>)}
          </select>
          <textarea required rows={5} placeholder={f.message} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full bg-[#111111] border border-[#1e1e1e] rounded-xl px-5 py-4 text-[#f5f5f5] placeholder-[#555] focus:border-[#E8787A]/50 focus:outline-none transition-colors text-sm resize-none" />
          <div className="text-center">
            <button type="submit" disabled={status !== "idle"} data-cursor="hover" className="px-10 py-4 rounded-full bg-[#E8787A] text-[#0a0a0a] font-semibold text-base hover:bg-[#F2A5A7] transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,120,122,0.3)] disabled:opacity-60">
              {status === "sending" ? f.sending : status === "sent" ? f.sent : f.send} {status === "idle" && <span className="ml-2">&rarr;</span>}
            </button>
          </div>
        </motion.form>

        {/* Direct email fallback */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="text-center mt-8">
          <a href="mailto:geral@joolomee.com" className="text-[#8a8a8a] hover:text-[#E8787A] transition-colors text-sm" data-cursor="hover">
            geral@joolomee.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
