// src/components/gallery/SpatialProjectNode.jsx
// Individual project presentation in spatial depth space
import { motion } from "motion/react";
import { useMemo } from "react";

// Depth visual constants
const DEPTH = {
  maxBlur: 15, // Maximum blur in pixels
  fadeStart: 400, // Distance where fade begins
  fadeEnd: 1000, // Distance where fully faded
  scaleMin: 0.3, // Minimum scale for far projects
  scaleMax: 1.0, // Maximum scale for focused project
  yShift: 150, // Vertical shift for depth parallax
};

export default function SpatialProjectNode({
  project,
  index,
  distanceFromCamera,
  isFocused,
  isEngaged,
  onClick,
}) {
  // Calculate visual properties based on distance
  const visualProps = useMemo(() => {
    const absDistance = Math.abs(distanceFromCamera);
    const isAhead = distanceFromCamera > 0; // Project is ahead of camera

    // Normalize distance for calculations (0 = at camera, 1 = far away)
    const normalizedDistance = Math.min(absDistance / DEPTH.fadeEnd, 1);

    // Scale: focused = 1, fades to 0.3 with distance
    const scale =
      DEPTH.scaleMax - normalizedDistance * (DEPTH.scaleMax - DEPTH.scaleMin);

    // Blur: none at camera, increases with distance
    const blur = normalizedDistance * DEPTH.maxBlur;

    // Opacity: full at camera, fades with distance
    const opacity =
      absDistance < DEPTH.fadeStart
        ? 1
        : Math.max(
            0.1,
            1 -
              (absDistance - DEPTH.fadeStart) /
                (DEPTH.fadeEnd - DEPTH.fadeStart)
          );

    // Z-index: closer projects on top
    const zIndex = Math.round(1000 - absDistance);

    // Y position: parallax effect based on distance
    const yOffset = isAhead
      ? -normalizedDistance * DEPTH.yShift
      : normalizedDistance * DEPTH.yShift * 0.5;

    // Subtle rotation for depth
    const rotateX = isAhead ? normalizedDistance * 5 : -normalizedDistance * 3;

    return { scale, blur, opacity, zIndex, yOffset, rotateX, isAhead };
  }, [distanceFromCamera]);

  // Don't render projects too far away
  if (Math.abs(distanceFromCamera) > DEPTH.fadeEnd * 1.2) {
    return null;
  }

  return (
    <motion.div
      className="absolute flex flex-col items-center cursor-pointer"
      style={{
        zIndex: visualProps.zIndex,
        transform: `
          translateY(${visualProps.yOffset}px) 
          scale(${visualProps.scale})
          perspective(1000px)
          rotateX(${visualProps.rotateX}deg)
        `,
        opacity: visualProps.opacity,
        filter: `blur(${visualProps.blur}px)`,
        transition: "all 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
        willChange: "transform, opacity, filter",
      }}
      onClick={onClick}
      whileHover={isFocused ? { scale: visualProps.scale * 1.02 } : {}}
    >
      {/* Project Image Container */}
      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          width: "clamp(320px, 45vw, 600px)",
          height: "clamp(420px, 55vh, 700px)",
        }}
      >
        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{
            transition: "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
            transform: isFocused ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%),
              linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%)
            `,
          }}
        />

        {/* Focus indicator glow */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              boxShadow: "inset 0 0 60px rgba(58, 124, 255, 0.15)",
              border: "1px solid rgba(58, 124, 255, 0.2)",
              borderRadius: "inherit",
            }}
          />
        )}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          {/* Category & Year - always visible when close enough */}
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: visualProps.opacity > 0.5 ? 1 : 0,
              y: visualProps.opacity > 0.5 ? 0 : 10,
            }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="px-2 py-0.5 text-xs font-mono tracking-wider rounded"
              style={{
                backgroundColor: "rgba(58, 124, 255, 0.2)",
                color: "rgba(58, 124, 255, 0.9)",
              }}
            >
              {project.category}
            </span>
            <span className="text-white/40 text-xs">{project.year}</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isFocused ? 1 : 0.7,
              y: 0,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {project.title}
          </motion.h2>

          {/* Description - only when engaged */}
          <motion.p
            className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{
              opacity: isEngaged ? 1 : 0,
              y: isEngaged ? 0 : 10,
              height: isEngaged ? "auto" : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {project.description}
          </motion.p>

          {/* Engagement hint */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-white/30 text-xs tracking-wide uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused && !isEngaged ? 0.6 : 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="w-4 h-px bg-white/30" />
            <span>Click to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Subtle project number */}
      <motion.div
        className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 text-white/5 font-bold select-none pointer-events-none"
        style={{
          fontSize: "clamp(80px, 15vw, 200px)",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 0.1 : 0.03 }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>
    </motion.div>
  );
}
