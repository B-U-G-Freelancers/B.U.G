// src/components/ui/ParallaxSection.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * ParallaxSection - Adds scroll-driven parallax effect to children
 *
 * @param {number} speed - Parallax intensity (0 = no effect, 1 = full effect, negative = reverse)
 * @param {string} direction - "up" or "down" (direction of parallax movement)
 * @param {number} scale - Optional scale effect on scroll (1 = no scale)
 * @param {number} opacity - If true, fades content based on scroll position
 */
export default function ParallaxSection({
  children,
  speed = 0.5,
  direction = "up",
  scale = 1,
  fadeOut = false,
  className = "",
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax Y movement (adjust range based on speed)
  const yRange =
    direction === "up"
      ? [100 * speed, -100 * speed]
      : [-100 * speed, 100 * speed];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  // Optional scale effect
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scale > 1 ? 1 : scale, scale, scale > 1 ? 1 : scale]
  );

  // Optional fade effect
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fadeOut ? [0, 1, 1, 0] : [1, 1, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, scale: scaleValue, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxLayer - For layered parallax effects within a section
 * Creates depth by moving elements at different speeds
 */
export function ParallaxLayer({ children, speed = 0.3, className = "" }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * ParallaxImage - Parallax effect specifically for background images
 * The image moves slower than scroll, creating depth
 */
export function ParallaxImage({ src, alt = "", speed = 0.5, className = "" }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30 * speed, 30 * speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[120%] object-cover"
      />
    </div>
  );
}
