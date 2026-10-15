"use client";

import { useState, useMemo, Suspense } from "react";
import {
  Github,
  ExternalLink,
  Search,
  X,
  Star,
  GitFork,
  Sparkles,
  Globe,
  SlidersHorizontal,
  RotateCcw,
  BookOpen
} from "lucide-react";
import { projects as curatedProjects } from "@/lib/data";
import { githubProjects } from "@/lib/githubProjects";
import { useSearchParams } from "next/navigation";

// Unified project model
interface UnifiedProject {
  id: string | number;
  title: string;
  name: string;
  description: string;
  impact?: string | null;
  primaryLang: string;
  tech: string[];
  domain: string;
  subCategory?: string;
  chains: string[];
  github: string;
  liveUrl?: string | null;
  featured: boolean;
  isBasic: boolean;
  rankingScore: number;
  stars: number;
  forks: number;
  updatedAt?: string;
}

const BASIC_PROJECT_NAMES = new Set([
  "hello-world",
  "helloeth",
  "cv",
  "start-here",
  "tmanas06",
  "g2210030003",
  "hacktoberfest2023",
  "open-source-practice",
  "rust_basic",
  "flutter_application_1",
  "c_all-ctsd-",
  "tables_python",
  "python_sql_connection_only",
  "mysql",
  "mcq",
  "epics",
  "epam",
  "ep-project",
  "poc",
  "med",
  "mrna",
  "speech",
  "mern-stack-simple-project",
  "to-do-list-",
  "counter-workshop",
  "first_token",
  "android_studio_first_app",
  "codingchallenge",
  "sample_analyics_dashboard",
  "tutoring-app",
  "iot"
]);

function isBasicProject(name: string, isCurated: boolean): boolean {
  if (isCurated) return false;
  const nameLower = name.toLowerCase().trim();
  if (BASIC_PROJECT_NAMES.has(nameLower)) return true;
  if (nameLower.startsWith("skills-")) return true;
  if (
    nameLower.includes("hello-world") ||
    nameLower.includes("helloworld") ||
    nameLower.includes("hello_world")
  ) {
    return true;
  }
  if (nameLower === "cv" || nameLower === "start-here" || nameLower === "tmanas06") {
    return true;
  }
  return false;
}

function computeRankingScore(p: {
  featured: boolean;
  isCurated: boolean;
  liveUrl: string | null;
  stars: number;
  forks: number;
  impact: string | null;
  isBasic: boolean;
  updatedAt?: string;
}): number {
  if (p.isBasic) return -1000;
  let score = 0;
  if (p.featured) score += 10000;
  if (p.isCurated) score += 5000;
  if (p.liveUrl) score += 2000;
  if (p.impact) score += 1000;
  if (p.stars > 0) score += p.stars * 100;
  if (p.forks > 0) score += p.forks * 50;

  if (p.updatedAt) {
    const timestamp = new Date(p.updatedAt).getTime();
    if (!isNaN(timestamp)) {
      score += Math.min(500, Math.max(0, (timestamp - 1700000000000) / (86400000 * 30)));
    }
  }
  return score;
}

const TECH_OPTIONS = [
  "All Languages & Tech",
  "TypeScript",
  "JavaScript",
  "Python",
  "Solidity",
  "Rust",
  "React / Next.js",
  "Flutter / Dart",
  "AI / ML & LLMs",
  "C / C++",
  "Svelte",
  "NestJS & Node.js",
  "ZK & Cryptography",
  "Java"
];

const DOMAIN_OPTIONS = [
  "All Domains",
  "Blockchain & Web3",
  "AI & Machine Learning",
  "Full Stack & Web Development",
  "Mobile & Cross-Platform",
  "Data & Analytics",
  "Hackathons & Competitions",
  "Tools, Systems & Learning"
];

