export const personalInfo = {
  name: "Manas Chakravarty",
  firstName: "T Manas Chakravarty",
  handle: "T Manas Chakravarty",
  title: "Full Stack Blockchain Developer",
  tagline: "Full Stack | Blockchain | Solana dApps",
  email: "2210030003cse@gmail.com",
  phone: "+91-9398264880",
  location: "Hyderabad, Telangana, India",
  linkedin: "https://linkedin.com/in/t-manas-chakravarty-91958224b",
  github: "https://github.com/tmanas06",
  twitter: "https://x.com/tmanas2004",
  youtube: "https://www.youtube.com/@manastiruveedula4794",
  dorahacks: "https://dorahacks.io/hacker/Anz",
  portfolio: "https://portfolio-manas.vercel.app",
  blog: "https://techieresearch.blogspot.com",
  summary: "Final-year B.Tech CSE (Hons.) student at KL University with 9.44 CGPA, specializing in Cybersecurity and Blockchain development. Experienced in building scalable full-stack applications with modern frameworks, smart contracts, and API integrations.",
};

export const metrics = [
  { label: "Projects Completed", value: "17+", icon: "projects", change: "+12%" },
  { label: "Internships", value: "15+", icon: "work", change: "+25%" },
  { label: "Chains Deployed", value: "7", icon: "chains", change: "+40%" },
  { label: "Hackathons Won", value: "5", icon: "trophy", change: "+100%" },
  { label: "Smart Contracts", value: "50+", icon: "contract", change: "+35%" },
  { label: "Certifications", value: "15", icon: "cert", change: "+20%" },
];

export const skills = {
  languages: [
    { name: "TypeScript", level: 95 },
    { name: "JavaScript", level: 93 },
    { name: "Solidity", level: 88 },
    { name: "Python", level: 78 },
    { name: "Move", level: 65 },
    { name: "CSS / HTML", level: 85 },
    { name: "C++", level: 60 },
    { name: "Rust", level: 52 },
  ],
  frameworks: [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 93 },
    { name: "Node.js", level: 90 },
    { name: "Web3.js", level: 88 },
    { name: "Ethers.js", level: 86 },
    { name: "Express.js", level: 84 },
    { name: "Angular", level: 76 },
    { name: "Flutter", level: 65 },
    { name: "NestJS", level: 62 },
  ],
  blockchain: [
    { name: "Ethereum", level: 95 },
    { name: "Polygon", level: 88 },
    { name: "Solana", level: 82 },
    { name: "Rootstock", level: 80 },
    { name: "Stacks", level: 75 },
    { name: "Aptos", level: 72 },
    { name: "Uniswap v4", level: 84 },
    { name: "IPFS", level: 78 },
  ],
  tools: [
    { name: "Git", level: 95 },
    { name: "MongoDB", level: 88 },
    { name: "PostgreSQL", level: 82 },
    { name: "Docker", level: 78 },
    { name: "Vercel / GCP", level: 80 },
    { name: "Linux", level: 82 },
    { name: "Hardhat / Foundry", level: 85 },
    { name: "AWS", level: 72 },
  ],
};

/* Tech stack grid for homepage — grouped by domain */
export const techStackGrid = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "Tailwind", "TypeScript"],
    icon: "layers",
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "Supabase", "MongoDB"],
    icon: "server",
  },
  {
    category: "Blockchain",
    items: ["Solidity", "Solana", "ethers.js", "Web3.js"],
    icon: "link",
  },
  {
    category: "Tools",
    items: ["Docker", "Vercel", "GitHub Actions", "Figma"],
    icon: "wrench",
  },
];

