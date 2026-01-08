export const personalInfo = {
  name: "Manas Chakravarty",
  firstName: "Manas",
  title: "Full Stack Blockchain Developer",
  tagline: "Building the decentralized future, one smart contract at a time",
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
  { label: "Certifications", value: "14", icon: "cert", change: "+20%" },
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

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  chains: string[];
  github: string;
  metrics: { [key: string]: string };
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "ZK-Proof-of-Compliance-Hook",
    description: "Uniswap v4 hook restricting swaps/LP actions to users with zero-knowledge compliance proofs",
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
    tech: ["TypeScript", "ZK-SNARKs", "WebSocket"],
    chains: ["ethereum"],
    github: "https://github.com/tmanas06/ZKWhisper",
    metrics: { users: "500+", messages: "10K+", rating: "4.9" },
    featured: true,
  },
  {
    id: 3,
    title: "AiDeFi",
    description: "AI-powered DeFi application for intelligent trading and portfolio management (EthGlobal Delhi Hackathon)",
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
    tech: ["TypeScript", "Web3.js", "Multi-chain"],
    chains: ["ethereum", "polygon", "bsc"],
    github: "https://github.com/tmanas06/Wallet_Dapp",
    metrics: { chains: "5+", users: "1K+", volume: "$2M" },
    featured: false,
  },
  {
    id: 10,
    title: "Swipe Interview AI",
    description: "AI-powered interview preparation platform with swipe-based UI for practice sessions",
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
  { name: "CEH (Certified Ethical Hacker)", issuer: "EC-Council", year: "2025" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2025" },
  { name: "Red Hat Certified Enterprise Application Developer", issuer: "Red Hat", year: "2024" },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco", year: "2025" },
  { name: "Google Cloud Engineering Certificate", issuer: "Google Cloud", year: "2025" },
  { name: "Fortinet Certified Associate Cybersecurity", issuer: "Fortinet", year: "2024" },
  { name: "Oracle Cloud Infrastructure 2025 Foundations Associate", issuer: "Oracle", year: "2025" },
  { name: "Advanced Automation Professional", issuer: "Automation Anywhere", year: "2024" },
];

export const education = {
  degree: "B.Tech Computer Science & Engineering (Hons.)",
  university: "KL University, Hyderabad",
  period: "2022 - 2026 (Expected)",
  cgpa: "9.44",
};

export const navLinks = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Projects", href: "/projects", icon: "code" },
  { name: "Skills", href: "/skills", icon: "sparkles" },
  { name: "About", href: "/about", icon: "user" },
  { name: "Contact", href: "/contact", icon: "mail" },
];

export const quickActions = [
  { id: "projects", label: "Projects", icon: "code", href: "/projects", color: "#F0B90B" },
  { id: "experience", label: "Experience", icon: "briefcase", href: "/about", color: "#00D4AA" },
  { id: "skills", label: "Skills", icon: "sparkles", href: "/skills", color: "#627EEA" },
  { id: "wins", label: "Wins", icon: "trophy", href: "/about", color: "#FF6B00" },
  { id: "certs", label: "Certs", icon: "academic", href: "/about", color: "#8247E5" },
  { id: "blockchain", label: "Blockchain", icon: "cube", href: "/projects", color: "#F6465D" },
  { id: "resume", label: "Resume", icon: "document", href: "/resume.pdf", color: "#00FFA3", external: true },
  { id: "contact", label: "Contact", icon: "mail", href: "/contact", color: "#5546FF" },
];

export const chains = [
  { name: "ETH", fullName: "Ethereum", color: "#627EEA" },
  { name: "SOL", fullName: "Solana", color: "#00FFA3" },
  { name: "MATIC", fullName: "Polygon", color: "#8247E5" },
  { name: "BSV", fullName: "Bitcoin SV", color: "#FF6B00" },
  { name: "STX", fullName: "Stacks", color: "#5546FF" },
  { name: "APT", fullName: "Aptos", color: "#00D4AA" },
  { name: "MONAD", fullName: "Monad", color: "#9945FF" },
];

export const notifications = [
  { id: 1, type: "star", message: "New star on ZK-Proof repo", time: "2h ago" },
  { id: 2, type: "fork", message: "Someone forked AiDeFi", time: "5h ago" },
  { id: 3, type: "win", message: "RootStock Hackathon Winner!", time: "1d ago" },
  { id: 4, type: "message", message: "New message from recruiter", time: "2d ago" },
  { id: 5, type: "alert", message: "Contract deployment successful", time: "3d ago" },
];

export const walletBalance = {
  total: "$2,450.00",
  tokens: [
    { symbol: "ETH", balance: "0.85", value: "$1,850" },
    { symbol: "SOL", balance: "12.5", value: "$400" },
    { symbol: "MATIC", balance: "250", value: "$200" },
  ],
};
