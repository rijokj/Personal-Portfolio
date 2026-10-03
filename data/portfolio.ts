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
  title: "MERN Full Stack Developer",
  headline: "MERN Full Stack Developer",
  bio: "Full Stack MERN Developer with 2+ years of experience building role-based business applications, enterprise workflow systems, and scalable web platforms.",
  subtitle:
    "Proficient in React.js, Node.js, Express.js, MongoDB, and PostgreSQL, with hands-on experience in authentication systems, REST API development, and real-time workflows.",
  location: "Kerala, India",
  email: "rijokjolly@gmail.com",
  linkedin: "https://linkedin.com/in/rijo-k-j",
  github: "https://github.com/rijokjolly",
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
  { value: 2, suffix: "+", label: "Years of building" },
  { value: 3, suffix: "+", label: "Projects shipped" },
  { value: 100, suffix: "%", label: "Commitment" },
];

export const milestones: Milestone[] = [
  {
    year: "2016-2019",
    role: "Bachelor of Commerce (B.Com)",
    company: "Calicut University",
    note: "Graduated with a Bachelor of Commerce degree.",
  },
  {
    year: "2023-2024",
    role: "Full Stack Web Development",
    company: "Brototype",
    note: "Intensive training in MERN Stack web development.",
  },
  {
    year: "Jun 2024",
    role: "MERN Stack Developer",
    company: "Verdant IT Solutions",
    note: "Developed learning management systems, REST APIs, and integrated AI-powered language analysis features.",
  },
  {
    year: "Aug 2025",
    role: "MERN Stack Developer",
    company: "Figmark Infotek Pvt Ltd",
    note: "Designing and implementing secure authentication systems, RBAC, and responsive admin dashboards.",
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
    id: "bhavesh",
    author: "Bhavesh Suhagia",
    initial: "B",
    role: "Staff Software Engineer, USA",
    quote: [
      "I had the pleasure of working with Rijo as a frontend engineer while I was the tech lead. He was highly proactive, took strong ownership, and consistently brought a great understanding of UX and frontend architecture to our supply chain analytics platform.",
      "Across multiple projects, he demonstrated a strong ability to think from the user's perspective while also focusing on performance, scalability, and maintainability. He was a dependable engineer who needed little direction and consistently helped move the team and product forward. I would gladly work with him again.",
    ],
  },
  {
    id: "jay",
    author: "Jay Stamm",
    initial: "J",
    role: "Director of Software Engineering, USA",
    quote: [
      "Rijo has worked with our team for several years now and continues to be an outstanding contributor. He's touched nearly every customer-facing application in our enterprise software offering, from keeping legacy JavaScript apps running smoothly to building brand-new, polished UI/UX in TypeScript, Next.js, and Tailwind.",
      "Whatever we hand him, he delivers it with high quality, real efficiency, and a genuinely professional attitude. We hope to keep him as a core part of the team for many years to come.",
    ],
  },
  {
    id: "david",
    author: "David Soth-Kimmel",
    initial: "D",
    role: "Senior Software Engineer, USA",
    quote: [
      "Working alongside Rijo for the last few years has been genuinely incredible. He is very thorough, always understands the problem at hand, and can learn anything that is in front of him. He quickly adapts to any project or feature and consistently delivers polished, clean code.",
      "He is proactive, asks the right questions early, and always shows up fully engaged every day. Rijo is a team player and an absolute joy to work with and I'd work with him again without hesitation.",
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
