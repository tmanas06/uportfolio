"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  MessageSquare,
  Wallet,
  Settings,
  Star,
  GitFork,
  Trophy,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { personalInfo, notifications } from "@/lib/data";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

export default function CandyBoxHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/projects?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // WalletConnect hooks
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const unreadCount = notifications.length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "star": return <Star className="w-4 h-4 text-[#F0B90B]" />;
      case "fork": return <GitFork className="w-4 h-4 text-[#627EEA]" />;
      case "win": return <Trophy className="w-4 h-4 text-[#00D4AA]" />;
      case "message": return <MessageSquare className="w-4 h-4 text-[#8247E5]" />;
      default: return <AlertCircle className="w-4 h-4 text-[#F6465D]" />;
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A0E17] border-b border-[rgba(240,185,11,0.15)]">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl gradient-gold flex items-center justify-center glow-gold-sm">
            <span className="text-[#0A0E17] font-bold text-2xl">M</span>
          </div>
          <span className="text-[#F0B90B] font-bold text-2xl hidden sm:block">
            {personalInfo.firstName}
          </span>
        </Link>

        {/* Center: Search (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#848E9C]" />
            <input
              type="text"
              placeholder="Search projects, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-12 pr-4 bg-[#131B27] border border-[rgba(240,185,11,0.15)] rounded-xl text-base text-[#F5F6F5] placeholder-[#848E9C] focus:outline-none focus:border-[#F0B90B] transition-colors"
            />
          </div>
        </form>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search (Mobile) */}
          <button className="md:hidden w-11 h-11 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-11 h-11 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F0B90B] transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F6465D] rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-14 w-80 glass p-4 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-base text-[#F5F6F5]">Notifications</h3>
                    <span className="badge badge-gold">{unreadCount} new</span>
                  </div>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#1E2735] hover:bg-[#252D3C] cursor-pointer transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#131B27] flex items-center justify-center flex-shrink-0">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#F5F6F5] truncate">{notif.message}</p>
                          <p className="text-xs text-[#848E9C] mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Connect Wallet Button */}
          {isConnected && address ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => open()}
                className="h-11 px-4 rounded-xl bg-[#1E2735] border border-[rgba(240,185,11,0.3)] flex items-center gap-2 text-[#F0B90B] font-medium hover:bg-[#252D3C] transition-all"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-sm">{formatAddress(address)}</span>
              </button>
              <button
                onClick={() => disconnect()}
                className="h-11 w-11 rounded-xl bg-[#1E2735] flex items-center justify-center text-[#848E9C] hover:text-[#F6465D] hover:bg-[#252D3C] transition-all"
                title="Disconnect"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => open()}
              className="hidden sm:flex h-11 px-5 rounded-xl gradient-gold items-center gap-2 text-[#0A0E17] font-semibold hover:shadow-[0_0_20px_rgba(240,185,11,0.4)] transition-all"
            >
              <Wallet className="w-5 h-5" />
              <span className="text-sm">Connect</span>
            </button>
          )}

          {/* Settings (Desktop) */}
          <button className="hidden lg:flex w-11 h-11 rounded-xl bg-[#1E2735] items-center justify-center text-[#848E9C] hover:text-[#F0B90B] transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* Profile */}
          <Link
            href="/about"
            className="w-11 h-11 rounded-xl gradient-gold flex items-center justify-center glow-gold-sm"
          >
            <span className="text-[#0A0E17] font-bold text-base">M</span>
          </Link>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </header>
  );
}
