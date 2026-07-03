"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";

const links = [
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Stack",    href: "/skills" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <div className="container nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo" style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: "900", letterSpacing: "-1px" }} aria-label="Home">
            tmanas
          </Link>

          {/* Desktop links */}
          <ul className="nav-links" style={{ display: "flex" }}>
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

          {/* Mobile hamburger */}
          <button
            className="btn btn-secondary"
            style={{ padding: "7px 10px", display: "none" }}
            id="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 99,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              position: "absolute", top: 0, right: 0, bottom: 0,
              width: "260px",
              background: "var(--bg-card)",
              borderLeft: "1px solid var(--border)",
              padding: "80px 24px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {[{ label: "Home", href: "/" }, ...links].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: pathname === l.href ? "var(--text)" : "var(--text-muted)",
                  background: pathname === l.href ? "rgba(255,255,255,0.05)" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                {l.label}
              </Link>
            ))}
            <div style={{ marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <FileText size={14} />
                View Résumé
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-only CSS */}
      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
