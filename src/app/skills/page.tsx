"use client";

import { skills, chains } from "@/lib/data";
import Image from "next/image";

const categories = [
  { key: "languages",  label: "Languages",   color: "#4F8EF7" },
  { key: "frameworks", label: "Frameworks",   color: "#34D399" },
  { key: "blockchain", label: "Blockchain",   color: "#A78BFA" },
  { key: "tools",      label: "Tools & Cloud",color: "#FBBF24" },
];

export default function SkillsPage() {
  return (
    <div className="page-wrapper" style={{ position: "relative" }}>
      {/* Background Spotlight */}
      <div className="spotlight" style={{ top: "-100px", left: "50%", transform: "translateX(-50%)" }} />

      <div className="container" style={{ paddingTop: "48px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span className="section-label">Skills</span>
          <h1 className="section-title text-gradient">Tech Stack</h1>
          <p className="section-sub">
            Technologies I use daily — across frontend, backend, blockchain, and DevOps.
          </p>
        </div>

        {/* Skill categories */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "64px" }}>
          {categories.map((cat) => {
            const items = skills[cat.key as keyof typeof skills];
            return (
              <div key={cat.key} className="card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, display: "block" }} />
                  <h2 style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {cat.label}
                  </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>{skill.name}</span>
                        <span style={{ fontSize: "11px", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>{skill.level}%</span>
                      </div>
                      <div style={{ height: 4, background: "var(--border)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${cat.color}80, ${cat.color})`,
                          borderRadius: "99px",
                          transition: "width 0.6s ease",
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-divider" />

        {/* Blockchain Ecosystems */}
        <div style={{ paddingBottom: "80px" }}>
          <span className="section-label">Ecosystems</span>
          <h2 className="section-title" style={{ marginBottom: "24px" }}>Blockchain Ecosystems</h2>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "32px" }}>
            Deployed smart contracts and dApps across these networks.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {chains.map((chain) => (
              <div key={chain.name} className="card" style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ position: "relative", width: 22, height: 22, flexShrink: 0 }}>
                  <Image src={chain.logo} alt={chain.name} fill className="object-contain" />
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>{chain.fullName}</p>
                  <p style={{ fontSize: "11px", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>{chain.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
