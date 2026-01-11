// src/components/layout/Header.jsx
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import logoWhite from "../../assets/bug_logo_white.svg";

export default function Header({ scrolled, visible }) {
  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-8 px-6 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-bg-primary/90 backdrop-blur-md border-border-subtle shadow-lg"
            : "bg-bg-secondary/80 backdrop-blur-sm border-border-subtle"
        }`}
      >
        {/* Logo - Links to Home */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-text-primary">
            <img src={logoWhite} alt="BUG Logo" className="size-5 invert" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-bold tracking-tight text-text-primary leading-none">
              BUG
            </span>
            <span className="text-[8px] font-medium text-text-muted uppercase tracking-wider leading-none mt-0.5">
              Build Your Genie
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/works"
            className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Works
          </Link>
          <a
            href="/#services"
            className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="/#about"
            className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            About
          </a>
        </nav>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:flex h-8 items-center justify-center rounded-full bg-accent px-4 text-xs font-bold text-text-primary transition-all hover:bg-accent-soft hover:scale-[1.02] active:scale-[0.98]"
          >
            Get in touch
          </Link>
          <button className="md:hidden text-text-primary p-1">
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
