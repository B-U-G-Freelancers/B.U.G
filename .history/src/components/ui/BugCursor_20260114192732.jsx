// src/components/ui/BugCursor.jsx
// Custom organic bug cursor with smooth interpolation and speed-reactive wings
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BugCursor() {
  const cursorRef = useRef(null);
  const leftWingRef = useRef(null);
  const rightWingRef = useRef(null);
  const bodyRef = useRef(null);

  // Position tracking
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on mobile/touch devices
    if ("ontouchstart" in window) return;

    const cursor = cursorRef.current;
    const leftWing = leftWingRef.current;
    const rightWing = rightWingRef.current;
    const body = bodyRef.current;

    if (!cursor || !leftWing || !rightWing || !body) return;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Calculate velocity for wing reaction
      velocity.current = {
        x: e.clientX - lastMousePos.current.x,
        y: e.clientY - lastMousePos.current.y,
      };
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);
    };

    // Hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer") ||
        getComputedStyle(target).cursor === "pointer";

      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Animation loop - smooth interpolation
    let animationId;
    const animate = () => {
      // Smooth cursor following with lerp
      const ease = 0.15;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease;

      // Calculate speed
      const speed = Math.sqrt(
        velocity.current.x ** 2 + velocity.current.y ** 2
      );
      const normalizedSpeed = Math.min(speed / 30, 1); // 0-1

      // Calculate rotation based on movement direction
      const angle =
        Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);

      // Apply cursor position
      gsap.set(cursor, {
        x: cursorPos.current.x,
        y: cursorPos.current.y,
        rotate: speed > 2 ? angle + 90 : 0, // Point in direction of movement
      });

      // Wing animation based on speed
      const wingSpread = isHovering ? 15 : 25 + normalizedSpeed * 35; // More spread when fast
      const wingOscillation =
        Math.sin(Date.now() / (100 - normalizedSpeed * 50)) *
        (5 + normalizedSpeed * 15);

      gsap.set(leftWing, {
        rotate: -wingSpread + wingOscillation,
        scaleY: isHovering ? 0.8 : 1 + normalizedSpeed * 0.2,
      });

      gsap.set(rightWing, {
        rotate: wingSpread - wingOscillation,
        scaleY: isHovering ? 0.8 : 1 + normalizedSpeed * 0.2,
      });

      // Body morphing on hover
      gsap.to(body, {
        scaleX: isHovering ? 1.2 : 1,
        scaleY: isHovering ? 0.85 : 1,
        duration: 0.2,
      });

      // Decay velocity
      velocity.current.x *= 0.9;
      velocity.current.y *= 0.9;

      animationId = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    // Start animation
    animate();

    // Hide system cursor
    document.body.style.cursor = "none";
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.style.cursor = "none";
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      cancelAnimationFrame(animationId);
      document.body.style.cursor = "";
    };
  }, [isHovering, isVisible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Bug body structure */}
      <div className="relative" style={{ width: 24, height: 32 }}>
        {/* Left Wing */}
        <div
          ref={leftWingRef}
          className="absolute"
          style={{
            top: 8,
            left: -2,
            width: 12,
            height: 18,
            transformOrigin: "right center",
            background: `linear-gradient(135deg, 
              rgba(58, 124, 255, 0.4) 0%, 
              rgba(58, 124, 255, 0.15) 50%,
              rgba(58, 124, 255, 0.05) 100%)`,
            borderRadius: "50% 20% 50% 80%",
            border: "1px solid rgba(58, 124, 255, 0.3)",
            backdropFilter: "blur(2px)",
          }}
        />

        {/* Right Wing */}
        <div
          ref={rightWingRef}
          className="absolute"
          style={{
            top: 8,
            right: -2,
            width: 12,
            height: 18,
            transformOrigin: "left center",
            background: `linear-gradient(-135deg, 
              rgba(58, 124, 255, 0.4) 0%, 
              rgba(58, 124, 255, 0.15) 50%,
              rgba(58, 124, 255, 0.05) 100%)`,
            borderRadius: "20% 50% 80% 50%",
            border: "1px solid rgba(58, 124, 255, 0.3)",
            backdropFilter: "blur(2px)",
          }}
        />

        {/* Main body */}
        <div
          ref={bodyRef}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 4,
            width: 8,
            height: 20,
            background: `linear-gradient(180deg, 
              rgba(58, 124, 255, 0.9) 0%, 
              rgba(58, 124, 255, 0.6) 50%,
              rgba(40, 90, 200, 0.8) 100%)`,
            borderRadius: "40% 40% 50% 50%",
            boxShadow: `
              0 0 8px rgba(58, 124, 255, 0.5),
              0 0 16px rgba(58, 124, 255, 0.3),
              inset 0 -4px 8px rgba(0, 0, 0, 0.2)
            `,
          }}
        />

        {/* Head */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 0,
            width: 6,
            height: 6,
            background: "rgba(58, 124, 255, 0.95)",
            borderRadius: "50%",
            boxShadow: "0 0 6px rgba(58, 124, 255, 0.6)",
          }}
        />

        {/* Antennae */}
        <div
          className="absolute left-1/2"
          style={{
            top: -4,
            width: 1,
            height: 6,
            background: "rgba(58, 124, 255, 0.6)",
            transform: "translateX(-3px) rotate(-20deg)",
            transformOrigin: "bottom",
            borderRadius: 1,
          }}
        />
        <div
          className="absolute left-1/2"
          style={{
            top: -4,
            width: 1,
            height: 6,
            background: "rgba(58, 124, 255, 0.6)",
            transform: "translateX(2px) rotate(20deg)",
            transformOrigin: "bottom",
            borderRadius: 1,
          }}
        />

        {/* Tail/Stinger */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: -2,
            width: 3,
            height: 6,
            background: `linear-gradient(180deg, 
              rgba(58, 124, 255, 0.7) 0%, 
              rgba(58, 124, 255, 0.3) 100%)`,
            borderRadius: "20% 20% 50% 50%",
          }}
        />

        {/* Glow effect when hovering */}
        {isHovering && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(58, 124, 255, 0.2) 0%, transparent 70%)",
              animation: "pulse 1s ease-in-out infinite",
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
