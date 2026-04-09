import React from "react";
import { motion } from "framer-motion";

const procurementHighlights = [
  {
    title: "Engineering-Driven Specifications",
    description:
      "Procurement at Reva begins in the engineering team — MRs and datasheets are prepared by the same engineers who designed the process, ensuring specifications are technically precise and unambiguous before going to vendors.",
    features: [
      "Process-aligned MR preparation",
      "Equipment datasheets & specs",
      "Zero ambiguity at bid stage",
    ],
    icon: "📐",
  },
  {
    title: "Active Expediting & Vendor Follow-Up",
    description:
      "Reva's procurement team actively tracks vendor manufacturing progress, drawing submissions, and dispatch readiness — intervening early when delays are identified rather than reacting after they impact site.",
    features: [
      "Regular vendor progress reviews",
      "Drawing submission tracking",
      "Proactive delay management",
    ],
    icon: "🚚",
  },
  {
    title: "Quality Assured Supply",
    description:
      "Every item procured goes through technical bid evaluation, vendor drawing approval, third-party inspection, and pre-dispatch verification — ensuring supplied equipment and materials arrive to spec, first time.",
    features: [
      "Third-party inspection coordination",
      "MTR & documentation review",
      "Pre-dispatch QA verification",
    ],
    icon: "✅",
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SupportServices = () => {
  return (
    <section className="relative bg-primary py-8 md:py-12 overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="inline-flex items-center gap-2 text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              The Reva Difference
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            Procurement That's Backed <br />
            <span className="text-secondary">by Engineering Intelligence</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Unlike standalone procurement agencies, Reva's procurement is
            executed by a team that understands the engineering — delivering
            specifications that are accurate, evaluations that are technically
            sound, and supply that is inspection-verified before despatch.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3"
        >
          {procurementHighlights.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />

              {/* Number */}
              <div className="absolute top-4 right-5 text-xs font-black text-white/10 group-hover:text-secondary/30 transition-colors duration-300">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="mb-5">
                <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center text-3xl group-hover:bg-secondary/30 transition-colors duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 pt-4 border-t border-white/10">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Spec-to-PO", value: "Single Team" },
            { label: "Vendor Evaluation", value: "Techno-Commercial" },
            { label: "Supply Quality", value: "Inspection-Verified" },
            { label: "Expediting", value: "Proactive" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 hover:border-secondary/30 transition-all duration-300"
            >
              <p className="text-secondary font-black text-sm sm:text-base mb-1">
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SupportServices;
