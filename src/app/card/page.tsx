"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  RotateCw,
  Copy,
  Check,
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  ArrowLeft,
  ArrowRight,
  Nfc,
} from "lucide-react";
import {
  SiSolidity,
  SiSolana,
  SiEthereum,
  SiPolygon,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiRust,
  SiFlutter,
  SiDocker,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Alex_Brush } from "next/font/google";
import { personalInfo } from "@/lib/data";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const techStack = [
  { name: "Solidity", icon: SiSolidity, color: "#AA6746" },
  { name: "Ethereum", icon: SiEthereum, color: "#627EEA" },
  { name: "Solana", icon: SiSolana, color: "#00FFA3" },
  { name: "Polygon", icon: SiPolygon, color: "#8247E5" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Rust", icon: SiRust, color: "#DEA584" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
];

export default function CardPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === " " &&
        (e.target as HTMLElement).tagName !== "BUTTON" &&
        (e.target as HTMLElement).tagName !== "A"
      ) {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Completely disable page scroll on both mobile and desktop while viewing the card
  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.body.style.touchAction = "none";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.height = "";
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.height = "";
      document.body.style.touchAction = originalTouchAction;
    };
  }, []);

  const handleCopy = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadVCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${personalInfo.name}
N:Chakravarty;T;Manas;;
TITLE:${personalInfo.title}
ORG:KL University
EMAIL;TYPE=INTERNET,WORK:${personalInfo.email}
TEL;TYPE=CELL:${personalInfo.phone}
ADR;TYPE=WORK:;;${personalInfo.location};;;
URL:${personalInfo.portfolio}
NOTE:${personalInfo.tagline}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "T_Manas_Chakravarty.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card-page-lock fixed inset-0 w-full h-[100dvh] flex flex-col justify-center items-center p-4 overflow-hidden select-none z-50 bg-[#0A0A0A]">
      <div className="bcard-modal-container w-full max-w-[350px] sm:max-w-[590px]">
        {/* Header Bar */}
        <div className="bcard-header-bar flex items-center justify-between w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} /> Back to home
          </Link>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(163,230,53,0.08)] border border-[rgba(163,230,53,0.25)] text-[#a3e635] text-[10px] font-mono shadow-[0_0_8px_rgba(163,230,53,0.12)]">
            <Nfc size={12} strokeWidth={2.4} />
            <span className="font-bold tracking-wider text-[9px]">NFC SMART CARD</span>
          </div>

          <button
            type="button"
            onClick={() => setIsFlipped((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[rgba(163,230,53,0.15)] text-neutral-200 hover:text-[#a3e635] text-xs border border-white/10 hover:border-[rgba(163,230,53,0.4)] transition-all cursor-pointer"
          >
            <RotateCw
              size={11}
              className={`transition-transform duration-500 ${
                isFlipped ? "rotate-180" : ""
              }`}
            />
            <span>{isFlipped ? "Front" : "Flip Card"}</span>
          </button>
        </div>

        {/* 3D Perspective Stage */}
        <div className="bcard-perspective-stage">
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsFlipped((prev) => !prev)}
            className="bcard-card-box"
          >
            {/* ── CARD FRONT ──────────────────────────────────────── */}
            <div className="bcard-face-layer bcard-face-front">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#a3e635] tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[rgba(163,230,53,0.08)] border border-[rgba(163,230,53,0.25)] shadow-[0_0_12px_rgba(163,230,53,0.1)]">
                  <span>&lt;TMC /&gt;</span>
                  <span className="text-[10px] text-neutral-400 font-normal hidden sm:inline">
                    • FULL STACK & BLOCKCHAIN
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(163,230,53,0.08)] border border-[rgba(163,230,53,0.25)] text-[#a3e635] font-mono text-[10px] shadow-[0_0_8px_rgba(163,230,53,0.12)]" title="NFC Enabled Smart Card">
                    <Nfc size={12} strokeWidth={2.4} />
                    <span className="font-bold tracking-wider text-[9px]">NFC</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-[rgba(52,211,153,0.12)] border border-[rgba(52,211,153,0.3)] text-[#34D399] text-[10px] sm:text-xs font-mono font-semibold shadow-[0_0_10px_rgba(52,211,153,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    AVAILABLE
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-6 my-auto text-center sm:text-left w-full relative z-10">
                <div className="relative flex-shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.18)_0%,transparent_70%)] blur-md pointer-events-none" />

                  <div className="bcard-photo-free">
                    <Image
                      src="/my_transparent.png"
                      alt={personalInfo.name}
                      fill
                      sizes="(max-width: 640px) 120px, 160px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                    {personalInfo.firstName}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#a3e635] font-semibold font-mono tracking-wide mt-0.5">
                    {personalInfo.title}
                  </p>

                  <div
                    className={`text-xl sm:text-2xl text-neutral-200 select-none pointer-events-none drop-shadow-[0_0_6px_rgba(163,230,53,0.25)] ${alexBrush.className} hidden sm:block`}
                    style={{ transform: "rotate(-1.5deg)" }}
                  >
                    t manas chakravarty
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-[#8892A4] mt-0.5 font-mono">
                    KL University • CGPA: 9.44 • Ex-KPMG
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1 sm:mt-2">
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bcard-social-btn"
                      title="GitHub"
                    >
                      <Github size={13} className="sm:text-sm" />
                    </a>

                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bcard-social-btn"
                      title="LinkedIn"
                    >
                      <Linkedin size={13} className="sm:text-sm" />
                    </a>

                    <a
                      href={personalInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bcard-social-btn"
                      title="X / Twitter"
                    >
                      <Twitter size={13} className="sm:text-sm" />
                    </a>

                    <a
                      href={personalInfo.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bcard-social-btn"
                      title="YouTube"
                    >
                      <Youtube size={13} className="sm:text-sm" />
                    </a>

                    <a
                      href={personalInfo.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bcard-social-btn"
                      title="Portfolio"
                    >
                      <Globe size={13} className="sm:text-sm" />
                    </a>

                    <div
                      onClick={(e) => handleCopy(personalInfo.email, "email_page_front", e)}
                      className="bcard-social-btn cursor-pointer"
                      title="Copy Email"
                    >
                      {copiedKey === "email_page_front" ? (
                        <Check size={13} className="text-[#34D399]" />
                      ) : (
                        <Mail size={13} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-1.5 sm:pt-2 border-t border-white/10 flex flex-col gap-0.5 sm:gap-1 w-full">
                <div className="flex items-center justify-between text-xs w-full">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                      Stack
                    </span>
                    <span className="text-neutral-600 text-[10px]">•</span>
                    {hoveredTech ? (
                      <span className="text-[11px] font-bold text-[#a3e635]">
                        {hoveredTech}
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-400">
                        {techStack.length} Technologies
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#a3e635] font-mono flex-shrink-0 font-medium">
                    <span>Flip</span>
                    <RotateCw size={11} />
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full">
                  {techStack.map((tech) => {
                    const Icon = tech.icon;
                    const isHovered = hoveredTech === tech.name;
                    return (
                      <div
                        key={tech.name}
                        className={`bcard-tech-icon ${isHovered ? "active" : ""}`}
                        title={tech.name}
                        onMouseEnter={() => setHoveredTech(tech.name)}
                        onMouseLeave={() => setHoveredTech(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setHoveredTech(tech.name);
                        }}
                      >
                        <Icon size={14} style={{ color: tech.color }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── CARD BACK ───────────────────────────────────────── */}
            <div className="bcard-face-layer bcard-face-back relative">
              <div className="bcard-watermark">&lt;TMC/&gt;</div>

              <div className="flex items-center justify-between relative z-10 w-full mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                    Direct Connect
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                    • MANAS.VCF
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(163,230,53,0.08)] border border-[rgba(163,230,53,0.25)] text-[#a3e635] font-mono text-[10px] shadow-[0_0_8px_rgba(163,230,53,0.12)]" title="NFC Enabled">
                    <Nfc size={11} strokeWidth={2.4} />
                    <span className="font-bold tracking-wider text-[9px]">NFC</span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300 flex-shrink-0">
                    <MapPin size={11} className="text-[#a3e635]" />
                    Hyderabad, India
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 my-auto relative z-10 w-full">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="bcard-qr-box p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 37 37"
                      shapeRendering="crispEdges"
                      className="w-16 h-16 sm:w-20 sm:h-20"
                    >
                      <path fill="#ffffff" d="M0 0h37v37H0z" />
                      <path
                        stroke="#000000"
                        d="M4 4.5h7m2 0h2m4 0h2m1 0h3m1 0h7M4 5.5h1m5 0h1m4 0h1m6 0h1m3 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h3m3 0h1m1 0h1m2 0h2m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m2 0h2m4 0h1m1 0h1m2 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h8m3 0h2m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m2 0h1m1 0h3m1 0h2m1 0h1m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m3 0h2m1 0h1M4 12.5h1m1 0h5m5 0h1m1 0h5m3 0h5M4 13.5h3m1 0h2m3 0h1m2 0h1m3 0h9m3 0h1M6 14.5h1m1 0h1m1 0h1m2 0h3m3 0h1m1 0h1m2 0h1m3 0h1M5 15.5h2m1 0h2m1 0h2m1 0h1m3 0h2m2 0h1m1 0h6m1 0h1M4 16.5h1m2 0h5m1 0h2m1 0h1m2 0h3m1 0h1m3 0h1m1 0h2M4 17.5h1m2 0h2m2 0h1m1 0h2m2 0h2m1 0h1m2 0h6m3 0h1M4 18.5h2m1 0h1m2 0h1m1 0h4m1 0h5m4 0h1m2 0h2M4 19.5h5m2 0h2m3 0h2m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m2 0h1M4 20.5h1m2 0h5m1 0h1m1 0h1m2 0h2m1 0h1m2 0h1m2 0h1m1 0h2M4 21.5h2m1 0h1m1 0h1m3 0h1m2 0h1m3 0h1m1 0h7m1 0h1m1 0h1M4 22.5h1m3 0h1m1 0h2m4 0h1m2 0h1m4 0h1m1 0h2m2 0h1M4 23.5h1m2 0h1m4 0h4m2 0h1m1 0h1m3 0h2m1 0h1m3 0h1M4 24.5h1m2 0h1m1 0h5m1 0h1m5 0h1m1 0h6m1 0h3M12 25.5h1m1 0h5m5 0h1m3 0h5M4 26.5h7m2 0h1m1 0h5m1 0h4m1 0h1m1 0h3M4 27.5h1m5 0h1m1 0h2m1 0h3m1 0h2m1 0h1m1 0h1m3 0h1m3 0h1M4 28.5h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h1m2 0h1m2 0h5m1 0h2M4 29.5h1m1 0h3m1 0h1m1 0h4m1 0h1m2 0h1m1 0h3m4 0h4M4 30.5h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0h14M4 31.5h1m5 0h1m4 0h3m1 0h2m3 0h3m1 0h2m1 0h1M4 32.5h7m1 0h3m4 0h1m1 0h1m1 0h1m4 0h3"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 mt-1.5 font-medium">
                    Scan for Live Portfolio
                  </span>
                  <a
                    href={personalInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[9px] font-mono text-[#a3e635] hover:underline mt-0.5 truncate max-w-[120px]"
                  >
                    portfolio-tmanas.vercel.app
                  </a>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div
                    onClick={(e) => handleCopy(personalInfo.email, "email_page_back", e)}
                    className="bcard-contact-row group"
                    title="Click to copy email"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="bcard-icon-bubble w-7 h-7 sm:w-8 sm:h-8">
                        <Mail size={13} />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                          Email
                        </div>
                        <div className="text-[11px] sm:text-xs font-mono font-medium text-neutral-200 group-hover:text-white truncate">
                          {personalInfo.email}
                        </div>
                      </div>
                    </div>

                    {copiedKey === "email_page_back" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-[#34D399] font-bold px-2 py-0.5 rounded-full bg-[rgba(52,211,153,0.15)] flex-shrink-0">
                        <Check size={11} /> Copied
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-500 group-hover:text-[#a3e635] transition-colors flex-shrink-0">
                        <Copy size={13} />
                      </span>
                    )}
                  </div>

                  <div
                    onClick={(e) => handleCopy(personalInfo.phone, "phone_page_back", e)}
                    className="bcard-contact-row group"
                    title="Click to copy phone"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="bcard-icon-bubble w-7 h-7 sm:w-8 sm:h-8">
                        <Phone size={13} />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                          Phone / WhatsApp
                        </div>
                        <div className="text-[11px] sm:text-xs font-mono font-medium text-neutral-200 group-hover:text-white truncate">
                          {personalInfo.phone}
                        </div>
                      </div>
                    </div>

                    {copiedKey === "phone_page_back" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-[#34D399] font-bold px-2 py-0.5 rounded-full bg-[rgba(52,211,153,0.15)] flex-shrink-0">
                        <Check size={11} /> Copied
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-500 group-hover:text-[#a3e635] transition-colors flex-shrink-0">
                        <Copy size={13} />
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-0.5 px-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      Profiles:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bcard-social-btn"
                        title="GitHub"
                      >
                        <Github size={14} />
                      </a>
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bcard-social-btn"
                        title="LinkedIn"
                      >
                        <Linkedin size={14} />
                      </a>
                      <a
                        href={personalInfo.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bcard-social-btn"
                        title="X / Twitter"
                      >
                        <Twitter size={14} />
                      </a>
                      <a
                        href={personalInfo.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bcard-social-btn"
                        title="YouTube"
                      >
                        <Youtube size={14} />
                      </a>
                      <a
                        href={personalInfo.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bcard-social-btn"
                        title="Portfolio"
                      >
                        <Globe size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-white/10 relative z-10 w-full mt-auto">
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="bcard-pill-btn bcard-pill-btn-primary text-xs py-1.5 px-3.5 cursor-pointer"
                >
                  <Download size={13} />
                  <span>Save Contact (.vcf)</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="bcard-pill-btn bcard-pill-btn-ghost text-xs py-1.5 px-3 cursor-pointer"
                >
                  <RotateCw size={12} />
                  <span>Show Front</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Redirect Button Below Card */}
        <Link
          href="/"
          className="bcard-website-btn"
          id="card-open-website-btn"
        >
          <Nfc size={19} strokeWidth={2.5} />
          <span>Open Website</span>
          <ArrowRight size={19} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
