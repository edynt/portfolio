export const personalInfo = {
  name: "Tri Nguyen",
  title: "Middle Fullstack Developer",
  subtitle: "Turning complex business problems into elegant, scalable solutions",
  tagline: "6+ Years | E-Commerce | Performance Optimization | Node.js & React",
  bio: `Middle Fullstack Developer with 6+ years shipping high-traffic web applications across e-commerce, legal tech, construction, and talent management domains. I architect performant, scalable systems with Node.js, TypeScript, and React — from zero-to-one product builds to enterprise-scale platform upgrades.

At Merkle (Dentsu), I drove development on Giant Bicycles' global e-commerce platform serving millions of users — achieving 10% faster page loads, 99% payment success rates, and 40% reduced database load. Currently at Hopee Solutions, I build products from scratch for clients in Japan and Australia.

I leverage AI-assisted development and prompt engineering to accelerate delivery while maintaining code quality. Passionate about clean architecture, developer experience, and shipping products that move the needle.`,
  avatar: "/images/avatar-placeholder.svg",
  email: "triminh.nguyen2098@gmail.com",
  phone: "(+84) 949 667 264",
  location: "Ho Chi Minh City, Vietnam",
  availability: "Open to remote opportunities worldwide",
  social: {
    github: "https://github.com/edynt",
    linkedin: "https://linkedin.com/in/tringuyen",
  },
};

export const keyHighlights = [
  {
    metric: "6+",
    label: "Years Experience",
    description: "Professional fullstack development",
  },
  {
    metric: "99%",
    label: "Payment Success",
    description: "PayPal & Stripe integrations",
  },
  {
    metric: "15%",
    label: "Performance Boost",
    description: "Page load optimization",
  },
  {
    metric: "8+",
    label: "Major Projects",
    description: "E-commerce, SaaS, Legal, Construction",
  },
];

export const coreCompetencies = [
  "Full-Stack Architecture",
  "Performance Optimization",
  "Payment Integration",
  "Microservices Design",
  "API Development",
  "Database Optimization",
  "Cloud Infrastructure (AWS)",
  "AI-Assisted Development",
];

export const certificates = [
  {
    name: "Claude Code in Action",
    issuer: "Anthropic Academy",
    verifyUrl: "https://verify.skilljar.com/c/xegp8xbg9nct",
  },
];

