// src/components/layout/Layout.jsx
import { useState, useEffect } from "react";
import Header from "./Header";
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

      {/* Floating Header - visible after intro */}
      <Header scrolled={scrolled} visible={introComplete} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
