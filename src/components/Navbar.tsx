"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { Alex_Brush } from "next/font/google";
import BusinessCardModal from "@/components/BusinessCardModal";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface NavItem {
  label: string;
  href?: string;
  isAction?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Card", isAction: true },
  { label: "Projects", href: "/projects" },
  { label: "Posts", href: "/posts" },
  { label: "Stack", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Auto-open business card when arriving via NFC tap (?nfc=true, ?card=true, etc.)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const isNfc =
        params.get("nfc") === "true" ||
        params.get("nfc") === "1" ||
        params.get("card") === "true" ||
        params.get("card") === "1" ||
        params.get("tap") === "nfc" ||
        params.get("source") === "nfc";

      if (isNfc) {
        setCardOpen(true);
      }
    }
  }, []);

  const handleCloseCard = () => {
    setCardOpen(false);
    if (typeof window !== "undefined" && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      if (
        params.has("nfc") ||
        params.has("card") ||
        params.has("tap") ||
        params.has("source")
      ) {
        const url = new URL(window.location.href);
        url.searchParams.delete("nfc");
        url.searchParams.delete("card");
        url.searchParams.delete("tap");
        url.searchParams.delete("source");
        const cleanUrl = url.pathname + (url.search ? url.search : "") + url.hash;
        window.history.replaceState({}, "", cleanUrl);
      }
    }
  };

  // On dedicated /card page, don't render navbar so the card fits 100% within the viewport without scroll
  if (pathname === "/card") {
    return null;
  }

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
            t manas chakravarty
          </Link>

          {/* Desktop links — hidden on mobile via globals.css */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.isAction ? (
                  <button
                    type="button"
                    onClick={() => setCardOpen(true)}
                    className={`nav-link${cardOpen ? " active" : ""}`}
                    id="nav-card-btn"
                    aria-label="Open Business Card"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={`nav-link${pathname === item.href ? " active" : ""}`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )}
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
            {navItems.map((item) =>
              item.isAction ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setCardOpen(true);
                  }}
                  className={`mobile-nav-link${cardOpen ? " active" : ""}`}
                  id="mobile-nav-card-btn"
                  style={{
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-link${pathname === item.href ? " active" : ""}`}
                >
                  {item.label}
                </Link>
              )
            )}
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

      {/* Business Card Modal */}
      <BusinessCardModal
        isOpen={cardOpen}
        onClose={handleCloseCard}
      />
    </>
  );
}

