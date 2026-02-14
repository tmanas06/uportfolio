"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Send,
  ShieldCheck,
  ExternalLink,
  Lock,
  Terminal,
  MessageSquare,
  Zap,
  Copy,
  CheckCircle,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"zk" | "email">("zk");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container-v2 py-10 sm:py-16 space-y-10 sm:space-y-12 pb-24">
      {/* ═══ HEADER ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <MessageSquare className="w-6 h-6 text-[var(--accent)]" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-tight text-[var(--text-primary)]">
            /// Contact
          </h1>
        </div>
        <p className="text-sm text-[var(--text-secondary)] font-mono ml-10">
          Available for freelance work, internships, and open-source collaborations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ═══ LEFT COLUMN: Contact Info ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-1 space-y-5"
        >
          {/* Contact Cards */}
          {[
            { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
            { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
            { icon: MapPin, label: "Location", value: personalInfo.location },
          ].map((item) => (
            <div
              key={item.label}
              className="border-[3px] border-[var(--border-color)] p-5 shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--accent)] border-[2px] border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] font-mono">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors truncate block font-mono">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate font-mono">{item.value}</p>
                  )}
                </div>
                {item.value && (
                  <button
                    onClick={() => copyToClipboard(item.value!, item.label)}
                    className="w-8 h-8 border-[2px] border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent)] hover:text-black transition-all flex-shrink-0"
                  >
                    {copied === item.label ? (
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Social Links */}
          <div className="border-[3px] border-[var(--border-color)] p-5 shadow-[4px_4px_0px_var(--shadow-color)]">
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] font-mono mb-4">/// Socials</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Github, label: "GitHub", href: personalInfo.github },
                { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedin },
                ...(personalInfo.blog ? [{ icon: Globe, label: "Blog", href: personalInfo.blog }] : []),
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border-[2px] border-[var(--border-color)] hover:bg-[var(--accent)] hover:text-black transition-all group/social shadow-[2px_2px_0px_var(--border-color)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_var(--border-color)]"
                >
                  <social.icon className="w-4 h-4 text-[var(--text-muted)] group-hover/social:text-black" />
                  <span className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] group-hover/social:text-black font-mono">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Availability Badge */}
          <div className="border-[3px] border-[var(--accent)] p-5 bg-[var(--accent)] shadow-[4px_4px_0px_var(--shadow-color)]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black border-[2px] border-black" />
              <span className="text-sm font-black text-black uppercase tracking-widest font-mono">
                Available for hire
              </span>
            </div>
            <p className="text-xs font-bold text-black/70 mt-2 font-mono">
              Open to freelance, internships, and full-time roles.
            </p>
          </div>
        </motion.div>

        {/* ═══ RIGHT COLUMN: Messaging ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-2"
        >
          {/* Tab Selector */}
          <div className="flex border-[3px] border-[var(--border-color)] mb-0 shadow-[4px_4px_0px_var(--shadow-color)]">
            <button
              onClick={() => setActiveTab("zk")}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-widest transition-all border-r-[3px] border-[var(--border-color)] ${activeTab === "zk"
                ? "bg-[var(--accent)] text-black"
                : "text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-black"
                }`}
            >
              <Lock className="w-4 h-4" />
              <span>Anonymous (ZK)</span>
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-widest transition-all ${activeTab === "email"
                ? "bg-[var(--accent)] text-black"
                : "text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-black"
                }`}
            >
              <Mail className="w-4 h-4" />
              <span>Direct Email</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "zk" ? (
            <div className="border-[3px] border-t-0 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)]">
              {/* ZK Info Header */}
              <div className="p-6 border-b-[3px] border-[var(--border-color)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--accent)] border-[3px] border-[var(--border-color)] flex items-center justify-center shadow-[3px_3px_0px_var(--shadow-color)]">
                    <ShieldCheck className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[var(--text-primary)] uppercase font-heading">ZK-Whisper Protocol</h3>
                    <p className="text-xs text-[var(--text-secondary)] font-mono mt-1">
                      Send anonymous messages using zero-knowledge proofs. Your identity is never revealed.
                    </p>
                  </div>
                </div>
              </div>

              {/* ZK Messenger Iframe */}
              <div className="relative" style={{ height: "600px" }}>
                <iframe
                  src="https://zk-whisper.vercel.app/"
                  className="w-full h-full border-0"
                  allow="clipboard-read; clipboard-write"
                  title="ZK Anonymous Messenger"
                  loading="lazy"
                />
              </div>

              {/* ZK Footer */}
              <div className="p-4 border-t-[3px] border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono">E2E Encrypted</span>
                </div>
                <a
                  href="https://zk-whisper.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-black text-[var(--accent)] hover:text-[var(--accent-2)] uppercase tracking-widest transition-colors"
                >
                  Open Full <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="border-[3px] border-t-0 border-[var(--border-color)] p-8 shadow-[4px_4px_0px_var(--shadow-color)]">
              <div className="text-center max-w-md mx-auto">
                <div className="w-20 h-20 bg-[var(--accent)] border-[3px] border-[var(--border-color)] flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_var(--shadow-color)]">
                  <Mail className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase font-heading">Direct_Message</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-3 font-mono leading-relaxed">
                  Prefer a direct conversation? Send me an email and I&apos;ll get back to you within 24 hours.
                </p>
                <a
                  href={`mailto:${personalInfo.email}?subject=Portfolio%20Contact&body=Hi%20${personalInfo.firstName},%0A%0A`}
                  className="inline-flex items-center gap-3 mt-8 px-10 py-4 bg-[var(--accent)] text-black font-black text-sm border-[3px] border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-widest"
                >
                  <Send className="w-5 h-5" /> Compose Email
                </a>
                <p className="text-[10px] font-bold text-[var(--text-muted)] mt-4 font-mono">
                  Opens your default email client
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
