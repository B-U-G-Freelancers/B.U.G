// src/components/ui/FloatingElement.jsx
// Premium floating motion system - subtle, anchored drift with micro-rotation
// Inspired by high-end studio websites, adapted for BUG freelancers brand
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

// Floating intensity presets
export const FLOAT_PRESETS = {
  // Hero text: extremely subtle, barely noticeable
  hero: {
    yDrift: 8,
    xDrift: 4,
    rotation: 0.3,
    duration: { min: 10, max: 14 },
    parallaxStrength: 0., // Cursor-responsive
  },
  // Project cards: slow drift + micro-rotation
  card: {
    yDrift: 15,
    xDrift: 8,
    rotation: 0.5,
    duration: { min: 7, max: 11 },
    parallaxStrength: 0.25, // More responsive to cursor
  },
  // Background fragments: slower, deeper
  background: {
    yDrift: 20,
    xDrift: 12,
    rotation: 0.4,
    duration: { min: 12, max: 18 },
    parallaxStrength: 0.4, // Strong cursor parallax for depth
  },
  // UI elements: minimal movement (heavier gravity = importance)
  ui: {
    yDrift: 4,
    xDrift: 2,
    rotation: 0.15,
    duration: { min: 14, max: 20 },
    parallaxStrength: 0.08,
  },
  // No floating for CTAs
  static: {
    yDrift: 0,
    xDrift: 0,
    rotation: 0,
    duration: { min: 0, max: 0 },
    parallaxStrength: 0,
  },
};

// Generate unique random value within range using index as seed
function seededRandom(seed, min, max) {
  const x = Math.sin(seed * 9999) * 10000;
  const rand = x - Math.floor(x);
  return min + rand * (max - min);
}

export default function FloatingElement({
  children,
  preset = "card",
  index = 0,
  className = "",
  style = {},
  depth = 1, // 0 = background, 1 = midground, 2 = foreground
  enableParallax = true,
  reduceOnHover = true,
}) {
  const elementRef = useRef(null);
  const floatTweenRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  // Get preset config
  const config = FLOAT_PRESETS[preset] || FLOAT_PRESETS.card;
  const isStatic = preset === "static";

  // Generate unique values for this element
  const uniqueSeed = index + 1;
  const duration = seededRandom(
    uniqueSeed,
    config.duration.min,
    config.duration.max
  );
  const delay = seededRandom(uniqueSeed * 2, 0, 3);
  const yDirection = uniqueSeed % 2 === 0 ? 1 : -1;
  const xDirection = uniqueSeed % 3 === 0 ? 1 : -1;
  const rotDirection = uniqueSeed % 4 >= 2 ? 1 : -1;

  // Calculate depth-adjusted values
  const depthMultiplier = 0.6 + depth * 0.2;
  const yDrift = config.yDrift * depthMultiplier;
  const xDrift = config.xDrift * depthMultiplier;
  const rotation = config.rotation * depthMultiplier;

  // Setup floating animation
  useEffect(() => {
    if (isStatic || !elementRef.current) return;

    // Create breathing/floating animation
    floatTweenRef.current = gsap.to(elementRef.current, {
      y: yDrift * yDirection,
      x: xDrift * xDirection,
      rotation: rotation * rotDirection,
      duration: duration,
      delay: delay,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      if (floatTweenRef.current) {
        floatTweenRef.current.kill();
      }
    };
  }, [
    isStatic,
    duration,
    delay,
    yDrift,
    xDrift,
    rotation,
    yDirection,
    xDirection,
    rotDirection,
  ]);

  // Handle hover - stabilize/reduce motion
  useEffect(() => {
    if (isStatic || !floatTweenRef.current || !reduceOnHover) return;

    if (isHovered) {
      // Smoothly reduce motion amplitude
      gsap.to(floatTweenRef.current, {
        timeScale: 0.3,
        duration: 0.8,
        ease: "power2.out",
      });
    } else {
      // Restore normal speed
      gsap.to(floatTweenRef.current, {
        timeScale: 1,
        duration: 1.2,
        ease: "power2.inOut",
      });
    }
  }, [isStatic, isHovered, reduceOnHover]);

  // Mouse parallax effect - elements move with cursor
  useEffect(() => {
    if (isStatic || !enableParallax || !elementRef.current) return;

    const handleMouseMove = (e) => {
      // Calculate normalized mouse position (-1 to 1)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mousePos.current = {
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      };

      // Apply parallax with delay and easing - stronger movement with cursor
      const parallaxStrength = config.parallaxStrength * (1 + depth * 0.5);
      const moveX = mousePos.current.x * 50 * parallaxStrength;
      const moveY = mousePos.current.y * 35 * parallaxStrength;

      gsap.to(elementRef.current, {
        "--parallax-x": moveX,
        "--parallax-y": moveY,
        duration: 0.8, // Faster response to cursor
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isStatic, enableParallax, config.parallaxStrength, depth]);

  // Static elements have no animation
  if (isStatic) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        willChange: "transform",
        transform:
          "translate3d(calc(var(--parallax-x, 0) * 1px), calc(var(--parallax-y, 0) * 1px), 0)",
        "--parallax-x": 0,
        "--parallax-y": 0,
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}

// Floating background fragments for atmospheric depth
export function FloatingFragments({ count = 8 }) {
  const fragments = Array.from({ length: count }, (_, i) => {
    const seed = i + 1;
    const size = seededRandom(seed, 4, 16);
    const top = seededRandom(seed * 2, 10, 90);
    const left = seededRandom(seed * 3, 5, 95);
    const opacity = seededRandom(seed * 4, 0.03, 0.08);
    const depth = Math.floor(seededRandom(seed * 5, 0, 3));

    return {
      id: i,
      size,
      top,
      left,
      opacity,
      depth,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {fragments.map((fragment) => (
        <FloatingElement
          key={fragment.id}
          preset="background"
          index={fragment.id}
          depth={fragment.depth}
          enableParallax={true}
          reduceOnHover={false}
          className="absolute"
          style={{
            top: `${fragment.top}%`,
            left: `${fragment.left}%`,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: fragment.size,
              height: fragment.size,
              backgroundColor: `rgba(58, 124, 255, ${fragment.opacity})`,
              filter: `blur(${fragment.size / 4}px)`,
            }}
          />
        </FloatingElement>
      ))}
    </div>
  );
}

// Floating geometric shapes for premium feel
export function FloatingGeometry({ variant = "ring" }) {
  const geometries = {
    ring: (
      <div
        className="w-32 h-32 rounded-full border border-white/5"
        style={{ borderWidth: "1px" }}
      />
    ),
    arc: (
      <svg
        width="80"
        height="40"
        viewBox="0 0 80 40"
        className="opacity-[0.04]"
      >
        <path
          d="M 0 40 Q 40 0 80 40"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    ),
    dot: <div className="w-2 h-2 rounded-full bg-white/5" />,
    cross: (
      <div className="relative w-8 h-8">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-white/5 -translate-x-1/2" />
      </div>
    ),
  };

  return geometries[variant] || geometries.dot;
}