export const experiences = [
  {
    id: 0,
    company: "Hopee Solutions",
    companyDescription: "Outsourcing & product development company",
    position: "Fullstack Developer",
    period: "Mar 2025 - Present",
    duration: "1 year",
    projects: [
      {
        name: "Irohana Match",
        type: "Talent Matching Platform",
        duration: "Aug 2025 - Present",
        impact: "Zero-to-one product build",
        highlights: [
          "Architected and built a full talent matching platform from scratch — connecting candidates to companies, jobs, and projects",
          "Engineered real-time notifications and live data sync with WebSocket",
          "Designed containerized deployment pipeline on AWS ECS/ECR with Cognito auth",
          "Built intelligent matching algorithms to optimize candidate-job fit scoring",
        ],
        technologies: [
          "NestJS",
          "TypeORM",
          "PostgreSQL",
          "ReactJS",
          "TanStack",
          "Socket",
          "AWS ECS/ECR",
          "Cognito",
        ],
      },
      {
        name: "Stella Cloud",
        type: "Construction Management System",
        duration: "Jul 2025",
        impact: "Japanese construction industry",
        highlights: [
          "Maintained and enhanced microservice-based platform managing construction, electrical, and plumbing projects",
          "Developed scheduling engine with worker availability matching for optimal resource allocation",
          "Improved calendar management system handling complex multi-worker project timelines",
        ],
        technologies: [
          "Node.js",
          "Microservices",
          "DynamoDB",
          "ReactJS",
        ],
      },
      {
        name: "Legal Docs",
        type: "Legal Document Platform",
        duration: "Apr 2025 - Jun 2025",
        impact: "Australian legal industry",
        highlights: [
          "Built a legal document marketplace from the ground up for the Australian market",
          "Delivered end-to-end full-stack solution — from database design to production deployment",
          "Deployed production infrastructure on AWS EC2 with CI/CD automation",
        ],
        technologies: [
          "NestJS",
          "ReactJS",
          "MongoDB",
          "AWS EC2",
        ],
      },
      {
        name: "Irohana Visa",
        type: "Visa Management System",
        duration: "Mar 2025",
        impact: "Japanese government integration",
        highlights: [
          "Stabilized and upgraded visa management web application for Japanese market",
          "Implemented automated document submission pipeline integrated with Japanese government systems",
        ],
        technologies: [
          "NestJS",
          "TypeORM",
          "PostgreSQL",
          "ReactJS",
          "TanStack",
          "React Hooks",
        ],
      },
    ],
  },
  {
    id: 1,
    company: "Merkle (a Dentsu Company)",
    companyDescription: "Global digital transformation agency",
    position: "Mid-Senior Fullstack Developer",
    period: "Dec 2020 - Jan 2025",
    duration: "4 years",
    projects: [
      {
        name: "Giant Bicycles",
        type: "E-Commerce Platform",
        duration: "2 years",
        impact: "Millions of users globally",
        highlights: [
          "Spearheaded frontend & backend development for a global e-commerce platform serving millions of users",
          "Boosted page load speed by 10% through strategic code splitting, lazy loading, and CDN optimization",
          "Integrated Elastic Search, cutting product search latency by 10% across thousands of SKUs",
          "Implemented PayPal & Stripe payment gateways achieving 99% transaction success rate",
          "Architected Redis caching layer that reduced database load by 40%",
          "Built observability stack with ELK (Elasticsearch, Logstash, Kibana) for real-time debugging",
          "Deployed GA4/GTM analytics tracking powering data-driven marketing decisions",
        ],
        technologies: [
          "Node.js",
          "TypeScript",
          "Express",
          "PostgreSQL",
          "Prisma",
          "Jest",
          "Elastic Search",
          "AWS S3/CloudFront",
          "Redis",
          "React",
          "Microservices",
        ],
      },
      {
        name: "Zoopalast",
        type: "Ticket Booking Platform",
        duration: "1 year",
        impact: "Germany's cinema chain",
        highlights: [
          "Designed event-driven notification system with Apache Kafka for real-time seat updates",
          "Optimized frontend performance, delivering 15% faster page interactions",
          "Built content management system for movies, events, and customer lifecycle",
          "Authored technical documentation enabling seamless knowledge transfer across international teams",
        ],
        technologies: [
          "NestJS",
          "TypeScript",
          "PostgreSQL",
          "TypeORM",
          "Redis",
          "AWS S3/CloudFront",
          "Kafka",
        ],
      },
      {
        name: "Studysail",
        type: "EdTech Platform",
        duration: "1 year",
        impact: "Online learning startup",
        highlights: [
          "Engineered video streaming infrastructure with Cloudinary for smooth course delivery",
          "Built course management dashboard from scratch with intuitive instructor tools",
          "Integrated PayPal payment flow for seamless course purchases",
          "Created real-time analytics dashboard for sales and engagement tracking",
        ],
        technologies: [
          "Node.js",
          "Express",
          "MongoDB",
          "Mongoose",
          "JavaScript",
          "Cloudinary",
        ],
      },
    ],
  },
  {
    id: 2,
    company: "HiCAS",
    companyDescription: "PropTech startup",
    position: "Junior Fullstack Developer",
    period: "Dec 2019 - Aug 2020",
    duration: "9 months",
    projects: [
      {
        name: "Ting Building Management",
        type: "PropTech Solution",
        duration: "9 months",
        impact: "Building management SaaS",
        highlights: [
          "Developed cross-platform mobile app with React Native for iOS and Android",
          "Designed GraphQL API layer for efficient, type-safe data fetching",
          "Built responsive web dashboard with React for property managers",
          "Implemented real-time push notifications for building events and alerts",
        ],
        technologies: [
          "Node.js",
          "Express",
          "MySQL",
          "Sequelize",
          "React",
          "React Native",
          "GraphQL",
        ],
      },
    ],
  },
  {
    id: 3,
    company: "HDWebsoft",
    companyDescription: "Software development company",
    position: "Node.js Developer Intern",
    period: "Sep 2019 - Nov 2019",
    duration: "3 months",
    projects: [
      {
        name: "Finchpay",
        type: "FinTech Wallet",
        duration: "3 months",
        impact: "Digital payment solution",
        highlights: [
          "Achieved 80% test coverage with comprehensive unit and integration tests",
          "Developed RESTful API endpoints for expense tracking and wallet management",
          "Applied secure payment handling best practices in a fintech environment",
        ],
        technologies: ["Node.js", "JavaScript", "PostgreSQL", "Sequelize", "Jest"],
      },
    ],
  },
];

