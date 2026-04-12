"use client";

import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              {SITE_CONFIG.shortName}
              <span className="text-accent">.</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted hover:text-accent transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted">
            &copy; {currentYear} {SITE_CONFIG.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
