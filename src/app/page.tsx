"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Trophy,
  Briefcase,
  Code2,
  Layers,
  ArrowRight,
  Star,
  GitFork,
  Globe,
  Sun,
  Moon,
  Zap,
  Terminal,
  Box,
  ChevronRight,
} from "lucide-react";
import {
  personalInfo,
  metrics,
  projects,
  achievements,
  chains,
} from "@/lib/data";

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="container-v2 py-10 sm:py-16 space-y-12 sm:space-y-16 pb-24">

      {/* ═══ HERO / PROFILE CARD ═══ */}
      <motion.div {...fadeUp} className="border-[3px] border-[var(--border-color)] p-6 sm:p-10 overflow-hidden relative shadow-[6px_6px_0px_var(--shadow-color)]">

        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="absolute top-6 right-6 z-20 w-12 h-12 border-[3px] border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black transition-all shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--shadow-color)]"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative w-28 h-28 sm:w-36 sm:h-36 border-[4px] border-[var(--border-color)] shadow-[6px_6px_0px_var(--shadow-color)] flex-shrink-0 overflow-hidden"
          >
            <Image
              src="/my.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black text-[var(--accent)] border-[2px] border-[var(--accent)] px-3 py-1 uppercase tracking-[0.2em]">
                /// ACTIVE
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase font-heading text-[var(--text-primary)]">
              {personalInfo.name}
            </h1>
            <p className="text-lg sm:text-xl font-bold text-[var(--accent)] mt-3 uppercase tracking-wide font-heading">
              {personalInfo.title}
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed max-w-2xl font-mono">
              {personalInfo.summary}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 mt-6">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[var(--accent)] text-black font-black text-xs border-[3px] border-[var(--border-color)] shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-widest">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 border-[3px] border-[var(--border-color)] text-[var(--text-primary)] font-black text-xs shadow-[3px_3px_0px_var(--shadow-color)] hover:bg-[var(--accent)] hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-widest">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <Link href="/contact" className="flex items-center gap-2 px-5 py-3 border-[3px] border-[var(--border-color)] text-[var(--text-primary)] font-black text-xs shadow-[3px_3px_0px_var(--shadow-color)] hover:bg-[var(--accent)] hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-widest">
                <Mail className="w-4 h-4" /> Contact
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ METRICS GRID ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Terminal className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">/// System_Stats</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              className="border-[3px] border-[var(--border-color)] p-5 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all"
            >
              <div className="text-3xl sm:text-4xl font-black text-[var(--accent)] font-heading">{metric.value}</div>
              <div className="text-[10px] font-black text-[var(--text-muted)] mt-2 uppercase tracking-[0.15em] font-mono">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ═══ FEATURED PROJECTS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Code2 className="w-5 h-5 text-[var(--accent)]" />
            <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">/// Selected_Works</h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-xs font-black text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors uppercase tracking-widest"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {featuredProjects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
              className="border-[3px] border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all group"
            >
              {/* Project Header Bar */}
              <div className="px-5 py-3 bg-[var(--accent)] border-b-[3px] border-[var(--border-color)] flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-2)]" />
                  <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-3)]" />
                  <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent)]" />
                </div>
                <span className="text-[10px] font-black text-black uppercase tracking-widest font-mono">
                  PROJECT_{String(project.id).padStart(2, '0')}
                </span>
              </div>

              {/* Project Body */}
              <div className="p-6">
                <h3 className="text-xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed line-clamp-2 font-mono">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-[10px] font-black text-[var(--text-primary)] px-3 py-1.5 border-[2px] border-[var(--border-color)] uppercase tracking-widest font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t-[2px] border-[var(--border-color)]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <Star className="w-3.5 h-3.5" />
                      <span className="text-xs font-black font-mono">{project.metrics?.stars || 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <GitFork className="w-3.5 h-3.5" />
                      <span className="text-xs font-black font-mono">{project.metrics?.forks || 0}</span>
                    </div>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black text-[var(--accent)] hover:text-[var(--accent-2)] uppercase tracking-widest transition-colors"
                  >
                    Source <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ═══ ECOSYSTEM MARQUEE ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <Layers className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">/// Ecosystems</h2>
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
                  <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest whitespace-nowrap group-hover:text-black font-mono">
                    {chain.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ ACHIEVEMENTS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <Trophy className="w-5 h-5 text-[var(--accent-2)]" />
          <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">/// Achievement_Log</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.slice(0, 6).map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.05, duration: 0.3 }}
              className="border-[3px] border-[var(--border-color)] p-5 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--accent-2)] border-[2px] border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-black text-[var(--text-primary)] uppercase font-heading truncate">{achievement.title}</h3>
                  <p className="text-[10px] font-black text-[var(--accent)] mt-1 uppercase tracking-widest font-mono">{achievement.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ═══ FOOTER CTA ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="border-[3px] border-[var(--border-color)] p-8 sm:p-12 shadow-[6px_6px_0px_var(--shadow-color)]"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.2em] font-mono mb-2">/// Open_To_Work</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
              Let&apos;s Talk Code.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2 font-mono">
              Available for freelance, internships, and collaborations.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-black font-black text-sm border-[3px] border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-widest flex-shrink-0"
          >
            <Mail className="w-5 h-5" /> Contact <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
