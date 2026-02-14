"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  Link2,
  Wrench,
  Sparkles,
  Zap,
} from "lucide-react";
import { skills } from "@/lib/data";

const categoryConfig = [
  { key: "languages", label: "Languages", icon: Code2, color: "var(--accent)" },
  { key: "frameworks", label: "Frameworks", icon: Layers, color: "var(--accent-2)" },
  { key: "blockchain", label: "Blockchain", icon: Link2, color: "var(--accent-3)" },
  { key: "tools", label: "Dev_Tools", icon: Wrench, color: "var(--accent)" },
];

export default function SkillsPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="container-v2 py-12 sm:py-24 space-y-16 sm:space-y-20 pb-24">
      {/* ═══ HEADER ═══ */}
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-4 mb-3">
          <Sparkles className="w-7 h-7 text-[var(--accent)]" />
          <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-black uppercase font-heading tracking-tight text-[var(--text-primary)]">
            /// Tech_Stack
          </h1>
        </div>
        <p className="text-[1rem] text-[var(--text-secondary)] font-mono ml-11">
          Technologies I work with daily. Proficiency measured in shipping real products.
        </p>
      </motion.div>

      {/* ═══ SKILL CATEGORIES ═══ */}
      {categoryConfig.map((cat, catIndex) => {
        const skillData = skills[cat.key as keyof typeof skills];
        if (!skillData || skillData.length === 0) return null;

        const Icon = cat.icon;

        return (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + catIndex * 0.08, duration: 0.5 }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border-[3px] border-[var(--border-color)] flex items-center justify-center" style={{ backgroundColor: cat.color }}>
                <Icon className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-[1.25rem] sm:text-[1.5rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
                  {cat.label}
                </h2>
                <p className="text-[0.75rem] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] font-mono">
                  {skillData.length} ITEMS_LOADED
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {skillData.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + catIndex * 0.08 + index * 0.03, duration: 0.3 }}
                  className="border-[3px] border-[var(--border-color)] p-5 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[1rem] font-black text-[var(--text-primary)] uppercase font-heading">{skill.name}</span>
                    <span className="text-[1rem] font-black font-mono" style={{ color: cat.color }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-5 border-[2px] border-[var(--border-color)] bg-[var(--bg-secondary)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.3 + catIndex * 0.08 + index * 0.03, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* ═══ SUMMARY STATS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Zap className="w-6 h-6 text-[var(--accent)]" />
          <h2 className="text-[1.25rem] sm:text-[1.5rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">/// Summary</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categoryConfig.map((cat) => {
            const skillData = skills[cat.key as keyof typeof skills];
            const count = skillData?.length || 0;
            const Icon = cat.icon;
            return (
              <div
                key={cat.key}
                className="border-[3px] border-[var(--border-color)] p-6 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all text-center"
              >
                <div className="w-12 h-12 border-[2px] border-[var(--border-color)] flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: cat.color }}>
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <div className="text-[2rem] font-black font-heading" style={{ color: cat.color }}>
                  {count}
                </div>
                <div className="text-[0.75rem] font-black text-[var(--text-muted)] uppercase tracking-widest mt-1 font-mono">
                  {cat.label}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
