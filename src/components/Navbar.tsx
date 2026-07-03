"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { Alex_Brush } from "next/font/google";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const links = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Posts", href: "/posts" },
  { label: "Stack", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        {/* Top bar row */}
        <div className="container nav-inner">
          {/* Logo */}
          <Link
            href="/"
            className={`nav-logo ${alexBrush.className}`}
            aria-label="Home"
          >
            t manas
          </Link>

          {/* Desktop links — hidden on mobile via globals.css */}
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`nav-link${pathname === l.href ? " active" : ""}`}
                  aria-current={pathname === l.href ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li style={{ marginLeft: "8px" }}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-resume"
                aria-label="Open resume PDF"
              >
                <FileText size={13} />
                Résumé
              </a>
            </li>
          </ul>

          {/* Hamburger — visible on mobile only via globals.css */}
          <button
            className="mobile-menu-btn"
            id="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown — slides down below navbar */}
        <div className={`mobile-dropdown${open ? " mobile-dropdown--open" : ""}`}>
          <div className="container mobile-dropdown-inner">
            {[{ label: "Home", href: "/" }, ...links].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`mobile-nav-link${pathname === l.href ? " active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mobile-resume-btn"
            >
              <FileText size={14} />
              View Résumé
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
