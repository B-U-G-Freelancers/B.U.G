// src/components/ui/BugIntro.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import BugLogo from "../../assets/brand_logo_white.svg?react";
import "./BugIntro.css";

const BugIntro = ({ onComplete }) => {
  const wrapperRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        onComplete?.();
      },
    });

    // Initial states (soft + blurred)
    gsap.set(".bug-svg .part", {
      opacity: 0,
      filter: "blur(6px)",
    });

    gsap.set(".brand-title, .brand-tagline", {
      opacity: 0,
      y: 18,
      filter: "blur(4px)",
    });

    /* -------------------------
       SVG SMOOTH REVEAL
    ------------------------- */
    tl.to(".bug-svg .part", {
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.15,
      duration: 0.8,
    })

      /* -------------------------
         SOFT SHIMMER (SUBTLE)
      ------------------------- */
      .to(".bug-svg .part", {
        filter: "drop-shadow(0 0 10px rgba(255,255,255,0.4))",
        stagger: 0.1,
        duration: 0.4,
      })
      .to(".bug-svg .part", {
        filter: "drop-shadow(0 0 0 rgba(255,255,255,0))",
        duration: 0.4,
      })

      /* -------------------------
         TEXT SMOOTH REVEAL
      ------------------------- */
      .to(
        ".brand-title",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
        },
        "-=0.4"
      )

      .to(
        ".brand-tagline",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
        },
        "-=0.6"
      )

      /* -------------------------
         HOLD FOR A MOMENT
      ------------------------- */
      .to({}, { duration: 0.5 })

      /* -------------------------
         DIAGONAL GLIDE TO HEADER
      ------------------------- */
      .to(logoRef.current, {
        x: () => {
          // Calculate position to align with header
          const headerLogoX = 32 + 20; // padding + half logo width
          const currentX = window.innerWidth / 2;
          return headerLogoX - currentX;
        },
        y: () => {
          const headerLogoY = 20 + 20; // padding + half logo height
          const currentY = window.innerHeight / 2;
          return headerLogoY - currentY;
        },
        scale: 0.12,
        duration: 1.2,
        ease: "power3.inOut",
      })

      /* -------------------------
         FADE OUT TEXT
      ------------------------- */
      .to(
        ".brand-title, .brand-tagline",
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "power3.in",
        },
        "-=1"
      )

      /* -------------------------
         FADE OUT WRAPPER
      ------------------------- */
      .to(wrapperRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="intro-wrapper" ref={wrapperRef}>
      <div className="logo-box" ref={logoRef}>
        <BugLogo className="bug-svg" />
        <h1 className="brand-title">BUG</h1>
        <p className="brand-tagline">Build Your Genie</p>
      </div>
    </div>
  );
};

export default BugIntro;
