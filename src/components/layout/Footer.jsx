import logoWhite from "../../assets/bug_logo_white.svg";
import CircularText from "../ui/CircularText";

const scrollToHero = (e) => {
  e.preventDefault();

  const hero = document.getElementById("hero");
  if (hero) {
    hero.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">

          {/* Left - Logo */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToHero}>
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

          {/* Center - Circular Text */}
          <div className="hidden sm:flex items-center justify-center">
            <CircularText
              text="• BUILD YOUR GENIE • BUILD YOUR GENIE "
              spinDuration={15}
              onHover="speedUp"
              className="text-accent"
            />
          </div>

          {/* Right - Links */}
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-text-muted uppercase tracking-widest text-xs">
                Socials
              </h3>

              <a
                href="https://github.com/orgs/B-U-G-Freelancers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bugfreelancers/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/bugfreelancers/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Instagram
              </a>
              <a
                href="https://discord.com/channels/1454445083569950950/1459237904693072046"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Discord
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-text-muted uppercase tracking-widest text-xs">
                Legal
              </h3>
              <a
                href="#hero"
                onClick={scrollToHero}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#hero"
                onClick={scrollToHero}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} B.U.G. All rights reserved.</p>
          <p className="cursor-pointer" onClick={scrollToHero}>
            Designed in the Void.
          </p>
        </div>
      </div>
    </footer>
  );
}
