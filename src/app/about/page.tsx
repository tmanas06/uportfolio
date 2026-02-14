"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Trophy,
  Award,
  ExternalLink,
  Calendar,
  Globe,
  ChevronRight,
  Terminal,
  Zap,
} from "lucide-react";
import {
  personalInfo,
  education,
  experience,
  achievements,
  certifications,
} from "@/lib/data";

export default function AboutPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  return (
    <div className="container-v2 py-10 sm:py-16 space-y-12 sm:space-y-16 pb-24">

      {/* ═══ PROFILE HEADER ═══ */}
      <motion.div {...fadeUp} className="border-[3px] border-[var(--border-color)] shadow-[6px_6px_0px_var(--shadow-color)] overflow-hidden">
        {/* Title Bar */}
        <div className="px-6 py-3 bg-[var(--accent)] border-b-[3px] border-[var(--border-color)] flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-2)]" />
            <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-3)]" />
            <div className="w-3 h-3 border-[2px] border-black bg-white" />
          </div>
          <span className="text-[10px] font-black text-black uppercase tracking-widest font-mono">/// PROFILE_DATA.tsx</span>
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 border-[4px] border-[var(--border-color)] shadow-[6px_6px_0px_var(--shadow-color)] flex-shrink-0 overflow-hidden">
              <Image
                src="/my.jpg"
                alt={personalInfo.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-tight text-[var(--text-primary)]">
                {personalInfo.name}
              </h1>
              <p className="text-lg font-bold text-[var(--accent)] mt-2 uppercase font-heading">
                {personalInfo.title}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed max-w-2xl font-mono">
                {personalInfo.summary}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 mt-6">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-xs font-black text-[var(--text-muted)] border-[2px] border-[var(--border-color)] px-4 py-2 hover:bg-[var(--accent)] hover:text-black transition-all uppercase tracking-widest">
                    <Mail className="w-3.5 h-3.5" /> {personalInfo.email}
                  </a>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-2 text-xs font-black text-[var(--text-muted)] border-[2px] border-[var(--border-color)] px-4 py-2 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" /> {personalInfo.location}
                  </span>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-4">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-[2px] border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent)] hover:text-black transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-[2px] border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent)] hover:text-black transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                {personalInfo.blog && (
                  <a href={personalInfo.blog} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-[2px] border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent)] hover:text-black transition-all">
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ EDUCATION ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <GraduationCap className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">/// Education</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            className="border-[3px] border-[var(--border-color)] p-6 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all"
          >
            <h3 className="text-base font-black text-[var(--text-primary)] uppercase font-heading">{education.degree}</h3>
            <p className="text-sm font-bold text-[var(--accent)] mt-1 font-mono">{education.university}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] font-mono">
                <Calendar className="w-3.5 h-3.5" /> {education.period}
              </span>
              <span className="text-xs font-black text-[var(--accent)] border-[2px] border-[var(--accent)] px-2 py-0.5 uppercase font-mono">
                CGPA: {education.cgpa}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ CERTIFICATIONS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Award className="w-5 h-5 text-[var(--accent-3)]" />
          <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">/// Certifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="border-[3px] border-[var(--border-color)] p-6 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all group"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-black text-[var(--text-primary)] uppercase font-heading">{cert.name}</h3>
                <p className="text-xs font-bold text-[var(--accent)] mt-1 uppercase font-mono">{cert.issuer}</p>
                <p className="text-[10px] font-bold text-[var(--text-muted)] mt-1 font-mono">{cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══ EXPERIENCE ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Briefcase className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">/// Experience_Log</h2>
        </div>

        <div className="space-y-5">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.05, duration: 0.4 }}
              className="border-[3px] border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all overflow-hidden"
            >
              {/* Accent left border indicator */}
              <div className="flex">
                <div className={`w-2 flex-shrink-0 ${exp.current ? 'bg-[var(--accent)]' : 'bg-[var(--accent-2)]'}`} />
                <div className="p-6 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="text-lg font-black text-[var(--text-primary)] uppercase font-heading">{exp.title}</h3>
                    {exp.current && (
                      <span className="text-[10px] font-black text-black bg-[var(--accent)] border-[2px] border-[var(--border-color)] px-3 py-1 uppercase tracking-widest self-start">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-sm font-bold text-[var(--accent)] font-mono">{exp.company}</span>
                    <span className="w-1 h-1 bg-[var(--text-muted)]" />
                    <span className="text-xs font-bold text-[var(--text-muted)] font-mono">{exp.period}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed font-mono">
                    {Array.isArray(exp.description) ? exp.description.join(' • ') : exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ═══ HACKATHON WINS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Trophy className="w-5 h-5 text-[var(--accent-2)]" />
          <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">/// Hackathon_Wins</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.04, duration: 0.3 }}
              className="border-[3px] border-[var(--border-color)] p-5 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--accent-2)] border-[2px] border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-black text-[var(--text-primary)] uppercase font-heading">{achievement.title}</h3>
                  <p className="text-[10px] font-black text-[var(--accent)] mt-1 uppercase tracking-widest font-mono">{achievement.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
