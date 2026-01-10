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
  Menu,
} from "lucide-react";
import { personalInfo, achievements, experience } from "@/lib/data";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Skills", href: "/skills", icon: Sparkles },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
];

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export default function DesktopSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebar-collapsed");
    const savedHidden = localStorage.getItem("sidebar-hidden");
    if (savedCollapsed !== null) setIsCollapsed(JSON.parse(savedCollapsed));
    if (savedHidden !== null) setIsHidden(JSON.parse(savedHidden));
  }, []);

  // Sync isHidden with a global event
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

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
  };

  // Show expanded view when collapsed but hovered
  const showExpanded = !isCollapsed || isHovered;
  const currentWidth = isHidden ? 0 : (isCollapsed && !isHovered ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH);

  // Update CSS variable for layout offset
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-current-width', `${currentWidth}px`);
  }, [currentWidth]);

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: currentWidth,
          x: isHidden ? -SIDEBAR_WIDTH : 0,
          opacity: isHidden ? 0 : 1
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => isCollapsed && !isHidden && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed left-0 top-[var(--header-height)] bottom-0 glass-effect border-r border-white/5 hidden lg:flex flex-col z-40 overflow-hidden"
      >
        {/* Toggle Button (Collapse/Expand) */}
        {!isHidden && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#121822] border border-white/10 flex items-center justify-center text-muted hover:text-yellow-500 hover:bg-white/5 transition-all z-50 shadow-xl"
          >
            {isCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>
        )}

        {/* Profile Section */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-[#05070A] font-black text-xl">M</span>
            </div>
            <AnimatePresence>
              {showExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0 overflow-hidden"
                >
                  <h3 className="font-black text-white truncate text-sm tracking-tight">{personalInfo.name}</h3>
                  <p className="text-[10px] font-bold text-muted truncate uppercase tracking-widest mt-0.5">{personalInfo.title}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <AnimatePresence>
            {showExpanded && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 px-3"
              >
                Menu
              </motion.p>
            )}
          </AnimatePresence>
          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${isActive
                        ? "bg-white/5 text-yellow-500 border border-white/5 shadow-lg"
                        : "text-secondary hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5"
                      }`}
                    title={isCollapsed && !isHovered ? item.name : undefined}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-yellow-500' : 'text-muted group-hover:text-white'}`} />
                    <AnimatePresence>
                      {showExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm font-bold tracking-tight whitespace-nowrap"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && showExpanded && (
                      <motion.div
                        layoutId="active-indicator"
                        className="ml-auto w-1 h-4 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(240,185,11,0.5)]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Access Grid */}
          <AnimatePresence>
            {showExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 px-3">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2 px-1">
                  <Link href="/projects" className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                    <FolderKanban className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold text-muted uppercase tracking-tighter">Code</span>
                  </Link>
                  <Link href="/contact" className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                    <Mail className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold text-muted uppercase tracking-tighter">Hire</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Insights */}
          <AnimatePresence>
            {showExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="mt-8 p-5 rounded-3xl bg-white/5 border border-white/5 shadow-2xl overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-gradient blur-[40px] opacity-10 -translate-y-1/2 translate-x-1/2" />
                <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-5 relative z-10">Insights</p>
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                      </div>
                      <span className="text-xs font-bold text-secondary tracking-tight">Awards</span>
                    </div>
                    <span className="text-sm font-black text-white">{achievements.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="text-xs font-bold text-secondary tracking-tight">Exp</span>
                    </div>
                    <span className="text-sm font-black text-white">{experience.length}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed Stats Icons */}
          {!showExpanded && (
            <div className="mt-8 flex flex-col gap-3 items-center">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg" title={`${achievements.length} Awards`}>
                <Trophy className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg" title={`${experience.length} Experience Points`}>
                <Briefcase className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          )}
        </nav>

        {/* Social Links */}
        <div className="p-4 border-t border-white/5">
          <div className={`flex items-center ${showExpanded ? 'justify-around' : 'flex-col gap-3'}`}>
            {[
              { href: personalInfo.github, icon: Github, label: "GitHub" },
              { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 hover:border-white/10 transition-all active:scale-95 shadow-lg group/soc"
                title={social.label}
              >
                <social.icon className="w-4 h-4 transition-transform group-hover/soc:scale-110" />
              </a>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
