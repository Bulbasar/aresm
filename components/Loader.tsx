"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-light)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-page tracking-[0.3em] mb-6 text-dark"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ARESMCORP
      </motion.h1>

      <motion.div
        className="w-10 h-10 border-2 border-current border-t-transparent rounded-full text-dark"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </motion.div>
  );
}
