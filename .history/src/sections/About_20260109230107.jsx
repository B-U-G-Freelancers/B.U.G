// src/sections/About.jsx
export default function About() {
  return (
    <section
      id="about"
      className="relative py-40 px-6 lg:px-8 bg-bg-secondary/20 border-y border-border-subtle"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-7xl lg:leading-[1.1]">
          <span className="text-text-muted">Execution over fluff.</span> <br />
          <span className="text-text-primary">
            Clarity over complexity.
          </span>{" "}
          <br />
          <span className="text-accent inline-flex items-center gap-4">
            We are an engineering-first studio
          </span>
        </h2>
      </div>
    </section>
  );
}
