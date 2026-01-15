// src/components/gallery/WorksGalleryExperience.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import DomeGallery from "./DomeGallery";
import CircularGallery from "./CircularGallery";
import ProjectDetail from "./ProjectDetail";

// Gallery states
const STATES = {
  PRELOAD: 0,
  DOME: 1,
  TRANSITIONING: 2,
  CIRCLE: 3,
  PROJECT_FOCUS: 4,
  PROJECT_DETAIL: 5,
};

export default function WorksGalleryExperience({ projects = [] }) {
  const [currentState, setCurrentState] = useState(STATES.PRELOAD);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showText, setShowText] = useState(false);

  const containerRef = useRef(null);
  const domeRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);
  const scrollTargetRef = useRef(0);
  const scrollCurrentRef = useRef(0);

  // Format projects for galleries
  const galleryItems = projects.map((p) => ({
    image: p.image || `https://picsum.photos/seed/${p.id}/800/600?grayscale`,
    src: p.image || `https://picsum.photos/seed/${p.id}/800/600?grayscale`,
    text: p.title,
    alt: p.title,
    ...p,
  }));

  // Preload animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentState(STATES.DOME);
      // Show text after dome appears
      setTimeout(() => setShowText(true), 1000);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Scroll handling for state transitions
  useEffect(() => {
    if (currentState === STATES.PROJECT_DETAIL) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Calculate scroll progress (0 to 1 over first 100vh)
      const progress = Math.min(1, Math.max(0, scrollY / vh));
      scrollTargetRef.current = progress;
    };

    const animate = () => {
      // Smooth lerp
      scrollCurrentRef.current +=
        (scrollTargetRef.current - scrollCurrentRef.current) * 0.08;

      const progress = scrollCurrentRef.current;
      setScrollProgress(progress);

      // State transitions based on scroll
      if (progress < 0.25) {
        if (currentState !== STATES.DOME && currentState !== STATES.PRELOAD) {
          setCurrentState(STATES.DOME);
          setShowText(true);
        }
      } else if (progress < 0.55) {
        if (currentState !== STATES.TRANSITIONING) {
          setCurrentState(STATES.TRANSITIONING);
          setShowText(false);
        }
      } else {
        if (
          currentState !== STATES.CIRCLE &&
          currentState !== STATES.PROJECT_FOCUS &&
          currentState !== STATES.PROJECT_DETAIL
        ) {
          setCurrentState(STATES.CIRCLE);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentState]);

  // Transition progress for morph effect (0-1 during transition)
  const transitionProgress =
    currentState === STATES.TRANSITIONING
      ? (scrollProgress - 0.25) / 0.3
      : currentState >= STATES.CIRCLE
      ? 1
      : 0;

  // Handle project click from circular gallery
  const handleProjectClick = useCallback(
    (project, index) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setSelectedProject(galleryItems[index % galleryItems.length]);
      setCurrentState(STATES.PROJECT_FOCUS);

      // Animate to project detail
      setTimeout(() => {
        setCurrentState(STATES.PROJECT_DETAIL);
        setIsTransitioning(false);
      }, 600);
    },
    [galleryItems, isTransitioning]
  );

  // Handle project close
  const handleProjectClose = useCallback(() => {
    setSelectedProject(null);
    setCurrentState(STATES.CIRCLE);
  }, []);

  // Calculate opacity and transform for components
  const domeOpacity =
    currentState === STATES.DOME
      ? 1
      : currentState === STATES.TRANSITIONING
      ? 1 - transitionProgress
      : 0;

  const circleOpacity =
    currentState === STATES.CIRCLE || currentState === STATES.PROJECT_FOCUS
      ? 1
      : currentState === STATES.TRANSITIONING
      ? transitionProgress
      : 0;

  // Dome curvature flattening during transition
  const domeBend =
    currentState === STATES.TRANSITIONING
      ? 0.5 - transitionProgress * 0.5
      : 0.5;

  // Circle bend increases during transition
  const circleBend =
    currentState === STATES.TRANSITIONING ? 3 * transitionProgress : 3;

  return (
    <>
      {/* Full-height scroll container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ minHeight: "200vh" }}
      >
        {/* Fixed viewport gallery container */}
        <div className="fixed inset-0 w-full h-screen overflow-hidden bg-[#060010]">
          {/* Subtle noise texture overlay */}
          <div
            className="absolute inset-0 z-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
          />

          {/* Dome Gallery Layer */}
          <div
            ref={domeRef}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: domeOpacity,
              transform: `scale(${1 + scrollProgress * 0.05})`,
              pointerEvents: domeOpacity > 0.5 ? "auto" : "none",
            }}
          >
            <DomeGallery
              images={galleryItems}
              fit={domeBend}
              overlayBlurColor="#060010"
              grayscale={true}
              autoRotate={
                currentState === STATES.DOME ||
                currentState === STATES.TRANSITIONING
              }
              autoRotateSpeed={0.003 + scrollProgress * 0.003}
              scrollProgress={scrollProgress}
              imageBorderRadius="16px"
            />
          </div>

          {/* Circular Gallery Layer */}
          <div
            ref={circleRef}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: circleOpacity,
              pointerEvents: circleOpacity > 0.5 ? "auto" : "none",
            }}
          >
            <CircularGallery
              items={galleryItems}
              bend={circleBend}
              textColor="#ffffff"
              borderRadius={0.05}
              font="bold 24px 'Space Grotesk', sans-serif"
              scrollSpeed={1.5}
              scrollEase={0.03}
              onItemClick={handleProjectClick}
            />
          </div>

          {/* Hero Text Overlay - Dome state only */}
          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none transition-opacity duration-700"
            style={{
              opacity: showText && currentState === STATES.DOME ? 1 : 0,
            }}
          >
            <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-white text-center drop-shadow-2xl">
              Our Works
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 text-center max-w-lg px-6">
              Scroll to explore our portfolio
            </p>
          </div>

          {/* State indicator (for debugging - can be removed) */}
          {/* <div className="absolute bottom-4 left-4 z-50 text-white/50 text-xs font-mono">
            State: {Object.keys(STATES).find(k => STATES[k] === currentState)} | 
            Progress: {(scrollProgress * 100).toFixed(0)}%
          </div> */}

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-500"
            style={{ opacity: currentState === STATES.DOME ? 1 : 0 }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">
              Scroll
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
            </div>
          </div>

          {/* Vignette overlay - increases during transition */}
          <div
            className="absolute inset-0 pointer-events-none z-4 transition-opacity duration-300"
            style={{
              background: `radial-gradient(ellipse at center, transparent 0%, rgba(6,0,16,${
                0.3 + transitionProgress * 0.4
              }) 100%)`,
              opacity: currentState >= STATES.TRANSITIONING ? 1 : 0.5,
            }}
          />
        </div>

        {/* Spacer for scroll sections below gallery */}
        <div className="h-screen" />

        {/* Footer CTA Section */}
        <section className="relative z-10 bg-bg-primary py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="mb-8 text-sm font-bold uppercase tracking-[0.3em] text-gray-500">
              Ready to build?
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-4 rounded-xl bg-white px-10 py-5 text-lg font-bold text-black transition-all hover:bg-accent hover:text-white active:scale-95"
            >
              <span>Start Your Project</span>
              <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>
      </div>

      {/* Project Detail Overlay */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={handleProjectClose}
          isVisible={currentState === STATES.PROJECT_DETAIL}
        />
      )}
    </>
  );
}
