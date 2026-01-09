// src/components/layout/Layout.jsx
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import IntroAnimation from "../ui/IntroAnimation";

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Intro Animation Overlay */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* Header - only visible after intro */}
      <div
        className={`transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <Header scrolled={scrolled} />
      </div>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
