"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Trophy,
  Code2,
  Layers,
  ArrowRight,
  ArrowDown,
  Star,
  GitFork,
  Terminal,
  Server,
  Link2,
  Wrench,
} from "lucide-react";
import {
  personalInfo,
  metrics,
  projects,
  achievements,
  chains,
  techStackGrid,
} from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  layers: <Layers className="w-6 h-6" />,
  server: <Server className="w-6 h-6" />,
  link: <Link2 className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
};

export default function HomePage() {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="space-y-0">

      {/* ═══════════════════════════════════════════
          HERO — 100vh
          ═══════════════════════════════════════════ */}
      <section
        id="hero"
        className="min-h-[100vh] flex flex-col items-center justify-center px-5 sm:px-8 relative"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 border-[3px] border-[var(--border-color)] px-5 py-2 mb-8">
            <span className="w-3 h-3 bg-[var(--accent)]" />
            <span className="text-[0.875rem] font-black text-[var(--text-primary)] uppercase tracking-[0.2em] font-mono">
              Open to Work
            </span>
          </div>

          {/* Name */}
          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] font-black tracking-tight leading-[0.95] uppercase font-heading text-[var(--text-primary)]">
            {personalInfo.handle}
          </h1>

          {/* Tagline */}
          <p className="text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] font-black text-[var(--accent)] mt-4 uppercase tracking-wide font-heading">
            {personalInfo.tagline}
          </p>

          {/* Summary */}
          <p className="text-[1rem] sm:text-[1.125rem] text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto font-mono leading-relaxed prose-container">
            {personalInfo.summary}
          </p>

          {/* 2 CTAs only */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a
              href="#projects"
              className="brutal-btn brutal-btn-accent text-[1rem]"
            >
              <Code2 className="w-5 h-5" /> View Projects
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn brutal-btn-outline text-[1rem]"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#stats" className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            <span className="text-[0.75rem] font-black uppercase tracking-[0.2em] font-mono">Scroll</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          METRICS GRID
          ═══════════════════════════════════════════ */}
      <section id="stats" className="container-v2 py-20 sm:py-28">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-4 mb-12">
            <Terminal className="w-6 h-6 text-[var(--accent)]" />
            <h2 className="text-[1.5rem] sm:text-[2rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
              /// System_Stats
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                className="border-[3px] border-[var(--border-color)] p-5 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all"
              >
                <div className="text-[2rem] sm:text-[2.5rem] font-black text-[var(--accent)] font-heading">
                  {metric.value}
                </div>
                <div className="text-[0.75rem] font-black text-[var(--text-muted)] mt-2 uppercase tracking-[0.15em] font-mono">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED PROJECTS
          ═══════════════════════════════════════════ */}
      <section id="projects" className="container-v2 py-20 sm:py-28">
        <motion.div {...fadeUp}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <Code2 className="w-6 h-6 text-[var(--accent)]" />
              <h2 className="text-[1.5rem] sm:text-[2rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
                /// Selected_Works
              </h2>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-2 text-[0.875rem] font-black text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors uppercase tracking-widest"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {featuredProjects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
                className="border-[4px] border-[var(--border-color)] shadow-[6px_6px_0px_var(--shadow-color)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_var(--shadow-color)] transition-all group flex flex-col"
              >
                {/* Title Bar */}
                <div className="px-5 py-3 bg-[var(--accent)] border-b-[4px] border-[var(--border-color)] flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-2)]" />
                    <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-3)]" />
                    <div className="w-3 h-3 border-[2px] border-black bg-white" />
                  </div>
                  <span className="text-[0.75rem] font-black text-black uppercase tracking-widest font-mono">
                    PROJECT_{String(project.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Body */}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-[1.125rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-[0.9375rem] text-[var(--text-secondary)] mt-3 leading-relaxed line-clamp-2 font-mono">
                    {project.description}
                  </p>

                  {/* Impact Line */}
                  <p className="text-[0.875rem] font-black text-[var(--accent-2)] mt-3 font-mono">
                    ⚡ {project.impact}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-[0.75rem] font-black text-[var(--text-primary)] px-3 py-1.5 border-[2px] border-[var(--border-color)] uppercase tracking-widest font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-5 border-t-[2px] border-[var(--border-color)]">
                    <div className="flex items-center gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[0.875rem] font-black text-[var(--text-primary)] border-[2px] border-[var(--border-color)] px-3 py-2 hover:bg-[var(--accent)] hover:text-black transition-all uppercase tracking-widest"
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[0.875rem] font-black text-black bg-[var(--accent)] border-[2px] border-[var(--border-color)] px-3 py-2 hover:bg-[var(--accent-2)] hover:text-white transition-all uppercase tracking-widest"
                        >
                          <ExternalLink className="w-4 h-4" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          TECH STACK — 4-card grid
          ═══════════════════════════════════════════ */}
      <section id="stack" className="container-v2 py-20 sm:py-28">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-4 mb-12">
            <Layers className="w-6 h-6 text-[var(--accent)]" />
            <h2 className="text-[1.5rem] sm:text-[2rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
              /// Tech_Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {techStackGrid.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                className="border-[4px] border-[var(--border-color)] shadow-[6px_6px_0px_var(--shadow-color)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_var(--shadow-color)] transition-all"
              >
                {/* Header */}
                <div className="px-5 py-3 bg-[var(--accent)] border-b-[4px] border-[var(--border-color)] flex items-center gap-3">
                  <span className="text-black">
                    {categoryIcons[group.icon]}
                  </span>
                  <span className="text-[0.875rem] font-black text-black uppercase tracking-widest font-mono">
                    {group.category}
                  </span>
                </div>

                {/* Items */}
                <div className="p-5 space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[1rem] font-bold text-[var(--text-primary)] font-mono"
                    >
                      <span className="w-2 h-2 bg-[var(--accent)] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          ECOSYSTEM MARQUEE
          ═══════════════════════════════════════════ */}
      <section className="container-v2 py-20 sm:py-28">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-4 mb-8">
            <Link2 className="w-6 h-6 text-[var(--accent)]" />
            <h2 className="text-[1.5rem] sm:text-[2rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
              /// Ecosystems
            </h2>
          </div>

          <div className="border-[3px] border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] overflow-hidden">
            <div className="py-6 overflow-hidden">
              <div className="marquee-track gap-8">
                {[...chains, ...chains].map((chain, idx) => (
                  <div
                    key={`${chain.name}-${idx}`}
                    className="flex items-center gap-4 px-6 py-3 border-[2px] border-[var(--border-color)] hover:bg-[var(--accent)] hover:text-black transition-all flex-shrink-0 group cursor-default"
                  >
                    <Image
                      src={chain.logo}
                      alt={chain.name}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                    <span className="text-[0.875rem] font-black text-[var(--text-primary)] uppercase tracking-widest whitespace-nowrap group-hover:text-black font-mono">
                      {chain.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          ACHIEVEMENTS
          ═══════════════════════════════════════════ */}
      <section className="container-v2 py-20 sm:py-28">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="w-6 h-6 text-[var(--accent-2)]" />
            <h2 className="text-[1.5rem] sm:text-[2rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
              /// Achievement_Log
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.slice(0, 6).map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                className="border-[3px] border-[var(--border-color)] p-6 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--accent-2)] border-[2px] border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[1rem] font-black text-[var(--text-primary)] uppercase font-heading">
                      {achievement.title}
                    </h3>
                    <p className="text-[0.875rem] font-black text-[var(--accent)] mt-1 uppercase tracking-widest font-mono">
                      {achievement.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER CTA
          ═══════════════════════════════════════════ */}
      <section className="container-v2 py-24 sm:py-32 pb-28">
        <motion.div
          {...fadeUp}
          className="border-[4px] border-[var(--border-color)] p-8 sm:p-12 shadow-[6px_6px_0px_var(--shadow-color)]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[0.75rem] font-black text-[var(--accent)] uppercase tracking-[0.2em] font-mono mb-2">
                /// Open_To_Work
              </p>
              <h2 className="text-[1.75rem] sm:text-[2.25rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
                Let&apos;s Talk Code.
              </h2>
              <p className="text-[1rem] text-[var(--text-secondary)] mt-2 font-mono">
                Available for freelance, internships, and collaborations.
              </p>
            </div>
            <Link
              href="/contact"
              className="brutal-btn brutal-btn-accent text-[1rem] flex-shrink-0"
            >
              Contact <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
