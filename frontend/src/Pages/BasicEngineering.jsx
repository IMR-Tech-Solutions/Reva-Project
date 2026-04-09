// pages/services/BasicEngineering.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FlaskConical,
  GitBranch,
  Layers,
  SlidersHorizontal,
  FileText,
  ShieldCheck,
} from "lucide-react";
import Breadcrumb from "../Component/Breadcrumb";

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    title: "Process Scheme Development",
    description:
      "Development of block flow diagrams (BFDs) and process flow diagrams (PFDs) defining the overall process route, unit operations, stream flows, and key operating conditions.",
    icon: GitBranch,
  },
  {
    title: "Heat & Mass Balance",
    description:
      "Rigorous heat and mass balance calculations for all process streams and equipment, forming the quantitative foundation for equipment sizing, utility estimation, and energy integration.",
    icon: SlidersHorizontal,
  },
  {
    title: "Equipment Sizing & Selection",
    description:
      "Preliminary sizing and selection of major process equipment — reactors, columns, heat exchangers, vessels, pumps, and compressors — with performance specifications and design basis.",
    icon: Layers,
  },
  {
    title: "P&ID Development",
    description:
      "Preparation of Piping & Instrumentation Diagrams (P&IDs) capturing process lines, instrumentation, control loops, safety systems, and equipment interconnections to ANSI/ISA standards.",
    icon: FlaskConical,
  },
  {
    title: "Engineering Basis Documentation",
    description:
      "Preparation of design basis documents covering process conditions, utility systems, site data, applicable codes and standards, and engineering philosophy for the project.",
    icon: FileText,
  },
  {
    title: "Safety & Regulatory Alignment",
    description:
      "Integration of safety studies, hazard identification (HAZID), and regulatory compliance checks at the basic engineering stage — reducing risk before detailed design commences.",
    icon: ShieldCheck,
  },
];

const processSteps = [
  {
    phase: "01",
    title: "Design Basis Establishment",
    description:
      "Review of client requirements, site data, feed compositions, product specifications, applicable codes, and regulatory framework to establish an agreed engineering design basis before any design work begins.",
  },
  {
    phase: "02",
    title: "Process Scheme & BFD Development",
    description:
      "Development of the overall process route, technology selection rationale, block flow diagrams, and preliminary material balance to define the conceptual design framework.",
  },
  {
    phase: "03",
    title: "PFD & Heat/Mass Balance",
    description:
      "Rigorous process simulation and development of PFDs with heat and mass balances, stream data tables, and utility consumption estimates across all operating cases.",
  },
  {
    phase: "04",
    title: "Equipment Sizing & Datasheet Preparation",
    description:
      "Preliminary sizing of all major process and utility equipment with preparation of equipment lists and preliminary datasheets for use in FEED and procurement planning.",
  },
  {
    phase: "05",
    title: "P&ID Development & HAZID",
    description:
      "Development of P&IDs to define process control, instrumentation philosophy, and safety systems, followed by HAZID review to identify and address major hazards at an early stage.",
  },
  {
    phase: "06",
    title: "Basic Engineering Package (BEP) Issue",
    description:
      "Compilation and issue of the complete Basic Engineering Package — covering design basis, PFDs, P&IDs, equipment list, datasheets, utility summary, and plot plan — ready for FEED or detailed engineering.",
  },
];

const highlights = [
  {
    title: "Process Simulation–Backed Design",
    description:
      "Reva uses industry-standard simulation tools (Aspen HYSYS / Aspen Plus) to build rigorous process models — ensuring heat and mass balances are accurate and equipment sizing is grounded in real process behaviour.",
    features: [
      "Rigorous process simulation",
      "Multi-case operating scenarios",
      "Energy integration studies",
    ],
    icon: "⚗️",
  },
  {
    title: "Technology-Agnostic Approach",
    description:
      "Reva evaluates multiple process routes and technology options objectively — recommending the solution that best fits client performance, cost, operability, and reliability requirements, not a preferred vendor's package.",
    features: [
      "Route selection & comparison",
      "Technology evaluation matrix",
      "Client-aligned recommendation",
    ],
    icon: "🔬",
  },
  {
    title: "Safety-First from Day One",
    description:
      "HAZID and regulatory compliance checks are built into the basic engineering stage — identifying and addressing major hazards in design before they are locked in, reducing costly changes during detailed engineering.",
    features: [
      "Early HAZID integration",
      "Regulatory compliance review",
      "Safe design philosophy",
    ],
    icon: "🛡️",
  },
];