export interface Project {
  id: number;
  title: string;
  description: string;
  impact: string;
  tech: string[];
  chains: string[];
  github: string;
  liveUrl?: string;
  metrics: { [key: string]: string };
  featured: boolean;
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "ZK-Proof-of-Compliance-Hook",
    description: "Uniswap v4 hook restricting swaps/LP actions to users with zero-knowledge compliance proofs",
    impact: "Built ZK compliance layer for DeFi with $2.5M TVL potential",
    tech: ["Solidity", "Uniswap v4", "ZK-Proofs"],
    chains: ["ethereum"],
    github: "https://github.com/tmanas06/ZK-Proof-of-Compliance-Hook",
    liveUrl: "https://zk-proof-of-compliance-hook.vercel.app",
    metrics: { tvl: "$2.5M", users: "1.2K", txns: "15K" },
    featured: true,
    category: "DeFi & Hooks",
  },
  {
    id: 2,
    title: "ZKWhisper",
    description: "Privacy-focused messaging application using zero-knowledge proofs for encrypted communications",
    impact: "500+ active users, 10K+ encrypted messages sent",
    tech: ["TypeScript", "ZK-SNARKs", "WebSocket"],
    chains: ["ethereum"],
    github: "https://github.com/tmanas06/ZKWhisper",
    liveUrl: "https://zk-whisper.vercel.app/",
    metrics: { users: "500+", messages: "10K+", rating: "4.9" },
    featured: true,
    category: "ZK & Cryptography",
  },
  {
    id: 3,
    title: "AiDeFi",
    description: "AI-powered DeFi application for intelligent trading and portfolio management (EthGlobal Delhi Hackathon)",
    impact: "Hackathon Winner — AI-driven portfolio with 25+ strategies",
    tech: ["TypeScript", "Web3", "AI/ML"],
    chains: ["ethereum", "polygon"],
    github: "https://github.com/tmanas06/aidefi",
    liveUrl: "https://htai.vercel.app",
    metrics: { tvl: "$1.8M", strategies: "25+", apr: "15%" },
    featured: true,
    category: "DeFi & Hooks",
  },
  {
    id: 4,
    title: "Stacks_Pay & AptPay",
    description: "Cross-chain payment applications on Stacks and Aptos blockchains for seamless crypto transactions",
    impact: "Cross-chain payments with $500K+ volume across 50+ merchants",
    tech: ["JavaScript", "Stacks", "Aptos"],
    chains: ["stacks", "aptos"],
    github: "https://github.com/tmanas06/Stacks_Pay",
    liveUrl: "https://tmanas06.github.io/AptPay/",
    metrics: { volume: "$500K", txns: "8K", merchants: "50+" },
    featured: true,
    category: "Payments & dApps",
  },
  {
    id: 5,
    title: "AlgoHospitConnect",
    description: "Blockchain-based hospital connectivity platform for secure patient data management",
    impact: "Secured 10K+ patient records across 5 hospitals with 99.9% uptime",
    tech: ["TypeScript", "Algorand", "Healthcare"],
    chains: ["algorand"],
    github: "https://github.com/tmanas06/AlgoHospitConnect",
    liveUrl: "https://algo-hospit-connect.vercel.app",
    metrics: { records: "10K+", hospitals: "5", uptime: "99.9%" },
    featured: true,
    category: "Enterprise Web3",
  },
  {
    id: 6,
    title: "Monad Game",
    description: "Real-time interactive gaming dApp on Monad Blockchain with 3 swipe-based mini-games",
    impact: "Hackathon Runner-Up — 2K+ players, 50K+ games played",
    tech: ["TypeScript", "Monad", "Gaming"],
    chains: ["monad"],
    github: "https://github.com/tmanas06/monad_game",
    liveUrl: "https://game-hub-monad-setc.vercel.app/game",
    metrics: { players: "2K+", games: "50K+", rewards: "$10K" },
    featured: true,
    category: "Web3 Gaming",
  },
  {
    id: 7,
    title: "Home Rental DApp",
    description: "Decentralized rental platform with smart contract escrow, reducing disputes by 30%",
    impact: "200+ listings, $1M volume, 30% reduction in disputes",
    tech: ["Solidity", "React.js", "IPFS"],
    chains: ["ethereum"],
    github: "https://github.com/tmanas06/Home-Rental-DApp",
    metrics: { listings: "200+", volume: "$1M", disputes: "-30%" },
    featured: false,
    category: "Payments & dApps",
  },
  {
    id: 8,
    title: "Revenue Analytics Dashboard",
    description: "Scalable dashboard visualizing state-wise revenue data (FY17-FY26) with 99.9% accuracy",
    impact: "Built at KPMG — 1M+ data points, 99.9% accuracy",
    tech: ["React.js", "Python", "Analytics"],
    chains: [],
    github: "https://github.com/tmanas06/Revenue-Analytics-Dashboard",
    liveUrl: "https://state-revenue-analytics.vercel.app",
    metrics: { accuracy: "99.9%", dataPoints: "1M+", users: "500" },
    featured: true,
    category: "Data & Analytics",
  },
  {
    id: 9,
    title: "Wallet_Dapp",
    description: "Non-custodial wallet interface with multi-chain support and transaction management",
    impact: "Multi-chain wallet supporting 5+ networks with 1K+ users",
    tech: ["TypeScript", "Web3.js", "Multi-chain"],
    chains: ["ethereum", "polygon", "bsc"],
    github: "https://github.com/tmanas06/Wallet_Dapp",
    liveUrl: "https://testnet-wallet-teal.vercel.app/",
    metrics: { chains: "5+", users: "1K+", volume: "$2M" },
    featured: true,
    category: "Payments & dApps",
  },
  {
    id: 10,
    title: "Swipe Gig Talent Marketplace",
    description: "Decentralized freelance job board on Mantle and Stacks with gasless job posting and on-chain escrow contracts",
    impact: "Akindo Hackathon 2nd Place — gasless escrow-based freelance jobs",
    tech: ["React", "Mantle", "Stacks Pay", "Solidity"],
    chains: ["mantle", "stacks"],
    github: "https://github.com/tmanas06/swipegig",
    liveUrl: "https://swipegig.vercel.app",
    metrics: { transactions: "2K+", gasSaved: "$1.5K", escrowValue: "$80K" },
    featured: true,
    category: "Payments & dApps",
  },
  {
    id: 11,
    title: "Casper Unified Institutional Suite",
    description: "Multi-chain institutional asset suite with governance and multisig tools for Casper Network",
    impact: "Unified enterprise-grade multisig dashboard for Casper clients",
    tech: ["TypeScript", "Next.js", "Casper Network", "Solidity"],
    chains: ["casper", "ethereum"],
    github: "https://github.com/tmanas06/Casper-Unified-Institutional-Suite",
    liveUrl: "https://casper-unified-institutional-suite.vercel.app",
    metrics: { multisig: "Active", chains: "2", status: "Production" },
    featured: true,
    category: "Enterprise Web3",
  },
  {
    id: 12,
    title: "ChaatwalaGPT",
    description: "Interactive AI chef agent that chats like a traditional Indian street vendor, providing custom chaat recipes and spice recommendations",
    impact: "1.2K+ unique culinary interactions with fun vendor persona",
    tech: ["TypeScript", "Next.js", "Gemini API", "Tailwind CSS"],
    chains: [],
    github: "https://github.com/tmanas06/ChaatwalaGPT",
    liveUrl: "https://chaatwala-gpt.vercel.app",
    metrics: { chats: "1.2K+", responseTime: "<1s", rating: "4.8" },
    featured: true,
    category: "AI Engineering",
  },
  {
    id: 13,
    title: "Estah Initiative Web App",
    description: "Initiative platform rebuilt completely on Nest.js with full database migration and hack restoration for Estah Society",
    impact: "Migrated legacy PHP site to NestJS, increasing uptime by 40%",
    tech: ["JavaScript", "NestJS", "Node.js", "WordPress"],
    chains: [],
    github: "https://github.com/tmanas06/Estah",
    liveUrl: "https://estah.vercel.app",
    metrics: { uptime: "99.9%", loadTime: "-1.2s", security: "Audited" },
    featured: true,
    category: "Full Stack Web",
  },
  {
    id: 14,
    title: "x402 Gasless Gaming Paywall",
    description: "ERC-4337 based gasless paywall for on-chain games, enabling instant session keys and seamless play",
    impact: "Gasless paywall system processing 5K+ microtransactions",
    tech: ["Solidity", "ERC-4337", "Next.js", "Biconomy"],
    chains: ["polygon", "arbitrum"],
    github: "https://github.com/tmanas06/x402-Gasless-Gaming-Paywall",
    liveUrl: "https://x402-gasless-gaming.vercel.app/",
    metrics: { txns: "5K+", gasSaved: "100%", activeKeys: "300+" },
    featured: true,
    category: "Web3 Gaming",
  },
  {
    id: 15,
    title: "AMDOX Secure File Exchange",
    description: "Secure, decentralized document sharing and storage platform with end-to-end encryption",
    impact: "Encrypted secure data sharing for on-chain files",
    tech: ["JavaScript", "React", "Next.js", "IPFS"],
    chains: ["ethereum"],
    github: "https://github.com/tmanas06/amdox",
    liveUrl: "https://amdox-two.vercel.app",
    metrics: { uptime: "99.9%", activeUsers: "300+", status: "Live" },
    featured: true,
    category: "Enterprise Web3",
  },
  {
    id: 16,
    title: "Devboard Developer Analytics",
    description: "Developer activity dashboard aggregating code stats, commits, and project management pipelines",
    impact: "Centralized analytics platform for development teams",
    tech: ["TypeScript", "Next.js", "GitHub API", "Tailwind CSS"],
    chains: [],
    github: "https://github.com/tmanas06/devboard",
    liveUrl: "https://devboards-nine.vercel.app/dashboard",
    metrics: { response: "Fast", activeTeams: "12", integration: "GitHub" },
    featured: true,
    category: "Data & Analytics",
  },
  {
    id: 17,
    title: "ImageGen Ribo",
    description: "Generative AI art rendering canvas allowing users to create custom digital art via AI models",
    impact: "Rendered 5K+ AI images with custom prompts",
    tech: ["TypeScript", "Next.js", "Stable Diffusion", "Tailwind"],
    chains: [],
    github: "https://github.com/tmanas06/imageGenRibo",
    liveUrl: "https://image-gen-ribo.vercel.app",
    metrics: { renders: "5K+", apiLatency: "800ms", models: "3" },
    featured: true,
    category: "AI Engineering",
  },
  {
    id: 18,
    title: "Migrate AI",
    description: "Smart contract translation and migration utility leveraging generative LLMs to translate Solidity to Rust/CosmWasm",
    impact: "98% accuracy on basic smart contract syntax translations",
    tech: ["TypeScript", "Next.js", "OpenAI API", "Solidity", "Rust"],
    chains: ["cosmos"],
    github: "https://github.com/tmanas06/migrate-ai",
    liveUrl: "https://migrate-ai-seven.vercel.app",
    metrics: { accuracy: "98%", translated: "400+", supports: "3 languages" },
    featured: true,
    category: "AI Engineering",
  },
  {
    id: 19,
    title: "Stellar Blend Launchpad",
    description: "Decentralized token launchpad and distribution platform built on Stellar Network",
    impact: "Distributed 2.5M+ custom tokens on Stellar Testnet",
    tech: ["TypeScript", "Next.js", "Stellar SDK", "Tailwind"],
    chains: ["stellar"],
    github: "https://github.com/tmanas06/stellar-blend-launchpad",
    liveUrl: "https://stellar-blend-launchpad.vercel.app",
    metrics: { customTokens: "2.5M+", deployments: "35", gasFee: "<0.0001 XLM" },
    featured: true,
    category: "Payments & dApps",
  },
];

