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
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A0E17] border-b border-[rgba(240,185,11,0.15)]">
        <div className="h-full px-4 lg:px-6 flex items-center">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" style={{ marginRight: '48px' }}>
            <div className="w-11 h-11 rounded-xl gradient-gold flex items-center justify-center glow-gold-sm">
              <span className="text-[#0A0E17] font-bold text-2xl">M</span>
            </div>
            <span className="text-[#F0B90B] font-bold text-2xl hidden sm:block whitespace-nowrap">
              {personalInfo.firstName}
            </span>
          </Link>

          {/* Center: Search (Desktop) */}
          <div ref={searchRef} className="hidden md:flex flex-1 relative" style={{ marginRight: '48px' }}>
            <form onSubmit={handleSearchSubmit} className="w-full max-w-lg">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#848E9C]" style={{ zIndex: 10 }} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search projects, skills, experience..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearch(true);
                  }}
                  onFocus={() => setShowSearch(true)}
                  className="w-full h-11 pr-4 bg-[#131B27] border border-[rgba(240,185,11,0.15)] rounded-xl text-base text-[#F5F6F5] placeholder-[#848E9C] focus:outline-none focus:border-[#F0B90B] transition-colors"
                  style={{ paddingLeft: '48px' }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C] hover:text-[#F5F6F5]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showSearch && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-14 left-0 right-0 glass p-4 shadow-2xl max-h-[70vh] overflow-y-auto"
                >
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {Object.entries(groupedResults).map(([category, results]) => (
                        <div key={category}>
                          <p className="text-[10px] text-[#848E9C] uppercase tracking-wider mb-2 px-2">
                            {categoryLabels[category]}
                          </p>
                          <div className="flex flex-col gap-1">
                            {results.map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                className="flex items-center gap-3 p-3 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors text-left w-full group"
                              >
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${result.color}15` }}
                                >
                                  <span style={{ color: result.color }}>{result.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-[#F5F6F5] truncate group-hover:text-[#F0B90B] transition-colors">
                                    {result.title}
                                  </p>
                                  <p className="text-xs text-[#848E9C] truncate">{result.subtitle}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#848E9C] opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Search className="w-10 h-10 text-[#848E9C] mx-auto mb-3" />
                      <p className="text-[#848E9C]">No results found for "{searchQuery}"</p>
                      <p className="text-xs text-[#5E6673] mt-1">Try searching for projects, skills, or experience</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Actions - ml-auto ensures it stays on the right even when center search is hidden */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
            {/* Search (Mobile) */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden w-11 h-11 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-11 h-11 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F6465D] rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-14 w-80 glass p-4 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-base text-[#F5F6F5]">Notifications</h3>
                      <span className="badge badge-gold">{unreadCount} new</span>
                    </div>
                    <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex items-start gap-3 p-3 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] cursor-pointer transition-colors"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#131B27] flex items-center justify-center flex-shrink-0">
                            {getNotificationIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#F5F6F5] truncate">{notif.message}</p>
                            <p className="text-xs text-[#848E9C] mt-1">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Connect Wallet Button */}
            {isConnected && address ? (
              <>
                {/* Mobile: Compact wallet button */}
                <button
                  onClick={() => open()}
                  className="sm:hidden w-11 h-11 rounded-xl bg-[#1E2735] border border-[rgba(240,185,11,0.3)] flex items-center justify-center text-[#F0B90B] hover:bg-[#252D3C] transition-all"
                  title={formatAddress(address)}
                >
                  <Wallet className="w-5 h-5" />
                </button>
                {/* Desktop: Full wallet display */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => open()}
                    className="h-11 px-4 rounded-xl bg-[#1E2735] border border-[rgba(240,185,11,0.3)] flex items-center gap-2 text-[#F0B90B] font-medium hover:bg-[#252D3C] transition-all"
                  >
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm">{formatAddress(address)}</span>
                  </button>
                  <button
                    onClick={() => disconnect()}
                    className="h-11 w-11 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F6465D] hover:bg-[#252D3C] transition-all"
                    title="Disconnect"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Mobile: Compact connect button */}
                <button
                  onClick={() => open()}
                  className="sm:hidden w-11 h-11 rounded-xl gradient-gold flex items-center justify-center text-[#0A0E17] hover:shadow-[0_0_20px_rgba(240,185,11,0.4)] transition-all"
                  title="Connect Wallet"
                >
                  <Wallet className="w-5 h-5" />
                </button>
                {/* Desktop: Full connect button */}
                <button
                  onClick={() => open()}
                  className="hidden sm:flex h-11 px-5 rounded-xl gradient-gold items-center gap-2 text-[#0A0E17] font-semibold hover:shadow-[0_0_20px_rgba(240,185,11,0.4)] transition-all"
                >
                  <Wallet className="w-5 h-5" />
                  <span className="text-sm">Connect</span>
                </button>
              </>
            )}

            {/* Quick Access (Candy Box) Button */}
            <button
              onClick={() => setShowQuickAccess(!showQuickAccess)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                showQuickAccess
                  ? "bg-[#F0B90B] text-[#0A0E17] shadow-[0_0_20px_rgba(240,185,11,0.5)]"
                  : "bg-[#1E2735] text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C]"
              }`}
              title="Quick Access"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>

            {/* Profile */}
            <Link
              href="/about"
              className="w-11 h-11 rounded-xl gradient-gold flex items-center justify-center glow-gold-sm"
            >
              <span className="text-[#0A0E17] font-bold text-base">M</span>
            </Link>
          </div>
        </div>

        {/* Click outside to close notifications */}
        {showNotifications && (
          <div
            className="fixed inset-0 z-[-1]"
            onClick={() => setShowNotifications(false)}
          />
        )}
      </header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0A0E17]/95 backdrop-blur-sm md:hidden"
          >
            <div ref={mobileSearchRef} className="p-4">
              {/* Mobile Search Header */}
              <div className="flex items-center gap-3 mb-4">
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#848E9C]" style={{ zIndex: 10 }} />
                    <input
                      ref={mobileInputRef}
                      type="text"
                      placeholder="Search everything..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pr-10 bg-[#131B27] border border-[rgba(240,185,11,0.15)] rounded-xl text-base text-[#F5F6F5] placeholder-[#848E9C] focus:outline-none focus:border-[#F0B90B] transition-colors"
                      style={{ paddingLeft: '48px' }}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C] hover:text-[#F5F6F5]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
                <button
                  onClick={() => {
                    setShowMobileSearch(false);
                    setSearchQuery("");
                  }}
                  className="text-[#848E9C] hover:text-[#F5F6F5] text-sm font-medium"
                >
                  Cancel
                </button>
              </div>

              {/* Mobile Search Results */}
              {searchQuery && (
                <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {Object.entries(groupedResults).map(([category, results]) => (
                        <div key={category}>
                          <p className="text-[10px] text-[#848E9C] uppercase tracking-wider mb-2 px-2">
                            {categoryLabels[category]}
                          </p>
                          <div className="flex flex-col gap-2">
                            {results.map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                className="flex items-center gap-3 p-4 rounded-xl bg-[#131B27] border border-[rgba(240,185,11,0.1)] text-left w-full"
                              >
                                <div
                                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${result.color}15` }}
                                >
                                  <span style={{ color: result.color }}>{result.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-[#F5F6F5] truncate">{result.title}</p>
                                  <p className="text-xs text-[#848E9C] truncate">{result.subtitle}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#848E9C]" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search className="w-12 h-12 text-[#848E9C] mx-auto mb-4" />
                      <p className="text-[#848E9C]">No results found</p>
                      <p className="text-xs text-[#5E6673] mt-1">Try different keywords</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Links when no search */}
              {!searchQuery && (
                <div className="mt-4">
                  <p className="text-[10px] text-[#848E9C] uppercase tracking-wider mb-3 px-2">
                    Quick Links
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/projects"
                      onClick={() => setShowMobileSearch(false)}
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#131B27] border border-[rgba(240,185,11,0.1)]"
                    >
                      <FolderKanban className="w-5 h-5 text-[#F0B90B]" />
                      <span className="text-sm text-[#F5F6F5]">Projects</span>
                    </Link>
                    <Link
                      href="/skills"
                      onClick={() => setShowMobileSearch(false)}
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#131B27] border border-[rgba(240,185,11,0.1)]"
                    >
                      <Sparkles className="w-5 h-5 text-[#00D4AA]" />
                      <span className="text-sm text-[#F5F6F5]">Skills</span>
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setShowMobileSearch(false)}
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#131B27] border border-[rgba(240,185,11,0.1)]"
                    >
                      <User className="w-5 h-5 text-[#627EEA]" />
                      <span className="text-sm text-[#F5F6F5]">About</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setShowMobileSearch(false)}
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#131B27] border border-[rgba(240,185,11,0.1)]"
                    >
                      <MessageSquare className="w-5 h-5 text-[#8247E5]" />
                      <span className="text-sm text-[#F5F6F5]">Contact</span>
                    </Link>
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
              className="fixed inset-0 z-[70] bg-[#0A0E17]/80 backdrop-blur-md"
              onClick={() => setShowQuickAccess(false)}
            />

            {/* Floating Widget */}
            <motion.div
              ref={quickAccessRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[80] w-[90vw] max-w-md"
            >
              {/* Widget Container */}
              <div className="bg-[#0D1320] border border-[rgba(240,185,11,0.2)] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(240,185,11,0.1)] overflow-hidden">
                {/* Header with glow effect */}
                <div className="relative px-6 pt-6 pb-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F0B90B]/5 to-transparent" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                        <LayoutGrid className="w-5 h-5 text-[#0A0E17]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-[#F5F6F5]">Quick Access</h2>
                        <p className="text-[10px] text-[#848E9C] uppercase tracking-wider">Navigation Hub</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowQuickAccess(false)}
                      className="w-9 h-9 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F5F6F5] hover:bg-[#252D3C] transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Navigation Grid */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-4 gap-3">
                    <Link
                      href="/"
                      onClick={() => setShowQuickAccess(false)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 ${
                        pathname === "/"
                          ? "bg-gradient-to-br from-[#F0B90B]/20 to-[#F0B90B]/5 border border-[#F0B90B]/30 shadow-[0_0_20px_rgba(240,185,11,0.2)]"
                          : "bg-[#1E2735]/50 hover:bg-[#1E2735] border border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pathname === "/" ? "bg-[#F0B90B]/20" : "bg-[#252D3C]"}`}>
                        <Home className={`w-5 h-5 ${pathname === "/" ? "text-[#F0B90B]" : "text-[#848E9C]"}`} />
                      </div>
                      <span className={`text-xs font-medium ${pathname === "/" ? "text-[#F0B90B]" : "text-[#F5F6F5]"}`}>Home</span>
                    </Link>

                    <Link
                      href="/projects"
                      onClick={() => setShowQuickAccess(false)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 ${
                        pathname === "/projects"
                          ? "bg-gradient-to-br from-[#F0B90B]/20 to-[#F0B90B]/5 border border-[#F0B90B]/30 shadow-[0_0_20px_rgba(240,185,11,0.2)]"
                          : "bg-[#1E2735]/50 hover:bg-[#1E2735] border border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pathname === "/projects" ? "bg-[#F0B90B]/20" : "bg-[#252D3C]"}`}>
                        <FolderKanban className={`w-5 h-5 ${pathname === "/projects" ? "text-[#F0B90B]" : "text-[#848E9C]"}`} />
                      </div>
                      <span className={`text-xs font-medium ${pathname === "/projects" ? "text-[#F0B90B]" : "text-[#F5F6F5]"}`}>Projects</span>
                    </Link>

                    <Link
                      href="/skills"
                      onClick={() => setShowQuickAccess(false)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 ${
                        pathname === "/skills"
                          ? "bg-gradient-to-br from-[#00D4AA]/20 to-[#00D4AA]/5 border border-[#00D4AA]/30 shadow-[0_0_20px_rgba(0,212,170,0.2)]"
                          : "bg-[#1E2735]/50 hover:bg-[#1E2735] border border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pathname === "/skills" ? "bg-[#00D4AA]/20" : "bg-[#252D3C]"}`}>
                        <Sparkles className={`w-5 h-5 ${pathname === "/skills" ? "text-[#00D4AA]" : "text-[#848E9C]"}`} />
                      </div>
                      <span className={`text-xs font-medium ${pathname === "/skills" ? "text-[#00D4AA]" : "text-[#F5F6F5]"}`}>Skills</span>
                    </Link>

                    <Link
                      href="/about"
                      onClick={() => setShowQuickAccess(false)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 ${
                        pathname === "/about"
                          ? "bg-gradient-to-br from-[#627EEA]/20 to-[#627EEA]/5 border border-[#627EEA]/30 shadow-[0_0_20px_rgba(98,126,234,0.2)]"
                          : "bg-[#1E2735]/50 hover:bg-[#1E2735] border border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pathname === "/about" ? "bg-[#627EEA]/20" : "bg-[#252D3C]"}`}>
                        <User className={`w-5 h-5 ${pathname === "/about" ? "text-[#627EEA]" : "text-[#848E9C]"}`} />
                      </div>
                      <span className={`text-xs font-medium ${pathname === "/about" ? "text-[#627EEA]" : "text-[#F5F6F5]"}`}>About</span>
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setShowQuickAccess(false)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 ${
                        pathname === "/contact"
                          ? "bg-gradient-to-br from-[#8247E5]/20 to-[#8247E5]/5 border border-[#8247E5]/30 shadow-[0_0_20px_rgba(130,71,229,0.2)]"
                          : "bg-[#1E2735]/50 hover:bg-[#1E2735] border border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pathname === "/contact" ? "bg-[#8247E5]/20" : "bg-[#252D3C]"}`}>
                        <Mail className={`w-5 h-5 ${pathname === "/contact" ? "text-[#8247E5]" : "text-[#848E9C]"}`} />
                      </div>
                      <span className={`text-xs font-medium ${pathname === "/contact" ? "text-[#8247E5]" : "text-[#F5F6F5]"}`}>Contact</span>
                    </Link>

                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowQuickAccess(false)}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#1E2735]/50 hover:bg-[#1E2735] border border-transparent transition-all hover:scale-105"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#252D3C] flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#00FFA3]" />
                      </div>
                      <span className="text-xs font-medium text-[#F5F6F5]">Resume</span>
                    </a>

                    <a
                      href="https://testnet-wallet-teal.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowQuickAccess(false)}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#1E2735]/50 hover:bg-[#1E2735] border border-transparent transition-all hover:scale-105"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#252D3C] flex items-center justify-center">
                        <Boxes className="w-5 h-5 text-[#F6465D]" />
                      </div>
                      <span className="text-xs font-medium text-[#F5F6F5]">Blockchain</span>
                    </a>

                    <Link
                      href="/about#achievements"
                      onClick={() => setShowQuickAccess(false)}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#1E2735]/50 hover:bg-[#1E2735] border border-transparent transition-all hover:scale-105"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#252D3C] flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-[#FF6B00]" />
                      </div>
                      <span className="text-xs font-medium text-[#F5F6F5]">Wins</span>
                    </Link>
                  </div>
                </div>

                {/* Quick Actions Row */}
                <div className="px-6 pb-4">
                  <div className="flex gap-2">
                    <Link
                      href="/about#experience"
                      onClick={() => setShowQuickAccess(false)}
                      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#1E2735]/50 hover:bg-[#1E2735] transition-all"
                    >
                      <Briefcase className="w-4 h-4 text-[#00D4AA]" />
                      <span className="text-xs text-[#F5F6F5]">Experience</span>
                    </Link>
                    <Link
                      href="/about#certifications"
                      onClick={() => setShowQuickAccess(false)}
                      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#1E2735]/50 hover:bg-[#1E2735] transition-all"
                    >
                      <GraduationCap className="w-4 h-4 text-[#8247E5]" />
                      <span className="text-xs text-[#F5F6F5]">Certifications</span>
                    </Link>
                  </div>
                </div>

                {/* Social Links Footer */}
                <div className="px-6 pb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E2735]/80 to-[#252D3C]/50 border border-[rgba(240,185,11,0.1)]">
                    <p className="text-[10px] text-[#848E9C] uppercase tracking-wider mb-3 text-center">Connect With Me</p>
                    <div className="flex justify-center gap-3">
                      <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowQuickAccess(false)}
                        className="w-11 h-11 rounded-xl bg-[#0A0E17] flex items-center justify-center text-[#848E9C] hover:text-[#F5F6F5] hover:bg-[#1E2735] transition-all hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowQuickAccess(false)}
                        className="w-11 h-11 rounded-xl bg-[#0A0E17] flex items-center justify-center text-[#848E9C] hover:text-[#0A66C2] hover:bg-[#1E2735] transition-all hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={personalInfo.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowQuickAccess(false)}
                        className="w-11 h-11 rounded-xl bg-[#0A0E17] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#1E2735] transition-all hover:scale-110"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        onClick={() => setShowQuickAccess(false)}
                        className="w-11 h-11 rounded-xl bg-[#0A0E17] flex items-center justify-center text-[#848E9C] hover:text-[#8247E5] hover:bg-[#1E2735] transition-all hover:scale-110"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Keyboard Hint */}
                <div className="px-6 pb-4 flex justify-center">
                  <span className="text-[10px] text-[#5E6673]">Press ESC or click outside to close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