export const education = [
  {
    institution: "University of Science (HCMUS)",
    degree: "Bachelor in Software Technology",
    gpa: "65%",
    period: "2016 - 2019",
  },
  {
    institution: "HCMUS Information Center",
    degree: "PHP & Frontend Development",
    gpa: "80-90%",
    period: "2018",
  },
  {
    institution: "Khoa Pham Training Center",
    degree: "MEAN Stack Development",
    gpa: "90%",
    period: "2019",
  },
];

export const projects = [
  {
    id: 1,
    title: "Giant Bicycles E-Commerce",
    description:
      "Global e-commerce platform serving millions of cyclists. Built with microservices architecture, real-time inventory, and multi-payment gateway integration.",
    impact: "10% faster loads, 99% payment success",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS"],
    category: "E-Commerce",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Zoopalast Booking System",
    description:
      "Real-time ticket booking platform for Germany's cinema chain. Features event-driven architecture with Kafka for instant seat availability updates.",
    impact: "15% UX improvement",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Kafka"],
    category: "Entertainment",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Studysail Learning Platform",
    description:
      "EdTech platform with video streaming, course management, and integrated payments. Built scalable video infrastructure using Cloudinary.",
    impact: "Complete course management system",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    tags: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    category: "EdTech",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Ting Building Management",
    description:
      "PropTech SaaS with cross-platform mobile app and web dashboard. GraphQL API for efficient data synchronization across devices.",
    impact: "Mobile + Web + API",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    tags: ["React Native", "React", "GraphQL", "Node.js"],
    category: "PropTech",
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const skills = {
  frontend: [
    { name: "React / React Native", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "Next.js", level: 75 },
    { name: "TanStack Query", level: 82 },
    { name: "Tailwind CSS", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 92 },
    { name: "NestJS", level: 88 },
    { name: "Express", level: 90 },
    { name: "GraphQL", level: 80 },
    { name: "REST API Design", level: 92 },
  ],
  database: [
    { name: "PostgreSQL", level: 88 },
    { name: "MongoDB", level: 85 },
    { name: "Redis", level: 82 },
    { name: "DynamoDB", level: 72 },
    { name: "Prisma / TypeORM", level: 85 },
  ],
  devops: [
    { name: "AWS (ECS, ECR, EC2, S3)", level: 82 },
    { name: "Docker", level: 78 },
    { name: "CI/CD", level: 75 },
    { name: "Git/GitHub", level: 92 },
    { name: "Kafka", level: 70 },
  ],
  ai: [
    { name: "AI-Assisted Development", level: 85 },
    { name: "Prompt Engineering", level: 82 },
    { name: "Claude / ChatGPT", level: 85 },
    { name: "AI Code Review", level: 78 },
    { name: "AI Workflow Automation", level: 75 },
  ],
};

export const techStack = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL"],
  frontend: ["React", "React Native", "Next.js", "TanStack", "HTML5", "CSS3", "Tailwind"],
  backend: ["Node.js", "NestJS", "Express", "GraphQL", "REST API", "Microservices"],
  databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "DynamoDB", "Elastic Search"],
  devops: ["Docker", "AWS (ECS/ECR/EC2/S3)", "CI/CD", "CircleCI", "Git"],
  tools: ["Jest", "Prisma", "TypeORM", "Kafka", "ELK Stack", "Cognito", "Socket.io"],
  ai: ["Claude", "ChatGPT", "Prompt Engineering", "AI-Assisted Development"],
};

export const softSkills = [
  "Technical Problem Solving",
  "Cross-functional Collaboration",
  "Agile/Scrum Methodology",
  "English Communication (TOEIC 650+)",
  "AI-Powered Productivity",
];

export const languages = [
  { name: "Vietnamese", level: "Native" },
  { name: "English", level: "TOEIC 650+ (B2)" },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];
