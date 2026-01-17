import { Mail, Phone, Linkedin, Globe } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="min-h-screen sm:min-h-[60vh] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20 bg-black">
      {/* Visiting Card Style Container */}
      <div className="relative w-full max-w-2xl">
        {/* Card */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -top-20 -right-20 w-40 sm:w-60 h-40 sm:h-60 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 sm:w-60 h-40 sm:h-60 bg-purple-500/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            {/* Logo/Brand */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                B.U.G
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm tracking-widest uppercase mt-1">
                Build Your Genie
              </p>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light mb-8 sm:mb-10 leading-relaxed">
              Ready to create something
              <span className="text-blue-400 font-medium"> extraordinary</span>?
            </p>

            {/* Contact Details */}
            <div className="space-y-3 sm:space-y-4">
              <a
                href="mailto:hello@buildyourgenie.com"
                className="flex items-center gap-3 sm:gap-4 text-gray-400 hover:text-white transition-colors group text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">hello@buildyourgenie.com</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 sm:gap-4 text-gray-400 hover:text-white transition-colors group text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>+91 98765 43210</span>
              </a>

              <a
                href="https://buildyourgenie.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 text-gray-400 hover:text-white transition-colors group text-sm sm:text-base"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>buildyourgenie.com</span>
              </a>

              <a
                href="https://linkedin.com/company/buildyourgenie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 text-gray-400 hover:text-white transition-colors group text-sm sm:text-base"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 group-hover:scale-110 transition-transform shrink-0" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-10">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:bg-gray-200 transition-colors"
              >
                Let's Talk
                <span className="text-lg sm:text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
