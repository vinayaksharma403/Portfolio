"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, RotateCcw, MessageSquare, Terminal } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { playClickSound } from "../utils/sound";

export default function Contact({
  musicEnabled = false,
}: {
  musicEnabled?: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const MY_EMAIL = "vinayaksharma4777@gmail.com";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (musicEnabled) playClickSound();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        toast.success("Signal received! Transmission sent successfully.");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        const errorMessage = data?.error || "Transmission failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch {
      toast.error("An error occurred. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    if (musicEnabled) playClickSound();
    navigator.clipboard.writeText(MY_EMAIL);
    toast.dismiss();
    toast.success("Email copied to clipboard !",{
      id:"copy-email-toast",
    });
  };

  return (
    <section
      id="contact"
      className="min-h-screen px-4 pt-21 pb-8 font-sans relative"
    >

      <div className="mx-auto max-w-6xl">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-[0.08em] text-transparent bg-clip-text bg-linear-to-r from-[#111] via-[#444] to-[#111] drop-shadow-[2px_2px_0_rgba(0,0,0,0.15)]">
            CONTACT
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
              <Mail size={32} className="text-[#ff8300]" />
            </motion.div>
            <span className="font-semibold">
              Open communications • Send a signal • Establish link
            </span>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* LEFT PANEL: Communication Terminal (Form) */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="overflow-hidden rounded-[28px] border-4 border-[#222] bg-[#f7f7f7] shadow-[8px_8px_0_#111] flex flex-col"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b-4 border-[#222] bg-[#efe9b5] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full border-2 border-[#222] bg-red-400" />
                <div className="h-4 w-4 rounded-full border-2 border-[#222] bg-yellow-400" />
                <div className="h-4 w-4 rounded-full border-2 border-[#222] bg-green-400" />
                <span className="ml-2 text-[10px] sm:text-xs md:ml-4 md:text-base font-black tracking-tight text-[#111] leading-tight">
                  COMMUNICATION TERMINAL
                </span>
              </div>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden lg:block text-[10px] text-gray-500 font-mono"
              >
                // SYSTEM ONLINE
              </motion.span>
            </div>

            {/* Form Area */}
            <div className="relative p-6 md:px-8 md:py-6 flex-1 bg-[#f8f8f8]">
              {/* Subtle Scanline Background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, #000 3px)",
                }}
              />

              <form
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col h-full justify-between space-y-1"
              >
                <div>
                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden pointer-events-none opacity-0 h-0 w-0 absolute"
                    aria-hidden="true"
                  />

                  <div className="mb-4">
                    <label className="block text-md font-black mb-2 tracking-wide text-[#444]">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      required
                      className="w-full bg-white border-4 border-[#222] rounded-xl p-4 font-semibold text-[#111] shadow-[4px_4px_0_#222] focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-[0px_0px_0_#222] transition-all"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-md font-black mb-2 tracking-wide text-[#444]">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={254}
                      required
                      className="w-full bg-white border-4 border-[#222] rounded-xl p-4 font-semibold text-[#111] shadow-[4px_4px_0_#222] focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-[0px_0px_0_#222] transition-all"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-md font-black mb-2 tracking-wide text-[#444]">
                      MESSAGE
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={5000}
                      required
                      className="w-full bg-white border-4 border-[#222] rounded-xl p-4 font-semibold text-[#111] shadow-[4px_4px_0_#222] focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-[0px_0px_0_#222] resize-none transition-all"
                    ></textarea>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-wrap justify-between items-end gap-4">
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
    flex items-center gap-2 rounded-lg border-4 border-[#222]
    bg-linear-to-r from-[#ff8300] to-[#ff6b00]
    px-6 py-3 font-black text-white
    transition-all duration-200
    ${
      isSubmitting
        ? "translate-y-1 shadow-none cursor-not-allowed"
        : "shadow-[0_5px_0_#222] hover:-translate-y-1 active:translate-y-1 active:shadow-none cursor-pointer"
    }
  `}
                    >
                      <Send size={18} />
                      {isSubmitting ? "SENDING..." : "SEND"}
                    </button>
                    <button
                      type="reset"
                      onClick={() => {
                        if (musicEnabled) playClickSound();
                        setFormData({ name: "", email: "", message: "", honeypot: "" });
                      }}
                      className="flex items-center gap-2 rounded-lg border-4 border-[#222] bg-white px-6 py-3 font-black text-[#111] shadow-[0_5px_0_#222] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all duration-200 cursor-pointer"
                    >
                      <RotateCcw size={18} />
                      RESET
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="hidden md:block bg-[#efe9b5] border-4 border-[#222] rounded-md px-4 py-2 font-black text-sm shadow-[0_3px_0_#222] active:translate-y-1 active:shadow-none transition-all text-black hover:cursor-pointer"
                    >
                      Copy Email
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* RIGHT PANEL: Hidden on mobile (hidden lg:flex) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeInOut" }}
            className="hidden lg:flex flex-col gap-6"
          >
            {/* Profile Card Terminal */}
            <div className="overflow-hidden rounded-[28px] border-4 border-[#222] bg-[#f5f5f5] shadow-[8px_8px_0_#111]">
              <div className="flex items-center justify-between border-b-4 border-[#222] bg-[#efe9b5] px-6 py-3">
                <span className="font-black tracking-[0.08em] text-[#111] text-sm flex items-center gap-2">
                  <Terminal size={18} /> USER_IDENTITY
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#efe9b5] border-4 border-[#222] rounded-xl overflow-hidden shadow-[4px_4px_0_#ff8300] flex items-center justify-center select-none">
                    <span className="font-mono font-black text-2xl text-[#111] tracking-tight">
                      VS
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase text-[#111]">
                      Vinayak Sharma
                    </h2>
                    <p className="font-semibold text-sm text-[#ff8300]">
                      Developer • Problem Solver
                    </p>
                  </div>
                </div>

                <p className="text-sm font-medium leading-relaxed text-[#444]">
                  Interested in full-stack development, AI/ML, DSA, and
                  building practical software. Drop a message to connect,
                  collaborate, or talk about technology.
                </p>
              </div>
            </div>

            {/* Connect / Stats Card */}
            <div className="overflow-hidden rounded-[28px] border-4 border-[#222] bg-[#f5f5f5] shadow-[8px_8px_0_#111]">
              <div className="flex justify-between items-center border-b-4 border-[#222] bg-[#efe9b5] px-6 py-3">
                <span className="font-black tracking-[0.08em] text-[#111] text-sm flex items-center gap-2">
                  <MessageSquare size={16} /> NETWORK
                </span>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 border-2 border-[#222] rounded-full bg-[#ff8300]"></div>
                  <div className="w-4 h-4 border-2 border-[#222] rounded-full bg-[#444]"></div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Progress Bar 1 */}
                <div className="space-y-1.5">
                  <div className="text-xs font-black tracking-widest text-[#444]">
                    RESPONSE RATE
                  </div>
                  <div className="w-full h-5.5 bg-[#ddd] border-4 border-[#222] rounded-full overflow-hidden flex shadow-[inset_0_3px_0_rgba(0,0,0,0.1)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "68%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-linear-to-r from-[#fe7e00] to-[#6b7376] h-full border-r-4 border-[#222]"
                    />
                  </div>
                </div>

                {/* Progress Bar 2 */}
                <div className="space-y-1.5">
                  <div className="text-xs font-black tracking-widest text-[#444]">
                    BANDWIDTH
                  </div>
                  <div className="w-full h-5.5 bg-[#ddd] border-4 border-[#222] rounded-full overflow-hidden flex shadow-[inset_0_3px_0_rgba(0,0,0,0.1)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="bg-linear-to-r from-[#fe7e00] to-[#6b7376] h-full border-r-4 border-[#222]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
