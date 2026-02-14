"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Github,
  ExternalLink,
  FolderKanban,
  X,
  Terminal,
} from "lucide-react";
import { projects } from "@/lib/data";
import { useSearchParams } from "next/navigation";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState("All");

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
    <div className="container-v2 py-12 sm:py-24 space-y-10 pb-24">
      {/* ═══ HEADER ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-3">
          <FolderKanban className="w-7 h-7 text-[var(--accent)]" />
          <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-black uppercase font-heading tracking-tight text-[var(--text-primary)]">
            /// Projects
          </h1>
        </div>
        <p className="text-[1rem] text-[var(--text-secondary)] font-mono ml-11">
          A collection of things I&apos;ve built. Each one taught me something.
        </p>
      </motion.div>

      {/* ═══ SEARCH & FILTERS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="space-y-5"
      >
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="SEARCH_PROJECTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-14 pr-12 bg-transparent border-[3px] border-[var(--border-color)] text-[1rem] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] font-mono uppercase font-bold transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border-[2px] border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent-2)] hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-3 text-[0.875rem] font-black uppercase tracking-widest border-[3px] border-[var(--border-color)] transition-all min-h-[48px] ${activeCategory === category
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              className="border-[4px] border-[var(--border-color)] shadow-[6px_6px_0px_var(--shadow-color)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_var(--shadow-color)] transition-all group flex flex-col"
            >
              {/* Title Bar */}
              <div className="px-5 py-3 bg-[var(--accent)] border-b-[4px] border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-2)]" />
                    <div className="w-3 h-3 border-[2px] border-black bg-[var(--accent-3)]" />
                    <div className="w-3 h-3 border-[2px] border-black bg-white" />
                  </div>
                  <span className="text-[0.75rem] font-black text-black uppercase tracking-widest font-mono">
                    {getProjectCategory(project)}
                  </span>
                </div>
                {project.featured && (
                  <span className="text-[0.75rem] font-black text-black bg-white border-[2px] border-black px-2 py-0.5 uppercase font-mono">
                    ★ Featured
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[1.125rem] font-black text-[var(--text-primary)] uppercase font-heading tracking-tight">
                  {project.title}
                </h3>
                <p className="text-[0.9375rem] text-[var(--text-secondary)] mt-3 leading-relaxed line-clamp-3 font-mono">
                  {project.description}
                </p>

                {/* Impact */}
                <p className="text-[0.875rem] font-black text-[var(--accent-2)] mt-3 font-mono">
                  ⚡ {project.impact}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-[0.75rem] font-black text-[var(--text-primary)] px-3 py-1.5 border-[2px] border-[var(--border-color)] uppercase tracking-widest font-mono hover:bg-[var(--accent)] hover:text-black transition-all">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Chain Badges */}
                {project.chains && project.chains.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.chains.map((chain) => (
                      <span key={chain} className="text-[0.75rem] font-black text-[var(--accent)] px-2 py-1 border-[2px] border-[var(--accent)] uppercase tracking-widest font-mono">
                        {chain}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-5 border-t-[2px] border-[var(--border-color)] mt-6">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[0.875rem] font-black text-[var(--text-primary)] border-[2px] border-[var(--border-color)] px-3 py-2 hover:bg-[var(--accent)] hover:text-black transition-all uppercase tracking-widest min-h-[48px]"
                    >
                      <Github className="w-4 h-4" /> Code
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[0.875rem] font-black text-black bg-[var(--accent)] border-[2px] border-[var(--border-color)] px-3 py-2 hover:bg-[var(--accent-2)] hover:text-white transition-all uppercase tracking-widest min-h-[48px]"
                      >
                        <ExternalLink className="w-4 h-4" /> Live
                      </a>
                    )}
                  </div>
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
          <h3 className="text-[1.5rem] font-black text-[var(--text-primary)] uppercase font-heading">NO_RESULTS_FOUND</h3>
          <p className="text-[1rem] text-[var(--text-secondary)] mt-2 font-mono">
            No projects match your current query. Try different keywords.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="mt-6 brutal-btn brutal-btn-accent text-[0.875rem]"
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
            <p className="text-[1.125rem] font-black text-[var(--text-primary)] uppercase font-heading blink">
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
