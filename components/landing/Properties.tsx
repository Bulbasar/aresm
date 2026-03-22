"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { TableOfContents } from "lucide-react";
import { SectionBadge } from "../ui/SectionBadge";
import { AnimateOnView } from "../ui/AnimateOnView";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// -----------------------------
// Data
// -----------------------------
const categories = [
  {
    title: "Residential",
    images: [
      "/residential/residential-1.jpg",
      "/residential/residential-2.jpg",
      "/residential/residential-3.jpg",
      "/residential/residential-4.jpg",
      "/residential/residential-5.jpg",
      "/residential/residential-6.jpg",
    ],
  },
  {
    title: "Estate",
    images: [
      "/estate/estate-1.jpg",
      "/estate/estate-2.jpg",
      "/estate/estate-3.jpg",
      "/estate/estate-4.jpg",
      "/estate/estate-5.jpg",
      "/estate/estate-6.jpg",
    ],
  },
  {
    title: "Commercial",
    images: [
      "/commercial/commercial-1.jpg",
      "/commercial/commercial-2.jpg",
      "/commercial/commercial-3.jpg",
      "/commercial/commercial-4.jpg",
      "/commercial/commercial-5.jpg",
      "/commercial/commercial-6.jpg",
    ],
  },
  {
    title: "Office",
    images: [
      "/office/office-1.jpg",
      "/office/office-2.jpg",
      "/office/office-3.jpg",
      "/office/office-4.jpg",
      "/office/office-5.jpg",
      "/office/office-6.jpg",
    ],
  },
];

// -----------------------------
// Tiny inline blur placeholder (1×1 grey pixel, base64)
// -----------------------------
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

// -----------------------------
// PropertyCard — isolated so it manages its own loaded state
// -----------------------------
const PropertyCard = React.memo(function PropertyCard({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div className="px-1 py-5">
      <div className="relative h-[200px] md:h-[240px] group">
        {!loaded && (
          <div className="absolute inset-0 rounded-xl overflow-hidden bg-gray-200 animate-pulse" />
        )}

        <div
          className={`
            absolute inset-0
            rounded-xl overflow-hidden
            cursor-pointer
            group-hover:rounded-none
            group-hover:scale-[1.13]
            group-hover:-translate-y-3
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
          style={{
            willChange: "transform",
            transition:
              "transform 550ms cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 550ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 25vw"
            className="object-cover"
            style={{
              transition:
                "transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            priority={priority}
            onLoad={handleLoad}
          />

          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition duration-500" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/20 via-transparent to-transparent transition duration-700" />
        </div>
      </div>
    </div>
  );
});

// -----------------------------
// Component
// -----------------------------
export default function Properties() {
  return (
    <section
      id="properties"
      className="min-h-screen px-6 md:px-10 py-16 md:py-20"
    >
      <div className="container mx-auto">
        {/* HEADER */}
        <AnimateOnView className="text-center mb-12">
          <SectionBadge icon={TableOfContents} text="Properties" />

          <h2 className="text-header font-bold text-dark mt-4 mb-3">
            Managed Properties
          </h2>

          <p className="max-w-xl mx-auto text-body text-gray-palette leading-relaxed">
            Reflects ARESMCORP's commitment to operational excellence,
            showcasing well-maintained and strategically supported assets across
            multiple real estate sectors.
          </p>
        </AnimateOnView>

        {/* CAROUSELS */}
        <div className="space-y-14">
          {categories.map((cat, idx) => (
            <CarouselWithOffset
              key={idx}
              category={cat}
              index={idx}
              priorityFirst={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate component to manage staggered autoplay start
function CarouselWithOffset({
  category,
  index,
  priorityFirst,
}: {
  category: (typeof categories)[0];
  index: number;
  priorityFirst: boolean;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [autoplayStarted, setAutoplayStarted] = useState(false);

  // Start autoplay with a staggered delay (e.g., 0ms, 600ms, 1200ms, 1800ms)
  useEffect(() => {
    if (!swiperRef.current || autoplayStarted) return;

    const delay = index * 600; // offset each carousel by 0.6s
    const timeout = setTimeout(() => {
      if (swiperRef.current && swiperRef.current.autoplay) {
        swiperRef.current.autoplay.start();
        setAutoplayStarted(true);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [index, autoplayStarted]);

  return (
    <AnimateOnView delay={index * 0.1}>
      {/* HEADER ROW */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-page font-bold text-dark pl-4 border-l-2 text-blue-palette">
          <span className="text-gray-palette">{category.title}</span>
        </h3>

        <button className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-300 transition cursor-pointer">
          See More
        </button>
      </div>

      <div className="overflow-hidden -mx-1 px-1 pb-4 pt-2">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          speed={900}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={false} // do not start automatically
          initialSlide={index * 2} // each carousel starts on a different slide
          navigation={false}
          pagination={{ clickable: true }}
          loop
          className="!pb-10"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {category.images.map((img, i) => (
            <SwiperSlide key={i}>
              <PropertyCard
                src={img}
                alt={`${category.title} property ${i + 1}`}
                priority={priorityFirst && i === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </AnimateOnView>
  );
}
