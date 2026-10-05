"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { playClickSound } from "../utils/sound";
import {
  Joystick,
  Brain,
  MonitorSmartphone,
  Radio,
  ServerCog,
  Package,
  Trophy,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

const skillData = {
  foundations: {
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
      "Mastered fundamental data structures and algorithmic patterns.",
      "Developed strong analytical and problem-solving instincts in Java and Python.",
      "Built a solid foundation across core computer science subjects.",
      "Applied understanding of AI/ML concepts and NLP in hackathon innovation.",
    ],
  },

  frontend: {
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

  real_time_system: {
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

  backend: {
    title: "BACKEND SYSTEMS",
    level: "Level 4 / 4",

    equipment: [
      "Node.js",
      "Express.js",
      "MongoDB",
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
};

type SkillCategory = keyof typeof skillData;

const categories = [
  {
    id: "foundations",
    label: "CORE CS",
    icon: Brain,
    active:
      "bg-linear-to-r from-[#ffd064] to-[#ffc23d] text-black border-[#14372b] shadow-[0_5px_0_#14372b]",
    pill: "bg-linear-to-r from-[#ffd064] to-[#ffc23d] text-black border-[#14372b]",
    accent: "text-[#ffd064]",
  },
  {
    id: "frontend",
    label: "FRONTEND",
    icon: MonitorSmartphone,
    active:
      "bg-linear-to-r from-[#06d59f] to-[#05ba88] text-black border-[#14372b] shadow-[0_5px_0_#14372b]",
    pill: "bg-linear-to-r from-[#06d59f] to-[#05ba88] text-black border-[#14372b]",
    accent: "text-[#06d59f]",
  },
  {
    id: "real_time_system",
    label: "DATABASES & TOOLS",
    icon: Radio,
    active:
      "bg-linear-to-r from-[#ea476d] to-[#d6496a] text-black border-[#14372b] shadow-[0_5px_0_#14372b]",
    pill: "bg-linear-to-r from-[#ea476d] to-[#d6496a] text-black border-[#14372b]",
    accent: "text-[#ea476d]",
  },
  {
    id: "backend",
    label: "BACKEND SYSTEMS",
    icon: ServerCog,
    active:
      "bg-linear-to-r from-[#118ab0] to-[#1084a5] text-black border-[#14372b] shadow-[0_5px_0_#14372b]",
    pill: "bg-linear-to-r from-[#118ab0] to-[#1084a5] text-black border-[#14372b]",
    accent: "text-[#118ab0]",
  },
];

const Stat = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="bg-[#2f7c64] border-[3px] border-[#5f9b89] rounded-2xl px-4 py-3 shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
      <p className="text-xs uppercase tracking-wider text-[#cdd6cf] font-bold">
        {label}
      </p>

      <p className="text-2xl font-black text-white mt-1">{value}</p>
    </div>
  );
};

const Skills = ({ musicEnabled = false }: { musicEnabled?: boolean }) => {
  const [activeTab, setActiveTab] = useState<SkillCategory>("foundations");

  const activeCategory = categories.find((item) => item.id === activeTab)!;

  const ActiveIcon = activeCategory.icon;

  const currentData = skillData[activeTab];

  const equipmentPositions = useMemo(() => {
    const positions = [
      { x: 15, y: 15 },
      { x: 150, y: 25 },

      { x: 40, y: 90 },
      { x: 170, y: 120 },

      { x: 20, y: 180 },
      { x: 140, y: 210 },

      { x: 35, y: 280 },
      { x: 180, y: 310 },

      { x: 20, y: 380 },
      { x: 145, y: 420 },

      { x: 50, y: 490 },
      { x: 170, y: 520 },
    ];

    return currentData.equipment.map((item, index) => ({
      name: item,
      ...positions[index],
      rotate: ((index * 3) % 8) - 4,
    }));
  }, [activeTab]);

  const constraintsRef = useRef<HTMLDivElement>(null);

  const [tabReady, setTabReady] = useState(false);

  useEffect(() => {
    setTabReady(false);
    const id = requestAnimationFrame(() => setTabReady(true));
    return () => cancelAnimationFrame(id);
  }, [activeTab]);

  const equipmentTextColor =
    activeTab === "frontend" || activeTab === "real_time_system"
      ? "text-white"
      : "text-black";

  return (
    <section
      id="skills"
      className="min-h-screen bg-[#0e5d3f] px-6 pt-18 pb-20 md:pt-26 overflow-hidden"
    >
      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-[0.08em] text-transparent bg-clip-text bg-linear-to-r from-white via-[#fff7b3] to-white drop-shadow-[0_5px_0_#082b22]">
          SKILLS • LOADOUT
        </h1>

        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-base sm:text-xl md:text-2xl font-bold text-white">
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [-8, 8, -8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Joystick
              size={32}
              className="text-[#fff7b3] drop-shadow-[0_0_12px_rgba(255,247,179,0.8)]"
            />
          </motion.div>

          <span>
            Choose your class • Prove your mastery • Level up your game
          </span>
        </div>
      </motion.div>

      {/* Tabs */}

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          delay: 0.3,
        }}
        className="flex flex-wrap justify-center gap-5 mb-14"
      >
        {categories.map((tab, index) => {
          const TabIcon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + index * 0.08,
                duration: 0.5,
              }}
              onClick={() => {
                if (musicEnabled) {
                  playClickSound();
                }

                setActiveTab(tab.id as SkillCategory);
              }}
              className={`group px-8 py-5 rounded-3xl border-4 font-black text-lg cursor-pointer hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all duration-200 ${
                activeTab === tab.id
                  ? tab.active
                  : "bg-[#2c775d] text-white border-[#143d32] shadow-[0_5px_0_#082b22]"
              }`}
            >
              <TabIcon size={22} className="mr-3 inline-block" />
              {tab.label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Skills Grid */}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.8fr_0.9fr] gap-6 items-start">
        {/* LEFT CARD */}

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="bg-[#1d6d52] border-[5px] border-[#08382d] rounded-[30px] p-6 md:p-8 shadow-[10px_10px_0_#03271f]"
        >
          {/* Header */}

          <div className="flex items-center gap-5">
            <ActiveIcon
              size={52}
              className={`${activeCategory.accent} drop-shadow-[0_0_15px_currentColor]`}
            />

            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.25)]">
                {currentData.title}
              </h2>

              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck size={16} className={`${activeCategory.accent}`} />
                <p className="text-[#cdd6cf] text-sm md:text-base font-bold">
                  {currentData.level}
                </p>
              </div>
            </div>
          </div>

          <div className="h-1 bg-[#5f9b89] mt-5 mb-6 rounded-full" />

          {/* Achievements */}

          <div className="flex items-center gap-3 mb-4 mt-2">
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Trophy
                size={22}
                className="text-[#fff7b3] drop-shadow-[0_0_12px_rgba(255,247,179,0.8)]"
              />
            </motion.div>
            <h3 className="text-[#d7ddd9] text-xl md:text-2xl font-black uppercase tracking-wide">
              Achievements Unlocked
            </h3>
          </div>

          <div className="space-y-3">
            {currentData.achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.15 + index * 0.1,
                }}
                whileHover={{
                  x: 6,
                }}
                className="bg-[#2f7c64] border-[3px] border-[#5f9b89] rounded-2xl px-5 py-4 shadow-[6px_6px_0_rgba(0,0,0,0.22)]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activeTab === "foundations"
                        ? "bg-[#ffd064]"
                        : activeTab === "frontend"
                          ? "bg-[#06d59f]"
                          : activeTab === "real_time_system"
                            ? "bg-[#ea476d]"
                            : "bg-[#118ab0]"
                    }`}
                  />

                  <p className="text-white font-bold text-base">
                    {achievement}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* RIGHT CARD */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hidden lg:block min-h-130 bg-[#1d6d52] border-[5px] border-[#08382d] rounded-[30px] p-5 shadow-[10px_10px_0_#03271f]"
        >
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Package
                size={22}
                className="text-[#fff7b3] drop-shadow-[0_0_12px_rgba(255,247,179,0.8)]"
              />
            </motion.div>

            <h3 className="text-[#d7ddd9] text-xl md:text-2xl font-black uppercase tracking-wide">
              Equipments
            </h3>
          </div>
          <div
            ref={constraintsRef}
            className="relative h-105 overflow-hidden rounded-2xl border-3 border-[#fff7b3] p-6"
          >
            {tabReady &&
              equipmentPositions.map((item, index) => (
                <motion.div
                  key={item.name}
                  drag
                  dragConstraints={constraintsRef}
                  dragMomentum={false}
                  dragElastic={0.4}
                  whileHover={{
                    scale: 1.08,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileDrag={{
                    scale: 1.15,
                    zIndex: 999,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  style={{
                    position: "absolute",
                    left: item.x,
                    top: item.y,
                    transform: `rotate(${item.rotate}deg)`,
                    zIndex: 1,
                  }}
                  className={`cursor-grab select-none px-4 py-2 rounded-xl border-4 text-sm font-black shadow-[0_0_15px_rgba(255,247,179,0.35)] ${equipmentTextColor} ${activeCategory.pill}`}
                >
                  {item.name}
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;