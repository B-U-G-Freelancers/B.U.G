// src/components/gallery/GenieWorld.jsx
// Main works gallery experience: Wireframe Globe Intro → TiltedCard Carousel → Project Focus
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, ExternalLink, Github, Globe } from "lucide-react";
import TiltedCard from "../ui/TiltedCard";
import Shuffle from "../ui/Shuffle";
import DecryptedText from "../ui/DecryptedText";
import FloatingElement, {
  FloatingFragments,
  SceneParallax,
} from "../ui/FloatingElement";
import CircularGallery from "./CircularGallery";

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

// Wireframe Earth globe with latitude/longitude lines
function WireframeGlobe() {
  // Generate longitude rings (vertical circles rotated around Y axis)
  const longitudeRings = Array.from({ length: 8 }, (_, i) => i * 22.5);
  // Generate latitude rings (horizontal circles at different heights)
  const latitudePositions = [-60, -30, 0, 30, 60];

  return (
    <div className="wireframe-globe">
      <div className="globe-container">
        <div className="globe-sphere">
          {/* Longitude rings - vertical circles */}
          {longitudeRings.map((rotation, i) => (
            <div
              key={`long-${i}`}
              className="globe-ring longitude-ring"
              style={{
                transform: `rotateY(${rotation}deg)`,
                opacity: 0.25 + (i % 2) * 0.15,
              }}
            />
          ))}

          {/* Latitude rings - horizontal circles */}
          {latitudePositions.map((pos, i) => {
            const scale = Math.cos((pos * Math.PI) / 180);
            const zPos = Math.sin((pos * Math.PI) / 180) * 225;
            return (
              <div
                key={`lat-${i}`}
                className="globe-ring latitude-ring"
                style={{
                  transform: `rotateX(90deg) translateZ(${zPos}px) scale(${scale})`,
                  opacity: pos === 0 ? 0.5 : 0.3,
                }}
              />
            );
          })}

          {/* Spherical shading overlay */}
          <div className="globe-shading" />
        </div>
      </div>

      <style>{`
        .wireframe-globe {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          perspective: 1500px;
        }
        .globe-container {
          position: relative;
          width: 500px;
          height: 500px;
          transform-style: preserve-3d;
        }
        .globe-sphere {
          width: 100%;
          height: 100%;
          position: relative;
          animation: rotate-globe 20s linear infinite;
          transform-style: preserve-3d;
        }
        .globe-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 450px;
          height: 450px;
          margin: -225px 0 0 -225px;
          border-radius: 50%;
          border: 1.5px solid rgba(58, 124, 255, 0.5);
          transform-style: preserve-3d;
        }
        .longitude-ring {
          border-width: 2px;
          border-color: rgba(58, 124, 255, 0.45);
        }
        .latitude-ring {
          border-color: rgba(58, 124, 255, 0.4);
        }
        .globe-shading {
          position: absolute;
          inset: 25px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse 40% 50% at 30% 30%,
            rgba(58, 124, 255, 0.2) 0%,
            transparent 50%
          ),
          radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(0, 0, 0, 0.4) 100%
          );
          pointer-events: none;
        }
        @keyframes rotate-globe {
          from { transform: rotateX(-20deg) rotateY(0deg); }
          to { transform: rotateX(-20deg) rotateY(360deg); }
        }
        @media (max-width: 768px) {
          .globe-container { width: 320px; height: 320px; }
          .globe-ring { width: 280px; height: 280px; margin: -140px 0 0 -140px; }
        }
      `}</style>
    </div>
  );
}

