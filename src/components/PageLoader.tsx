"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  "CONNECTING_TO_SOLANA_RPC_NODE...",
  "RESOLVING_IPFS_METADATA_GATEWAY...",
  "SECURE_COMMS_LINK_ESTABLISHED",
  "FETCHING_SMART_CONTRACT_SCHEMAS...",
  "COMPILING_WEBGL_PARTICLE_COORDINATES...",
  "INITIALIZING_HUD_INTERFACE...",
  "SYSTEMS_ONLINE // TMANAS.DEV"
];

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Increment progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait 300ms before sliding up
          setTimeout(() => setVisible(false), 300);
          return 100;
        }
        // Random fast increment
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  // Update status message based on progress
  useEffect(() => {
    const lineIndex = Math.min(
      Math.floor((progress / 100) * terminalLines.length),
      terminalLines.length - 1
    );
    setCurrentLine(terminalLines[lineIndex]);
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-full bg-[#030107] z-[100] flex flex-col justify-between p-8 sm:p-16 pointer-events-auto"
        >
          {/* Top Telemetry */}
          <div className="flex justify-between items-start text-white/30 font-mono text-[0.625rem] sm:text-[0.75rem] tracking-[0.2em] uppercase">
            <span>TMANAS // PORTFOLIO_OS_v3.0</span>
            <span className="hidden sm:inline">LOC: 17.3850 N, 78.4867 E</span>
          </div>

          {/* Center Counter */}
          <div className="flex flex-col items-center justify-center my-auto">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[6rem] sm:text-[9rem] md:text-[11rem] font-extrabold tracking-tighter leading-none font-heading select-none relative text-white"
            >
              {progress.toString().padStart(3, "0")}
              <span className="text-[1.5rem] sm:text-[2.5rem] font-mono font-bold text-[var(--accent)] ml-2 uppercase">
                %
              </span>
            </motion.h1>

            {/* Glowing progress line */}
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="flex flex-col gap-2 font-mono text-[0.6875rem] sm:text-[0.8125rem]">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
              <span className="text-white/80 uppercase tracking-widest leading-none font-bold">
                {currentLine}
              </span>
            </div>
            <div className="text-white/30 uppercase tracking-[0.15em]">
              All rights reserved // (c) 2026 t manas chakravarty
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
