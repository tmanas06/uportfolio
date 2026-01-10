"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  MessageSquare,
  Clock,
  Shield,
  Lock,
  ExternalLink,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

type TabType = "zk" | "email";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<TabType>("zk");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="container-v2 py-12 flex flex-col gap-12 sm:gap-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white mb-6">
          Get in <span className="gold-text">Touch</span>
        </h1>
        <p className="text-secondary text-lg">
          Whether you have a project in mind or just want to chat about Web3, I'm always open to new connections.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-1 flex flex-col gap-6"
        >
          {/* Quick Contact */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 font-heading text-center lg:text-left">Direct Contact</h2>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5 hover:border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="min-w-0 text-center sm:text-left">
                  <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-white group-hover:text-yellow-500 transition-colors text-sm truncate font-medium">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5 hover:border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-white group-hover:text-emerald-500 transition-colors text-sm font-medium">
                    {personalInfo.phone}
                  </p>
                </div>
              </a>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 p-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-white text-sm font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 font-heading text-center lg:text-left">Ecosystem</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Github, label: "GitHub", href: personalInfo.github, color: "hover:text-white" },
                { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedin, color: "hover:text-blue-400" },
                { icon: Globe, label: "Portfolio", href: personalInfo.portfolio, color: "hover:text-yellow-500" },
                { icon: MessageSquare, label: "Blog", href: personalInfo.blog, color: "hover:text-purple-400" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5 ${social.color}`}
                >
                  <social.icon className="w-4 h-4 text-muted group-hover:current transition-colors" />
                  <span className="text-sm font-bold text-secondary group-hover:text-white transition-colors">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Availability Status */}
          <div className="glass-card p-6 rounded-3xl border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/20 transition-colors duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-lg font-bold text-white">Open for Opportunities</h2>
              </div>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                Available for internships, full-time positions, and freelance Web3 development.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                <span>Responds within 24h</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Messaging */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-2 flex flex-col gap-8"
        >
          {/* Messaging Card */}
          <div className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full border-white/10">
            {/* Tab Header */}
            <div className="flex p-2 bg-white/5 border-b border-white/5 translate-z-0">
              <button
                onClick={() => setActiveTab("zk")}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold transition-all relative overflow-hidden group ${activeTab === "zk"
                  ? "text-purple-400 bg-white/5"
                  : "text-muted hover:text-white"
                  }`}
              >
                {activeTab === "zk" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-500/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Shield className={`w-4 h-4 transition-transform duration-500 ${activeTab === "zk" ? "scale-110" : "group-hover:scale-110"}`} />
                <span className="relative z-10">Anonymous (ZK)</span>
              </button>
              <button
                onClick={() => setActiveTab("email")}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold transition-all relative overflow-hidden group ${activeTab === "email"
                  ? "text-yellow-500 bg-white/5"
                  : "text-muted hover:text-white"
                  }`}
              >
                {activeTab === "email" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-yellow-500/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Mail className={`w-4 h-4 transition-transform duration-500 ${activeTab === "email" ? "scale-110" : "group-hover:scale-110"}`} />
                <span className="relative z-10">Direct Email</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-10 flex-1">
              <AnimatePresence mode="wait">
                {activeTab === "zk" ? (
                  <motion.div
                    key="zk"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                          <Shield className="w-7 h-7 text-purple-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white font-heading">ZK Message</h2>
                          <p className="text-secondary text-sm">Powered by Zero-Knowledge Proofs</p>
                        </div>
                      </div>
                      <div className="hidden sm:flex gap-3">
                        <div className="flex flex-col items-center gap-1">
                          <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                            <Lock className="w-4 h-4 text-purple-400" />
                          </div>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">Private</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                            <Zap className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">Fast</span>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card rounded-3xl overflow-hidden border-purple-500/20 shadow-2xl bg-black/80 mb-6">
                      <iframe
                        src="https://zk-whisper.vercel.app?embedded=true"
                        className="w-full h-[450px] border-0"
                        title="ZKWhisper"
                        allow="clipboard-write; encrypted-media; camera; microphone; fullscreen"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="https://zk-whisper.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-premium btn-outline rounded-2xl py-4 group/zk"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/zk:rotate-45 transition-transform" />
                        Open Original Site
                      </a>
                      <a
                        href="https://github.com/tmanas06/ZKWhisper"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-premium btn-zinc rounded-2xl py-4 group/code"
                      >
                        <Github className="w-4 h-4" />
                        View Protocol Source
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0 border border-yellow-500/20">
                        <Mail className="w-7 h-7 text-yellow-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white font-heading">Send Email</h2>
                        <p className="text-secondary text-sm">Formal inquiries & collaborations</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Manas Chakravarty"
                          required
                          className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-muted focus:outline-none focus:border-yellow-500/50 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="manas@example.com"
                          required
                          className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-muted focus:outline-none focus:border-yellow-500/50 transition-all font-medium"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Subject</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Let's build something epic together"
                          required
                          className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-muted focus:outline-none focus:border-yellow-500/50 transition-all font-medium"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Message Body</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell me about your project, goals, and how I can help..."
                          required
                          rows={6}
                          className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-muted focus:outline-none focus:border-yellow-500/50 transition-all font-medium resize-none leading-relaxed"
                        />
                      </div>
                      <div className="sm:col-span-2 mt-2">
                        <button
                          type="submit"
                          className="btn-premium w-full rounded-2xl py-5 text-base shadow-[0_20px_40px_-15px_rgba(240,185,11,0.2)]"
                        >
                          <Send className="w-5 h-5" />
                          Transmit Message
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
