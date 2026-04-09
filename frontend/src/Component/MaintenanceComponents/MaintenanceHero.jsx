import React from "react";
import { motion } from "framer-motion";

const MaintenanceHero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-transparent -z-10" />

      {/* Floating particles */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-20 left-10 w-2 h-2 bg-secondary/40 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden lg:block absolute top-40 right-20 w-3 h-3 bg-primary/30 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="hidden lg:block absolute bottom-32 left-1/4 w-2 h-2 bg-secondary/30 rounded-full"
      />

      {/* Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10">

        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1 flex flex-col gap-5"
        >
          {/* Breadcrumb */}
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm uppercase tracking-widest text-secondary font-semibold"
          >
            Services / Procurement &amp; Expediting
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold leading-tight text-primary"
          >
            Procurement &amp; Expediting <br />
            <span className="text-secondary">Right Quality. Right Time.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-600 text-base sm:text-lg leading-relaxed"
          >
            Reva manages the full procurement cycle — from vendor identification
            and techno-commercial evaluation through purchase order placement,
            expediting, and delivery — ensuring equipment and bulk materials
            arrive on time, to spec, and within budget to keep your project
            on schedule.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-2"
          >
            {[
              "Vendor Evaluation",
              "Techno-Commercial Comparison",
              "PO Placement",
              "Expediting & Tracking",
              "Inspection & QA",
              "Logistics Coordination",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 border border-primary/20 bg-primary/5 text-primary text-xs font-semibold rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-1"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group inline-flex items-center justify-center gap-3 bg-secondary text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              Discuss Your Procurement Scope
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <motion.a
              href="/services"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base"
            >
              View All Services
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="order-1 lg:order-2"
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative group"
          >
            <img
              src="./maintenance.png"
              alt="Reva Procurement & Expediting – Vendor Management and Equipment Supply"
              className="w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl border-l-4 border-secondary"
            >
              <p className="text-sm font-bold text-primary leading-none mb-0.5">
                End-to-End Procurement
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Spec → Vendor → PO → Delivery
              </p>
            </motion.div>

            {/* Decorative blobs */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block absolute -top-4 md:-top-6 -right-4 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-secondary/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden md:block absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 w-32 h-32 md:w-40 md:h-40 bg-primary/10 rounded-full blur-3xl"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default MaintenanceHero;