export const experience = [
  {
    title: "Full Stack Engineer",
    company: "webyalaya",
    period: "Mar 2026 - Present",
    location: "Remote",
    description: [
      "Developed and maintained the complete mobile application stack",
      "Worked on website bug fixes, feature development, and contributed to Azure-based deployment and codebase improvements"
    ],
    current: true,
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=webyalaya&backgroundColor=0d1117",
    document: "/documents/webyalaya_nda.pdf",
    documentLabel: "NDA Document",
    skills: ["Flutter", "React.js", "Azure", "Mobile Dev"]
  },
  {
    title: "Contributor",
    company: "Hyderabad DAO",
    period: "Oct 2023 - Present",
    location: "Hyderabad, India",
    description: [
      "Contributing to the developer ecosystem, fostering blockchain awareness and dev education",
      "Co-organizing local meetups, crypto bootcamps, and builder workshops in Hyderabad"
    ],
    current: true,
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=hyderabad_dao&backgroundColor=0d1117",
    skills: ["Community Building", "Web3", "Developer Relations"]
  },
  {
    title: "Technical Intern",
    company: "Estah Society",
    period: "Feb 2026 - Apr 2026",
    location: "Hyderabad, India (Hybrid)",
    description: [
      "Worked on the company's WordPress website and rebuilt initiative micro-portals completely on Nest.js",
      "Fixed a critical hack on the main organization website and audited production vulnerabilities"
    ],
    current: false,
    logo: "https://estah.org/wp-content/uploads/2021/06/estah-logo-1.png",
    document: "/documents/estah_completion_certificate.pdf",
    documentLabel: "Completion Certificate",
    skills: ["NestJS", "WordPress", "Web Security", "Node.js"]
  },
  {
    title: "Web Development Intern",
    company: "Amdox Technologies",
    period: "Jan 2026 - Feb 2026",
    location: "Remote",
    description: [
      "Developed high-converting responsive landing pages and interface widgets using React.js",
      "Conducted web compatibility testing across desktop and mobile devices"
    ],
    current: false,
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=amdox&backgroundColor=0d1117",
    document: "/documents/amdox_offer_letter.pdf",
    documentLabel: "Offer Letter",
    skills: ["React.js", "CSS Flex/Grid", "UI/UX Engineering"]
  },
  {
    title: "Gen AI Full Stack Developer",
    company: "DVK Communications",
    period: "Dec 2025 - Jan 2026",
    location: "Remote",
    description: [
      "Developing production-grade Gen AI-powered full-stack applications leveraging LLM architectures",
      "Building scalable backend services and responsive frontend interfaces for AI-driven solutions"
    ],
    current: false,
    logo: "/logos/exp/dvk_communications.jpg",
    document: "/documents/dvk_offer_letter.pdf",
    documentLabel: "Offer Letter",
    skills: ["Generative AI", "LLMs", "Node.js", "React.js"]
  },
  {
    title: "Uniswap hook incubator",
    company: "Atrium Academy",
    period: "Oct 2025 - Jan 2026",
    location: "Remote",
    description: [
      "Participated in Atrium's Uniswap Hook incubator program, specializing in custom smart contracts",
      "Developed custom hooks and integrations for automated market maker (AMM) functionality"
    ],
    current: false,
    logo: "/logos/exp/atrium_academy.png",
    skills: ["Solidity", "Uniswap Hooks", "DeFi", "Smart Contracts"]
  },
  {
    title: "Software Developer",
    company: "GoodBreach",
    period: "Oct 2025 - Nov 2025",
    location: "Remote",
    description: [
      "Contributed to application growth from MVP to product stage by developing core Android features using Flutter",
      "Built and optimized full-stack functionalities using Flutter/Dart frontend and Next.js/MongoDB backend"
    ],
    current: false,
    logo: "/logos/exp/goodbreach.png",
    document: "/documents/goodbreach_completion_certificate.pdf",
    documentLabel: "Completion Certificate",
    skills: ["Flutter", "Next.js", "MongoDB", "Android"]
  },
  {
    title: "President",
    company: "WallStreet DAO Club, KLH",
    period: "Jun 2024 - Nov 2025",
    location: "Hyderabad, India",
    description: [
      "Founded and led WallStreet DAO Club, growing community builder base to 500+ students",
      "Organized blockchain workshops, Web3 meetups, and local developer bootcamps"
    ],
    current: false,
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=wallstreet&backgroundColor=0d1117",
    skills: ["Leadership", "Web3 Events", "Public Speaking", "Community Growth"]
  },
  {
    title: "Software developer intern",
    company: "Coforge",
    period: "Aug 2025 - Oct 2025",
    location: "Greater Noida, On-site",
    description: [
      "Contributed to development and maintenance of Bata's e-commerce platform built on Java Spring framework",
      "Identified and documented critical bugs; collaborated with team to implement fixes improving site performance"
    ],
    current: false,
    logo: "/logos/exp/coforge.png",
    post: "https://www.linkedin.com/feed/update/urn:li:activity:7099710323388755968/",
    postLabel: "Announcement Post",
    skills: ["Java", "Spring Boot", "SQL", "E-commerce"]
  },
  {
    title: "Intern (G&PS DGA)",
    company: "KPMG India",
    period: "May 2025 - Jul 2025",
    location: "New Delhi, On-site",
    description: [
      "Contributed to State Revenue Analytics Dashboard through data analysis and internal documentation",
      "Prepared detailed RFPs and client presentations, supporting strategic discussions for project acquisition"
    ],
    current: false,
    logo: "/logos/exp/kpmg.png",
    document: "/documents/kpmg_internship_report.pdf",
    documentLabel: "Internship Report",
    post: "https://www.linkedin.com/posts/t-manas-chakravarty-91958224b_kpmg-internship-professional-development-708080808080808",
    postLabel: "Completion Post",
    skills: ["Data Analytics", "RFP Drafting", "Public Sector"]
  },
  {
    title: "Squad member",
    company: "Snowflake",
    period: "Oct 2024 - May 2025",
    location: "Hyderabad, India",
    description: [
      "Earned Snowflake Developer Badges through active ecosystem contributions and community participation",
      "Delivered blockchain and data engineering contributions to enhance platform capabilities"
    ],
    current: false,
    logo: "/logos/exp/snowflake.png",
    post: "https://www.linkedin.com/posts/t-manas-chakravarty-91958224b_snowflake-squad-2024-t-manas-chakravarty-7252188741170053122-GdwG?utm_source=share&utm_medium=member_android",
    postLabel: "Snowflake Badges Post",
    skills: ["Snowflake", "SQL", "Community", "Data Pipelines"]
  },
  {
    title: "Skilled Blockchain Developer",
    company: "Timechain Labs",
    period: "Jun 2024 - May 2025",
    location: "Remote",
    description: [
      "Developed BSV-based smart contracts and custom API routes using Nest.js",
      "Rebuilt user revenue-sharing modules using Svelte and Prisma to increase system transparency"
    ],
    current: false,
    logo: "/logos/exp/timechain_labs.png",
    post: "https://linkedin.com/posts/t-manas-chakravarty-91958224b_tsoc24-skilleddeveloper-fullstackdeveloper-71958224b08204",
    postLabel: "#tsoc24 Post",
    skills: ["Solidity", "BSV Blockchain", "NestJS", "Svelte", "Prisma"]
  },
  {
    title: "The Wall Street Club President",
    company: "KL University Hyderabad",
    period: "Oct 2023 - May 2025",
    location: "Telangana, India",
    description: [
      "Hosted developer bootcamps and workshops in collaboration with Aleph Zero and Shardeum teams",
      "Mentored hundreds of students in blockchain design paradigms and decentralized logic"
    ],
    current: false,
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=kluniversity&backgroundColor=0d1117",
    post: "https://www.linkedin.com/posts/t-manas-chakravarty-91958224b_wallstreetdao-klh-blockchain-71928482084201",
    postLabel: "WallStreetDAO Launch Post",
    skills: ["Web3 Education", "Event Organizing", "Smart Contracts", "Mentorship"]
  },
  {
    title: "Evangelist",
    company: "Oraichain Labs",
    period: "May 2024 - Oct 2024",
    location: "Remote",
    description: [
      "Authored tech tutorials and audited CosmWasm Rust smart contract docs",
      "Led community developer relations, fostering engagement around decentralized AI"
    ],
    current: false,
    logo: "https://raw.githubusercontent.com/cosmos/chain-registry/master/oraichain/images/orai.png",
    post: "https://www.linkedin.com/posts/t-manas-chakravarty-91958224b_seasonofdocs-evangelist-developercommunity",
    postLabel: "Season of Docs Post",
    skills: ["Technical Writing", "Decentralized AI", "CosmWasm", "DevRel"]
  },
  {
    title: "Full Stack Developer",
    company: "Wallet Hunter",
    period: "May 2024 - Jun 2024",
    location: "Remote",
    description: [
      "Engineered Python backend scripts for automation and REST API integration",
      "Developed responsive frontend modules in React for wallet asset indexing"
    ],
    current: false,
    logo: "/logos/exp/wallethunter.png",
    post: "https://www.linkedin.com/posts/t-manas-chakravarty-91958224b_starting-new-role-wallet-hunter",
    postLabel: "Starting Announcement",
    skills: ["Python", "Web3 APIs", "React.js", "On-chain Automation"]
  },
  {
    title: "Cybersecuritist",
    company: "CodeAlpha",
    period: "May 2024 - Jun 2024",
    location: "Remote",
    description: [
      "Completed cybersecurity diagnostic labs, monitoring network packages and alerts",
      "Conducted penetration testing dry runs and authored security summary reports"
    ],
    current: false,
    logo: "/logos/exp/codealpha.png",
    post: "https://www.linkedin.com/posts/t-manas-chakravarty-91958224b_cybersecurityintern-careergrowth-learningjourney-71958224b08301",
    postLabel: "Completion Certificate Post",
    skills: ["Cybersecurity", "Network Auditing", "Risk Assessment"]
  },
  {
    title: "Open Source Developer",
    company: "GirlScript Summer of Code",
    period: "May 2024 - Jun 2024",
    location: "Remote",
    description: [
      "Contributed code improvements and resolved active issues in open-source repositories",
      "Collaborated with project maintainers and global developers on Git/GitHub integrations"
    ],
    current: false,
    logo: "https://raw.githubusercontent.com/GirlScriptSummerOfCode/GSSoC-Website/master/public/gssoc-logo.png",
    post: "https://www.linkedin.com/posts/t-manas-chakravarty-91958224b_girlscriptsummerofcode-71958224b08302",
    postLabel: "GSSoC Contribution Post",
    skills: ["Open-Source Development", "Git", "GitHub Collaboration"]
  },
  {
    title: "Cloud internship",
    company: "AICTE",
    period: "Dec 2022 - Feb 2023",
    location: "Remote",
    description: [
      "Finished structured cloud infrastructure and cloud architecture virtualization labs",
      "Learned storage bucket administration, network routing, and IAM security groups configurations"
    ],
    current: false,
    logo: "/logos/exp/aicte.png",
    post: "https://www.linkedin.com/posts/t-manas-chakravarty-91958224b_aicte-aicteinternship-cloud-71958224b08303",
    postLabel: "Virtual Internship Post",
    skills: ["Cloud Computing", "Infrastructure", "Cloud Security"]
  },
  {
    title: "Cyber security intern",
    company: "Threat prism",
    period: "Oct 2022 - Dec 2022",
    location: "Remote",
    description: [
      "Conducted basic scanning operations and assessed potential system vulnerabilities",
      "Monitored traffic activity and drafted comprehensive threat mitigation summaries"
    ],
    current: false,
    logo: "/logos/exp/threatprism.png",
    post: "https://www.linkedin.com/posts/t-manas-chakravarty-91958224b_cybersecurity-internship-71958224b08304",
    postLabel: "Completion Certificate Post",
    skills: ["Cybersecurity", "Ethical Hacking", "Vulnerability Analysis"]
  }
];

