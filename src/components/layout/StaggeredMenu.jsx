import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";

export default function StaggeredMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);
    const marqueeRefs = useRef([]);
    const navigate = useNavigate();

    const links = [
        { name: "Services", href: "/", image: "/img/services.jpg" },
        { name: "Works", href: "/", image: "/img/works.jpg" },
        { name: "About", href: "/about", image: "/img/about.jpg" },
        { name: "Contact", href: "/contact", image: "/img/contact.jpg" },
    ];

    /* =========================
       OPEN / CLOSE MENU
    ========================= */
    useEffect(() => {
        if (!overlayRef.current) return;

        if (isOpen) {
            gsap.to(overlayRef.current, {
                clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
                duration: 0.6,
                ease: "power4.inOut",
                pointerEvents: "auto",
            });

            gsap.fromTo(
                linksRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    delay: 0.2,
                    ease: "power3.out",
                }
            );
        } else {
            gsap.to(linksRef.current, {
                y: -40,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "power3.in",
            });

            gsap.to(overlayRef.current, {
                clipPath: "polygon(0 0,100% 0,100% 0,0 0)",
                duration: 0.5,
                ease: "power4.inOut",
                pointerEvents: "none",
            });
        }
    }, [isOpen]);

    /* =========================
       FLOWING MARQUEE HOVER
    ========================= */
    const showMarquee = (index) => {
        gsap.to(marqueeRefs.current[index], {
            y: "0%",
            duration: 0.5,
            ease: "expo.out",
        });

        gsap.to(marqueeRefs.current[index].querySelector(".marquee-inner"), {
            x: "-50%",
            duration: 10,
            ease: "none",
            repeat: -1,
        });
    };

    const hideMarquee = (index) => {
        gsap.to(marqueeRefs.current[index], {
            y: "100%",
            duration: 0.4,
            ease: "expo.in",
        });

        gsap.killTweensOf(
            marqueeRefs.current[index].querySelector(".marquee-inner")
        );
    };

    return (
        <>
            {/* MENU BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-8 right-8 z-[300] flex flex-col gap-2"
            >
                <span
                    className={`h-[2px] bg-[#00f6ff] transition-all ${isOpen ? "w-8 rotate-45 translate-y-2" : "w-10"
                        }`}
                />
                <span
                    className={`h-[2px] bg-[#00f6ff] transition-all ${isOpen ? "opacity-0 w-0" : "w-6"
                        }`}
                />
                <span
                    className={`h-[2px] bg-[#00f6ff] transition-all ${isOpen ? "w-8 -rotate-45 -translate-y-2" : "w-8"
                        }`}
                />
            </button>

            {/* FULLSCREEN MENU */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
                style={{
                    clipPath: "polygon(0 0,100% 0,100% 0,0 0)",
                    pointerEvents: "none",
                }}
            >
                {/* GRID BACKGROUND */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.12)_1px,transparent_1px)] bg-[size:60px_60px]" />

                {/* MENU ITEMS */}
                <div className="relative z-10 w-full max-w-5xl flex flex-col gap-8">
                    {links.map((link, i) => (
                        <div
                            key={link.name}
                            className="relative overflow-hidden"
                            onMouseEnter={() => showMarquee(i)}
                            onMouseLeave={() => hideMarquee(i)}
                        >
                            {/* MAIN LINK */}
                            <Link
                                to={link.href}
                                ref={(el) => (linksRef.current[i] = el)}
                                onClick={() => setIsOpen(false)}
                                className="
                  block text-center
                  text-6xl md:text-8xl font-black uppercase tracking-tighter
                  text-[#e6f0ff] hover:text-[#00f6ff]
                  transition-all duration-300
                  drop-shadow-[0_0_25px_rgba(0,102,255,0.45)]
                "
                            >
                                {link.name}
                            </Link>

                            {/* FLOWING MARQUEE */}
                            <div
                                ref={(el) => (marqueeRefs.current[i] = el)}
                                className="absolute left-0 bottom-0 w-full h-full bg-[#00f6ff] translate-y-full pointer-events-none"
                            >
                                <div className="marquee-inner flex items-center h-full gap-12 px-10 text-black font-bold uppercase text-4xl whitespace-nowrap">
                                    {Array.from({ length: 6 }).map((_, idx) => (
                                        <span key={idx}>{link.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* CTA */}
                    <Link
                        to="/contact"
                        onClick={() => setIsOpen(false)}
                        className="
              mt-14 self-center px-12 py-4
              border border-[#00f6ff]
              text-[#00f6ff]
              font-bold uppercase tracking-widest
              hover:bg-[#00f6ff]
              hover:text-black
              transition-all
              shadow-[0_0_20px_rgba(0,246,255,0.4)]
            "
                    >
                        Initialize Project
                    </Link>
                </div>
            </div>
        </>
    );
}
