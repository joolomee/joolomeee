"use client";

import { LanguageProvider } from "@/lib/i18n";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <CustomCursor />
      <ScrollToTop />
    </LanguageProvider>
  );
}
