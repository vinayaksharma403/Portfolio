"use client";

import React from "react";
import { motion } from "framer-motion";
import { playClickSound } from "../utils/sound";
import AstronautScene from "./AstronautScene";

const Hero = ({
  musicEnabled = false,
  started = false,
}: {
  musicEnabled?: boolean;
  started?: boolean;
}) => {
  const tech = [
    "Problem Solver",
    "Full-Stack Developer",
    "AI/ML Explorer",
    "DSA Enthusiast",
    "Software Engineering",
  ];

  const statCards = [
    {
      title: "Current Focus",
      value: "Full-Stack + AI/ML",
    },
    {
      title: "Core Strength",
      value: "DSA + Problem Solving",
    },
    {
      title: "Building",
      value: "Real-World Applications",
    },
    {
      title: "Goal",
      value: "Software Engineer",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen bg-[#fff7b3] px-6 md:pl-36 pt-18 flex items-center"
    >
      <div className="w-full flex flex-col md:flex-row gap-5">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={started ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="border-2 border-black rounded-md bg-white px-3 py-1 font-bold text-xs text-[#2a2a2a] hover:scale-105 hover:-translate-y-1 transition">
                ONLINE
              </div>

              <span className="text-[#6a7377] text-xs uppercase">
                Developer Profile
              </span>
            </div>
          </motion.div>

          {/* Heading */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={started ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
          >
            <h1 className="text-6xl md:text-6xl text-[#2a2a2a] leading-[0.95] tracking-tight font-extrabold">
              Hi, I&apos;m <span className="text-[#ff7e00]">Vinayak</span>
              <br />
              <span className="text-[#ffce00]">Dev</span> & Creator
            </h1>
          </motion.div>

          {/* Description */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{
              duration: 0.9,
              delay: 0.25,
            }}
          >
            <p className="mt-8 text-xl text-gray-800 max-w-xl leading-relaxed">
              I&apos;m a 3rd-year Computer Science Engineering student at Chitkara
              University who enjoys building practical software, solving problems
              with code, and exploring the intersection of full-stack development
              and AI/ML.
            </p>
          </motion.div>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={started ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{
              duration: 0.9,
              delay: 0.4,
            }}
          >
            <div className="flex gap-5 mt-10">
              <button
                onClick={() => {
                  if (musicEnabled) {
                    playClickSound();
                  }

                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="group bg-[#ff6b6b] text-white font-bold px-8 py-4 rounded-lg border-[3px] border-black shadow-[0_5px_0_#000] 
hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all duration-200 cursor-pointer"
              >
                <span className="flex items-center gap-2">View Projects →</span>
              </button>

              <button
                onClick={() => {
                  if (musicEnabled) {
                    playClickSound();
                  }

                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="group bg-white text-black font-semibold px-8 py-4 rounded-lg border-[3px] border-black hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all duration-200 shadow-[0_5px_0_#000] cursor-pointer"
              >
                Hire Me
              </button>
            </div>
          </motion.div>

          {/* Tech Badges */}

          <div className="flex flex-wrap gap-3 mt-11">
            {tech.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 15 }}
                animate={
                  started ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -4,
                  rotate: index % 2 === 0 ? 2 : -2,
                  scale: 1.04,
                  transition: {
                    duration: 0.15,
                  },
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="bg-[#fff7b3] border-2 border-black rounded-md px-3 py-2 text-xs font-semibold text-black"
              >
                {item}
              </motion.div>
            ))}
          </div>

          {/* Profile Cards */}

          <div className="grid grid-cols-2 gap-7 mt-13 max-w-lg">
            {statCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  started ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }
                }
                transition={{
                  duration: 0.5,
                  delay: 1 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  rotate: 0,
                  transition: {
                    duration: 0.15,
                  },
                }}
                className={`bg-white border-2 border-black rounded-xl px-5 py-4 shadow-[4px_4px_0_#000] ${index % 2 === 0 ? "-rotate-2" : "rotate-2"}`}
              >
                <h3 className="font-bold text-[#2a2a2a] text-sm">
                  {card.title}
                </h3>

                <p className="text-[#6a7377] text-sm mt-2">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex w-full md:w-1/2 min-h-150 items-center justify-center">
          <motion.div
            initial={{
              opacity: 0,
              y: -250,
              rotate: -8,
              scale: 0.85,
            }}
            animate={{
              opacity: started ? 1 : 0,
              y: started ? 0 : -250,
              rotate: started ? 0 : -8,
              scale: started ? 1 : 0.85,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full h-full md:-translate-x-2.5"
          >
            <AstronautScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
