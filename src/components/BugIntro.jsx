import { useEffect, useRef } from "react";
import gsap from "gsap";
import BugLogo from "../assets/bug_logo_white.svg?react";

const BugIntro = () => {
    const wrapperRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        // fallback selector if .part doesn't exist
        const parts =
            document.querySelectorAll(".bug-svg .part").length > 0
                ? ".bug-svg .part"
                : ".bug-svg path";

        const tl = gsap.timeline({
            defaults: { ease: "power2.out" }
        });

        // Initial states
        gsap.set(parts, {
            opacity: 0,
            filter: "blur(6px)",
        });

        gsap.set(".brand-title, .brand-tagline", {
            opacity: 0,
            y: 18,
            filter: "blur(4px)",
        });

        gsap.set(logoRef.current, {
            scale: 0.95
        });

        /* -------------------------
           SVG REVEAL
        ------------------------- */
        tl.to(parts, {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.15,
            duration: 0.8
        })

            /* -------------------------
               SOFT SHIMMER
            ------------------------- */
            .to(parts, {
                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.45))",
                stagger: 0.1,
                duration: 0.4
            })
            .to(parts, {
                filter: "drop-shadow(0 0 0 rgba(255,255,255,0))",
                duration: 0.4
            })

            /* -------------------------
               TEXT REVEAL
            ------------------------- */
            .to(
                ".brand-title",
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.8
                },
                "-=0.4"
            )
            .to(
                ".brand-tagline",
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.8
                },
                "-=0.6"
            )

            /* -------------------------
               CENTER SETTLE (IMPORTANT)
            ------------------------- */
            .to(logoRef.current, {
                scale: 1,
                duration: 0.6,
                ease: "power3.out"
            })

            /* -------------------------
               DIAGONAL EXIT (LIKE BEFORE)
            ------------------------- */
            .to(logoRef.current, {
                x: "-28vw",
                y: "-28vh",
                duration: 1.4,
                ease: "power3.inOut"
            })

            /* -------------------------
               OPTIONAL: FADE INTRO
            ------------------------- */
            .to(wrapperRef.current, {
                opacity: 0,
                duration: 0.6,
                pointerEvents: "none"
            });
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black overflow-hidden"
        >
            <div
                ref={logoRef}
                className="flex flex-col items-center text-center max-w-[90vw] max-h-[90vh]"
            >
                {/* Logo */}
                <BugLogo className="bug-svg w-[300px] h-[300px] min-w-[200px] max-w-[80vw] object-contain" />

                {/* Title */}
                <h1 className="brand-title mt-5 mb-2 text-white text-[2.5rem] font-bold tracking-[2px]">
                    BUG
                </h1>

                {/* Tagline */}
                <p className="brand-tagline text-gray-400 text-sm tracking-[4px]">
                    BUILD YOUR GENIE
                </p>
            </div>
        </div>
    );
};

export default BugIntro;
