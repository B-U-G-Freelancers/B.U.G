import { motion } from "motion/react";

export default function About() {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden px-6">
      {/* Subtle Background Gradient similar to Hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none" />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        {/* Main Title - Matches Hero Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          WE ARE <br />
          <span
            className="italic font-light opacity-80 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            B.U.G.
          </span>
        </motion.h1>

        {/* Minimalist Description - Apple Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <p
            className="text-xl md:text-3xl leading-relaxed font-light text-white/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Engineers of the digital soul. We don't just write code; we sculpt{" "}
            <span className="text-white font-medium">experiences</span> that
            feel like magic.
          </p>

          <p
            className="text-lg md:text-xl leading-relaxed text-white/50 max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Born from chaos, structured by intelligence. We are the architects
            of your digital dreams.
          </p>
        </motion.div>

        {/* Subtle Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
          viewport={{ once: true }}
          className="w-24 h-1 bg-blue-500/50 mx-auto rounded-full mt-12"
        />
      </div>
    </section>
  );
}
