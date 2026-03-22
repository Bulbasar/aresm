"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { TableOfContents, Award, Lightbulb, Leaf, Heart } from "lucide-react";
import { SectionBadge } from "../ui/SectionBadge";

// ----------------------------------------------------------------------
// AnimateOnView Component (defined here for simplicity)
// ----------------------------------------------------------------------
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

function AnimateOnView({
  children,
  className,
  delay = 0,
  initial = { opacity: 0, y: 50 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.8, ease: "easeOut" },
  once = true,
  amount = 0.3,
}: AnimateOnViewProps) {
  const ref = React.useRef<HTMLDivElement>(null);
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

// ----------------------------------------------------------------------
// Main About Component
// ----------------------------------------------------------------------
export default function About() {
  const values = [
    {
      title: "Excellence",
      description:
        "We strive for the highest standards in everything we do, delivering exceptional quality and value to our stakeholders.",
      icon: Award,
    },
    {
      title: "Integrity",
      description:
        "We operate with transparency, honesty, and ethical practices, building trust with our partners and communities.",
      icon: Heart,
    },
    {
      title: "Innovation",
      description:
        "We embrace cutting-edge technology and creative solutions to stay ahead in the evolving real estate landscape.",
      icon: Lightbulb,
    },
    {
      title: "Sustainability",
      description:
        "We are committed to environmentally responsible practices that ensure long-term value for our communities.",
      icon: Leaf,
    },
  ];

  return (
    <section id="about" className="min-h-screen w-full">
      {/* Company Section */}
      <div className="flex items-center justify-center px-6 py-16 md:py-20">
        <div className="container mx-auto">
          <AnimateOnView
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            once={false}
          >
            <div className="text-center mb-4">
              <SectionBadge icon={TableOfContents} text="About Us" />
            </div>

            <h2 className="text-header font-bold text-dark mb-4 text-center">
              Our Company
            </h2>

            <div className="space-y-4 text-justify text-body text-gray-palette leading-relaxed">
              <p>
                We are a premier real estate investment and management firm
                dedicated to democratizing access to corporate-grade real estate
                assets. Founded with a vision to bridge the gap between
                individual investors and corporate-quality property
                opportunities, we have established ourselves as a trusted
                partner in the real estate landscape.
              </p>
              <p>
                Our platform combines rigorous financial analysis, strategic
                asset management, and operational excellence to deliver
                consistent returns for our investors. We specialize in
                identifying undervalued properties with high growth potential,
                implementing value-add strategies, and optimizing property
                performance through professional management practices.
              </p>
              <p>
                What sets us apart is our commitment to transparency and
                investor-centric approach. We provide our partners with clear,
                data-driven insights into their investments, ensuring complete
                visibility into property performance, market trends, and
                portfolio diversification. Our team of seasoned real estate
                professionals brings decades of combined experience in
                acquisitions, development, leasing, and property management.
              </p>
            </div>
          </AnimateOnView>
        </div>
      </div>

      {/* Mission Section - Image Left (slide from left), Text Right */}
      <div className="w-full flex flex-col md:flex-row overflow-hidden">
        <AnimateOnView
          className="md:w-1/2 relative group overflow-hidden h-[400px] md:h-[500px]"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          once={false}
        >
          <Image
            src="/mission-image.jpg"
            alt="Mission - Building sustainable communities"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          <div className="absolute inset-0 bg-[#1976b4]/20 group-hover:opacity-0 transition-all duration-700" />
        </AnimateOnView>

        <AnimateOnView
          className="md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-12 md:py-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          once={false}
        >
          <div className="max-w-xl">
            <h3 className="text-page font-bold text-blue-palette mb-6 text-center md:text-left">
              Our Mission
            </h3>
            <p className="text-body text-gray-palette leading-relaxed text-center md:text-left mb-6">
              We are dedicated to creating spaces that foster connection,
              sustainability, and well-being. Our mission is to build
              communities where people can thrive, work, and live in harmony
              with their environment.
            </p>
            <div className="space-y-3">
              {[
                "Design livable and inclusive communities",
                "Build sustainable and resilient cities",
                "Invest in strategically located yield-driven developments",
              ].map((item, idx) => (
                <AnimateOnView
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  once={false}
                  className="flex items-center justify-center md:justify-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-palette flex-shrink-0" />
                  <span className="text-body text-gray-palette">{item}</span>
                </AnimateOnView>
              ))}
            </div>
          </div>
        </AnimateOnView>
      </div>

      {/* Vision Section - Text Left, Image Right (slide from right) */}
      <div className="w-full flex flex-col md:flex-row overflow-hidden">
        <AnimateOnView
          className="md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-12 md:py-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          once={false}
        >
          <div className="max-w-xl ml-auto">
            <h3 className="text-page font-bold text-blue-palette mb-6 text-center md:text-right">
              Our Vision
            </h3>
            <div className="space-y-4 text-center md:text-right text-body text-gray-palette leading-relaxed">
              <p>
                We envision a future where our stakeholders experience unique
                and engaging work environments in communities that embody
                health, happiness, and comfort.
              </p>
              <p>
                Through innovation and purposeful design, we create spaces that
                inspire productivity, foster creativity, and promote well-being
                for everyone who interacts with our developments.
              </p>
            </div>
          </div>
        </AnimateOnView>

        <AnimateOnView
          className="md:w-1/2 relative group overflow-hidden h-[400px] md:h-[500px]"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          once={false}
        >
          <Image
            src="/vision-image.jpg"
            alt="Vision - Innovative spaces for thriving communities"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
          <div className="absolute inset-0 bg-[#1976b4]/20 group-hover:opacity-0 transition-all duration-700" />
        </AnimateOnView>
      </div>

      {/* Values Section - 4 cards */}
      <AnimateOnView
        className="w-full flex justify-center px-6 py-16 md:py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        once={false}
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-page font-bold text-blue-palette">
              Our Values
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <AnimateOnView
                key={idx}
                className="p-6 md:p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-gray-700 text-center group hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                once={false}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 md:w-8 md:h-8 text-blue-palette" />
                </div>
                <h4 className="text-section font-bold text-dark mb-3">
                  {value.title}
                </h4>
                <p className="text-body text-gray-palette">
                  {value.description}
                </p>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </AnimateOnView>
    </section>
  );
}
