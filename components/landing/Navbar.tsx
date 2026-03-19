"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-4">
      <motion.div
        className="
        w-[90%] max-w-5xl 
        px-6 py-3 
        flex items-center justify-between
        rounded-2xl
        backdrop-blur-md
        bg-white/10
        border border-white/20
        shadow-lg
      "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center gap-2">
          <Image
            src="/logo3.png"
            alt="ARESM Logo"
            width={150}
            height={150}
            priority
            className="rounded"
          />
        </Link>

        {/* Links */}
        <div className="flex gap-6 text-sm text-[#f4f4f4]">
          <Link href="#" className="medium-text font-medium">
            Home
          </Link>
          <Link href="#" className="medium-text font-medium">
            About
          </Link>
          <Link href="#" className="medium-text font-medium">
            Properties
          </Link>
          <Link href="#" className="medium-text font-medium">
            Services
          </Link>
          <Link href="#" className="medium-text font-medium">
            Contact
          </Link>
          <Link href="#" className="medium-text font-medium">
            Careers
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
