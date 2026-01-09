// src/sections/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <section id="contact" className="py-32 px-6 lg:px-8 bg-bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          <div className="flex flex-col justify-center space-y-12">
            <div>
              <h2 className="font-display text-6xl font-black tracking-tighter text-text-primary sm:text-8xl lg:text-[10rem] leading-[0.85]">
                Let's <br />
                <span className="text-accent">build.</span>
              </h2>
              <p className="mt-12 text-xl text-text-secondary max-w-md leading-relaxed">
                Have a complex problem? We're ready. Tell us about your project
                timeline and budget.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="group flex items-center gap-5 text-text-primary">
                <div className="flex size-12 items-center justify-center rounded-lg bg-bg-primary border border-border-subtle transition-colors group-hover:border-accent">
                  <span className="material-symbols-outlined text-accent">
                    mail
                  </span>
                </div>
                <a
                  href="mailto:hello@bug.agency"
                  className="text-xl font-medium hover:text-accent transition-colors underline decoration-accent/30 underline-offset-8"
                >
                  hello@bug.agency
                </a>
              </div>

              <div className="group flex items-center gap-5 text-text-primary">
                <div className="flex size-12 items-center justify-center rounded-lg bg-bg-primary border border-border-subtle transition-colors group-hover:border-accent">
                  <span className="material-symbols-outlined text-accent">
                    location_on
                  </span>
                </div>
                <span className="text-xl font-medium">San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            {/* Form Container */}
            <div className="relative z-10 flex flex-col justify-center rounded-3xl bg-bg-primary p-10 sm:p-14 border border-border-subtle shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
              <form className="space-y-10">
                <div className="space-y-3">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-text-secondary"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="w-full border-b border-border-subtle bg-transparent px-0 py-3 text-xl text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-0 transition-all duration-300"
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-3">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-text-secondary"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full border-b border-border-subtle bg-transparent px-0 py-3 text-xl text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-0 transition-all duration-300"
                    id="email"
                    placeholder="john@company.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-3">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-text-secondary"
                    htmlFor="message"
                  >
                    Project Details
                  </label>
                  <textarea
                    className="w-full resize-none border-b border-border-subtle bg-transparent px-0 py-3 text-xl text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-0 transition-all duration-300"
                    id="message"
                    placeholder="Tell us about your challenge..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>

                <button
                  className="mt-6 group relative w-full overflow-hidden rounded-xl bg-text-primary py-5 text-sm font-black uppercase tracking-[0.2em] text-bg-primary transition-all hover:bg-text-secondary"
                  type="button"
                >
                  <span className="relative z-10">Send Inquiry</span>
                  <div className="absolute inset-0 -translate-x-full bg-bg-primary/5 skew-x-12 transition-transform duration-500 group-hover:translate-x-full"></div>
                </button>
              </form>
            </div>
            {/* Aesthetic glow behind form */}
            <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-accent/20 blur-[100px] -z-10 group-hover:bg-accent/30 transition-colors"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
