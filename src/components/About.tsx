"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Target } from "lucide-react";
import {
  Wrench,
  Zap,
  Server,
  Database,
  Brain,
  Network,
  Cpu,
  Trophy,
} from "lucide-react";
import { playClickSound } from "../utils/sound";

const Counter = ({ value, start }: { value: number; start: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;

    const duration = 1200;
    const increment = value / 40;

    const interval = setInterval(() => {
      current += increment;

      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / 40);

    return () => clearInterval(interval);
  }, [start, value]);

  return <>{count}</>;
};

const About = ({ musicEnabled = false }: { musicEnabled?: boolean }) => {
  const [hovering, setHovering] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [pushes,setPushes] = useState(0);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setHovering(true);

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -15;
    const rotateY = ((x - rect.width / 2) / rect.width) * 15;

    setMouse({
      x: rotateY,
      y: rotateX,
      scale: 1,
    });
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setMouse({
      x: 0,
      y: 0,
      scale: 1,
    });
  };

  useEffect(()=>{
    async function getPushes(){
      const res = await fetch("/api/github");
      const data = await res.json();

      setPushes(data.pushes);
    }

    getPushes();
  },[]);

  return (
    <section
      id="about"
      className="min-h-screen bg-[#0e5d3f] px-6 md:px-6 pb-10 pt-16 md:pt-24 mt-10 overflow-hidden"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-[0.08em] text-transparent bg-clip-text bg-linear-to-r from-white via-[#fff7b3] to-white drop-shadow-[0_5px_0_#082b22]">
          ABOUT • PLAYER
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
            <Gamepad2
              size={32}
              className="text-[#fff7b3] drop-shadow-[0_0_12px_rgba(255,247,179,0.8)]"
            />
          </motion.div>

          <span>
            Computer Science Engineering Student • Full-Stack Developer • Problem Solver
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-14 max-w-7xl mx-auto items-start">
        {/* LEFT SIDE */}

        <div className="space-y-8 h-full">
          {/* Mission Card */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className=" bg-[#1e684e] rounded-[30px] border-4 border-[#143d32] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.3),8px_8px_0_#082b22]"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-black text-white flex items-center gap-5"
            >
              <Target size={38} className="text-[#fff7b3]" />
              MISSION
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35,
                duration: 0.7,
              }}
              className="mt-6 text-white text-base md:text-xl leading-relaxed font-semibold"
            >
              I&apos;m a Computer Science Engineering student who enjoys turning
              ideas into working software. I&apos;m focused on strengthening my
              foundations in DSA and core computer science while building practical
              applications with modern web technologies and exploring AI/ML.
            </motion.p>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <motion.button
                onClick={() => {
                  if (musicEnabled) {
                    playClickSound();
                  }

                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-linear-to-r from-[#ffd064] to-[#ffc23d] text-black font-black px-5 md:px-8 py-3 md:py-4 rounded-2xl border-[3px] border-[#b88915] shadow-[0_5px_0_#000] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all duration-200 cursor-pointer"
              >
                EXPLORE WORK →
              </motion.button>

              <motion.button
                onClick={() => {
                  if (musicEnabled) {
                    playClickSound();
                  }

                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-linear-to-r from-[#06d49f] to-[#05ba87] text-white font-black px-8 py-4 rounded-2xl border-[3px] border-[#047e60] shadow-[0_5px_0_#000] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all duration-200 cursor-pointer"
              >
                LET'S CONNECT
              </motion.button>
            </div>
          </motion.div>

          {/* Core abilities */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="bg-[#1e684e] rounded-[30px] border-4 border-[#143d32] p-5 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.3),8px_8px_0_#082b22]"
          >
            <div className="flex items-center gap-5 mb-8">
              <Wrench size={40} className="text-[#fff7b3]" />
              <h2 className="text-4xl font-black text-white tracking-wide">
                CORE ABILITIES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  name: "Frontend",
                  level: "React • Vite • Tailwind",
                  icon: <Zap size={30} />,
                  power: 80,
                },
                {
                  name: "Backend",
                  level: "Node.js • Express",
                  icon: <Server size={30} />,
                  power: 75,
                },
                {
                  name: "Database",
                  level: "MongoDB • MySQL • PostgreSQL",
                  icon: <Database size={30} />,
                  power: 75,
                },
                {
                  name: "Programming",
                  level: "Java • Python • JavaScript",
                  icon: <Cpu size={30} />,
                  power: 80,
                },
                {
                  name: "AI / ML",
                  level: "Exploring AI/ML & intelligent applications",
                  icon: <Brain size={30} />,
                  power: 70,
                },
                {
                  name: "Problem Solving",
                  level: "DSA • OOP • Core CS",
                  icon: <Network size={30} />,
                  power: 80,
                },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    rotateX: -20,
                    filter: "blur(8px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    rotate: index % 2 === 0 ? 2 : -2,
                    boxShadow: "0px 10px 20px rgba(6,198,146,0.25)",
                  }}
                  className="relative overflow-hidden bg-[#215f49] border-[3px] border-[#5ca88c] rounded-3xl p-5 cursor-pointer shadow-[5px_5px_0_#082b22]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#fff7b3] to-[#06c692] flex items-center justify-center shadow-[0_0_20px_rgba(6,198,146,0.5)] text-[#143d32]">
                      {skill.icon}
                    </div>

                    <div>
                      <h3 className="text-white font-black text-sm md:text-lg">
                        {skill.name}
                      </h3>
                      <p className="text-[#06c692] font-bold text-sm">
                        {skill.level}
                      </p>

                      <div className="mt-3 w-full max-w-40 h-2 bg-[#143d32] rounded-full overflow-hidden border border-[#4b9279]">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width: `${skill.power}%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.1,
                            ease: "easeOut",
                          }}
                          className="h-full bg-linear-to-r from-[#06c692] to-[#fff7b3] rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE CHARACTER CARD */}

        <div className="hidden lg:block space-y-8">
          {/* CHARACTER CARD */}
          <motion.div
            onMouseEnter={() => setHovering(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{
              opacity: 0,
              x: 120,
              rotateY: 20,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotateY: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            animate={{
              rotateY: mouse.x,
              rotateX: mouse.y,
              scale: mouse.scale,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15,
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
            className="relative bg-[#fffdf4] rounded-[35px] border-[5px] border-[#143d32] shadow-[10px_10px_0_#082b22] p-5"
          >
            {/* Rank Badge */}

            <motion.div
              initial={{
                y: -70,
                opacity: 0,
                scale: 0.5,
                rotate: -15,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
                delay: 0.7,
              }}
              className="absolute top-7 left-5 z-10 bg-white border-[3px] border-[#143d32] px-5 py-2 rounded-xl font-black text-[#143d32] shadow-[3px_3px_0_#143d32]"
            >
              RANK S
            </motion.div>

            {/* Inner Character Frame */}

            <div className="relative mt-4 rounded-[30px] border-[5px] border-[#ff8a00] h-180 overflow-hidden flex items-center justify-center bg-[#194e3a]">
              {/* Subtle Grid Background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Player Tag at Top-Right */}
              <div className="absolute top-5 right-5 z-20 bg-[#143d32]/90 border-2 border-[#5ca88c] rounded-xl px-3 py-1.5 backdrop-blur-xs shadow-[3px_3px_0_#082b22] flex items-center gap-2 select-none">
                <span className="w-2 h-2 rounded-full bg-[#06d49f] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#ffd064] font-bold">
                  PLAYER 1 // VINAYAK SHARMA
                </span>
              </div>

              {/* Robot Character Illustration with Mouse Parallax */}
              <motion.img
                src="/images/portfolio-profile.png"
                alt="Vinayak Sharma — Robot Avatar"
                animate={{
                  x: mouse.x * 1.5,
                  y: mouse.y * 1.5,
                  scale: 1.05,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="w-full h-full object-contain scale-125 z-10 select-none pointer-events-none"
              />

              {/* Bottom Stats */}

              <motion.div
                initial={{
                  y: 80,
                  opacity: 0,
                }}
                animate={{
                  y: hovering ? 0 : 80,
                  opacity: hovering ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 z-20"
              >
                <div className="bg-[#fff7b3] border-[3px] border-[#143d32] px-4 py-1 rounded-xl font-black text-[#143d32] shadow-[3px_3px_0_#143d32] flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>

                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                  </span>
                  Available for Work
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* PLAYER STATS CARD */}

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-[#1e684e] rounded-[30px] border-4 border-[#143d32] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.3),8px_8px_0_#082b22]"
          >
            <div className="flex items-center gap-4 mb-4">
              <Trophy size={42} className="text-[#fff7b3]" />
              <h2 className="text-4xl font-black text-white tracking-wide">
                PLAYER STATS
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-6">
              {[
                {
                  value: 3,
                  label: "PROJECTS",
                  color: "text-white",
                },
                {
                  value: 18,
                  label: "STACK",
                  color: "text-[#06d49f]",
                },
                {
                  value: pushes,
                  label: "PUSHES",
                  color: "text-[#ffc23d]",
                },
              ].map((stat, index) => (
                <motion.div
                  onViewportEnter={() => setStatsStarted(true)}
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.04,
                  }}
                  className="h-20 md:h-24 rounded-2xl border-[3px] border-[#5ca88c] bg-[#215f49] flex flex-col items-center justify-center shadow-[4px_4px_0_#082b22]"
                >
                  <h3 className={`text-4xl font-black ${stat.color}`}>
                    <Counter value={stat.value} start={statsStarted} />
                  </h3>

                  <p className="text-white font-black text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
