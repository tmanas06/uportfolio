"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Code,
  Briefcase,
  Sparkles,
  Trophy,
  GraduationCap,
  Boxes,
  FileText,
  Mail,
  ChevronRight,
  Github,
  Linkedin,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";
import {
  personalInfo,
  metrics,
  projects,
  achievements,
  quickActions,
  chains,
} from "@/lib/data";
import { useEffect, useState } from "react";

const iconMap: { [key: string]: React.ReactNode } = {
  code: <Code className="w-5 h-5" />,
  briefcase: <Briefcase className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
  academic: <GraduationCap className="w-5 h-5" />,
  cube: <Boxes className="w-5 h-5" />,
  document: <FileText className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
};

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="container-v2 py-8 sm:py-12 flex flex-col gap-8 sm:gap-16">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card p-6 sm:p-10 rounded-[2rem] overflow-hidden relative group w-full"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[100px] -mr-32 -mt-32 group-hover:bg-yellow-500/10 transition-colors duration-700" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_50px_-12px_rgba(240,185,11,0.5)] group-hover:scale-105 transition-transform duration-500">
            <span className="text-black font-bold text-5xl sm:text-6xl font-heading">
              {personalInfo.firstName[0]}
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
              <h1 className="text-3xl sm:text-5xl font-bold font-heading text-[var(--text-primary)]">
                {personalInfo.name}
              </h1>
              <span className="badge-v2 badge-v2-gold animate-pulse">Available for Projects</span>
            </div>
            <p className="text-lg sm:text-2xl text-secondary max-w-2xl mb-8 leading-relaxed">
              {personalInfo.title}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 border border-white/5 transition-all duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 border border-white/5 transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 border border-white/5 transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </a>
              <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />
              <Link href="/contact" className="btn-premium btn-gold py-3 px-6 rounded-2xl text-sm">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-v2 group p-4 glass-card rounded-2xl text-center">
            <p className="metric-v2-value text-2xl sm:text-3xl group-hover:gold-text transition-all duration-300">
              {metric.value}
            </p>
            <p className="metric-v2-label text-[10px] sm:text-xs">
              {metric.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Main Content Sections */}
      <div className="grid lg:grid-cols-12 gap-12 sm:gap-16">
        {/* Left Column - Projects */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          <section>
            <div className="flex items-center justify-center sm:justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading flex items-center gap-3 text-center">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Featured Projects
              </h2>
              <Link
                href="/projects"
                className="hidden sm:flex text-sm font-semibold text-yellow-500 items-center gap-1 hover:gap-2 transition-all"
              >
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-6 rounded-3xl flex flex-col h-full group/card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover/card:text-yellow-500 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-muted group-hover/card:text-white transition-colors" />
                  </div>
                  <p className="text-secondary mb-6 line-clamp-3 text-sm flex-1 text-center sm:text-left break-words">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md text-secondary border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-center sm:justify-start mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading flex items-center gap-3 text-center">
                <Boxes className="w-6 h-6 text-yellow-500" />
                Ecosystems
              </h2>
            </div>
            <div className="glass-card p-8 rounded-3xl overflow-hidden relative group/marquee">
              {/* Gradient Masks */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

              <div className="flex overflow-hidden">
                <motion.div
                  className="flex gap-8 px-4"
                  animate={{ x: "-50%" }}
                  transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  whileHover={{ animationPlayState: "paused" }} // Note: Framer Motion handles this differently, but we can stick to simple CSS pause if needed, or just let it run. For true pause on hover with simple Framer Motion loop, it's tricky without controlling the time. Let's stick to a smooth continuous loop first. Alternatively, we can use a duplicated array.
                >
                  {[...chains, ...chains, ...chains, ...chains].map((chain, index) => (
                    <div key={`${chain.name}-${index}`} className="flex flex-col items-center gap-4 min-w-[100px] shrink-0 group/chain cursor-pointer">
                      <div
                        className="w-20 h-20 rounded-3xl flex items-center justify-center bg-white/5 border border-white/10 shadow-lg transition-all duration-500 group-hover/chain:scale-110 group-hover/chain:-translate-y-2 group-hover/chain:border-white/20"
                        style={{
                          boxShadow: `0 10px 30px -10px ${chain.color}33`
                        }}
                      >
                        <img
                          src={chain.logo}
                          alt={chain.fullName}
                          className="w-10 h-10 object-contain drop-shadow-md"
                        />
                      </div>
                      <span className="text-xs font-bold text-secondary group-hover/chain:text-white transition-colors uppercase tracking-wider">{chain.fullName}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - sidebar-like content */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          <section>
            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center justify-center lg:justify-start gap-3 text-center">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Achievements
            </h2>
            <div className="flex flex-col gap-4">
              {achievements.slice(0, 3).map((achievement) => (
                <div
                  key={achievement.title}
                  className="glass-card p-5 rounded-2xl flex items-center gap-4 group/win"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl shrink-0">
                    {achievement.icon === "gold" ? "🥇" : achievement.icon === "silver" ? "🥈" : "🥉"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate group-hover/win:text-yellow-500 transition-colors">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-secondary mt-1">{achievement.position}</p>
                  </div>
                </div>
              ))}
              <Link href="/about" className="text-center text-sm font-semibold text-muted hover:text-yellow-500 transition-colors mt-2">
                View all achievements
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center justify-center lg:justify-start gap-3 text-center">
              <Mail className="w-6 h-6 text-yellow-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.slice(0, 4).map((action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className="glass-card p-4 rounded-2xl flex flex-col items-center gap-3 text-center group/action"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover/action:scale-110"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <span style={{ color: action.color }}>{iconMap[action.icon]}</span>
                  </div>
                  <span className="text-xs font-bold text-secondary group-hover/action:text-white">
                    {action.label}
                  </span>
                </Link>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="glass-card p-4 rounded-2xl flex flex-col items-center gap-3 text-center group/action cursor-pointer col-span-2 md:col-span-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover/action:scale-110 bg-yellow-500/10"
                >
                  {mounted && (theme === "dark" ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-yellow-500" />
                  ))}
                  {!mounted && <Sun className="w-5 h-5 text-yellow-500" />}
                </div>
                <span className="text-xs font-bold text-secondary group-hover/action:text-white">
                  {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card p-10 sm:p-16 rounded-[3rem] text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6">
            Building the <span className="gold-text">Decentralized Future</span>
          </h2>
          <p className="text-secondary text-lg mb-10">
            I'm currently looking for new opportunities and collaborations in the Web3 space.
            Let's build something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-premium btn-gold w-full sm:w-auto px-10">
              Hire Me
            </Link>
            <Link href="/projects" className="btn-premium btn-outline w-full sm:w-auto px-10">
              View Work
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
