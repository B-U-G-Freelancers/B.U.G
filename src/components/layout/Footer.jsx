import { Link } from "react-router-dom";
import logoWhite from "../../assets/bug_logo_white.svg";
import CircularText from "../ui/CircularText";

// Scroll to top of page
const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

// Animated arrow icon for links
const ArrowIcon = () => (
  <svg
    className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

// Social icons with hover effect
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
    aria-label={label}
  >
    <span className="text-text-secondary group-hover:text-accent transition-colors duration-300">
      {icon}
    </span>
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      {label}
    </span>
  </a>
);

// Navigation link with hover animation
const FooterLink = ({ to, children, external = false }) => {
  const className =
    "group flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-300";

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <span className="relative">
          {children}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
        </span>
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link to={to} className={className} onClick={handleClick}>
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
      </span>
      <ArrowIcon />
    </Link>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-bg-secondary to-bg-primary overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(58, 124, 255, 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(58, 124, 255, 0.05) 0%, transparent 40%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <div
              className="group flex items-center gap-4 cursor-pointer w-fit"
              onClick={scrollToTop}
            >
              <div className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 group-hover:border-accent/40 transition-all duration-500">
                <img src={logoWhite} alt="BUG Logo" className="size-6" />
                <div className="absolute inset-0 rounded-xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-text-primary font-display tracking-wider">
                  B.U.G
                </span>
                <span className="text-xs font-medium text-accent tracking-wide">
                  Build Your Genie
                </span>
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Crafting digital experiences with engineering precision. We turn
              ambitious ideas into elegant solutions.
            </p>

            {/* Location Badge */}
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available for projects
              </span>
              <span className="text-white/20">•</span>
              <span>Chennai, India</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Navigate
            </h3>
            <nav className="flex flex-col gap-3 text-sm">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/works">Works</FooterLink>
              <FooterLink to="/templates">Templates</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
              Services
            </h3>
            <nav className="flex flex-col gap-3 text-sm">
              <FooterLink to="/contact">Web Development</FooterLink>
              <FooterLink to="/contact">UI/UX Design</FooterLink>
              <FooterLink to="/contact">Mobile Apps</FooterLink>
              <FooterLink to="/contact">Content Creation</FooterLink>
            </nav>
          </div>

          {/* Connect Column - Transformed into System Diagnostics */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-accent animate-pulse" />
              <h3 className="text-xs font-semibold text-text-primary uppercase tracking-[0.3em]">
                System Status
              </h3>
            </div>

            {/* Tech Readout Panel */}
            <div className="relative group overflow-hidden bg-black/40 border border-white/10 rounded-lg p-4 backdrop-blur-sm backdrop-saturate-150">
              <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

              <div className="space-y-3 font-mono">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-text-muted uppercase tracking-tighter">
                    Connection Mode
                  </span>
                  <span className="text-accent">ENCRYPTED // QUAD-LINK</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-8 bg-white/5 rounded flex items-center px-2 overflow-hidden relative">
                    {/* Animated Waveform Simulation */}
                    <div className="flex items-end gap-px h-4">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-accent/40"
                          style={{
                            height: `${30 + (i % 5) * 15}%`,
                            animation: `footer-pulse 1.5s ease-in-out infinite ${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                    <span className="ml-auto text-[9px] text-accent/60 animate-pulse">
                      LIVE FEED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[9px]">
                  <div className="p-2 bg-white/5 rounded border border-white/5">
                    <div className="text-text-muted mb-1 opacity-60">
                      UPTIME
                    </div>
                    <div className="text-text-primary font-bold">99.982%</div>
                  </div>
                  <div className="p-2 bg-white/5 rounded border border-white/5">
                    <div className="text-text-muted mb-1 opacity-60">
                      LATENCY
                    </div>
                    <div className="text-text-primary font-bold">12ms</div>
                  </div>
                </div>
              </div>

              {/* Decorative scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />
            </div>

            {/* Social Icons - Re-labeled as Command Hub */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-80">
                Communication Hub
              </h4>
              <div className="flex items-center gap-3">
                <SocialLink
                  href="https://github.com/orgs/B-U-G-Freelancers"
                  label="GitHub"
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
                <SocialLink
                  href="https://www.linkedin.com/in/bugfreelancers/"
                  label="LinkedIn"
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  }
                />
                <SocialLink
                  href="https://www.instagram.com/bugfreelancers/"
                  label="Instagram"
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  }
                />
                <SocialLink
                  href="https://discord.com/channels/1454445083569950950/1459237904693072046"
                  label="Discord"
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center CTA Section */}
        {/* <div className="flex flex-col items-center justify-center my-16 py-12 border-y border-white/5">
          <p className="text-xs text-accent uppercase tracking-[0.3em] mb-4">
            Ready to start?
          </p>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text text-transparent">
            Let's Build Together
          </h3>
          <p className="text-sm text-text-muted text-center max-w-md mb-8">
            Have a project in mind? We'd love to hear about it. Let's create
            something extraordinary.
          </p>
          <Link
            to="/contact"
            onClick={scrollToTop}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/30 rounded-full text-accent hover:bg-accent hover:text-bg-primary transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 text-sm font-medium">
              Start a Project
            </span>
            <svg
              className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div> */}

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs text-text-muted">
              © {currentYear} B.U.G Freelancers. All rights reserved.
            </p>

            {/* Back to top + tagline */}
            <div className="flex items-center gap-6">
              <p className="text-xs text-text-muted hidden sm:block">
                Designed in the Void ✦ Crafted with precision
              </p>

              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-xs text-text-muted hover:text-accent transition-colors duration-300"
              >
                <span>Back to top</span>
                <svg
                  className="w-3 h-3 group-hover:-translate-y-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Add CSS animations for footer
const style = `
  @keyframes footer-pulse {
    0%, 100% { transform: scaleY(1); opacity: 0.4; }
    50% { transform: scaleY(1.5); opacity: 0.8; }
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = style;
  document.head.appendChild(styleSheet);
}
