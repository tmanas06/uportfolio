"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Trophy,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
} from "lucide-react";
import { personalInfo, education, experience, achievements, certifications } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="container-v2 py-8 sm:py-12 flex flex-col gap-8 sm:gap-16">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card p-8 sm:p-10 rounded-[2rem] overflow-hidden relative group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[100px] -mr-32 -mt-32 group-hover:bg-yellow-500/10 transition-colors duration-700" />

        <div className="flex flex-col items-center sm:items-start gap-6 sm:gap-8 relative z-10 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
            <span className="text-black font-bold text-4xl sm:text-5xl font-heading">
              {personalInfo.firstName[0]}
            </span>
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-4">
              <h1 className="text-2xl sm:text-4xl font-bold font-heading text-[var(--text-primary)]">
                {personalInfo.name}
              </h1>
              <span className="badge-v2 badge-v2-gold animate-pulse">Available for hire</span>
            </div>
            <p className="text-lg sm:text-xl text-yellow-500 font-medium mb-4">{personalInfo.title}</p>
            <p className="text-secondary text-base sm:text-lg max-w-3xl mb-6 leading-relaxed">
              {personalInfo.summary}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 text-sm text-secondary">
              <span className="flex items-center gap-2 group/info">
                <MapPin className="w-4 h-4 text-yellow-500 group-hover/info:scale-110 transition-transform" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-2 group/info">
                <GraduationCap className="w-4 h-4 text-yellow-500 group-hover/info:scale-110 transition-transform" />
                {education.cgpa} CGPA
              </span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-8">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:text-[var(--text-primary)] hover:bg-white/10 border border-white/5 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:text-[var(--text-primary)] hover:bg-white/10 border border-white/5 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:text-[var(--text-primary)] hover:bg-white/10 border border-white/5 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-card p-6 sm:p-8 rounded-3xl"
        >
          <h2 className="text-2xl font-bold font-heading text-white mb-6 flex items-center justify-center lg:justify-start gap-3 text-center">
            <GraduationCap className="w-6 h-6 text-yellow-500" />
            Education
          </h2>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-yellow-500/30 transition-colors text-center lg:text-left">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{education.degree}</h3>
            <p className="text-yellow-500 font-medium mb-4">{education.university}</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-secondary">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {education.period}
              </span>
              <span className="badge-v2 badge-v2-gold text-[10px]">CGPA: {education.cgpa}</span>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-6 sm:p-8 rounded-3xl"
        >
          <h2 className="text-2xl font-bold font-heading text-white mb-6 flex items-center justify-center lg:justify-start gap-3 text-center">
            <Award className="w-6 h-6 text-yellow-500" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-yellow-500/20 flex items-center gap-4 group/cert transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center p-2 group-hover/cert:scale-110 transition-transform duration-500">
                  {cert.logo ? (
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="w-full h-full object-contain filter brightness-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-xs text-muted">Cert</span>';
                      }}
                    />
                  ) : (
                    <Award className="w-6 h-6 text-muted" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[var(--text-primary)] text-sm group-hover/cert:text-yellow-500 transition-colors uppercase tracking-tight">{cert.name}</h3>
                  <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-1">{cert.issuer} • {cert.year}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted group-hover/cert:text-white transition-colors" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="glass-card p-8 sm:p-10 rounded-3xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-8 flex items-center justify-center lg:justify-start gap-3 text-center">
          <Briefcase className="w-6 h-6 text-yellow-500" />
          Professional Experience
        </h2>
        <div className="flex flex-col gap-6">
          {experience.map((exp, index) => (
            <div
              key={exp.title + exp.company}
              className="p-6 sm:p-8 rounded-2xl bg-white/5 border-l-4 group/exp hover:bg-white/[0.07] transition-all"
              style={{ borderColor: exp.current ? "#0ECB81" : "#F0B90B" }}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 group-hover/exp:scale-110 transition-transform duration-500 shadow-xl overflow-hidden backdrop-blur-sm">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-full h-full object-contain filter brightness-125"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-xl font-bold text-muted">${exp.company[0]}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-muted group-hover/exp:text-yellow-500 transition-colors">{exp.company[0]}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[var(--text-primary)] group-hover/exp:text-yellow-500 transition-colors tracking-tight">{exp.title}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                      <p className="text-yellow-500 font-bold uppercase tracking-widest text-xs">{exp.company}</p>
                      {exp.current && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                    </div>
                  </div>
                </div>
                {exp.current && <span className="badge-v2 badge-v2-gold text-[10px] uppercase font-black">Active Role</span>}
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-secondary mb-6">
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
              </div>
              <ul className="flex flex-col gap-3">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-secondary flex items-start gap-3 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50 mt-2 shrink-0" />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card p-8 sm:p-10 rounded-3xl mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-8 flex items-center justify-center gap-3 text-center">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Hackathon Wins & Recognition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-yellow-500/30 flex items-center gap-6 group/win transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl shrink-0 group-hover/win:scale-110 transition-transform duration-500 shadow-inner">
                {achievement.icon === "gold"
                  ? "🥇"
                  : achievement.icon === "silver"
                    ? "🥈"
                    : "🥉"}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover/win:text-yellow-500 transition-colors leading-tight">
                  {achievement.title}
                </h3>
                <p className="text-yellow-500 font-medium text-sm">{achievement.position}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
