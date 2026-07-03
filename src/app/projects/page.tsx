"use client";

import { useState, useEffect, Suspense } from "react";
import { Github, ExternalLink, Search, X, Star, GitFork, Loader2 } from "lucide-react";
import { projects } from "@/lib/data";
import { useSearchParams } from "next/navigation";

interface GHRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

const EXCLUDED_KEYWORDS = [
  "hello-world", "helloworld", "hello_world",
  "tutorial", "tutoring", "learning", "tut-", "course",
  "sample", "demo", "practice", "test", "testing",
  "first-app", "first_app", "my-first", "assignment", "homework",
  "exercise", "challenge", "lab-", "temp", "dummy", "boilerplate",
  "codingchallenge", "tutoring_dapp"
];


function ProjectsContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All");

  // GitHub repos states
  const [ghRepos, setGhRepos] = useState<GHRepo[]>([]);
  const [loadingGh, setLoadingGh] = useState(true);
  const [errorGh, setErrorGh] = useState(false);

  // Fetch all repos from GitHub (page 1 and page 2 to get all 150+)
  useEffect(() => {
    async function fetchAllRepos() {
      try {
        setLoadingGh(true);
        const [res1, res2] = await Promise.all([
          fetch("https://api.github.com/users/tmanas06/repos?per_page=100&page=1"),
          fetch("https://api.github.com/users/tmanas06/repos?per_page=100&page=2")
        ]);
        
        if (!res1.ok || !res2.ok) throw new Error("Failed to fetch");

        const data1 = await res1.json() as GHRepo[];
        const data2 = await res2.json() as GHRepo[];
        
        // Merge and filter duplicates, sort by update date (latest first)
        const merged = [...data1, ...data2];
        const unique = merged.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        const sorted = unique.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        
        setGhRepos(sorted);
      } catch (err) {
        console.error(err);
        setErrorGh(true);
      } finally {
        setLoadingGh(false);
      }
    }
    fetchAllRepos();
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredLocal = projects.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tech.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const filteredGh = category === "All" ? ghRepos.filter(r => {
    // 1. Exclude forks
    if (r.fork) return false;

    // 2. Exclude by junk keywords in name or description
    const nameLower = r.name.toLowerCase();
    const descLower = (r.description || "").toLowerCase();
    const isJunk = EXCLUDED_KEYWORDS.some(word => nameLower.includes(word) || descLower.includes(word));
    if (isJunk) return false;

    // 3. Exclude projects already in featured/local list to avoid duplicates
    const isAlreadyLocal = projects.some(p => p.github.toLowerCase().endsWith(nameLower));
    if (isAlreadyLocal) return false;
    
    // 4. Match search query
    const q = search.toLowerCase();
    return !q || nameLower.includes(q) || descLower.includes(q) || (r.language && r.language.toLowerCase().includes(q));
  }) : [];

  return (
    <div className="page-wrapper" style={{ position: "relative" }}>
      {/* Background Spotlight */}
      <div className="spotlight" style={{ top: "-100px", left: "50%", transform: "translateX(-50%)" }} />

      <div className="container" style={{ paddingTop: "48px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="section-label">Work</span>
          <h1 className="section-title text-gradient">Projects</h1>
          <p className="section-sub">A compilation of my builds, hackathons, and open source contributions.</p>
        </div>

        {/* Search + Filter */}
        <div style={{ marginBottom: "32px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 260px" }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)" }} />
            <input
              type="text"
              placeholder="Search all projects & repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              style={{ paddingLeft: "36px", paddingRight: search ? "36px" : "12px" }}
              id="project-search"
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", display: "flex" }}>
                <X size={14} />
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="btn"
                style={{
                  padding: "7px 16px", fontSize: "13px",
                  background: category === c ? "var(--accent)" : "transparent",
                  color: category === c ? "#fff" : "var(--text-muted)",
                  borderColor: category === c ? "var(--accent)" : "var(--border)",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid */}
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
          Featured Works
        </h2>
        <div className="grid-auto" style={{ marginBottom: "56px" }}>
          {filteredLocal.map((project) => (
            <article key={project.id} className="card" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.2px", lineHeight: 1.3 }}>
                  {project.title}
                </h3>
                {project.featured && (
                  <span style={{
                    flexShrink: 0, fontSize: "10px", fontWeight: 700,
                    padding: "2px 8px", borderRadius: "99px",
                    background: "var(--accent-dim)", color: "var(--accent)",
                    border: "1px solid rgba(79,142,247,0.3)",
                  }}>Featured</span>
                )}
              </div>

              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "12px", flex: 1 }}>
                {project.description}
              </p>

              <p style={{ fontSize: "12px", color: "var(--accent)", marginBottom: "12px", fontWeight: 500 }}>
                ↗ {project.impact}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              {/* Chain badges */}
              {project.chains?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                  {project.chains.map(c => (
                    <span key={c} style={{
                      fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "99px",
                      background: "var(--accent-dim2)", color: "var(--accent)",
                      border: "1px solid rgba(79,142,247,0.2)",
                    }}>{c}</span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div style={{ display: "flex", gap: "8px", borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ gap: "5px", fontSize: "13px" }}>
                  <Github size={13} /> Code
                </a>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ gap: "5px", fontSize: "13px" }}>
                    <ExternalLink size={13} /> Live
                  </a>
                )}
              </div>
            </article>
          ))}

          {filteredLocal.length === 0 && !search && (
            <div style={{ gridColumn: "1/-1", color: "var(--text-muted)", fontSize: "13px" }}>
              No featured projects in this category.
            </div>
          )}
        </div>

        {/* GitHub Repositories Grid */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>
            GitHub Repositories ({loadingGh ? "..." : ghRepos.length})
          </h2>
          {!loadingGh && !errorGh && (
            <span style={{ fontSize: "12px", color: "var(--text-faint)" }}>
              Sorted by latest updates
            </span>
          )}
        </div>

        {loadingGh ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "40px 0", color: "var(--text-muted)", fontSize: "14px" }}>
            <Loader2 className="animate-spin" size={18} /> Loading repositories from GitHub...
          </div>
        ) : errorGh ? (
          <div style={{ padding: "20px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "var(--radius)", color: "#ef4444", fontSize: "13px" }}>
            Could not fetch GitHub repositories. You can explore them directly on <a href="https://github.com/tmanas06" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>GitHub</a>.
          </div>
        ) : (
          <div className="grid-auto" style={{ paddingBottom: "80px" }}>
            {filteredGh.map((repo) => (
              <article key={repo.id} className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", minHeight: "180px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.2px", lineHeight: 1.3, wordBreak: "break-all" }}>
                    {repo.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, fontSize: "11px", color: "var(--text-muted)" }}>
                    {repo.stargazers_count > 0 && (
                      <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <Star size={11} fill="currentColor" /> {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <GitFork size={11} /> {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "14px", flex: 1 }}>
                  {repo.description || "No description provided."}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "12px", marginTop: "auto" }}>
                  <span className="tag" style={{ fontSize: "10px", padding: "2px 8px" }}>
                    {repo.language || "Mix"}
                  </span>
                  
                  <div style={{ display: "flex", gap: "4px" }}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "4px 8px", fontSize: "12px", gap: "4px" }}>
                      <Github size={12} /> Code
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "4px 8px", fontSize: "12px", gap: "4px", color: "var(--accent)" }}>
                        <ExternalLink size={12} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {filteredGh.length === 0 && (
              <div style={{ gridColumn: "1/-1", color: "var(--text-muted)", fontSize: "13px", paddingTop: "16px", paddingBottom: "16px" }}>
                No repositories found matching search query.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", color: "var(--text-muted)", fontSize: "14px" }}>
        Loading projects…
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
