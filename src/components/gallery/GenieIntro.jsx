import { motion, useTransform } from "motion/react";
import { useState, useEffect } from "react";

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

export default function GenieIntro({ scrollProgress, projects = [] }) {
  const isMobile = useIsMobile();

  // Transformations based on scroll progress (0 to 1)
  const containerOpacity = useTransform(scrollProgress, [0.8, 1], [1, 0]);

  // Title Animation
  const titleY = useTransform(scrollProgress, [0, 1], ["0%", "-50%"]);
  const titleScale = useTransform(scrollProgress, [0, 0.5], [1, 0.9]);
  const titleBlur = useTransform(scrollProgress, [0.6, 1], ["0px", "10px"]);

  // Parallax layers for images (reduced on mobile)
  const yLayer1 = useTransform(
    scrollProgress,
    [0, 1],
    ["0%", isMobile ? "-10%" : "-20%"],
  );
  const yLayer2 = useTransform(
    scrollProgress,
    [0, 1],
    ["0%", isMobile ? "-30%" : "-80%"],
  );
  const yLayer3 = useTransform(
    scrollProgress,
    [0, 1],
    ["0%", isMobile ? "-20%" : "-40%"],
  );

  const subtitleOpacity = useTransform(scrollProgress, [0, 0.2], [1, 0]);

  // Responsive floating positions
  const getFloatingStyle = (index) => {
    if (isMobile) {
      // Simpler layout for mobile - only show 2-3 images
      const mobilePositions = [
        {
          top: "10%",
          left: "5%",
          width: "35vw",
          zIndex: 1,
          y: yLayer2,
          opacity: 0.3,
        },
        {
          top: "15%",
          right: "5%",
          width: "30vw",
          zIndex: 2,
          y: yLayer3,
          opacity: 0.3,
        },
        {
          bottom: "25%",
          left: "8%",
          width: "25vw",
          zIndex: 3,
          y: yLayer1,
          opacity: 0.25,
        },
      ];
      return mobilePositions[index % 3] || null;
    }

    // Desktop positions
    const positions = [
      {
        top: "15%",
        left: "10%",
        width: "25vw",
        zIndex: 1,
        y: yLayer2,
        opacity: 0.6,
      },
      {
        top: "25%",
        right: "12%",
        width: "30vw",
        zIndex: 2,
        y: yLayer3,
        opacity: 0.6,
      },
      {
        bottom: "20%",
        left: "15%",
        width: "20vw",
        zIndex: 3,
        y: yLayer1,
        opacity: 0.6,
      },
      {
        bottom: "30%",
        right: "8%",
        width: "22vw",
        zIndex: 1,
        y: yLayer2,
        opacity: 0.6,
      },
      {
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        width: "15vw",
        zIndex: 0,
        opacity: 0.3,
      },
    ];
    return positions[index % positions.length] || positions[0];
  };

  // Limit images shown on mobile
  const visibleProjects = isMobile ? projects.slice(0, 3) : projects;

  return (
    <motion.div
      style={{ opacity: containerOpacity }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Parallax Images */}
      {visibleProjects.map((project, index) => {
        const style = getFloatingStyle(index);
        if (!style) return null;

        const { y, opacity: imgOpacity, ...posStyle } = style;

        return (
          <motion.div
            key={project.id}
            style={{
              ...posStyle,
              y: y,
              position: "absolute",
              opacity: imgOpacity,
            }}
            className="rounded-lg overflow-hidden shadow-2xl grayscale-[50%]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        );
      })}

      {/* Main Title */}
      <motion.div
        style={{
          y: titleY,
          scale: titleScale,
          filter: titleBlur,
        }}
        className="relative z-20 text-center mix-blend-difference px-4"
      >
        <h1
          className="text-[18vw] sm:text-[15vw] leading-[0.8] font-bold text-white tracking-tighter"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          GENIE
          <br />
          <span
            className="text-[16vw] sm:text-[14vw] italic font-light opacity-90"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            WORLD
          </span>
        </h1>

        <motion.p
          style={{ opacity: subtitleOpacity }}
          className="mt-6 sm:mt-8 text-white/50 text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em]"
        >
          {isMobile ? "Scroll to Explore" : "Scroll to Explore"}
        </motion.p>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />

      {/* Mobile scroll indicator */}
      {isMobile && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
