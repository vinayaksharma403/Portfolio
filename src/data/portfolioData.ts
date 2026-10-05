/**
 * =======================================================================
 * PORTFOLIO DATA - SINGLE SOURCE OF TRUTH (SSOT)
 * =======================================================================
 * Owner: Vinayak Sharma
 * Academic Profile: 3rd Year / 5th Semester B.E. CSE, Chitkara University
 * 
 * STRICT GUIDELINES:
 * - Centralized data store for all portfolio sections (Hero, About, Skills, 
 *   Projects, Experience, Resume, Contact, Footer, SEO/Metadata).
 * - No invented or exaggerated claims.
 * - All unverified fields are marked with explicit "TODO" tags.
 * =======================================================================
 */

export interface ProjectImage {
  src: string;
  title: string;
  alt: string;
}

export interface PortfolioData {
  identity: {
    fullName: string;
    displayName: string;
    roleTitle: string;
    subTitle: string;
    academicStatus: string;
    location: string;
    availabilityStatus: string;
  };
  education: {
    degree: string;
    university: string;
    cgpa: string;
    timeline: string;
    status: string;
  };
  branding: {
    headline: string;
    heroBio: string;
    aboutSubtitle: string;
    aboutMission: string;
    contactBio: string;
    techPills: string[];
    statCards: {
      title: string;
      value: string;
    }[];
  };
  skills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    tools: string[];
    coreCS: string[];
    areasOfInterest: string[];
    categories: {
      id: "foundations" | "frontend" | "real_time_system" | "backend";
      title: string;
      level: string;
      equipment: string[];
      achievements: string[];
    }[];
    coreAbilities: {
      name: string;
      level: string;
      power: number;
    }[];
  };
  projects: {
    id: string;
    name: string;
    title: string;
    tagline: string;
    category: string;
    description: string;
    image: string;
    images?: ProjectImage[];
    github: string;
    live: string;
    badge: string;
    techSummary?: string;
    techStack: string[];
    points: string[];
  }[];
  experience: {
    company: string;
    role: string;
    duration: string;
    location: string;
    logo: string;
    status: "current" | "past";
    objectives: string[];
    techStack: string[];
    achievement: string;
    externalText: string;
  }[];
  achievements: {
    title: string;
    description: string;
    type: string;
  }[];
  contact: {
    email: string;
    phone: string;
    githubUrl: string;
    linkedinUrl: string;
    portfolioDomain: string;
  };
  assets: {
    avatarContact: string;
    portfolioProfile: string;
    ogImage: string;
    favicon: string;
    resumePdf: string;
    resumeDownloadFilename: string;
  };
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
  };
  footer: {
    copyright: string;
  };
}

