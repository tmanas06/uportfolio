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
    <div className="container-main py-6 flex flex-col gap-8">
      {/* Spacer for visual separation from header */}
      <div className="h-4" />

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-6"
      >
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-24 h-24 rounded-2xl gradient-gold flex items-center justify-center flex-shrink-0 glow-gold">
            <span className="text-[#0A0E17] font-bold text-4xl">M</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F6F5]">
                {personalInfo.name}
              </h1>
              <span className="badge badge-success">Available for hire</span>
            </div>
            <p className="text-lg text-[#F0B90B] mb-3">{personalInfo.title}</p>
            <p className="text-[#848E9C] mb-4">{personalInfo.summary}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#848E9C]">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {education.cgpa} CGPA
              </span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-[#F5F6F5] mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#F0B90B]" />
          Education
        </h2>
        <div className="p-4 rounded-xl bg-[#1E2735]">
          <h3 className="font-semibold text-[#F5F6F5]">{education.degree}</h3>
          <p className="text-[#F0B90B] text-sm">{education.university}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-[#848E9C]">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {education.period}
            </span>
            <span className="badge badge-gold">CGPA: {education.cgpa}</span>
          </div>
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-[#F5F6F5] mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#00D4AA]" />
          Experience
        </h2>
        <div className="flex flex-col gap-4">
          {experience.map((exp, index) => (
            <div
              key={exp.title + exp.company}
              className="p-4 rounded-xl bg-[#1E2735] border-l-2"
              style={{ borderColor: exp.current ? "#00D4AA" : "#F0B90B" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-[#F5F6F5]">{exp.title}</h3>
                  <p className="text-[#F0B90B] text-sm">{exp.company}</p>
                </div>
                {exp.current && <span className="badge badge-success">Current</span>}
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-[#848E9C] mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-sm text-[#848E9C] flex items-start gap-2">
                    <span className="text-[#F0B90B] mt-1">•</span>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-[#F5F6F5] mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#F0B90B]" />
          Hackathon Wins
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="p-4 rounded-xl bg-[#1E2735] flex items-center gap-4"
            >
              <span className="text-3xl">
                {achievement.icon === "gold"
                  ? "🥇"
                  : achievement.icon === "silver"
                  ? "🥈"
                  : "🥉"}
              </span>
              <div>
                <h3 className="font-semibold text-[#F5F6F5]">{achievement.title}</h3>
                <p className="text-sm text-[#F0B90B]">{achievement.position}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-[#F5F6F5] mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#627EEA]" />
          Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="p-4 rounded-xl bg-[#1E2735] flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-[#F5F6F5] text-sm">{cert.name}</h3>
                <p className="text-xs text-[#848E9C]">{cert.issuer} • {cert.year}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[#848E9C]" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
