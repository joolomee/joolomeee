"use client";

import { useLanguage } from "@/lib/i18n";
import CrystalLogo from "./CrystalLogo";

const navKeys = ["about", "services", "work", "process", "skills", "experience", "contact"] as const;

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const nav = t.nav as Record<string, string>;

  return (
    <footer className="border-t border-[#1e1e1e] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <CrystalLogo size={24} color="#E8787A" />
            <span className="text-lg font-bold text-[#f5f5f5]">joolomee<span className="text-[#E8787A]">.</span></span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navKeys.map(key => (
              <a key={key} href={`#${key}`} className="text-sm text-[#8a8a8a] hover:text-[#E8787A] transition-colors duration-300">{nav[key] || key}</a>
            ))}
          </nav>
          <div className="text-center md:text-right">
            <p className="text-sm text-[#8a8a8a]">&copy; {year} Joana Lopes Mesquita. {t.footer?.copyright}</p>
            <p className="text-xs text-[#555] mt-1">{t.footer?.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
