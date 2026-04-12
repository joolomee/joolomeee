import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://www.joolomee.com";
const siteName = "Joana Lopes Mesquita — Full Stack Designer & Branding Strategist";
const siteDescription =
  "Award-winning Full Stack Designer with 5+ years crafting digital experiences. Specializing in UI/UX Design, Web Development, and Brand Identity. Marketing Designer at CogniFit. Based in Portugal, working globally.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | joolomee",
  },
  description: siteDescription,
  keywords: [
    "Full Stack Designer",
    "UI/UX Designer",
    "Web Designer",
    "Brand Designer",
    "Branding Strategist",
    "Marketing Designer",
    "Joana Lopes Mesquita",
    "joolomee",
    "Portugal Designer",
    "CogniFit Designer",
    "Freelance Designer Portugal",
    "Web Development",
    "Brand Identity",
    "Digital Product Design",
    "Health Tech Design",
    "Design Portfolio",
    "Creative Director",
    "Visual Identity Designer",
    "UX Research",
    "Design Systems",
  ],
  authors: [{ name: "Joana Lopes Mesquita", url: siteUrl }],
  creator: "Joana Lopes Mesquita",
  publisher: "Joana Lopes Mesquita",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_PT",
    url: siteUrl,
    siteName: "joolomee",
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Joana Lopes Mesquita — Full Stack Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@joolomee",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Design Portfolio",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joana Lopes Mesquita",
  alternateName: "joolomee",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  jobTitle: "Full Stack Designer & Branding Strategist",
  worksFor: {
    "@type": "Organization",
    name: "CogniFit",
    url: "https://www.cognifit.com",
  },
  description: siteDescription,
  email: "geral@joolomee.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PT",
  },
  sameAs: [
    "https://linkedin.com/in/jolopesmesquita",
    "https://github.com/joolomeee",
  ],
  knowsAbout: [
    "UI/UX Design",
    "Web Design",
    "Web Development",
    "Brand Identity",
    "Brand Strategy",
    "Marketing Design",
    "Figma",
    "Adobe Creative Suite",
    "React",
    "Next.js",
    "Design Systems",
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "joolomee — Design Studio",
  description:
    "Full Stack Design services including UI/UX Design, Web Development, Brand Identity, and Marketing Design.",
  url: siteUrl,
  provider: {
    "@type": "Person",
    name: "Joana Lopes Mesquita",
  },
  areaServed: ["Portugal", "Europe", "United States", "Worldwide"],
  serviceType: [
    "UI/UX Design",
    "Web Design",
    "Web Development",
    "Brand Identity Design",
    "Marketing Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
