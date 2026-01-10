"use client";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ReactNode, useEffect } from "react";

// Create modal
const queryClient = new QueryClient();

let initialized = false;

export default function Web3Provider({ children }: { children: ReactNode }) {
  const { getWagmiConfig, projectId } = require("@/lib/web3config");
  const config = getWagmiConfig();

  if (typeof window !== "undefined" && !initialized) {
    createWeb3Modal({
      wagmiConfig: config,
      projectId,
      enableAnalytics: false,
      themeMode: "dark",
      themeVariables: {
        "--w3m-color-mix": "#F0B90B",
        "--w3m-color-mix-strength": 20,
        "--w3m-accent": "#F0B90B",
        "--w3m-border-radius-master": "12px",
      },
    });
    initialized = true;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
