"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen w-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="
          absolute inset-0
          bg-[url('/landing-hero.jpg')]
          bg-cover bg-center
          bg-no-repeat
        "
      />

      {/* Overlay (important for readability) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6 text-white">
        <div>
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            ALWAYS AT YOUR SERVICE
          </motion.h1>

          <motion.p
            className="text-gray-200 max-w-xl mx-auto mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Driving operational excellence and value creation through structed,
            corporate-grade property management
          </motion.p>

          <motion.button
            className="
              bg-[#4A90E2] 
              px-6 py-3 
              rounded-lg 
              font-medium 
              hover:bg-[#357ABD] 
              transition
            "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </section>
  );
}
