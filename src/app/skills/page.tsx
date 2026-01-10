"use client";

import { motion } from "framer-motion";
import { Sparkles, Code, Boxes, Anchor } from "lucide-react";
import { skills } from "@/lib/data";

const skillCategories = [
  { id: "languages", title: "Languages", color: "#F0B90B", icon: <Code className="w-5 h-5" /> },
  { id: "frameworks", title: "Frameworks", color: "#0ECB81", icon: <Boxes className="w-5 h-5" /> },
  { id: "blockchain", title: "Blockchain", color: "#3772FF", icon: <Anchor className="w-5 h-5" /> },
  { id: "tools", title: "Tools & DevOps", color: "#8247E5", icon: <Sparkles className="w-5 h-5" /> },
];

export default function SkillsPage() {
  return (
    <div className="container-v2 py-12 flex flex-col gap-12 sm:gap-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white mb-6">
          Technical <span className="gold-text">Arsenal</span>
        </h1>
        <p className="text-secondary text-lg">
          My expertise across the stack, from core languages to specialized blockchain ecosystems.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillCategories.map((category, categoryIndex) => {
          const categorySkills = skills[category.id as keyof typeof skills];
          if (!categorySkills) return null;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="glass-card p-8 rounded-3xl group"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                  >
                    {category.icon}
                  </div>
                  {category.title}
                </h2>
                <span className="text-xs font-bold text-muted uppercase tracking-widest">{categorySkills.length} SKILLS</span>
              </div>

              <div className="flex flex-col gap-6">
                {categorySkills.map((skill: { name: string; level: number }, index: number) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-white group-hover/skill:text-yellow-500 transition-colors">{skill.name}</span>
                      <span className="text-xs font-bold text-secondary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.3 + index * 0.05, ease: "easeOut" }}
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: category.color }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card p-8 sm:p-12 rounded-[2.5rem] grid grid-cols-2 sm:grid-cols-4 gap-8"
      >
        <div className="metric-v2 text-center items-center">
          <p className="metric-v2-value text-yellow-500">{skills.languages?.length || 0}</p>
          <p className="metric-v2-label">Languages</p>
        </div>
        <div className="metric-v2 text-center items-center">
          <p className="metric-v2-value text-emerald-500">{skills.frameworks?.length || 0}</p>
          <p className="metric-v2-label">Frameworks</p>
        </div>
        <div className="metric-v2 text-center items-center">
          <p className="metric-v2-value text-blue-500">{skills.blockchain?.length || 0}</p>
          <p className="metric-v2-label">Blockchain</p>
        </div>
        <div className="metric-v2 text-center items-center">
          <p className="metric-v2-value text-purple-500">{skills.tools?.length || 0}</p>
          <p className="metric-v2-label">Tools</p>
        </div>
      </motion.div>
    </div>
  );
}
