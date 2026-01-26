export const personalInfo = {
  name: "Tri Nguyen",
  title: "Senior Fullstack Developer",
  subtitle: "Turning complex business problems into elegant, scalable solutions",
  tagline: "5+ Years | E-Commerce | Performance Optimization | Node.js & React",
  bio: `I'm a results-driven Senior Fullstack Developer with 5+ years of experience building high-traffic web applications that directly impact business growth. My expertise lies in creating performant, scalable systems using Node.js, TypeScript, and React.

At Merkle, I led development on Giant Bicycles' e-commerce platform serving millions of users, achieving 10% faster page loads and 99% payment success rates. I specialize in performance optimization, payment integrations, and microservices architecture.

I'm passionate about clean code, developer experience, and shipping products that users love.`,
  avatar: "/images/avatar-placeholder.svg",
  email: "triminh.nguyen2098@gmail.com",
  phone: "(+84) 949 667 264",
  location: "Ho Chi Minh City, Vietnam",
  availability: "Open to remote opportunities worldwide",
  social: {
    github: "https://github.com/tringuyen",
    linkedin: "https://linkedin.com/in/tringuyen",
  },
};

export const keyHighlights = [
  {
    metric: "5+",
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
    metric: "4",
    label: "Major Projects",
    description: "E-commerce, SaaS, Mobile",
  },
];

export const coreCompetencies = [
  "Full-Stack Architecture",
  "Performance Optimization",
  "Payment Integration",
  "Microservices Design",
  "API Development",
  "Database Optimization",
  "Cloud Infrastructure",
  "Technical Leadership",
];

export const experiences = [
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
          "Led frontend & backend development for a global e-commerce platform",
          "Achieved 10% page load improvement through code splitting and lazy loading",
          "Implemented Elastic Search, reducing product search time by 10%",
          "Integrated PayPal & Stripe with 99% transaction success rate",
          "Built Redis caching layer, reducing database load by 40%",
          "Developed comprehensive logging with ELK Stack for debugging",
          "Implemented GA4/GTM tracking for marketing analytics",
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
          "Architected real-time notification system using Kafka",
          "Improved UX leading to 15% faster page interactions",
          "Built CMS for managing movies, events, and customer data",
          "Authored technical documentation for international team",
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
          "Built video streaming infrastructure with Cloudinary",
          "Developed course management dashboard from scratch",
          "Integrated PayPal payments for course purchases",
          "Created analytics dashboard for sales tracking",
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
          "Developed cross-platform mobile app with React Native",
          "Built GraphQL API for efficient data fetching",
          "Created responsive web dashboard with React",
          "Implemented real-time updates for building notifications",
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
          "Wrote comprehensive unit tests achieving 80% coverage",
          "Developed expense management API endpoints",
          "Learned best practices for secure payment handling",
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
    { name: "React", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "React Native", level: 80 },
    { name: "Next.js", level: 75 },
    { name: "Tailwind CSS", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 92 },
    { name: "NestJS", level: 85 },
    { name: "Express", level: 90 },
    { name: "GraphQL", level: 80 },
    { name: "REST API Design", level: 92 },
  ],
  database: [
    { name: "PostgreSQL", level: 88 },
    { name: "MongoDB", level: 85 },
    { name: "Redis", level: 82 },
    { name: "Elastic Search", level: 75 },
    { name: "Prisma/TypeORM", level: 85 },
  ],
  devops: [
    { name: "Docker", level: 78 },
    { name: "AWS (S3, CloudFront)", level: 80 },
    { name: "CI/CD", level: 75 },
    { name: "Git/GitHub", level: 92 },
    { name: "Kafka", level: 70 },
  ],
};

export const techStack = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL"],
  frontend: ["React", "React Native", "Next.js", "HTML5", "CSS3", "SASS", "Tailwind"],
  backend: ["Node.js", "NestJS", "Express", "GraphQL", "REST API"],
  databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elastic Search"],
  devops: ["Docker", "AWS", "CI/CD", "CircleCI", "Git"],
  tools: ["Jest", "Prisma", "TypeORM", "Kafka", "ELK Stack"],
};

export const softSkills = [
  "Technical Problem Solving",
  "Cross-functional Collaboration",
  "Agile/Scrum Methodology",
  "English Communication",
  "Code Review & Mentoring",
];

export const languages = [
  { name: "Vietnamese", level: "Native" },
  { name: "English", level: "Professional Working (B2)" },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];
