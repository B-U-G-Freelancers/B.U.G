// src/pages/Home.jsx
import GalaxyHero from "../components/ui/GalaxyHero";
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
      <About />
      <Services />
      <Works />
      <Feedback />
      <Contact />
      <AIConsultant />
    </>
  );
}
