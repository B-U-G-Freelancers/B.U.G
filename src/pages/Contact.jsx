import { useState } from "react";
import { motion } from "motion/react";
import { Instagram, CheckCircle2, Mail, MapPin } from "lucide-react";
import { FaDiscord, FaLinkedin, FaGithub } from "react-icons/fa";

const Chip = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border touch-manipulation ${
      isActive
        ? "bg-blue-600 text-white border-blue-600 scale-105 shadow-lg shadow-blue-500/20"
        : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10 active:bg-white/20"
    }`}
  >
    {label}
  </button>
);

const AnimatedInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="group flex flex-col space-y-2 w-full">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={3}
        className="bg-transparent border-b border-white/10 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-all resize-none"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent border-b border-white/10 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-all"
      />
    )}
  </div>
);

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    "Web Development",
    "UI/UX Design",
    "Branding",
    "Mobile App",
    "AI Integration",
    "Consulting",
  ];
  const budgets = [
    "₹0 - ₹5K",
    "₹5K - ₹15K",
    "₹15K - ₹30K",
    "₹30K - ₹5L",
    "Flexible",
  ];

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    // TODO: Integrate with actual form submission (e.g., EmailJS, Supabase)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setName("");
      setEmail("");
      setDetails("");
      setSelectedServices([]);
      setSelectedBudget(null);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
          alt="Office workspace"
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter text-white/10 select-none uppercase pointer-events-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Contact
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-8 sm:bottom-12 left-4 sm:left-6 right-4 sm:right-6 h-[1px] bg-white/10 origin-left"
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Contact Info */}
        <div className="lg:col-span-4 space-y-10 lg:space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </h3>
            <a
              href="mailto:hello@buildyourgenie.com"
              className="text-base sm:text-lg md:text-xl font-bold hover:text-blue-400 transition-colors block break-all sm:break-normal"
            >
              hello@buildyourgenie.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Location
            </h3>
            <p className="text-lg text-gray-400">Chennai, India</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/buildyourgenie"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://discord.gg/buildyourgenie"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <FaDiscord size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com/company/buildyourgenie"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <FaLinkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://github.com/buildyourgenie"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <FaGithub size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </motion.div>

          <div className="pt-8 lg:pt-12 space-y-6">
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              We design & develop beautiful digital experiences that connect
              with your audience and drive results.
            </p>
            <div className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em]">
              © B.U.G {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12 sm:space-y-16"
          >
            <div className="space-y-2">
              <h2
                className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Start a Project <br />
                <span className="text-blue-500">With Us</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Services */}
              <div className="space-y-4 sm:space-y-6">
                <h5 className="text-sm font-medium text-white">
                  What do you need?
                </h5>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {services.map((service) => (
                    <Chip
                      key={service}
                      label={service}
                      isActive={selectedServices.includes(service)}
                      onClick={() => toggleService(service)}
                    />
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-4 sm:space-y-6">
                <h5 className="text-sm font-medium text-white">Your Budget</h5>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {budgets.map((budget) => (
                    <Chip
                      key={budget}
                      label={budget}
                      isActive={selectedBudget === budget}
                      onClick={() => setSelectedBudget(budget)}
                    />
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                <AnimatedInput
                  label="Your Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <AnimatedInput
                  label="Your Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <AnimatedInput
                label="Project Details (Optional)"
                placeholder="Tell us about your vision..."
                type="textarea"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />

              {/* Submit Button */}
              <div className="flex justify-center sm:justify-start pt-6 sm:pt-10">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess || !name || !email}
                  className="group relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-white rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 text-black group-hover:text-white font-bold uppercase tracking-widest transition-colors duration-300 text-sm sm:text-base">
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600 group-hover:border-white" />
                    ) : isSuccess ? (
                      <CheckCircle2 size={48} className="text-green-500" />
                    ) : (
                      "Send"
                    )}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
