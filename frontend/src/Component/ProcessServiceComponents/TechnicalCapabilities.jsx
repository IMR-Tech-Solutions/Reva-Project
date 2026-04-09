import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const capabilities = {
  studyScope: [
    "Technical Feasibility Reports",
    "Economic Viability Analysis",
    "Market Demand Assessment",
    "Environmental Impact Evaluation",
    "Regulatory Compliance Review",
    "Risk & Return Analysis",
    "Go / No-Go Decision Support",
    "Concept Selection & Screening",
  ],
  pilotPlant: [
    "Pilot Plant Process Design",
    "Equipment Sizing & Selection",
    "Operating Parameter Optimization",
    "Bottleneck Identification",
    "Mass & Energy Balance",
    "Safety & HSE Integration",
    "Data Collection & Analysis",
    "Scale-Up Methodology",
  ],
  expertise: [
    "Chemicals & Petrochemicals",
    "Biogas / CBG Plants",
    "Used Oil Distillation",
    "Pyrolysis Oil Refining",
    "Phenol-Formaldehyde Resin",
    "Fuel Gas Desulphurization",
    "Vapour Adsorption Units",
    "Environmental Technologies",
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const CapabilityColumn = ({ title, icon, items }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative"
  >
    <div className="mb-8">
      <div className="w-16 h-16 border-2 border-primary rounded-xl flex items-center justify-center mb-6 mx-auto">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-primary mb-3 text-center">{title}</h3>
      <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
    </div>

    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-3"
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group hover:border-secondary hover:bg-white hover:shadow-sm transition-all duration-300"
        >
          <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors">
            {item}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
);

const TechnicalCapabilities = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-secondary text-sm font-bold uppercase tracking-[0.3em]">
              Our Study Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-4">
            What We <span className="text-secondary">Assess & Design</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            From comprehensive feasibility reports to engineered pilot facilities —
            Reva provides the technical intelligence and hands-on design capability
            to validate your process before full-scale commitment.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-3">
          <CapabilityColumn
            title="Feasibility Study Scope"
            icon={<span className="text-2xl">📋</span>}
            items={capabilities.studyScope}
          />
          <CapabilityColumn
            title="Pilot Plant Design"
            icon={<span className="text-2xl">🔬</span>}
            items={capabilities.pilotPlant}
          />
          <CapabilityColumn
            title="Industries & Applications"
            icon={<FiCheckCircle className="w-8 h-8 text-secondary" />}
            items={capabilities.expertise}
          />
        </div>

        {/* Summary Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-6 lg:p-8 bg-gray-50 border-l-4 border-secondary rounded-2xl"
        >
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                Validate First. Build with Confidence.
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Reva's feasibility and pilot plant studies are designed to give
                clients a clear technical and commercial picture before any
                major capital commitment — reducing risk, improving project
                outcomes, and supporting smoother scale-up to commercial plants.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {[
                "De-Risk Investment",
                "Validate Process",
                "Optimize Parameters",
                "Support Scale-Up",
                "HSE Compliant",
                "Decision-Ready Reports",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white border-2 border-primary/20 text-primary text-xs font-semibold rounded-full hover:border-secondary hover:text-secondary transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TechnicalCapabilities;
