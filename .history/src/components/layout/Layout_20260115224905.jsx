// src/components/layout/Layout.jsx
import { useState } from "react";
import Footer from "./Footer";
import BugIntro from "../ui/BugIntro";
import { Header } from "./Header";

export default function Layout({ children }) {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Intro Animation Overlay */}
      {!introComplete && <BugIntro onComplete={() => setIntroComplete(true)} />}

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
