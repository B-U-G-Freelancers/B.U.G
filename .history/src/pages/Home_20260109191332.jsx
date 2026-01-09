// src/pages/Home.jsx
import HomeHero from "../sections/HomeHero";
import About from "../sections/About";
import Services from "../sections/Services";
import Works from "../sections/Works";
import Feedback from "../sections/Feedback";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <HomeHero />
      <About />
      <Services />
      <Works />
      <Feedback />
      <Contact />
    </>
  );
}
