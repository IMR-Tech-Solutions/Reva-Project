import React from "react";
import { motion } from "framer-motion";
import { FaRulerCombined, FaBoxOpen, FaHardHat } from "react-icons/fa"; // Perfect matches: ruler for engineering, box for procurement, helmet for construction [web:1][web:16]

const epcServices = [
  {
    title: "Engineering",
    description:
      "Comprehensive design, detailed engineering, and technical documentation including FEED, basic & detailed engineering, 3D modeling, and P&IDs.",
    icon: FaRulerCombined,
    points: ["FEED Studies", "Detailed Engineering", "3D Modeling", "Technical Documentation"]
  },
  {
    title: "Procurement",
    description:
      "Strategic sourcing, vendor management, quality assurance, and logistics coordination to ensure timely delivery of materials and equipment.",
    icon: FaBoxOpen,
    points: ["Vendor Selection", "Quality Control", "Logistics Management", "Contract Negotiation"]
  },
  {
    title: "Construction",
    description:
      "On-site execution, project management, safety compliance, and commissioning support ensuring seamless project delivery within budget and schedule.",
    icon: FaHardHat,
    points: ["Site Management", "Safety Compliance", "Quality Assurance", "Commissioning Support"]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

const EPCServices = () => {
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
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary uppercase tracking-widest text-xs sm:text-sm font-bold rounded-full mb-4">
            Complete EPC Delivery
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-4">
            Integrated EPC Services
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            End-to-end project execution covering every phase from concept to commissioning.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3"
        >
          {epcServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 hover:border-secondary/30 transition-colors duration-300"
            >
              
              {/* Icon */}
              <div className="mb-5">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-3xl text-secondary">
                  <service.icon />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-primary mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Key Points */}
              <ul className="space-y-2">
                {service.points.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default EPCServices;
