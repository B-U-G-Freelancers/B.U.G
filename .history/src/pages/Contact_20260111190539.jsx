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
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 py-24 md:py-32">
      {/* Left Column */}
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-tight mb-8">
          Start a <br />
          <span className="text-accent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
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
            className="w-full bg-transparent border border-white/10 py-4 text-lg focus:outline-none focus:border-accent"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            required
            className="w-full bg-transparent border border-white/10 py-4 text-lg focus:outline-none focus:border-accent"
          />

          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your engineering needs..."
            required
            className="w-full bg-transparent border border-white/10 py-4 text-lg focus:outline-none focus:border-accent resize-none"
          />

          <button
            type="submit"
            className="bg-accent hover:bg-accent-soft text-white font-bold py-5 px-10 rounded-md transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
