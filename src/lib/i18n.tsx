"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Locale = "en" | "pt" | "es" | "fr" | "de";

const LOCALES: Locale[] = ["en", "pt", "es", "fr", "de"];

function detectLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const saved = localStorage.getItem("joolomee-lang") as Locale | null;
  if (saved && LOCALES.includes(saved)) return saved;
  const nav = navigator.language?.toLowerCase() || "";
  if (nav.startsWith("pt")) return "pt";
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("de")) return "de";
  return "en";
}

/* ═══════════════════════════════════════════════
   TRANSLATIONS — PT is primary, others follow
   ═══════════════════════════════════════════════ */

const t_pt = {
  nav: { about: "Sobre", services: "Serviços", work: "Trabalho", process: "Processo", skills: "Competências", experience: "Experiência", contact: "Contacto", letsTalk: "Vamos Falar" },
  hero: {
    badge: "Disponível para novos projetos",
    title1: "Olá! Sou a designer",
    title2: "que a tua marca",
    title3: "estava à procura.",
    subtitle: "Full Stack Designer & Brand Strategist em Portugal. Crio marcas do zero, desenho interfaces e construo produtos digitais que ficam na memória.",
    cta1: "Ver Trabalho", cta2: "Falar Comigo",
  },
  about: {
    label: "Sobre",
    heading: "Desenho com alma, construo com obsessão.",
    bio1: 'Sou a Joana Lopes Mesquita — <hl>Full Stack Designer & Brand Strategist</hl> baseada em Portugal. Não faço coisas bonitas e já está; faço coisas que <hl>funcionam, convertem e ficam na memória</hl>. Com mais de 5 anos a criar marcas do zero, aprendi que o melhor design é aquele que não se nota — porque simplesmente <hl>faz sentido</hl>.',
    bio2: 'Atualmente sou <hl>Marketing Designer na CogniFit</hl>, a plataforma líder mundial de treino cerebral com mais de 6 milhões de utilizadores. Antes disso, criei a identidade da <hl>D\'ALMA Farm Living</hl> do zero e redesenhei a imagem da <hl>TCPI Tecnoprojecto Internacional</hl>, uma multinacional com 39 anos de história.',
    bio3: 'Quando não estou a mexer em pixels às 2h da manhã, estou a <hl>convencer clientes que espaço branco não é espaço desperdiçado</hl>. Acredito que design deve contar histórias, resolver problemas e — de vez em quando — fazer sorrir.',
    stats: {
      years: { value: 5, suffix: "+", label: "Anos de Experiência" },
      projects: { value: 50, suffix: "+", label: "Projetos Entregues" },
      users: { value: 6, suffix: "M+", label: "Utilizadores Impactados" },
      countries: { value: 10, suffix: "+", label: "Países Alcançados" },
    },
  },
  services: {
    label: "Serviços", heading: "O Que Faço",
    subtitle: "Do primeiro esboço ao deploy final. Serviços completos de design e desenvolvimento que transformam ideias em produtos digitais impactantes.",
    items: [
      { title: "Identidade de Marca", description: "Construo marcas do zero — logótipo, identidade visual, diretrizes e estratégia. Marcas que as pessoas lembram.", tags: ["Logótipo", "Brand Guidelines", "Identidade Visual", "Estratégia", "Tipografia"] },
      { title: "Design UI/UX", description: "Interfaces centradas no utilizador que convertem visitantes em clientes. Design thinking + execução pixel-perfect.", tags: ["Pesquisa UX", "Wireframing", "Prototipagem", "Design Systems", "Usabilidade"] },
      { title: "Web Design & Dev", description: "Websites performantes e otimizados para SEO, construídos com tecnologias modernas. Do conceito ao deploy.", tags: ["React", "Next.js", "Responsivo", "Performance", "Acessibilidade"] },
      { title: "Marketing & Direção Criativa", description: "Assets criativos que amplificam a marca em todos os canais. Campanhas, redes sociais e publicidade que performa.", tags: ["Redes Sociais", "Campanhas", "Email Marketing", "Criativos", "Analytics"] },
    ],
  },
  process: {
    label: "Processo", heading: "Do Zero ao Inesquecível",
    subtitle: "Seja qual for a fase do seu projeto — mesmo que ainda não exista — eu crio-o e faço-o crescer.",
    steps: [
      { title: "Ainda Não Existe", description: "Sem marca, sem site, sem identidade? É aí que adoro começar. De uma tela em branco a algo extraordinário.", phase: "Criação" },
      { title: "Apenas Uma Ideia", description: "Um nome, um conceito, um esboço num guardanapo. Transformo ingredientes brutos numa base sólida e estratégica.", phase: "Forma" },
      { title: "Precisa de Evolução", description: "A marca existe mas parece desatualizada. Redesenho e elevo cada ponto de contacto até brilhar.", phase: "Elevação" },
      { title: "Pronto Para Escalar", description: "O produto funciona, a marca é sólida — hora de crescer. Construo os sistemas que levam ao próximo nível.", phase: "Crescimento" },
    ],
    cta: "O que o seu projeto precisar — eu já estou a trabalhar nisso.",
  },
  portfolio: {
    label: "Trabalho", heading: "Projetos Destacados", subtitle: "Uma seleção de projetos que demonstra a minha abordagem ao design, branding e desenvolvimento.", viewProject: "Ver Projeto",
    projects: [
      { subtitle: "Plataforma de Treino Cerebral", title: "CogniFit Longevity", description: "Liderei o design e marketing da plataforma Longevity da CogniFit — treino cerebral baseado em neurociência para 6M+ utilizadores. Interface completa, landing pages e campanhas globais.", tags: ["UI/UX", "Marketing", "Health Tech", "Neurociência"], metrics: [{ label: "Utilizadores", value: "6M+" }, { label: "Jogos", value: "60+" }, { label: "Anos Ciência", value: "20+" }] },
      { subtitle: "Quinta & Lifestyle Orgânico", title: "D'ALMA Farm Living", description: "Construí a identidade completa da D'ALMA do zero — marca premium de lifestyle orgânico. Logótipo, packaging, presença digital e direção de fotografia.", tags: ["Identidade", "Packaging", "Digital", "Fotografia"], metrics: [{ label: "Marca", value: "Do Zero" }, { label: "Entregáveis", value: "Identidade Total" }, { label: "Lifestyle", value: "Orgânico" }] },
      { subtitle: "Engenharia Industrial", title: "TCPI Tecnoprojecto", description: "Rebranding corporativo da TCPI — multinacional com 39 anos no Grupo Ponticelli. Modernizei a identidade visual honrando décadas de herança industrial.", tags: ["Rebrand", "Identidade Visual", "Industrial"], metrics: [{ label: "Herança", value: "39 Anos" }, { label: "Grupo", value: "Ponticelli" }, { label: "Alcance", value: "Global" }] },
    ],
  },
  skills: {
    label: "Competências", heading: "O Meu Toolkit", subtitle: "As ferramentas e metodologias que uso para dar vida às ideias.",
    categories: [
      { label: "Design", skills: ["Figma", "Adobe Creative Suite", "Sketch", "Blender", "Framer", "Canva Pro"] },
      { label: "Desenvolvimento", skills: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "WordPress", "Webflow"] },
      { label: "Branding", skills: ["Estratégia de Marca", "Identidade Visual", "Tipografia", "Teoria da Cor", "Packaging", "Direção de Arte", "Fotografia"] },
      { label: "Ferramentas", skills: ["Git", "Notion", "Jira", "Google Analytics", "Hotjar", "Mailchimp", "HubSpot"] },
    ],
  },
  experience: {
    label: "Experiência", heading: "Onde Trabalhei",
    roles: [
      { role: "Marketing Designer", company: "CogniFit", period: "2022 — Presente", description: "Design e marketing para a plataforma líder mundial de treino cerebral. Interfaces, campanhas e brand assets para 6M+ utilizadores.", highlights: ["Plataforma Longevity — UI/UX completo", "50+ campanhas de marketing globais", "Design systems para web & mobile", "Colaboração com neurocientistas"] },
      { role: "Brand Designer", company: "D'ALMA Farm Living", period: "2021 — 2022", description: "Criação da marca completa do zero — identidade visual, packaging, presença digital e direção de fotografia para marca de lifestyle orgânico.", highlights: ["Marca construída do zero", "Logótipo, packaging e guidelines", "Presença digital completa", "Direção de fotografia de produto"] },
      { role: "Designer", company: "TCPI Tecnoprojecto Internacional", period: "2020 — 2021", description: "Rebranding da multinacional portuguesa de engenharia industrial com 39 anos de história, pertencente ao Grupo Ponticelli.", highlights: ["Rebrand corporativo completo", "Sistema de identidade visual", "Materiais para operações globais", "Ponte entre tradição e modernidade"] },
      { role: "Full Stack Designer & Brand Strategist", company: "joolomee — Freelance", period: "2019 — Presente", description: "O meu estúdio. Design end-to-end para startups e marcas estabelecidas. Da estratégia ao código, ajudo negócios a contar a sua história.", highlights: ["50+ projetos entregues", "Clientes em Portugal, Europa e EUA", "Estratégia → Design → Desenvolvimento → Launch", "Especialização em health tech, SaaS e lifestyle"] },
    ],
  },
  contact: {
    label: "Contacto", heading: "Vamos criar algo incrível", subtitle: "Tem um projeto em mente? Adorava ouvir sobre ele. Vamos falar sobre como transformar a sua visão em realidade.",
    form: { name: "Nome", email: "Email", service: "Tipo de Serviço", message: "Mensagem", send: "Enviar Mensagem", sending: "A enviar...", sent: "Mensagem enviada!", serviceOptions: ["Identidade de Marca", "UI/UX Design", "Web Design & Dev", "Marketing & Criativo", "Outro"] },
  },
  quiz: {
    title: "Que serviço precisa?", subtitle: "Responda a 3 perguntas rápidas e descubra como posso ajudar.",
    start: "Descobrir", restart: "Recomeçar",
    questions: [
      { q: "Tem marca/logótipo?", options: ["Não, preciso de tudo", "Sim, mas precisa de refresh", "Sim, está ótima"] },
      { q: "Tem website?", options: ["Não", "Sim, mas precisa de redesign", "Sim, está atualizado"] },
      { q: "Qual é a prioridade?", options: ["Criar marca do zero", "Melhorar presença digital", "Campanhas de marketing", "Tudo — preciso de um pacote completo"] },
    ],
    results: [
      { title: "Pacote Completo", desc: "Precisa de marca, site e estratégia. Eu faço tudo — do zero ao lançamento." },
      { title: "Brand Refresh + Web", desc: "A base existe, mas precisa de evolução. Redesenho e elevo a sua presença." },
      { title: "Marketing & Growth", desc: "Marca e site estão sólidos. Vamos amplificar com campanhas que convertem." },
      { title: "Consultoria Estratégica", desc: "Tem tudo no sítio. Posso ajudar a otimizar e escalar o que já funciona." },
    ],
  },
  footer: { copyright: "Todos os direitos reservados.", madeWith: "Feito com paixão em Portugal" },
  notFound: { title: "404", message: "Esta página não existe — mas bom design sim.", cta: "Voltar ao Portfólio" },
};

