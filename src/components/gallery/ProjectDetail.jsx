import { motion } from "motion/react";
import { ExternalLink, Github, ArrowRight, Calendar, Tag } from "lucide-react";

export default function ProjectDetail({ project }) {
  if (!project) return null;

  return (
    <div className="w-full min-h-full pb-20">
      {/* Hero Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-20 z-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-medium tracking-widest text-blue-300/80 uppercase">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {project.year}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" /> {project.category}
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {project.title}
            </h1>

            <p className="text-xl sm:text-2xl text-white/70 max-w-2xl font-light leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-20 mt-12 sm:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-12">
            {/* Challenge & Solution */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  The Challenge
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  The Solution
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </motion.div>

            {/* Features Grid */}
            {project.features && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Image Gallery (if we had more images, placeholder for now) */}
            {/* <div className="grid grid-cols-2 gap-4"> ... </div> */}
          </div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-10"
          >
            {/* Role & Tech */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Role
                </h4>
                <p className="text-white text-lg">{project.role}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Timeline
                </h4>
                <p className="text-white text-lg">{project.timeline}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(", ").map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full bg-white/10 text-blue-200 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all transform hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" /> Visit Live Site
                  </span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                </a>
              )}

              {/* Optional Repo Link */}
              {/* <a href="#" className="..." > GitHub <Github /> </a> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
