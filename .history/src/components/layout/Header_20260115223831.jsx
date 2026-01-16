import { useState, useEffect } from "react";

export default function Menu() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Services", href: "#services" },
        { name: "Works", href: "#works" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${scrolled
                    ? "bg-black/80 backdrop-blur-md border-[#0066ff]/30 py-4"
                    : "bg-transparent border-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo - HUD Style */}
                <a href="/" className="group flex items-center gap-2">
                    <div className="w-8 h-8 rounded-sm border border-[#00f6ff] flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform">
                        <div className="absolute inset-0 bg-[#00f6ff] opacity-20 animate-pulse" />
                        <span className="text-[#00f6ff] font-bold text-xs">B</span>
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-white group-hover:text-[#00f6ff] transition-colors">
                        B.U.G
                    </span>
                </a>

                {/* Desktop HUD Links */}
                <div className="hidden md:flex items-center space-x-12">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs font-mono font-medium text-gray-400 hover:text-[#00f6ff] transition-colors relative group uppercase tracking-widest"
                        >
                            <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#0066ff]">&gt;</span>
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f6ff] transition-all group-hover:w-full shadow-[0_0_5px_#00f6ff]"></span>
                        </a>
                    ))}

                    <a
                        href="#start"
                        className="px-6 py-2 text-xs font-bold text-black bg-[#00f6ff] hover:bg-white transition-all uppercase tracking-wider relative overflow-hidden group clip-path-slant"
                        style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                    >
                        <span className="relative z-10">Start Project</span>
                        <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0" />
                    </a>
                </div>

                {/* Mobile is handled by StaggeredMenu usually, but we keep a phantom div for spacing if needed */}
                <div className="md:hidden w-8" />
            </div>

            {/* Scanline Bottom Border */}
            <div className={`absolute bottom-0 left-0 h-[1px] ${scrolled ? "bg-gradient-to-r from-transparent via-[#00f6ff] to-transparent w-full" : "w-0"} transition-all duration-700 opacity-50`} />
        </nav>
    );
}
