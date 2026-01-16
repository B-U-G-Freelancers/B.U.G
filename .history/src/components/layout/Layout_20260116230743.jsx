// src/components/layout/Layout.jsx
import { useState } from "react";
import Footer from "./Footer";
import BugIntro from "../ui/BugIntro";
import { Header } from "./Header";

// Session storage key for tracking intro completion
const INTRO_SHOWN_KEY = "bug_intro_shown";
import GlobalBackground from "./GlobalBackground";

export default function Layout({ children }) {
  // Check if intro was already shown this session
  const [introComplete, setIntroComplete] = useState(() => {
    // Check sessionStorage on initial render
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(INTRO_SHOWN_KEY) === "true";
    }
    return false;
  });

  const handleIntroComplete = () => {
    setIntroComplete(true);
    // Persist to sessionStorage so it doesn't replay on navigation
    sessionStorage.setItem(INTRO_SHOWN_KEY, "true");
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Intro Animation Overlay - only shows once per session */}
      {!introComplete && <BugIntro onComplete={handleIntroComplete} />}
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

      {/* Header / Menu - fixed position */}
      <div
        className={`fixed top-0 left-0 w-full z-[100] transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <Header isFixed />
      </div>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
