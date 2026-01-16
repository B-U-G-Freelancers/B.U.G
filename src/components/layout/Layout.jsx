// src/components/layout/Layout.jsx
import { useState } from "react";
import StaggeredMenu from "./StaggeredMenu";
import Footer from "./Footer";
import IntroAnimation from "../ui/IntroAnimation";
import GlobalBackground from "./GlobalBackground";

export default function Layout({ children }) {
    const [introComplete, setIntroComplete] = useState(false);

    return (
        <div className="relative min-h-screen bg-transparent text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black">

            {/* 🌐 GLOBAL CYBERPUNK UNIVERSE (ALWAYS ON) */}
            <GlobalBackground />

            {/* 🧠 INTRO BOOT SEQUENCE (TOPMOST) */}
            {!introComplete && (
                <div className="fixed inset-0 z-[9999]">
                    <IntroAnimation onComplete={() => setIntroComplete(true)} />
                </div>
            )}

            {/* UI & CONTENT LAYER */}
            <div className={`relative z-10 transition-opacity duration-1000 ${introComplete ? "opacity-100" : "opacity-0"}`}>

                {/* STAGGERED MENU */}
                <StaggeredMenu />

                {/* MAIN CONTENT */}
                <main className="relative z-10 w-full">
                    {children}
                </main>

                {/* FOOTER */}
                <Footer />
            </div>

        </div>
    );
}
