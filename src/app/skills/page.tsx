"use client";

import { skills, chains } from "@/lib/data";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const categories = [
  {
    key: "languages",
    label: "Languages",
    color: "#4F8EF7",
    glow: "rgba(79,142,247,0.25)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    key: "frameworks",
    label: "Frameworks",
    color: "#34D399",
    glow: "rgba(52,211,153,0.25)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    key: "blockchain",
    label: "Blockchain",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.25)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    key: "tools",
    label: "Tools & Cloud",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.25)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

function AnimatedBar({ level, color, delay = 0 }: { level: number; color: string; delay?: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [level, delay]);

  return (
    <div
      ref={ref}
      style={{
        height: 6,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 99,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          right: `${100 - width}%`,
          background: `linear-gradient(90deg, ${color}60, ${color})`,
          borderRadius: 99,
          transition: "right 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          boxShadow: `0 0 10px ${color}60`,
        }}
      />
    </div>
  );
}

function SkillCard({
  skill,
  color,
  index,
}: {
  skill: { name: string; level: number };
  color: string;
  index: number;
}) {
  const tier = skill.level >= 90 ? "Expert" : skill.level >= 75 ? "Advanced" : skill.level >= 60 ? "Proficient" : "Learning";
  const tierColor = skill.level >= 90 ? "#34D399" : skill.level >= 75 ? "#4F8EF7" : skill.level >= 60 ? "#FBBF24" : "#A78BFA";

  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 10,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(255,255,255,0.06)";
        el.style.borderColor = `${color}40`;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = `0 8px 24px ${color}15`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(255,255,255,0.03)";
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{skill.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: tierColor,
              background: `${tierColor}15`,
              padding: "2px 7px",
              borderRadius: 99,
              border: `1px solid ${tierColor}30`,
              letterSpacing: "0.04em",
            }}
          >
            {tier}
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "var(--font-mono)" }}>
            {skill.level}%
          </span>
        </div>
      </div>
      <AnimatedBar level={skill.level} color={color} delay={index * 80} />
    </div>
  );
}

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("languages");
  const activeCat = categories.find((c) => c.key === activeTab)!;
  const activeItems = skills[activeTab as keyof typeof skills];

  // Summary stats
  const totalSkills = Object.values(skills).flat().length;
  const avgLevel = Math.round(Object.values(skills).flat().reduce((a, b) => a + b.level, 0) / totalSkills);
  const expertCount = Object.values(skills).flat().filter((s) => s.level >= 90).length;

  return (
    <div className="page-wrapper" style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient background blobs */}
      <div style={{
        position: "fixed", top: -200, left: "30%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: -100, right: "10%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div className="container" style={{ paddingTop: 48, position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 48 }}>
          <span className="section-label">Skills</span>
          <h1 className="section-title text-gradient">Tech Stack</h1>
          <p className="section-sub" style={{ maxWidth: 560 }}>
            Technologies powering my projects — across frontend, backend, blockchain, and DevOps.
            Percentages reflect actual usage across <strong style={{ color: "var(--text)" }}>136+ GitHub repositories</strong>.
          </p>
        </div>

        {/* ── Summary Stats ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 40,
        }}>
          {[
            { label: "Technologies", value: totalSkills.toString(), icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
            ), color: "#4F8EF7" },
            { label: "Avg. Proficiency", value: `${avgLevel}%`, icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            ), color: "#34D399" },
            { label: "Expert Level", value: expertCount.toString(), icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ), color: "#FBBF24" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card"
              style={{
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${stat.color}12`,
                border: `1px solid ${stat.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: stat.color, flexShrink: 0,
              }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 3, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Category Tab Switcher ── */}
        <div style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
          flexWrap: "wrap",
        }}>
          {categories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: `1px solid ${isActive ? cat.color + "60" : "rgba(255,255,255,0.07)"}`,
                  background: isActive ? `${cat.color}12` : "rgba(255,255,255,0.03)",
                  color: isActive ? cat.color : "var(--text-muted)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? `0 0 20px ${cat.glow}` : "none",
                  transform: isActive ? "translateY(-1px)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = `${cat.color}30`;
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }
                }}
              >
                <span style={{ color: isActive ? cat.color : "var(--text-faint)" }}>{cat.icon}</span>
                {cat.label}
                <span style={{
                  fontSize: 11,
                  background: isActive ? `${cat.color}20` : "rgba(255,255,255,0.06)",
                  color: isActive ? cat.color : "var(--text-faint)",
                  padding: "1px 7px",
                  borderRadius: 99,
                  fontFamily: "var(--font-mono)",
                }}>
                  {skills[cat.key as keyof typeof skills].length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active Category Panel ── */}
        <div
          key={activeTab}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${activeCat.color}25`,
            borderRadius: 16,
            padding: "28px 24px",
            marginBottom: 48,
            boxShadow: `0 0 40px ${activeCat.glow}`,
            animation: "fadeSlideIn 0.35s ease",
          }}
        >
          {/* Panel header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${activeCat.color}15`,
                border: `1px solid ${activeCat.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: activeCat.color,
              }}>
                {activeCat.icon}
              </div>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{activeCat.label}</h2>
                <p style={{ fontSize: 12, color: "var(--text-faint)" }}>
                  {activeItems.length} technologies tracked
                </p>
              </div>
            </div>
            {/* Mini legend */}
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { label: "Expert", color: "#34D399" },
                { label: "Advanced", color: "#4F8EF7" },
                { label: "Proficient", color: "#FBBF24" },
              ].map((t) => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.color }} />
                  <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 10,
          }}>
            {activeItems.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} color={activeCat.color} index={i} />
            ))}
          </div>
        </div>

        {/* ── All categories compact overview ── */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Full Overview
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {categories.map((cat) => {
              const items = skills[cat.key as keyof typeof skills];
              const avg = Math.round(items.reduce((a, b) => a + b.level, 0) / items.length);
              return (
                <div
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className="card"
                  style={{
                    padding: "20px",
                    cursor: "pointer",
                    border: activeTab === cat.key ? `1px solid ${cat.color}40` : "1px solid var(--border)",
                    background: activeTab === cat.key ? `${cat.color}08` : "var(--bg-card)",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: cat.color }}>{cat.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text)" }}>
                        {cat.label}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: cat.color, fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                      {avg}% avg
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {items.slice(0, 4).map((skill) => (
                      <div key={skill.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, color: "var(--text-muted)", width: 100, flexShrink: 0 }}>
                          {skill.name}
                        </span>
                        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                          <AnimatedBar level={skill.level} color={cat.color} delay={0} />
                        </div>
                      </div>
                    ))}
                    {items.length > 4 && (
                      <span style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 2 }}>
                        +{items.length - 4} more →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="section-divider" />

        {/* ── Blockchain Ecosystems ── */}
        <div style={{ paddingBottom: 80 }}>
          <span className="section-label">Ecosystems</span>
          <h2 className="section-title" style={{ marginBottom: 8 }}>Blockchain Ecosystems</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 36, maxWidth: 500 }}>
            Deployed smart contracts and dApps across these networks.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {chains.map((chain, i) => (
              <div
                key={chain.name}
                className="card"
                style={{
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "all 0.25s ease",
                  cursor: "default",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-3px)";
                  el.style.borderColor = "rgba(167,139,250,0.3)";
                  el.style.boxShadow = "0 8px 24px rgba(167,139,250,0.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ position: "relative", width: 26, height: 26, flexShrink: 0 }}>
                  <Image src={chain.logo} alt={chain.name} fill className="object-contain" />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.2 }}>
                    {chain.fullName}
                  </p>
                  <p style={{ fontSize: 10, color: "var(--text-faint)", fontFamily: "var(--font-mono)", marginTop: 2 }}>
                    {chain.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
