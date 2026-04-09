import React from "react";
import { motion } from "framer-motion";

const facilities = [
  {
    category: "Process & Simulation",
    items: [
      "PFD & P&ID development",
      "Heat & mass balance calculations",
      "Process simulation & modeling",
      "Equipment datasheet preparation",
      "Operating & control philosophy",
      "HAZOP & safety studies",
    ],
  },
  {
    category: "Multi-Discipline Design",
    items: [
      "Piping layouts & isometrics",
      "Stress analysis & support design",
      "Mechanical equipment specifications",
      "Civil & structural detailing",
      "Electrical SLDs & cable schedules",
      "Instrument index & loop diagrams",
    ],
  },
  {
    category: "Standards & Deliverables",
    items: [
      "ASME, API & ISO code compliance",
      "3D plant modeling & clash detection",
      "Vendor drawing review & approval",
      "Construction & as-built drawings",
      "Material take-off (MTO) packages",
      "IFC drawing issue management",
    ],
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ManufacturingFacilities = () => {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              Engineering Scope
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            What Our Detailed Engineering{" "}
            <span className="text-secondary">Covers</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Reva's detailed engineering scope spans all disciplines required for
            a complete, execution-ready engineering package — from process
            simulation through construction-issue drawings and vendor
            documentation.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-3">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-secondary/30 hover:shadow-md transition-all duration-300 group"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="mb-5">
                {/* Number badge */}
                <span className="inline-block px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-widest mb-3">
                  0{index + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                  {facility.category}
                </h3>
                <div className="w-12 h-1 bg-secondary rounded-full" />
              </div>

              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2.5"
              >
                {facility.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-3 text-gray-700 group/item"
                  >
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0 mt-1.5 group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-xs sm:text-sm font-medium group-hover/item:text-secondary transition-colors duration-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
       <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="mt-10 p-6 bg-primary rounded-2xl flex flex-col items-center justify-center gap-4"
>
  <div className="text-center">
    <p className="text-white font-bold text-base sm:text-lg mb-1">
      All deliverables issued to IFC standard
    </p>
    <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
      Every engineering package is reviewed, approved, and issued
      for construction — ready for procurement and site execution
      without gaps.
    </p>
  </div>
</motion.div>


      </div>
    </section>
  );
};

export default ManufacturingFacilities;
