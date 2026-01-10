"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Search, Filter, Sparkles } from "lucide-react";
import { projects } from "@/lib/data";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "web3", label: "Web3 & Blockchain" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "ai", label: "AI & ML" },
];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="container-v2 py-12 flex flex-col gap-12 sm:gap-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white mb-6">
          My <span className="gold-text">Projects</span>
        </h1>
        <p className="text-secondary text-lg">
          A collection of my work in blockchain development, cybersecurity, and full-stack engineering.
        </p>
      </motion.div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-8">
        <div className="relative max-w-2xl mx-auto w-full group">
          <div className="absolute inset-0 bg-yellow-500/5 blur-xl group-focus-within:bg-yellow-500/10 transition-colors" />
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-yellow-500 transition-colors" />
            <input
              type="text"
              placeholder="Search projects by name, technology, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-16 pr-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-muted focus:outline-none focus:border-yellow-500/50 transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${activeCategory === category.id
                ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(240,185,11,0.3)] scale-105"
                : "bg-white/5 text-secondary border-white/5 hover:border-white/10 hover:text-white"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card rounded-[2rem] flex flex-col group/card hover:-translate-y-2"
            >
              {/* Visual Header */}
              <div className="h-48 rounded-t-[2rem] relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center border-b border-white/5">
                <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl group-hover/card:scale-110 group-hover/card:border-yellow-500/30 transition-all duration-500">
                  <span className="text-3xl font-bold text-white group-hover/card:gold-text transition-all">
                    {project.title.charAt(0)}
                  </span>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover/card:text-yellow-500 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-secondary hover:text-white transition-all">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <p className="text-secondary text-sm mb-8 line-clamp-3 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Metrics if available */}
                {project.metrics && (
                  <div className="flex flex-wrap gap-4 mb-8">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-xs text-muted uppercase tracking-wider font-bold mb-1">{key}</span>
                        <span className="text-sm font-bold text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md text-secondary border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.github}
                  target="_blank"
                  className="btn-premium btn-outline w-full rounded-2xl text-xs py-4 group/btn"
                >
                  View Case Study
                  <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 glass-card rounded-[2rem]"
        >
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-muted" />
          </div>
          <p className="text-white font-bold text-xl mb-2">No projects found</p>
          <p className="text-secondary">Try adjusting your filters or search terms.</p>
        </motion.div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="container-v2 py-12 text-center text-secondary">Loading projects...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
