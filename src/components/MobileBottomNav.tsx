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
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-[var(--bottom-nav-height)] glass-effect border-t border-white/5 lg:hidden safe-area-bottom">
      <div className="h-full flex items-center justify-around px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-full transition-all relative group ${isActive ? "text-yellow-500" : "text-muted hover:text-white"
                }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 transition-transform duration-500 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(240,185,11,0.5)]' : 'group-active:scale-90'}`} />
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(240,185,11,0.5)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-muted'}`}>
                {item.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="mobile-nav-glow"
                  className="absolute inset-0 bg-yellow-500/5 blur-xl -z-10 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