const whyPoints = [
  {
    title: "Simulation-Backed Accuracy",
    description:
      "Every heat and mass balance is built on a rigorous process simulation model — not spreadsheet estimates — ensuring equipment sizing is accurate from the start.",
    metric: "Rigorous",
    metricLabel: "Simulation Models",
  },
  {
    title: "Multi-Discipline from the Start",
    description:
      "Basic engineering at Reva involves process, piping, mechanical, civil, and instrumentation inputs early — preventing downstream design conflicts during detailed engineering.",
    metric: "All-Disc",
    metricLabel: "Early Coordination",
  },
  {
    title: "BEP Ready for FEED or Detail",
    description:
      "Reva's Basic Engineering Package is structured to serve directly as the input to FEED studies, detailed engineering, or client's own engineering team — with zero gaps.",
    metric: "BEP",
    metricLabel: "Complete Package",
  },
  {
    title: "Code-Compliant from Concept",
    description:
      "Applicable codes, standards, and regulatory requirements are identified and embedded in the design basis — not applied retrospectively during detailed engineering.",
    metric: "Day 1",
    metricLabel: "Code Alignment",
  },
  {
    title: "Risk Identified Early",
    description:
      "HAZID and operability studies integrated at the basic engineering stage mean major hazards are addressed when changes are cheapest — not during construction or commissioning.",
    metric: "Early",
    metricLabel: "HAZID & Risk Review",
  },
  {
    title: "Single Engineering Team",
    description:
      "The same team that delivers basic engineering continues through detailed engineering and procurement — ensuring design intent is preserved through every phase of execution.",
    metric: "1 Team",
    metricLabel: "Full Continuity",
  },
];

const standards = {
  software: [
    "Aspen HYSYS / Aspen Plus",
    "SmartPlant P&ID",
    "AutoCAD & Plant 3D",
    "HTRI (Heat Transfer Research)",
    "Microsoft Visio / PFD tools",
    "PV Elite (vessel checks)",
  ],
  deliverables: [
    "Design Basis Document",
    "Block Flow Diagrams (BFDs)",
    "Process Flow Diagrams (PFDs)",
    "Heat & Mass Balance Tables",
    "Equipment List & Datasheets",
    "P&IDs (Approved for Design)",
    "Utility Summary",
    "Plot Plan (Preliminary)",
  ],
  codes: [
    "ASME Sec VIII (vessels)",
    "ASME B31.3 (process piping)",
    "API 650 / API 660",
    "ISO 10628 (P&ID symbols)",
    "IEC 61511 (functional safety)",
    "IS 875 / IS 1893 (loads)",
    "TEMA Standards",
    "IBR Regulations",
  ],
};

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─── HERO ─────────────────────────────────────────────────────────────────────

