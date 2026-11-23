export interface Profile {
  name: string;
  givenName: string;
  familyName: string;
  title: string;
  headline: string;
  bio: string;
  subtitle: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
}

export interface Greeting {
  text: string;
  lang: string;
  fontClass?: string;
}

export interface TechItem {
  name: string;
  logoColor: string; // Brand color illuminated on hover
  svgPath: string; // Scalable SVG path(s)
  viewBox?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface Milestone {
  year: string;
  role: string;
  company: string;
  note: string;
}


export interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  stack: string[];
  displayUrl: string;
  href?: string;
  wireframe: "dot-coliv" | "risk-intelligence" | "media-library" | "ai-cx";
}

export interface Testimonial {
  id: string;
  author: string;
  initial: string;
  role: string;
  quote: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface MoreLink {
  label: string;
  description: string;
  href: string;
  status: "live" | "wip";
  icon: string;
}

export const profile: Profile = {
  name: "Rijo K J",
  givenName: "Rijo",
  familyName: "K J",
  title: "MERN Stack Developer",
  headline: "MERN Stack Developer | React.js, Node.js, PostgreSQL",
  bio: "Full Stack Developer with 3+ years of experience building responsive web applications with React.js, Node.js, and Express.js. Proficient in RESTful API design, JWT authentication, PostgreSQL, and MongoDB, with hands-on experience in Redux, React Query, Redis caching, and BullMQ background jobs.",
  subtitle:
    "Full Stack Developer with 3+ years of experience building scalable web applications with React, Node.js, Express, and modern databases. Focused on clean, maintainable code and quick adaptation to new tools.",
  location: "Dubai, UAE",
  email: "rijokjolly@gmail.com",
  linkedin: "https://www.linkedin.com/in/rijokjolly",
  github: "https://github.com/rijokj",
  instagram: "https://www.instagram.com/rijokjolly/",
};

export const greetings: Greeting[] = [
  { text: "Hi", lang: "en" },
  { text: "നമസ്കാരം", lang: "ml" },
  { text: "नमस्ते", lang: "hi" },
  { text: "Ciao", lang: "it" },
  { text: "Bonjour", lang: "fr" },
  { text: "Hola", lang: "es" },
  { text: "Olá", lang: "pt" },
  { text: "Konnichiwa", lang: "ja" },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "#intro" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const moreLinks: MoreLink[] = [
  {
    label: "Guest book",
    description: "Leave a note if you passed through.",
    href: "#guestbook",
    status: "live",
    icon: "book",
  },
  {
    label: "Testimonials",
    description: "What colleagues and leaders say.",
    href: "#testimonials",
    status: "live",
    icon: "quote",
  },
];

export const stats: StatItem[] = [
  { value: 3, suffix: "+", label: "Years of building" },
  { value: 3, suffix: "+", label: "Projects shipped" },
  { value: 100, suffix: "%", label: "Commitment" },
];

export const milestones: Milestone[] = [
  {
    year: "Joined 2016",
    role: "Bachelor of Commerce (B.Com)",
    company: "Calicut University",
    note: "Undergraduate studies in Commerce (Final exam pending).",
  },
  {
    year: "May 2022 – Oct 2022",
    role: "Full Stack Web Development Course",
    company: "Laxmiinfotek",
    note: "Comprehensive MERN stack training covering React, Node.js, Express, MongoDB, and RESTful API architecture.",
  },
  {
    year: "Nov 2022 – Jan 2023",
    role: "MERN Stack Intern",
    company: "Laxmiinfotek",
    note: "Developed RESTful APIs with Node.js/Express, JWT/session authentication, and responsive React.js interfaces.",
  },
  {
    year: "Apr 2023 – Jun 2025",
    role: "MERN Stack Developer",
    company: "Verdant IT Solutions",
    note: "Built full-stack LMS portals, RBAC, protected routes, OTP recovery workflows, and scalable MongoDB schemas.",
  },
  {
    year: "Aug 2025 – Oct 2026",
    role: "MERN Stack Developer",
    company: "Figmark Infotek Pvt Ltd",
    note: "Engineered scalable web apps, secure authentication, multi-user RBAC workflows, and responsive admin dashboards.",
  },
];




export const projects: Project[] = [
  {
    id: "carecrew",
    name: "CareCrew",
    category: "Marketplace",
    tagline: "Healthcare & Home-Care Marketplace",
    summary:
      "Architected a full-stack healthcare marketplace using React, Node.js/Express, and PostgreSQL with a REST API backend supporting 4 user roles, dynamic form engine, and real-time booking workflows.",
    displayUrl: "carecrew.example.com",
    href: "#",
    wireframe: "dot-coliv",
    stack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Socket.IO",
      "BullMQ",
    ],
  },
  {
    id: "project-management",
    name: "Role-Based Project Management System",
    category: "Enterprise SaaS",
    tagline: "Scalable MERN-based project management platform",
    summary:
      "Built a platform with 50+ frontend routes and 35+ REST API endpoints. Implemented RBAC for Admin, HR, Team Lead, and Employee roles with a tiered issue escalation system.",
    displayUrl: "app.internal/pm-system",
    wireframe: "risk-intelligence",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Redux",
    ],
  },
  {
    id: "learnifi",
    name: "LearniFi",
    category: "EdTech Platform",
    tagline: "AI-Integrated Language Learning Platform",
    summary:
      "Full-stack language learning platform featuring 4 assessment types, interactive exam engine, automated certificate generation, and third-party AI grammar-correction microservice.",
    displayUrl: "learnifi.example.com",
    wireframe: "media-library",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Chart.js"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "carecrew",
    author: "Arun Nair",
    initial: "A",
    role: "Engineering Lead, CareCrew",
    quote: [
      "Rijo took complete ownership of the core architecture for CareCrew. What impressed me most was his mastery over complex financial and booking workflows—engineering the multi-party Razorpay escrow and payout system with atomic Prisma transactions and HMAC-SHA256 verification so reliably that payments were seamless.",
      "He also built our distributed checkout-locking and automated refund queue using BullMQ and Redis. His ability to deliver production-ready, mission-critical systems across React, Node.js, and PostgreSQL makes him a truly dependable full-stack engineer.",
    ],
  },
  {
    id: "project-management",
    author: "Priya Sharma",
    initial: "P",
    role: "Product Lead, Enterprise Systems",
    quote: [
      "On our Role-Based Project Management platform, Rijo delivered an outstanding system used daily across 5 organizational roles. He designed clean RBAC boundaries and created an interactive drag-and-drop Kanban board with optimistic UI updates and real-time Socket.IO notifications that felt remarkably fluid.",
      "His automated scheduling engine built with Node-Cron and Nodemailer flawlessly handled task deadlines and payment reminders. Rijo is proactive, understands real business requirements, and writes clean, scalable code.",
    ],
  },
  {
    id: "learnifi",
    author: "Kiran Joseph",
    initial: "K",
    role: "Technical Lead, EdTech Platforms",
    quote: [
      "Working with Rijo on LearniFi was a fantastic experience. He designed and implemented the entire interactive exam engine supporting four distinct assessment types, automated certificate generation, and seamless integration with third-party AI grammar-analysis microservices.",
      "His frontend execution in React paired with a high-throughput Express and MongoDB backend delivered zero-lag performance for users during live assessments. He learns rapidly, solves tough problems independently, and delivers top-tier work.",
    ],
  },
];

