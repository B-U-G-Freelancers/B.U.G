// src/components/layout/Layout.jsx
import { useState, useEffect } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import BugIntro from "../ui/BugIntro";

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
      {!introComplete && <BugIntro onComplete={() => setIntroComplete(true)} />}

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
