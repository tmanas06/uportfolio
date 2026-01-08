"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderKanban,
  Sparkles,
  User,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Trophy,
  Briefcase,
} from "lucide-react";
import { personalInfo, achievements, experience } from "@/lib/data";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Skills", href: "/skills", icon: Sparkles },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[250px] bg-[#0A0E17] border-r border-[rgba(240,185,11,0.15)] hidden lg:flex flex-col z-40">
      {/* Profile Section */}
      <div className="p-6 border-b border-[rgba(240,185,11,0.15)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center glow-gold-sm">
            <span className="text-[#0A0E17] font-bold text-xl">M</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#F5F6F5] truncate">{personalInfo.firstName}</h3>
            <p className="text-xs text-[#848E9C] truncate">{personalInfo.title}</p>
            <span className="inline-flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" />
              <span className="text-[10px] text-[#00D4AA]">Available</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <p className="text-[10px] text-[#848E9C] uppercase tracking-wider mb-3 px-3">Navigation</p>
        <ul className="space-y-1">
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
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Quick Stats */}
        <div className="mt-6 p-4 rounded-xl bg-[#131B27] border border-[rgba(240,185,11,0.1)]">
          <p className="text-[10px] text-[#848E9C] uppercase tracking-wider mb-3">Quick Stats</p>
          <div className="space-y-3">
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
        </div>
      </nav>

      {/* Social Links */}
      <div className="p-4 border-t border-[rgba(240,185,11,0.15)]">
        <div className="flex items-center justify-center gap-3">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-10 h-10 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] hover:bg-[#252D3C] transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </aside>
  );
}
