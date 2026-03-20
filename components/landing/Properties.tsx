"use client";

import { motion } from "framer-motion";

const properties = [
  {
    title: "Modern Office Space",
    location: "Makati City",
    price: "₱120,000/mo",
    img: "/p1.jpg",
  },
  {
    title: "Luxury Condo Unit",
    location: "BGC Taguig",
    price: "₱85,000/mo",
    img: "/p2.jpg",
  },
  {
    title: "Commercial Building",
    location: "Quezon City",
    price: "₱250,000/mo",
    img: "/p3.jpg",
  },
];

export default function Properties() {
  return (
    <section id="properties" className="min-h-screen px-10 py-20">
      <motion.h2
        className="text-section font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        style={{ color: "var(--text-dark)" }}
      >
        Featured Properties
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {properties.map((item, i) => (
          <motion.div
            key={i}
            className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-md border"
            style={{ borderColor: "var(--border)" }}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.2 }}
          >
            <div
              className="h-60 bg-cover bg-center hover:scale-110 transition duration-500"
              style={{ backgroundImage: `url(${item.img})` }}
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold text-dark">{item.title}</h3>
              <p className="text-muted">{item.location}</p>
              <p className="mt-2 font-bold text-primary">{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
