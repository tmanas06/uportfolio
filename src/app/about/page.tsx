"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, Globe, Briefcase, Calendar, Award, GraduationCap, Trophy, Twitter, Youtube } from "lucide-react";
import { personalInfo, education, educationList, experience, achievements, certifications } from "@/lib/data";

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
              <div key={i} className="timeline-item" style={{ marginBottom: "36px", position: "relative" }}>
                <div className={`timeline-dot${exp.current ? " active" : ""}`} />
                <div style={{ marginBottom: "8px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", marginBottom: "2px" }}>
                          {exp.title}
                        </h3>
                        <p style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 600, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" }}>
                          {exp.company}
                          {(exp.company.toLowerCase().includes("hyderabad dao") || exp.company.toLowerCase().includes("snowflake")) && (
                            <span style={{
                              fontSize: "9px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              background: "rgba(167, 139, 250, 0.15)",
                              color: "#A78BFA",
                              border: "1px solid rgba(167, 139, 250, 0.3)",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              letterSpacing: "0.03em"
                            }}>
                              Community
                            </span>
                          )}
                          {(exp.company.toLowerCase().includes("kl university") || exp.company.toLowerCase().includes("wallstreet dao club, klh")) && (
                            <span style={{
                              fontSize: "9px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              background: "rgba(79, 142, 247, 0.15)",
                              color: "#4F8EF7",
                              border: "1px solid rgba(79, 142, 247, 0.3)",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              letterSpacing: "0.03em"
                            }}>
                              College Club
                            </span>
                          )}
                          {exp.company.toLowerCase().includes("girlscript") && (
                            <span style={{
                              fontSize: "9px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              background: "rgba(52, 211, 153, 0.15)",
                              color: "#34D399",
                              border: "1px solid rgba(52, 211, 153, 0.3)",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              letterSpacing: "0.03em"
                            }}>
                              Open Source
                            </span>
                          )}
                          {exp.company.toLowerCase().includes("aicte") && (
                            <span style={{
                              fontSize: "9px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              background: "rgba(251, 191, 36, 0.15)",
                              color: "#FBBF24",
                              border: "1px solid rgba(251, 191, 36, 0.3)",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              letterSpacing: "0.03em"
                            }}>
                              Government Internship
                            </span>
                          )}
                        </p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Calendar size={11} /> {exp.period}
                        </p>
                        <p style={{ fontSize: "11px", color: "var(--text-faint)", marginTop: "2px" }}>{exp.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ paddingLeft: "56px" }}>
                  {/* Descriptions */}
                  <ul style={{ margin: "0 0 12px 0", paddingLeft: "16px", listStyleType: "disc", color: "var(--text-muted)", fontSize: "13px", lineHeight: "1.65" }}>
                    {Array.isArray(exp.description) ? (
                      exp.description.map((desc, idx) => <li key={idx} style={{ marginBottom: "4px" }}>{desc}</li>)
                    ) : (
                      <li>{exp.description}</li>
                    )}
                  </ul>

                  {/* Skills tags */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                      {exp.skills.map((skill) => (
                        <span key={skill} style={{ fontSize: "10px", fontWeight: 600, color: "var(--accent)", background: "var(--accent-dim)", padding: "2px 8px", borderRadius: "99px", border: "1px solid rgba(79,142,247,0.15)" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Attachments & Posts */}
                  {(exp.document || exp.post) && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
                      {exp.document && (
                        <a href={exp.document} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "6px 12px", gap: "6px", fontSize: "11px", display: "inline-flex", alignItems: "center", textTransform: "none", letterSpacing: "normal" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                          {exp.documentLabel || "Document"}
                        </a>
                      )}
                      {exp.post && (
                        <a href={exp.post} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "6px 12px", gap: "6px", fontSize: "11px", display: "inline-flex", alignItems: "center", textTransform: "none", letterSpacing: "normal" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          {exp.postLabel || "LinkedIn Post"}
                        </a>
                      )}
                    </div>
                  )}
                </div>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {educationList.map((edu, idx) => (
                <div key={idx} className="card" style={{ padding: "18px 20px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", marginBottom: "2px" }}>{edu.degree}</p>
                  <p style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 600, marginBottom: "8px" }}>{edu.institution}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                    <span className="tag">{edu.period}</span>
                    <span className="tag" style={{ color: "var(--text-muted)" }}>{edu.details}</span>
                    {edu.skills && edu.skills.length > 0 && (
                      <span className="tag" style={{ color: "var(--text-faint)" }}>Skills: {edu.skills.join(", ")}</span>
                    )}
                  </div>
                </div>
              ))}
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
