import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import GrowthJourney from "@/components/GrowthJourney";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Quiz from "@/components/Quiz";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <GrowthJourney />
        <Portfolio />
        <Skills />
        <Experience />
        <Quiz />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
