import React from "react";
import { motion } from "framer-motion";

const projectPhases = [
  {
    phase: "01",
    title: "Project Initiation & FEED",
    description: "Feasibility studies, conceptual design, cost estimation, and front-end engineering definition.",
  },
  {
    phase: "02",
    title: "Detailed Engineering",
    description: "Complete design documentation, P&IDs, equipment specifications, 3D models, and construction drawings.",
  },
  {
    phase: "03",
    title: "Procurement & Logistics",
    description: "Vendor selection, material procurement, quality inspections, and delivery coordination.",
  },
  {
    phase: "04",
    title: "Construction & Installation",
    description: "On-site execution, civil/mechanical/electrical works, safety management, and progress monitoring.",
  },
  {
    phase: "05",
    title: "Commissioning & Handover",
    description: "System testing, performance validation, training, documentation, and final project handover.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ProjectLifecycle = () => {
  return (
    <section className="py-8 md:py-12 bg-[hsl(220,15%,98%)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 lg:mb-12 max-w-3xl mx-auto"
        >
          <span className="inline-block bg-[#F4B400]/10 text-[#F4B400] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
            Project Execution
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
            EPC <span className="text-[#F4B400]">Project Lifecycle</span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Structured approach ensuring seamless execution from concept to completion.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Central Line */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#2F3F8F]/20" />

          {projectPhases.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.phase}
                variants={itemVariants}
                className={`flex flex-col lg:flex-row items-start gap-8 mb-20 lg:mb-2 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Step Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-[#2F3F8F] flex items-center justify-center shadow-xl shadow-[#2F3F8F]/20 lg:shadow-2xl border-4 border-white mx-auto lg:mx-0 z-10"
                >
                  <span className="text-2xl lg:text-lg font-black text-white">
                    {item.phase}
                  </span>
                </motion.div>

                {/* Content Card */}
                <div className="flex-1 lg:max-w-md p-8 lg:p-10 rounded-3xl shadow-2xl border border-[#F3F4F6] hover:border-[#F4B400]/50 hover:shadow-[#2F3F8F]/10 transition-all duration-500 bg-white group">
                  <h3 className="text-sm md:text-xl font-bold text-secondary group-hover:text-[#2F3F8F] transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Mobile connector */}
                <div className="lg:hidden w-full h-px bg-[#2F3F8F]/20 mt-8" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectLifecycle;
