import { defaultWagmiConfig } from "@web3modal/wagmi";
import { mainnet, polygon, arbitrum, optimism, bsc } from "wagmi/chains";

// Get project ID from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo";

const metadata = {
  name: "Manas Portfolio",
  description: "Blockchain Developer Portfolio",
  url: "https://portfolio-tmanas.vercel.app/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, polygon, arbitrum, optimism, bsc] as const;

// Initialized only when needed
export const getWagmiConfig = () => defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
});

export { projectId, chains };
