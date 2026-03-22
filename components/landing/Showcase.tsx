"use client";

import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Image from "next/image";

interface ShowcaseProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

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

export default function Showcase({ scrollRef }: ShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [startCount, setStartCount] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean[]>([]);

  useEffect(() => {
    const container = scrollRef.current;
    const section = sectionRef.current;

    if (!container || !section) return;

    let hasScrolled = false;

    const handleScroll = () => {
      if (container.scrollTop > 10) hasScrolled = true;
      if (!hasScrolled) return;

      const containerRect = container.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();

      const isVisible =
        sectionRect.top < containerRect.bottom * 0.75 &&
        sectionRect.bottom > containerRect.top;

      if (isVisible && !startCount) {
        setStartCount(true);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollRef, startCount]);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden"
    >
      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-12 md:py-0"
      >
        <h2 className="text-header font-bold text-dark mb-6">
          Real estate that works for you
        </h2>

        <p className="mb-4 text-subheading text-gray-palette text-justify">
          <span className="font-semibold">
            We are an investment platform that gives individuals access to
            corporate-grade assets,
          </span>{" "}
          using the same rigorous processes as large firms.
        </p>

        <p className="mb-8 text-subheading text-gray-palette text-justify">
          <span className="font-semibold">
            We handle operations, so investors can simply enjoy net rental
            income and property appreciation.
          </span>{" "}
          Start investing and build a diversified real estate portfolio today.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{
                opacity: startCount ? 1 : 0,
                y: startCount ? (hoveredIndex === idx ? -6 : 0) : 50,
                scale: hoveredIndex === idx ? 1.06 : 1,
              }}
              transition={{
                duration: 0.6,
                delay: idx * 0.25, // stagger entrance
                ease: "easeOut",
              }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative p-5 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-300 cursor-pointer hover:shadow-lg transition-all overflow-hidden"
            >
              {/* 🌟 glow pulse */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  startCount && !completed[idx]
                    ? { opacity: [1, 1, 1] }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-blue-400/10 blur-xl"
              />

              <h3 className="text-page font-bold text-blue-palette relative z-10">
                {startCount ? (
                  <CountUp
                    start={0}
                    end={stat.end}
                    duration={2.2}
                    delay={idx * 0.3} // ✨ stagger count start
                    suffix={stat.suffix || ""}
                    easingFn={(t, b, c, d) => {
                      // ✨ custom easeOutExpo
                      return c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
                    }}
                    onEnd={() =>
                      setCompleted((prev) => {
                        const copy = [...prev];
                        copy[idx] = true;
                        return copy;
                      })
                    }
                  />
                ) : (
                  0
                )}
              </h3>

              <p className="text-subheading text-main relative z-10">
                {stat.label}
              </p>

              {/* ✅ finish pop */}
              {completed[idx] && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.05, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 relative group overflow-hidden h-80 md:h-auto"
      >
        <Image
          src="/showcase.jpg"
          alt="Real estate"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-[#1976b4]/10" />
        <div className="absolute inset-0 bg-[#1976b4]/30 group-hover:opacity-0 transition-all duration-700" />
      </motion.div>
    </section>
  );
}
