// src/pages/Home.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Works from "../sections/Works";
import Feedback from "../sections/Feedback";
import Contact from "../sections/Contact";
import AIConsultant from "../components/ui/AIConsultant";

// Parallax wrapper for sections
function ParallaxSection({
  children,
  speed = 0.5,
  fadeOut = false,
  className = "",
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    fadeOut ? [0.3, 1, 1, 0.3] : [1, 1, 1, 1]
  );

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// Floating decorative elements with parallax
function ParallaxDecorations() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Different speeds for depth effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ position: "fixed" }}
    >
      {/* Deep layer - slowest */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-[20%] left-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl"
      />

      {/* Mid layer */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] right-[5%] w-72 h-72 rounded-full bg-gradient-to-br from-[#E947F5]/5 to-transparent blur-3xl"
      />

      {/* Front layer - fastest */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[60%] left-[40%] w-48 h-48 rounded-full bg-gradient-to-br from-accent/3 to-transparent blur-2xl"
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative">
      {/* Parallax floating decorations */}
      <ParallaxDecorations />

      {/* Hero - no parallax, fixed position feel */}
      <Hero />

      {/* About - subtle upward parallax */}
      <ParallaxSection speed={0.3} fadeOut>
        <About />
      </ParallaxSection>

      {/* Services - slightly faster parallax */}
      <ParallaxSection speed={0.4} fadeOut>
        <Services />
      </ParallaxSection>

      {/* Works - medium parallax */}
      <ParallaxSection speed={0.35} fadeOut>
        <Works />
      </ParallaxSection>

      {/* Feedback - subtle parallax */}
      <ParallaxSection speed={0.25} fadeOut>
        <Feedback />
      </ParallaxSection>

      {/* Contact - no parallax for stability */}
      <Contact />

      {/* AI Consultant floating button */}
      <AIConsultant />
    </div>
  );
}
