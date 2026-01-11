// src/components/layout/Footer.jsx
import logoWhite from "../../assets/bug_logo_white.svg";
import CircularText from "../ui/CircularText";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary py-16 overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 lg:flex-row lg:px-8">
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded bg-text-primary">
              <img src={logoWhite} alt="BUG Logo" className="size-4 invert" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-primary uppercase tracking-widest leading-none">
                BUG
              </span>
              <span className="text-[9px] font-medium text-text-muted uppercase tracking-wider leading-none mt-0.5">
                Build Your Genie
              </span>
            </div>
          </div>
          <p className="text-xs text-text-secondary text-center lg:text-left">
            Built for those who value engineering precision. <br />
            San Francisco • London • Remote
          </p>
        </div>

        {/* Circular Text - Center */}
        <div className="flex items-center justify-center">
          <CircularText
            text="• BUILD YOUR GENIE • BUILD YOUR GENIE "
            spinDuration={15}
            onHover="speedUp"
            className="text-accent"
          />
        </div>

        <div className="flex gap-12">
          {["Twitter", "LinkedIn", "Instagram", "Dribbble"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {social}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} BUG. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
