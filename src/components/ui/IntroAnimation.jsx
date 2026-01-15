// src/components/ui/IntroAnimation.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logoWhite from "../../assets/bug_logo_white.svg";

export default function IntroAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const taglineRef = useRef(null);
  const shimmerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });

    // Initial state
    gsap.set([logoRef.current, textRef.current, taglineRef.current], {
      opacity: 0,
      scale: 0.9,
      y: 20
    });

    // Shimmer initial position
    gsap.set(shimmerRef.current, {
      xPercent: -150,
      rotate: 20
    });

    // Entrance animation
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        textRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        taglineRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )

      // Shimmer Effect Pass
      .to(shimmerRef.current, {
        xPercent: 150,
        duration: 1.2,
        ease: "power2.inOut",
      }, "-=1.0") // Overlap with entrance

      // Hold
      .to({}, { duration: 0.5 })

      // Exit - Diagonal Movement (Left-Up) then Fade
      // We move the logo towards the header position, then fade everything out
      .to([logoRef.current], {
        x: -window.innerWidth / 3, // Move left
        y: -window.innerHeight / 3, // Move up
        scale: 0.5,
        rotation: -10,
        opacity: 0, // Fade out during movement
        duration: 1.2,
        ease: "power3.in",
      })
      .to([textRef.current, taglineRef.current], {
        x: -50,
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in"
      }, "<") // Start with logo movement

      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.5"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary overflow-hidden"
    >
      {/* Content wrapper with shimmer mask */}
      <div className="relative flex flex-col items-center justify-center p-10">

        {/* Shimmer Overlay */}
        <div
          ref={shimmerRef}
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full blur-md"
        ></div>

        {/* Logo */}
        <div
          ref={logoRef}
          className="flex flex-col items-center justify-center mb-8 relative z-0"
        >
          <img src={logoWhite} alt="BUG Logo" className="size-24" />
        </div>

        {/* Company Name */}
        <h1
          ref={textRef}
          className="font-display text-6xl sm:text-8xl font-black tracking-tighter text-white relative z-0"
        >
          BUG
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-4 text-lg sm:text-xl font-medium text-text-secondary uppercase tracking-[0.3em] relative z-0"
        >
          Build Your Genie
        </p>
      </div>
    </div>
  );
}
