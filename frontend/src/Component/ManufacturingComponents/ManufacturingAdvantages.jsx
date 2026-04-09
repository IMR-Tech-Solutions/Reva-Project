import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  GitMerge,
  ShieldCheck,
  Clock,
  FileCheck,
  Headphones,
} from "lucide-react";

const advantages = [
  {
    title: "Single-Team, Multi-Discipline Execution",
    description:
      "All engineering disciplines — process, piping, mechanical, civil, E&I — handled by one integrated team, eliminating inter-discipline coordination gaps and interface risks.",
    icon: Layers,
  },
  {
    title: "Design Rooted in Constructability",
    description:
      "Every drawing and deliverable is reviewed for site buildability — reducing RFIs, field changes, and rework during execution, saving time and cost.",
    icon: GitMerge,
  },
  {
    title: "Code-Compliant from Day One",
    description:
      "Engineering is designed to applicable codes (ASME, API, IEC, IS) from the start — not retrofitted for compliance at the review stage, avoiding costly late-stage rework.",
    icon: ShieldCheck,
  },
  {
    title: "On-Schedule IFC Delivery",
    description:
      "Structured engineering schedule with discipline-wise milestones, internal reviews, and client approval cycles — ensuring IFC packages are issued on time for procurement and site.",
    icon: Clock,
  },
  {
    title: "Complete Engineering Documentation",
    description:
      "Full deliverable register including PFDs, P&IDs, datasheets, isometrics, MTOs, drawings, and vendor documents — organized and traceable throughout the project lifecycle.",
    icon: FileCheck,
  },
  {
    title: "Engineering Support Through Execution",
    description:
      "Continued technical support during procurement, fabrication, and commissioning — including vendor drawing approval, site RFI resolution, and as-built preparation.",
    icon: Headphones,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

const ManufacturingAdvantages = () => {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              Why Choose Reva
            </span>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            Detailed Engineering That's <br />
            <span className="text-secondary">Built to Execute</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Reva's detailed engineering differentiators go beyond drawing
            production — they're about delivering packages that are
            constructible, code-compliant, and complete from day one.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-secondary/30 hover:bg-white hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon */}
              <div className="relative mb-4">
                <div className="w-14 h-14 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/20 group-hover:scale-110 transition-all duration-300">
                  <advantage.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors duration-300 stroke-[2px]" />
                </div>
                <div className="absolute inset-0 bg-secondary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                {advantage.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {advantage.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-secondary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Feature Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-14 grid gap-4 grid-cols-2 md:grid-cols-4"
        >
          {[
            "Multi-Discipline In-House",
            "IFC-Ready Deliverables",
            "ASME / API / IEC Compliant",
            "Site Execution Support",
          ].map((label) => (
            <div
              key={label}
              className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-secondary/30 hover:bg-white transition-all duration-300"
            >
              <div className="text-secondary font-black text-xl mb-1">✓</div>
              <div className="text-xs text-gray-700 font-semibold leading-snug">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ManufacturingAdvantages;
