import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const GlitchLogo = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Parallax Effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(logoRef.current, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Glitch Burst Effect
    const triggerBurst = () => {
      const tl = gsap.timeline();
      tl.to(logoRef.current, {
        skewX: () => Math.random() * 20 - 10,
        scale: () => 1.05 + Math.random() * 0.1,
        filter: "brightness(2) contrast(1.5)",
        duration: 0.1,
        repeat: 3,
        yoyo: true,
      }).set(logoRef.current, { clearProps: "all" });

      // Schedule next burst
      setTimeout(triggerBurst, 3000 + Math.random() * 7000);
    };

    const burstTimeout = setTimeout(triggerBurst, 5000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(burstTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none noise-bg" />

      <div
        ref={logoRef}
        className="relative w-[40vh] sm:w-[50vh] md:w-[70vh] aspect-square opacity-[0.07] md:opacity-[0.1]"
      >
        <div className="glitch-wrapper relative w-full h-full scale-110">
          {/* Base Layer */}
          <div className="glitch-layer glitch-base">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
              <path
                d="M 44 12 Q 40 6, 36 2"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 56 12 Q 60 6, 64 2"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="50" cy="18" r="11" />
              <path d="M 44 30 L 30 42 L 26 60 L 34 80 L 44 84 L 46 56 Z" />
              <path d="M 56 30 L 70 42 L 74 60 L 66 80 L 56 84 L 54 56 Z" />
              <circle cx="50" cy="40" r="3" />
              <circle cx="50" cy="60" r="3" />
              <circle cx="50" cy="78" r="3" />
            </svg>
          </div>

          {/* Glitch Layer 1 (Cyan) */}
          <div className="glitch-layer glitch-cyan">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#3A7CFF]">
              <path
                d="M 44 12 Q 40 6, 36 2"
                stroke="#3A7CFF"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 56 12 Q 60 6, 64 2"
                stroke="#3A7CFF"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="50" cy="18" r="11" />
              <path d="M 44 30 L 30 42 L 26 60 L 34 80 L 44 84 L 46 56 Z" />
              <path d="M 56 30 L 70 42 L 74 60 L 66 80 L 56 84 L 54 56 Z" />
              <circle cx="50" cy="40" r="3" />
              <circle cx="50" cy="60" r="3" />
              <circle cx="50" cy="78" r="3" />
            </svg>
          </div>

          {/* Glitch Layer 2 (Magenta) */}
          <div className="glitch-layer glitch-magenta">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E947F5]">
              <path
                d="M 44 12 Q 40 6, 36 2"
                stroke="#E947F5"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 56 12 Q 60 6, 64 2"
                stroke="#E947F5"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="50" cy="18" r="11" />
              <path d="M 44 30 L 30 42 L 26 60 L 34 80 L 44 84 L 46 56 Z" />
              <path d="M 56 30 L 70 42 L 74 60 L 66 80 L 56 84 L 54 56 Z" />
              <circle cx="50" cy="40" r="3" />
              <circle cx="50" cy="60" r="3" />
              <circle cx="50" cy="78" r="3" />
            </svg>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .glitch-wrapper {
          position: relative;
        }
        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-cyan {
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
          opacity: 0.6;
          mix-blend-mode: screen;
        }
        .glitch-magenta {
          animation: glitch-anim-2 3.5s infinite linear alternate-reverse;
          opacity: 0.6;
          mix-blend-mode: screen;
        }
        
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 30% 0); transform: translate(-3px, -1px); }
          10% { clip-path: inset(60% 0 10% 0); transform: translate(3px, 1px); }
          20% { clip-path: inset(40% 0 50% 0); transform: translate(-5px, 3px); }
          30% { clip-path: inset(80% 0 5% 0); transform: translate(5px, -3px); }
          40% { clip-path: inset(10% 0 80% 0); transform: translate(-1px, 5px); }
          50% { clip-path: inset(50% 0 40% 0); transform: translate(1px, -5px); }
          60% { clip-path: inset(30% 0 20% 0); transform: translate(-3px, 1px); }
          70% { clip-path: inset(70% 0 15% 0); transform: translate(3px, -1px); }
          80% { clip-path: inset(15% 0 75% 0); transform: translate(-2px, 3px); }
          90% { clip-path: inset(45% 0 35% 0); transform: translate(2px, -3px); }
          100% { clip-path: inset(25% 0 65% 0); transform: translate(0, 0); }
        }

        @keyframes glitch-anim-2 {
          0% { clip-path: inset(15% 0 85% 0); transform: translate(3px, 1px); }
          10% { clip-path: inset(45% 0 35% 0); transform: translate(-3px, -1px); }
          20% { clip-path: inset(25% 0 65% 0); transform: translate(5px, -3px); }
          30% { clip-path: inset(75% 0 15% 0); transform: translate(-5px, 3px); }
          40% { clip-path: inset(35% 0 45% 0); transform: translate(1px, -5px); }
          50% { clip-path: inset(65% 0 25% 0); transform: translate(-1px, 5px); }
          60% { clip-path: inset(5% 0 80% 0); transform: translate(3px, -1px); }
          70% { clip-path: inset(80% 0 5% 0); transform: translate(-3px, 1px); }
          80% { clip-path: inset(50% 0 40% 0); transform: translate(2px, -3px); }
          90% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 3px); }
          100% { clip-path: inset(30% 0 20% 0); transform: translate(0, 0); }
        }
      `,
        }}
      />
    </div>
  );
};

export default GlitchLogo;