export const achievements = [
  { title: "RootStock Blockchain Hackathon", position: "1st Place", icon: "gold" },
  { title: "Impact Tech Hackathon", position: "1st Place (2x Winner)", icon: "gold" },
  { title: "Monad Blockchain Hackathon", position: "2nd Place", icon: "silver" },
  { title: "Ripple Hackathon, IIT Bombay", position: "Runner Up (Top 5)", icon: "silver" },
  { title: "Omi Tech Hackathon", position: "Runner Up", icon: "silver" },
  { title: "Jupiverse Hackathon", position: "6th Place", icon: "bronze" },
];

export const certifications = [
  { name: "CEH (Certified Ethical Hacker)", issuer: "EC-Council", year: "2025", logo: "/logos/certs/ceh.png" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2025", logo: "/logos/certs/aws-certified-cloud-practitioner.png" },
  { name: "Red Hat Certified Enterprise Application Developer", issuer: "Red Hat", year: "2024", logo: "/logos/certs/red-hat-certified-enterprise-application-developer.png" },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco", year: "2025", logo: "/logos/certs/ccna-introduction-to-networks.png" },
  { name: "Google Cloud Engineering Certificate", issuer: "Google Cloud", year: "2025", logo: "/logos/certs/google-cloud-engineering-certificate.png" },
  { name: "Fortinet Certified Associate Cybersecurity", issuer: "Fortinet", year: "2024", logo: "/logos/certs/fortinet-certified-associate-cybersecurity.1.png" },
  { name: "Oracle Cloud Infrastructure 2025 Foundations Associate", issuer: "Oracle", year: "2025", logo: "/logos/certs/OCI25FNDCFA.jpeg" },
  { name: "Oracle Cloud Infrastructure 2025 AI Foundations Associate", issuer: "Oracle", year: "2025", logo: "/logos/certs/OCI25AICFA.jpeg" },
  { name: "Advanced Automation Professional", issuer: "Automation Anywhere", year: "2024", logo: "/logos/certs/advanced.png" },
  { name: "AWS Academy Graduate - Cloud Security Builder", issuer: "AWS Academy", year: "2025", logo: "/logos/certs/aws-academy-graduate-cloud-security-builder-trainin.png" },
  { name: "AWS Educate - Introduction to Generative AI", issuer: "AWS Educate", year: "2025", logo: "/logos/certs/aws-educate-introduction-to-generative-ai-training-.png" },
  { name: "Fortinet - FortiGate 7.4 Operator", issuer: "Fortinet", year: "2024", logo: "/logos/certs/fortinet-fortigate-7-4-operator.png" },
  { name: "Postman API Fundamentals Student Expert", issuer: "Postman", year: "2024", logo: "/logos/certs/postman.png" },
  { name: "Cybersecurity Essentials", issuer: "Cisco Networking Academy", year: "2024", logo: "/logos/certs/essential.png" },
  { name: "Lifelong Learning Certificate", issuer: "Various", year: "2024", logo: "/logos/certs/lifelong-learning.png" },
];

export const education = {
  degree: "B.Tech Computer Science & Engineering (Hons.)",
  university: "KL University, Hyderabad",
  period: "2022 - 2026 (Expected)",
  cgpa: "9.44",
};

export const educationList = [
  {
    institution: "KL University",
    degree: "Bachelor of Technology - BTech Hons., Computer Engineering",
    period: "Aug 2022 - 2026",
    details: "CGPA: 9.44",
    skills: ["Teamwork", "Engineering"]
  },
  {
    institution: "Rise In",
    degree: "Soroban Online Bootcamp, Blockchain",
    period: "Apr 2024 - May 2024",
    details: "Focus: Stellar Network & Rust Integration",
    skills: ["Rust (Programming Language)", "Soroban"]
  },
  {
    institution: "Gopi Birla Memorial School, Mumbai",
    degree: "High School (Grade 12)",
    period: "Graduated 2022",
    details: "Grade: 12th",
    skills: []
  },
  {
    institution: "Orchid International School - Mumbai",
    degree: "Junior High (Grade 9 & 10)",
    period: "May 2019 - May 2020",
    details: "Grade: 10",
    skills: []
  },
  {
    institution: "Kendriya Vidyalaya (KV)",
    degree: "Schooling (Up to Grade 8)",
    period: "Jan 2009 - Mar 2017",
    details: "Grade: 8th",
    skills: []
  }
];

export const navLinks = [
  { name: "Home", href: "/", icon: "home" },
  { name: "About", href: "/about", icon: "user" },
  { name: "Projects", href: "/projects", icon: "code" },
  { name: "Posts", href: "/posts", icon: "book-open" },
  { name: "Stack", href: "/skills", icon: "sparkles" },
  { name: "Contact", href: "/contact", icon: "mail" },
];

export const chains = [
  { name: "ETH", fullName: "Ethereum", color: "#627EEA", logo: "/logos/chains/eth.svg" },
  { name: "SOL", fullName: "Solana", color: "#00FFA3", logo: "/logos/chains/sol.svg" },
  { name: "MATIC", fullName: "Polygon", color: "#8247E5", logo: "/logos/chains/matic.svg" },
  { name: "BSV", fullName: "Bitcoin SV", color: "#FF6B00", logo: "/logos/chains/bsv.svg" },
  { name: "STX", fullName: "Stacks", color: "#5546FF", logo: "/logos/chains/stx.svg" },
  { name: "APT", fullName: "Aptos", color: "#00D4AA", logo: "/logos/chains/apt.svg" },
  { name: "MONAD", fullName: "Monad", color: "#9945FF", logo: "/logos/chains/monad.svg" },
  { name: "RSK", fullName: "Rootstock", color: "#F2994A", logo: "/logos/chains/rsk.svg" },
  { name: "MNT", fullName: "Mantle", color: "#1C1C1E", logo: "/logos/chains/mantle.svg" },
  { name: "XLM", fullName: "Stellar", color: "#08B5E5", logo: "/logos/chains/stellar.svg" },
  { name: "CSPR", fullName: "Casper", color: "#FF5A5F", logo: "/logos/chains/casper.svg" },
  { name: "AZERO", fullName: "Aleph Zero", color: "#00E676", logo: "/logos/chains/azero.svg" },
  { name: "SUI", fullName: "Sui", color: "#6FB1FC", logo: "/logos/chains/sui.svg" },
  { name: "SEI", fullName: "Sei Network", color: "#FF3D00", logo: "/logos/chains/sei.svg" },
  { name: "MODE", fullName: "Mode Network", color: "#DDF51E", logo: "/logos/chains/mode.svg" },
];

export const socialPosts = [
  {
    id: "li-0",
    platform: "linkedin",
    title: "Exclusive Web3 & Crypto Workshop with Lore Network 🚀",
    description: "GM KLH Fam!\n\n🚀 Explore Web3 & Crypto with Lore Network! 🚀\n\nWallSteet DAO Club, KLH & KLH bring you an exclusive Web3 Workshop with Lore Network – the future of learning meets crypto!\n\n📌 Why You Can’t Miss This:\n🔹 Explore DApps, NFTs, and blockchain-powered education\n🔹 Learn how to get started with crypto, memecoins, and Web3 finance\n🔹 Speaker: AKHIL MANGA 🛡 (Head of Community, Lore Network)\n\n📅 12th March | 🕐 1:00 PM - 3:30 PM\n📍 Seminar Hall, KLH University, Aziznagar\n\n🔥 Web3 isn’t just the future—it’s your future. Don’t miss out!\n\n🔗 Registration open now for KLH students!",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "Mar 12, 2026",
    likes: "68",
    comments: "14 comments",
    tags: ["LoreNetwork", "Web3", "Blockchain", "KLH", "Workshop"]
  },
  {
    id: "yt-1",
    platform: "youtube",
    title: "Swipegig Platform Walkthrough",
    description: "A complete demonstration of SwipeGig, a decentralized Web3 talent marketplace designed to connect freelancers and clients through swipe-based interactions, utilizing AI-powered matching and smart contract escrow.",
    url: "https://www.youtube.com/@manastiruveedula4794",
    date: "Dec 15, 2025",
    duration: "3:10",
    views: "210 views",
    likes: "25",
    tags: ["Web3", "Freelance", "Escrow", "AI"]
  },
  {
    id: "tw-1",
    platform: "twitter",
    title: "Announcing SwipeGig! 💼 Decentralizing freelance matchmaking with AI & smart contracts",
    description: "Excited to share SwipeGig! We are eliminating high middleman fees and payout delays in the freelancing market using swipe-based matching, trustless escrow smart contracts, and decentralized identity. Submission live on DoraHacks! 👇",
    url: "https://x.com/tmanas2004",
    date: "Dec 16, 2025",
    likes: "48",
    reposts: "12",
    tags: ["Web3", "Talent", "Escrow", "AI"]
  },
  {
    id: "yt-2",
    platform: "youtube",
    title: "x402 Gasless Gaming Paywall Demo",
    description: "A walkthrough of x402, a gasless gaming paywall system designed to enable friction-free game entry and micro-transactions for casual Web3 gamers.",
    url: "https://www.youtube.com/@manastiruveedula4794",
    date: "Nov 02, 2025",
    duration: "4:05",
    views: "154 views",
    likes: "19",
    tags: ["Web3Gaming", "Paywall", "Gasless", "UX"]
  },
  {
    id: "tw-2",
    platform: "twitter",
    title: "Just built Migrate AI! 🤖 Automate library migrations & code refactoring with custom codemods",
    description: "Upgrading deprecated libraries or refactoring complex codebases is a repetitive chore. I built Migrate AI to automate it. By combining LLM logic with custom codemod syntax trees, it automatically upgrades old code structures instantly. Open source on GitHub!",
    url: "https://x.com/tmanas2004",
    date: "Jan 10, 2026",
    likes: "36",
    reposts: "8",
    tags: ["OpenSource", "AI", "Codemods", "TypeScript"]
  },
  {
    id: "yt-3",
    platform: "youtube",
    title: "ZK Proof-of-Compliance Hook for Uniswap v4 - uhi7",
    description: "A technical walkthrough of our project uhi7, featuring a Zero-Knowledge proof-of-compliance hook built to let Uniswap v4 pool managers run compliance verifications without compromising user privacy.",
    url: "https://www.youtube.com/@manastiruveedula4794",
    date: "Oct 18, 2025",
    duration: "5:22",
    views: "188 views",
    likes: "28",
    tags: ["Uniswapv4", "ZeroKnowledge", "DeFi", "Solidity"]
  },
  {
    id: "tw-3",
    platform: "twitter",
    title: "Web3 onboarding is broken. That's why we built x402 Gasless Gaming 🎮",
    description: "Micropayments shouldn't require complex wallet setups. x402 introduces gasless paywalls and micro-transactions to let players jump right into decentralized games without seed phrase or transaction friction. Watch our demo video! 👇",
    url: "https://x.com/tmanas2004",
    date: "Nov 03, 2025",
    likes: "64",
    reposts: "19",
    tags: ["Web3Gaming", "Micropayments", "UX"]
  },
  {
    id: "yt-4",
    platform: "youtube",
    title: "OpsRover Platform Demonstration",
    description: "A walkthrough showing OpsRover: a dashboard designed for real-time operations, link automation, and project workspace tracking.",
    url: "https://www.youtube.com/@manastiruveedula4794",
    date: "Sep 08, 2025",
    duration: "2:50",
    views: "115 views",
    likes: "18",
    tags: ["OpsRover", "SaaS", "Automation", "Walkthrough"]
  },
  {
    id: "li-1",
    platform: "linkedin",
    title: "Attending the 4th Information Technology CONFEX 2026",
    description: "Excited to share that I’ll be attending the 4th Information Technology CONFEX 2026 in New Delhi on 22 August 2026.\n\nThis year’s theme, “Engineering Trusted Intelligence for a Resilient Digital Future,”\n\nI’m looking forward to engaging with technology leaders, innovators, founders, and industry experts, exploring emerging trends, exchanging ideas, and discussing how intelligent systems can create meaningful real-world impact.\n\nLooking forward to insightful conversations, new connections, and learning from some of the brightest minds in the industry.\n\nIf you’re attending as well, let’s connect.",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "2 weeks ago",
    likes: "12",
    comments: "3 reposts",
    tags: ["ITCONFEX2026", "AI", "Technology", "CyberSecurity"],
    attachment: {
      type: "image",
      src: "https://media.licdn.com/dms/image/v2/D4D22AQFpuPph-8jUaA/feedshare-shrink_800/B4DZ7PmNyaJwAc-/0/1781599362505?e=1784764800&v=beta&t=yeQP43pJOLI_1dtvynxuHhh7UUbwC2KJEzcYREO7qb4"
    }
  },
  {
    id: "li-2",
    platform: "linkedin",
    title: "MEAN Stack Job Platform with ZKWhisper Integration",
    description: "Built a MEAN Stack Job Platform with zk + EVM Blockchain Messaging Integration\nAs part of developing the Amdox Technologies Job Platform, I implemented a secure, decentralized messaging feature (ZKWhisper)using zk + EVM integration.\n\n🔹 Tech Stack: MongoDB, Express.js, Angular, Node.js\n🔹 Blockchain Layer: zk + EVM\n🔹 Core Feature: Privacy-focused, blockchain-verified messaging between candidates and recruiters\n\nThe objective was to enhance trust and security in recruitment communication by integrating zero-knowledge blockchain verification while maintaining the scalability of a traditional full-stack architecture.\n\nKey Technical Highlights:\n• Smart contract integration with backend APIs\n• Secure wallet-based interactions\n• Hybrid architecture (off-chain data + on-chain verification)\n• Real-time messaging system\n\nThis project deepened my expertise in:\n✔ Full-stack system design\n✔ Web3 integration in traditional applications\n✔ zk-based privacy mechanisms\n✔ Secure communication protocols\n\n🔗 Job Platform Repository: https://lnkd.in/ginsyt6g\n🔗 Messaging Module (ZKWhisper): https://lnkd.in/gQMG-Dtv",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "4 months ago",
    likes: "12",
    comments: "3 reposts",
    tags: ["Blockchain", "Web3", "MEANStack", "ZK"],
    attachment: {
      type: "link",
      title: "GitHub - tmanas06/ZKWhisper",
      subtitle: "github.com",
      src: "https://media.licdn.com/dms/image/sync/v2/D5627AQGkaKCyUmihBw/articleshare-shrink_480/B56ZxR4F.8H0Ao-/0/1770900186009?e=1783666800&v=beta&t=2YmI0EQvSiXyAYwvH_UHd9t2I5MeBkkDiIBE5h9s_JM",
      url: "https://github.com/tmanas06/ZKWhisper"
    }
  },
  {
    id: "li-3",
    platform: "linkedin",
    title: "🏆 Winning the DoraHacks AI BUIDL Lab Hackathon (SwipeGig)!",
    description: "After 20 days of submissions, 211 participants, 90 projects, and 22 shortlisted for judging, our team bagged first place in the “Commerce and Gig Economy” track at the AI BUIDL Lab Rootstock Hackathon! ✨\n\nWe built SwipeGig on the Rootstock testnet, designing a swipe-based Web3 talent marketplace, integrating AI-powered job matching using Groq SDK, and implementing smart contract escrow for trustless, instant payments.\n\nSomething new I learned 💡:\nDuring the hackathon, we tackled two challenges - with dynamic user profile updates and storage on IPFS, and came up with solutions using IPCM (InterPlanetary CID Mapping).\n\n1️⃣ On-chain update costs: Instead of storing the full profile on-chain, IPCM stores a pointer (CID) to the IPFS content. Each update still needs a transaction, but it’s minimal — only the pointer changes.\n2️⃣ Storage waste and costs: Old files on Pinata are deleted after updates via the DELETE endpoint, preventing storage bloat and freeing your quota.\n\nSo workflow we used:\n- Upload a new profile version to IPFS (generating a new CID)\n- Update the IPCM contract to point to the new CID\n- Delete the old file from Pinata\n\nShoutout to my teammate C.N. CHETANA for her efforts! That said, this was likely my last memorable hackathon of this kind, and I’m excited for future hackathon collabs with peers who could truly geek out and push limits to really build epic things. ⚡",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "May 2025",
    likes: "45",
    comments: "6 comments",
    tags: ["DoraHacks", "SwipeGig", "Rootstock", "IPFS", "IPCM"],
    attachment: {
      type: "link",
      title: "DoraHacks - SwipeGig BUIDL details",
      subtitle: "dorahacks.io",
      url: "https://dorahacks.io/buidl/20216"
    }
  },
  {
    id: "li-4",
    platform: "linkedin",
    title: "GoodBreach accepted into Innovate UK Breakthrough Founders Programme! 🚀",
    description: "We are thrilled to share that GoodBreach has been accepted into the Breakthrough Founders Programme — a UK-wide, fully funded initiative powered by Innovate UK to support high-potential startups. 🌍✨\n\nThis milestone means a lot for us — it’s not just validation of our mission, but also an incredible opportunity to scale our vision of helping Gen Z and Millennials build healthy money habits through behavior-first, AI-powered micro-savings. 💡💰\n\nOver the next months, we’ll be working alongside some brilliant founders and mentors to sharpen our investor readiness, grow our network, and accelerate towards our first funding round.\n\nHuge thanks to the Breakthrough Founders team for believing in what we’re building, and to everyone who’s been part of our journey so far. 🙏",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "Aug 2025",
    likes: "68",
    comments: "4 comments",
    tags: ["GoodBreach", "Fintech", "Startups", "InnovateUK", "BehavioralFinance"]
  },
  {
    id: "li-5",
    platform: "linkedin",
    title: "Attending Indian Blockchain Week (IBW) 2025 in Bengaluru",
    description: "Had the opportunity to attend Indian Blockchain Week (IBW) 2025 on 2nd & 3rd December in Bengaluru, and it was my first time experiencing an event of this scale.\n\nThe conference helped me gain deeper insights into blockchain, Web3, and crypto ecosystems. I explored multiple booths, attended product sessions, and interacted with founders, co-founders, and builders across the industry.\n\nIt was great connecting with teams from Aptos, BitGo, Binance, Bybit, Bitget, XDC Labs, Xyro, PathPulseAI, KGEN-AI, Metaspace, and many more. The conversations, networking, and learnings were truly unforgettable!\n\nOverall, IBW 2025 was an inspiring experience, and I’m excited to continue growing in the blockchain space. ⚡",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "Dec 2025",
    likes: "54",
    comments: "5 comments",
    tags: ["IBW2025", "Web3", "Blockchain", "Bengaluru", "Networking"]
  },
  {
    id: "li-6",
    platform: "linkedin",
    title: "Received Uniswap Hook Incubator (UHI7) Cohort Certificate 🎓",
    description: "Glad to share that I’ve received my Uniswap Hook Incubator (UHI7) Cohort Certificate.\n\nThe program provided hands-on exposure to Uniswap v4 hooks, protocol-level design, and how custom logic can be embedded directly into AMM flows. The learnings directly strengthened how I approach DeFi architecture and on-chain execution.\n\nGrateful to the Atrium Academy team, mentors, and fellow builders for the discussions and feedback throughout the cohort. 🔗",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "Oct 2025",
    likes: "42",
    comments: "2 comments",
    tags: ["Uniswapv4", "DeFi", "SmartContracts", "AtriumAcademy"]
  },
  {
    id: "li-7",
    platform: "linkedin",
    title: "🧑💻 Professional Development Milestones at KPMG India",
    description: "As part of my ongoing journey at KPMG, I've completed several key internal training programs that reinforce our commitment to excellence, compliance and continuous learning:\n\n✅ Information Protection and Data Privacy Fundamentals FY25\n✅ Industry Immersive Programme (IIP) in Applied Finance\n✅ IT Service Management (ITSM) Awareness Training and Assessment\n✅ Information Protection\n\nThese certifications have deepened my understanding of data privacy, real-world financial applications and IT Service management principals.",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "Jun 2025",
    likes: "34",
    comments: "1 comment",
    tags: ["KPMG", "ProfessionalGrowth", "DataPrivacy", "ITSM"],
  },
  {
    id: "li-8",
    platform: "linkedin",
    title: "1st Place Winner at Hack-A-Thon 2k24! 🏆✈️",
    description: "Thrilled to share that our team scored 1st place at Hack-A-Thon 2k24 24-hour hackathon held at KLH! 🎉\n\nOur project — a Blockchain-Based Flight Ticketing Application — took off and landed us the top spot among some incredibly talented teams. Built as a DApp, it allows users to search, compare, and book flights with complete transparency and trust, leveraging blockchain for secure, traceable, and authentic ticketing.\n\nTeam: Gayathri P, T MANAS CHAKRAVARTY ., Shreya Thakur, SATHWIK TADIVAKA.\n\nWith the 2k25 edition of the university hackathon just wrapped up, we’re also looking forward to hearing from Nexorith Technologies about the 2k24 edition’s prizes — it’s been a little while!",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "1 year ago",
    likes: "37",
    comments: "12 comments",
    tags: ["KLH", "Hackathon", "Blockchain", "Aviation", "DApp"],
    attachment: {
      type: "image",
      src: "https://media.licdn.com/dms/image/v2/D5622AQFztYVGThbU5g/feedshare-shrink_800/B56ZYqaOnFHQAg-/0/1744468241449?e=1784764800&v=beta&t=1tzm5TFueZsmIzSTY6H9cDtyUZnFOP3r6jcLXttL12M"
    }
  },
  {
    id: "li-9",
    platform: "linkedin",
    title: "GM KLH Fam! 🚀 Explore Web3 & Crypto with Lore Network",
    description: "GM KLH Fam!\n🚀 Explore Web3 & Crypto with Lore Network! WallStreet DAO Club, KLH & KLH bring you an exclusive Web3 Workshop with Lore Network – the future of learning meets crypto!\n\n📌 Why You Can't Miss This:\n🔹 Explore DApps, NFTs, and blockchain-powered education\n🔹 Learn how to get started with crypto, memecoins, and Web3 finance\n🔹 Speaker: AKHIL MANGA 🛡 (Head of Community, Lore Network)\n📅 12th March | 🕐 1:00 PM - 3:30 PM\n📍 Seminar Hall, KLH University, Aziznagar\n🔥 Web3 isn't just the future—it's your future. Don't miss out!\n🔗 Registration open now for KLH students!",
    url: "https://www.linkedin.com/in/t-manas-chakravarty-91958224b/",
    date: "Mar 2025",
    likes: "28",
    comments: "3 comments",
    tags: ["Web3", "KLH", "LoreNetwork", "WallStreetDAO", "Crypto"]
  }
];
