"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Showcase from "@/components/landing/Showcase";
import About from "@/components/landing/About";
import Properties from "@/components/landing/Properties";
import Footer from "@/components/Footer";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [navLight, setNavLight] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ✅ FIX: reset scroll to top on load
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, []);

  // navLight logic (no change)
  useEffect(() => {
    const container = scrollRef.current;

    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      setNavLight(rect.bottom > 80);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
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
        ref={scrollRef}
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

        <Showcase scrollRef={scrollRef} />
        <About />
        <Properties />

        <Footer darkMode={darkMode} />
      </div>
    </motion.main>
  );
}
