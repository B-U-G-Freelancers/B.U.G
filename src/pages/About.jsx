import { useEffect, useRef } from "react";
import { Header } from "../components/layout/Header";
import { Github, Instagram, Linkedin } from "lucide-react";

function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.4,
      speed: Math.random() * 0.6 + 0.3,
      color:
        Math.random() > 0.6
          ? "#4f9cff"
          : Math.random() > 0.5
            ? "#b44cff"
            : "#ffffff",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        s.y += s.speed;
        if (s.y > h) s.y = 0;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-[1] opacity-60" />
  );
}

/* =========================
   PROFESSIONAL TEXT COMPONENTS
========================= */
const ProfessionalTitle = ({ children }) => (
  <h2 className="relative inline-block text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-16 group cursor-default">
    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 group-hover:to-slate-200 transition-all duration-700">
      {children}
    </span>
    <span className="absolute -bottom-4 left-0 w-full h-1 bg-[#4f9cff] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-expo origin-left" />
  </h2>
);

const ProfessionalText = ({ children }) => (
  <p className="max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed mb-24 text-slate-400 font-light">
    <span className="hover:text-white transition-colors duration-500">
      {children}
    </span>
  </p>
);

/* =========================
   TEAM COMPONENT
========================= */
const TeamMember = ({ member }) => {
  return (
    <div className="group relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 border border-white/10">
      {/* Image */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px] group-hover:brightness-50"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
        <p className="text-[#4f9cff] font-medium mb-4 text-sm tracking-widest uppercase">
          {member.role}
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href={member.socials.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={member.socials.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={member.socials.instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            title="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* =========================
   ABOUT SECTION
========================= */
export default function About() {
  const team = [
    {
      name: "Bhuvanesh",
      role: "Full Stack Developer",
      image: "/images/bhuvanesh.png",
      socials: { linkedin: "https://www.linkedin.com/in/bhuvaneshkumar08/", github: "https://github.com/Bhuvi888", instagram: "https://www.instagram.com/bhxvi._.106/" },
    },
    {
      name: "Jothish",
      role: "Social Media Manager",
      image: "/images/jothish.png",
      socials: { linkedin: "https://www.linkedin.com/in/jothishwaran-s-914406314/", github: "#", instagram: "https://www.instagram.com/_jo.daz_/" },
    },
    {
      name: "Om Naren",
      role: "Business Advisor",
      image: "/images/om naren.png",
      socials: { linkedin: "https://www.linkedin.com/in/om-naren-d-68a2502b5/", github: "https://github.com/OmnarenD-cyber", instagram: "https://www.instagram.com/naren_____1235/" },
    },
    {
      name: "Sanjeev",
      role: "Full Stack Developer",
      image: "/images/sanjeev.jpeg",
      socials: { linkedin: "https://www.linkedin.com/in/sanjeevrajg2312/", github: "https://github.com/Sanjeev23Raj", instagram: "https://www.instagram.com/sanjeev._.sr23/" },
    },
    {
      name: "Shajin",
      role: "Full Stack Developer",
      image: "/images/shajin.jpeg",
      socials: { linkedin: "https://www.linkedin.com/in/shajinaiml/", github: "https://github.com/shajin0307", instagram: "https://www.instagram.com/shajin_037/" },
    },
    {
      name: "Vaman Prabhakar",
      role: "Full Stack Developer ",
      image: "/images/vaman.jpeg",
      socials: { linkedin: "https://www.linkedin.com/in/vaman-prabakar-32b6072a1/", github: "https://github.com/VamanPrabhakar-03", instagram: "https://www.instagram.com/vaman_prabakar/" },
    },
    {
      name: "Vimalesh",
      role: "Full Stack Developer",
      image: "/images/vimalesh.jpeg",
      socials: { linkedin: "https://www.linkedin.com/in/vimalesh-s-1bbba53a8/", github: "https://github.com/Vimal27896", instagram: "https://www.instagram.com/_.toxic_kiddo__/" },
    },
  ];

  return (
    <>
      <Header isFixed />
      <section className="relative min-h-screen bg-[#050505] overflow-hidden pt-32 pb-20 px-6 text-white">
        <Starfield />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <ProfessionalTitle>B.U.G FREELANCING</ProfessionalTitle>

          <ProfessionalText>
            is a specialized collective of engineers and designers. We don’t
            build templates — we engineer{" "}
            <span className="text-[#4f9cff] font-medium">
              immersive digital realities
            </span>{" "}
            that survive scale, pressure, and chaos.
          </ProfessionalText>

          {/* TEAM TITLE */}
          <h3 className="text-4xl font-bold uppercase tracking-widest mb-16 text-slate-300">
            The People Behind <span className="text-[#4f9cff]">B.U.G</span>
          </h3>

          {/* INFINITE SCROLL MARQUEE */}
          <div className="marquee-container relative w-full overflow-hidden py-10">
            {/* Gradient Masks for fade effect at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee w-max">
              {/* Original List */}
              {team.map((member, index) => (
                <div key={`original-${index}`} className="w-72 sm:w-80 flex-shrink-0 mr-8">
                  <TeamMember member={member} />
                </div>
              ))}
              {/* Duplicate List for Seamless Loop */}
              {team.map((member, index) => (
                <div key={`duplicate-${index}`} className="w-72 sm:w-80 flex-shrink-0 mr-8">
                  <TeamMember member={member} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INJECTED STYLES FOR MARQUEE ANIMATION */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        /* Explicit Pause on Hover */
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
