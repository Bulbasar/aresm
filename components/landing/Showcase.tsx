"use client";

import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
}

const stats: StatProps[] = [
  { end: 5, label: "Years in Service", suffix: "+" },
  { end: 316, label: "Properties Funded" },
  { end: 30000, label: "Investors", suffix: "+" },
  { end: 50, label: "Invested", suffix: "M+" },
];

export default function Showcase() {
  // inView triggers once for counting
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true, // ✅ only trigger once
  });

  // Hover lift state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="showcase"
      className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden"
    >
      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-12 md:py-0 box-border"
      >
        <h2 className="text-5xl md:text-header font-bold text-dark mb-6 text-header">
          Real estate that works for you
        </h2>

        <p className="mb-4 text-subheading text-gray-palette text-justify">
          <span className="font-semibold">
            We are an investment platform that gives individuals access to
            corporate-grade assets,
          </span>{" "}
          <span className="text-gray-palette">
            using the same rigorous processes as large firms.
          </span>
        </p>

        <p className="mb-8 text-subheading text-gray-palette text-justify">
          <span className="font-semibold">
            We handle operations, so investors can simply enjoy net rental
            income and property appreciation.
          </span>{" "}
          <span className="text-gray-palette">
            Start investing and build a diversified real estate portfolio today.
          </span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{ scale: hoveredIndex === idx ? 1.05 : 1 }}
              className="p-5 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:shadow-sm border border-gray-300 cursor-pointer"
            >
              <h3 className="text-2xl sm:text-2xl font-bold text-blue-palette text-header">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.end}
                    duration={2.5}
                    suffix={stat.suffix || ""}
                  />
                )}
              </h3>
              <p className="text-subheading  text-main">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT - Image */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="md:w-1/2 relative group overflow-hidden h-80 md:h-auto w-full"
      >
        <Image
          src="/showcase.jpg"
          alt="Real estate"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          style={{ objectFit: "cover" }}
        />

        <div
          className="absolute inset-0 transition-all duration-700"
          style={{ backgroundColor: "rgba(25, 118, 180, 0.1)" }}
        />

        <div
          className="absolute inset-0 transition-all duration-700 group-hover:opacity-0"
          style={{ backgroundColor: "rgba(25, 118, 180, 0.3)" }}
        />
      </motion.div>
    </section>
  );
}
