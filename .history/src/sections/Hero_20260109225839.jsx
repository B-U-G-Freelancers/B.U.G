// src/sections/Hero.jsx
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 lg:px-8 text-center"
    >
      {/* Decorative Gradients */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-[10%] left-[15%] h-[600px] w-[600px] rounded-full bg-accent/5 blur-[140px]"></div>
        <div className="absolute bottom-[20%] right-[10%] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]"></div>
      </div>

      <div className="max-w-5xl">
        <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tighter text-text-primary sm:text-7xl lg:text-9xl">
          We build digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-primary/80 to-text-muted">
            products that work
          </span>
        </h1>

        <p className="mx-auto mt-10 max-w-xl text-lg text-text-secondary sm:text-xl font-light leading-relaxed">
          Engineering-led design for high-growth companies.{" "}
          <br className="hidden sm:block" />
          We turn complexity into clarity.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <a
            href="#contact"
            className="group relative h-14 overflow-hidden rounded-md bg-accent px-10 text-base font-bold text-text-primary shadow-[0_0_30px_rgba(58,124,255,0.3)] transition-all hover:bg-accent-soft hover:shadow-[0_0_40px_rgba(58,124,255,0.5)] flex items-center justify-center"
          >
            <span className="relative z-10">Get in touch</span>
            <div className="absolute inset-0 -translate-x-full bg-text-primary/10 skew-x-12 transition-transform duration-500 group-hover:translate-x-full"></div>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center text-text-secondary animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.2em] mb-2 font-bold opacity-50">
          Scroll
        </span>
        <span className="material-symbols-outlined text-2xl">
          keyboard_arrow_down
        </span>
      </div>
    </section>
  );
}