const t_en = {
  nav: { about: "About", services: "Services", work: "Work", process: "Process", skills: "Skills", experience: "Experience", contact: "Contact", letsTalk: "Let's Talk" },
  hero: {
    badge: "Available for new projects",
    title1: "Hi! I'm the designer",
    title2: "your brand has been",
    title3: "looking for.",
    subtitle: "Full Stack Designer & Brand Strategist based in Portugal. I build brands from scratch, design interfaces, and create digital products people remember.",
    cta1: "View My Work", cta2: "Get In Touch",
  },
  about: {
    label: "About",
    heading: "I design with soul, build with obsession.",
    bio1: 'I\'m Joana Lopes Mesquita — a <hl>Full Stack Designer & Brand Strategist</hl> based in Portugal. I don\'t just make things pretty; I make them <hl>work, convert, and stick in people\'s minds</hl>. 5+ years building brands from scratch taught me the best design is the one you don\'t notice — because it just <hl>feels right</hl>.',
    bio2: 'Currently the <hl>Marketing Designer at CogniFit</hl>, the world\'s leading brain training platform with 6M+ users. Before that, I built <hl>D\'ALMA Farm Living\'s</hl> brand from zero and redesigned <hl>TCPI Tecnoprojecto</hl>, a 39-year multinational.',
    bio3: 'When I\'m not pixel-pushing at 2am, I\'m <hl>convincing clients that white space is not wasted space</hl>. I believe design should tell stories, solve problems, and — occasionally — make you smile.',
    stats: {
      years: { value: 5, suffix: "+", label: "Years Experience" },
      projects: { value: 50, suffix: "+", label: "Projects Delivered" },
      users: { value: 6, suffix: "M+", label: "Users Impacted" },
      countries: { value: 10, suffix: "+", label: "Countries Reached" },
    },
  },
  services: {
    label: "Services", heading: "What I Do",
    subtitle: "End-to-end design and development. From the first sketch to the final deploy — turning ideas into impactful digital products.",
    items: [
      { title: "Brand Identity", description: "I build brands from scratch — logo, visual identity, guidelines and strategy. Brands people remember.", tags: ["Logo", "Brand Guidelines", "Visual Identity", "Strategy", "Typography"] },
      { title: "UI/UX Design", description: "User-centered interfaces that convert. Design thinking + pixel-perfect execution.", tags: ["UX Research", "Wireframing", "Prototyping", "Design Systems", "Usability"] },
      { title: "Web Design & Dev", description: "High-performance, SEO-optimized websites built with modern tech. Concept to deploy.", tags: ["React", "Next.js", "Responsive", "Performance", "Accessibility"] },
      { title: "Marketing & Creative Direction", description: "Creative assets that amplify your brand across every channel. Campaigns that perform.", tags: ["Social Media", "Campaigns", "Email Marketing", "Ad Creative", "Analytics"] },
    ],
  },
  process: {
    label: "Process", heading: "From Zero to Unforgettable",
    subtitle: "Whatever stage your project is in — even if it doesn't exist yet — I create it and grow it.",
    steps: [
      { title: "Doesn't Exist Yet", description: "No brand, no site, no identity? That's where I love to start. Blank canvas to extraordinary.", phase: "Creation" },
      { title: "Just an Idea", description: "A name, a concept, a napkin sketch. I shape raw ingredients into a solid, strategic foundation.", phase: "Shaping" },
      { title: "Needs Evolution", description: "Your brand exists but feels outdated. I redesign and elevate every touchpoint until it shines.", phase: "Elevation" },
      { title: "Ready to Scale", description: "Product works, brand is solid — time to grow. I build the systems that take you to the next level.", phase: "Growth" },
    ],
    cta: "Whatever your project needs — I'm already working on it.",
  },
  portfolio: {
    label: "Selected Work", heading: "Featured Projects", subtitle: "A selection of projects showcasing my approach to design, branding, and digital development.", viewProject: "View Project",
    projects: [
      { subtitle: "Brain Training Platform", title: "CogniFit Longevity", description: "Led design and marketing for CogniFit's Longevity platform — neuroscience-backed brain training for 6M+ users. Complete UI, landing pages and global campaigns.", tags: ["UI/UX", "Marketing", "Health Tech", "Neuroscience"], metrics: [{ label: "Users", value: "6M+" }, { label: "Games", value: "60+" }, { label: "Science", value: "20+ Yrs" }] },
      { subtitle: "Organic Farm & Living", title: "D'ALMA Farm Living", description: "Built D'ALMA's complete identity from zero — premium organic lifestyle brand. Logo, packaging, digital and photography direction.", tags: ["Identity", "Packaging", "Digital", "Photography"], metrics: [{ label: "Brand", value: "From Zero" }, { label: "Scope", value: "Full Identity" }, { label: "Lifestyle", value: "Organic" }] },
      { subtitle: "Industrial Engineering", title: "TCPI Tecnoprojecto", description: "Corporate rebrand for TCPI — 39-year multinational in the Ponticelli Group. Modernized visual identity honoring decades of industrial heritage.", tags: ["Rebrand", "Visual Identity", "Industrial"], metrics: [{ label: "Heritage", value: "39 Years" }, { label: "Group", value: "Ponticelli" }, { label: "Reach", value: "Global" }] },
    ],
  },
  skills: {
    label: "Skills & Tools", heading: "My Toolkit", subtitle: "The tools and methodologies I use to bring ideas to life.",
    categories: [
      { label: "Design", skills: ["Figma", "Adobe Creative Suite", "Sketch", "Blender", "Framer", "Canva Pro"] },
      { label: "Development", skills: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "WordPress", "Webflow"] },
      { label: "Branding", skills: ["Brand Strategy", "Visual Identity", "Typography", "Color Theory", "Packaging", "Art Direction", "Photography"] },
      { label: "Tools", skills: ["Git", "Notion", "Jira", "Google Analytics", "Hotjar", "Mailchimp", "HubSpot"] },
    ],
  },
  experience: {
    label: "Experience", heading: "Where I've Worked",
    roles: [
      { role: "Marketing Designer", company: "CogniFit", period: "2022 — Present", description: "Design and marketing for the world's leading brain training platform. Interfaces, campaigns and brand assets for 6M+ users.", highlights: ["Longevity platform — full UI/UX", "50+ global marketing campaigns", "Design systems for web & mobile", "Collaboration with neuroscientists"] },
      { role: "Brand Designer", company: "D'ALMA Farm Living", period: "2021 — 2022", description: "Created the complete brand from scratch — visual identity, packaging, digital presence and photography direction for organic lifestyle brand.", highlights: ["Brand built from zero", "Logo, packaging & guidelines", "Full digital presence", "Product photography direction"] },
      { role: "Designer", company: "TCPI Tecnoprojecto Internacional", period: "2020 — 2021", description: "Corporate rebrand of a 39-year Portuguese industrial engineering multinational, part of the Ponticelli Group.", highlights: ["Full corporate rebrand", "Visual identity system", "Global operations materials", "Bridging tradition & modernity"] },
      { role: "Full Stack Designer & Brand Strategist", company: "joolomee — Freelance", period: "2019 — Present", description: "My studio. End-to-end design for startups and established brands. Strategy to code, helping businesses tell their story.", highlights: ["50+ projects delivered", "Clients across Portugal, Europe & US", "Strategy → Design → Dev → Launch", "Specialized in health tech, SaaS & lifestyle"] },
    ],
  },
  contact: {
    label: "Contact", heading: "Let's create something great", subtitle: "Have a project in mind? I'd love to hear about it. Let's talk about turning your vision into reality.",
    form: { name: "Name", email: "Email", service: "Service Type", message: "Message", send: "Send Message", sending: "Sending...", sent: "Message sent!", serviceOptions: ["Brand Identity", "UI/UX Design", "Web Design & Dev", "Marketing & Creative", "Other"] },
  },
  quiz: {
    title: "What service do you need?", subtitle: "Answer 3 quick questions and find out how I can help.",
    start: "Find Out", restart: "Start Over",
    questions: [
      { q: "Do you have a brand/logo?", options: ["No, I need everything", "Yes, but needs a refresh", "Yes, it's great"] },
      { q: "Do you have a website?", options: ["No", "Yes, but needs redesign", "Yes, it's up to date"] },
      { q: "What's the priority?", options: ["Build brand from scratch", "Improve digital presence", "Marketing campaigns", "Everything — I need the full package"] },
    ],
    results: [
      { title: "Full Package", desc: "You need brand, site and strategy. I do it all — from zero to launch." },
      { title: "Brand Refresh + Web", desc: "The foundation exists, but needs evolution. I redesign and elevate your presence." },
      { title: "Marketing & Growth", desc: "Brand and site are solid. Let's amplify with campaigns that convert." },
      { title: "Strategic Consulting", desc: "Everything's in place. I can help optimize and scale what already works." },
    ],
  },
  footer: { copyright: "All rights reserved.", madeWith: "Made with passion in Portugal" },
  notFound: { title: "404", message: "This page doesn't exist — but great design does.", cta: "Back to Portfolio" },
};

