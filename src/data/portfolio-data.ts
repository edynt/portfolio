export const personalInfo = {
  name: "Nguyen Minh Tri",
  title: "Fullstack Developer",
  subtitle: "Building scalable web applications with modern technologies",
  bio: "I'm a passionate Fullstack Developer with 5+ years of experience specializing in building high-performance web applications. I have extensive experience with Node.js, TypeScript, React, and cloud technologies. I've worked on large-scale e-commerce platforms, ticket booking systems, and online learning platforms, focusing on performance optimization and seamless user experiences.",
  avatar: "/images/avatar-placeholder.svg",
  email: "triminh.nguyen2098@gmail.com",
  phone: "(+84) 949 667 264",
  location: "Thong Nhat St, Go Vap Dist, Ho Chi Minh City",
  social: {
    github: "https://github.com/tringuyen",
    linkedin: "https://linkedin.com/in/tringuyen",
  },
};

export const experiences = [
  {
    id: 1,
    company: "Merkle",
    position: "Mid Fullstack Developer",
    period: "12/2020 - 01/2025",
    projects: [
      {
        name: "Giant Bicycles",
        type: "E-Commerce",
        duration: "2 years",
        highlights: [
          "Optimized page load speed by 10% (Desktop, Mobile)",
          "Sped up product search by 10% with Elastic Search",
          "Reduced database load using Redis caching",
          "Integrated PayPal & Stripe payments - 99% transaction success rate",
          "Implemented GA4/GTM, PIM, Email marketing, Google AdWords",
          "Built logging system with ELK Stack",
        ],
        technologies: [
          "NodeJS",
          "TypeScript",
          "ExpressJS",
          "PostgreSQL",
          "Prisma",
          "Jest",
          "Elastic Search",
          "AWS S3",
          "CloudFront",
          "Redis",
          "React",
          "Microservices",
        ],
      },
      {
        name: "Zoopalast",
        type: "Movie & Event Tickets",
        duration: "1 year",
        highlights: [
          "Improved page load and user experience by 15%",
          "Built customer & content management systems",
          "Developed customer notification system",
          "Technical documentation in English",
        ],
        technologies: [
          "NestJS",
          "TypeScript",
          "PostgreSQL",
          "TypeORM",
          "Redis",
          "AWS S3",
          "CloudFront",
          "Kafka",
        ],
      },
      {
        name: "Studysail",
        type: "Online Courses",
        duration: "1 year",
        highlights: [
          "Implemented video upload to Cloudinary",
          "Built course favorites feature",
          "Created management website for courses, customers, and sales",
          "Integrated PayPal payment",
        ],
        technologies: [
          "NodeJS",
          "ExpressJS",
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
    position: "Fresher Fullstack Developer",
    period: "12/2019 - 8/2020",
    projects: [
      {
        name: "Ting Building Management",
        type: "Building Management",
        duration: "9 months",
        highlights: [
          "Built mobile app using React Native",
          "Developed API with NodeJS and GraphQL",
          "Created web management dashboard with React",
          "Implemented responsive web design",
        ],
        technologies: [
          "ExpressJS",
          "NodeJS",
          "MySQL",
          "Sequelize",
          "JavaScript",
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
    position: "Intern NodeJS Developer",
    period: "9/2019 - 11/2019",
    projects: [
      {
        name: "Finchpay",
        type: "Wallet Payment",
        duration: "3 months",
        highlights: [
          "Wrote unit tests using Jest for wallet payment",
          "Developed API for expense management",
        ],
        technologies: [
          "NodeJS",
          "JavaScript",
          "PostgreSQL",
          "Sequelize",
          "Jest",
        ],
      },
    ],
  },
];

export const education = [
  {
    institution: "University of Science (HCMUS)",
    degree: "Software Technology",
    gpa: "65%",
    period: "2016 - 2019",
  },
  {
    institution: "Information Center of HCMUS",
    degree: "PHP & Front End",
    gpa: "PHP: 80%, Front End: 90%",
    period: "2/2018 - 8/2018",
  },
  {
    institution: "Information Center of Khoa Pham",
    degree: "MEAN Stack",
    gpa: "90%",
    period: "2/2019 - 6/2019",
  },
];

export const projects = [
  {
    id: 1,
    title: "Giant Bicycles E-Commerce",
    description:
      "Large-scale e-commerce platform for Giant Bicycles with payment integration, search optimization, and microservices architecture.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    tags: ["NodeJS", "TypeScript", "PostgreSQL", "Redis", "Microservices"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Zoopalast Ticket Booking",
    description:
      "Online movie and event ticket booking system with real-time notifications and content management.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Kafka"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Studysail Learning Platform",
    description:
      "Online course platform with video streaming, course management, and PayPal payment integration.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    tags: ["NodeJS", "ExpressJS", "MongoDB", "Cloudinary"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Ting Building Management",
    description:
      "Building management system with mobile app (React Native), web dashboard (React), and GraphQL API.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    tags: ["React", "React Native", "GraphQL", "NodeJS"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const skills = {
  frontend: [
    { name: "React", level: 90 },
    { name: "React Native", level: 80 },
    { name: "TypeScript", level: 88 },
    { name: "HTML/CSS/SASS", level: 90 },
    { name: "Bootstrap", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 92 },
    { name: "NestJS", level: 85 },
    { name: "ExpressJS", level: 90 },
    { name: "GraphQL", level: 80 },
    { name: "RESTful API", level: 92 },
  ],
  database: [
    { name: "PostgreSQL", level: 88 },
    { name: "MongoDB", level: 85 },
    { name: "MySQL", level: 82 },
    { name: "Redis", level: 80 },
    { name: "Elastic Search", level: 75 },
  ],
  devops: [
    { name: "Docker", level: 78 },
    { name: "AWS S3/CloudFront", level: 80 },
    { name: "CI/CD", level: 75 },
    { name: "Git", level: 90 },
    { name: "Kafka", level: 70 },
  ],
};

export const softSkills = [
  "English Intermediate (Improving to Advanced)",
  "Teamwork",
  "Problem-solving",
  "Time Management",
  "Adaptability",
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];
