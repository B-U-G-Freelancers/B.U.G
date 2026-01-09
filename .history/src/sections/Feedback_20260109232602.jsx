// src/sections/Feedback.jsx
import { Quote } from "lucide-react";

export default function Feedback() {
  return (
    <section className="py-40 px-6 lg:px-8 border-t border-border-subtle bg-bg-primary overflow-hidden">
      <div className="mx-auto max-w-4xl relative">
        <Quote
          className="absolute -top-8 -left-8 size-40 text-text-primary/5 select-none pointer-events-none"
          strokeWidth={1}
        />

        <blockquote className="relative z-10 text-center">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-text-primary tracking-tight">
            "BUG doesn't just design; they architect solutions. The level of
            engineering precision in their design deliverables is something we
            haven't seen elsewhere."
          </p>

          <footer className="mt-16 flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent to-accent-soft opacity-20 blur group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative h-16 w-16 rounded-full bg-bg-secondary border-2 border-border-subtle overflow-hidden ring-4 ring-bg-primary">
                <img
                  alt="Sarah Jenkins"
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW8-Vw6ilS_lEg_EJB8O-0copQDh9K-HkYoXwBNwTZ1fNnikT9Omc3CM9WkbIeTCUQQVmkijbTKm61MkV8I8yVJxuQLy1ofhysD0EjEFBPiYYiJ-NCUGSUyucfhzl8rX1U-fCwKZMqPB3ehYtJoavF5pNWxRqR2KPXpMLEnQb5PLpsDNpJdUQw_WZ3oW19y2yrKlBQHbDhdt74nZsYGXuK3up798T-obSMKscRhokRFRwLN5hIm67ltjD6TYE4uJ_TcAdrUPmhpA"
                />
              </div>
            </div>

            <div className="text-center space-y-1">
              <div className="text-xl font-bold text-text-primary tracking-tight">
                Sarah Jenkins
              </div>
              <div className="text-sm font-bold text-accent uppercase tracking-[0.2em]">
                CTO at Vertex Global
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
