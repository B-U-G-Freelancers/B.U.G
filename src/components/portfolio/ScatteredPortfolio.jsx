// src/components/portfolio/ScatteredPortfolio.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProjects } from "../../context/ProjectContext";

// 4 cards positioned to match reference - centered clustered layout
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

function PortfolioCard({ project, position, scrollProgress }) {
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
      className="absolute"
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
      <Link to={`/works/${project.id}`} className="block group">
        <motion.div
          className="relative overflow-hidden rounded-lg cursor-pointer"
          whileHover={{
            scale: 1.05,
            rotate: position.rotation * 1.5,
            zIndex: 50,
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
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />

          {/* Title on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-semibold text-base">
              {project.title}
            </h3>
            <p className="text-white/60 text-xs mt-0.5">{project.category}</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
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
      className="relative py-20 bg-black overflow-hidden"
    >
      {/* Cards container */}
      <div className="relative w-full max-w-5xl mx-auto h-[70vh] min-h-[550px]">
        {displayProjects.map((project, index) => (
          <PortfolioCard
            key={project.id}
            project={project}
            position={CARD_POSITIONS[index]}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* View Portfolio CTA */}
      <motion.div
        className="flex justify-center mt-8"
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
