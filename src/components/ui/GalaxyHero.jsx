import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
const Spline = lazy(() => import('@splinetool/react-spline'));

function ParticleOverlay() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 60;

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = 0;
                this.maxOpacity = Math.random() * 0.7 + 0.3;
                this.fadeSpeed = 0.005 + Math.random() * 0.01;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.opacity < this.maxOpacity) {
                    this.opacity += this.fadeSpeed;
                }

                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.reset();
                }
            }
            draw() {
                ctx.fillStyle = `rgba(58, 124, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[5] pointer-events-none opacity-0"
            id="hero-particles"
        />
    );
}

function HeroSplineBackground() {
    const splineContainerRef = useRef(null);

    useEffect(() => {
        const k = ['spline', 'logo', 'design'];
        const o = new MutationObserver((m) => {
            m.forEach((mu) => {
                mu.addedNodes.forEach((n) => {
                    if (n.nodeType === 1) {
                        const a = n.tagName === 'A' ? n : n.querySelector?.('a');
                        if (a && k.some(s => a.href?.toLowerCase().includes(s) || a.id?.toLowerCase().includes(s))) {
                            a.remove();
                        }
                        const b = n.querySelector?.(`[id*="${k[0]}"], [class*="${k[0]}"]`);
                        if (b) b.remove();
                    }
                });
            });
        });

        if (splineContainerRef.current) {
            o.observe(splineContainerRef.current, { childList: true, subtree: true });
        }
        return () => o.disconnect();
    }, []);

    return (
        <div
            ref={splineContainerRef}
            className="relative w-full h-screen overflow-hidden bg-[#040506]"
        >
            <Suspense fallback={<div className="w-full h-full bg-[#040506]" />}>
                <div className="absolute inset-0 w-full h-full">
                    <Spline
                        className="w-full h-full"
                        style={{ width: '100%', height: '100%' }}
                        scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
                    />
                </div>
            </Suspense>

            {/* Subtle Noise for grain texture */}
            <div
                className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px'
                }}
            />

            {/* Interaction flash Layer */}
            <div id="interaction-flash" className="absolute inset-0 bg-white/10 opacity-0 pointer-events-none z-20 mix-blend-overlay" />

            {/* Particles layer */}
            <ParticleOverlay />
        </div>
    );
}

function HeroContent() {
    const headlineRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const delay = 1.0;
        const tl = gsap.timeline({ delay });

        gsap.set(
            [headlineRef.current, subtitleRef.current, ctaRef.current, scrollRef.current],
            { opacity: 0, y: 60, filter: 'blur(10px)' }
        );

        tl.to(headlineRef.current, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: "power4.out",
        })
            .to("#hero-particles", {
                opacity: 0.6,
                duration: 2,
                ease: "power2.inOut"
            }, "-=1")
            .to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                ease: "power3.out",
            }, "-=0.8")
            .to(ctaRef.current, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.6")
            .to(scrollRef.current, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: "elastic.out(1, 0.75)",
            }, "-=0.4");

        gsap.to(scrollRef.current, {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        return () => tl.kill();
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 lg:px-8 text-center relative z-10 w-full pointer-events-none">
            <div className="max-w-5xl relative z-10 pointer-events-none">
                <h1
                    ref={headlineRef}
                    className="font-display text-5xl font-black leading-[1.05] tracking-tighter text-white sm:text-7xl lg:text-9xl drop-shadow-2xl select-none"
                >
                    We build digital <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-gray-400">
                        products that work
                    </span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="mx-auto mt-10 max-w-xl text-lg text-gray-200 sm:text-xl font-light leading-relaxed drop-shadow-lg select-none"
                >
                    Engineering-led design for high-growth companies.{" "}
                    <br className="hidden sm:block" />
                    We turn complexity into clarity.
                </p>

                <div
                    ref={ctaRef}
                    className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row pointer-events-auto"
                >
                    <a
                        href="#contact"
                        className="group relative h-14 overflow-hidden rounded-md bg-[#3A7CFF] px-10 text-base font-bold text-white shadow-[0_0_30px_rgba(58,124,255,0.3)] transition-all hover:bg-[#6FA0FF] hover:shadow-[0_0_40px_rgba(58,124,255,0.5)] flex items-center justify-center"
                    >
                        <span className="relative z-10">Get in touch</span>
                        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
                            <div className="w-[100%] h-full bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 animate-shimmer-slide" style={{ width: '40px' }} />
                        </div>
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-pointer group"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <div className="relative flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-[0.4em] mb-4 font-bold text-white/40 group-hover:text-[#3A7CFF] transition-colors duration-300">
                        Scroll
                    </span>
                    <div className="w-[26px] h-[45px] rounded-full border-2 border-white/10 group-hover:border-[#3A7CFF]/50 transition-colors duration-500 relative flex justify-center p-1 overflow-hidden backdrop-blur-sm bg-white/5">
                        <div className="w-[3px] h-[8px] bg-gradient-to-b from-[#3A7CFF] to-[#E947F5] rounded-full animate-scroll-wheel shadow-[0_0_10px_#3A7CFF]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3A7CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll-wheel {
                    0% { transform: translateY(0); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateY(20px); opacity: 0; }
                }
                @keyframes shimmer-slide {
                    0% { transform: translateX(-300%); }
                    100% { transform: translateX(300%); }
                }
                .animate-shimmer-slide {
                    animation: shimmer-slide 3s infinite linear;
                }
            `}} />
        </div>
    );
}

export const HeroSection = () => {
    const handleInteraction = () => {
        const flash = document.getElementById('interaction-flash');
        if (flash) {
            gsap.fromTo(flash, { opacity: 0.3 }, { opacity: 0, duration: 0.5, ease: 'power2.out' });
        }
    };

    return (
        <div className="relative bg-[#040506] overflow-hidden" onClick={handleInteraction}>
            <div className="relative min-h-screen">
                <div className="absolute inset-0 z-0">
                    <HeroSplineBackground />
                </div>
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <HeroContent />
                </div>
            </div>

            {/* Visual Bridge */}
            <div className="absolute bottom-0 left-0 w-full h-40 z-30 pointer-events-none">
                <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[140%] h-[160px] bg-[#3A7CFF]/15 blur-[100px] rounded-[100%] opacity-40" />
                <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[110%] h-[80px] bg-[#E947F5]/20 blur-[60px] rounded-[100%] opacity-30" />
            </div>
        </div>
    );
};

export default HeroSection;
