import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, CheckCircle2 } from "lucide-react";
import { FaDiscord, FaLinkedin } from "react-icons/fa";

/* =====================
   CHIP (CYBER STYLE)
===================== */
const Chip = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-300
      ${isActive
                ? "bg-[#4f9cff] text-black border-[#4f9cff] shadow-[0_0_20px_#4f9cff]"
                : "bg-transparent text-slate-300 border-slate-700 hover:border-[#4f9cff] hover:text-[#4f9cff]"
            }`}
    >
        {label}
    </button>
);

/* =====================
   INPUT (CYBER)
===================== */
const AnimatedInput = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
}) => (
    <div className="flex flex-col space-y-2 w-full">
        <label className="text-[10px] font-bold text-[#4f9cff] uppercase tracking-[0.25em]">
            {label}
        </label>

        {type === "textarea" ? (
            <textarea
                rows={1}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-transparent border-b border-[#4f9cff]/40 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4f9cff] transition-all resize-none"
            />
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-transparent border-b border-[#4f9cff]/40 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4f9cff] transition-all"
            />
        )}
    </div>
);

/* =====================
   MAIN APP
===================== */
export default function App() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const services = [
        "Branding",
        "UX/UI",
        "Animation",
        "3D Design",
        "Identity",
        "Webflow",
    ];
    const budgets = ["2K - 10K", "10K - 50K", "More than 50K"];

    const toggleService = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#05080f] text-white relative overflow-hidden">
            {/* CYBER GLOW BACKGROUND */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#4f9cff]/10 blur-[160px] rounded-full" />
            <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[60%] bg-[#4f9cff]/10 blur-[160px] rounded-full" />

            {/* HERO */}
            <section className="relative pt-32 pb-24 px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[6rem] md:text-[9rem] font-black tracking-tighter text-[#4f9cff]/10 uppercase"
                >
                    Contact
                </motion.h1>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4f9cff]/60 to-transparent mt-6" />
            </section>

            {/* CONTENT */}
            <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* LEFT PANEL */}
                <div className="lg:col-span-4 space-y-16">
                    <div>
                        <p className="text-xs font-bold text-[#4f9cff] tracking-[0.3em] uppercase">
                            Contact
                        </p>
                        <a
                            href="mailto:buildyourgenie@gmail.com"
                            className="block mt-4 text-xl font-black hover:text-[#4f9cff] transition"
                        >
                            buildyourgenie@gmail.com
                        </a>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-[#4f9cff] tracking-[0.3em] uppercase">
                            Follow
                        </p>
                        <div className="flex gap-6 mt-4">
                            {[Instagram, FaDiscord, FaLinkedin].map((Icon, i) => (
                                <Icon
                                    key={i}
                                    size={20}
                                    className="text-white hover:text-[#4f9cff] transition"
                                />
                            ))}
                        </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        We design cyber-native brands, interfaces, and systems that perform
                        under pressure.
                    </p>

                    <p className="text-[10px] text-slate-600 tracking-[0.3em]">
                        © B.U.G 2025
                    </p>
                </div>

                {/* RIGHT PANEL */}
                <div className="lg:col-span-8 space-y-16">
                    <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">
                        Start a <br />
                        Project?
                    </h2>

                    {/* SERVICES */}
                    <div>
                        <p className="mb-4 text-sm text-[#4f9cff] uppercase tracking-widest">
                            Services
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {services.map((s) => (
                                <Chip
                                    key={s}
                                    label={s}
                                    isActive={selectedServices.includes(s)}
                                    onClick={() => toggleService(s)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* BUDGET */}
                    <div>
                        <p className="mb-4 text-sm text-[#4f9cff] uppercase tracking-widest">
                            Budget
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {budgets.map((b) => (
                                <Chip
                                    key={b}
                                    label={b}
                                    isActive={selectedBudget === b}
                                    onClick={() => setSelectedBudget(b)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* INPUTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <AnimatedInput
                            label="Name"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <AnimatedInput
                            label="Email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <AnimatedInput
                        label="Project Details"
                        placeholder="Describe your project..."
                        type="textarea"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />

                    {/* SUBMIT */}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || isSuccess}
                        className="relative w-48 h-48 rounded-full border border-[#4f9cff] flex items-center justify-center
              hover:scale-110 transition-all duration-500 shadow-[0_0_40px_#4f9cff]/30"
                    >
                        <span className="text-[#4f9cff] font-bold tracking-widest uppercase">
                            {isSubmitting ? "..." : isSuccess ? "Done" : "Send"}
                        </span>
                    </button>
                </div>
            </section>
        </div>
    );
}
