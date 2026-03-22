"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Building2, Info, Home, Phone } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  navLight: boolean;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  navLight,
}: NavbarProps) {
  const [active, setActive] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sections = [
    { id: "home", label: "HOME", icon: Home },
    { id: "about", label: "ABOUT", icon: Info },
    { id: "properties", label: "PROPERTIES", icon: Building2 },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    setIsMenuOpen(false); // Close menu after navigation
    el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const container = document.querySelector(".scrollable-content");

    const handleActive = () => {
      let current = "home";
      let closest = Infinity;

      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        const offset = Math.abs(rect.top - 120); // 👈 navbar offset

        if (offset < closest && rect.bottom > 0) {
          closest = offset;
          current = id;
        }
      });

      setActive(current);
    };

    container?.addEventListener("scroll", handleActive);

    // ✅ RUN ON LOAD
    handleActive();

    return () => container?.removeEventListener("scroll", handleActive);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 w-full z-50 flex justify-center mt-3 px-4">
        <motion.div
          className="w-full max-w-5xl px-4 md:px-6 py-3 flex justify-between items-center rounded-2xl backdrop-blur-md border shadow-lg transition-all duration-500"
          style={{
            backgroundColor: navLight
              ? "rgba(0,0,0,0.2)"
              : "rgba(255,255,255,0.3)",
            borderColor: "var(--border)",
          }}
        >
          {/* Logo */}
          <Image
            src="/logo2.jpeg"
            alt="ARESM CORP"
            width={isMobile ? 100 : 140}
            height={isMobile ? 30 : 40}
            className="transition-colors duration-500"
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleScroll(id)}
                className="relative font-medium tracking-wide cursor-pointer"
                style={{
                  color: navLight ? "var(--text-light)" : "var(--text-dark)",
                }}
              >
                {label}
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-[2px] bg-current"
                  animate={{ width: active === id ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{
              color: navLight ? "var(--text-light)" : "var(--text-dark)",
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </div>

      {/* Full-Width Collapse Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Full Width Menu Panel - Slides down from top */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 z-50 md:hidden"
              style={{
                backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
              }}
            >
              <div className="h-full flex flex-col">
                {/* Menu Header with Logo and Close */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                  <Image
                    src="/logo2.jpeg"
                    alt="ARESM CORP"
                    width={100}
                    height={30}
                  />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6">
                  <div className="space-y-2">
                    {sections.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => handleScroll(id)}
                        className="w-full flex items-center gap-4 p-4 rounded-xl transition-all"
                        style={{
                          backgroundColor:
                            active === id
                              ? darkMode
                                ? "#2d2d2d"
                                : "#f3f4f6"
                              : "transparent",
                          color: darkMode ? "#ffffff" : "#000000",
                        }}
                      >
                        <Icon size={20} />
                        <span className="text-lg font-medium">{label}</span>
                        {active === id && (
                          <motion.div
                            layoutId="mobileActive"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Contact Info */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                  <p
                    className="text-sm mb-4"
                    style={{
                      color: darkMode ? "#9ca3af" : "#6b7280",
                    }}
                  >
                    Contact us
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+1234567890"
                      className="flex items-center gap-3 text-sm"
                      style={{
                        color: darkMode ? "#ffffff" : "#000000",
                      }}
                    >
                      <Phone size={16} />
                      <span>+1 (234) 567-890</span>
                    </a>
                    <a
                      href="mailto:info@aresmcorp.com"
                      className="flex items-center gap-3 text-sm"
                      style={{
                        color: darkMode ? "#ffffff" : "#000000",
                      }}
                    >
                      <Building2 size={16} />
                      <span>info@aresmcorp.com</span>
                    </a>
                  </div>
                </div>

                {/* Dark Mode Toggle */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full py-3 px-4 rounded-xl border text-sm font-medium transition-colors"
                    style={{
                      borderColor: darkMode ? "#404040" : "#e5e7eb",
                      color: darkMode ? "#ffffff" : "#000000",
                    }}
                  >
                    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