const t_es = { ...t_en,
  nav: { about: "Sobre Mí", services: "Servicios", work: "Trabajo", process: "Proceso", skills: "Habilidades", experience: "Experiencia", contact: "Contacto", letsTalk: "Hablemos" },
  hero: { ...t_en.hero, badge: "Disponible para nuevos proyectos", title1: "¡Hola! Soy la diseñadora", title2: "que tu marca estaba", title3: "buscando.", subtitle: "Full Stack Designer & Brand Strategist en Portugal. Creo marcas desde cero, diseño interfaces y construyo productos digitales memorables.", cta1: "Ver Trabajo", cta2: "Contactar" },
  footer: { copyright: "Todos los derechos reservados.", madeWith: "Hecho con pasión en Portugal" },
};

const t_fr = { ...t_en,
  nav: { about: "À Propos", services: "Services", work: "Projets", process: "Processus", skills: "Compétences", experience: "Expérience", contact: "Contact", letsTalk: "Parlons-en" },
  hero: { ...t_en.hero, badge: "Disponible pour de nouveaux projets", title1: "Salut ! Je suis la designer", title2: "que votre marque", title3: "recherchait.", subtitle: "Full Stack Designer & Brand Strategist au Portugal. Je crée des marques de zéro, conçois des interfaces et construis des produits digitaux mémorables.", cta1: "Voir Projets", cta2: "Me Contacter" },
  footer: { copyright: "Tous droits réservés.", madeWith: "Fait avec passion au Portugal" },
};

