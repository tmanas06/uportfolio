"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Github,
  ExternalLink,
  Star,
  GitFork,
  FolderKanban,
  Filter,
  X,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { projects } from "@/lib/data";
import { useSearchParams } from "next/navigation";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState("All");

  // Derive categories from project chains and tech
  const getProjectCategory = (project: typeof projects[0]) => {
    if (project.chains?.some(c => c.toLowerCase().includes('ethereum') || c.toLowerCase().includes('solana') || c.toLowerCase().includes('polygon'))) return 'Web3';
    if (project.tech?.some(t => t.toLowerCase().includes('flutter') || t.toLowerCase().includes('dart') || t.toLowerCase().includes('react native'))) return 'Mobile';
    if (project.tech?.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('ml') || t.toLowerCase().includes('gpt'))) return 'AI';
    return 'Web3';
  };

  const categories = ["All", ...Array.from(new Set(projects.map(getProjectCategory)))];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || getProjectCategory(project) === activeCategory;
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container-v2 py-10 sm:py-16 space-y-10 pb-24">
      {/* ═══ HEADER ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <FolderKanban className="w-6 h-6 text-[var(--accent)]" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-tight text-[var(--text-primary)]">
            /// Projects
          </h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)] font-mono ml-10">
          A collection of things I&apos;ve built. Each one taught me something.
        </p>
      </motion.div>

      {/* ═══ SEARCH & FILTERS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="SEARCH_PROJECTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-14 pr-12 bg-transparent border-[3px] border-[var(--border-color)] text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] font-mono uppercase font-bold transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 border-[2px] border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent-2)] hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest border-[3px] border-[var(--border-color)] transition-all ${activeCategory === category
                ? "bg-[var(--accent)] text-black shadow-[3px_3px_0px_var(--border-color)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-black shadow-[2px_2px_0px_var(--border-color)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_var(--border-color)]"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ═══ PROJECT GRID ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="border-[3px] border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all group"
            >
              {/* Title Bar */}
              <div className="px-5 py-3 bg-[var(--accent)] border-b-[3px] border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-2)]" />
                    <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-3)]" />
                    <div className="w-3 h-3 border-[2px] border-black bg-white" />
                  </div>
                  <span className="text-[10px] font-black text-black uppercase tracking-widest font-mono">
                    {getProjectCategory(project)}
                  </span>
                </div>
                {project.featured && (
                  <span className="text-[10px] font-black text-black bg-white border-[2px] border-black px-2 py-0.5 uppercase font-mono">
                    ★ Featured
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed line-clamp-3 font-mono">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-[10px] font-black text-[var(--text-primary)] px-3 py-1.5 border-[2px] border-[var(--border-color)] uppercase tracking-widest font-mono hover:bg-[var(--accent)] hover:text-black transition-all">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Chain Badges */}
                {project.chains && project.chains.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.chains.map((chain) => (
                      <span key={chain} className="text-[9px] font-black text-[var(--accent)] px-2 py-1 border-[2px] border-[var(--accent)] uppercase tracking-widest font-mono">
                        {chain}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t-[2px] border-[var(--border-color)]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <Star className="w-3.5 h-3.5" />
                      <span className="text-xs font-black font-mono">{project.metrics?.stars || 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <GitFork className="w-3.5 h-3.5" />
                      <span className="text-xs font-black font-mono">{project.metrics?.forks || 0}</span>
                    </div>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black text-[var(--accent)] hover:text-[var(--accent-2)] uppercase tracking-widest transition-colors"
                  >
                    <Github className="w-4 h-4" /> Source <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-[3px] border-[var(--border-color)] p-12 shadow-[4px_4px_0px_var(--shadow-color)] text-center"
        >
          <div className="w-20 h-20 border-[3px] border-[var(--border-color)] flex items-center justify-center mx-auto mb-6">
            <Terminal className="w-10 h-10 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading">NO_RESULTS_FOUND</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-2 font-mono">
            No projects match your current query. Try different keywords.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="mt-6 px-8 py-3 bg-[var(--accent)] text-black font-black text-xs border-[3px] border-[var(--border-color)] shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-widest"
          >
            CLEAR_FILTERS
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-v2 py-12">
          <div className="border-[3px] border-[var(--border-color)] p-12 text-center shadow-[4px_4px_0px_var(--border-color)]">
            <p className="text-lg font-black text-[var(--text-primary)] uppercase font-heading blink">
              Loading projects...
            </p>
          </div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
