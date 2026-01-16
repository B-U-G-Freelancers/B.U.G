// src/pages/Home.jsx
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Works from "../sections/Works";
import Feedback from "../sections/Feedback";
import Contact from "../sections/Contact";
import AIConsultant from "../components/ui/AIConsultant";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero - has its own internal parallax */}
      <Hero />

      {/* Other sections - no parallax wrapper to avoid scroll issues */}
      <About />
      <Services />
      <Works />
      <Feedback />
      <Contact />

      {/* AI Consultant floating button */}
      <AIConsultant />
    </div>
  );
}
