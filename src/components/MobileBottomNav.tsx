"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, FolderKanban, Sparkles, User, Mail } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Skills", href: "/skills", icon: Sparkles },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-[var(--bottom-nav-height)] bg-[var(--bg-primary)] border-t-[3px] border-[var(--border-color)] lg:hidden">
      <div className="h-full flex items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-full transition-all relative ${isActive
                ? "text-black"
                : "text-[var(--text-muted)] active:text-black"
                }`}
            >
              <div className={`relative p-2 border-[2px] transition-all ${isActive
                ? "bg-[var(--accent)] border-[var(--border-color)] shadow-[2px_2px_0px_var(--border-color)]"
                : "border-transparent"
                }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest font-mono ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
