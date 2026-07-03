"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, Globe, Briefcase, Calendar, Award, GraduationCap, Trophy, Twitter, Youtube } from "lucide-react";
import { personalInfo, education, experience, achievements, certifications } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="page-wrapper" style={{ position: "relative" }}>
      {/* Background Spotlight */}
      <div className="spotlight" style={{ top: "-100px", left: "50%", transform: "translateX(-50%)" }} />

      <div className="container" style={{ paddingTop: "48px", position: "relative", zIndex: 1 }}>

        {/* ── PAGE HEADER ─── */}
        <div style={{ marginBottom: "48px" }}>
          <span className="section-label">About</span>
          <h1 className="section-title text-gradient">About Me</h1>
          <p className="section-sub">
            Full stack developer and blockchain engineer based in Hyderabad, India.
          </p>
        </div>

        {/* ── PROFILE CARD ─── */}
        <div className="card" style={{ marginBottom: "40px", padding: "32px" }}>
          <div className="profile-card-layout">
            {/* Avatar */}
            <div style={{
              width: 180, height: 180,
              flexShrink: 0,
              position: "relative",
              maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
            }}>
              <Image src="/my_transparent.png" alt={personalInfo.name} fill className="object-cover" style={{ objectPosition: "top" }} />
            </div>

            {/* Info */}
            <div className="profile-info-layout">
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text)", marginBottom: "4px", letterSpacing: "-0.3px" }}>
                {personalInfo.name}
              </h2>
              <p style={{ fontSize: "14px", color: "var(--accent)", fontWeight: 600, marginBottom: "12px" }}>
                {personalInfo.title}
              </p>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: "60ch", marginBottom: "20px" }}>
                {personalInfo.summary}
              </p>

              {/* Meta */}
              <div className="profile-meta-layout">
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <MapPin size={13} /> {personalInfo.location}
                </span>
                <a href={`mailto:${personalInfo.email}`} style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text-muted)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <Mail size={13} /> {personalInfo.email}
                </a>
              </div>

              {/* Social links */}
              <div className="profile-socials-layout">
                {[
                  { href: personalInfo.github,    label: "GitHub",     icon: <Github size={15} /> },
                  { href: personalInfo.linkedin,   label: "LinkedIn",   icon: <Linkedin size={15} /> },
                  { href: personalInfo.twitter,    label: "Twitter",    icon: <Twitter size={15} /> },
                  { href: personalInfo.youtube,    label: "YouTube",    icon: <Youtube size={15} /> },
                  { href: personalInfo.dorahacks,  label: "DoraHacks",  icon: <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.02em" }}>DH</span> },
                  { href: personalInfo.blog,       label: "Blog",       icon: <Globe size={15} /> },
                ].filter(s => s.href).map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="btn btn-secondary" style={{ padding: "7px 14px", gap: "6px", fontSize: "13px" }}
                    aria-label={s.label}
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── EXPERIENCE ─── */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <Briefcase size={16} style={{ color: "var(--accent)" }} />
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px" }}>Experience</h2>
          </div>

          <div className="timeline">
            {experience.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className={`timeline-dot${exp.current ? " active" : ""}`} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", marginBottom: "2px" }}>{exp.title}</h3>
                    <p style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 600 }}>{exp.company}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Calendar size={11} /> {exp.period}
                    </p>
                    {exp.current && (
                      <span style={{
                        display: "inline-block", marginTop: "4px",
                        padding: "2px 8px", borderRadius: "99px",
                        background: "var(--green-dim)", border: "1px solid rgba(52,211,153,0.25)",
                        fontSize: "11px", fontWeight: 600, color: "var(--green)",
                      }}>Current</span>
                    )}
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {Array.isArray(exp.description) ? exp.description.join(" • ") : exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-divider" />

        {/* ── EDUCATION + HACKATHONS ─── */}
        <div className="grid-2" style={{ marginBottom: "48px", gap: "32px" }}>
          {/* Education */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <GraduationCap size={16} style={{ color: "var(--accent)" }} />
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px" }}>Education</h2>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>{education.degree}</p>
              <p style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 600, marginBottom: "12px" }}>{education.university}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span className="tag">{education.period}</span>
                <span className="tag" style={{ color: "var(--green)", borderColor: "rgba(52,211,153,0.3)" }}>CGPA: {education.cgpa}</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <Trophy size={16} style={{ color: "var(--yellow)" }} />
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px" }}>Hackathon Wins</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {achievements.map((a, i) => (
                <div key={i} className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <Trophy size={14} style={{ color: a.icon === "gold" ? "#FBBF24" : a.icon === "silver" ? "#94A3B8" : "#B47C3C", flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{a.title}</p>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{a.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-divider" />

        {/* ── CERTIFICATIONS ─── */}
        <div style={{ paddingBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <Award size={16} style={{ color: "var(--accent)" }} />
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px" }}>Certifications</h2>
          </div>
          <div className="grid-3">
            {certifications.map((cert, i) => (
              <div key={i} className="card" style={{ padding: "16px", display: "flex", gap: "14px", alignItems: "center" }}>
                {cert.logo && (
                  <div style={{
                    width: 48,
                    height: 48,
                    position: "relative",
                    flexShrink: 0,
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text)",
                    lineHeight: 1.3,
                    marginBottom: "4px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}>
                    {cert.name}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px" }}>
                    <span style={{ color: "var(--accent)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: "8px" }}>
                      {cert.issuer}
                    </span>
                    <span style={{ color: "var(--text-faint)", flexShrink: 0 }}>
                      {cert.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
