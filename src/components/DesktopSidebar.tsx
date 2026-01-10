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
  { name: "Home", href: "/", icon: Home, color: "text-amber-400" },
  { name: "Projects", href: "/projects", icon: FolderKanban, color: "text-blue-400" },
  { name: "Skills", href: "/skills", icon: Sparkles, color: "text-emerald-400" },
  { name: "About", href: "/about", icon: User, color: "text-indigo-400" },
  { name: "Contact", href: "/contact", icon: Mail, color: "text-purple-400" },
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
    const mobile = window.innerWidth < 768; // Quick check avoid delay

    if (savedCollapsed !== null) setIsCollapsed(JSON.parse(savedCollapsed));
    if (savedHidden !== null) {
      setIsHidden(JSON.parse(savedHidden));
    } else if (mobile) {
      setIsHidden(true); // Default to hidden on mobile
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

  // Close sidebar on route change on mobile
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
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
        className={`fixed left-0 top-0 bottom-0 z-[70] flex flex-col p-4 overflow-hidden ${isMobile && isHidden ? 'pointer-events-none' : ''} ${!isMobile ? 'hidden lg:flex' : ''}`}
        style={{ pointerEvents: (isMobile && isHidden) ? 'none' : 'auto' }}
      >
        {/* Main Sidebar Container */}
        <div className="h-full w-full glass-card rounded-[2.5rem] border-white/5 flex flex-col overflow-hidden relative shadow-2xl">
          {/* Background Accent Glows */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-gradient blur-[60px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-40 left-0 w-24 h-24 bg-blue-500/10 blur-[50px] pointer-events-none" />

          {/* Header / Profile Section */}
          <div className="p-6 pb-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative group/avatar">
                <div className="w-12 h-12 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-xl group-hover/avatar:scale-110 transition-transform duration-500">
                  <span className="text-[#05070A] font-black text-xl">M</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121822] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
              {showExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 min-w-0"
                >
                  <h3 className="font-black text-[var(--text-primary)] text-base tracking-tight truncate leading-tight">
                    {personalInfo.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Zap className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                    <span className="text-[11px] font-black text-muted uppercase tracking-widest truncate">
                      Senior Developer
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar relative z-10">
            <div className="mb-6">
              {showExpanded && (
                <p className="text-[11px] font-black text-muted/50 uppercase tracking-[0.25em] mb-4 ml-4">
                  Master Hub
                </p>
              )}
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                          ? "bg-white/5 text-[var(--text-primary)] border border-white/10 shadow-lg ring-1 ring-white/5"
                          : "text-muted hover:bg-white/[0.03] hover:text-[var(--text-primary)] border border-transparent"
                          }`}
                      >
                        <div className={`relative ${isActive ? item.color : 'text-muted group-hover:text-[var(--text-primary)]'}`}>
                          <Icon className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                          {isActive && (
                            <div className={`absolute -inset-2 blur-md opacity-20 -z-10 ${item.color.replace('text', 'bg')}`} />
                          )}
                        </div>
                        {showExpanded && (
                          <span className="text-base font-bold tracking-tight">{item.name}</span>
                        )}
                        {isActive && showExpanded && (
                          <motion.div
                            layoutId="nav-active"
                            className="ml-auto w-1 h-4 rounded-full bg-gold-gradient shadow-[0_0_10px_rgba(240,185,11,0.5)]"
                          />
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
                <p className="text-[11px] font-black text-muted/50 uppercase tracking-[0.25em] mb-4 ml-4">
                  Terminal
                </p>
              )}
              <div className={`grid gap-2 ${showExpanded ? 'grid-cols-2' : 'grid-cols-1'} px-1`}>
                {[
                  { label: "Git", icon: Github, href: personalInfo.github, color: "hover:text-white" },
                  { label: "Blog", icon: Globe, href: personalInfo.blog, color: "hover:text-amber-400" },
                  { label: "Docs", icon: FileText, href: "/resume.pdf", color: "hover:text-blue-400" },
                  { label: "Node", icon: Boxes, href: "https://testnet-wallet-teal.vercel.app/", color: "hover:text-emerald-400" },
                ].map((tool) => (
                  <a
                    key={tool.label}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all group/tool"
                  >
                    <tool.icon className={`w-4 h-4 text-muted transition-all duration-300 ${tool.color} group-hover/tool:scale-110`} />
                    {showExpanded && (
                      <span className="text-[10px] font-black text-muted/50 uppercase tracking-tighter group-hover/tool:text-[var(--text-primary)] transition-colors">
                        {tool.label}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer / Insights Section */}
          <div className="p-6 mt-auto relative z-10 border-t border-white/5">
            <AnimatePresence>
              {showExpanded ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-black text-muted/80 uppercase">Wins</span>
                    </div>
                    <span className="text-sm font-black text-[var(--text-primary)]">{achievements.length}</span>
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-black text-muted/80 uppercase">Experience</span>
                    </div>
                    <span className="text-sm font-black text-[var(--text-primary)]">{experience.length}</span>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-gold-gradient text-black font-black text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(240,185,11,0.3)] transition-all active:scale-95">
                    <ShieldCheck className="w-3 h-3" />
                    Verify ID
                  </button>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapse Toggle Button (Fixed on the edge) */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 rounded-full bg-[var(--surface)] border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all z-50 group/toggle"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 transition-transform group-hover/toggle:translate-x-0.5" />
            ) : (
              <ChevronLeft className="w-4 h-4 transition-transform group-hover/toggle:-translate-x-0.5" />
            )}
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
