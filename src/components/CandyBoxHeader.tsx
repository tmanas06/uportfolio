"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  MessageSquare,
  Wallet,
  LayoutGrid,
  Star,
  GitFork,
  Trophy,
  AlertCircle,
  LogOut,
  FolderKanban,
  Sparkles,
  Briefcase,
  Award,
  User,
  X,
  ArrowRight,
  Home,
  Mail,
  FileText,
  ExternalLink,
  Boxes,
  GraduationCap,
  Github,
  Linkedin,
  Globe,
  Menu
} from "lucide-react";
import {
  personalInfo,
  notifications,
  projects,
  skills,
  experience,
  achievements,
  certifications,
} from "@/lib/data";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: "project" | "skill" | "experience" | "achievement" | "certification";
  href: string;
  icon: React.ReactNode;
  color: string;
}

export default function CandyBoxHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAccess, setShowQuickAccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const quickAccessRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // WalletConnect hooks
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const unreadCount = notifications.length;

  // Build searchable index
  const searchIndex = useMemo((): SearchResult[] => {
    const results: SearchResult[] = [];

    projects.forEach((project) => {
      results.push({
        id: `project-${project.id}`,
        title: project.title,
        subtitle: project.tech.slice(0, 3).join(", "),
        category: "project",
        href: `/projects?search=${encodeURIComponent(project.title)}`,
        icon: <FolderKanban className="w-4 h-4" />,
        color: "#BFFF00",
      });
    });

    skills.languages?.forEach((skill) => {
      results.push({
        id: `skill-lang-${skill.name}`,
        title: skill.name,
        subtitle: `Language - ${skill.level}% proficiency`,
        category: "skill",
        href: "/skills",
        icon: <Sparkles className="w-4 h-4" />,
        color: "#BFFF00",
      });
    });

    skills.frameworks?.forEach((skill) => {
      results.push({
        id: `skill-fw-${skill.name}`,
        title: skill.name,
        subtitle: `Framework - ${skill.level}% proficiency`,
        category: "skill",
        href: "/skills",
        icon: <Sparkles className="w-4 h-4" />,
        color: "#BFFF00",
      });
    });

    skills.blockchain?.forEach((skill) => {
      results.push({
        id: `skill-bc-${skill.name}`,
        title: skill.name,
        subtitle: `Blockchain - ${skill.level}% proficiency`,
        category: "skill",
        href: "/skills",
        icon: <Sparkles className="w-4 h-4" />,
        color: "#BFFF00",
      });
    });

    skills.tools?.forEach((skill) => {
      results.push({
        id: `skill-tool-${skill.name}`,
        title: skill.name,
        subtitle: `Tool - ${skill.level}% proficiency`,
        category: "skill",
        href: "/skills",
        icon: <Sparkles className="w-4 h-4" />,
        color: "#BFFF00",
      });
    });

    experience.forEach((exp, index) => {
      results.push({
        id: `exp-${index}`,
        title: exp.title,
        subtitle: `${exp.company} - ${exp.period}`,
        category: "experience",
        href: "/about",
        icon: <Briefcase className="w-4 h-4" />,
        color: "#BFFF00",
      });
    });

    achievements.forEach((achievement, index) => {
      results.push({
        id: `achievement-${index}`,
        title: achievement.title,
        subtitle: achievement.position,
        category: "achievement",
        href: "/about",
        icon: <Trophy className="w-4 h-4" />,
        color: "#FF3D00",
      });
    });

    certifications.forEach((cert, index) => {
      results.push({
        id: `cert-${index}`,
        title: cert.name,
        subtitle: `${cert.issuer} - ${cert.year}`,
        category: "certification",
        href: "/about",
        icon: <Award className="w-4 h-4" />,
        color: "#FFD600",
      });
    });

    return results;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [searchQuery, searchIndex]);

  const groupedResults = useMemo(() => {
    const groups: { [key: string]: SearchResult[] } = {};
    searchResults.forEach((result) => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });
    return groups;
  }, [searchResults]);

  const categoryLabels: { [key: string]: string } = {
    project: "Projects",
    skill: "Skills",
    experience: "Experience",
    achievement: "Achievements",
    certification: "Certifications",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setShowMobileSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowQuickAccess(false);
        setShowMobileSearch(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (showMobileSearch && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [showMobileSearch]);

  const handleResultClick = (result: SearchResult) => {
    setSearchQuery("");
    setShowSearch(false);
    setShowMobileSearch(false);
    router.push(result.href);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    } else if (searchQuery.trim()) {
      router.push(`/projects?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
      setShowMobileSearch(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "star":
        return <Star className="w-4 h-4 text-[var(--accent)]" />;
      case "fork":
        return <GitFork className="w-4 h-4 text-[var(--accent)]" />;
      case "win":
        return <Trophy className="w-4 h-4 text-[var(--accent-2)]" />;
      case "message":
        return <MessageSquare className="w-4 h-4 text-[var(--accent)]" />;
      default:
        return <AlertCircle className="w-4 h-4 text-[var(--accent-2)]" />;
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      {/* ═══ HEADER BAR ═══ */}
      <header
        className="fixed top-0 right-0 z-50 h-[var(--header-height)] bg-[var(--bg-primary)] border-b-[3px] border-[var(--border-color)] transition-all duration-500"
        style={{ left: 'var(--sidebar-current-width, 0px)' }}
      >
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Left: Sidebar Toggle + Logo */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("sidebar-global-toggle"))}
              className="flex w-11 h-11 border-[3px] border-[var(--border-color)] bg-transparent items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black transition-colors active:translate-x-[2px] active:translate-y-[2px]"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-[var(--accent)] border-[3px] border-[var(--border-color)] flex items-center justify-center shadow-[3px_3px_0px_var(--border-color)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[5px_5px_0px_var(--border-color)] transition-all">
                <span className="text-black font-black text-2xl font-heading">M</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[var(--text-primary)] font-black text-xl tracking-tight leading-none uppercase font-heading">
                  {personalInfo.firstName}
                </span>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mt-1 font-mono">
                  /// PORTFOLIO
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Search (Desktop) */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[var(--accent)]" style={{ zIndex: 10 }} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="SEARCH_QUERY..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearch(true);
                  }}
                  onFocus={() => setShowSearch(true)}
                  className="w-full h-12 pr-12 bg-transparent border-[3px] border-[var(--border-color)] text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors font-mono uppercase"
                  style={{ paddingLeft: '56px' }}
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--accent-2)] p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showSearch && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-14 left-0 right-0 bg-[var(--bg-primary)] border-[3px] border-[var(--border-color)] shadow-[4px_4px_0px_var(--border-color)] p-4 max-h-[70vh] overflow-y-auto z-50"
                >
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {Object.entries(groupedResults).map(([category, results]) => (
                        <div key={category}>
                          <div className="flex items-center gap-3 mb-3 px-2">
                            <div className="h-[2px] flex-1 bg-[var(--border-color)]" />
                            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em]">
                              {categoryLabels[category]}
                            </p>
                            <div className="h-[2px] flex-1 bg-[var(--border-color)]" />
                          </div>
                          <div className="flex flex-col gap-1">
                            {results.map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                className="flex items-center gap-4 p-3 hover:bg-[var(--accent)] hover:text-black border-[2px] border-transparent hover:border-[var(--border-color)] transition-all text-left w-full group/res"
                              >
                                <div
                                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-[2px] border-[var(--border-color)]"
                                  style={{ backgroundColor: `${result.color}33` }}
                                >
                                  <span style={{ color: result.color }}>{result.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-[var(--text-primary)] group-hover/res:text-black uppercase">
                                    {result.title}
                                  </p>
                                  <p className="text-xs text-[var(--text-secondary)] truncate group-hover/res:text-black/70">{result.subtitle}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover/res:text-black" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 border-[3px] border-[var(--border-color)] flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-[var(--text-muted)]" />
                      </div>
                      <p className="text-[var(--text-primary)] font-bold text-lg uppercase">NO_RESULTS for &quot;{searchQuery}&quot;</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 uppercase">Refine search parameters</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Search (Mobile) */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden w-11 h-11 border-[3px] border-[var(--border-color)] bg-transparent flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-11 h-11 border-[3px] border-[var(--border-color)] bg-transparent flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black transition-colors relative group"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--accent-2)] border-[2px] border-[var(--border-color)] text-[10px] font-black text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-14 w-80 bg-[var(--bg-primary)] border-[3px] border-[var(--border-color)] shadow-[4px_4px_0px_var(--border-color)] p-4 z-50"
                  >
                    <div className="flex items-center justify-between p-2 mb-4 border-b-[2px] border-[var(--border-color)] pb-4">
                      <h3 className="font-black text-[var(--text-primary)] uppercase text-sm">/// Activity_Log</h3>
                      <button className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest hover:text-[var(--accent-2)]">Mark read</button>
                    </div>
                    <div className="flex flex-col gap-1 max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex items-start gap-4 p-3 hover:bg-[var(--accent)] hover:text-black cursor-pointer transition-colors border-[2px] border-transparent hover:border-[var(--border-color)] group"
                        >
                          <div className="w-10 h-10 border-[2px] border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
                            {getNotificationIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-black">{notif.message}</p>
                            <p className="text-xs text-[var(--text-muted)] font-mono mt-1 group-hover:text-black/60">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wallet Connect */}
            <div className="flex items-center gap-2">
              {isConnected && address ? (
                <div className="flex items-center gap-2 border-[3px] border-[var(--border-color)] p-1 pr-3">
                  <div className="w-8 h-8 bg-[var(--accent)] flex items-center justify-center border-r-[2px] border-[var(--border-color)]">
                    <div className="w-3 h-3 bg-black" />
                  </div>
                  <span className="text-xs font-black text-[var(--text-primary)] px-1 font-mono">
                    {formatAddress(address as string)}
                  </span>
                  <button
                    onClick={() => disconnect()}
                    className="p-1.5 hover:bg-[var(--accent-2)] hover:text-white text-[var(--text-muted)] transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => open()}
                  className={`${isMobile ? 'w-11 px-0' : 'h-11 px-6'} bg-[var(--accent)] border-[3px] border-[var(--border-color)] flex items-center justify-center gap-3 text-black font-black shadow-[3px_3px_0px_var(--border-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--border-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all`}
                >
                  <Wallet className="w-4 h-4" />
                  {!isMobile && <span className="text-sm tracking-tight font-black uppercase">Connect</span>}
                </button>
              )}
            </div>

            {/* Quick Access Button */}
            <button
              onClick={() => setShowQuickAccess(!showQuickAccess)}
              className={`w-11 h-11 border-[3px] border-[var(--border-color)] flex items-center justify-center transition-all ${showQuickAccess
                ? "bg-[var(--accent)] text-black shadow-[3px_3px_0px_var(--border-color)]"
                : "bg-transparent text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black"
                }`}
              title="Quick Access"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>

            {/* Profile (Mobile) */}
            <Link
              href="/about"
              className="sm:hidden w-11 h-11 bg-[var(--accent)] border-[3px] border-[var(--border-color)] flex items-center justify-center shadow-[3px_3px_0px_var(--border-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <span className="text-black font-black text-sm">M</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ═══ MOBILE SEARCH OVERLAY ═══ */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--bg-primary)] md:hidden"
          >
            <div ref={mobileSearchRef} className="p-6">
              <div className="flex items-center gap-4 mb-8">
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" style={{ zIndex: 10 }} />
                    <input
                      ref={mobileInputRef}
                      type="text"
                      placeholder="SEARCH_QUERY..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-14 pr-12 bg-transparent border-[3px] border-[var(--border-color)] text-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] font-mono uppercase font-bold"
                      style={{ paddingLeft: '56px' }}
                    />
                    <AnimatePresence>
                      {searchQuery && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] p-2"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
                <button
                  onClick={() => {
                    setShowMobileSearch(false);
                    setSearchQuery("");
                  }}
                  className="text-[var(--text-primary)] font-black text-sm tracking-tight px-2 uppercase"
                >
                  Cancel
                </button>
              </div>

              {searchQuery && (
                <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {Object.entries(groupedResults).map(([category, results]) => (
                        <div key={category}>
                          <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] mb-4 border-b-[2px] border-[var(--border-color)] pb-2">
                            {categoryLabels[category]}
                          </p>
                          <div className="grid grid-cols-1 gap-3">
                            {results.map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                className="flex items-center gap-4 p-4 border-[3px] border-[var(--border-color)] shadow-[3px_3px_0px_var(--border-color)] text-left w-full active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-[var(--accent)] hover:text-black"
                              >
                                <div
                                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 border-[2px] border-[var(--border-color)]"
                                  style={{ backgroundColor: `${result.color}33` }}
                                >
                                  <span style={{ color: result.color }}>{result.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-base font-bold text-[var(--text-primary)] uppercase">{result.title}</p>
                                  <p className="text-xs text-[var(--text-secondary)] font-mono truncate">{result.subtitle}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-[var(--text-muted)]" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-20 h-20 border-[3px] border-[var(--border-color)] flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-[var(--text-muted)]" />
                      </div>
                      <p className="text-[var(--text-primary)] font-black text-2xl uppercase">NO_FINDINGS</p>
                      <p className="text-[var(--text-secondary)] mt-2 font-mono">Try different search terms</p>
                    </div>
                  )}
                </div>
              )}

              {!searchQuery && (
                <div className="mt-8">
                  <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] mb-6 border-b-[2px] border-[var(--border-color)] pb-2">
                    /// Quick_Nav
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { href: "/projects", icon: FolderKanban, label: "Projects", color: "var(--accent)" },
                      { href: "/skills", icon: Sparkles, label: "Skills", color: "var(--accent)" },
                      { href: "/about", icon: User, label: "Profile", color: "var(--accent)" },
                      { href: "/contact", icon: Mail, label: "Message", color: "var(--accent-2)" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setShowMobileSearch(false)}
                        className="flex flex-col gap-4 p-6 border-[3px] border-[var(--border-color)] shadow-[3px_3px_0px_var(--border-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-[var(--accent)] hover:text-black group"
                      >
                        <div className="w-12 h-12 border-[2px] border-[var(--border-color)] flex items-center justify-center">
                          <item.icon className="w-6 h-6" style={{ color: item.color }} />
                        </div>
                        <span className="text-base font-black text-[var(--text-primary)] uppercase group-hover:text-black">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ QUICK ACCESS MODAL ═══ */}
      <AnimatePresence>
        {showQuickAccess && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/80"
              onClick={() => setShowQuickAccess(false)}
            />

            {/* Modal */}
            <motion.div
              ref={quickAccessRef}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="fixed left-4 right-4 top-1/2 -translate-y-1/2 z-[80] sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[500px]"
            >
              <div className="bg-[var(--bg-primary)] border-[3px] border-[var(--border-color)] shadow-[6px_6px_0px_var(--border-color)] overflow-hidden">
                {/* Header */}
                <div className="p-8 pb-4 border-b-[3px] border-[var(--border-color)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[var(--accent)] border-[3px] border-[var(--border-color)] flex items-center justify-center shadow-[3px_3px_0px_var(--border-color)]">
                        <LayoutGrid className="w-7 h-7 text-black" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading">CMD_Center</h2>
                        <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mt-1 font-mono">/// Navigation</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowQuickAccess(false)}
                      className="w-12 h-12 border-[3px] border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent-2)] hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Navigation Grid */}
                <div className="p-8 pt-6">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { href: "/", icon: Home, label: "Home" },
                      { href: "/projects", icon: FolderKanban, label: "Projects" },
                      { href: "/skills", icon: Sparkles, label: "Skills" },
                      { href: "/about", icon: User, label: "Profile" },
                      { href: "/contact", icon: Mail, label: "Contact" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setShowQuickAccess(false)}
                        className={`flex flex-col items-center gap-3 p-6 border-[3px] border-[var(--border-color)] transition-all ${pathname === item.href
                          ? "bg-[var(--accent)] text-black shadow-[4px_4px_0px_var(--border-color)]"
                          : "hover:bg-[var(--accent)] hover:text-black shadow-[3px_3px_0px_var(--border-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--border-color)]"
                          } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
                      >
                        <div className="w-14 h-14 border-[2px] border-[var(--border-color)] flex items-center justify-center">
                          <item.icon className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-black tracking-widest uppercase">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 p-6 border-[3px] border-[var(--border-color)] shadow-[3px_3px_0px_var(--border-color)] hover:bg-[var(--accent)] hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--border-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                      <div className="w-14 h-14 border-[2px] border-[var(--border-color)] flex items-center justify-center">
                        <FileText className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black tracking-widest uppercase">Resume</span>
                    </a>
                  </div>

                  {/* Ecosystem Tools */}
                  <div className="mt-8 pt-6 border-t-[3px] border-[var(--border-color)]">
                    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-6 font-mono">/// Ecosystem</p>
                    <div className="grid grid-cols-2 gap-4">
                      <a
                        href="https://testnet-wallet-teal.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-5 border-[3px] border-[var(--border-color)] shadow-[3px_3px_0px_var(--border-color)] hover:bg-[var(--accent)] hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--border-color)] transition-all group"
                      >
                        <div className="w-12 h-12 border-[2px] border-[var(--border-color)] flex items-center justify-center">
                          <Boxes className="w-6 h-6 text-[var(--accent)]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-[var(--text-primary)] uppercase group-hover:text-black">Casper Hub</p>
                          <p className="text-[10px] font-bold text-[var(--text-muted)] font-mono group-hover:text-black/60">Institutional Suite</p>
                        </div>
                      </a>
                      <a
                        href="https://github.com/tmanas06"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-5 border-[3px] border-[var(--border-color)] shadow-[3px_3px_0px_var(--border-color)] hover:bg-[var(--accent)] hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--border-color)] transition-all group"
                      >
                        <div className="w-12 h-12 border-[2px] border-[var(--border-color)] flex items-center justify-center">
                          <Github className="w-6 h-6 text-[var(--text-primary)]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-[var(--text-primary)] uppercase group-hover:text-black">Open Source</p>
                          <p className="text-[10px] font-bold text-[var(--text-muted)] font-mono group-hover:text-black/60">GitHub Portfolio</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
