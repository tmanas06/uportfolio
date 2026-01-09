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
  const [isHovered, setIsHovered] = useState(false);

  // Load sidebar state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));

    // Dispatch custom event for layout to listen to
    window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: { collapsed: newState } }));
  };

  // Show expanded view when collapsed but hovered
  const showExpanded = !isCollapsed || isHovered;
  const currentWidth = isCollapsed && !isHovered ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: currentWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => isCollapsed && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed left-0 top-16 bottom-0 bg-[#0A0E17] border-r border-[rgba(240,185,11,0.15)] hidden lg:flex flex-col z-40 overflow-hidden"
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-[#1E2735] border border-[rgba(240,185,11,0.3)] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all z-50 shadow-lg"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Profile Section */}
        <div className="p-5 border-b border-[rgba(240,185,11,0.15)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center glow-gold-sm flex-shrink-0">
              <span className="text-[#0A0E17] font-bold text-lg">M</span>
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
                  <h3 className="font-bold text-[#F5F6F5] truncate text-sm">{personalInfo.firstName}</h3>
                  <p className="text-[10px] text-[#848E9C] truncate">{personalInfo.title}</p>
                  <span className="inline-flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
                    <span className="text-[9px] text-[#00D4AA]">Available</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto overflow-x-hidden">
          <AnimatePresence>
            {showExpanded && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[9px] text-[#848E9C] uppercase tracking-wider mb-2 px-3"
              >
                Navigation
              </motion.p>
            )}
          </AnimatePresence>
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-[rgba(240,185,11,0.1)] text-[#F0B90B]"
                        : "text-[#848E9C] hover:bg-[#1E2735] hover:text-[#F5F6F5]"
                    }`}
                    title={isCollapsed && !isHovered ? item.name : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <AnimatePresence>
                      {showExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm font-medium whitespace-nowrap"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && showExpanded && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F0B90B]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Stats */}
          <AnimatePresence>
            {showExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="mt-5 p-4 rounded-xl bg-[#131B27] border border-[rgba(240,185,11,0.1)]"
              >
                <p className="text-[9px] text-[#848E9C] uppercase tracking-wider mb-3">Quick Stats</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#F0B90B]" />
                      <span className="text-xs text-[#848E9C]">Hackathon Wins</span>
                    </div>
                    <span className="text-sm font-bold text-[#F0B90B]">{achievements.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#00D4AA]" />
                      <span className="text-xs text-[#848E9C]">Experiences</span>
                    </div>
                    <span className="text-sm font-bold text-[#00D4AA]">{experience.length}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed Stats Icons */}
          {!showExpanded && (
            <div className="mt-5 flex flex-col gap-2 items-center">
              <div className="w-10 h-10 rounded-xl bg-[#131B27] flex items-center justify-center" title={`${achievements.length} Hackathon Wins`}>
                <Trophy className="w-4 h-4 text-[#F0B90B]" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#131B27] flex items-center justify-center" title={`${experience.length} Experiences`}>
                <Briefcase className="w-4 h-4 text-[#00D4AA]" />
              </div>
            </div>
          )}
        </nav>

        {/* Social Links */}
        <div className="p-3 border-t border-[rgba(240,185,11,0.15)]">
          <div className={`flex items-center ${showExpanded ? 'justify-center gap-2' : 'flex-col gap-2'}`}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="w-9 h-9 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.aside>

      {/* Spacer div to push content - updates based on sidebar state */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .page-wrapper {
            padding-left: ${isCollapsed && !isHovered ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}px !important;
            transition: padding-left 0.3s ease-in-out;
          }
        }
      `}</style>
    </>
  );
}
