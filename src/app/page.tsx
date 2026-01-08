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
  code: <Code className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  trophy: <Trophy className="w-6 h-6" />,
  academic: <GraduationCap className="w-6 h-6" />,
  cube: <Boxes className="w-6 h-6" />,
  document: <FileText className="w-6 h-6" />,
  mail: <Mail className="w-6 h-6" />,
};

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="container-main py-8 space-y-8">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-6 md:p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl gradient-gold flex items-center justify-center flex-shrink-0 glow-gold">
            <span className="text-[#0A0E17] font-bold text-4xl md:text-5xl">M</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold text-[#F5F6F5]">
                {personalInfo.firstName}
              </h1>
              <span className="badge badge-success">Available</span>
            </div>
            <p className="text-lg md:text-xl text-[#848E9C] mb-5">{personalInfo.title}</p>
            <div className="flex items-center gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-12 h-12 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <p className="metric-value">{metric.value}</p>
            <p className="metric-label">{metric.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-[#F5F6F5]">Quick Access</h2>
          <Link
            href="/about"
            className="text-sm text-[#F0B90B] flex items-center gap-1 hover:underline"
          >
            More <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4 md:gap-6">
          {quickActions.map((action) =>
            action.external ? (
              <a
                key={action.id}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <span style={{ color: action.color }}>{iconMap[action.icon]}</span>
                </div>
                <span className="text-sm md:text-base text-[#848E9C] group-hover:text-[#F5F6F5] transition-colors text-center">
                  {action.label}
                </span>
              </a>
            ) : (
              <Link
                key={action.id}
                href={action.href}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <span style={{ color: action.color }}>{iconMap[action.icon]}</span>
                </div>
                <span className="text-sm md:text-base text-[#848E9C] group-hover:text-[#F5F6F5] transition-colors text-center">
                  {action.label}
                </span>
              </Link>
            )
          )}
        </div>
      </motion.div>

      {/* Chains */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="card p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg md:text-xl font-semibold text-[#F5F6F5]">Building on</h2>
          <span className="text-sm text-[#F0B90B]">{chains.length} Chains</span>
        </div>
        <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-2">
          {chains.map((chain) => (
            <div key={chain.name} className="flex flex-col items-center gap-3 min-w-[70px]">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: chain.color }}
              >
                {chain.name}
              </div>
              <span className="text-xs md:text-sm text-[#848E9C]">{chain.fullName}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Featured Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-[#F5F6F5]">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-[#F0B90B] flex items-center gap-1 hover:underline"
          >
            Show All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {featuredProjects.map((project) => (
            <a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 md:p-6 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] border border-transparent hover:border-[#F0B90B] transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-[#F5F6F5] group-hover:text-[#F0B90B] transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <ExternalLink className="w-5 h-5 text-[#848E9C] flex-shrink-0" />
              </div>
              <p className="text-base text-[#848E9C] line-clamp-2 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="badge badge-gold">
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Recent Wins */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="card p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg md:text-xl font-semibold text-[#F5F6F5] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#F0B90B]" />
            Recent Wins
          </h2>
          <Link
            href="/about"
            className="text-sm text-[#F0B90B] flex items-center gap-1 hover:underline"
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {achievements.slice(0, 3).map((achievement) => (
            <div
              key={achievement.title}
              className="flex items-center gap-5 p-5 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors cursor-pointer"
            >
              <span className="text-3xl flex-shrink-0">
                {achievement.icon === "gold"
                  ? "🥇"
                  : achievement.icon === "silver"
                  ? "🥈"
                  : "🥉"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-base md:text-lg font-medium text-[#F5F6F5] truncate">
                  {achievement.title}
                </p>
                <p className="text-sm text-[#F0B90B]">{achievement.position}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#848E9C] flex-shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 gap-5"
      >
        <Link href="/projects" className="btn btn-gold">
          <Code className="w-5 h-5" />
          View Projects
        </Link>
        <Link href="/contact" className="btn btn-outline">
          <Mail className="w-5 h-5" />
          Contact Me
        </Link>
      </motion.div>
    </div>
  );
}
