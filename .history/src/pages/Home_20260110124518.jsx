// src/pages/Home.jsx
import Hero from "../sections/Hero";
import FluidGlassSection from "../sections/FluidGlassSection";
import About from "../sections/About";
import Services from "../sections/Services";
import Works from "../sections/Works";
import Feedback from "../sections/Feedback";
import Contact from "../sections/Contact";
import AIConsultant from "../components/ui/AIConsultant";

export default function Home() {
  return (
    <>
      <Hero />
      <FluidGlassSection />
      <About />
      <Services />
      <Works />
      <Feedback />
      <Contact />
      <AIConsultant />
    </>
  );
}
