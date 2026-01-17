import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

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

// Individual Tilted Card Component
function TiltedCard({
  imageSrc,
  title,
  category,
  onClick,
  imageHeight = "400px",
  imageWidth = "320px",
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  isActive = false,
  floatDelay = 0,
  isMobile = false,
}) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(isActive ? 1 : 0.85, springValues);

  useEffect(() => {
    scale.set(isActive ? 1 : 0.85);
  }, [isActive, scale]);

  function handleMouse(e) {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    if (isMobile) return;
    if (!isActive) scale.set(0.9);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    scale.set(isActive ? 1 : 0.85);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.figure
      ref={ref}
      className="relative shrink-0 cursor-pointer"
      style={{
        width: imageWidth,
        height: imageHeight,
        perspective: isMobile ? "none" : "1000px",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      animate={{
        y: isActive && !isMobile ? [0, -10, 0] : 0,
        filter: isActive ? "brightness(1)" : "brightness(0.5)",
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
        filter: { duration: 0.4 },
      }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          scale,
          transformStyle: isMobile ? "flat" : "preserve-3d",
          boxShadow: isActive
            ? "0 40px 80px -20px rgba(0, 0, 0, 0.8), 0 0 60px rgba(59, 130, 246, 0.2)"
            : "0 20px 40px -20px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Card Image */}
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Card Content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 sm:p-6"
          animate={{ opacity: isActive ? 1 : 0.4 }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-blue-400 mb-1 sm:mb-2 block">
            {category}
          </span>
          <h3
            className="text-lg sm:text-2xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </h3>
        </motion.div>

        {/* Active Glow Border */}
        {isActive && (
          <div className="absolute inset-0 rounded-2xl border-2 border-blue-500/30 pointer-events-none" />
        )}
      </motion.div>
    </motion.figure>
  );
}

// Main Gallery Component
export default function TiltedCardGallery({
  items = [],
  onItemClick,
  cardWidth = 340,
  cardHeight = 440,
  gap = 60,
  scrollProgress,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  // Responsive card dimensions
  const responsiveCardWidth = isMobile ? 280 : cardWidth;
  const responsiveCardHeight = isMobile ? 360 : cardHeight;
  const responsiveGap = isMobile ? 24 : gap;

  // Touch swipe handling for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && activeIndex < items.length - 1) {
        // Swipe left - next
        setActiveIndex((prev) => prev + 1);
      } else if (diff < 0 && activeIndex > 0) {
        // Swipe right - previous
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  // Subscribe to scroll progress changes (desktop)
  useEffect(() => {
    if (isMobile || !scrollProgress?.on) return;

    const unsubscribe = scrollProgress.on("change", (value) => {
      const clampedValue = Math.max(0, Math.min(1, value));
      const newIndex = Math.min(
        Math.floor(clampedValue * items.length),
        items.length - 1,
      );
      setActiveIndex(Math.max(0, newIndex));
    });

    return unsubscribe;
  }, [scrollProgress, items.length, isMobile]);

  // Calculate horizontal position
  const getTransformX = () => {
    const cardTotalWidth = responsiveCardWidth + responsiveGap;
    return `calc(50vw - ${responsiveCardWidth / 2}px - ${activeIndex * cardTotalWidth}px)`;
  };

  return (
    <div
      className="relative w-full h-full flex items-center overflow-hidden bg-black"
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      {/* Cards Container */}
      <motion.div
        className="flex items-center"
        style={{ gap: `${responsiveGap}px` }}
        animate={{ x: getTransformX() }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {items.map((item, index) => (
          <div key={item.id || index} className="shrink-0">
            <TiltedCard
              imageSrc={item.image}
              title={item.title}
              category={item.category}
              onClick={() => onItemClick?.(item)}
              imageWidth={`${responsiveCardWidth}px`}
              imageHeight={`${responsiveCardHeight}px`}
              isActive={index === activeIndex}
              floatDelay={index * 0.15}
              isMobile={isMobile}
            />
          </div>
        ))}
      </motion.div>

      {/* Progress Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="rounded-full"
            animate={{
              width: index === activeIndex ? 24 : 8,
              height: 8,
              backgroundColor:
                index === activeIndex ? "#3b82f6" : "rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Instructions - different for mobile */}
      <motion.div
        className="absolute bottom-14 sm:bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-xs sm:text-sm tracking-wide text-center"
        animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
      >
        {isMobile ? "Swipe to browse" : "Scroll to browse projects"}
      </motion.div>

      {/* Project Counter */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-white/50 text-xs sm:text-sm font-mono">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(items.length).padStart(2, "0")}
      </div>

      {/* Tap Hint - Mobile Only */}
      {isMobile && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[200px] text-white/30 text-xs tracking-widest uppercase"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap to view
        </motion.div>
      )}
    </div>
  );
}
