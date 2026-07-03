"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Send, Copy, CheckCircle, Twitter, Youtube } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens mailto with form data
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contactItems = [
    { icon: <Mail size={15} />, label: "Email", value: personalInfo.email, action: () => copy(personalInfo.email, "email"), href: `mailto:${personalInfo.email}` },
    { icon: <Phone size={15} />, label: "Phone", value: personalInfo.phone, action: () => copy(personalInfo.phone, "phone"), href: `tel:${personalInfo.phone}` },
    { icon: <MapPin size={15} />, label: "Location", value: personalInfo.location, action: null, href: null },
  ];

  const socialLinks = [
    { icon: <Github size={15} />,   label: "GitHub",    href: personalInfo.github },
    { icon: <Linkedin size={15} />, label: "LinkedIn",  href: personalInfo.linkedin },
    { icon: <Twitter size={15} />,  label: "Twitter",   href: personalInfo.twitter },
    { icon: <Youtube size={15} />,  label: "YouTube",   href: personalInfo.youtube },
    { icon: <span style={{ fontSize: 11, fontWeight: 800 }}>DH</span>, label: "DoraHacks", href: personalInfo.dorahacks },
    { icon: <Globe size={15} />,    label: "Blog",      href: personalInfo.blog },
  ];

  return (
    <div className="page-wrapper" style={{ position: "relative" }}>
      {/* Background Spotlight */}
      <div className="spotlight" style={{ top: "-100px", left: "50%", transform: "translateX(-50%)" }} />

      <div className="container" style={{ paddingTop: "48px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span className="section-label">Contact</span>
          <h1 className="section-title text-gradient">Get in Touch</h1>
          <p className="section-sub">
            Available for full-stack projects, smart contract development, and Web3 integrations.
            Let&apos;s talk.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>

          {/* Left: contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Status */}
            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 6px var(--green)" }} />
                <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--green)" }}>Available for work</p>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Currently open to new opportunities — freelance, part-time, or full-time roles.
              </p>
            </div>

            {/* Contact items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {contactItems.map((item) => (
                <div key={item.label} className="card" style={{ padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>{item.icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "11px", color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} style={{ fontSize: "13px", color: "var(--text)", fontWeight: 500, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.value}</a>
                        : <p style={{ fontSize: "13px", color: "var(--text)", fontWeight: 500 }}>{item.value}</p>
                      }
                    </div>
                  </div>
                  {item.action && (
                    <button onClick={item.action} className="btn btn-ghost" style={{ padding: "5px 8px", flexShrink: 0 }} aria-label={`Copy ${item.label}`}>
                      {copied === item.label.toLowerCase() ? <CheckCircle size={13} style={{ color: "var(--green)" }} /> : <Copy size={13} />}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p style={{ fontSize: "12px", color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>Social</p>
              <div style={{ display: "flex", gap: "8px" }}>
                {socialLinks.filter(s => s.href).map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="btn btn-secondary" style={{ padding: "8px 14px", gap: "6px", fontSize: "13px" }}>
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <div className="card" style={{ padding: "28px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "20px", letterSpacing: "-0.2px" }}>
                Send a message
              </h2>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }} htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }} htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    className="input"
                    style={{ resize: "vertical", height: "auto" }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", gap: "8px" }}>
                  {sent ? <><CheckCircle size={15} /> Sent!</> : <><Send size={15} /> Send Message</>}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
