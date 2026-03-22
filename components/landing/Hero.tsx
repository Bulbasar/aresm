"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  Variants,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

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
    image: "/landing-hero-2.jpg",
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
  const intervalRef = useRef<number | null>(null);

  // ✅ MOUSE PARALLAX VALUES
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // smooth motion (important)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // track mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;

    const x = (e.clientX - innerWidth / 2) / innerWidth;
    const y = (e.clientY - innerHeight / 2) / innerHeight;

    mouseX.set(x * 40); // adjust strength here
    mouseY.set(y * 40);
  };

  // AUTO SLIDE
  const startAutoSlide = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    startAutoSlide();

    // 📱 MOBILE TILT SUPPORT
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;

      // gamma = left/right tilt (-90 to 90)
      // beta = front/back tilt (-180 to 180)
      const x = e.gamma / 45; // normalize
      const y = e.beta / 45;

      mouseX.set(x * 30);
      mouseY.set(y * 30);
    };

    // request permission for iOS
    const enableTilt = () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((response: string) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    // trigger once user interacts (required for iOS)
    window.addEventListener("click", enableTilt, { once: true });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  const handleGetStarted = () => {
    const el = document.getElementById("showcase");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-screen w-screen relative overflow-hidden"
    >
      {/* BACKGROUND */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
              backgroundImage: `url(${slide.image})`,
            }}
            className="absolute inset-0 bg-cover bg-center scale-110 will-change-transform"
          />

          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      ))}

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl"
          >
            <motion.h1
              variants={item}
              className="text-hero font-bold text-light mb-6"
            >
              {slides[currentSlide].headline}
            </motion.h1>

            <motion.p variants={item} className="text-body text-light mb-8">
              {slides[currentSlide].description}
            </motion.p>

            <motion.button
              variants={item}
              onClick={handleGetStarted}
              className="btn-primary px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold cursor-pointer"
            >
              Get Started
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-4 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
