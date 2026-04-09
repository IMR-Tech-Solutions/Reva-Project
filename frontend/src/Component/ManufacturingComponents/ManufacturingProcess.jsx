import React from "react";
import { motion } from "framer-motion";

const processSteps = [
  {
    phase: "01",
    title: "Client Brief & Scope Definition",
    description:
      "Detailed review of client requirements, project specifications, applicable codes, site conditions, and engineering basis — establishing a clear scope of work before design begins.",
  },
  {
    phase: "02",
    title: "Basic Engineering & FEED Review",
    description:
      "Review and validation of FEED documents, process simulations, and equipment lists to establish a solid engineering foundation for detailed design across all disciplines.",
  },
  {
    phase: "03",
    title: "Multi-Discipline Detailed Design",
    description:
      "Parallel development of process, piping, mechanical, civil, structural, electrical, and instrumentation engineering — coordinated through a single integrated project team.",
  },
  {
    phase: "04",
    title: "3D Modeling & Clash Detection",
    description:
      "Plant-wide 3D modeling using AVEVA E3D or equivalent tools, with inter-discipline clash detection and constructability reviews to eliminate field rework before IFC issue.",
  },
  {
    phase: "05",
    title: "Review, Approval & IFC Issue",
    description:
      "Internal design reviews, client approval cycles, and HAZOP/safety study incorporation — followed by formal Issued for Construction (IFC) release of all engineering packages.",
  },
  {
    phase: "06",
    title: "Site & Procurement Support",
    description:
      "Continued engineering support during procurement, fabrication, and site execution — including vendor drawing review, RFI responses, and as-built drawing preparation.",
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

const ManufacturingProcess = () => {
  return (
    <section className="bg-gray-50 py-8 md:py-12">
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
              Our Approach
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            Detailed Engineering{" "}
            <span className="text-secondary">Workflow</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            A disciplined, phase-by-phase engineering process — from scope
            definition through IFC issue and site support — ensuring every
            deliverable is complete, coordinated, and construction-ready.
          </p>
        </motion.div>

        {/* Workflow List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {processSteps.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.3 }}
              className="group flex gap-5 items-start bg-white hover:bg-white border border-gray-100 hover:border-secondary/30 hover:shadow-md rounded-2xl p-5 sm:p-6 transition-all duration-300"
            >
              {/* Phase Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 group-hover:bg-secondary group-hover:border-secondary flex items-center justify-center transition-all duration-300">
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
          className="mt-10 p-6 bg-white border border-gray-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
        >
          <div>
            <p className="text-primary font-bold text-base mb-1">
              Every step. Every discipline. One team.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Reva manages the full detailed engineering scope in-house —
              eliminating coordination gaps between disciplines and giving
              clients a single point of accountability.
            </p>
          </div>
         
        </motion.div>

      </div>
    </section>
  );
};

export default ManufacturingProcess;
