import React from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaBalanceScale,
  FaHandshake,
  FaTruck,
  FaSearchPlus,
  FaBoxes,
} from "react-icons/fa";

const procurementServices = [
  {
    title: "Specification & MR Preparation",
    description:
      "Development of detailed material requisitions (MRs), equipment specifications, and technical datasheets aligned with engineering design requirements and applicable codes.",
    icon: FaClipboardList,
  },
  {
    title: "Vendor Identification & Evaluation",
    description:
      "Identification of qualified vendors from approved lists, pre-qualification assessments, and technical capability reviews to ensure suppliers meet project quality and delivery standards.",
    icon: FaBalanceScale,
  },
  {
    title: "Techno-Commercial Comparison",
    description:
      "Structured bid evaluation covering technical compliance, commercial terms, delivery schedules, and vendor track record — providing clear recommendations for purchase order award.",
    icon: FaHandshake,
  },
  {
    title: "PO Placement & Contract Management",
    description:
      "Purchase order preparation, terms negotiation, and contract management to ensure supplier commitments on scope, quality, schedule, and documentation are clearly defined and enforceable.",
    icon: FaClipboardList,
  },
  {
    title: "Expediting & Delivery Tracking",
    description:
      "Active follow-up with vendors on manufacturing progress, drawing submissions, inspection readiness, and dispatch — ensuring equipment and materials arrive on schedule to support site execution.",
    icon: FaTruck,
  },
  {
    title: "Inspection & QA Coordination",
    description:
      "Third-party inspection coordination, vendor drawing review and approval, pre-dispatch inspections, and material test record (MTR) verification to ensure supplied items meet specification.",
    icon: FaSearchPlus,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const MaintenanceServices = () => {
  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              What We Handle
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            Procurement &amp; Expediting{" "}
            <span className="text-secondary">Services</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Reva manages every stage of the procurement cycle — from specification
            preparation and vendor evaluation through PO placement, active
            expediting, and pre-dispatch inspection — ensuring right quality,
            right time, every time.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {procurementServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden cursor-pointer hover:border-secondary/30"
            >
              {/* Decorative blob */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Step number */}
              <div className="absolute top-4 right-5 text-xs font-black text-gray-200 group-hover:text-secondary/30 transition-colors duration-300">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="relative mb-4">
                <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
              </div>

              {/* Title */}
              <h3 className="relative text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative text-xs sm:text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
     <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="mt-10 p-6 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-sm"
>
  <div className="text-center">
    <p className="text-primary font-bold text-base mb-1">
      Procurement aligned with engineering — not separate from it.
    </p>
    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl">
      Because Reva's engineering and procurement teams work under one roof,
      specifications are precise, vendor evaluations are technically sound,
      and deviations are caught early — before they reach site.
    </p>
  </div>
</motion.div>


      </div>
    </section>
  );
};

export default MaintenanceServices;
