import React from "react";
import { motion } from "framer-motion";

const procurementSteps = [
  {
    phase: "01",
    title: "Engineering Basis & MR Preparation",
    description:
      "Review of engineering specifications, P&IDs, and equipment lists to prepare accurate Material Requisitions (MRs) and technical datasheets — forming the foundation for a clean, unambiguous procurement package.",
  },
  {
    phase: "02",
    title: "Vendor Identification & Pre-Qualification",
    description:
      "Identification of capable vendors from approved lists or through pre-qualification, assessing technical competence, quality certifications, manufacturing capacity, and past delivery performance.",
  },
  {
    phase: "03",
    title: "Bid Invitation & Techno-Commercial Evaluation",
    description:
      "Issue of enquiries, bid receipt, and structured techno-commercial comparison covering scope compliance, deviations, delivery schedule, commercial terms, and vendor track record — with clear award recommendations.",
  },
  {
    phase: "04",
    title: "PO Placement & Contract Finalization",
    description:
      "Purchase order preparation, scope and terms negotiation, and contract execution — ensuring supplier commitments on quality, schedule, documentation, and performance guarantees are fully defined before work begins.",
  },
  {
    phase: "05",
    title: "Expediting & Progress Monitoring",
    description:
      "Active vendor follow-up on manufacturing progress, drawing and document submissions, inspection readiness, and dispatch schedules — proactively managing delays before they impact site execution.",
  },
  {
    phase: "06",
    title: "Inspection, QA & Logistics Coordination",
    description:
      "Third-party inspection coordination, vendor drawing approval, pre-dispatch inspection, MTR verification, and logistics planning — ensuring every item arrives on site to specification, on time, and damage-free.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

const MaintenanceApproach = () => {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              Our Process
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            Procurement{" "}
            <span className="text-secondary">Step by Step</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            A structured, end-to-end procurement process — from engineering
            basis through vendor selection, PO placement, active expediting,
            and delivery — designed to keep your project on schedule and
            on spec.
          </p>
        </motion.div>

        {/* Process List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {procurementSteps.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.3 }}
              className="group flex gap-5 items-start bg-gray-50 hover:bg-white border border-gray-100 hover:border-secondary/30 hover:shadow-md rounded-2xl p-5 sm:p-6 transition-all duration-300"
            >
              {/* Phase Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-white border border-primary/10 group-hover:bg-secondary group-hover:border-secondary flex items-center justify-center shadow-sm transition-all duration-300">
                  <span className="text-sm font-black text-primary group-hover:text-white transition-colors duration-300">
                    {item.phase}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-xs sm:text-sm">
                  {item.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 text-gray-200 group-hover:text-secondary transition-colors duration-300 pt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
       <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="mt-10 p-6 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-4"
>
  <div className="text-center">
    <p className="text-primary font-bold text-base mb-1">
      One team. Engineering to delivery.
    </p>
    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl">
      Reva's in-house engineering and procurement teams work in tandem —
      specifications are precise, evaluations are technically grounded,
      and deviations are caught before they reach site.
    </p>
  </div>
</motion.div>


      </div>
    </section>
  );
};

export default MaintenanceApproach;
