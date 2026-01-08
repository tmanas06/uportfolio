"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const skillCategories = [
  { id: "languages", title: "Languages", color: "#F0B90B" },
  { id: "frameworks", title: "Frameworks", color: "#00D4AA" },
  { id: "blockchain", title: "Blockchain", color: "#627EEA" },
  { id: "tools", title: "Tools & Databases", color: "#8247E5" },
];

export default function SkillsPage() {
  return (
    <div className="container-main py-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F6F5] mb-2">Skills</h1>
        <p className="text-[#848E9C]">My technical expertise across different domains</p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillCategories.map((category, categoryIndex) => {
          const categorySkills = skills[category.id as keyof typeof skills];
          if (!categorySkills) return null;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="card p-6"
            >
              <h2
                className="text-lg font-semibold mb-6 flex items-center gap-2"
                style={{ color: category.color }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.title}
              </h2>

              <div className="space-y-4">
                {categorySkills.map((skill: { name: string; level: number }, index: number) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#F5F6F5]">{skill.name}</span>
                      <span className="text-xs text-[#848E9C]">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-[#1E2735] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        <div className="metric-card">
          <p className="metric-value">{skills.languages?.length || 0}</p>
          <p className="metric-label">Languages</p>
        </div>
        <div className="metric-card">
          <p className="metric-value">{skills.frameworks?.length || 0}</p>
          <p className="metric-label">Frameworks</p>
        </div>
        <div className="metric-card">
          <p className="metric-value">{skills.blockchain?.length || 0}</p>
          <p className="metric-label">Blockchains</p>
        </div>
        <div className="metric-card">
          <p className="metric-value">{skills.tools?.length || 0}</p>
          <p className="metric-label">Tools</p>
        </div>
      </motion.div>
    </div>
  );
}
