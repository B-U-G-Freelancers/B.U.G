// src/components/ui/IntroAnimation.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logoWhite from "../../assets/bug_logo_white.svg";

export default function IntroAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const taglineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });

    // Initial state - logo and text are centered and large
    gsap.set([logoRef.current, textRef.current, taglineRef.current], {
      opacity: 0,
      scale: 0.8,
    });

    // Entrance animation
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        textRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        taglineRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3"
      )

      // Hold for a moment
      .to({}, { duration: 1 })

      // Exit animation - shrink and move to header
      .to(logoRef.current, {
        scale: 0.25,
        x: () => {
          const headerX = 40; // Approximate header logo position
          const currentX = window.innerWidth / 2;
          return headerX - currentX + 16;
        },
        y: () => {
          const headerY = 28; // Approximate header logo position
          const currentY = window.innerHeight / 2;
          return headerY - currentY - 40;
        },
        duration: 1,
        ease: "power3.inOut",
      })
      .to(
        [textRef.current, taglineRef.current],
        {
          opacity: 0,
          scale: 0.5,
          y: -50,
          duration: 0.6,
          ease: "power3.in",
        },
        "-=0.8"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary"
    >
      {/* Logo */}
      <div
        ref={logoRef}
        className="flex size-32 items-center justify-center rounded-2xl bg-text-primary mb-8"
      >
        <img src={logoWhite} alt="BUG Logo" className="size-20 invert" />
      </div>

      {/* Company Name */}
      <h1
        ref={textRef}
        className="font-display text-6xl sm:text-8xl font-black tracking-tighter text-text-primary"
      >
        BUG
      </h1>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="mt-4 text-lg sm:text-xl font-medium text-text-secondary uppercase tracking-[0.3em]"
      >
        Build Your Genie
      </p>
    </div>
  );
}
