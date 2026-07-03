"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, Github, Linkedin, Mail, ExternalLink,
  Trophy, MapPin, GraduationCap, Twitter, Youtube,
} from "lucide-react";
import { personalInfo, metrics, projects, achievements, techStackGrid, education, educationList } from "@/lib/data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.2, 0, 0, 1] as [number, number, number, number], delay },
});


const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: "64px" }}>

        {/* Background Spotlight */}
        <div className="spotlight" style={{ top: "-150px", left: "50%", transform: "translateX(-50%)" }} />

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="hero-section">
          <motion.div {...fade(0)}>
            <span className="status-pill" style={{ marginBottom: "28px", display: "inline-flex" }}>
              Available for work
            </span>
          </motion.div>

          <motion.div {...fade(0.05)} className="hero-grid">
            {/* Text */}
            <div className="hero-text-col">
              <h1 className="hero-title text-gradient">
                T Manas Chakravarty
              </h1>

              <p className="hero-tagline" style={{ fontSize: "14px", lineHeight: "1.4" }}>
                {personalInfo.tagline}
              </p>

              <p className="hero-bio">
                Final-year B.Tech CSE student at KL University with <strong>9.44 CGPA</strong>.
                I build scalable full-stack applications, smart contracts, and Solana dApps across
                7+ blockchain ecosystems. 15+ internships, 5 hackathon wins.
              </p>

              <div className="hero-actions">
                <Link href="/projects" className="btn btn-primary" id="hero-works">
                  View Projects <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="btn btn-secondary" id="hero-contact">
                  Get in touch
                </Link>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="GitHub profile">
                  <Github size={16} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="LinkedIn profile">
                  <Linkedin size={16} />
                </a>
                <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="Twitter / X profile">
                  <Twitter size={16} />
                </a>
                <a href={personalInfo.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="YouTube channel">
                  <Youtube size={16} />
                </a>
                <a href={personalInfo.dorahacks} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="DoraHacks profile" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.02em" }}>
                  DH
                </a>
              </div>

              <div className="hero-location">
                <MapPin size={13} style={{ flexShrink: 0 }} />
                Hyderabad, Telangana, India
              </div>
            </div>

            {/* Photo */}
            <motion.div {...fade(0.1)} className="hero-photo-col">
              <div className="hero-photo-frame">
                <Image
                  src="/my_transparent.png"
                  alt="Manas Chakravarty"
                  fill
                  sizes="(max-width: 768px) 70vw, 35vw"
                  className="object-cover"
                  style={{ objectPosition: "top" }}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <div className="section-divider" />

        {/* ── STATS ────────────────────────────────────────── */}
        <motion.section {...fade(0.1)} style={{ paddingBottom: "64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
            {metrics.map((m) => (
              <div key={m.label} className="stat-box">
                <div className="stat-num">{m.value}</div>
                <div className="stat-label">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="section-divider" />

        {/* ── FEATURED PROJECTS ─────────────────────────────── */}
        <motion.section {...fade(0.12)} style={{ paddingBottom: "64px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <span className="section-label">Work</span>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <Link
              href="/projects"
              style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}
            >
              All projects <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid-auto">
            {featuredProjects.map((project) => (
              <article key={project.id} className="card" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", marginBottom: "8px", letterSpacing: "-0.2px" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "14px", flex: 1 }}>
                  {project.description}
                </p>
                <p style={{ fontSize: "12px", color: "var(--accent)", marginBottom: "14px", fontWeight: 500 }}>
                  ↗ {project.impact}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="tag" style={{ color: "var(--text-faint)" }}>+{project.tech.length - 3}</span>
                  )}
                </div>
                <div style={{ display: "flex", gap: "8px", borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ gap: "5px" }}>
                    <Github size={13} /> Code
                  </a>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ gap: "5px" }}>
                      <ExternalLink size={13} /> Live
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <div className="section-divider" />

        {/* ── TECH STACK ───────────────────────────────────── */}
        <motion.section {...fade(0.14)} style={{ paddingBottom: "64px" }}>
          <span className="section-label">Skills</span>
          <h2 className="section-title" style={{ marginBottom: "32px" }}>Tech Stack</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
            {techStackGrid.map((group) => (
              <div key={group.category} className="card" style={{ padding: "20px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                  {group.category}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {group.items.map((item) => (
                    <div key={item} style={{ fontSize: "13px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--border-hover)", flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="section-divider" />

        {/* ── ACHIEVEMENTS ─────────────────────────────────── */}
        <motion.section {...fade(0.16)} style={{ paddingBottom: "64px" }}>
          <span className="section-label">Recognition</span>
          <h2 className="section-title" style={{ marginBottom: "32px" }}>Hackathon Wins</h2>

          <div className="grid-3">
            {achievements.map((a, i) => (
              <div key={i} className="card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "8px", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: a.icon === "gold" ? "rgba(251,191,36,0.12)" : a.icon === "silver" ? "rgba(148,163,184,0.12)" : "rgba(180,120,60,0.12)",
                }}>
                  <Trophy size={16} style={{ color: a.icon === "gold" ? "#FBBF24" : a.icon === "silver" ? "#94A3B8" : "#B47C3C" }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", lineHeight: 1.3, marginBottom: "3px" }}>{a.title}</p>
                  <p style={{ fontSize: "11px", color: a.icon === "gold" ? "#FBBF24" : "var(--text-muted)", fontWeight: 600 }}>{a.position}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="section-divider" />

        {/* ── EDUCATION ────────────────────────────────────── */}
        <motion.section {...fade(0.18)} style={{ paddingBottom: "64px" }}>
          <span className="section-label">Education</span>
          <h2 className="section-title" style={{ marginBottom: "24px" }}>Academic Background</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {educationList.map((edu, idx) => (
              <div key={idx} className="card" style={{ padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <GraduationCap size={20} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", marginBottom: "2px" }}>{edu.degree}</p>
                  <p style={{ fontSize: "14px", color: "var(--accent)", marginBottom: "8px", fontWeight: 500 }}>{edu.institution}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                    <span className="tag">{edu.period}</span>
                    <span className="tag" style={{ color: "var(--text-muted)" }}>{edu.details}</span>
                    {edu.skills && edu.skills.length > 0 && (
                      <span className="tag" style={{ color: "var(--text-faint)" }}>Skills: {edu.skills.join(", ")}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="section-divider" />

        {/* ── CTA ──────────────────────────────────────────── */}
        <motion.section {...fade(0.2)} style={{ paddingBottom: "80px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", marginBottom: "12px" }}>
            Let&apos;s work together
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "15px", marginBottom: "28px", maxWidth: "48ch", margin: "0 auto 28px" }}>
            Available for smart contract development, full-stack projects, and Web3 integrations.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary" id="cta-contact">
              <Mail size={15} /> Contact me
            </Link>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Github size={15} /> GitHub
            </a>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
