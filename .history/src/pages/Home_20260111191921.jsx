// src/pages/Home.jsx
import FluidGlassHero from "../sections/FluidGlassHero";
import About from "../sections/About";
import Services from "../sections/Services";
import Works from "../sections/Works";
import Feedback from "../sections/Feedback";
import Contact from "../sections/Contact";
import AIConsultant from "../components/ui/AIConsultant";

export default function Home() {
  return (
    <>
      <FluidGlassHero />
      <About />
      <Services />
      <Works />
      <Feedback />
      <Contact />
      <AIConsultant />
    </>
  );
}
