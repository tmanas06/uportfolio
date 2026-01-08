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
  MessageSquare,
  Clock,
  Shield,
  Lock,
  ExternalLink,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="container-main py-10 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F6F5] mb-2">Contact</h1>
        <p className="text-[#848E9C]">Let's connect and discuss opportunities</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 space-y-4"
        >
          {/* Quick Contact */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-[#F5F6F5] mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(240,185,11,0.1)] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#F0B90B]" />
                </div>
                <div>
                  <p className="text-sm text-[#848E9C]">Email</p>
                  <p className="text-[#F5F6F5] group-hover:text-[#F0B90B] transition-colors text-sm">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,170,0.1)] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#00D4AA]" />
                </div>
                <div>
                  <p className="text-sm text-[#848E9C]">Phone</p>
                  <p className="text-[#F5F6F5] group-hover:text-[#00D4AA] transition-colors text-sm">
                    {personalInfo.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1E2735]">
                <div className="w-12 h-12 rounded-xl bg-[rgba(98,126,234,0.1)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#627EEA]" />
                </div>
                <div>
                  <p className="text-sm text-[#848E9C]">Location</p>
                  <p className="text-[#F5F6F5] text-sm">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-[#F5F6F5] mb-4">Connect</h2>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <Github className="w-5 h-5 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                <span className="text-sm text-[#F5F6F5]">GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                <span className="text-sm text-[#F5F6F5]">LinkedIn</span>
              </a>
              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <Globe className="w-5 h-5 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                <span className="text-sm text-[#F5F6F5]">Portfolio</span>
              </a>
              <a
                href={personalInfo.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] transition-colors group"
              >
                <MessageSquare className="w-5 h-5 text-[#848E9C] group-hover:text-[#F0B90B] transition-colors" />
                <span className="text-sm text-[#F5F6F5]">Blog</span>
              </a>
            </div>
          </div>

          {/* Availability */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-[#00D4AA] animate-pulse" />
              <h2 className="text-lg font-semibold text-[#F5F6F5]">Available</h2>
            </div>
            <p className="text-sm text-[#848E9C] mb-4">
              Open for internships, full-time positions, and freelance opportunities in blockchain development.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#848E9C]">
              <Clock className="w-4 h-4" />
              <span>Usually responds within 24 hours</span>
            </div>
          </div>
        </motion.div>

        {/* ZKWhisper - Anonymous Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[rgba(130,71,229,0.15)] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#8247E5]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#F5F6F5]">Send Anonymous Message</h2>
                  <p className="text-sm text-[#848E9C]">Powered by Zero-Knowledge Proofs</p>
                </div>
              </div>
              <a
                href="https://github.com/tmanas06/ZKWhisper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#848E9C] hover:text-[#F0B90B] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Source</span>
              </a>
            </div>

            {/* ZK Proof Features */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#1E2735] border border-[rgba(130,71,229,0.2)] text-center">
                <Lock className="w-5 h-5 text-[#8247E5] mx-auto mb-1" />
                <p className="text-xs font-medium text-[#F5F6F5]">Private</p>
              </div>
              <div className="p-3 rounded-xl bg-[#1E2735] border border-[rgba(0,212,170,0.2)] text-center">
                <Shield className="w-5 h-5 text-[#00D4AA] mx-auto mb-1" />
                <p className="text-xs font-medium text-[#F5F6F5]">ZK Verified</p>
              </div>
              <div className="p-3 rounded-xl bg-[#1E2735] border border-[rgba(240,185,11,0.2)] text-center">
                <MessageSquare className="w-5 h-5 text-[#F0B90B] mx-auto mb-1" />
                <p className="text-xs font-medium text-[#F5F6F5]">Decentralized</p>
              </div>
            </div>

            {/* Embedded ZKWhisper */}
            <div className="rounded-xl overflow-hidden border border-[rgba(130,71,229,0.3)] bg-[#0A0E17]">
              <iframe
                src="https://app-six-alpha.vercel.app"
                className="w-full h-[550px] border-0"
                title="ZKWhisper - Anonymous Messaging"
                allow="clipboard-write; encrypted-media; camera; microphone"
              />
            </div>

            {/* Open in New Tab Button */}
            <a
              href="https://app-six-alpha.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn btn-outline py-4 mt-4 justify-center group"
            >
              <ExternalLink className="w-5 h-5" />
              Open ZKWhisper in New Tab
            </a>

            <p className="text-xs text-[#848E9C] mt-4 text-center">
              Messages are sent using Zero-Knowledge Proofs. Your identity remains completely anonymous.
            </p>
          </div>

          {/* Traditional Contact Form */}
          <div className="card p-6 mt-6">
            <h2 className="text-lg font-semibold text-[#F5F6F5] mb-4">Or Send via Email</h2>
            <p className="text-sm text-[#848E9C] mb-4">Prefer traditional communication? Use the form below.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#848E9C] mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="w-full h-12 px-4 bg-[#1E2735] border border-[rgba(240,185,11,0.15)] rounded-xl text-[#F5F6F5] placeholder-[#5E6673] focus:outline-none focus:border-[#F0B90B] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#848E9C] mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full h-12 px-4 bg-[#1E2735] border border-[rgba(240,185,11,0.15)] rounded-xl text-[#F5F6F5] placeholder-[#5E6673] focus:outline-none focus:border-[#F0B90B] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#848E9C] mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What's this about?"
                  required
                  className="w-full h-12 px-4 bg-[#1E2735] border border-[rgba(240,185,11,0.15)] rounded-xl text-[#F5F6F5] placeholder-[#5E6673] focus:outline-none focus:border-[#F0B90B] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[#848E9C] mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1E2735] border border-[rgba(240,185,11,0.15)] rounded-xl text-[#F5F6F5] placeholder-[#5E6673] focus:outline-none focus:border-[#F0B90B] transition-colors resize-none"
                />
              </div>
              <button type="submit" className="w-full btn btn-outline py-4">
                <Mail className="w-5 h-5" />
                Send via Email
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
