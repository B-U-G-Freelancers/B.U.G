// src/sections/Works.jsx
import { ArrowRight, ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Nova Finance",
    category: "Fintech • Mobile App & Dashboard",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrtMzsngaIkUHKX3wwbqO-6MeL6LTbaDURKBJF9GMOnobgNhCTBNs9ObeM4Hdc26sxPmBNMjQzclFrYwFPJnWStLz6HEUCLeZs5g1f200HZSr2uphYWwPLFChp8o74qXOM-1jbN88I8OfMATRP3Gey71lavYXyG0PfQWX-XhABDXQjWx0KAURemIT0s2eqiDXwLnXl0cGjnYZucmULkq9RGKUkIkTGnO2FlK8OynBhxVy3vvawR72P6niR0IfX-EYYicwKBEQLKg",
    stagger: false,
  },
  {
    title: "Aether Core",
    category: "SaaS • AI Infrastructure Platform",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIiL_Bn6YUUtBKsu8KGhkevCRAJI17t4DAD5TOOmTRnu3gGXvsa6IebyBdbV5PAh7F4SGX3uK0DyJsORtl1wy0L59iWDwRa0xrEHY27llbfCsJWR7xCvv_87_jnSUCVegZXY9qYA2UXwnAV-ZgUmDNq9zV4o08CyXBDMOrxFBFMFdyIKYrAGCtfskGwDWF5M1keGyu-T6J2mYrCNIwHcfWBueSjSomC0b24wUPQuWrJv4UUfzsp3GS7Su59RkjVky0z2OaXelFJA",
    stagger: true,
  },
  {
    title: "Lumina",
    category: "E-commerce • Design System",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_qC94TBkNDNka4dMLtKmo3GrZuHno6c2hcFTGgGNqSviWLmyud8nmuihbfXNBuofiLtXe9nnyH1Sy714NFsP76lgJBZL1Dg3ZT7jzS8rURkJn_lwZ_jK9kxFbV-FncmsHHlNWk06Gl2JMwJcLNVmUvAEis0CQTsWBvMZAGSmYimASFxrkHv8DAxjooxJ3VxxhXpjHZi9AeDhxzZdl_S55eqQR931U4EgGuPOW7ecalm8fTkXel_yVJQs_dTxngrZoCfUr1dFbLA",
    stagger: false,
  },
  {
    title: "MedSync",
    category: "Healthcare • IoT Integration",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlCBXX_Xlya0tOIKNZXDx-nfJz8m9ZWNc3D0gJ8G4qd6zPj-HHGOUJSk0qD2oNAdsj9y-q0-75jYD4C4rIan9KcLvfdvHM1Sapim-0AZjvK7PdaRo1m87cRtiWg8u1fe84dEF9ueuuFVhaiO4EEWa9ZP7ZXSqDPe4Cf5TxGFMWIC9aJqtFPHIApO7LWmKyCPlsPbS1_5o-L-I7WHtoADu8HsizTnLZ_cb93WXkrRE3NnV9pjS09n5LPLDc_kEcdCeee3rQFDeVTg",
    stagger: true,
  },
];

export default function Works() {
  return (
    <section id="work" className="py-32 px-6 lg:px-8 bg-bg-secondary/40">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-24">
          <h2 className="text-5xl font-bold tracking-tighter text-text-primary sm:text-7xl">
            Selected <br className="sm:hidden" /> Works
          </h2>
          <a
            href="#"
            className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:text-text-primary transition-colors duration-300 group"
          >
            View all projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className={`group cursor-pointer ${
                project.stagger ? "md:mt-32" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-secondary border border-border-subtle shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Overlay text shown on hover for mobile/extra context */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-text-primary scale-75 group-hover:scale-100 transition-transform duration-500">
                    <ArrowUpRight className="size-6" />
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <h3 className="text-3xl font-bold text-text-primary group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-base font-medium uppercase tracking-wider">
                  {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 sm:hidden">
          <a
            href="#"
            className="flex items-center justify-center gap-2 w-full py-5 border border-border-subtle rounded-lg text-sm font-bold uppercase tracking-widest text-text-primary"
          >
            View all projects
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
