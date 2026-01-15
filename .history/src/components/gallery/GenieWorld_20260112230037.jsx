// src/components/gallery/GenieWorld.jsx
// Main works gallery experience: Wireframe Globe Intro → TiltedCard Carousel → Project Focus
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, ExternalLink, Github } from "lucide-react";
import TiltedCard from "../ui/TiltedCard";

// States
const STATES = {
  INTRO: "intro",
  GALLERY: "gallery",
  FOCUSED: "focused",
};

// Glitch text effect
function GlitchText({ children, className = "" }) {
  return (
    <div className={`glitch-container ${className}`}>
      <span className="glitch-text" data-text={children}>
        {children}
      </span>
      <style>{`
        .glitch-container { position: relative; }
        .glitch-text {
          position: relative;
          display: inline-block;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #ff0040;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          animation: glitch-1 2s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: 2px 0 #00ffff;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          animation: glitch-2 3s infinite linear alternate-reverse;
        }
        @keyframes glitch-1 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); }
          25% { clip-path: polygon(0 15%, 100% 15%, 100% 50%, 0 50%); }
          50% { clip-path: polygon(0 40%, 100% 40%, 100% 75%, 0 75%); }
          75% { clip-path: polygon(0 25%, 100% 25%, 100% 60%, 0 60%); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); }
          25% { clip-path: polygon(0 50%, 100% 50%, 100% 85%, 0 85%); }
          50% { clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%); }
          75% { clip-path: polygon(0 60%, 100% 60%, 100% 95%, 0 95%); }
        }
      `}</style>
    </div>
  );
}

// Wireframe globe (simplified CSS version)
function WireframeGlobe() {
  return (
    <div className="wireframe-globe">
      <div className="globe-sphere" />
      <style>{`
        .wireframe-globe {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .globe-sphere {
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(58, 124, 253, 0.2);
          position: relative;
          animation: rotate-globe 30s linear infinite;
          box-shadow: 
            inset 0 0 60px rgba(58, 124, 253, 0.1),
            0 0 40px rgba(58, 124, 253, 0.1);
        }
        .globe-sphere::before {
          content: '';
          position: absolute;
          inset: 20px;
          border-radius: 50%;
          border: 1px solid rgba(58, 124, 253, 0.15);
        }
        .globe-sphere::after {
          content: '';
          position: absolute;
          inset: 50px;
          border-radius: 50%;
          border: 1px solid rgba(58, 124, 253, 0.1);
        }
        @keyframes rotate-globe {
          from { transform: rotateY(0deg) rotateX(15deg); }
          to { transform: rotateY(360deg) rotateX(15deg); }
        }
        @media (max-width: 768px) {
          .globe-sphere { width: 300px; height: 300px; }
        }
      `}</style>
    </div>
  );
}