// Particle burst effect for transition
function ParticleBurst({ originX, originY, isActive }) {
  const particleCount = 80;

  // Pre-generate particle data to avoid calling Math.random during render
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => {
      const baseAngle = (i / particleCount) * 360;
      // Use seeded pseudo-random based on index
      const seed = (i * 9301 + 49297) % 233280;
      const rand1 = seed / 233280;
      const seed2 = (seed * 9301 + 49297) % 233280;
      const rand2 = seed2 / 233280;
      const seed3 = (seed2 * 9301 + 49297) % 233280;
      const rand3 = seed3 / 233280;
      const seed4 = (seed3 * 9301 + 49297) % 233280;
      const rand4 = seed4 / 233280;
      const seed5 = (seed4 * 9301 + 49297) % 233280;
      const rand5 = seed5 / 233280;

      const angle = baseAngle + rand1 * 20;
      const distance = 800 + rand2 * 600;
      const delay = rand3 * 0.6;
      const size = 4 + rand4 * 8;
      const duration = 0.8 + rand5 * 0.5;

      const radians = (angle * Math.PI) / 180;
      const endX = Math.cos(radians) * distance;
      const endY = Math.sin(radians) * distance;

      return { delay, size, duration, endX, endY };
    });
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: originX,
            top: originY,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(59, 130, 246, 1) 0%, rgba(37, 99, 235, 0.8) 50%, rgba(29, 78, 216, 0) 100%)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(59, 130, 246, 0.6), 0 0 ${
              p.size * 4
            }px rgba(59, 130, 246, 0.3)`,
            animation: `particle-burst ${p.duration}s ease-out ${p.delay}s forwards`,
            "--end-x": `${p.endX}px`,
            "--end-y": `${p.endY}px`,
            opacity: 0,
          }}
        />
      ))}

      {/* Central flash */}
      <div
        className="absolute rounded-full"
        style={{
          left: originX - 100,
          top: originY - 100,
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 70%)",
          animation: "flash-expand 0.6s ease-out forwards",
        }}
      />

      <style>{`
        @keyframes particle-burst {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1);
            opacity: 0;
          }
        }
        @keyframes flash-expand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
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
  const isScrollingRef = useRef(false);

  const cardWidth = 400;
  const cardHeight = 500;
  const gap = 40;

  // Calculate the offset to center the current card
  const getTransformX = () => {
    const centerOffset = window.innerWidth / 2 - cardWidth / 2;
    return centerOffset - currentIndex * (cardWidth + gap);
  };

  // Handle wheel scroll - immediate with throttle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();

      // Throttle: ignore if already scrolling
      if (isScrollingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      setCurrentIndex((prev) => {
        const next = prev + direction;
        // Circular: wrap around
        if (next < 0) return projects.length - 1;
        if (next >= projects.length) return 0;
        return next;
      });

      // Block further scrolls for 150ms
      isScrollingRef.current = true;
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
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
        // Circular: wrap around
        if (next < 0) return projects.length - 1;
        if (next >= projects.length) return 0;
        return next;
      });
    }
  };

  // Note: Keyboard navigation is handled at the GenieWorld component level

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
          transition: "transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform",
          gap: `${gap}px`,
        }}
      >
        {projects.map((project, index) => {
          const isFocused = index === currentIndex;

          return (
            <div
              key={project.id}
              className="shrink-0"
              style={{
                width: cardWidth,
                height: cardHeight,
                transform: isFocused ? "scale(1.1)" : "scale(0.85)",
                opacity: isFocused ? 1 : 0.5,
                transition:
                  "transform 0.4s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.4s ease-out",
                zIndex: isFocused ? 10 : 1,
              }}
            >
              <FloatingElement
                preset="card"
                index={index}
                depth={isFocused ? 2 : 1}
                reduceOnHover={true}
                enableParallax={true}
                className="w-full h-full"
              >
                <div
                  className="w-full h-full"
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
              </FloatingElement>
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
      {/* Floating background effect */}
      <FloatingFragments count={6} />

      {/* Scene parallax wrapper */}
      <SceneParallax strength={15} duration={0.5} className="min-h-screen">
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
      </SceneParallax>
    </motion.div>
  );
}

// Main component
export default function GenieWorld({ projects = [], onStateChange }) {
  const [currentState, setCurrentState] = useState(STATES.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Notify parent of state changes
  useEffect(() => {
    if (onStateChange) {
      onStateChange(currentState);
    }
  }, [currentState, onStateChange]);

  const handleEnter = useCallback((e) => {
    // Capture click position for particle burst origin
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setShowParticles(true);
    // Transition to gallery after particles spread
    setTimeout(() => {
      setCurrentState(STATES.GALLERY);
    }, 600);
    setTimeout(() => {
      setShowParticles(false);
    }, 1500);
  }, []);

  const handleProjectClick = useCallback((project, index) => {
    setSelectedProject(project);
    setCurrentState(STATES.FOCUSED);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
    setCurrentState(STATES.GALLERY);
  }, []);

  const handleBackToIntro = useCallback(() => {
    setCurrentState(STATES.INTRO);
    setCurrentIndex(0);
  }, []);

  // Keyboard navigation for gallery
  useEffect(() => {
    if (currentState !== STATES.GALLERY) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex(
          (prev) => (prev - 1 + projects.length) % projects.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (projects[currentIndex]) {
          handleProjectClick(projects[currentIndex], currentIndex);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleBackToIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentState,
    projects.length,
    currentIndex,
    handleProjectClick,
    handleBackToIntro,
    projects,
  ]);

  // Keyboard/Click outside handler for FOCUSED state
  useEffect(() => {
    if (currentState !== STATES.FOCUSED) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentState, handleClose]);

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

      {/* Particle burst transition effect */}
      <ParticleBurst
        originX={clickPosition.x}
        originY={clickPosition.y}
        isActive={showParticles}
      />

      <style>{`
        @keyframes rgb-shift {
          0%, 100% { transform: translateX(-1px); }
          50% { transform: translateX(1px); }
        }
      `}</style>
      {/* Navigation is now handled by the Header component */}

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
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-white mb-6 flex items-center justify-center gap-2">
                <Shuffle
                  text="GENIE"
                  tag="span"
                  className="font-bold text-6xl sm:text-8xl lg:text-9xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  shuffleDirection="up"
                  shuffleTimes={3}
                  duration={0.4}
                  stagger={0.05}
                  triggerOnce={true}
                  triggerOnHover={true}
                />
                <DecryptedText
                  text="WORLD"
                  className="italic font-light text-6xl sm:text-8xl lg:text-9xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  speed={100}
                  maxIterations={20}
                  characters="ABCD1234!?"
                  // className="revealed"
                  parentClassName="all-letters"
                  encryptedClassName="encrypted"
                />
              </h1>

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
          <SceneParallax
            strength={25}
            duration={0.5}
            className="absolute inset-0"
          >
            {/* Navigation handled by Header component */}

            {/* Floating background fragments for atmospheric depth */}
            <FloatingFragments count={12} />

            {/* Gallery content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <CircularGallery
                items={projects}
                bend={2}
                textColor="#ffffff"
                borderRadius={0.03}
                font="bold 20px Inter, sans-serif"
                scrollSpeed={2}
                scrollEase={0.06}
                onItemClick={handleProjectClick}
              />

              {/* Text Overlays to fill empty space */}
              <motion.div
                className="absolute inset-0 pointer-events-none flex flex-col justify-between py-12 px-6 z-20"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.5, duration: 0.8 },
                }}
                exit={{ opacity: 0 }}
              >
                {/* Side Text - Vertical Layout to avoid card collision */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-4">
                  <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  <h2 className="text-white/10 text-4xl font-black uppercase tracking-tighter writing-vertical-lr rotate-180 select-none whitespace-nowrap">
                    Selected Works
                  </h2>
                  <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                </div>

                <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-4">
                  <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  <h2 className="text-white/10 text-4xl font-black uppercase tracking-tighter writing-vertical-lr select-none whitespace-nowrap">
                    Premium Collection
                  </h2>
                  <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Bottom Navigation Hint */}
                <div className="w-full text-center flex flex-col items-center gap-4 mb-10">
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                  <div className="flex items-center gap-6 text-white/40">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-2">
                        <span className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-xs bg-white/5 font-mono">
                          ←
                        </span>
                        <span className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-xs bg-white/5 font-mono">
                          →
                        </span>
                      </div>
                      <span className="text-[9px] tracking-widest uppercase opacity-50">
                        Navigate
                      </span>
                    </div>

                    <div className="h-8 w-px bg-white/10"></div>

                    <div className="flex flex-col items-center gap-2">
                      <span className="h-8 px-3 rounded border border-white/10 flex items-center justify-center text-[10px] bg-white/5 font-mono tracking-widest uppercase">
                        Enter
                      </span>
                      <span className="text-[9px] tracking-widest uppercase opacity-50">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </SceneParallax>
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
