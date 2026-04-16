import React from "react";
import { motion } from "framer-motion";

const standards = {
  // software: [
  //   "Aspen HYSYS / Aspen Plus",
  //   "AVEVA E3D / PDMS",
  //   "AutoCAD Plant 3D",
  //   "SmartPlant P&ID",
  //   "HTRI (Heat Transfer)",
  //   "Caesar II (Pipe Stress)",
  //   "PV Elite (Vessel Design)",
  //   "STAAD.Pro (Structural)",
  // ],
  deliverables: [
    "PFDs & P&IDs (IFC Issue)",
    "Equipment Datasheets & Specs",
    "Piping Isometrics & GADs",
    "Civil & Structural Drawings",
    "Electrical SLDs & Layouts",
    "Instrument Loop Diagrams",
    "Material Take-Off (MTO)",
    "3D Model & Clash Reports",
  ],
  codes: [
    "ASME Sec VIII Div 1 & 2",
    "ASME B31.3 (Process Piping)",
    "API 650 / API 660 / API 661",
    "IS 875 / IS 1893 (Structural)",
    "IEC 60079 (Hazardous Area)",
    "ISO 10628 (P&ID symbols)",
    "TEMA Standards",
    "IBR Regulations",
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const columns = [
  // {
  //   key: "software",
  //   title: "Software & Tools",
  //   icon: "💻",
  //   label: "01",
  // },
  {
    key: "deliverables",
    title: "Key Deliverables",
    icon: "📐",
    label: "02",
  },
  {
    key: "codes",
    title: "Codes & Standards",
    icon: "📋",
    label: "03",
  },
];

const MaterialStandards = () => {
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

      {/* Glow accent */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="inline-flex items-center gap-2 text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              Technical Foundation
            </span>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            Tools, Deliverables &{" "}
            <span className="text-secondary">Engineering Standards</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Reva's detailed engineering is executed using industry-standard
            software, produces complete IFC-level deliverable packages, and is
            fully compliant with applicable international design codes.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          {columns.map((col, index) => (
            <motion.div
              key={col.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />

              <div className="mb-5">
                {/* Number + icon row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center text-2xl">
                    {col.icon}
                  </div>
                  <span className="text-xs font-bold text-secondary/60 uppercase tracking-widest">
                    {col.label}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300">
                  {col.title}
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
                {standards[col.key].map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-2.5 text-gray-300 group/item"
                  >
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0 mt-1.5 group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-xs sm:text-sm font-medium group-hover/item:text-white transition-colors duration-300">
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
  className="mt-10 flex flex-col items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-5"
>
  <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed text-center">
    All engineering deliverables are reviewed, stamped where required,
    and issued as{" "}
    <span className="text-white font-semibold">
      Issued for Construction (IFC)
    </span>{" "}
    documents — ensuring site teams have complete, accurate, and
    approved packages before mobilization.
  </p>
</motion.div>


      </div>
    </section>
  );
};

export default MaterialStandards;
