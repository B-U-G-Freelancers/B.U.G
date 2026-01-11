import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        details: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Message sent by ${formData.name}! (Demo Only)`);
        setFormData({ name: "", email: "", details: "" });
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col glow-bg selection:bg-blue-500/30">
            {/* Navigation Header */}
            <nav className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-[#1e293b] rounded-md flex items-center justify-center border border-white/5 transition-transform group-hover:scale-105">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight font-heading">
                        BUG
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">
                        Work
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        Services
                    </a>
                    <a href="#" className="text-white">
                        Contact
                    </a>
                </div>

                <div className="md:hidden">
                    <button className="text-gray-400 hover:text-white">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 py-12 md:py-24">
                {/* Left Column */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-tight mb-8">
                        Start a <br />
                        <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            project
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed">
                        Tell us what you are building.
                        <br />
                        We engineer genies from code.
                    </p>
                </div>

                {/* Right Column: Form */}
                <div className="flex items-center">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-10">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jane Doe"
                            required
                            className="w-full bg-transparent border border-white/10 py-4 text-lg focus:outline-none focus:border-blue-500"
                        />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jane@company.com"
                            required
                            className="w-full bg-transparent border border-white/10 py-4 text-lg focus:outline-none focus:border-blue-500"
                        />

                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe your engineering needs..."
                            required
                            className="w-full bg-transparent border border-white/10 py-4 text-lg focus:outline-none focus:border-blue-500 resize-none"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 px-10 rounded-md transition-all"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default App;