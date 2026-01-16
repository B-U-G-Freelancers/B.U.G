// src/components/layout/Footer.jsx
import logoWhite from "../../assets/bug_logo_white.svg";
import CircularText from "../ui/CircularText";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary py-16">
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

                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-gray-500 uppercase tracking-widest text-xs">Socials</h3>
                            <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">Instagram</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-gray-500 uppercase tracking-widest text-xs">Legal</h3>
                            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>

      <div className="mt-16 text-center">
        <span className="text-[10rem] font-black text-text-primary/[0.02] select-none pointer-events-none leading-none">
          Build Your Genie
        </span>
      </div>
    </footer>
  );
}
