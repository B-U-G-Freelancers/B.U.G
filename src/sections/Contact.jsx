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

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  function handleMouseMove(e) {
    if (!ref.current) return;
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
      className="perspective-1000 w-[350px] h-[220px] sm:w-[500px] sm:h-[300px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{
          rotateX: rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative w-full h-full"
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 rounded-xl bg-black border border-white/10 shadow-2xl p-8 flex flex-col justify-between overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Subtle texture/gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <img src={logoWhite} alt="BUG Logo" className="w-6 h-6" />
            </div>
            <span className="text-xs text-white/40 tracking-[0.2em] uppercase font-mono">
              2025
            </span>
          </div>

          <div className="relative z-10">
            <h3
              className="text-3xl sm:text-4xl font-black text-white tracking-tighter mix-blend-difference mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              B.U.G
            </h3>
            <p className="text-sm text-white/50 tracking-widest uppercase font-light">
              Build Your Genie
            </p>
          </div>

          <div className="relative z-10 flex justify-between items-end">
            <div className="text-[10px] text-white/30 font-mono tracking-widest">
              FREELANCE COLLECTIVE
              <br />
              DESIGN & ENGINEERING
            </div>
            <div className="flex gap-3 pointer-events-auto">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/bugfreelancers/",
                },
                {
                  icon: FaGithub,
                  href: "https://github.com/orgs/B-U-G-Freelancers",
                },
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/bugfreelancers/",
                },
                {
                  icon: FaDiscord,
                  href: "https://discord.com/channels/1454445083569950950/1459237904693072046",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-white/40 hover:text-blue-400 hover:scale-110 transition-all"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 rounded-xl bg-white text-black p-8 flex flex-col justify-between shadow-2xl overflow-hidden"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
              Contact Details
            </h4>

            <div className="space-y-4">
              <a
                href="mailto:buildyourgenie@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Mail size={14} />
                </div>
                <span className="font-medium text-lg tracking-tight group-hover:text-blue-600 transition-colors">
                  buildyourgenie@gmail.com
                </span>
              </a>

              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                <span className="text-sm">Chennai, India</span>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="h-px w-full bg-gray-100 mb-4" />
            <div className="flex items-center gap-2 text-blue-400 text-xs tracking-widest uppercase animate-pulse">
              <ArrowRight size={12} className="rotate-180" /> Click to flip back
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
