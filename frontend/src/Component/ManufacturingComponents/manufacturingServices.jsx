import React from "react";
import { motion } from "framer-motion";
import {
  FaDraftingCompass,
  FaProjectDiagram,
  FaCogs,
  FaBuilding,
  FaBolt,
  FaLayerGroup,
} from "react-icons/fa";

const detailedEngineeringServices = [
  {
    title: "Process Engineering",
    description:
      "Development of PFDs, P&IDs, heat & mass balances, equipment datasheets, process simulations, and operating philosophies for all process units.",
    icon: FaDraftingCompass,
  },
  {
    title: "Piping Engineering",
    description:
      "Piping layouts, isometrics, stress analysis, support design, and 3D piping models ensuring constructible and code-compliant routing across all plant areas.",
    icon: FaProjectDiagram,
  },
  {
    title: "Mechanical Engineering",
    description:
      "Equipment specifications, mechanical datasheets, vendor drawing review, and engineering for static and rotating equipment aligned with ASME and API standards.",
    icon: FaCogs,
  },
  {
    title: "Civil & Structural Engineering",
    description:
      "Foundation design, structural steel detailing, pipe racks, equipment platforms, and plant building structures engineered for load cases and site conditions.",
    icon: FaBuilding,
  },
  {
    title: "Electrical & Instrumentation",
    description:
      "Electrical load lists, single-line diagrams, cable schedules, instrument index, control philosophy, loop diagrams, and hazardous area classification drawings.",
    icon: FaBolt,
  },
  {
    title: "3D Plant Modeling & Review",
    description:
      "Integrated 3D models for clash detection, constructability review, and model-based deliverables — reducing rework during site execution and commissioning.",
    icon: FaLayerGroup,
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

const ManufacturingServices = () => {
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
              Engineering Disciplines
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            Detailed Engineering{" "}
            <span className="text-secondary">Capabilities</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Reva delivers multi-discipline detailed engineering packages that are
            constructible, code-compliant, and execution-ready — covering every
            discipline from process through civil, structural, electrical, and
            instrumentation.
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
          {detailedEngineeringServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative bg-white border border-gray-200 rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:border-secondary hover:shadow-lg overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Step number badge */}
              <div className="absolute top-4 right-5 text-4xl font-black text-gray-50 group-hover:text-secondary/10 transition-colors duration-300 pointer-events-none select-none">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="mb-6 relative">
                <div className="w-16 h-16 bg-gray-50 group-hover:bg-secondary border border-gray-100 group-hover:border-secondary rounded-2xl flex items-center justify-center transition-all duration-300">
                  <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ManufacturingServices;
