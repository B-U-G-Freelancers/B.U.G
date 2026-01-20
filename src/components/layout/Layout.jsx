// src/components/layout/Layout.jsx
import { useState } from "react";
import Footer from "./Footer";
import BugIntro from "../ui/BugIntro";
import { Header } from "./Header";
import GlobalBackground from "./GlobalBackground";

// Session storage key for tracking intro completion
const INTRO_SHOWN_KEY = "bug_intro_shown";

export default function Layout({ children }) {
  // Always start with intro incomplete on initial load
  // User requested animation visible when reloaded
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* 🌐 GLOBAL CYBERPUNK UNIVERSE (ALWAYS ON) */}
      <GlobalBackground />

      {/* 🧠 INTRO BOOT SEQUENCE (TOPMOST) */}
      {!introComplete && (
        <div className="fixed inset-0 z-[9999]">
          <BugIntro onComplete={handleIntroComplete} />
        </div>
      )}

      {/* Header / Menu - fixed position */}
      <div
        className={`fixed top-0 left-0 w-full z-[100] transition-opacity duration-500 ${introComplete ? "opacity-100" : "opacity-0"
          }`}
      >
        <Header isFixed />
      </div>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
