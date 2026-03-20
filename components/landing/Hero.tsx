"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

// Carousel data
const slides = [
  {
    id: 1,
    image: "/landing-hero.jpg",
    headline: "ALWAYS AT YOUR SERVICE",
    description:
      "Driving operational excellence and value creation through structured, corporate-grade property management",
  },
  {
    id: 2,
    image: "/landing-hero-2.jpg", // You'll replace these paths later
    headline: "DRIVING OPERATIONAL EXCELLENCE",
    description:
      "Streamlined processes and professional management for maximum property performance",
  },
  {
    id: 3,
    image: "/landing-hero-4.jpg",
    headline: "VALUE CREATION THROUGH STRUCTURE",
    description:
      "Corporate-grade strategies that enhance asset value and deliver superior returns",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="h-screen w-screen relative overflow-hidden">
      {/* Carousel Images with crossfade */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <motion.h1
              variants={item}
              className="text-hero font-bold tracking-tight mb-6 text-light"
            >
              {slides[currentSlide].headline.split("<br />").map((line, i) => (
                <span key={i}>
                  {line}
                  {i <
                    slides[currentSlide].headline.split("<br />").length -
                      1 && <br />}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-2xl mx-auto mb-8 text-body text-light"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.button
              variants={item}
              className="px-8 py-3 rounded-lg font-semibold uppercase tracking-wide shadow-md btn-primary"
            >
              Get Started
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-4 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Previous/Next buttons */}
      {/* <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        →
      </button> */}
    </section>
  );
}