// Carousel of tilted cards - optimized for smooth scrolling
function ProjectCarousel({
  projects,
  onProjectClick,
  currentIndex,
  setCurrentIndex,
}) {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const startIndexRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  const cardWidth = 400;
  const cardHeight = 500;
  const gap = 40;

  // Calculate the offset to center the current card
  const getTransformX = () => {
    const centerOffset = window.innerWidth / 2 - cardWidth / 2;
    return centerOffset - currentIndex * (cardWidth + gap);
  };

  // Handle wheel scroll with debounce for snappy navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();

      // Clear any pending scroll
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce: only trigger after scroll stops for 80ms
      scrollTimeoutRef.current = setTimeout(() => {
        const direction = e.deltaY > 0 ? 1 : -1;
        setCurrentIndex((prev) => {
          const next = prev + direction;
          return Math.max(0, Math.min(projects.length - 1, next));
        });
      }, 80);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [projects.length, setCurrentIndex]);

  // Drag handlers
  const handleDragStart = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = e.clientX || e.touches?.[0]?.clientX || 0;
    startIndexRef.current = currentIndex;
  };

  const handleDragEnd = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const endX =
      e.clientX || e.changedTouches?.[0]?.clientX || dragStartRef.current;
    const diff = dragStartRef.current - endX;
    const threshold = cardWidth / 4;

    if (Math.abs(diff) > threshold) {
      const direction = diff > 0 ? 1 : -1;
      setCurrentIndex((prev) => {
        const next = prev + direction;
        return Math.max(0, Math.min(projects.length - 1, next));
      });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => Math.min(projects.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length, setCurrentIndex]);

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      ref={containerRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      {/* Cards container with CSS transform for smooth animation */}
      <div
        className="absolute top-1/2 left-0 flex items-center"
        style={{
          transform: `translateY(-50%) translateX(${getTransformX()}px)`,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
          gap: `${gap}px`,
        }}
      >
        {projects.map((project, index) => {
          const isFocused = index === currentIndex;

          return (
            <div
              key={project.id}
              className="flex-shrink-0"
              style={{
                width: cardWidth,
                height: cardHeight,
                transform: isFocused ? "scale(1.1)" : "scale(0.85)",
                opacity: isFocused ? 1 : 0.5,
                transition: "transform 0.4s ease, opacity 0.4s ease",
                zIndex: isFocused ? 10 : 1,
                willChange: "transform, opacity",
              }}
              onClick={() => {
                if (isFocused) {
                  onProjectClick(project, index);
                } else {
                  setCurrentIndex(index);
                }
              }}
            >
              <TiltedCard
                imageSrc={project.image}
                altText={project.title}
                captionText={project.title}
                containerWidth={`${cardWidth}px`}
                containerHeight={`${cardHeight}px`}
                imageWidth={`${cardWidth}px`}
                imageHeight={`${cardHeight}px`}
                scaleOnHover={isFocused ? 1.02 : 1}
                rotateAmplitude={isFocused ? 10 : 0}
                showTooltip={isFocused}
                displayOverlayContent={true}
                overlayContent={
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent"
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <p className="text-xs text-blue-400 font-mono mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                }
              />
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-8" : "bg-white/30 w-2"
            }`}
          />
        ))}
      </div>

      {/* Arrow navigation */}
      <button
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all disabled:opacity-30 z-20"
        disabled={currentIndex === 0}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() =>
          setCurrentIndex(Math.min(projects.length - 1, currentIndex + 1))
        }
        className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all rotate-180 disabled:opacity-30 z-20"
        disabled={currentIndex === projects.length - 1}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Scroll hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase z-20">
        Scroll or use arrows to navigate
      </div>
    </div>
  );
}

// Project focus/detail view
function ProjectFocus({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-auto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left: Large interactive image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center"
        >
          <TiltedCard
            imageSrc={project.image}
            altText={project.title}
            containerWidth="100%"
            containerHeight="70vh"
            imageWidth="100%"
            imageHeight="70vh"
            scaleOnHover={1.02}
            rotateAmplitude={8}
            showTooltip={false}
          />
        </motion.div>

        {/* Right: Project details */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center"
        >
          <div className="max-w-lg">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded-full">
                {project.category}
              </span>
              <span className="text-white/40 text-sm">{project.year}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            {project.tech && (
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(", ").map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 text-white/60 text-sm rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Role & Timeline */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {project.role && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">
                    Role
                  </h4>
                  <p className="text-white">{project.role}</p>
                </div>
              )}
              {project.timeline && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">
                    Timeline
                  </h4>
                  <p className="text-white">{project.timeline}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-all">
                <ExternalLink className="w-4 h-4" />
                View Live
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all">
                <Github className="w-4 h-4" />
                Source
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Main component
export default function GenieWorld({ projects = [] }) {
  const [currentState, setCurrentState] = useState(STATES.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = useCallback(() => {
    setCurrentState(STATES.GALLERY);
  }, []);

  const handleProjectClick = useCallback((project, index) => {
    setSelectedProject(project);
    setCurrentState(STATES.FOCUSED);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
    setCurrentState(STATES.GALLERY);
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black overflow-hidden"
      style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.5s" }}
    >
      {/* Pixelated/CRT effect overlay */}
      <div className="pointer-events-none fixed inset-0 z-50">
        {/* Scanlines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)",
            backgroundSize: "100% 2px",
          }}
        />
        {/* RGB shift flicker */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-screen"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,0,0,0.1) 0%, rgba(0,255,0,0.1) 50%, rgba(0,0,255,0.1) 100%)",
            animation: "rgb-shift 8s ease-in-out infinite",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />
        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <style>{`
        @keyframes rgb-shift {
          0%, 100% { transform: translateX(-1px); }
          50% { transform: translateX(1px); }
        }
      `}</style>
      {/* Back to home */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Home
      </Link>

      {/* Intro state */}
      <AnimatePresence>
        {currentState === STATES.INTRO && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <WireframeGlobe />

            <div className="relative z-10 text-center">
              <GlitchText>
                <h1
                  className="text-6xl sm:text-8xl lg:text-9xl font-black text-white mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="font-bold">GENIE</span>
                  <span
                    className="italic font-light"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    WORLD
                  </span>
                </h1>
              </GlitchText>

              <p className="text-white/50 text-sm tracking-widest uppercase mb-12">
                Explore our projects
              </p>

              <button
                onClick={handleEnter}
                className="px-8 py-3 rounded-full border border-white/20 text-white/80 text-sm tracking-widest uppercase hover:bg-white/10 hover:border-white/40 transition-all"
              >
                Enter World
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery state */}
      <AnimatePresence>
        {currentState === STATES.GALLERY && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <ProjectCarousel
              projects={projects}
              onProjectClick={handleProjectClick}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />

            {/* Current project info */}
            <div className="absolute top-1/2 left-28 -translate-y-1/2 max-w-xs pointer-events-none">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white"
              >
                <p className="text-blue-400 text-xs font-mono mb-2">
                  {projects[currentIndex]?.category}
                </p>
                <h2 className="text-2xl font-bold mb-2">
                  {projects[currentIndex]?.title}
                </h2>
                <p className="text-white/50 text-sm">Click to explore</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focused state */}
      <AnimatePresence>
        {currentState === STATES.FOCUSED && (
          <ProjectFocus project={selectedProject} onClose={handleClose} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-6 right-6 z-10">
        <p className="text-white/40 text-xs">©2025 B.U.G</p>
      </div>
    </div>
  );
}
