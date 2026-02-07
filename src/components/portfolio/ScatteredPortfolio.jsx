// src/components/portfolio/ScatteredPortfolio.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProjects } from "../../context/ProjectContext";

// Desktop: 4 cards positioned scattered/clustered layout
const CARD_POSITIONS = [
  {
    // Top-left: tilted left
    left: "12%",
    top: "8%",
    width: "26%",
    rotation: -12,
    parallaxSpeed: 0.18,
    zIndex: 10,
  },
  {
    // Top-center: main focal card
    left: "35%",
    top: "2%",
    width: "28%",
    rotation: 4,
    parallaxSpeed: 0.22,
    zIndex: 25,
  },
  {
    // Top-right: aerial view style
    left: "58%",
    top: "6%",
    width: "30%",
    rotation: 8,
    parallaxSpeed: 0.12,
    zIndex: 20,
  },
  {
    // Bottom-center: overlapping below
    left: "30%",
    top: "45%",
    width: "32%",
    rotation: -5,
    parallaxSpeed: 0.25,
    zIndex: 30,
  },
];

// Desktop card with absolute positioning
function DesktopCard({ project, position, scrollProgress }) {
  const y = useTransform(
    scrollProgress,
    [0, 1],
    [80 * position.parallaxSpeed, -80 * position.parallaxSpeed],
  );

  const rotate = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [position.rotation - 1, position.rotation, position.rotation + 1],
  );

  return (
    <motion.div
      className="absolute hidden md:block"
      style={{
        left: position.left,
        top: position.top,
        width: position.width,
        zIndex: position.zIndex,
        y,
        rotate,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <CardContent project={project} rotation={position.rotation} />
    </motion.div>
  );
}

// Mobile card in grid layout
function MobileCard({ project, index }) {
  const rotations = [-3, 2, -2, 3];
  const rotation = rotations[index % 4];

  return (
    <motion.div
      className="md:hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <CardContent project={project} rotation={0} />
    </motion.div>
  );
}

// Shared card content component
function CardContent({ project, rotation }) {
  return (
    <Link to={`/works/${project.id}`} className="block group">
      <motion.div
        className="relative overflow-hidden rounded-xl cursor-pointer"
        whileHover={{
          scale: 1.03,
          rotate: rotation * 0.5,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        style={{
          boxShadow: "0 15px 40px -10px rgba(0, 0, 0, 0.7)",
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full aspect-[4/3] object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

        {/* Title - always visible on mobile, hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-semibold text-sm md:text-base">
            {project.title}
          </h3>
          <p className="text-white/60 text-xs mt-0.5">{project.category}</p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ScatteredPortfolio() {
  const projects = useProjects();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Only use first 4 projects
  const displayProjects = projects.slice(0, 4);

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-20 bg-black overflow-hidden"
    >
      {/* Section Header - Mobile */}
      <div className="md:hidden text-center mb-8 px-6">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-2">
          Selected Works
        </p>
        <h2 className="text-2xl font-display font-bold text-white">
          Our Portfolio
        </h2>
      </div>

      {/* Mobile: Vertical grid layout */}
      <div className="md:hidden px-6 grid grid-cols-2 gap-4">
        {displayProjects.map((project, index) => (
          <MobileCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Desktop: Scattered absolute positioning */}
      <div className="hidden md:block relative w-full max-w-5xl mx-auto h-[70vh] min-h-[550px]">
        {displayProjects.map((project, index) => (
          <DesktopCard
            key={project.id}
            project={project}
            position={CARD_POSITIONS[index]}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* View Portfolio CTA */}
      <motion.div
        className="flex justify-center mt-8 md:mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/works"
          className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-xs font-mono tracking-[0.35em] uppercase">
            View Portfolio
          </span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
