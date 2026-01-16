import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    return (
        <section id="contact" className="relative py-32 px-6 lg:px-8 bg-transparent overflow-hidden pointer-events-none">

            <div className="mx-auto max-w-7xl relative z-10 pointer-events-auto">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
                    <div className="flex flex-col justify-center space-y-12">
                        <div>
                            <div className="inline-block mb-4 px-3 py-1 border border-[#3A7CFF]/30 rounded-full bg-[#3A7CFF]/10 backdrop-blur-md">
                                <span className="text-[#3A7CFF] text-xs font-mono font-bold tracking-[0.2em] uppercase">Initialize Link</span>
                            </div>
                            <h2 className="font-display text-6xl font-black tracking-tighter text-white sm:text-8xl lg:text-[9rem] leading-[0.85] drop-shadow-[0_0_25px_rgba(58,124,255,0.4)]">
                                LET'S <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A7CFF] to-white">BUILD.</span>
                            </h2>
                            <p className="mt-12 text-xl text-gray-400 max-w-md leading-relaxed">
                                Ready to deploy your digital vision? Connect with our engineering core.
                            </p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="group flex items-center gap-5 text-white">
                                <div className="flex size-14 items-center justify-center rounded-lg bg-[#3A7CFF]/10 border border-[#3A7CFF]/30 transition-all group-hover:border-[#3A7CFF] group-hover:bg-[#3A7CFF] group-hover:text-black shadow-[0_0_15px_rgba(58,124,255,0.1)] group-hover:shadow-[0_0_30px_#3A7CFF]">
                                    <Mail className="size-6 text-[#3A7CFF] group-hover:text-black transition-colors" />
                                </div>
                                <a
                                    href="mailto:hello@bug.agency"
                                    className="text-xl font-medium hover:text-[#3A7CFF] transition-colors tracking-wide"
                                >
                                    hello@bug.agency
                                </a>
                            </div>

                            <div className="group flex items-center gap-5 text-white">
                                <div className="flex size-14 items-center justify-center rounded-lg bg-[#3A7CFF]/10 border border-[#3A7CFF]/30 transition-all group-hover:border-[#3A7CFF] group-hover:bg-[#3A7CFF] group-hover:text-black shadow-[0_0_15px_rgba(58,124,255,0.1)] group-hover:shadow-[0_0_30px_#3A7CFF]">
                                    <MapPin className="size-6 text-[#3A7CFF] group-hover:text-black transition-colors" />
                                </div>
                                <span className="text-xl font-medium">San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Form Container */}
                        <div className="relative z-10 flex flex-col justify-center rounded-3xl bg-black/40 backdrop-blur-xl p-10 sm:p-14 border border-[#3A7CFF]/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">

                            {/* Decorative Scanline */}
                            <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A7CFF] to-transparent opacity-50" />

                            <form className="space-y-10 relative z-10">
                                <div className="space-y-3">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#3A7CFF]"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="w-full border-b border-[#3A7CFF]/30 bg-transparent px-0 py-3 text-xl text-white placeholder-gray-600 focus:border-[#3A7CFF] focus:outline-none focus:ring-0 transition-all duration-300 font-light"
                                        id="name"
                                        placeholder="Enter designation..."
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#3A7CFF]"
                                        htmlFor="email"
                                    >
                                        Email Protocol
                                    </label>
                                    <input
                                        className="w-full border-b border-[#3A7CFF]/30 bg-transparent px-0 py-3 text-xl text-white placeholder-gray-600 focus:border-[#3A7CFF] focus:outline-none focus:ring-0 transition-all duration-300 font-light"
                                        id="email"
                                        placeholder="user@network.com"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label
                                        className="text-xs font-bold uppercase tracking-widest text-[#3A7CFF]"
                                        htmlFor="message"
                                    >
                                        Project Parameters
                                    </label>
                                    <textarea
                                        className="w-full resize-none border-b border-[#3A7CFF]/30 bg-transparent px-0 py-3 text-xl text-white placeholder-gray-600 focus:border-[#3A7CFF] focus:outline-none focus:ring-0 transition-all duration-300 font-light"
                                        id="message"
                                        placeholder="Describe objectives..."
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                    ></textarea>
                                </div>

                                <button
                                    className="mt-6 group relative w-full overflow-hidden rounded-xl bg-[#3A7CFF] py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-[#3A7CFF] shadow-[0_0_30px_rgba(58,124,255,0.4)]"
                                    type="button"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Transmit Data <Send className="w-4 h-4" />
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
