"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound } from "../utils/sound";

export default function BootLoader({
  setStarted,
  setMusicEnabled,
}: {
  setStarted: (value: boolean) => void;
  setMusicEnabled: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing system...");
  const [ready, setReady] = useState(false);

  const enterPortfolio = (mode: "music" | "silent") => {
    const enabled = mode === "music";

    if (enabled) {
      playClickSound();
    }

    setMusicEnabled(enabled);
    setStarted(true);
    setLoading(false);
  };

  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 100;
          }

          const next = prev + Math.floor(Math.random() * 6) + 2;

          return next >= 100 ? 100 : next;
        });
      }, 150);

      const timer = setInterval(() => {
        setStatus((prev) => {
          if (prev === "Initializing system...") return "Loading assets...";
          if (prev === "Loading assets...") return "Compiling experience...";
          if (prev === "Compiling experience...")
            return "Finalizing boot sequence...";

          return prev;
        });
      }, 700);

      const finish = setTimeout(() => {
        setProgress(100);
        setReady(true);
        setStatus("Boot sequence complete.");
        clearInterval(interval);
      }, 4500);

      return () => {
        clearInterval(interval);
        clearInterval(timer);
        clearTimeout(finish);
      };
    }, 50);

    return () => clearTimeout(start);
  }, []);

const SQUARES = [
  { left: 8, top: 12, delay: 0.2 },
  { left: 24, top: 82, delay: 1.4 },
  { left: 42, top: 28, delay: 0.7 },
  { left: 68, top: 74, delay: 2.1 },
  { left: 85, top: 18, delay: 0.9 },
  { left: 14, top: 65, delay: 1.8 },
  { left: 92, top: 58, delay: 2.5 },
  { left: 35, top: 48, delay: 0.4 },
  { left: 55, top: 15, delay: 1.2 },
  { left: 78, top: 88, delay: 2.8 },
  { left: 5, top: 40, delay: 0.6 },
  { left: 62, top: 42, delay: 1.9 },
  { left: 19, top: 90, delay: 2.3 },
  { left: 48, top: 85, delay: 0.8 },
  { left: 72, top: 30, delay: 1.5 },
  { left: 88, top: 70, delay: 0.3 },
  { left: 30, top: 10, delay: 2.0 },
  { left: 95, top: 25, delay: 1.1 },
  { left: 50, top: 60, delay: 2.7 },
  { left: 12, top: 32, delay: 1.6 },
  { left: 80, top: 52, delay: 0.5 },
  { left: 28, top: 70, delay: 2.2 },
];

  useEffect(() => {
  if (loading) {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };
}, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 overflow-hidden bg-[#fff7b3] flex items-center justify-center px-6"
        >
          {/* FLOATING BACKGROUND */}

          {SQUARES.map((square, i) => (
            <motion.div
              key={i}
              className="absolute w-5 h-5 border-2 border-black/60 bg-white/40 rounded-md"
              style={{
                left: `${square.left}%`,
                top: `${square.top}%`,
              }}
              animate={{
                y: [0, -18, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: square.delay,
              }}
            />
          ))}

          <motion.div
            initial={{
              scale: 0.9,
              y: 20,
            }}
            animate={{
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
          relative
          w-full
          max-w-2xl
          bg-white
          border-4
          border-black
          rounded-xl
          shadow-[7px_7px_0_#000]
          overflow-hidden
          "
          >
            {/* HEADER */}

            <div
              className="
            bg-[#fff7b3]
            border-b-4
            border-black
            px-6
            py-4
            flex
            justify-between
            items-center
            "
            >
              <div className="flex gap-4 items-center">
                <div
                  className="
                border-[3px]
                border-black
                bg-white
                px-4
                py-1
                rounded-lg
                font-bold text-black
                "
                >
                  LAUNCHER
                </div>

                <motion.span
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="font-mono text-gray-500"
                >
                  // Boot Sequence
                </motion.span>
              </div>

              <div className="flex gap-3">
                <div className="w-4 h-4 bg-orange-500 border-2 border-black rounded-full" />

                <div className="w-4 h-4 bg-gray-400 border-2 border-black rounded-full" />
              </div>
            </div>

            <div className="p-7">
              <p className="font-mono text-xl text-gray-700">
                &gt; Ready to Enter Portfolio
              </p>

              <p className="font-mono mt-3 text-gray-500">{status}</p>

              {ready && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-4 text-[#ffb000] font-mono"
                >
                  &gt; Awaiting user input...
                </motion.p>
              )}

              {/* PROGRESS */}

              <div className="mt-4 flex justify-between font-mono text-gray-600">
                <span>Installation Progress</span>

                <span>{progress}%</span>
              </div>

              <div
                className="
              mt-2
              h-5
              border-[3px]
              border-black
              rounded-lg
              overflow-hidden
              "
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                h-full
                bg-linear-to-r
                from-[#ff7e00]
                via-[#ffb347]
                to-[#777]
                "
                />
              </div>

              <div className="flex justify-between mt-4 text-sm font-mono text-gray-500">
                <span>Assets: {progress}%</span>

                <span>Shaders: {Math.min(progress + 10, 100)}%</span>

                <span>Network: Online</span>
              </div>

              {ready && (
                <div className="grid grid-cols-2 gap-5 mt-8">
                  <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{
                      y: 4,
                      boxShadow: "0px 0px 0px #000",
                    }}
                    onClick={() => enterPortfolio("music")}
                    className="
                bg-[#ff6b6b]
                text-white
                font-bold
                px-6
                py-4
                rounded-lg
                border-[3px]
                border-black
                shadow-[0_5px_0_#000]
                transition-all
                duration-200
                cursor-pointer
                "
                  >
                    Enter With Sound
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{
                      y: 4,
                      boxShadow: "0px 0px 0px #000",
                    }}
                    onClick={() => enterPortfolio("silent")}
                    className="
                bg-white
                text-black
                font-bold
                px-6
                py-4
                rounded-lg
                border-[3px]
                border-black
                shadow-[0_5px_0_#000]
                transition-all
                duration-200
                cursor-pointer
                "
                  >
                    Enter Silent
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
