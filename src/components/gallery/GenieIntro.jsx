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

  // Title Animation - less movement on mobile
  const titleY = useTransform(
    scrollProgress,
    [0, 1],
    ["0%", isMobile ? "-30%" : "-50%"],
  );
  const titleScale = useTransform(scrollProgress, [0, 0.5], [1, 0.95]);
  const titleBlur = useTransform(scrollProgress, [0.6, 1], ["0px", "8px"]);

  // Parallax layers for images (much reduced on mobile)
  const yLayer1 = useTransform(
    scrollProgress,
    [0, 1],
    ["0%", isMobile ? "-5%" : "-20%"],
  );
  const yLayer2 = useTransform(
    scrollProgress,
    [0, 1],
    ["0%", isMobile ? "-15%" : "-80%"],
  );
  const yLayer3 = useTransform(
    scrollProgress,
    [0, 1],
    ["0%", isMobile ? "-10%" : "-40%"],
  );

  const subtitleOpacity = useTransform(scrollProgress, [0, 0.2], [1, 0]);

  // Mobile: Large atmospheric images with very low opacity
  const getFloatingStyle = (index) => {
    if (isMobile) {
      // Large, faded images for atmosphere - not competing with title
      const mobilePositions = [
        {
          top: "-5%",
          left: "-10%",
          width: "55vw",
          zIndex: 1,
          y: yLayer2,
          opacity: 0.20,
          rotate: "-8deg",
        },
        {
          top: "5%",
          right: "-15%",
          width: "50vw",
          zIndex: 2,
          y: yLayer3,
          opacity: 0.30,
          rotate: "10deg",
        },
        {
          bottom: "5%",
          right: "-5%",
          width: "45vw",
          zIndex: 3,
          y: yLayer1,
          opacity: 0.40,
          rotate: "-6deg",
        },
        {
          bottom: "10%",
          left: "-8%",
          width: "48vw",
          zIndex: 2,
          y: yLayer2,
          opacity: 0.25,
          rotate: "5deg",
        },
      ];
      return mobilePositions[index % 4] || null;
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
        rotate: "-5deg",
      },
      {
        top: "25%",
        right: "12%",
        width: "30vw",
        zIndex: 2,
        y: yLayer3,
        opacity: 0.6,
        rotate: "4deg",
      },
      {
        bottom: "20%",
        left: "15%",
        width: "20vw",
        zIndex: 3,
        y: yLayer1,
        opacity: 0.6,
        rotate: "-3deg",
      },
      {
        bottom: "30%",
        right: "8%",
        width: "22vw",
        zIndex: 1,
        y: yLayer2,
        opacity: 0.6,
        rotate: "6deg",
      },
      {
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        width: "15vw",
        zIndex: 0,
        opacity: 0.3,
        rotate: "0deg",
      },
    ];
    return positions[index % positions.length] || positions[0];
  };

  // Limit images shown on mobile
  const visibleProjects = isMobile ? projects.slice(0, 4) : projects;

  return (
    <motion.div
      style={{ opacity: containerOpacity }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Parallax Images */}
      {visibleProjects.map((project, index) => {
        const style = getFloatingStyle(index);
        if (!style) return null;

        const { y, opacity: imgOpacity, rotate, ...posStyle } = style;

        return (
          <motion.div
            key={project.id}
            style={{
              ...posStyle,
              y: y,
              rotate: rotate,
              position: "absolute",
              opacity: imgOpacity,
            }}
            className="rounded-xl overflow-hidden shadow-2xl grayscale-[60%]"
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
        className="relative z-20 text-center mix-blend-difference px-6"
      >
        {/* Small label above title - mobile only */}
        {isMobile && (
          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-4"
          >
            B.U.G Works
          </motion.p>
        )}

        <h1
          className="text-[22vw] sm:text-[18vw] md:text-[15vw] leading-[0.85] font-bold text-white tracking-tighter"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          GENIE
          <br />
          <span
            className="text-[20vw] sm:text-[16vw] md:text-[14vw] italic font-light opacity-90"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            WORLD
          </span>
        </h1>

        <motion.p
          style={{ opacity: subtitleOpacity }}
          className="mt-4 sm:mt-6 md:mt-8 text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.5em]"
        >
          {isMobile ? "Swipe to explore" : "Scroll to Explore"}
        </motion.p>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

      {/* Mobile scroll indicator */}
      {isMobile && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
              <motion.div
                className="w-1 h-2 bg-white/40 rounded-full"
                animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
