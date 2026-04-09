// Pages/Services.jsx  (or drop this grid inside any existing page)
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  FlaskConical,
  Layers,
  ShoppingCart,
  HardHat,
  BarChart3,
  Wrench,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    number: "01",
    title: "Feasibility & Pilot Plant Study",
    tagline: "De-Risk Before You Invest",
    description:
      "Comprehensive feasibility studies evaluating technical viability, economic returns, environmental impact, and regulatory compliance — plus pilot plant design to validate processes before commercial-scale commitment.",
    icon: FlaskConical,
    href: "/feasibility",
    tags: ["Technical Feasibility", "Pilot Plant Design", "Economic Viability"],
  },
  {
    number: "02",
    title: "Basic Engineering",
    tagline: "Where Every Project Begins",
    description:
      "Simulation-backed engineering foundation covering design basis, PFDs, heat & mass balances, equipment sizing, P&IDs, and HAZID — delivering a complete Basic Engineering Package (BEP) ready for detailed engineering.",
    icon: FlaskConical,
    href: "/BasicEngineering",
    tags: ["PFDs & P&IDs", "H&MB", "Design Basis"],
  },
  {
    number: "03",
    title: "Detailed Engineering",
    tagline: "From Design to Execution-Ready",
    description:
      "Multi-discipline detailed engineering across process, piping, mechanical, civil, structural, electrical, and instrumentation — delivering IFC-level construction packages with 3D modeling and clash detection.",
    icon: Layers,
    href: "/detailed",
    tags: ["Piping & Isometrics", "3D Modeling", "IFC Packages"],
  },
  {
    number: "04",
    title: "Procurement & Expediting",
    tagline: "Right Quality. Right Time.",
    description:
      "End-to-end procurement from specification preparation and vendor evaluation through PO placement, active expediting, and pre-dispatch inspection — engineering-backed and schedule-driven.",
    icon: ShoppingCart,
    href: "/procurement",
    tags: ["Vendor Evaluation", "PO Placement", "Expediting"],
  },
  {
    number: "05",
    title: "EPC Project Management",
    tagline: "On-Time. On-Budget. Zero Gaps.",
    description:
      "Dedicated EPC project management integrating engineering, procurement, and construction into a single coordinated execution framework — with schedule control, risk management, and stakeholder reporting.",
    icon: BarChart3,
    href: "/project",
    tags: ["Schedule Control", "Risk Management", "Milestone Tracking"],
  },
  {
    number: "06",
    title: "Manufacturing & Site Services",
    tagline: "Fabricated, Erected, Commissioned",
    description:
      "Precision fabrication of process equipment combined with on-site installation, supervision, and commissioning services — coordinating all site disciplines through to performance-proven plant handover.",
    icon: Wrench,
    href: "/site",
    tags: ["Equipment Fabrication", "Site Erection", "Commissioning"],
  },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const ServicesSection = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

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
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              What We Do
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            Our <span className="text-secondary">Services</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Six integrated service capabilities spanning the full project
            lifecycle — from feasibility and engineering through procurement,
            manufacturing, and site commissioning.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(0,0,0,0.08)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden flex flex-col hover:border-secondary/30 transition-all duration-300"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Step number */}
              <span className="absolute top-5 right-5 text-3xl font-black text-gray-100 group-hover:text-secondary/15 transition-colors duration-300 leading-none select-none">
                {service.number}
              </span>

              {/* Icon */}
              <div className="mb-5 relative">
                <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon
                    className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300"
                    strokeWidth={2}
                  />
                </div>
              </div>

              {/* Title & tagline */}
              <h3 className="text-base sm:text-lg font-bold text-primary mb-1 group-hover:text-secondary transition-colors duration-300 pr-8">
                {service.title}
              </h3>
              <p className="text-xs text-secondary font-semibold uppercase tracking-widest mb-3">
                {service.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-500 text-xs font-medium rounded-full group-hover:border-secondary/20 group-hover:bg-secondary/5 group-hover:text-secondary transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA link */}
              <a
                href={service.href}
                className="group/btn inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all duration-300 mt-auto"
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;
