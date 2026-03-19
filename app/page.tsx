"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <motion.main
      className="min-h-screen w-screen relative overflow-x-hidden"
      animate={{
        backgroundColor: darkMode ? "#1F1F1F" : "#eff1ee",
        color: darkMode ? "#eff1ee" : "#1F1F1F",
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Optional Toggle Button (for testing) */}
      {/* <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-50 bg-[#2F6FA3] text-white px-4 py-2 rounded-lg shadow"
      >
        Toggle Mode
      </button> */}
    </motion.main>
  );
}
