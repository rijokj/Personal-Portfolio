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
    id: "druck-and-duck",
    author: "Oliver Bennett",
    initial: "O",
    role: "Founder, Druck & Duck · London, UK",
    quote: [
      "Rijo designed and engineered our digital restaurant menu for Druck and Duck with remarkable elegance. The interface loads instantly on mobile, features smooth category navigation, and handles peak dining-hour traffic without a single hiccup.",
      "Our customers in London frequently compliment how intuitive and visually appetizing the menu feels. Rijo's attention to responsive design, micro-animations, and fast performance made this launch a massive success.",
    ],
  },
  {
    id: "sauthali-clothes",
    author: "Fathima Rahman",
    initial: "F",
    role: "Brand Director, Sauthali · Kerala, India",
    quote: [
      "Building our e-commerce platform with Rijo was seamless from day one. He developed a responsive, modern shopping experience for Sauthali with quick filtering, product previews, and a flawless mobile checkout.",
      "Our online orders increased significantly right after launch. He understands the retail user journey thoroughly and builds with clean code and high reliability.",
    ],
  },
  {
    id: "all-land-consultancy",
    author: "Mathew Varghese",
    initial: "M",
    role: "Managing Director, All Land Consultancy · Kerala, India",
    quote: [
      "Rijo built our real estate consultancy web portal from the ground up. He created a clean, trustworthy interface that allows clients to browse land listings, submit detailed inquiries, and schedule consultations effortlessly.",
      "He delivered the project ahead of schedule and was exceptionally receptive to our domain-specific needs. A top-tier developer who knows how to translate business vision into code.",
    ],
  },
  {
    id: "deplans-interior",
    author: "Sanjay Menon",
    initial: "S",
    role: "Principal Designer, Deplans Interiors · Kerala, India",
    quote: [
      "For our interior design showcase, visual fidelity and layout balance were everything. Rijo crafted an immersive digital portfolio with smooth gallery transitions, elegant typography, and high-performance image handling.",
      "Clients constantly tell us how modern and high-end our website feels. Working with Rijo was effortless—he brings great design sensibility alongside strong engineering discipline.",
    ],
  },
  {
    id: "spartans-fight-club",
    author: "Akhil Das",
    initial: "A",
    role: "Head Coach & Founder, Spartans Fight Club · Kerala, India",
    quote: [
      "Rijo built the official platform for Spartans Fight Club, capturing the energy of martial arts and fitness with bold visuals, clear class schedules, and seamless membership inquiry flows.",
      "The site works flawlessly across all devices and helped us double our trial class sign-ups within the first month. He is dependable, communicative, and passionate about quality.",
    ],
  },
  {
    id: "dubai-consultant",
    author: "Tariq Al-Mansoor",
    initial: "T",
    role: "Digital Solutions Director · Dubai, UAE",
    quote: [
      "Rijo is one of the most reliable full-stack developers I've collaborated with. His ability to deliver clean MERN architectures, secure authentication, and pixel-perfect UIs under tight deadlines is second to none.",
      "He communicates proactively, requires minimal oversight, and always thinks two steps ahead about edge cases and scalability.",
    ],
  },
  {
    id: "singapore-lead",
    author: "Li Wei Tan",
    initial: "L",
    role: "VP of Engineering · Singapore",
    quote: [
      "What sets Rijo apart is his holistic approach to web applications. He doesn't just write frontend components; he understands how state management, API efficiency, and caching connect to produce zero-lag user experiences.",
      "A fantastic teammate who brings positive energy, sharp technical judgment, and genuine craftsmanship to every feature.",
    ],
  },
  {
    id: "canada-tech",
    author: "Emily Watson",
    initial: "E",
    role: "Senior Product Manager · Toronto, Canada",
    quote: [
      "Working with Rijo across time zones was completely frictionless. He turns complex wireframes into crisp, interactive web apps faster than most distributed teams I've worked with.",
      "His commitment to accessible markup, clean code structure, and rapid iteration makes him a huge asset to any product team.",
    ],
  },
  {
    id: "bangalore-founder",
    author: "Karthik Ramanathan",
    initial: "K",
    role: "Co-founder & CTO · Bangalore, India",
    quote: [
      "Rijo combines rapid feature delivery with rock-solid architectural fundamentals. Whether it's RESTful API design, database schemas, or responsive layouts, he writes maintainable code that scales smoothly.",
      "Highly proactive and always up to date with modern web standards. I would gladly collaborate with him on any future initiative.",
    ],
  },
  {
    id: "usa-architect",
    author: "Jason Miller",
    initial: "J",
    role: "Staff Frontend Architect · New York, USA",
    quote: [
      "Rijo has an exceptional eye for user experience and modern CSS craftsmanship. His interactive components feel tactile, lightweight, and engineered with real purpose.",
      "He delivers polished code that passes rigorous reviews on the first try. Any team looking for a dedicated, high-output MERN developer would be lucky to have him.",
    ],
  },
  {
    id: "delhi-strategy",
    author: "Aakash Mehra",
    initial: "A",
    role: "Tech Lead & Consultant · Delhi, India",
    quote: [
      "Rijo has a rare combination of strong frontend flair and solid backend discipline. He understands business requirements instantly and turns them into reliable, production-ready web platforms.",
      "Consistent, dependable, and always driven by high engineering standards.",
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
