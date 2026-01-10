"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";
import {
  personalInfo,
  metrics,
  projects,
  achievements,
  quickActions,
  chains,
} from "@/lib/data";

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

  return (
    <div className="container-v2 py-12 flex flex-col gap-12 sm:gap-16">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card p-8 sm:p-10 rounded-[2rem] overflow-hidden relative group"
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
              <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white">
                {personalInfo.name}
              </h1>
              <span className="badge-v2 badge-v2-gold animate-pulse">Available for Projects</span>
            </div>
            <p className="text-xl sm:text-2xl text-secondary max-w-2xl mb-8 leading-relaxed">
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
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        {metrics.map((metric, idx) => (
          <div key={metric.label} className="metric-v2 group">
            <p className="metric-v2-value group-hover:gold-text transition-all duration-300">
              {metric.value}
            </p>
            <p className="metric-v2-label">
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Featured Projects
              </h2>
              <Link
                href="/projects"
                className="text-sm font-semibold text-yellow-500 flex items-center gap-1 hover:gap-2 transition-all"
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
                    <h3 className="text-xl font-bold text-white group-hover/card:text-yellow-500 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-muted group-hover/card:text-white transition-colors" />
                  </div>
                  <p className="text-secondary mb-6 line-clamp-3 text-sm flex-1">
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading flex items-center gap-3">
                <Boxes className="w-6 h-6 text-yellow-500" />
                Ecosystems
              </h2>
            </div>
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-2">
                {chains.map((chain) => (
                  <div key={chain.name} className="flex flex-col items-center gap-4 min-w-[100px] shrink-0 group/chain">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-sm font-bold text-white shadow-xl transition-all duration-500 group-hover/chain:scale-110 group-hover/chain:-translate-y-2"
                      style={{
                        backgroundColor: chain.color,
                        boxShadow: `0 10px 30px -10px ${chain.color}66`
                      }}
                    >
                      {chain.name}
                    </div>
                    <span className="text-xs font-semibold text-secondary group-hover/chain:text-white transition-colors">{chain.fullName}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - sidebar-like content */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          <section>
            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
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
                    <p className="text-sm font-bold text-white truncate group-hover/win:text-yellow-500 transition-colors">
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
            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
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
