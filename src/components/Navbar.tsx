"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Stack", href: "/skills" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            {/* ═══ FIXED NAVBAR ═══ */}
            <nav
                id="navbar"
                className="fixed top-0 left-0 right-0 z-50 h-[var(--navbar-height)] bg-black border-b-[4px] border-[var(--border-color)]"
            >
                <div className="h-full max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1 group" aria-label="Home">
                        <span className="text-white font-black text-[2.5rem] sm:text-[3rem] leading-none tracking-tight font-mono">
                            tmanas
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-[1rem] font-black uppercase tracking-widest font-mono transition-colors py-1 ${isActive
                                            ? "text-[var(--accent)]"
                                            : "text-white hover:text-[var(--accent)]"
                                        }`}
                                >
                                    {link.name}
                                    {/* Thick underline on hover / active */}
                                    <span
                                        className={`absolute left-0 -bottom-1 h-[4px] bg-[var(--accent)] transition-all duration-200 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                            }`}
                                        style={{ width: isActive ? "100%" : undefined }}
                                    />
                                </Link>
                            );
                        })}

                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="w-11 h-11 border-[3px] border-white/30 flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-all"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        )}
                    </div>

                    {/* Mobile: Theme + Hamburger */}
                    <div className="flex md:hidden items-center gap-3">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="w-11 h-11 border-[3px] border-white/30 flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-black transition-all"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        )}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="w-11 h-11 border-[3px] border-white/30 flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-black transition-all"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ═══ MOBILE SLIDE MENU ═══ */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* Slide panel */}
                    <div className="absolute top-0 right-0 w-[75vw] max-w-[320px] h-full bg-black border-l-[4px] border-[var(--border-color)] flex flex-col pt-[calc(var(--navbar-height)+1rem)] px-6 pb-8">
                        <div className="flex flex-col gap-2 flex-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`text-[1.25rem] font-black uppercase tracking-widest font-mono py-4 px-4 border-[3px] transition-all ${isActive
                                                ? "bg-[var(--accent)] text-black border-[var(--accent)]"
                                                : "text-white border-transparent hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Bottom: Resume link */}
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto text-center text-[1rem] font-black uppercase tracking-widest font-mono py-4 px-4 bg-[var(--accent)] text-black border-[3px] border-[var(--accent)] hover:bg-[var(--accent-2)] hover:border-[var(--accent-2)] transition-all"
                        >
                            Resume ↗
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
