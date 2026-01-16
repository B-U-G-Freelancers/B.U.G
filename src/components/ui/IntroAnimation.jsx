import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function IntroAnimation({ onComplete }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const subTextRef = useRef(null);
    const progressRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            },
        });

        // Initial state
        gsap.set(containerRef.current, { autoAlpha: 1 });
        gsap.set(textRef.current, { autoAlpha: 0, scale: 0.9, filter: "blur(10px)" });
        gsap.set(subTextRef.current, { autoAlpha: 0 });
        gsap.set(progressRef.current, { scaleX: 0 });
        gsap.set(barRef.current, { autoAlpha: 0 });

        // Animation sequence
        tl.to(textRef.current, {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
        })
            .to(subTextRef.current, {
                autoAlpha: 1,
                duration: 0.5,
                repeat: 3,
                yoyo: true, // Blink effect
                ease: "steps(1)",
            }, "-=0.5")
            .to(barRef.current, {
                autoAlpha: 1,
                duration: 0.3
            })
            .to(progressRef.current, {
                scaleX: 1,
                duration: 1.5,
                ease: "expo.inOut",
            })
            .to([textRef.current, subTextRef.current, barRef.current], {
                autoAlpha: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.in"
            })
            .to(containerRef.current, {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                duration: 0.8,
                ease: "power4.inOut"
            });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
                <h1 ref={textRef} className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-mono">
                    B.U.G
                </h1>
                <p ref={subTextRef} className="mt-4 text-[#00f6ff] font-mono text-sm tracking-[0.3em] uppercase">
                    System Initialization Sequence...
                </p>

                {/* Loader Bar */}
                <div ref={barRef} className="w-64 h-1 bg-gray-900 mt-8 relative overflow-hidden">
                    <div ref={progressRef} className="h-full bg-[#0066ff] origin-left w-full shadow-[0_0_10px_#0066ff]"></div>
                </div>
            </div>
        </div>
    );
}
