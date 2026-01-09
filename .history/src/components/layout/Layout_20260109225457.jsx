// src/components/layout/Layout.jsx
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header scrolled={scrolled} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
