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

  // WalletConnect hooks
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const unreadCount = notifications.length;

  // Build searchable index
  const searchIndex = useMemo((): SearchResult[] => {
    const results: SearchResult[] = [];

    // Add projects
    projects.forEach((project) => {
      results.push({
        id: `project-${project.id}`,
        title: project.title,
        subtitle: project.tech.slice(0, 3).join(", "),
        category: "project",
        href: `/projects?search=${encodeURIComponent(project.title)}`,
        icon: <FolderKanban className="w-4 h-4" />,
        color: "#F0B90B",
      });
    });

    // Add skills - languages
    skills.languages?.forEach((skill) => {
      results.push({
        id: `skill-lang-${skill.name}`,
        title: skill.name,
        subtitle: `Language - ${skill.level}% proficiency`,
        category: "skill",
        href: "/skills",
        icon: <Sparkles className="w-4 h-4" />,
        color: "#F0B90B",
      });
    });

    // Add skills - frameworks
    skills.frameworks?.forEach((skill) => {
      results.push({
        id: `skill-fw-${skill.name}`,
        title: skill.name,
        subtitle: `Framework - ${skill.level}% proficiency`,
        category: "skill",
        href: "/skills",
        icon: <Sparkles className="w-4 h-4" />,
        color: "#00D4AA",
      });
    });

    // Add skills - blockchain
    skills.blockchain?.forEach((skill) => {
      results.push({
        id: `skill-bc-${skill.name}`,
        title: skill.name,
        subtitle: `Blockchain - ${skill.level}% proficiency`,
        category: "skill",
        href: "/skills",
        icon: <Sparkles className="w-4 h-4" />,
        color: "#627EEA",
      });
    });

    // Add skills - tools
    skills.tools?.forEach((skill) => {
      results.push({
        id: `skill-tool-${skill.name}`,
        title: skill.name,
        subtitle: `Tool - ${skill.level}% proficiency`,
        category: "skill",
        href: "/skills",
        icon: <Sparkles className="w-4 h-4" />,
        color: "#8247E5",
      });
    });

    // Add experience
    experience.forEach((exp, index) => {
      results.push({
        id: `exp-${index}`,
        title: exp.title,
        subtitle: `${exp.company} - ${exp.period}`,
        category: "experience",
        href: "/about",
        icon: <Briefcase className="w-4 h-4" />,
        color: "#00D4AA",
      });
    });

    // Add achievements
    achievements.forEach((achievement, index) => {
      results.push({
        id: `achievement-${index}`,
        title: achievement.title,
        subtitle: achievement.position,
        category: "achievement",
        href: "/about",
        icon: <Trophy className="w-4 h-4" />,
        color: "#F0B90B",
      });
    });

    // Add certifications
    certifications.forEach((cert, index) => {
      results.push({
        id: `cert-${index}`,
        title: cert.name,
        subtitle: `${cert.issuer} - ${cert.year}`,
        category: "certification",
        href: "/about",
        icon: <Award className="w-4 h-4" />,
        color: "#627EEA",
      });
    });

    return results;
  }, []);

  // Filter results based on search query
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
      .slice(0, 8); // Limit to 8 results
  }, [searchQuery, searchIndex]);

  // Group results by category
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

  // Handle click outside to close search and quick access
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

  // Handle ESC key to close quick access
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

  // Focus input when mobile search opens
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
        return <Star className="w-4 h-4 text-[#F0B90B]" />;
      case "fork":
        return <GitFork className="w-4 h-4 text-[#627EEA]" />;
      case "win":
        return <Trophy className="w-4 h-4 text-[#00D4AA]" />;
      case "message":
        return <MessageSquare className="w-4 h-4 text-[#8247E5]" />;
      default:
        return <AlertCircle className="w-4 h-4 text-[#F6465D]" />;
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] glass-effect border-b border-white/5">
        <div className="h-full px-4 lg:px-8 flex items-center justify-between">
          {/* Left: Logo & Sidebar Toggle */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("sidebar-global-toggle"))}
              className="hidden lg:flex w-11 h-11 rounded-xl bg-white/5 border border-white/5 items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-all active:scale-95"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-[0_0_20px_rgba(240,185,11,0.3)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-[#05070A] font-black text-2xl">M</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-white font-black text-xl tracking-tight leading-none group-hover:text-yellow-500 transition-colors">
                  {personalInfo.firstName.split(' ').pop()}
                </span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mt-1">Portfolio</span>
              </div>
            </Link>
          </div>

          {/* Center: Search (Desktop) */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-yellow-500 transition-colors" style={{ zIndex: 10 }} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search projects, skills, ecosystems..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearch(true);
                  }}
                  onFocus={() => setShowSearch(true)}
                  className="w-full h-12 pr-12 bg-white/5 border border-white/10 rounded-2xl text-base text-white placeholder-muted focus:outline-none focus:border-yellow-500/50 transition-all backdrop-blur-md"
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
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white p-1 hover:bg-white/10 rounded-lg transition-all"
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
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.98 }}
                  className="absolute top-12 left-0 right-0 glass-card p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-white/10 max-h-[70vh] overflow-y-auto rounded-[2rem]"
                >
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col gap-6 p-2">
                      {Object.entries(groupedResults).map(([category, results]) => (
                        <div key={category}>
                          <div className="flex items-center gap-3 mb-3 px-2">
                            <div className="h-px flex-1 bg-white/5" />
                            <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em]">
                              {categoryLabels[category]}
                            </p>
                            <div className="h-px flex-1 bg-white/5" />
                          </div>
                          <div className="flex flex-col gap-1">
                            {results.map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left w-full group/res"
                              >
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/res:scale-110"
                                  style={{ backgroundColor: `${result.color}15` }}
                                >
                                  <span style={{ color: result.color }}>{result.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-white group-hover/res:text-yellow-500 transition-colors">
                                    {result.title}
                                  </p>
                                  <p className="text-xs text-secondary truncate font-medium">{result.subtitle}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted opacity-0 -translate-x-2 group-hover/res:opacity-100 group-hover/res:translate-x-0 transition-all" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-muted" />
                      </div>
                      <p className="text-white font-bold text-lg">No results for "{searchQuery}"</p>
                      <p className="text-xs text-secondary mt-1">Refine your search parameters</p>
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
              className="md:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-secondary hover:text-white transition-all hover:bg-white/10"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-secondary hover:text-white transition-all hover:bg-white/10 relative group"
              >
                <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-lg text-[10px] font-black text-black flex items-center justify-center shadow-lg border-2 border-[#05070A]">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 10, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 top-12 w-80 glass-card p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-white/10 rounded-3xl"
                  >
                    <div className="flex items-center justify-between p-2 mb-4">
                      <h3 className="font-bold text-white">Activity</h3>
                      <button className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest hover:underline">Mark read</button>
                    </div>
                    <div className="flex flex-col gap-1 max-h-80 overflow-y-auto p-1 custom-scrollbar">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/5 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            {getNotificationIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white group-hover:text-yellow-500 transition-colors">{notif.message}</p>
                            <p className="text-xs text-muted font-medium mt-1">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wallet & Quick Access Split */}
            <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-3">
              {isConnected && address ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => open()}
                    className="h-11 px-4 rounded-xl bg-white/5 border border-yellow-500/20 flex items-center gap-3 text-yellow-500 font-bold hover:bg-yellow-500/10 transition-all group"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-sm tracking-tight">{formatAddress(address)}</span>
                  </button>
                  <button
                    onClick={() => disconnect()}
                    className="h-11 w-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-secondary hover:text-red-400 hover:bg-red-400/10 transition-all hover:border-red-400/20"
                    title="Disconnect"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => open()}
                  className="h-11 px-6 rounded-xl bg-gold-gradient items-center gap-3 text-black font-black hover:shadow-[0_0_30px_rgba(240,185,11,0.4)] transition-all flex active:scale-95"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm tracking-tight">Connect</span>
                </button>
              )}
            </div>

            {/* Quick Access (Candy Box) Button */}
            <button
              onClick={() => setShowQuickAccess(!showQuickAccess)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${showQuickAccess
                ? "bg-yellow-500 text-black shadow-[0_0_30px_rgba(240,185,11,0.5)] scale-110"
                : "bg-white/5 text-secondary border border-white/5 hover:text-white hover:bg-white/10"
                }`}
              title="Quick Access"
            >
              <LayoutGrid className="w-5 h-5 transition-transform group-hover:rotate-90" />
            </button>

            {/* Profile (Mobile) */}
            <Link
              href="/about"
              className="sm:hidden w-11 h-11 rounded-xl bg-gold-gradient flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <span className="text-black font-black text-sm">M</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#05070A]/95 backdrop-blur-xl md:hidden"
          >
            <div ref={mobileSearchRef} className="p-6">
              <div className="flex items-center gap-4 mb-8">
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-yellow-500 transition-colors" style={{ zIndex: 10 }} />
                    <input
                      ref={mobileInputRef}
                      type="text"
                      placeholder="Search everything..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-14 pr-12 bg-white/5 border border-white/10 rounded-2xl text-lg text-white placeholder-muted focus:outline-none focus:border-yellow-500/50 transition-all font-medium"
                      style={{ paddingLeft: '56px' }}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted p-2 hover:bg-white/10 rounded-xl"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </form>
                <button
                  onClick={() => {
                    setShowMobileSearch(false);
                    setSearchQuery("");
                  }}
                  className="text-white font-bold text-sm tracking-tight px-2"
                >
                  Cancel
                </button>
              </div>

              {searchQuery && (
                <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-1 custom-scrollbar">
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col gap-8">
                      {Object.entries(groupedResults).map(([category, results]) => (
                        <div key={category}>
                          <div className="flex items-center gap-3 mb-4">
                            <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em]">
                              {categoryLabels[category]}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {results.map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/5 border border-white/5 text-left w-full active:scale-[0.98] transition-all"
                              >
                                <div
                                  className="w-12 h-12 rounded-[1rem] flex items-center justify-center flex-shrink-0 shadow-lg"
                                  style={{ backgroundColor: `${result.color}15` }}
                                >
                                  <span style={{ color: result.color }}>{result.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-base font-bold text-white">{result.title}</p>
                                  <p className="text-xs text-secondary font-medium truncate">{result.subtitle}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-muted" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Search className="w-10 h-10 text-muted" />
                      </div>
                      <p className="text-white font-black text-2xl">No findings</p>
                      <p className="text-secondary mt-2 font-medium">Try different search terms</p>
                    </div>
                  )}
                </div>
              )}

              {!searchQuery && (
                <div className="mt-8">
                  <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] mb-6 px-4">
                    Quick Navigation
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { href: "/projects", icon: FolderKanban, label: "Projects", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                      { href: "/skills", icon: Sparkles, label: "Skills", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                      { href: "/about", icon: User, label: "Profile", color: "text-blue-500", bg: "bg-blue-500/10" },
                      { href: "/contact", icon: Mail, label: "Message", color: "text-purple-500", bg: "bg-purple-500/10" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setShowMobileSearch(false)}
                        className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/5 border border-white/5 active:scale-95 transition-all group"
                      >
                        <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center transition-transform group-active:scale-110`}>
                          <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <span className="text-base font-bold text-white">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Access Floating Widget */}
      <AnimatePresence>
        {showQuickAccess && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-[#05070A]/80 backdrop-blur-xl"
              onClick={() => setShowQuickAccess(false)}
            />

            {/* Floating Widget */}
            <motion.div
              ref={quickAccessRef}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="fixed left-4 right-4 top-1/2 -translate-y-1/2 z-[80] sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[500px]"
            >
              <div className="glass-card rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] border-white/10 overflow-hidden">
                {/* Header */}
                <div className="relative p-8 pb-4">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gold-gradient blur-lg opacity-50" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-[1.5rem] bg-gold-gradient flex items-center justify-center shadow-2xl">
                        <LayoutGrid className="w-7 h-7 text-black" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-white tracking-tight leading-none">Command Center</h2>
                        <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mt-2">DApp Navigation</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowQuickAccess(false)}
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all active:scale-95"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Navigation Grid */}
                <div className="p-8 pt-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { href: "/", icon: Home, label: "Home", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                      { href: "/projects", icon: FolderKanban, label: "Projects", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                      { href: "/skills", icon: Sparkles, label: "Skills", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                      { href: "/about", icon: User, label: "Profile", color: "text-blue-500", bg: "bg-blue-500/10" },
                      { href: "/contact", icon: Mail, label: "Contact", color: "text-purple-500", bg: "bg-purple-500/10" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setShowQuickAccess(false)}
                        className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] transition-all duration-300 group ${pathname === item.href
                          ? "bg-white/10 border border-white/10 shadow-2xl scale-105"
                          : "bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/5 active:scale-95"
                          }`}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${pathname === item.href ? item.bg : "bg-white/5 group-hover:scale-110"
                          }`}>
                          <item.icon className={`w-7 h-7 ${pathname === item.href ? item.color : "text-muted"}`} />
                        </div>
                        <span className={`text-xs font-black tracking-widest uppercase ${pathname === item.href ? "text-white" : "text-secondary"}`}>
                          {item.label}
                        </span>
                      </Link>
                    ))}
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/5 active:scale-95 transition-all group"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                        <FileText className="w-7 h-7 text-muted group-hover:text-yellow-500" />
                      </div>
                      <span className="text-xs font-black tracking-widest uppercase text-secondary group-hover:text-white">Resume</span>
                    </a>
                  </div>

                  {/* Ecosystem Section */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-6 px-1">Ecosystem Tools</p>
                    <div className="grid grid-cols-2 gap-4">
                      <a
                        href="https://testnet-wallet-teal.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                          <Boxes className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-white leading-tight">Casper Hub</p>
                          <p className="text-[10px] font-bold text-muted truncate mt-1">Institutional Suite</p>
                        </div>
                      </a>
                      <a
                        href="https://github.com/tmanas06"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                          <Github className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-white leading-tight">Open Source</p>
                          <p className="text-[10px] font-bold text-muted truncate mt-1">GitHub Portfolio</p>
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
