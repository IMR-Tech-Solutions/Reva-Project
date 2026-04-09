import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const projectRefs = [
  "Biomass to CBG",
  "Lube Oil Distillation",
  "Pyrolysis Oil Refining",
  "Fuel Gas Desulphurization",
  "Vapour Adsorption",
  "Phenol-Formaldehyde Resin",
  "Hexamine Plants",
  "FEED & Detailed Engineering",
];

const statsData = [
  { number: 2014, suffix: "", label: "Established", color: "text-primary" },
  { number: 50, suffix: "+", label: "Projects Delivered", color: "text-secondary" },
  { number: 10, suffix: "+", label: "Countries Served", color: "text-accent" },
];

const WorkInActionSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-white py-8 md:py-10 lg:py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* ✅ items-stretch for equal height */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
              <div className="w-12 h-[3px] bg-gradient-to-r from-secondary to-secondary/50 rounded-full" />
              <span className="text-sm md:text-base font-bold text-secondary uppercase tracking-wider">
                Our Projects In Action
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            >
              <span className="text-primary">Proven credentials.</span>
              <span className="block mt-1 text-gray-700">Real-world delivery.</span>
            </motion.h2>

            {/* Description — kept short */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 leading-relaxed mb-7 max-w-xl"
            >
              Documented project references across India and international markets —
              covering basic &amp; detailed engineering, process design, FEED, and supply
              of key equipment for leading public and private sector clients.
            </motion.p>

            {/* Project Reference Tags */}
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Project References
              </p>
              <div className="flex flex-wrap gap-2">
                {projectRefs.map((ref) => (
                  <span
                    key={ref}
                    className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-semibold rounded-full border border-primary/15 hover:bg-primary/10 transition-colors duration-200"
                  >
                    {ref}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-8">
              {statsData.map((stat, index) => (
                <CounterCard key={index} stat={stat} delay={index * 0.2} />
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <a
                href="/about"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white text-base font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Our Projects
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Image ✅ h-full for equal height */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative h-full"
          >
            <div className="relative h-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl -z-10" />

              {/* ✅ h-full so image fills the column height */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl h-full min-h-[450px]">
                <img
                  src="./hero3.png"
                  alt="Reva Process Technologies project site"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-br-[80px]" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-secondary/90 rounded-tl-[60px]" />

                {/* Floating scope badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg border-l-4 border-secondary">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Scope Coverage
                    </p>
                    <p className="text-sm font-semibold text-primary leading-snug">
                      Basic & Detailed Engineering · FEED · Process Design · Key Equipment Supply · Site Execution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// Counter Card
const CounterCard = ({ stat, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.number;
      const duration = 2000;
      const incrementTime = 30;
      const steps = duration / incrementTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.number]);

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-white rounded-lg p-5 shadow-md border border-gray-100"
    >
      <p className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 leading-none`}>
        {count.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">
        {stat.label}
      </p>
      <div className={`h-1 w-8 ${stat.color.replace("text-", "bg-")} rounded-full mt-3`} />
    </motion.div>
  );
};

export default WorkInActionSection;
