"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Properties from "@/components/landing/Properties";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false); // light mode default
  const [loading, setLoading] = useState(true);
  const [navLight, setNavLight] = useState(true); // light text on hero

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Toggle body class for dark mode
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Track scroll to change navbar text color
  useEffect(() => {
    const container = document.querySelector(".scrollable-content");

    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setNavLight(rect.bottom > 80); // If hero bottom > 80px, navbar is light
    };

    container?.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.main
      className="min-h-screen w-screen relative"
      animate={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
      }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">{loading && <Loader />}</AnimatePresence>

      <div
        className={`h-screen overflow-y-auto scrollable-content transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          navLight={navLight}
        />
        {!loading && <Hero />}
        <About />
        <Properties />
      </div>
    </motion.main>
  );
}
