"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";

interface FooterProps {
  darkMode?: boolean;
}

export default function Footer({ darkMode = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "properties", label: "Properties" },
  ];

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full mt-auto">
      {/* Main Footer Section */}
      <div className="bg-blue-palette text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {/* Logo and Description Section */}
            <div className="space-y-4 text-center md:text-left">
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                  ARESMCORP
                </h2>
                <div className="h-0.5 w-12 bg-white/60 mt-2 rounded-full mx-auto md:mx-0" />
              </div>
              <p className="text-sm md:text-base leading-relaxed text-white/90 max-w-md mx-auto md:mx-0">
                Aresmcorp is a property management arm of DM Wenceslao group of
                companies with expertise in residential, commercial, office,
                estate and complex management.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-4 relative inline-block md:block">
                QUICK LINKS
                <div className="h-0.5 w-12 bg-white/60 mt-1 rounded-full mx-auto md:mx-0" />
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => handleSmoothScroll(link.id)}
                      className="text-white/80 hover:text-white transition-colors duration-200 text-sm md:text-base cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-4 relative inline-block md:block">
                CONTACT US
                <div className="h-0.5 w-12 bg-white/60 mt-1 rounded-full mx-auto md:mx-0" />
              </h3>
              <div className="space-y-4">
                {/* Address - Mobile: single line with bullet points, Desktop: multi-line */}
                <div className="flex gap-3 group justify-center md:justify-start">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-white/80 group-hover:text-white transition-colors" />
                  <div className="text-white/80 group-hover:text-white transition-colors text-sm md:text-base leading-relaxed text-left">
                    {/* Mobile View (md:hidden) - Single line with bullet points */}
                    <div className="md:hidden space-y-1">
                      <div>15/F Aseana 3, Pres. D. Macapagal Blvd. cor. </div>
                      <div>Asean Avenue, Aseana City, Parañaque City</div>
                    </div>
                    {/* Desktop View (hidden md:block) - Multi-line with proper formatting */}
                    <div className="hidden md:block">
                      15/F Aseana 3, Pres. D. Macapagal Blvd. cor.
                      <br />
                      Asean Avenue, Aseana City, Parañaque City
                    </div>
                  </div>
                </div>

                {/* Email - Fixed alignment */}
                <div className="flex gap-3 group justify-center md:justify-start">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-white/80 group-hover:text-white transition-colors" />
                  <a
                    href="mailto:info@aresmcorp.com"
                    className="text-white/80 hover:text-white transition-colors text-sm md:text-base"
                  >
                    info@aresmcorp.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section - Darker Background */}
      <div className="bg-blue-palette-darker text-white/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-xs md:text-sm">
            <p>Copyright © {currentYear} Aresmcorp. All Rights Reserved.</p>
            {/* <p className="mt-1 text-white/60 text-xs">
              A property management arm of DM Wenceslao Group of Companies
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
