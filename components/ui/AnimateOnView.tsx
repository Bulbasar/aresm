"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimateOnViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  initial?: any;
  animate?: any;
  transition?: any;
  once?: boolean;
  amount?: number;
}

export function AnimateOnView({
  children,
  className,
  delay = 0,
  initial = { opacity: 0, y: 50 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.8, ease: "easeOut" },
  once = true,
  amount = 0.3,
}: AnimateOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
