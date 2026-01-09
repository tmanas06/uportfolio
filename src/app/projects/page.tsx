"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Search, Filter } from "lucide-react";
import { projects } from "@/lib/data";

const categories = [
  { id: "all", label: "All" },
  { id: "web3", label: "Web3" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
  { id: "other", label: "Other" },
];

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Read search query from URL params
  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "all" ||
      (project.chains && project.chains.length > 0 && activeCategory === "web3") ||
      (project.tech.some((t) => t.toLowerCase().includes("flutter") || t.toLowerCase().includes("mobile")) && activeCategory === "mobile") ||
      (project.tech.some((t) => t.toLowerCase().includes("ai") || t.toLowerCase().includes("ml")) && activeCategory === "ai");

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container-main py-6 flex flex-col gap-8">
      {/* Spacer for visual separation from header */}
      <div className="h-4" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F6F5] mb-2">Projects</h1>
        <p className="text-[#848E9C]">Explore my portfolio of blockchain and full-stack projects</p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#848E9C]" style={{ zIndex: 10 }} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pr-4 bg-[#131B27] border border-[rgba(240,185,11,0.15)] rounded-xl text-[#F5F6F5] placeholder-[#848E9C] focus:outline-none focus:border-[#F0B90B] transition-colors"
            style={{ paddingLeft: '48px' }}
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-[#F0B90B] text-[#0A0E17]"
                  : "bg-[#1E2735] text-[#848E9C] hover:bg-[#252D3C] hover:text-[#F5F6F5]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="project-card group"
            >
              {/* Image Placeholder */}
              <div className="project-card-image flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center">
                  <span className="text-[#0A0E17] font-bold text-2xl">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="project-card-content">
                <h3 className="font-semibold text-[#F5F6F5] group-hover:text-[#F0B90B] transition-colors mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-[#848E9C] line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="badge badge-gold">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div className="flex gap-4 text-xs text-[#848E9C] mb-4">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <span key={key}>
                        <span className="text-[#F0B90B] font-medium">{value}</span> {key}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn btn-outline py-2 text-xs"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {project.featured && (
                    <button className="flex-1 btn btn-gold py-2 text-xs">
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-[#848E9C]">No projects found matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );
}
