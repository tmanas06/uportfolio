"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FolderKanban,
  Sparkles,
  User,
  Mail,
  Github,
  Linkedin,
  Trophy,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  Boxes,
  Globe,
  Settings,
  ShieldCheck,
  Zap
} from "lucide-react";
import { personalInfo, achievements, experience } from "@/lib/data";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Skills", href: "/skills", icon: Sparkles },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
];

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 80;

export default function DesktopSidebar() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebar-collapsed");
    const savedHidden = localStorage.getItem("sidebar-hidden");
    const mobile = window.innerWidth < 768;

    if (savedCollapsed !== null) setIsCollapsed(JSON.parse(savedCollapsed));
    if (savedHidden !== null) {
      setIsHidden(JSON.parse(savedHidden));
    } else if (mobile) {
      setIsHidden(true);
    }
  }, []);

  useEffect(() => {
    const handleGlobalToggle = (e: any) => {
      if (e.detail?.hidden !== undefined) {
        setIsHidden(e.detail.hidden);
        localStorage.setItem("sidebar-hidden", JSON.stringify(e.detail.hidden));
      } else {
        setIsHidden(prev => {
          const newState = !prev;
          localStorage.setItem("sidebar-hidden", JSON.stringify(newState));
          return newState;
        });
      }
    };
    window.addEventListener("sidebar-global-toggle", handleGlobalToggle as EventListener);
    return () => window.removeEventListener("sidebar-global-toggle", handleGlobalToggle as EventListener);
  }, []);

  const toggleSidebar = () => {
    setIsHidden(prev => {
      const newState = !prev;
      localStorage.setItem("sidebar-hidden", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    if (isMobile) setIsHidden(true);
  }, [pathname, isMobile]);

  const showExpanded = !isCollapsed || isHovered;
  const currentWidth = (isHidden || isMobile) ? 0 : (isCollapsed && !isHovered ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-current-width', `${currentWidth}px`);
    return () => {
      document.documentElement.style.setProperty('--sidebar-current-width', '0px');
    };
  }, [currentWidth]);

  return (
    <AnimatePresence>
      {!isHidden && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsHidden(true)}
          className="fixed inset-0 bg-black/80 z-[60]"
        />
      )}
      <motion.aside
        animate={{
          x: isHidden ? -SIDEBAR_WIDTH : 0,
          opacity: isHidden ? 0 : 1,
          width: isMobile ? Math.min(280, window.innerWidth * 0.8) : currentWidth
        }}
        initial={false}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => isCollapsed && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed left-0 top-0 bottom-0 z-[70] flex flex-col overflow-hidden ${isMobile && isHidden ? 'pointer-events-none' : ''} ${!isMobile ? 'hidden lg:flex' : ''}`}
        style={{ pointerEvents: (isMobile && isHidden) ? 'none' : 'auto' }}
      >
        {/* Main Sidebar Container — Brutalist */}
        <div className="h-full w-full bg-[var(--bg-primary)] border-r-[3px] border-[var(--border-color)] flex flex-col overflow-hidden relative">

          {/* Header / Profile Section */}
          <div className="p-6 pb-4 border-b-[3px] border-[var(--border-color)]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-[var(--accent)] border-[3px] border-[var(--border-color)] flex items-center justify-center shadow-[3px_3px_0px_var(--border-color)]">
                  <span className="text-black font-black text-xl font-heading">M</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--accent)] border-[2px] border-[var(--border-color)]" />
              </div>
              {showExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 min-w-0"
                >
                  <h3 className="font-black text-[var(--text-primary)] text-base tracking-tight truncate leading-tight uppercase font-heading">
                    {personalInfo.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Zap className="w-3 h-3 text-[var(--accent)]" />
                    <span className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest truncate font-mono">
                      /// DEV
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex-1 px-3 py-4 overflow-y-auto relative z-10">
            <div className="mb-6">
              {showExpanded && (
                <p className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.25em] mb-4 ml-4 font-mono">
                  /// NAV
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-4 px-4 py-3.5 transition-all border-[2px] ${isActive
                          ? "bg-[var(--accent)] text-black border-[var(--border-color)] font-black shadow-[3px_3px_0px_var(--border-color)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-black border-transparent hover:border-[var(--border-color)]"
                          }`}
                      >
                        <Icon className="w-5 h-5" />
                        {showExpanded && (
                          <span className="text-sm font-black tracking-tight uppercase">{item.name}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick Tools Section */}
            <div className="mt-8">
              {showExpanded && (
                <p className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.25em] mb-4 ml-4 font-mono">
                  /// Links
                </p>
              )}
              <div className={`grid gap-2 ${showExpanded ? 'grid-cols-2' : 'grid-cols-1'} px-1`}>
                {[
                  { label: "Git", icon: Github, href: personalInfo.github },
                  { label: "Blog", icon: Globe, href: personalInfo.blog },
                  { label: "Docs", icon: FileText, href: "/resume.pdf" },
                  { label: "Node", icon: Boxes, href: "https://testnet-wallet-teal.vercel.app/" },
                ].map((tool) => (
                  <a
                    key={tool.label}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 border-[2px] border-[var(--border-color)] hover:bg-[var(--accent)] hover:text-black transition-all group/tool shadow-[2px_2px_0px_var(--border-color)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_var(--border-color)]"
                  >
                    <tool.icon className="w-4 h-4 text-[var(--text-muted)] group-hover/tool:text-black" />
                    {showExpanded && (
                      <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-tighter group-hover/tool:text-black font-mono">
                        {tool.label}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer / Insights Section */}
          <div className="p-6 mt-auto relative z-10 border-t-[3px] border-[var(--border-color)]">
            <AnimatePresence>
              {showExpanded ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[var(--accent)]" />
                      <span className="text-xs font-black text-[var(--text-muted)] uppercase font-mono">Wins</span>
                    </div>
                    <span className="text-sm font-black text-[var(--accent)]">{achievements.length}</span>
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[var(--accent)]" />
                      <span className="text-xs font-black text-[var(--text-muted)] uppercase font-mono">Exp</span>
                    </div>
                    <span className="text-sm font-black text-[var(--accent)]">{experience.length}</span>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 p-3 bg-[var(--accent)] text-black font-black text-xs uppercase tracking-widest border-[3px] border-[var(--border-color)] shadow-[3px_3px_0px_var(--border-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--border-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                    <ShieldCheck className="w-3 h-3" />
                    Verify ID
                  </button>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-[2px] border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent)] hover:text-black transition-colors">
                    <Settings className="w-5 h-5" />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapse Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-[var(--bg-primary)] border-[2px] border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-black hover:bg-[var(--accent)] transition-all z-50"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
