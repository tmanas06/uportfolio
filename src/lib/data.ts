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
    { name: "JavaScript", level: 95 },
    { name: "TypeScript", level: 92 },
    { name: "Solidity", level: 90 },
    { name: "Python", level: 85 },
    { name: "Dart", level: 80 },
    { name: "Java", level: 78 },
    { name: "C", level: 75 },
    { name: "Rust", level: 70 },
  ],
  frameworks: [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 93 },
    { name: "Node.js", level: 90 },
    { name: "Flutter", level: 85 },
    { name: "NestJS", level: 82 },
    { name: "Svelte", level: 80 },
    { name: "Angular.js", level: 75 },
    { name: "Web3.js", level: 92 },
    { name: "Ethers.js", level: 90 },
  ],
  blockchain: [
    { name: "Ethereum", level: 95 },
    { name: "Solana", level: 85 },
    { name: "Polygon", level: 90 },
    { name: "BSV", level: 82 },
    { name: "Monad", level: 80 },
    { name: "Stacks", level: 78 },
    { name: "Aptos", level: 75 },
    { name: "Algorand", level: 77 },
  ],
  tools: [
    { name: "MongoDB", level: 88 },
    { name: "PostgreSQL", level: 85 },
    { name: "Git", level: 95 },
    { name: "Docker", level: 82 },
    { name: "Linux", level: 85 },
    { name: "Google Cloud", level: 80 },
    { name: "AWS", level: 78 },
    { name: "IPFS", level: 85 },
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
    metrics: { tvl: "$2.5M", users: "1.2K", txns: "15K" },
    featured: true,
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
  },
  {
    id: 3,
    title: "AiDeFi",
    description: "AI-powered DeFi application for intelligent trading and portfolio management (EthGlobal Delhi Hackathon)",
    impact: "Hackathon Winner — AI-driven portfolio with 25+ strategies",
    tech: ["TypeScript", "Web3", "AI/ML"],
    chains: ["ethereum", "polygon"],
    github: "https://github.com/tmanas06/aidefi",
    metrics: { tvl: "$1.8M", strategies: "25+", apr: "15%" },
    featured: true,
  },
  {
    id: 4,
    title: "Stacks_Pay & AptPay",
    description: "Cross-chain payment applications on Stacks and Aptos blockchains for seamless crypto transactions",
    impact: "Cross-chain payments with $500K+ volume across 50+ merchants",
    tech: ["JavaScript", "Stacks", "Aptos"],
    chains: ["stacks", "aptos"],
    github: "https://github.com/tmanas06/Stacks_Pay",
    metrics: { volume: "$500K", txns: "8K", merchants: "50+" },
    featured: false,
  },
  {
    id: 5,
    title: "AlgoHospitConnect",
    description: "Blockchain-based hospital connectivity platform for secure patient data management",
    impact: "Secured 10K+ patient records across 5 hospitals with 99.9% uptime",
    tech: ["TypeScript", "Algorand", "Healthcare"],
    chains: ["algorand"],
    github: "https://github.com/tmanas06/AlgoHospitConnect",
    metrics: { records: "10K+", hospitals: "5", uptime: "99.9%" },
    featured: true,
  },
  {
    id: 6,
    title: "Monad Game",
    description: "Real-time interactive gaming dApp on Monad Blockchain with 3 swipe-based mini-games",
    impact: "Hackathon Runner-Up — 2K+ players, 50K+ games played",
    tech: ["TypeScript", "Monad", "Gaming"],
    chains: ["monad"],
    github: "https://github.com/tmanas06/monad_game",
    metrics: { players: "2K+", games: "50K+", rewards: "$10K" },
    featured: true,
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
  },
  {
    id: 8,
    title: "Revenue Analytics Dashboard",
    description: "Scalable dashboard visualizing state-wise revenue data (FY17-FY26) with 99.9% accuracy",
    impact: "Built at KPMG — 1M+ data points, 99.9% accuracy",
    tech: ["React.js", "Python", "Analytics"],
    chains: [],
    github: "https://github.com/tmanas06/Revenue-Analytics-Dashboard",
    metrics: { accuracy: "99.9%", dataPoints: "1M+", users: "500" },
    featured: false,
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
    featured: false,
  },
  {
    id: 10,
    title: "Swipe Interview AI",
    description: "AI-powered interview preparation platform with swipe-based UI for practice sessions",
    impact: "800+ users with 92% accuracy on AI-generated questions",
    tech: ["TypeScript", "AI/ML", "React"],
    chains: [],
    github: "https://github.com/tmanas06/swipe_interview_ai",
    metrics: { questions: "5K+", users: "800", accuracy: "92%" },
    featured: false,
  },
];