const t_de = { ...t_en,
  nav: { about: "Über Mich", services: "Leistungen", work: "Arbeiten", process: "Prozess", skills: "Fähigkeiten", experience: "Erfahrung", contact: "Kontakt", letsTalk: "Sprechen Wir" },
  hero: { ...t_en.hero, badge: "Verfügbar für neue Projekte", title1: "Hi! Ich bin die Designerin,", title2: "die Ihre Marke", title3: "gesucht hat.", subtitle: "Full Stack Designer & Brand Strategist in Portugal. Ich baue Marken von Grund auf, gestalte Interfaces und entwickle digitale Produkte, die im Gedächtnis bleiben.", cta1: "Arbeiten Ansehen", cta2: "Kontakt" },
  footer: { copyright: "Alle Rechte vorbehalten.", madeWith: "Mit Leidenschaft in Portugal gemacht" },
};

const translations: Record<Locale, typeof t_en> = { en: t_en, pt: t_pt as typeof t_en, es: t_es as typeof t_en, fr: t_fr as typeof t_en, de: t_de as typeof t_en };

/* ═══════════════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════════════ */

type LanguageCtx = { locale: Locale; setLocale: (l: Locale) => void; t: typeof t_en };

const LanguageContext = createContext<LanguageCtx>({ locale: "pt", setLocale: () => {}, t: t_pt as typeof t_en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("joolomee-lang", l);
  }, []);

  const t = translations[locale];

  if (!mounted) return <>{children}</>;

  return <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
