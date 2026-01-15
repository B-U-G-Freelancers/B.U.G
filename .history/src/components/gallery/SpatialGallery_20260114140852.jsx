// src/components/gallery/SpatialGallery.jsx
// Immersive spatial navigation gallery - projects exist in 3D depth space
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, ExternalLink, Github } from "lucide-react";
import SpatialProjectNode from "./SpatialProjectNode";

// Physics constants for natural-feeling motion
const PHYSICS = {
  friction: 0.92, // Velocity decay per frame
  wheelSensitivity: 1.2, // Scroll wheel multiplier
  dragSensitivity: 0.8, // Drag multiplier
  minVelocity: 0.1, // Stop threshold
  projectSpacing: 600, // Z distance between projects
  focusThreshold: 200, // Distance to consider "focused"
};

// Main Spatial Gallery Component
export default function SpatialGallery({ projects = [] }) {
  // Camera position on Z-axis (depth)
  const [cameraZ, setCameraZ] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isEngaged, setIsEngaged] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Refs for physics loop
  const containerRef = useRef(null);
  const velocityRef = useRef(0);
  const cameraRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ y: 0, cameraZ: 0 });
  const lastDragY = useRef(0);
  const engageTimerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Calculate Z positions for all projects
  const projectPositions = projects.map((_, i) => i * PHYSICS.projectSpacing);
  const maxZ = (projects.length - 1) * PHYSICS.projectSpacing;

  // Initial ready state
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Physics loop - handles inertia
  useEffect(() => {
    const updatePhysics = () => {
      if (
        Math.abs(velocityRef.current) > PHYSICS.minVelocity &&
        !isDraggingRef.current
      ) {
        // Apply friction
        velocityRef.current *= PHYSICS.friction;

        // Update camera position
        cameraRef.current += velocityRef.current;

        // Clamp to bounds with soft bounce
        if (cameraRef.current < 0) {
          cameraRef.current = 0;
          velocityRef.current = 0;
        } else if (cameraRef.current > maxZ) {
          cameraRef.current = maxZ;
          velocityRef.current = 0;
        }

        setCameraZ(cameraRef.current);
        setVelocity(velocityRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [maxZ]);

  // Calculate focused project based on camera position
  useEffect(() => {
    let closestIndex = 0;
    let closestDistance = Infinity;

    projectPositions.forEach((pos, i) => {
      const distance = Math.abs(cameraRef.current - pos);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== focusedIndex) {
      setFocusedIndex(closestIndex);
      setIsEngaged(false);

      // Clear engage timer when focus changes
      if (engageTimerRef.current) {
        clearTimeout(engageTimerRef.current);
      }
    }
  }, [cameraZ, projectPositions, focusedIndex]);

  // Engagement timer - dwell to reveal details
  useEffect(() => {
    if (Math.abs(velocity) < 1 && !isDraggingRef.current) {
      engageTimerRef.current = setTimeout(() => {
        setIsEngaged(true);
      }, 1500);
    }

    return () => {
      if (engageTimerRef.current) {
        clearTimeout(engageTimerRef.current);
      }
    };
  }, [focusedIndex, velocity]);

  // Wheel handler - accelerate camera
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY * PHYSICS.wheelSensitivity;
    velocityRef.current += delta * 0.1;
  }, []);

  // Drag handlers
  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true;
    dragStartRef.current = { y: e.clientY, cameraZ: cameraRef.current };
    lastDragY.current = e.clientY;
    velocityRef.current = 0;
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;

      const deltaY = lastDragY.current - e.clientY;
      const newCameraZ = cameraRef.current + deltaY * PHYSICS.dragSensitivity;

      // Track velocity for momentum on release
      velocityRef.current = deltaY * PHYSICS.dragSensitivity * 0.5;

      cameraRef.current = Math.max(0, Math.min(maxZ, newCameraZ));
      setCameraZ(cameraRef.current);
      lastDragY.current = e.clientY;
    },
    [maxZ]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    isDraggingRef.current = true;
    const touch = e.touches[0];
    dragStartRef.current = { y: touch.clientY, cameraZ: cameraRef.current };
    lastDragY.current = touch.clientY;
    velocityRef.current = 0;
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;

      const touch = e.touches[0];
      const deltaY = lastDragY.current - touch.clientY;
      const newCameraZ = cameraRef.current + deltaY * PHYSICS.dragSensitivity;

      velocityRef.current = deltaY * PHYSICS.dragSensitivity * 0.5;

      cameraRef.current = Math.max(0, Math.min(maxZ, newCameraZ));
      setCameraZ(cameraRef.current);
      lastDragY.current = touch.clientY;
    },
    [maxZ]
  );

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const targetZ = Math.min(
          maxZ,
          (focusedIndex + 1) * PHYSICS.projectSpacing
        );
        velocityRef.current = (targetZ - cameraRef.current) * 0.15;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        const targetZ = Math.max(
          0,
          (focusedIndex - 1) * PHYSICS.projectSpacing
        );
        velocityRef.current = (targetZ - cameraRef.current) * 0.15;
      } else if (e.key === "Enter" && projects[focusedIndex]) {
        setSelectedProject(projects[focusedIndex]);
      } else if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, maxZ, projects, selectedProject]);

  // Project click handler
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-black overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.5s" }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Atmospheric depth fog */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(ellipse 100% 50% at 50% 0%, rgba(58, 124, 255, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 100% 50% at 50% 100%, rgba(58, 124, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.6) 100%)
          `,
        }}
      />

      {/* Subtle scanlines */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Back to home */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm transition-all backdrop-blur-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {/* Progress indicator - minimal */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        {projects.map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-full transition-all duration-500"
            style={{
              height: i === focusedIndex ? "32px" : "8px",
              backgroundColor:
                i === focusedIndex
                  ? "rgba(58, 124, 255, 0.8)"
                  : "rgba(255, 255, 255, 0.2)",
            }}
          />
        ))}
      </div>

      {/* Spatial project nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1500px",
          }}
        >
          {projects.map((project, index) => {
            const projectZ = projectPositions[index];
            const distanceFromCamera = projectZ - cameraZ;
            const isFocused = index === focusedIndex;

            return (
              <SpatialProjectNode
                key={project.id}
                project={project}
                index={index}
                distanceFromCamera={distanceFromCamera}
                isFocused={isFocused}
                isEngaged={isFocused && isEngaged}
                onClick={() => handleProjectClick(project)}
              />
            );
          })}
        </div>
      </div>

      {/* Navigation hint */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: cameraZ < 50 && Math.abs(velocity) < 1 ? 0.4 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20" />
          <span>Scroll to explore</span>
        </div>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Project Detail View
function ProjectDetail({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-auto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-8 lg:p-16">
        {/* Left: Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="lg:w-1/2 flex items-center justify-center mb-8 lg:mb-0"
        >
          <div className="relative w-full max-w-xl aspect-[4/5] overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
              }}
            />
          </div>
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:w-1/2 lg:pl-16"
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
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
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
              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full transition-all border border-white/10">
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
