// src/components/layout/Layout.jsx
import { useState } from "react";
import Footer from "./Footer";
import IntroAnimation from "../ui/IntroAnimation";

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
      {/* Intro Animation Overlay */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* Header / Menu - absolute to avoid taking space in flow */}
      <div
        className={`fixed top-0 left-0 w-full z-[100] transition-opacity duration-500 ${introComplete ? "opacity-100" : "opacity-0"
          }`}
      >
        <Menu isFixed />
      </div>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
