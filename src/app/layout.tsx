import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

const siteUrl = "https://www.joolomee.com";
const siteName = "joolomee — Joana Lopes Mesquita | Full Stack Designer & Brand Strategist";
const siteDescription = "Joana Lopes Mesquita — Full Stack Designer & Brand Strategist em Portugal. Crio marcas do zero, desenho interfaces UI/UX e construo produtos digitais para empresas globais. CogniFit, D'ALMA Farm Living, TCPI. Disponível para novos projetos.";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0a0a" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s | joolomee" },
  description: siteDescription,
  keywords: [
    "Full Stack Designer", "UI/UX Designer", "Web Designer Portugal", "Brand Designer", "Brand Strategist",
    "Marketing Designer", "Joana Lopes Mesquita", "joolomee", "Designer Portugal", "Freelance Designer",
    "CogniFit Designer", "Brand Identity", "Logo Design", "Web Development", "Digital Product Design",
    "Health Tech Design", "Design Portfolio", "Creative Director Portugal", "Visual Identity",
    "Design Systems", "Packaging Design", "Art Direction", "Photography Direction",
    "Designer Lisboa", "Designer Porto", "Branding Portugal", "React Developer Designer",
    "Diseñadora Portugal", "Designer freelance Europe", "Grafikdesignerin Portugal",
  ],
  authors: [{ name: "Joana Lopes Mesquita", url: siteUrl }],
  creator: "Joana Lopes Mesquita",
  publisher: "Joana Lopes Mesquita",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", locale: "pt_PT", alternateLocale: ["en_US", "es_ES", "fr_FR", "de_DE"],
    url: siteUrl, siteName: "joolomee", title: siteName, description: siteDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "joolomee — Joana Lopes Mesquita | Full Stack Designer Portfolio" }],
  },
  twitter: { card: "summary_large_image", title: siteName, description: siteDescription, images: ["/og-image.png"], creator: "@joolomee" },
  alternates: {
    canonical: siteUrl,
    languages: { "pt": siteUrl, "en": `${siteUrl}?lang=en`, "es": `${siteUrl}?lang=es`, "fr": `${siteUrl}?lang=fr`, "de": `${siteUrl}?lang=de` },
  },
  category: "Design Portfolio",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Joana Lopes Mesquita",
  alternateName: "joolomee",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  jobTitle: "Full Stack Designer & Brand Strategist",
  worksFor: { "@type": "Organization", name: "CogniFit", url: "https://www.cognifit.com" },
  description: siteDescription,
  email: "geral@joolomee.com",
  address: { "@type": "PostalAddress", addressCountry: "PT" },
  sameAs: ["https://linkedin.com/in/jolopesmesquita", "https://github.com/joolomeee", "https://instagram.com/joolomee.design"],
  knowsAbout: ["UI/UX Design", "Web Design", "Brand Identity", "Brand Strategy", "Marketing Design", "Figma", "Adobe Creative Suite", "React", "Next.js", "Packaging Design", "Art Direction"],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#service`,
  name: "joolomee — Design Studio",
  description: "Full Stack Design: UI/UX, Web Development, Brand Identity, Marketing Design. From zero to unforgettable.",
  url: siteUrl,
  provider: { "@id": `${siteUrl}/#person` },
  areaServed: ["Portugal", "Europe", "United States", "Worldwide"],
  serviceType: ["UI/UX Design", "Web Design", "Web Development", "Brand Identity Design", "Marketing Design", "Packaging Design"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What services does joolomee offer?", acceptedAnswer: { "@type": "Answer", text: "joolomee offers Full Stack Design services including Brand Identity & Strategy, UI/UX Design, Web Design & Development, and Marketing & Creative Direction. From creating brands from scratch to scaling digital products globally." } },
    { "@type": "Question", name: "Who is Joana Lopes Mesquita?", acceptedAnswer: { "@type": "Answer", text: "Joana Lopes Mesquita is a Full Stack Designer & Brand Strategist based in Portugal with 5+ years of experience. She's the Marketing Designer at CogniFit (6M+ users) and has built brands for D'ALMA Farm Living and TCPI Tecnoprojecto Internacional." } },
    { "@type": "Question", name: "Does joolomee work with international clients?", acceptedAnswer: { "@type": "Answer", text: "Yes! joolomee works with clients worldwide — from Portugal to the rest of Europe and the United States. The portfolio spans health tech, organic lifestyle, industrial engineering, and more." } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className="h-full antialiased">
      <head>
        <meta name="geo.region" content="PT" />
        <meta name="geo.placename" content="Portugal" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="noise" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
