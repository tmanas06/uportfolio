"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Youtube, Twitter, Linkedin, Heart, MessageSquare,
  Play, ExternalLink, Eye, RefreshCw
} from "lucide-react";
import { socialPosts } from "@/lib/data";

const filterFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.3 }
};

export default function PostsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "youtube" | "twitter" | "linkedin">("all");
  const [allPosts, setAllPosts] = useState<any[]>([]);

  useEffect(() => {
    // Start with static local posts (excluding YouTube so we don't duplicate while loading)
    const localPosts = socialPosts.filter(p => p.platform !== "youtube");
    const initialYt = socialPosts.filter(p => p.platform === "youtube");
    setAllPosts([...initialYt, ...localPosts]);

    async function fetchDynamicYoutube() {
      try {
        const res = await fetch("/api/youtube");
        if (res.ok) {
          const ytPosts = await res.json();
          if (ytPosts.length > 0) {
            setAllPosts([...ytPosts, ...localPosts]);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic YouTube feed:", err);
      }
    }
    fetchDynamicYoutube();
  }, []);

  const filteredPosts = allPosts.filter(
    (post) => activeFilter === "all" || post.platform === activeFilter
  );

  return (
    <div className="page-wrapper" style={{ position: "relative" }}>
      {/* Background Spotlight */}
      <div className="spotlight" style={{ top: "-100px", left: "50%", transform: "translateX(-50%)" }} />

      <div className="container" style={{ paddingTop: "48px", position: "relative", zIndex: 1 }}>
        {/* ── PAGE HEADER ─── */}
        <div style={{ marginBottom: "40px" }}>
          <span className="section-label">Feed</span>
          <h1 className="section-title text-gradient">Social Posts</h1>
          <p className="section-sub">
            Insights, tutorials, and Web3 updates across my social platforms.
          </p>
        </div>

        {/* ── FILTER BAR ─── */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "32px",
          flexWrap: "wrap",
          padding: "4px",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          width: "max-content",
          maxWidth: "100%"
        }}>
          {[
            { id: "all", label: "All Feed", icon: null },
            { id: "youtube", label: "YouTube", icon: <Youtube size={14} /> },
            { id: "twitter", label: "Twitter / X", icon: <Twitter size={14} /> },
            { id: "linkedin", label: "LinkedIn", icon: <Linkedin size={14} /> }
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className="btn"
                style={{
                  padding: "8px 16px",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  borderRadius: "8px",
                  border: "none",
                  background: isActive ? "rgba(255, 255, 255, 0.06)" : "transparent",
                  color: isActive ? "var(--text)" : "var(--text-muted)",
                  transition: "all 0.2s"
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── POSTS GRID ─── */}
        <motion.div layout className="grid-auto" style={{ minHeight: "300px" }}>
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
              if (post.platform === "youtube") {
                return (
                  <motion.article
                    key={post.id}
                    layout
                    {...filterFade}
                    className="card"
                    style={{ padding: "16px", display: "flex", flexDirection: "column", height: "100%" }}
                  >
                    {/* YouTube Video Preview Container */}
                    <div style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/9",
                      borderRadius: "6px",
                      overflow: "hidden",
                      background: "#000",
                      border: "1px solid var(--border)",
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {post.thumbnail && (
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.6
                          }}
                        />
                      )}
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "rgba(239, 68, 68, 0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                        zIndex: 2
                      }}>
                        <Play size={20} style={{ color: "#fff", marginLeft: "2px" }} />
                      </div>
                      
                      {/* Duration Badge */}
                      <span style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        background: "rgba(0, 0, 0, 0.8)",
                        color: "#fff",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 600,
                        fontFamily: "var(--font-mono)",
                        zIndex: 2
                      }}>
                        {post.duration}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "rgba(239, 68, 68, 0.1)",
                        color: "#EF4444",
                        padding: "3px 8px",
                        borderRadius: "99px",
                        fontSize: "11px",
                        fontWeight: 600
                      }}>
                        <Youtube size={11} /> Video
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--text-faint)" }}>{post.date}</span>
                    </div>

                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", marginBottom: "8px", lineHeight: 1.4 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "16px", flex: 1 }}>
                      {post.description}
                    </p>

                    {/* Stats and Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                      {post.tags.map((t: string) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "14px",
                      fontSize: "12px",
                      color: "var(--text-muted)"
                    }}>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Eye size={12} /> {post.views}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Heart size={12} /> {post.likes}</span>
                      </div>
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "4px 8px", gap: "4px" }}>
                        Watch <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.article>
                );
              }

              if (post.platform === "linkedin") {
                return (
                  <motion.article
                    key={post.id}
                    layout
                    {...filterFade}
                    className="card"
                    style={{ padding: "16px", display: "flex", flexDirection: "column", height: "100%" }}
                  >
                    {/* LinkedIn Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "12px",
                          color: "var(--accent)"
                        }}>
                          MC
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)" }}>T MANAS CHAKRAVARTY .</p>
                          <p style={{ fontSize: "10px", color: "var(--text-faint)" }}>Full Stack Developer | Blockchain • {post.date}</p>
                        </div>
                      </div>
                      <Linkedin size={16} style={{ color: "#0A66C2" }} />
                    </div>

                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", marginBottom: "8px", lineHeight: 1.4 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "16px", flex: 1, whiteSpace: "pre-line" }}>
                      {post.description}
                    </p>

                    {/* Post Attachment */}
                    {post.attachment && (
                      <div style={{ marginBottom: "16px", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)" }}>
                        {post.attachment.type === "image" && (
                          <img
                            src={post.attachment.src}
                            alt="LinkedIn post attachment"
                            style={{ width: "100%", height: "auto", display: "block" }}
                          />
                        )}
                        {post.attachment.type === "link" && (
                          <a
                            href={post.attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "flex", background: "rgba(255,255,255,0.02)", textDecoration: "none" }}
                          >
                            {post.attachment.src && (
                              <img
                                src={post.attachment.src}
                                alt="Link attachment thumbnail"
                                style={{ width: "80px", height: "80px", objectFit: "cover", flexShrink: 0, borderRight: "1px solid var(--border)" }}
                              />
                            )}
                            <div style={{ padding: "10px 12px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                              <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--text)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", marginBottom: "2px" }}>
                                {post.attachment.title}
                              </p>
                              <p style={{ fontSize: "10px", color: "var(--text-faint)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                {post.attachment.subtitle}
                              </p>
                            </div>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                      {post.tags.map((t: string) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>

                    {/* Stats & Link */}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "14px",
                      fontSize: "12px",
                      color: "var(--text-muted)"
                    }}>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Heart size={12} /> {post.likes}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MessageSquare size={12} /> {post.comments}</span>
                      </div>
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "4px 8px", gap: "4px" }}>
                        Read <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.article>
                );
              }

              if (post.platform === "twitter") {
                return (
                  <motion.article
                    key={post.id}
                    layout
                    {...filterFade}
                    className="card"
                    style={{ padding: "16px", display: "flex", flexDirection: "column", height: "100%" }}
                  >
                    {/* Twitter Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "12px",
                          color: "var(--accent)"
                        }}>
                          MC
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)" }}>Manas Chakravarty</p>
                          <p style={{ fontSize: "10px", color: "var(--text-faint)" }}>@tmanas06 • {post.date}</p>
                        </div>
                      </div>
                      <Twitter size={16} style={{ color: "#1DA1F2" }} />
                    </div>

                    <p style={{ fontSize: "13px", color: "var(--text)", lineHeight: 1.6, marginBottom: "16px", flex: 1, whiteSpace: "pre-line" }}>
                      {post.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                      {post.tags.map((t: string) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>

                    {/* Stats & Link */}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "14px",
                      fontSize: "12px",
                      color: "var(--text-muted)"
                    }}>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Heart size={12} /> {post.likes}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><RefreshCw size={12} /> {post.reposts}</span>
                      </div>
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "4px 8px", gap: "4px" }}>
                        View <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.article>
                );
              }

              return null;
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
