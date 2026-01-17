// src/components/gallery/GenieWorld.jsx
import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react";
import { useNavigate } from "react-router-dom";
import TiltedCardGallery from "./TiltedCardGallery";
import GenieIntro from "./GenieIntro";
import ContactCTA from "./ContactCTA";

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function GenieWorld({ projects = [] }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("hero");
  const isMobile = useIsMobile();

  // Track scroll for the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Adjusted thresholds for mobile (faster transitions)
  const heroEnd = isMobile ? 0.2 : 0.25;
  const galleryEnd = isMobile ? 0.75 : 0.85;

  // Hero section progress
  const heroProgress = useTransform(scrollYProgress, [0, heroEnd], [0, 1]);

  // Gallery section progress
  const galleryProgress = useTransform(
    scrollYProgress,
    [heroEnd, galleryEnd],
    [0, 1],
  );

  // Track which section should be visible
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value < heroEnd - 0.03) {
      setCurrentSection("hero");
    } else if (value < galleryEnd - 0.03) {
      setCurrentSection("gallery");
    } else {
      setCurrentSection("cta");
    }
  });

  // Handle project click
  const handleProjectClick = (project) => {
    const slug = project.id || project.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/works/${slug}`);
  };

  // Total scroll height - reduced on mobile for faster scrolling
  const scrollMultiplier = isMobile
    ? 150 + projects.length * 50
    : 250 + projects.length * 80;
  const scrollHeight = `${scrollMultiplier}vh`;

  return (
    <div
      ref={containerRef}
      className="relative bg-black"
      style={{ height: scrollHeight }}
    >
      {/* Fixed viewport container */}
      <div className="fixed inset-0">
        {/* Hero Section */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: currentSection === "hero" ? 1 : 0,
            pointerEvents: currentSection === "hero" ? "auto" : "none",
            zIndex: currentSection === "hero" ? 20 : 10,
          }}
        >
          <GenieIntro scrollProgress={heroProgress} projects={projects} />
        </div>

        {/* Gallery Section */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: currentSection === "gallery" ? 1 : 0,
            pointerEvents: currentSection === "gallery" ? "auto" : "none",
            zIndex: currentSection === "gallery" ? 20 : 10,
          }}
        >
          <TiltedCardGallery
            items={projects}
            onItemClick={handleProjectClick}
            scrollProgress={galleryProgress}
            cardWidth={isMobile ? 280 : 360}
            cardHeight={isMobile ? 360 : 460}
            gap={isMobile ? 24 : 80}
          />
        </div>

        {/* CTA Section */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 overflow-y-auto"
          style={{
            opacity: currentSection === "cta" ? 1 : 0,
            pointerEvents: currentSection === "cta" ? "auto" : "none",
            zIndex: currentSection === "cta" ? 20 : 10,
          }}
        >
          <ContactCTA />
        </div>
      </div>

      {/* Scroll Progress Indicator - Hidden on mobile for cleaner look */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-50 flex-col items-center gap-2">
        <div className="w-1 h-20 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-blue-500 rounded-full origin-top"
            style={{ scaleY: scrollYProgress }}
          />
        </div>
        <span className="text-white/40 text-[10px] uppercase tracking-wider">
          {currentSection}
        </span>
      </div>
    </div>
  );
}
