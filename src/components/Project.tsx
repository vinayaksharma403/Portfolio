"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { playClickSound } from "../utils/sound";
import { FaGithub } from "react-icons/fa";
import { PORTFOLIO_DATA } from "../data/portfolioData";

const projects = PORTFOLIO_DATA.projects;

const bootMessages = [
  "Connecting...",
  "Loading Project...",
  "Reading Repository...",
  "Rendering Preview...",
  "Boot Complete.",
];

function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (line >= bootMessages.length) return;

    let char = 0;

    const interval = setInterval(() => {
      char++;

      setTyped(bootMessages[line].slice(0, char));

      if (char === bootMessages[line].length) {
        clearInterval(interval);

        setTimeout(() => {
          if (line === bootMessages.length - 1) {
            onComplete();
          } else {
            setLine((p) => p + 1);
            setTyped("");
          }
        }, 150);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [line, onComplete]);

  return (
    <div className="md:min-h-93 min-h-162 p-8 font-mono text-lg text-gray-500">
      {bootMessages.slice(0, line).map((msg) => (
        <div key={msg}>&gt; {msg}</div>
      ))}

      {line < bootMessages.length && (
        <div>
          &gt; {typed}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            _
          </motion.span>
        </div>
      )}
    </div>
  );
}

export default function Projects({
  musicEnabled = false,
}: {
  musicEnabled?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingProject, setPendingProject] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const current = projects[activeProject];

  const switchProject = (index: number) => {
    if (isLoading || index === activeProject) return;
    setSelected(index);
    setPendingProject(index);
    setIsLoading(true);
  };

  const prev = () => {
    switchProject(
      activeProject === 0 ? projects.length - 1 : activeProject - 1,
    );
  };
  const next = () => {
    switchProject(
      activeProject === projects.length - 1 ? 0 : activeProject + 1,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === "Escape") {
          setIsLightboxOpen(false);
          return;
        }
        const currentProjectImages = projects[activeProject]?.images;
        if (currentProjectImages && currentProjectImages.length > 0) {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            if (musicEnabled) playClickSound();
            setLightboxIndex((prev) =>
              prev === 0 ? currentProjectImages.length - 1 : prev - 1
            );
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            if (musicEnabled) playClickSound();
            setLightboxIndex((prev) =>
              prev === currentProjectImages.length - 1 ? 0 : prev + 1
            );
          }
        }
        return;
      }

      const section = document.getElementById("projects");

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const isVisible =
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3;

      if (!isVisible) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();

        const nextIndex =
          activeProject === projects.length - 1 ? 0 : activeProject + 1;

        switchProject(nextIndex);
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();

        const prevIndex =
          activeProject === 0 ? projects.length - 1 : activeProject - 1;

        switchProject(prevIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, isLoading, isLightboxOpen, musicEnabled]);

  return (
    <section id="projects" className="min-h-screen overflow-x-hidden px-4 pt-21 pb-5">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-[0.08em] text-transparent bg-clip-text bg-linear-to-r from-[#111] via-[#444] to-[#111] drop-shadow-[2px_2px_0_rgba(0,0,0,0.15)]"
          >
            PROJECTS
          </h1>

          <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 text-base sm:text-xl md:text-2xl font-bold text-[#222]">
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [-8, 8, -8],
                filter: [
                  "drop-shadow(0 0 4px rgba(255,122,0,0.25))",
                  "drop-shadow(0 0 12px rgba(255,122,0,0.6))",
                  "drop-shadow(0 0 4px rgba(255,122,0,0.25))",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FolderGit2 size={32} className="text-[#ff7a00]" />
            </motion.div>
            <span className="font-semibold">
              Browse my builds • Open project dossier • Inspect the source
            </span>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* LEFT PANEL: SWITCHBOARD */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="hidden lg:block w-full max-w-95 min-w-0 overflow-hidden rounded-[28px] border-4 border-[#222] bg-[#f5f5f5] shadow-[8px_8px_0_#111]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-4 border-[#222] bg-[#efe9b5] px-6 py-4">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-black tracking-[0.08em] text-[#111] text-sm"
              >
                SWITCHBOARD
              </motion.span>

              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[10px] md:text-[10px] text-gray-500 font-mono"
              >
                Route signal to project archive
              </motion.span>
            </div>

            {/* List */}
            <div className="space-y-5 p-6">
              {projects.map((exp, index) => (
                <div
                  key={exp.name}
                  className={`flex items-center justify-between gap-3 rounded-xl border-4 border-[#222] px-4 py-5 transition-all duration-300 text-black
                    ${
                      selected === index
                        ? "bg-[#ffd100] shadow-[0_8px_0_#222]"
                        : "bg-white hover:translate-y-0.5 shadow-[0_6px_0_#222]"
                    }
                  `}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <motion.div
                      animate={{
                        scale: selected === index ? [1, 1.15, 1] : 1,
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: selected === index ? Infinity : 0,
                      }}
                      className={`h-3 w-3 shrink-0 rounded-full border-2 border-[#444]
                        ${
                          selected === index
                            ? "bg-[#8c7d32] shadow-[0_0_10px_rgba(140,125,50,0.6)]"
                            : "bg-[#efe9b5]"
                        }
                        `}
                    />

                    <span className="font-black text-sm leading-tight break-words">{exp.name}</span>
                  </div>

                  <button
                    disabled={isLoading}
                    onClick={() => {
                      if (musicEnabled) playClickSound();
                      switchProject(index);
                    }}
                    className={`relative h-10 w-16 shrink-0 rounded-full border-4 border-[#2d2d2d]
    ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
    ${
      selected === index
        ? "bg-linear-to-r from-[#ffe36a] via-[#ffd100] to-[#e6bc00]"
        : "bg-[#efe9b5]"
    }
    shadow-[0_3px_0_#222] active:translate-y-0.5 active:shadow-none overflow-hidden`}
                  >
                    <motion.div
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="absolute top-0.75 left-0.75 h-6 w-6 rounded-full border-4 border-[#333] bg-[#f4f4f4] shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                      animate={{
                        x: selected === index ? 26 : 0,
                        rotate: selected === index ? 180 : 0,
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t-4 border-[#222] bg-[#efe9b5] px-6 py-4 text-xs text-gray-600">
              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[10px] md:text-[10px] text-gray-500 font-mono"
              >
                ↑ ↓ Arrow keys navigate • Toggles select
              </motion.span>
            </div>
          </motion.div>

          {/* RIGHT PANEL: PROJECT ARCHIVE TERMINAL */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "easeInOut",
            }}
            className="overflow-hidden rounded-[28px] border-4 border-[#222] bg-[#f7f7f7] shadow-[8px_8px_0_#111]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-4 border-[#222] bg-[#efe9b5] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full border-2 border-[#222] bg-red-400" />
                <div className="h-4 w-4 rounded-full border-2 border-[#222] bg-yellow-400" />
                <div className="h-4 w-4 rounded-full border-2 border-[#222] bg-green-400" />

                <span className="ml-2 text-[10px] sm:text-xs md:ml-4 md:text-base font-black tracking-tight text-[#111] leading-tight">
                  PROJECT ARCHIVE TERMINAL
                </span>
              </div>

              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden lg:block text-[10px] md:text-[10px] text-gray-500 font-mono"
              >
                Signal Routed from Switchboard
              </motion.span>
            </div>

            {/* Terminal Viewport */}
            <div className="relative min-h-105 bg-[#f8f8f8] p-4 sm:p-6">
              {/* Scanlines */}
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, #000 3px)",
                }}
              />

              {isLoading ? (
                <BootLoader
                  onComplete={() => {
                    if (pendingProject !== null) {
                      setActiveProject(pendingProject);
                      setActiveImageIndex(0);
                    }

                    setPendingProject(null);
                    setIsLoading(false);
                  }}
                />
              ) : (
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  className="relative z-10 space-y-6"
                >
                  {/* TOP ROW: VISUAL PREVIEW / SCREENSHOT GALLERY + DETAILS */}
                  <div className="grid gap-6 grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                    {/* LEFT COLUMN: SCREENSHOT VIEWER OR RETRO DOSSIER */}
                    {current.images && current.images.length > 0 ? (
                      <div className="flex flex-col gap-2.5">
                        {/* Main Screenshot Preview Card */}
                        <div className="group relative overflow-hidden rounded-2xl border-4 border-[#222] bg-[#143d32] shadow-[0_6px_0_#222] flex flex-col justify-between select-none">
                          {/* Top Bar of Screenshot Window */}
                          <div className="relative z-10 flex items-center justify-between border-b-2 border-[#222] bg-[#efe9b5] px-3 sm:px-4 py-2 text-[#111]">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="border-2 border-[#222] bg-[#ffd100] px-2 py-0.5 rounded-md text-[10px] font-mono font-black tracking-wider text-[#111] uppercase shrink-0">
                                {current.badge}
                              </span>
                              <span className="font-mono text-[11px] sm:text-xs font-black truncate text-[#222]">
                                {current.images[activeImageIndex]?.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#555] bg-white/90 px-1.5 sm:px-2 py-0.5 rounded border border-[#222]">
                                {activeImageIndex + 1} / {current.images.length}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (musicEnabled) playClickSound();
                                  setLightboxIndex(activeImageIndex);
                                  setIsLightboxOpen(true);
                                }}
                                aria-label="Enlarge screenshot"
                                className="flex items-center gap-1 rounded-md border-2 border-[#222] bg-white px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-[#111] shadow-[2px_2px_0_#222] hover:bg-[#ffd100] transition-colors cursor-pointer"
                              >
                                <Maximize2 size={12} />
                                <span className="hidden sm:inline">ZOOM</span>
                              </button>
                              {current.github && (
                                <a
                                  href={current.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="View source on GitHub"
                                  className="flex items-center justify-center h-6 w-6 rounded-md border-2 border-[#222] bg-[#111] text-white hover:bg-[#333] transition-colors"
                                >
                                  <FaGithub size={13} />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Main Image Display */}
                          <div
                            onClick={() => {
                              if (musicEnabled) playClickSound();
                              setLightboxIndex(activeImageIndex);
                              setIsLightboxOpen(true);
                            }}
                            className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden bg-[#0c241e] cursor-pointer group/img flex items-center justify-center"
                          >
                            {/* Subtle Scanlines overlay */}
                            <div
                              className="pointer-events-none absolute inset-0 z-10 opacity-15"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, #000 3px)",
                              }}
                            />

                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeImageIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.25 }}
                                className="relative h-full w-full"
                              >
                                <Image
                                  src={current.images[activeImageIndex].src}
                                  alt={current.images[activeImageIndex].alt}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                  className="object-contain transition-transform duration-300 group-hover/img:scale-[1.01]"
                                  priority
                                />
                              </motion.div>
                            </AnimatePresence>

                            {/* Hover zoom indicator overlay */}
                            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100">
                              <div className="flex items-center gap-2 rounded-xl border-3 border-[#222] bg-[#ffd100] px-3.5 py-1.5 font-black text-xs text-[#111] shadow-[4px_4px_0_#111]">
                                <ZoomIn size={16} />
                                <span>INSPECT SCREENSHOT</span>
                              </div>
                            </div>

                            {/* Left / Right Quick Arrows on Image */}
                            {current.images.length > 1 && (
                              <>
                                <button
                                  type="button"
                                  aria-label="Previous screenshot"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (musicEnabled) playClickSound();
                                    setActiveImageIndex((prev) =>
                                      prev === 0 ? current.images!.length - 1 : prev - 1
                                    );
                                  }}
                                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#222] bg-[#efe9b5] text-[#111] shadow-[2px_2px_0_#222] hover:bg-[#ffd100] active:scale-95 transition-all cursor-pointer opacity-90 hover:opacity-100"
                                >
                                  <ChevronLeft size={18} />
                                </button>
                                <button
                                  type="button"
                                  aria-label="Next screenshot"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (musicEnabled) playClickSound();
                                    setActiveImageIndex((prev) =>
                                      prev === current.images!.length - 1 ? 0 : prev + 1
                                    );
                                  }}
                                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#222] bg-[#efe9b5] text-[#111] shadow-[2px_2px_0_#222] hover:bg-[#ffd100] active:scale-95 transition-all cursor-pointer opacity-90 hover:opacity-100"
                                >
                                  <ChevronRight size={18} />
                                </button>
                              </>
                            )}
                          </div>

                          {/* Footer in Screenshot Card */}
                          <div className="relative z-10 flex items-center justify-between border-t-2 border-[#222] bg-[#efe9b5] px-4 py-1.5 font-mono text-[10px] sm:text-[11px] text-[#333]">
                            <span className="truncate mr-2 font-bold">{current.techSummary}</span>
                            <span className="shrink-0 font-black text-[#ff7a00]">VERIFIED APP</span>
                          </div>
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 select-none scrollbar-none">
                          {current.images.map((img, idx) => {
                            const isActive = activeImageIndex === idx;
                            return (
                              <button
                                key={img.src}
                                type="button"
                                onClick={() => {
                                  if (musicEnabled) playClickSound();
                                  setActiveImageIndex(idx);
                                }}
                                className={`group relative flex flex-col items-center shrink-0 rounded-xl border-3 transition-all duration-200 cursor-pointer overflow-hidden ${
                                  isActive
                                    ? "border-[#ff7a00] bg-[#ffd100] shadow-[0_4px_0_#222] -translate-y-0.5"
                                    : "border-[#222] bg-white opacity-70 hover:opacity-100 hover:-translate-y-0.5 shadow-[0_2px_0_#222]"
                                }`}
                                style={{ width: "88px" }}
                              >
                                <div className="relative h-12 w-full bg-[#143d32] overflow-hidden">
                                  <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="88px"
                                    className="object-cover object-top"
                                  />
                                </div>
                                <span
                                  className={`w-full truncate px-1 py-0.5 text-center font-mono text-[9px] font-bold ${
                                    isActive ? "text-[#111] font-black" : "text-[#555]"
                                  }`}
                                >
                                  {img.title}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Retro Graphic Card for Projects without Screenshots */
                      <motion.div
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        className="group relative h-52 md:h-56 overflow-hidden rounded-2xl border-4 border-[#222] bg-[#143d32] shadow-[0_6px_0_#222] flex flex-col justify-between p-5 select-none"
                      >
                        {/* Grid / CRT Overlay */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-15"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 1px 1px, rgba(255,255,255,.25) 1px, transparent 0)",
                            backgroundSize: "12px 12px",
                          }}
                        />

                        {/* Header in Preview */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="border-2 border-[#fff7b3]/40 bg-[#0e2c24] px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider text-[#fff7b3]">
                            {current.badge}
                          </span>
                          <div className="flex gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-[#ff7a00]" />
                            <div className="h-2 w-2 rounded-full bg-[#fff7b3]" />
                            <div className="h-2 w-2 rounded-full bg-[#06d59f]" />
                          </div>
                        </div>

                        {/* Center Project Name Display */}
                        <div className="relative z-10 my-auto text-center">
                          <span className="font-mono text-[10px] sm:text-xs text-[#06d59f] tracking-widest uppercase block mb-1">
                            // PROJECT DOSSIER
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-linear-to-r from-white via-[#fff7b3] to-white drop-shadow-[2px_2px_0_#05231c]">
                            {current.name.toUpperCase()}
                          </h3>
                        </div>

                        {/* Footer in Preview */}
                        <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-2 font-mono text-[10px] sm:text-[11px] text-[#cdd6cf]">
                          <span className="truncate mr-2">{current.techSummary}</span>
                          <span className="shrink-0 text-[#ffd100]">ACTIVE</span>
                        </div>

                        {/* Github Link */}
                        {current.github && (
                          <a
                            href={current.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View source on GitHub"
                            className="
                              absolute
                              top-3
                              right-3
                              z-20
                              flex
                              items-center
                              justify-center
                              h-10
                              w-10
                              rounded-lg
                              bg-black/75
                              backdrop-blur-sm
                              text-white
                              opacity-100
                              md:opacity-0
                              md:-translate-y-3
                              md:group-hover:opacity-100
                              md:group-hover:translate-y-0
                              transition-all
                              duration-300
                            "
                          >
                            <FaGithub size={20} />
                          </a>
                        )}
                      </motion.div>
                    )}

                    {/* RIGHT COLUMN: PROJECT DETAILS */}
                    <div className="flex flex-col min-w-0 flex-1 justify-between gap-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide bg-linear-to-r from-[#ff7a00] via-[#ffb347] to-[#ffd100] bg-clip-text text-transparent drop-shadow-[2px_2px_0_rgba(0,0,0,0.15)] -mt-1">
                          {current.title}
                        </h2>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#666]">
                          {current.tagline}
                        </p>

                        <p className="mt-3 text-[14px] sm:text-[15px] leading-6 sm:leading-7 text-[#444]">
                          {current.description}
                        </p>
                      </div>

                      {current.live && (
                        <motion.button
                          type="button"
                          onClick={() => {
                            if (musicEnabled) playClickSound();
                            window.open(current.live, "_blank", "noopener,noreferrer");
                          }}
                          className="mt-4 w-fit rounded-lg border-4 border-[#333] bg-[#ff6b6b] px-6 py-3 font-black text-white shadow-[0_5px_0_#222] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all duration-200 cursor-pointer"
                        >
                          <div className="flex gap-2 items-center">
                            VIEW PROJECT <ExternalLink size={18} />
                          </div>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* BOTTOM ROW: KEY FEATURES BULLETS */}
                  <div className="mt-2 border-t-2 border-[#222]/20 pt-4">
                    <span className="font-mono text-xs font-black uppercase tracking-widest text-[#666] mb-2 block">
                      // ARCHITECTURAL HIGHLIGHTS
                    </span>
                    <ul className="space-y-2">
                      {current.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm sm:text-base">
                          <span className="font-black text-[#ff7a00]">▸</span>
                          <span className="text-black font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between items-center justify-between border-t-4 border-[#222] bg-[#efe9b5] px-6 py-4">
              <div className="flex flex-wrap gap-3">
                <button
                  disabled={isLoading}
                  onClick={() => {
                    if (musicEnabled) playClickSound();
                    prev();
                  }}
                  className={`flex items-center gap-2 rounded-lg border-4 border-[#333]
    bg-linear-to-r from-[#60a5fa] via-[#3b82f6] to-[#2563eb]
    px-5 py-3 font-black text-white shadow-[0_5px_0_#222]
    transition-all duration-200
    ${
      isLoading
        ? "cursor-not-allowed opacity-50"
        : "cursor-pointer hover:-translate-y-1 active:translate-y-1 active:shadow-none"
    }`}
                >
                  <ChevronLeft size={18} />
                  PREV
                </button>

                <button
                  disabled={isLoading}
                  onClick={() => {
                    if (musicEnabled) playClickSound();
                    next();
                  }}
                  className={`flex items-center gap-2 rounded-lg border-4 border-[#333]
    bg-linear-to-r from-[#4ade80] via-[#22c55e] to-[#16a34a]
    px-5 py-3 font-black text-white shadow-[0_5px_0_#222]
    transition-all duration-200
    ${
      isLoading
        ? "cursor-not-allowed opacity-50"
        : "cursor-pointer hover:-translate-y-1 active:translate-y-1 active:shadow-none"
    }`}
                >
                  NEXT
                  <ChevronRight size={18} />
                </button>
              </div>
              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden md:block text-[10px] text-gray-500 font-mono"
              >
                ← → Arrow keys navigate • Prev / Next project
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RETRO LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && current.images && current.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex flex-col max-w-5xl w-full max-h-[94vh] rounded-[24px] border-4 border-[#222] bg-[#f7f7f7] shadow-[10px_10px_0_#000] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b-4 border-[#222] bg-[#efe9b5] px-4 sm:px-6 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex gap-1.5">
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-[#222] bg-red-400" />
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-[#222] bg-yellow-400" />
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-[#222] bg-green-400" />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-black text-[#111] truncate">
                    {current.name.toUpperCase()} // {current.images[lightboxIndex]?.title.toUpperCase()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (musicEnabled) playClickSound();
                    setIsLightboxOpen(false);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border-3 border-[#222] bg-[#ff6b6b] px-3 py-1 text-xs font-black text-white shadow-[0_3px_0_#222] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  <X size={16} />
                  <span className="hidden sm:inline">CLOSE</span>
                </button>
              </div>

              {/* Modal Image Viewport */}
              <div className="relative h-[55vh] sm:h-[65vh] w-full bg-[#111] flex items-center justify-center overflow-hidden p-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="relative h-full w-full flex items-center justify-center"
                  >
                    <Image
                      src={current.images[lightboxIndex].src}
                      alt={current.images[lightboxIndex].alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Modal Navigation Arrows */}
                {current.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() => {
                        if (musicEnabled) playClickSound();
                        setLightboxIndex((prev) =>
                          prev === 0 ? current.images!.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-xl border-3 border-[#222] bg-[#ffd100] text-[#111] shadow-[3px_3px_0_#222] hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer z-10"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() => {
                        if (musicEnabled) playClickSound();
                        setLightboxIndex((prev) =>
                          prev === current.images!.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-xl border-3 border-[#222] bg-[#ffd100] text-[#111] shadow-[3px_3px_0_#222] hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer z-10"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t-4 border-[#222] bg-[#efe9b5] px-4 sm:px-6 py-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="rounded-md border-2 border-[#222] bg-[#ffd100] px-2 py-0.5 font-mono text-[10px] font-black text-[#111] shrink-0">
                    SCREENSHOT {lightboxIndex + 1}/{current.images.length}
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-bold text-[#222] truncate">
                    {current.images[lightboxIndex]?.alt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none">
                    {current.images.map((img, idx) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => {
                          if (musicEnabled) playClickSound();
                          setLightboxIndex(idx);
                        }}
                        className={`relative h-7 w-10 rounded border-2 overflow-hidden transition-all ${
                          lightboxIndex === idx
                            ? "border-[#ff7a00] scale-110 shadow-[0_0_4px_#ff7a00]"
                            : "border-[#222] opacity-50 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
