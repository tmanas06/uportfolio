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
    <div className="container-main py-6 flex flex-col gap-6">
      {/* Spacer for visual separation from header */}
      <div className="h-4" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F6F5] mb-2">Contact</h1>
        <p className="text-[#848E9C]">Let's connect and discuss opportunities</p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 flex flex-col gap-4"
        >
          {/* Quick Contact */}
          <div className="card p-5">
            <h2 className="text-base font-semibold text-[#F5F6F5] mb-4">Get in Touch</h2>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(240,185,11,0.1)] flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#F0B90B]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[#848E9C]">Email</p>
                  <p className="text-[#F5F6F5] group-hover:text-[#F0B90B] transition-colors text-sm truncate">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,212,170,0.1)] flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#00D4AA]" />
                </div>
                <div>
                  <p className="text-xs text-[#848E9C]">Phone</p>
                  <p className="text-[#F5F6F5] group-hover:text-[#00D4AA] transition-colors text-sm">
                    {personalInfo.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1E2735]">
                <div className="w-10 h-10 rounded-lg bg-[rgba(98,126,234,0.1)] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#627EEA]" />
                </div>
                <div>
                  <p className="text-xs text-[#848E9C]">Location</p>
                  <p className="text-[#F5F6F5] text-sm">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="card p-5">
            <h2 className="text-base font-semibold text-[#F5F6F5] mb-4">Connect</h2>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <Github className="w-4 h-4 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                <span className="text-sm text-[#F5F6F5]">GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                <span className="text-sm text-[#F5F6F5]">LinkedIn</span>
              </a>
              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <Globe className="w-4 h-4 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                <span className="text-sm text-[#F5F6F5]">Portfolio</span>
              </a>
              <a
                href={personalInfo.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <MessageSquare className="w-4 h-4 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                <span className="text-sm text-[#F5F6F5]">Blog</span>
              </a>
            </div>
          </div>

          {/* Availability */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00D4AA] animate-pulse" />
              <h2 className="text-base font-semibold text-[#F5F6F5]">Available</h2>
            </div>
            <p className="text-sm text-[#848E9C] mb-3">
              Open for internships, full-time positions, and freelance opportunities.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#848E9C]">
              <Clock className="w-3.5 h-3.5" />
              <span>Usually responds within 24 hours</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card overflow-hidden">
            {/* Tab Header */}
            <div className="flex border-b border-[rgba(240,185,11,0.15)]">
              <button
                onClick={() => setActiveTab("zk")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all ${
                  activeTab === "zk"
                    ? "text-[#8247E5] border-b-2 border-[#8247E5] bg-[rgba(130,71,229,0.05)]"
                    : "text-[#848E9C] hover:text-[#F5F6F5] hover:bg-[#1E2735]"
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Anonymous (ZK)</span>
              </button>
              <button
                onClick={() => setActiveTab("email")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all ${
                  activeTab === "email"
                    ? "text-[#F0B90B] border-b-2 border-[#F0B90B] bg-[rgba(240,185,11,0.05)]"
                    : "text-[#848E9C] hover:text-[#F5F6F5] hover:bg-[#1E2735]"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === "zk" ? (
                  <motion.div
                    key="zk"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* ZK Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[rgba(130,71,229,0.15)] flex items-center justify-center">
                          <Shield className="w-5 h-5 text-[#8247E5]" />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold text-[#F5F6F5]">Send Anonymous Message</h2>
                          <p className="text-xs text-[#848E9C]">Powered by Zero-Knowledge Proofs</p>
                        </div>
                      </div>
                      <a
                        href="https://github.com/tmanas06/ZKWhisper"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-[#848E9C] hover:text-[#F0B90B] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Source</span>
                      </a>
                    </div>

                    {/* ZK Features */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      <div className="p-2.5 rounded-lg bg-[#1E2735] border border-[rgba(130,71,229,0.2)] text-center">
                        <Lock className="w-4 h-4 text-[#8247E5] mx-auto mb-1" />
                        <p className="text-xs font-medium text-[#F5F6F5]">Private</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#1E2735] border border-[rgba(0,212,170,0.2)] text-center">
                        <Shield className="w-4 h-4 text-[#00D4AA] mx-auto mb-1" />
                        <p className="text-xs font-medium text-[#F5F6F5]">ZK Verified</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#1E2735] border border-[rgba(240,185,11,0.2)] text-center">
                        <MessageSquare className="w-4 h-4 text-[#F0B90B] mx-auto mb-1" />
                        <p className="text-xs font-medium text-[#F5F6F5]">Decentralized</p>
                      </div>
                    </div>

                    {/* Embedded ZKWhisper */}
                    <div className="rounded-xl overflow-hidden border border-[rgba(130,71,229,0.3)] bg-[#0A0E17]">
                      <iframe
                        src="https://app-six-alpha.vercel.app"
                        className="w-full h-[450px] border-0"
                        title="ZKWhisper - Anonymous Messaging"
                        allow="clipboard-write; encrypted-media; camera; microphone"
                      />
                    </div>

                    {/* Open in New Tab */}
                    <a
                      href="https://app-six-alpha.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl border border-[rgba(130,71,229,0.3)] text-[#8247E5] hover:bg-[rgba(130,71,229,0.1)] transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open ZKWhisper in New Tab
                    </a>

                    <p className="text-xs text-[#848E9C] mt-3 text-center">
                      Messages are sent using Zero-Knowledge Proofs. Your identity remains completely anonymous.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Email Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[rgba(240,185,11,0.15)] flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#F0B90B]" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-[#F5F6F5]">Send via Email</h2>
                        <p className="text-xs text-[#848E9C]">Traditional communication method</p>
                      </div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#848E9C] mb-1.5">Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            required
                            className="w-full h-11 px-4 bg-[#1E2735] border border-[rgba(240,185,11,0.15)] rounded-xl text-sm text-[#F5F6F5] placeholder-[#5E6673] focus:outline-none focus:border-[#F0B90B] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#848E9C] mb-1.5">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            required
                            className="w-full h-11 px-4 bg-[#1E2735] border border-[rgba(240,185,11,0.15)] rounded-xl text-sm text-[#F5F6F5] placeholder-[#5E6673] focus:outline-none focus:border-[#F0B90B] transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#848E9C] mb-1.5">Subject</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="What's this about?"
                          required
                          className="w-full h-11 px-4 bg-[#1E2735] border border-[rgba(240,185,11,0.15)] rounded-xl text-sm text-[#F5F6F5] placeholder-[#5E6673] focus:outline-none focus:border-[#F0B90B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#848E9C] mb-1.5">Message</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Your message..."
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-[#1E2735] border border-[rgba(240,185,11,0.15)] rounded-xl text-sm text-[#F5F6F5] placeholder-[#5E6673] focus:outline-none focus:border-[#F0B90B] transition-colors resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#F0B90B] to-[#F7CA47] text-[#0A0E17] font-semibold text-sm hover:shadow-[0_0_20px_rgba(240,185,11,0.3)] transition-all"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </button>
                    </form>

                    <p className="text-xs text-[#848E9C] mt-4 text-center">
                      This will open your default email client with the message pre-filled.
                    </p>
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