const BasicEngineeringHero = () => (
  <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24">
    <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-transparent -z-10" />
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="hidden lg:block absolute top-20 left-10 w-2 h-2 bg-secondary/40 rounded-full"
    />
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
      className="hidden lg:block absolute top-40 right-20 w-3 h-3 bg-primary/30 rounded-full"
    />
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
      className="hidden lg:block absolute bottom-32 left-1/4 w-2 h-2 bg-secondary/30 rounded-full"
    />

    <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="order-2 lg:order-1 flex flex-col gap-5"
      >
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm uppercase tracking-widest text-secondary font-semibold"
        >
          Services / Basic Engineering
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold leading-tight text-primary"
        >
          Basic Engineering <br />
          <span className="text-secondary">Where Every Project Begins</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-600 text-base sm:text-lg leading-relaxed"
        >
          Reva develops rigorous basic engineering packages — covering process
          schemes, PFDs, heat &amp; mass balances, equipment sizing, P&amp;IDs,
          and design basis documentation — providing a technically sound
          foundation for detailed engineering, procurement, and plant
          construction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-2"
        >
          {[
            "PFDs & P&IDs",
            "Heat & Mass Balance",
            "Equipment Sizing",
            "Design Basis",
            "Process Simulation",
            "HAZID Studies",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 border border-primary/20 bg-primary/5 text-primary text-xs font-semibold rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-1"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group inline-flex items-center justify-center gap-3 bg-secondary text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Discuss Your Engineering Scope
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
          <motion.a
            href="/services"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base"
          >
            View All Services
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="order-1 lg:order-2"
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative group"
        >
          <img
            src="./hero2.png"
            alt="Reva Basic Engineering – PFDs, P&IDs, Process Simulation and Design Basis"
            className="w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl border-l-4 border-secondary"
          >
            <p className="text-sm font-bold text-primary leading-none mb-0.5">
              Complete BEP Package
            </p>
            <p className="text-xs text-gray-500 font-medium">
              Design Basis · PFDs · P&IDs · Datasheets
            </p>
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="hidden md:block absolute -bottom-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
          />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ─── SERVICES GRID ────────────────────────────────────────────────────────────

const BasicEngineeringServices = () => (
  <section className="bg-gray-50 py-8 md:py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-16">
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
            What We Cover
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
          Basic Engineering <span className="text-secondary">Scope</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
          Reva's basic engineering scope covers all elements required to
          establish a technically rigorous, simulation-backed engineering
          foundation — ready for FEED, detailed engineering, or direct project
          execution.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden cursor-pointer hover:border-secondary/30"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="absolute top-4 right-5 text-xs font-black text-gray-200 group-hover:text-secondary/30 transition-colors duration-300">
              0{index + 1}
            </div>
            <div className="relative mb-4">
              <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/20 group-hover:scale-110 transition-all duration-300">
                <service.icon
                  className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300"
                  strokeWidth={2}
                />
              </div>
            </div>
            <h3 className="relative text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
              {service.title}
            </h3>
            <p className="relative text-xs sm:text-sm text-gray-600 leading-relaxed">
              {service.description}
            </p>
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── WORKFLOW ─────────────────────────────────────────────────────────────────

const BasicEngineeringWorkflow = () => (
  <section className="bg-white py-8 md:py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-16">
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
          Basic Engineering <span className="text-secondary">Workflow</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          A structured, phase-by-phase approach — from design basis through
          complete BEP issue — ensuring every deliverable is technically
          grounded, coordinated, and ready for the next project phase.
        </p>
      </motion.div>

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
            className="group flex gap-5 items-start bg-gray-50 hover:bg-white border border-gray-100 hover:border-secondary/30 hover:shadow-md rounded-2xl p-5 sm:p-6 transition-all duration-300"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-white border border-primary/10 group-hover:bg-secondary group-hover:border-secondary flex items-center justify-center shadow-sm transition-all duration-300">
                <span className="text-sm font-black text-primary group-hover:text-white transition-colors duration-300">
                  {item.phase}
                </span>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-xs sm:text-sm">
                {item.description}
              </p>
            </div>
            <div className="flex-shrink-0 text-gray-200 group-hover:text-secondary transition-colors duration-300 pt-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── TOOLS & DELIVERABLES ─────────────────────────────────────────────────────

const BasicEngineeringStandards = () => {
  const columns = [
    { key: "software", title: "Software & Tools", icon: "💻", label: "01" },
    { key: "deliverables", title: "BEP Deliverables", icon: "📐", label: "02" },
    { key: "codes", title: "Codes & Standards", icon: "📋", label: "03" },
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const listItem = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="relative bg-primary py-8 md:py-12 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
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
            Reva's basic engineering is executed using industry-standard
            simulation and design software, produces a complete BEP deliverable
            set, and is fully compliant with applicable international codes.
          </p>
        </motion.div>

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
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
              <div className="mb-5">
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
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2.5"
              >
                {standards[col.key].map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={listItem}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 
             bg-white/5 border border-white/10 rounded-2xl px-6 py-5"
        >
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed text-center">
            All basic engineering deliverables are reviewed, approved, and
            issued as{" "}
            <span className="text-white font-semibold">
              Approved for Design (AFD)
            </span>{" "}
            documents — ensuring detailed engineering, procurement, and
            construction teams have a complete, accurate baseline to work from.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ─── HIGHLIGHTS (dark cards) ──────────────────────────────────────────────────

const BasicEngineeringHighlights = () => (
  <section className="relative bg-primary py-8 md:py-12 overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute top-20 right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]"
    />

    <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
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
          Basic Engineering That's <br />
          <span className="text-secondary">
            Built to Last Through Execution
          </span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          Reva's basic engineering doesn't stop at documentation — it's
          simulation-backed, multi-discipline coordinated, and structured to
          carry through detailed engineering, procurement, and site without
          rework or gaps.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3"
      >
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            variants={scaleVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
            <div className="absolute top-4 right-5 text-xs font-black text-white/10 group-hover:text-secondary/30 transition-colors duration-300">
              0{index + 1}
            </div>
            <div className="mb-5">
              <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center text-3xl group-hover:bg-secondary/30 transition-colors duration-300">
                {item.icon}
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
              {item.description}
            </p>
            <ul className="space-y-2 pt-4 border-t border-white/10">
              {item.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs text-gray-300"
                >
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Design Approach", value: "Simulation-Backed" },
          { label: "Discipline Coordination", value: "Multi-Discipline" },
          { label: "Package Issue", value: "AFD Standard" },
          { label: "Team Continuity", value: "Basic → Detail" },
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

// ─── WHY REVA ─────────────────────────────────────────────────────────────────

const BasicEngineeringWhyReva = () => (
  <section className="bg-white py-8 md:py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-16">
      <div className="grid gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-2">
        {/* Left sticky */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              Value Proposition
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-5 leading-tight">
            Why Reva for <br />
            <span className="text-secondary">Basic Engineering?</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            Reva's basic engineering is not a documentation exercise — it's a
            technically rigorous, simulation-validated foundation designed to
            carry your project through detailed engineering, procurement, and
            construction without gaps or rework.
          </p>
          <div className="space-y-3">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 p-4 bg-secondary/5 border-l-4 border-secondary rounded-r-xl hover:bg-secondary/10 transition-colors group"
            >
              <span className="text-2xl">📞</span>
              <div>
                <div className="text-xs text-gray-500 font-semibold">
                  Engineering Enquiries
                </div>
                <div className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                  +91 98765 43210
                </div>
              </div>
            </a>
            <a
              href="mailto:info@revaprocesstechnologies.com"
              className="flex items-center gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl hover:bg-primary/10 transition-colors group"
            >
              <span className="text-2xl">✉️</span>
              <div>
                <div className="text-xs text-gray-500 font-semibold">
                  Email Us
                </div>
                <div className="text-sm font-bold text-primary group-hover:text-secondary transition-colors break-all">
                  info@revaprocesstechnologies.com
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5"
        >
          {whyPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={listItemVariants}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.3 }}
              className="group flex gap-5 items-start border-l-4 border-gray-200 hover:border-secondary pl-6 py-4 transition-colors duration-300"
            >
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-300">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {point.description}
                </p>
              </div>
              <div className="flex-shrink-0 text-right min-w-[80px]">
                <div className="text-xl sm:text-2xl font-black text-secondary leading-none mb-1">
                  {point.metric}
                </div>
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide leading-tight">
                  {point.metricLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 pt-10 border-t-2 border-gray-100"
      >
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 text-center">
          {[
            { value: "Simulation", label: "Backed H&MB" },
            { value: "Multi-Disc", label: "Coordination" },
            { value: "AFD Issue", label: "Full BEP Package" },
            { value: "1 Team", label: "Basic to Detailed" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-lg sm:text-2xl font-black text-secondary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── CTA BANNER ───────────────────────────────────────────────────────────────

const BasicEngineeringCTA = () => (
  <section className="bg-gray-50 py-8 md:py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-primary rounded-3xl px-8 py-12 md:py-16 text-center relative overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 right-0 w-80 h-80 bg-secondary rounded-full blur-[100px]"
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
            Start Strong
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Ready to Build on a <br />
            <span className="text-secondary">
              Solid Engineering Foundation?
            </span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
            Talk to Reva's engineering team about your project — greenfield or
            brownfield, process design from scratch or FEED review. We'll scope
            the right basic engineering engagement for your needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 bg-secondary text-white font-semibold px-8 py-4 rounded-lg hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              Discuss Your Project
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
            >
              View All Services
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── PAGE ASSEMBLY ────────────────────────────────────────────────────────────

const BasicEngineering = () => {
  return (
    <>
      <Breadcrumb />

      <BasicEngineeringHero />
      <BasicEngineeringServices />
      <BasicEngineeringWorkflow />
      <BasicEngineeringStandards />
      <BasicEngineeringHighlights />
      <BasicEngineeringWhyReva />
      <BasicEngineeringCTA />
    </>
  );
};

export default BasicEngineering;
