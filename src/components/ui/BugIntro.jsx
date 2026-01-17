// src/components/ui/BugIntro.jsx
// Performance-optimized intro animation
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import BugLogo from "../../assets/brand_logo_white.svg?react";
import "./BugIntro.css";

const BugIntro = ({ onComplete }) => {
  const wrapperRef = useRef(null);
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    // Use a single context for better cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
          // Force GPU acceleration
          // Removed force3D: true - not needed with modern GSAP
        },
        onComplete: () => {
          onComplete?.();
        },
      });

      // Initial states - use transforms instead of filters for better performance
      gsap.set(".bug-svg .part", {
        opacity: 0,
        scale: 0.95,
        y: 10,
      });

      gsap.set(".brand-title, .brand-tagline", {
        opacity: 0,
        y: 18,
      });

      /* -------------------------
         SVG SMOOTH REVEAL
      ------------------------- */
      tl.to(".bug-svg .part", {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.6,
      })

        /* -------------------------
           SUBTLE GLOW EFFECT (uses opacity instead of filter)
        ------------------------- */
        .to(".bug-svg", {
          "--glow-intensity": 1,
          duration: 0.3,
        })
        .to(".bug-svg", {
          "--glow-intensity": 0,
          duration: 0.3,
        })

        /* -------------------------
           TEXT SMOOTH REVEAL
        ------------------------- */
        .to(
          ".brand-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.3"
        )

        .to(
          ".brand-tagline",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4"
        )

        /* -------------------------
           BRIEF HOLD
        ------------------------- */
        .to({}, { duration: 0.3 })

        /* -------------------------
           DIAGONAL GLIDE TO HEADER
        ------------------------- */
        .to(logoRef.current, {
          x: () => {
            const headerLogoX = 32 + 20;
            const currentX = window.innerWidth / 2;
            return headerLogoX - currentX;
          },
          y: () => {
            const headerLogoY = 20 + 20;
            const currentY = window.innerHeight / 2;
            return headerLogoY - currentY;
          },
          scale: 0.12,
          duration: 0.9,
          ease: "power3.inOut",
        })

        /* -------------------------
           FADE OUT TEXT
        ------------------------- */
        .to(
          ".brand-title, .brand-tagline",
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            ease: "power3.in",
          },
          "-=0.7"
        )

        /* -------------------------
           FADE OUT WRAPPER
        ------------------------- */
        .to(wrapperRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
    }, wrapperRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      className="intro-wrapper"
      ref={wrapperRef}
      style={{ willChange: "opacity" }}
    >
      <div
        className="logo-box"
        ref={logoRef}
        style={{ willChange: "transform" }}
      >
        <BugLogo className="bug-svg" />
        <h1 className="brand-title">BUG</h1>
        <p className="brand-tagline">Build Your Genie</p>
      </div>
    </div>
  );
};

export default BugIntro;