export const PORTFOLIO_DATA: PortfolioData = {
  // =====================================================================
  // 1. IDENTITY & ACADEMIC PROFILE
  // =====================================================================
  identity: {
    fullName: "Vinayak Sharma",
    displayName: "Vinayak",
    roleTitle: "3rd Year Computer Science Engineering Student & Developer",
    subTitle: "Dev & Creator",
    academicStatus: "3rd Year / 5th Semester",
    location: "India",
    availabilityStatus: "Available for Work",
  },

  education: {
    degree: "B.E. Computer Science Engineering",
    university: "Chitkara University",
    cgpa: "CGPA 8.97",
    timeline: "TODO — CONFIRM EXACT DATES",
    status: "3rd Year / 5th Semester",
  },

  // =====================================================================
  // 2. BRANDING & COPYWRITING (Strictly adhering to verified positioning)
  // =====================================================================
  branding: {
    headline: "Hi, I'm Vinayak",
    heroBio:
      "Computer Science Engineering student crafting robust full-stack web applications with modern technologies, clean code architecture, and disciplined problem solving.",
    aboutSubtitle:
      "Computer Science Engineering Student • Problem Solver • Full-Stack Developer",
    aboutMission:
      "I am a Computer Science Engineering student focused on building scalable, efficient web applications and exploring AI/ML integration. Driven by core CS fundamentals and curiosity, I enjoy transforming ideas into responsive, reliable digital experiences.",
    contactBio:
      "Passionate about full-stack development, software engineering, and solving real-world challenges. Drop a message to connect, discuss projects, or collaborate!",
    techPills: [
      "Problem Solver",
      "Full-Stack Developer",
      "AI/ML Explorer",
      "DSA Enthusiast",
      "Software Engineering",
    ],
    statCards: [
      {
        title: "Current Focus",
        value: "Full Stack + Core CS",
      },
      {
        title: "Core Strength",
        value: "DSA & Problem Solving",
      },
      {
        title: "Building",
        value: "Real-World Applications",
      },
      {
        title: "Goal",
        value: "Software Engineering",
      },
    ],
  },

  // =====================================================================
  // 3. SKILLS LOADOUT & CORE ABILITIES
  // =====================================================================
  skills: {
    languages: ["Java", "Python", "JavaScript", "SQL"],
    frontend: ["React", "Vite", "Tailwind CSS", "Redux Toolkit"],
    backend: ["Node.js", "Express.js"],
    databases: ["MongoDB", "MySQL", "PostgreSQL"],
    tools: ["Git", "GitHub", "Postman", "Docker", "VS Code"],
    coreCS: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    areasOfInterest: [
      "Full-Stack Development",
      "Artificial Intelligence / Machine Learning",
      "Data Structures & Algorithms",
      "Problem Solving",
      "Software Engineering",
    ],

    categories: [
      {
        id: "foundations",
        title: "CORE CS & AI",
        level: "Level 1 / 4",
        equipment: [
          "Java",
          "Python",
          "DSA",
          "OOP",
          "DBMS",
          "Operating Systems",
          "Computer Networks",
          "SQL",
          "AI / ML",
          "NLP",
          "Problem Solving",
          "Software Engineering",
        ],
        achievements: [
          "Strong foundation in data structures, algorithms, and complexity analysis.",
          "Solid comprehension of Object-Oriented design patterns and modular code.",
          "Applied understanding of database management, relational schemas, and queries.",
          "Applied understanding of AI/ML concepts and NLP in hackathon innovation.",
        ],
      },
      {
        id: "frontend",
        title: "FRONTEND",
        level: "Level 2 / 4",
        equipment: [
          "React",
          "Vite",
          "JavaScript",
          "Tailwind CSS",
          "Redux Toolkit",
          "Responsive Design",
          "Component Architecture",
          "State Management",
        ],
        achievements: [
          "Crafting fast, dynamic frontend user interfaces with React and Vite.",
          "Implementing predictable global state management with Redux Toolkit.",
          "Styling responsive, clean, modern interfaces using Tailwind CSS.",
          "Structuring modular, reusable component hierarchies.",
        ],
      },
      {
        id: "real_time_system",
        title: "DATABASES & TOOLS",
        level: "Level 3 / 4",
        equipment: [
          "MongoDB",
          "MySQL",
          "PostgreSQL",
          "Git",
          "GitHub",
          "Postman",
          "Docker",
          "VS Code",
        ],
        achievements: [
          "Managing both relational (MySQL, PostgreSQL) and NoSQL (MongoDB) databases.",
          "Practicing disciplined version control, branching, and collaboration on GitHub.",
          "Testing, debugging, and documenting REST APIs thoroughly using Postman.",
          "Containerizing development workflows with Docker for consistency.",
        ],
      },
      {
        id: "backend",
        title: "BACKEND SYSTEMS",
        level: "Level 4 / 4",
        equipment: [
          "Node.js",
          "Express.js",
          "REST APIs",
          "CRUD Operations",
          "Middleware Design",
          "Database Integration",
        ],
        achievements: [
          "Building scalable backend servers and microservices with Node.js and Express.",
          "Architecting RESTful API endpoints with structured error handling.",
          "Integrating database persistence layers for dynamic web applications.",
          "Writing maintainable server-side logic following clean code standards.",
        ],
      },
    ],

    coreAbilities: [
      {
        name: "Frontend Development",
        level: "React, Vite, Redux, Tailwind",
        power: 85,
      },
      {
        name: "Backend Development",
        level: "Node.js & Express.js",
        power: 80,
      },
      {
        name: "Database Systems",
        level: "MongoDB, MySQL, PostgreSQL",
        power: 80,
      },
      {
        name: "Core Computer Science",
        level: "DSA, OOP, DBMS, OS, CN",
        power: 85,
      },
      {
        name: "Problem Solving",
        level: "Java & Python Algorithms",
        power: 85,
      },
      {
        name: "AI / ML Exploration",
        level: "Applied AI Solutions",
        power: 70,
      },
    ],
  },

  // =====================================================================
  // 4. PROJECTS (Strictly Verified Content + Unverified Marked as TODO)
  // =====================================================================
  projects: [
    {
      id: "project-neuroflux",
      name: "NeuroFlux",
      title: "NEUROFLUX",
      tagline: "Full-Stack Web Application",
      category: "Full-Stack Development",
      description:
        "A full-stack web application engineered with React on the frontend and a Node.js/Express backend backed by MongoDB.",
      image: "/images/projects/neuroflux/neuroflux-dashboard.png",
      images: [
        {
          src: "/images/projects/neuroflux/neuroflux-dashboard.png",
          title: "Dashboard",
          alt: "NeuroFlux dashboard showing AI learning resources",
        },
        {
          src: "/images/projects/neuroflux/neuroflux-document.png",
          title: "Document / Resource Processing",
          alt: "NeuroFlux document upload and resource processing interface",
        },
        {
          src: "/images/projects/neuroflux/neuroflux-flashcards.png",
          title: "Flashcards",
          alt: "NeuroFlux AI-generated interactive study flashcards",
        },
        {
          src: "/images/projects/neuroflux/neuroflux-quiz.png",
          title: "Quiz",
          alt: "NeuroFlux automated quiz generation and assessment interface",
        },
        {
          src: "/images/projects/neuroflux/neuroflux-chat.png",
          title: "AI Chat",
          alt: "NeuroFlux interactive AI study assistant chat interface",
        },
      ],
      github: "",
      live: "https://neuroflux-frontend-r0sz.onrender.com",
      badge: "Full Stack",
      techSummary: "React • Node.js • Express • MongoDB",
      techStack: ["React", "Node.js", "Express.js", "MongoDB"],
      points: [
        "Full-stack web architecture with separated client and server tiers.",
        "REST API endpoints with Node.js and Express handling backend operations.",
        "Document database schema design and data persistence with MongoDB.",
        "TODO — USER TO PROVIDE VERIFIED PROJECT DETAILS",
      ],
    },
    {
      id: "project-grabitgo",
      name: "GrabItGo",
      title: "GRABITGO",
      tagline: "Blinkit-Inspired Grocery / E-Commerce Frontend",
      category: "Frontend / E-Commerce",
      description:
        "A fast, modern e-commerce and grocery shopping interface built with React, Vite, Tailwind CSS, and Redux Toolkit for state management.",
      image: "/images/projects/grabitgo/grabitgo-home.png",
      images: [
        {
          src: "/images/projects/grabitgo/grabitgo-home.png",
          title: "Home / Product Discovery",
          alt: "GrabItGo home page with grocery categories and product discovery",
        },
        {
          src: "/images/projects/grabitgo/grabitgo-product.png",
          title: "Product Details",
          alt: "GrabItGo product details, pricing, and cart management",
        },
        {
          src: "/images/projects/grabitgo/grabitgo-orders.png",
          title: "Orders",
          alt: "GrabItGo user orders history and tracking interface",
        },
        {
          src: "/images/projects/grabitgo/grabitgo-admin-orders.png",
          title: "Admin Orders",
          alt: "GrabItGo admin dashboard for order management and fulfillment",
        },
        {
          src: "/images/projects/grabitgo/grabitgo-admin-subcategory.png",
          title: "Admin Subcategory Management",
          alt: "GrabItGo admin category and subcategory configuration interface",
        },
      ],
      github: "https://github.com/vinayaksharma403/GrabItGo",
      live: "https://grabitgo-ashy.vercel.app/",
      badge: "Frontend",
      techSummary: "React • Vite • Tailwind CSS • Redux",
      techStack: ["React", "Vite", "Tailwind CSS", "Redux Toolkit"],
      points: [
        "Interactive grocery shopping interface inspired by modern quick-commerce platforms.",
        "Centralized global cart, item management, and client state powered by Redux Toolkit.",
        "High-performance frontend bundling and responsive UI styled with Tailwind CSS and Vite.",
        "TODO — USER TO PROVIDE VERIFIED PROJECT DETAILS",
      ],
    },
    {
      id: "project-portfolio",
      name: "Vinayak Sharma — Developer Portfolio",
      title: "VINAYAK SHARMA — DEVELOPER PORTFOLIO",
      tagline: "Interactive Developer Portfolio & Showcase",
      category: "Personal Portfolio / Frontend",
      description:
        "Personal developer portfolio engineered with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Three.js to showcase technical skills, full-stack projects, interactive resume experiences, and verified contact coordinates.",
      image: "",
      images: [],
      github: "",
      live: "https://portfolio-dhleivsqf-vinayaksharma403s-projects.vercel.app/",
      badge: "Frontend / 3D",
      techSummary: "Next.js • React • TypeScript • Tailwind CSS • Framer Motion • Three.js",
      techStack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Three.js",
        "@react-three/fiber",
      ],
      points: [
        "Interactive retro brutalist interface featuring animated switchboard terminal and sound effects.",
        "Dynamic 3D astronaut and interactive canvas scene powered by Three.js and React Three Fiber.",
        "Responsive layout and smooth micro-interactions orchestrated using Framer Motion and Tailwind CSS.",
        "Structured Single Source of Truth architecture managing profile data, skills, and project archives.",
      ],
    },
  ],

  // =====================================================================
  // 5. EXPERIENCE (Strictly marked placeholders - No fake data)
  // =====================================================================
  experience: [
    {
      company: "TODO — USER TO PROVIDE VERIFIED EXPERIENCE",
      role: "Software Engineering / Developer Experience",
      duration: "TODO — DATES",
      location: "TODO — LOCATION",
      logo: "",
      status: "current",
      objectives: [
        "TODO — USER TO PROVIDE VERIFIED OBJECTIVES",
        "TODO — USER TO PROVIDE VERIFIED OBJECTIVES",
        "TODO — USER TO PROVIDE VERIFIED OBJECTIVES",
      ],
      techStack: ["Java", "Python", "React", "Node.js", "SQL", "Git"],
      achievement: "TODO — USER TO PROVIDE VERIFIED ACHIEVEMENT",
      externalText: `function experience() {\n  // TODO: Add verified experience\n  return "Learning & Building";\n}`,
    },
  ],

  // =====================================================================
  // 6. ACHIEVEMENTS & HONORS
  // =====================================================================
  achievements: [
    {
      title: "Smart India Hackathon",
      description:
        "Cleared the first round of the Smart India Hackathon (SIH) selection process; active in college hackathons and coding events.",
      type: "Hackathon / Innovation",
    },
    {
      title: "TODO — USER TO PROVIDE VERIFIED ACHIEVEMENT",
      description: "TODO — Additional verified academic, coding, or extracurricular milestone.",
      type: "Academic / Technical",
    },
    {
      title: "TODO — USER TO PROVIDE VERIFIED ACHIEVEMENT",
      description: "TODO — Additional verified open-source, hackathon, or technical milestone.",
      type: "Milestone",
    },
  ],

  // =====================================================================
  // 7. CONTACT COORDINATES & SOCIAL LINKS
  // =====================================================================
  contact: {
    email: "vinayaksharma4777@gmail.com",
    phone: "9530587264",
    githubUrl: "https://github.com/vinayaksharma4777",
    linkedinUrl: "https://www.linkedin.com/in/vinayak-sharma4777/",
    portfolioDomain: "TODO — ADD FINAL DOMAIN",
  },

  // =====================================================================
  // 8. ASSETS & DOCUMENTS
  // =====================================================================
  assets: {
    avatarContact: "", // TODO — Add Vinayak photo URL when provided
    portfolioProfile: "", // TODO — Add Vinayak avatar URL when provided
    ogImage: "", // TODO — Add Vinayak OG image URL when provided
    favicon: "/favicon.ico", // TODO — Replace with Vinayak favicon
    resumePdf: "/documents/VinayakSharma.pdf",
    resumeDownloadFilename: "VinayakSharma.pdf",
  },

  // =====================================================================
  // 9. SEO & OPEN GRAPH METADATA
  // =====================================================================
  seo: {
    title: "Vinayak Sharma | Portfolio",
    description:
      "Portfolio of Vinayak Sharma, 3rd-year Computer Science Engineering student at Chitkara University specializing in Full-Stack Development and Problem Solving.",
    ogTitle: "Vinayak Sharma | Portfolio",
    ogDescription:
      "Explore projects, skills, and background of Vinayak Sharma — 3rd-year CSE student & developer.",
    ogImage: "",
    twitterTitle: "Vinayak Sharma | Portfolio",
    twitterDescription:
      "Explore projects, skills, and background of Vinayak Sharma — 3rd-year CSE student & developer.",
    twitterImage: "",
  },

  // =====================================================================
  // 10. FOOTER & COPYRIGHT
  // =====================================================================
  footer: {
    copyright: "© 2026 VINAYAK SHARMA. ALL RIGHTS RESERVED.",
  },
};
