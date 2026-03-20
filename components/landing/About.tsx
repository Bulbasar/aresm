"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="h-screen flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl text-center"
      >
        <h2 className="text-section font-bold mb-6 text-dark">About Us</h2>

        <p className="text-body text-muted">
          We deliver professional real estate management services focused on
          operational excellence, asset value growth, and client satisfaction.
        </p>
      </motion.div>
    </section>
  );
}