export const experience = [
  {
    title: "Gen AI Full Stack Developer",
    company: "DVK Communications",
    period: "Dec 2025 - Present",
    location: "Remote",
    description: [
      "Developing production-grade Gen AI-powered full-stack applications leveraging cutting-edge AI technologies",
      "Building scalable backend services and responsive frontend interfaces for AI-driven solutions",
    ],
    current: true,
    logo: "/logos/exp/dvk_communications.jpg"
  },
  {
    title: "Uniswap Hook Incubator Trainee",
    company: "Atrium Academy",
    period: "Oct 2025 - Present",
    location: "Remote",
    description: [
      "Building DeFi infrastructure and Uniswap ecosystem tools for decentralized finance protocols",
      "Developing custom hooks and integrations for automated market maker (AMM) functionality",
    ],
    current: true,
    logo: "/logos/exp/atrium_academy.png"
  },
  {
    title: "Software Developer",
    company: "GoodBreach",
    period: "Oct - Nov 2025",
    location: "Remote",
    description: [
      "Contributed to application growth from MVP to product stage by developing core Android features using Flutter",
      "Built and optimized full-stack functionalities using Flutter/Dart frontend and Next.js/MongoDB backend",
    ],
    current: false,
    logo: "/logos/exp/goodbreach.png"
  },
  {
    title: "Software Developer Intern",
    company: "Coforge",
    period: "Aug - Oct 2025",
    location: "Greater Noida, On-site",
    description: [
      "Contributed to development and maintenance of Bata's e-commerce platform built on Java Spring framework",
      "Identified and documented critical bugs; collaborated with team to implement fixes improving site performance",
    ],
    current: false,
    logo: "/logos/exp/coforge.png"
  },
  {
    title: "G&PS DGA Intern",
    company: "KPMG India",
    period: "May - Jul 2025",
    location: "New Delhi, On-site",
    description: [
      "Contributed to State Revenue Analytics Dashboard through data analysis and internal documentation",
      "Prepared detailed RFPs and client presentations, supporting strategic discussions for project acquisition",
    ],
    current: false,
    logo: "/logos/exp/kpmg.png"
  },
  {
    title: "Blockchain Developer",
    company: "Timechain Labs",
    period: "Jul 2024 - May 2025",
    location: "Remote",
    description: [
      "Developed and deployed smart contracts on BSV Blockchain with Swagger UI integration",
      "Built responsive frontend with Svelte and scalable backend systems using NestJS",
      "Led frontend development for Deep Revenue Sharing System MVP, enhancing investor transparency",
    ],
    current: false,
    logo: "/logos/exp/timechain_labs.png"
  },
  {
    title: "Full Stack Developer",
    company: "Wallet Hunter Token 2049",
    period: "2024",
    location: "Remote",
    description: [
      "Engineered Python backend modules for automation; integrated third-party APIs for wallet tracking",
      "Built user-centric React.js interfaces, improving UX and engagement for Web3 applications",
    ],
    current: false,
  },
  {
    title: "Squad Member",
    company: "Snowflake",
    period: "Oct 2024 - May 2025",
    location: "Hyderabad",
    description: [
      "Earned Snowflake Developer Badges through active ecosystem contributions and community participation",
      "Delivered blockchain and data engineering contributions to enhance platform capabilities",
    ],
    current: false,
    logo: "/logos/exp/snowflake.png"
  },
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

export const navLinks = [
  { name: "Home", href: "/", icon: "home" },
  { name: "About", href: "/about", icon: "user" },
  { name: "Projects", href: "/projects", icon: "code" },
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
];