const CHAIN_OPTIONS = [
  "All Chains",
  "Ethereum",
  "Solana",
  "Polygon",
  "Monad",
  "Stacks",
  "Aptos",
  "Rootstock",
  "Casper",
  "Aleph Zero",
  "Sei",
  "Stellar",
  "Core DAO",
  "Algorand",
  "Mantle",
  "Arbitrum"
];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All Domains");
  const [selectedTech, setSelectedTech] = useState("All Languages & Tech");
  const [selectedChain, setSelectedChain] = useState("All Chains");
  const [activeTab, setActiveTab] = useState<"all" | "featured" | "live" | "basic">("all");

  // Merge, classify, and enrich projects deterministically
  const allProjects: UnifiedProject[] = useMemo(() => {
    const curatedMap = new Map();
    curatedProjects.forEach((p) => {
      const slug = (p.github.split("/").pop() || p.title)
        .toLowerCase()
        .replace(/[-_]/g, "");
      curatedMap.set(slug, p);
    });

    const unifiedList = githubProjects.map((gp) => {
      const slug = gp.name.toLowerCase().replace(/[-_]/g, "");
      const cp = curatedMap.get(slug);
      const isCurated = Boolean(cp);
      const isBasic = isBasicProject(gp.name, isCurated);

      // Collect all tech tags and languages
      const techSet = new Set<string>();
      if (gp.language && gp.language !== "Not Specified") {
        techSet.add(gp.language);
      }
      (gp.topics || []).forEach((t) => techSet.add(t));
      if (cp && cp.tech) {
        cp.tech.forEach((t: string) => techSet.add(t));
      }

      const nameLower = gp.name.toLowerCase();
      const titleLower = (cp?.title || gp.title).toLowerCase();
      const descLower = (cp?.description || gp.description || "").toLowerCase();
      const combined = `${nameLower} ${titleLower} ${descLower} ${Array.from(techSet).join(" ")}`.toLowerCase();

      // Smart tech inference
      if (combined.includes("flutter") || gp.language === "Dart") {
        techSet.add("Flutter");
        techSet.add("Dart");
      }
      if (
        combined.includes("next.js") ||
        combined.includes("nextjs") ||
        (gp.homepage && gp.homepage.includes("vercel.app"))
      ) {
        techSet.add("Next.js");
        techSet.add("React");
      }
      if (combined.includes("react")) {
        techSet.add("React");
      }
      if (
        gp.language === "Solidity" ||
        combined.includes("solidity") ||
        combined.includes("hook") ||
        combined.includes("erc-") ||
        combined.includes("smart contract") ||
        combined.includes("hardhat") ||
        combined.includes("foundry")
      ) {
        techSet.add("Solidity");
      }
      if (
        gp.language === "Rust" ||
        combined.includes("rust") ||
        combined.includes("soroban") ||
        combined.includes("cosmwasm")
      ) {
        techSet.add("Rust");
      }
      if (
        gp.language === "Python" ||
        combined.includes("python") ||
        combined.includes("flask") ||
        combined.includes("opencv") ||
        combined.includes("tensorflow")
      ) {
        techSet.add("Python");
      }
      if (gp.language === "C++" || combined.includes("c++") || combined.includes("cpp")) {
        techSet.add("C++");
      }
      if (gp.language === "C") {
        techSet.add("C");
      }
      if (gp.language === "Svelte" || combined.includes("svelte")) {
        techSet.add("Svelte");
      }
      if (
        combined.includes("nestjs") ||
        combined.includes("nest.js") ||
        combined.includes("nest-swagger")
      ) {
        techSet.add("NestJS");
        techSet.add("Node.js");
      }
      if (
        combined.includes("zk") ||
        combined.includes("zero-knowledge") ||
        combined.includes("snark")
      ) {
        techSet.add("ZK-Proofs");
      }
      if (
        combined.includes("ai") ||
        combined.includes("gpt") ||
        combined.includes("rag") ||
        combined.includes("agent") ||
        combined.includes("llm") ||
        combined.includes("gemini") ||
        combined.includes("openai")
      ) {
        techSet.add("AI / ML");
      }
      if (gp.language === "Java" || combined.includes("spring")) {
        techSet.add("Java");
      }

      // Domain mapping
      let domain = "Tools, Systems & Learning";
      const catLower = (cp?.category || gp.category || "").toLowerCase();

      if (
        catLower.includes("defi") ||
        catLower.includes("zk") ||
        catLower.includes("web3") ||
        catLower.includes("blockchain") ||
        catLower.includes("crypto") ||
        catLower.includes("hook") ||
        combined.includes("solidity") ||
        combined.includes("ethereum") ||
        combined.includes("solana") ||
        combined.includes("monad") ||
        combined.includes("dapp") ||
        combined.includes("token") ||
        combined.includes("wallet")
      ) {
        domain = "Blockchain & Web3";
      } else if (
        catLower.includes("ai") ||
        combined.includes("llm") ||
        combined.includes("rag") ||
        combined.includes("agent") ||
        combined.includes("gpt")
      ) {
        domain = "AI & Machine Learning";
      } else if (
        catLower.includes("mobile") ||
        combined.includes("flutter") ||
        combined.includes("android")
      ) {
        domain = "Mobile & Cross-Platform";
      } else if (
        catLower.includes("data") ||
        combined.includes("analytics") ||
        combined.includes("revenue") ||
        combined.includes("dashboard")
      ) {
        domain = "Data & Analytics";
      } else if (catLower.includes("hackathon") || combined.includes("hackathon")) {
        domain = "Hackathons & Competitions";
      } else if (
        combined.includes("react") ||
        combined.includes("next.js") ||
        combined.includes("svelte") ||
        combined.includes("nestjs") ||
        gp.language === "TypeScript" ||
        gp.language === "JavaScript" ||
        gp.language === "HTML" ||
        gp.language === "CSS"
      ) {
        domain = "Full Stack & Web Development";
      }

      // Chains mapping
      const chainsSet = new Set<string>((cp?.chains as string[]) || []);
      const chainKeywords: [string, ...string[]][] = [
        ["ethereum", "ethereum", "eth"],
        ["solana", "solana", "sol"],
        ["polygon", "polygon", "matic"],
        ["monad", "monad"],
        ["stacks", "stacks", "stx"],
        ["aptos", "aptos", "apt"],
        ["rootstock", "rootstock", "rsk"],
        ["casper", "casper"],
        ["azero", "aleph zero", "azero"],
        ["sei", "sei"],
        ["stellar", "stellar", "xlm", "soroban"],
        ["core", "core dao", "core"],
        ["algorand", "algorand", "algo"],
        ["mantle", "mantle", "mnt"],
        ["arbitrum", "arbitrum", "arb"],
        ["bsc", "bsc", "binance"]
      ];

      chainKeywords.forEach(([canonical, ...aliases]) => {
        if (aliases.some((a) => combined.includes(a))) {
          chainsSet.add(canonical);
        }
      });

      const liveUrl = cp?.liveUrl || gp.homepage || null;
      const featured = cp?.featured || false;

      const rankingScore = computeRankingScore({
        featured,
        isCurated,
        liveUrl,
        stars: gp.stars,
        forks: gp.forks,
        impact: cp?.impact || null,
        isBasic,
        updatedAt: gp.pushedAt
      });

      return {
        id: gp.id,
        name: gp.name,
        title: cp?.title || gp.title,
        description: cp?.description || gp.description,
        impact: cp?.impact || null,
        primaryLang: gp.language || "Not Specified",
        tech: Array.from(techSet),
        domain,
        subCategory: cp?.category || gp.category,
        chains: Array.from(chainsSet),
        github: gp.htmlUrl,
        liveUrl,
        featured,
        isBasic,
        rankingScore,
        stars: gp.stars,
        forks: gp.forks,
        updatedAt: gp.pushedAt,
      };
    });

    return unifiedList;
  }, []);

  // Precise Technology Filter Matcher
  const matchTech = (project: UnifiedProject, filter: string): boolean => {
    if (filter === "All Languages & Tech") return true;
    const f = filter.toLowerCase().trim();

    if (f === "typescript") {
      return (
        project.primaryLang === "TypeScript" ||
        project.tech.some((t) => {
          const tl = t.toLowerCase();
          return tl === "typescript" || tl === "ts" || tl === "tsx";
        })
      );
    }

    if (f === "javascript") {
      return (
        project.primaryLang === "JavaScript" ||
        project.tech.some((t) => {
          const tl = t.toLowerCase();
          return tl === "javascript" || tl === "js";
        })
      );
    }

    if (f === "python") {
      return (
        project.primaryLang === "Python" ||
        project.tech.some((t) => {
          const tl = t.toLowerCase();
          return (
            tl.includes("python") ||
            tl === "py" ||
            tl === "flask" ||
            tl === "fastapi" ||
            tl === "django"
          );
        })
      );
    }

    if (f === "solidity") {
      return (
        project.primaryLang === "Solidity" ||
        project.tech.some((t) => {
          const tl = t.toLowerCase();
          return (
            tl.includes("solidity") ||
            tl === "evm" ||
            tl.includes("smart contract") ||
            tl.includes("uniswap") ||
            tl.includes("hardhat") ||
            tl.includes("foundry")
          );
        })
      );
    }

    if (f === "rust") {
      return (
        project.primaryLang === "Rust" ||
        project.tech.some((t) => {
          const tl = t.toLowerCase();
          return (
            tl === "rust" ||
            tl === "soroban" ||
            tl === "cosmwasm" ||
            tl === "anchor"
          );
        })
      );
    }

    if (f.includes("react") || f.includes("next")) {
      return (
        project.tech.some((t) => {
          const tl = t.toLowerCase();
          return tl.includes("react") || tl.includes("next");
        }) || Boolean(project.liveUrl && project.liveUrl.includes("vercel.app"))
      );
    }

    if (f.includes("flutter") || f.includes("dart")) {
      return (
        project.primaryLang === "Dart" ||
        project.tech.some((t) => {
          const tl = t.toLowerCase();
          return tl.includes("flutter") || tl === "dart";
        }) ||
        project.name.toLowerCase().includes("flutter")
      );
    }

    if (f.includes("ai") || f.includes("llm")) {
      return (
        project.tech.some((t) => {
          const tl = t.toLowerCase();
          return (
            tl === "ai" ||
            tl === "ai / ml" ||
            tl.includes("rag") ||
            tl.includes("agent") ||
            tl.includes("gpt") ||
            tl.includes("llm") ||
            tl.includes("gemini") ||
            tl.includes("openai") ||
            tl.includes("machine learning")
          );
        }) ||
        project.domain === "AI & Machine Learning"
      );
    }

    if (f.includes("c++") || f === "c / c++") {
      return (
        project.primaryLang === "C++" ||
        project.primaryLang === "C" ||
        project.tech.some((t) => {
          const tl = t.toLowerCase();
          return tl === "c++" || tl === "cpp" || tl === "c";
        })
      );
    }

    if (f.includes("svelte")) {
      return (
        project.primaryLang === "Svelte" ||
        project.tech.some((t) => t.toLowerCase().includes("svelte"))
      );
    }

    if (f.includes("nest") || f.includes("node")) {
      return project.tech.some((t) => {
        const tl = t.toLowerCase();
        return tl.includes("nest") || tl === "node.js" || tl === "node" || tl === "express";
      });
    }

    if (f.includes("zk") || f.includes("crypto")) {
      return project.tech.some((t) => {
        const tl = t.toLowerCase();
        return (
          tl.includes("zk") ||
          tl.includes("snark") ||
          tl.includes("cryptography") ||
          tl.includes("encryption")
        );
      });
    }

    if (f === "java") {
      return (
        project.primaryLang === "Java" ||
        project.tech.some((t) => {
          const tl = t.toLowerCase().trim();
          return (
            tl === "java" ||
            tl.startsWith("java ") ||
            tl.endsWith(" java") ||
            tl.includes("spring")
          );
        })
      );
    }

    return (
      project.tech.some((t) => t.toLowerCase().includes(f)) ||
      project.primaryLang.toLowerCase().includes(f)
    );
  };

  // Precise Chain Matcher
  const matchChain = (project: UnifiedProject, chain: string): boolean => {
    if (chain === "All Chains") return true;
    const target = chain.toLowerCase().replace(" dao", "").trim();
    return (
      project.chains.some((c) => c.toLowerCase().includes(target)) ||
      project.title.toLowerCase().includes(target) ||
      project.name.toLowerCase().includes(target) ||
      project.description.toLowerCase().includes(target)
    );
  };

  // Filtering Logic with Priority Sorting (Top Projects on Top)
  const filteredProjects = useMemo(() => {
    const list = allProjects.filter((project) => {
      // 1. Tab filter (All Projects excludes basic; Basic tab specifically displays basic projects)
      if (activeTab === "all") {
        if (project.isBasic) return false;
      } else if (activeTab === "featured") {
        if (!project.featured || project.isBasic) return false;
      } else if (activeTab === "live") {
        if (!project.liveUrl || project.isBasic) return false;
      } else if (activeTab === "basic") {
        if (!project.isBasic) return false;
      }

      // 2. Domain / Category filter
      if (category !== "All Domains") {
        const targetDomain = category.toLowerCase().trim();
        const pDomain = project.domain.toLowerCase().trim();
        const pSub = (project.subCategory || "").toLowerCase().trim();

        const matchDomain =
          pDomain === targetDomain ||
          pSub === targetDomain ||
          pDomain.includes(targetDomain) ||
          targetDomain.includes(pDomain);

        if (!matchDomain) return false;
      }

      // 3. Language & Technology filter
      if (!matchTech(project, selectedTech)) {
        return false;
      }

      // 4. Chain filter
      if (!matchChain(project, selectedChain)) {
        return false;
      }

      // 5. Search query
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = project.title.toLowerCase().includes(q);
        const matchName = project.name.toLowerCase().includes(q);
        const matchDesc = project.description.toLowerCase().includes(q);
        const matchImpact = project.impact ? project.impact.toLowerCase().includes(q) : false;
        const matchTechTag = project.tech.some((t) => t.toLowerCase().includes(q));
        const matchChainTag = project.chains.some((c) => c.toLowerCase().includes(q));
        const matchLang = project.primaryLang.toLowerCase().includes(q);
        const matchDomain = project.domain.toLowerCase().includes(q);

        if (
          !matchTitle &&
          !matchName &&
          !matchDesc &&
          !matchImpact &&
          !matchTechTag &&
          !matchChainTag &&
          !matchLang &&
          !matchDomain
        ) {
          return false;
        }
      }

      return true;
    });

    // Sort: Top / Flagship / Live projects on the top!
    return list.sort((a, b) => b.rankingScore - a.rankingScore);
  }, [allProjects, activeTab, category, selectedTech, selectedChain, search]);

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All Domains" ||
    selectedTech !== "All Languages & Tech" ||
    selectedChain !== "All Chains" ||
    activeTab !== "all";

  const clearAllFilters = () => {
    setSearch("");
    setCategory("All Domains");
    setSelectedTech("All Languages & Tech");
    setSelectedChain("All Chains");
    setActiveTab("all");
  };

  const mainCount = useMemo(() => allProjects.filter((p) => !p.isBasic).length, [allProjects]);
  const featuredCount = useMemo(
    () => allProjects.filter((p) => p.featured && !p.isBasic).length,
    [allProjects]
  );
  const liveCount = useMemo(
    () => allProjects.filter((p) => p.liveUrl && !p.isBasic).length,
    [allProjects]
  );
  const basicCount = useMemo(() => allProjects.filter((p) => p.isBasic).length, [allProjects]);

  return (
    <div className="page-wrapper" style={{ position: "relative" }}>
      {/* Background Spotlight */}
      <div className="spotlight" style={{ top: "-100px", left: "50%", transform: "translateX(-50%)" }} />

      <div className="container" style={{ paddingTop: "48px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <span className="section-label">All Builds & Repositories</span>
          <h1 className="section-title text-gradient">Projects</h1>
          <p className="section-sub">
            A comprehensive catalog of my builds, hackathons, open source dApps, AI systems, and repositories ({allProjects.length} total).
          </p>
        </div>

        {/* Quick View Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          <button
            onClick={() => setActiveTab("all")}
            className="btn"
            style={{
              fontSize: "13px",
              padding: "8px 16px",
              background: activeTab === "all" ? "var(--accent)" : "var(--bg-card)",
              color: activeTab === "all" ? "#000" : "var(--text)",
              fontWeight: activeTab === "all" ? 700 : 500,
              border: "1px solid " + (activeTab === "all" ? "var(--accent)" : "var(--border)"),
              cursor: "pointer"
            }}
          >
            All Projects ({mainCount})
          </button>

          <button
            onClick={() => setActiveTab("featured")}
            className="btn"
            style={{
              fontSize: "13px",
              padding: "8px 16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: activeTab === "featured" ? "var(--accent)" : "var(--bg-card)",
              color: activeTab === "featured" ? "#000" : "var(--text)",
              fontWeight: activeTab === "featured" ? 700 : 500,
              border: "1px solid " + (activeTab === "featured" ? "var(--accent)" : "var(--border)"),
              cursor: "pointer"
            }}
          >
            <Sparkles size={14} />
            Featured & Flagship ({featuredCount})
          </button>

          <button
            onClick={() => setActiveTab("live")}
            className="btn"
            style={{
              fontSize: "13px",
              padding: "8px 16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: activeTab === "live" ? "var(--accent)" : "var(--bg-card)",
              color: activeTab === "live" ? "#000" : "var(--text)",
              fontWeight: activeTab === "live" ? 700 : 500,
              border: "1px solid " + (activeTab === "live" ? "var(--accent)" : "var(--border)"),
              cursor: "pointer"
            }}
          >
            <Globe size={14} />
            Live Deployments ({liveCount})
          </button>

          <button
            onClick={() => setActiveTab("basic")}
            className="btn"
            style={{
              fontSize: "13px",
              padding: "8px 16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: activeTab === "basic" ? "var(--accent)" : "var(--bg-card)",
              color: activeTab === "basic" ? "#000" : "var(--text)",
              fontWeight: activeTab === "basic" ? 700 : 500,
              border: "1px solid " + (activeTab === "basic" ? "var(--accent)" : "var(--border)"),
              cursor: "pointer"
            }}
          >
            <BookOpen size={14} />
            Basic ({basicCount})
          </button>
        </div>

        {/* Basic Tab Explanatory Notice */}
        {activeTab === "basic" && (
          <div
            style={{
              padding: "16px 20px",
              marginBottom: "24px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            <div>
              <strong style={{ color: "var(--text)" }}>Basic & Learning Repositories:</strong> Hello-world projects, CV repos, practice exercises, and starter templates.
            </div>
          </div>
        )}

        {/* Search & Advanced Filters Panel */}
        <div
          className="card"
          style={{
            padding: "24px",
            marginBottom: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            border: "1px solid var(--border)",
          }}
        >
          {/* Search bar */}
          <div style={{ position: "relative", width: "100%" }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-faint)",
              }}
            />
            <input
              type="text"
              placeholder={
                activeTab === "basic"
                  ? "Search basic repos, practice code, exercises..."
                  : "Search across all projects, ecosystems, keywords, or tech..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              style={{
                paddingLeft: "40px",
                paddingRight: search ? "40px" : "14px",
                width: "100%",
                fontSize: "14px",
              }}
              id="project-search"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  display: "flex",
                  cursor: "pointer",
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Dropdown selectors row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {/* Domain / Category Dropdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Domain / Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input"
                style={{
                  width: "100%",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3e635' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  backgroundSize: "14px",
                  paddingRight: "36px",
                }}
              >
                {DOMAIN_OPTIONS.map((c) => (
                  <option key={c} value={c} style={{ background: "var(--bg-card)", color: "var(--text)" }}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Language & Technology Dropdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Language & Technology
              </label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="input"
                id="tech-select-filter"
                style={{
                  width: "100%",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3e635' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  backgroundSize: "14px",
                  paddingRight: "36px",
                }}
              >
                {TECH_OPTIONS.map((t) => (
                  <option key={t} value={t} style={{ background: "var(--bg-card)", color: "var(--text)" }}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Blockchain Ecosystem Dropdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Blockchain Ecosystem
              </label>
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="input"
                style={{
                  width: "100%",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3e635' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  backgroundSize: "14px",
                  paddingRight: "36px",
                }}
              >
                {CHAIN_OPTIONS.map((ch) => (
                  <option key={ch} value={ch} style={{ background: "var(--bg-card)", color: "var(--text)" }}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Summary Bar & Chips */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              paddingTop: "14px",
              borderTop: "1px solid var(--border)",
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <SlidersHorizontal size={14} style={{ color: "var(--accent)" }} />
              <span>
                Showing <strong style={{ color: "var(--text)" }}>{filteredProjects.length}</strong> projects
                {activeTab === "all" && " (Top projects first)"}
              </span>

              {/* Active Filter Chips */}
              {selectedTech !== "All Languages & Tech" && (
                <span
                  onClick={() => setSelectedTech("All Languages & Tech")}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "99px",
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid rgba(163,230,53,0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  Tech: {selectedTech} <X size={11} />
                </span>
              )}

              {category !== "All Domains" && (
                <span
                  onClick={() => setCategory("All Domains")}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "99px",
                    background: "rgba(255,255,255,0.08)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  Domain: {category} <X size={11} />
                </span>
              )}

              {selectedChain !== "All Chains" && (
                <span
                  onClick={() => setSelectedChain("All Chains")}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "99px",
                    background: "rgba(255,255,255,0.08)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  Chain: {selectedChain} <X size={11} />
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="btn btn-ghost"
                style={{ fontSize: "12px", padding: "4px 10px", gap: "6px", color: "var(--accent)", cursor: "pointer" }}
              >
                <RotateCcw size={13} /> Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid-auto" style={{ paddingBottom: "80px", gap: "20px" }}>
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="card"
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: project.featured
                  ? "1px solid rgba(163, 230, 53, 0.35)"
                  : "1px solid var(--border)",
                background: project.featured
                  ? "linear-gradient(180deg, rgba(163,230,53,0.03) 0%, var(--bg-card) 100%)"
                  : "var(--bg-card)",
              }}
            >
              {/* Card Header: Title & Badges */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--text)",
                    letterSpacing: "-0.2px",
                    lineHeight: 1.35,
                  }}
                >
                  {project.title}
                </h2>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                  {project.featured && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "99px",
                        background: "var(--accent-dim)",
                        color: "var(--accent)",
                        border: "1px solid rgba(163,230,53,0.3)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Sparkles size={10} /> Featured
                    </span>
                  )}
                  {project.isBasic && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: "99px",
                        background: "rgba(255,255,255,0.06)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Basic
                    </span>
                  )}
                  {project.liveUrl && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: "99px",
                        background: "rgba(52, 211, 153, 0.12)",
                        color: "var(--green)",
                        border: "1px solid rgba(52, 211, 153, 0.3)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--green)",
                          boxShadow: "0 0 6px var(--green)",
                        }}
                      />
                      Live
                    </span>
                  )}
                </div>
              </div>

              {/* Domain label */}
              <div style={{ marginBottom: "10px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--accent)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {project.domain}
                </span>
                {project.subCategory && project.subCategory !== project.domain && (
                  <span style={{ fontSize: "11px", color: "var(--text-faint)", marginLeft: "6px" }}>
                    • {project.subCategory}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                  marginBottom: "14px",
                  flex: 1,
                }}
              >
                {project.description}
              </p>

              {/* Impact Callout */}
              {project.impact && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--accent)",
                    marginBottom: "14px",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  ↗ {project.impact}
                </p>
              )}

              {/* Tech Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                {project.primaryLang && project.primaryLang !== "Not Specified" && (
                  <span
                    className="tag"
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      background: "rgba(255,255,255,0.08)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {project.primaryLang}
                  </span>
                )}
                {project.tech
                  .filter((t) => t.toLowerCase() !== project.primaryLang.toLowerCase())
                  .slice(0, 4)
                  .map((t) => (
                    <span key={t} className="tag" style={{ fontSize: "11px" }}>
                      {t}
                    </span>
                  ))}
              </div>

              {/* Chain badges */}
              {project.chains && project.chains.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                  {project.chains.map((c) => (
                    <span
                      key={c}
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "99px",
                        background: "var(--accent-dim2)",
                        color: "var(--accent)",
                        border: "1px solid rgba(163,230,53,0.2)",
                        textTransform: "capitalize",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {/* Card Footer: Metrics & Action Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "14px",
                  marginTop: "auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "var(--text-muted)" }}>
                  {project.stars > 0 && (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star size={12} fill="currentColor" /> {project.stars}
                    </span>
                  )}
                  {project.forks > 0 && (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <GitFork size={12} /> {project.forks}
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    style={{ gap: "6px", fontSize: "12px", padding: "6px 12px" }}
                  >
                    <Github size={13} /> Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      style={{
                        gap: "6px",
                        fontSize: "12px",
                        padding: "6px 12px",
                        color: "var(--accent)",
                        borderColor: "rgba(163, 230, 53, 0.3)",
                      }}
                    >
                      <ExternalLink size={13} /> Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          {filteredProjects.length === 0 && (
            <div
              style={{
                gridColumn: "1/-1",
                padding: "48px 24px",
                textAlign: "center",
                background: "var(--bg-card)",
                borderRadius: "var(--radius)",
                border: "1px dashed var(--border)",
              }}
            >
              <p style={{ color: "var(--text)", fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
                No projects matched your criteria
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>
                Try adjusting your search query, selecting &quot;All Domains&quot;, or resetting active filters.
              </p>
              <button onClick={clearAllFilters} className="btn btn-primary" style={{ fontSize: "13px", cursor: "pointer" }}>
                Reset all filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            color: "var(--text-muted)",
            fontSize: "14px",
          }}
        >
          Loading projects catalog…
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
