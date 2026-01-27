import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Instagram, Mail, MapPin, ArrowRight } from "lucide-react";
import { FaDiscord, FaLinkedin, FaGithub } from "react-icons/fa";
import logoWhite from "../assets/bug_logo_white.svg";

function VisitingCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);

  // Mouse tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 });

  // Tilt ranges - reduced for more professional feel
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  // Internal parallax depths
  const translateZ_logo = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const translateZ_text = useTransform(mouseY, [-0.5, 0.5], [40, -40]);

  function handleMouseMove(e) {
    if (!ref.current || isFlipped) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    const xPct = mouseXVal / width - 0.5;
    const yPct = mouseYVal / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      className="perspective-2000 w-[340px] h-[210px] sm:w-[500px] sm:h-[300px] cursor-pointer"
      onClick={() => {
        setIsFlipped(!isFlipped);
        handleMouseLeave(); // Reset tilt on flip
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
        className="relative w-full h-full"
      >
        {/* FRONT SIDE - HOLOGRAPHIC DARK */}
        <div
          className="absolute inset-0 rounded-2xl bg-black/90 border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] p-8 flex flex-col justify-between overflow-hidden backdrop-blur-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Holographic Accents */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none" />

          <motion.div
            style={{ translateZ: translateZ_logo }} // Fix: Linked to dynamic motion value
            className="relative z-10 flex justify-between items-start"
          >
            <div className="size-12 rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-lg">
              <img src={logoWhite} alt="BUG Logo" className="size-7" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-accent font-mono tracking-[0.3em] uppercase">
                EST 2024
              </span>
              <div className="h-[2px] w-8 bg-accent/40" />
            </div>
          </motion.div>

          <motion.div
            style={{ translateZ: translateZ_text }} // Fix: Linked to dynamic motion value
            className="relative z-10"
          >
            <h3
              className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              B.U.G
            </h3>
            <p className="text-sm text-text-muted tracking-[0.4em] uppercase font-medium">
              BUILD YOUR GENIE
            </p>
          </motion.div>

          <motion.div
            style={{ translateZ: translateZ_logo }} // Re-using for footer elements
            className="relative z-10 flex justify-between items-end"
          >
            <div className="text-[9px] text-white/40 font-mono tracking-widest leading-relaxed">
              DIGITAL ARCHITECTS //
              <br />
              FULL-STACK REALITIES
            </div>
            <div className="flex gap-4 items-center">
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/orgs/B-U-G-Freelancers",
                },
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/bugfreelancers/",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/bugfreelancers/",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-white/30 hover:text-accent transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BACK SIDE - THE "CORE" NEURAL HUB */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#0b0d10] text-white p-8 flex flex-col justify-between shadow-2xl overflow-hidden border border-white/10"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          {/* Decorative scanner/grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="size-1.5 rounded-full bg-accent animate-pulse" />
              <h4 className="text-[10px] font-bold text-accent uppercase tracking-widest">
                NEURAL HUB // CONTACT
              </h4>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:buildyourgenie@gmail.com"
                className="group flex flex-col gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-[9px] text-white/30 font-mono uppercase tracking-widest">
                  Secure Channel
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-500 shadow-[0_0_15px_rgba(58,124,255,0.1)]">
                    <Mail size={18} />
                  </div>
                  <span className="font-display text-lg sm:text-xl tracking-tighter group-hover:text-accent transition-colors duration-300">
                    buildyourgenie@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 text-white/50">
                <div className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[9px] text-white/30 font-mono uppercase tracking-widest">
                    Location
                  </div>
                  <span className="text-sm font-medium">
                    Chennai, India // UTC+5:30
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="h-px w-full bg-linear-to-r from-white/20 via-white/5 to-transparent mb-4" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-widest uppercase">
                <ArrowRight size={14} className="rotate-180 animate-pulse" />
                <span>Return to Access</span>
              </div>
              <div className="text-[10px] text-accent/50 font-mono italic">
                Verified // B.U.G_Secure
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center py-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 text-center mb-16 space-y-4">
        <h2
          className="text-4xl sm:text-6xl font-black text-white tracking-tighter"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          LET'S WORK <span className="text-blue-500">TOGETHER</span>
        </h2>
        <p className="text-white/40 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          Ready to bring your vision to life? Flip the card to get in touch.
        </p>
      </div>

      <div className="relative z-20">
        <VisitingCard />
      </div>
    </section>
  );
}
