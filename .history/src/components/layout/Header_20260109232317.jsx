// src/components/layout/Header.jsx
import { Bug, Menu } from "lucide-react";

export default function Header({ scrolled }) {
  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 border-b ${
        scrolled
          ? "border-border-subtle bg-bg-primary/80 backdrop-blur-md py-3"
          : "border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-text-primary text-bg-primary">
            <Bug className="size-5" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-text-primary">
            BUG
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {["Work", "Services", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:flex h-10 items-center justify-center rounded-md bg-accent px-5 text-sm font-bold text-text-primary transition-all hover:bg-accent-soft hover:scale-[1.02] active:scale-[0.98]"
          >
            Get in touch
          </a>
          <button className="md:hidden text-text-primary">
            <Menu className="size-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