export const techStack = [
  // 1. Frameworks & Libraries
  { name: "React", color: "#61dafb" },
  { name: "Redux Toolkit", color: "#764abc" },
  { name: "React Router", color: "#f44250" },

  // 2. Languages & Core Web
  { name: "JavaScript (ES6+)", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "HTML5", color: "#e34f26" },
  { name: "CSS3", color: "#1572b6" },

  // 3. Styling & State Management
  { name: "Tailwind CSS", color: "#06b6d4" },
  { name: "Bootstrap 5", color: "#7952b3" },
  { name: "SCSS", color: "#cf649a" },
  { name: "Redux / Redux Thunk", color: "#764abc" },
  { name: "Context API", color: "#61dafb" },

  // 4. Real-Time & Data Visualization
  { name: "Socket.IO", color: "#ffffff" },
  { name: "Chart.js", color: "#ff6384" },
  { name: "Recharts", color: "#22c55e" },
  { name: "ApexCharts", color: "#00e396" },

  // 5. Testing & Quality Assurance
  { name: "Jest", color: "#c21325" },

  // 6. Backend & Cloud Infrastructure
  { name: "Node.js", color: "#5fa04e" },
  { name: "Express.js", color: "#ffffff" },
  { name: "MongoDB", color: "#47a248" },
  { name: "PostgreSQL", color: "#4169e1" },
  { name: "Prisma ORM", color: "#5a67d8" },
  { name: "Redis", color: "#dc382d" },
  { name: "BullMQ", color: "#ff4500" },
  { name: "Docker", color: "#2496ed" },
  { name: "Git", color: "#f05032" },
  { name: "GitHub", color: "#ffffff" },

  // 7. Security & Payments
  { name: "JWT Authentication", color: "#d63aff" },
  { name: "RBAC", color: "#38bdf8" },
  { name: "Razorpay", color: "#3395ff" },

  // 8. AI-Assisted Development
  { name: "Claude", color: "#d97706" },
];
