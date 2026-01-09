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
  Settings,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
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

  // Handle click outside to close search
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

          {/* Right: Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
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
            ) : (
              <button
                onClick={() => open()}
                className="hidden sm:flex h-11 px-5 rounded-xl gradient-gold items-center gap-2 text-[#0A0E17] font-semibold hover:shadow-[0_0_20px_rgba(240,185,11,0.4)] transition-all"
              >
                <Wallet className="w-5 h-5" />
                <span className="text-sm">Connect</span>
              </button>
            )}

            {/* Settings (Desktop) */}
            <button className="hidden lg:flex w-11 h-11 rounded-xl bg-[#1E2735] items-center justify-center text-[#848E9C] hover:text-[#F0B90B] transition-colors">
              <Settings className="w-5 h-5" />
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
    </>
  );
}
