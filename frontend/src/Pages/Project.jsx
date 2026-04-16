import { motion } from "framer-motion";
import Breadcrumb from "../Component/Breadcrumb";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
  FiTarget,
  FiClock,
  FiDollarSign,
  FiAward,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";

const approach = [
  {
    icon: <FiTarget />,
    step: "01",
    title: "Planning & Initiation",
    description:
      "Define project scope, objectives, deliverables, and success criteria with detailed planning and resource allocation.",
  },
  {
    icon: <FiUsers />,
    step: "02",
    title: "Team Coordination",
    description:
      "Assemble and manage cross-functional teams, assign responsibilities, and ensure seamless collaboration across all disciplines.",
  },
  {
    icon: <FiTrendingUp />,
    step: "03",
    title: "Execution & Monitoring",
    description:
      "Track progress against schedules, manage budgets, control changes, and implement corrective actions as needed.",
  },
  {
    icon: <FiCheckCircle />,
    step: "04",
    title: "Completion & Handover",
    description:
      "Ensure quality standards are met, conduct final inspections, deliver documentation, and facilitate smooth handover.",
  },
];

const services = [
  {
    title: "Project Planning & Scheduling",
    description:
      "Detailed project plans, WBS, critical path analysis, resource loading, and schedule development using Primavera P6 and MS Project.",
  },
  {
    title: "Budget & Cost Management",
    description:
      "Cost estimation, budget preparation, cash flow forecasting, cost control, and earned value management.",
  },
  {
    title: "Risk Management",
    description:
      "Risk identification, qualitative and quantitative analysis, mitigation planning, and continuous monitoring.",
  },
  {
    title: "Procurement Management",
    description:
      "Vendor prequalification, bid evaluation, contract negotiation, PO management, and logistics coordination.",
  },
  {
    title: "Quality Assurance & Control",
    description:
      "Quality management systems, inspection and test plans, non-conformance management, and deliverable verification.",
  },
  {
    title: "Stakeholder Communication",
    description:
      "Progress reporting, stakeholder meetings, change management, documentation control, and transparent communication.",
  },
  {
    title: "Construction Management",
    description:
      "Site supervision, contractor coordination, safety oversight, progress monitoring, and punch list management.",
  },
  {
    title: "Commissioning Support",
    description:
      "Pre-commissioning planning, testing procedures, start-up coordination, performance verification, and ops transition.",
  },
];

const benefits = [
  { icon: <FiClock />, title: "On-Time Delivery", description: "Proven track record of delivering projects on schedule through effective planning and proactive monitoring." },
  { icon: <FiDollarSign />, title: "Budget Control", description: "Rigorous cost management ensures projects stay within budgets with full financial transparency." },
  { icon: <FiAward />, title: "Quality Assurance", description: "Comprehensive quality systems guarantee all deliverables meet or exceed specified requirements." },
  { icon: <FiUsers />, title: "Experienced Team", description: "Certified PMs with deep technical knowledge across diverse engineering disciplines." },
  { icon: <FiFileText />, title: "Clear Communication", description: "Transparent reporting and communication channels ensure alignment throughout the lifecycle." },
  { icon: <FiCheckCircle />, title: "Risk Mitigation", description: "Systematic risk management identifies issues early and minimizes project disruptions." },
];

const industries = [
  "Oil & Gas Refineries", "Petrochemical Plants", "Chemical Processing",
  "Pharmaceutical Manufacturing", "Power Generation", "Water Treatment",
  "Food & Beverage", "Mining & Minerals", "Steel & Metallurgy",
  "Environmental Engineering", "Renewable Energy", "Infrastructure Projects",
];

const ProjectManagement = () => {
  return (
    <div className="bg-background">
      <Breadcrumb />

      {/* ── HERO ── Full dark strip */}
      <section className="relative bg-primary overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-[300px] h-[300px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full border border-white/5 pointer-events-none -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5
                               bg-secondary/20 text-secondary border border-secondary/30
                               text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                Professional Services
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
                Project<br />
                <span className="text-secondary">Management</span><br />
                Excellence
              </h1>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
                From initial planning through commissioning and handover — we manage
                every aspect of your engineering project with precision, transparency,
                and proven methodology.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6">
                {[
                  { value: "250+", label: "Projects Delivered" },
                  { value: "98%", label: "On-Time Rate" },
                  { value: "15+", label: "Years Experience" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-black text-secondary">{s.value}</p>
                    <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden h-[380px] sm:h-[440px]">
                <img
                  src="/project.jpg"
                  alt="Project Management"
                  className="w-full h-full object-cover"
                />

              </div>

              {/* Floating card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-2xl">
                <p className="text-primary font-black text-xl">40+</p>
                <p className="text-gray-500 text-xs">Industries Served</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── APPROACH — Horizontal timeline ── */}
      <section className="py-8 md:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5
                             bg-secondary/10 text-secondary border border-secondary/30
                             text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
              Our 4-Step Approach
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {approach.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative group"
              >
                {/* Connector line */}
                {index < approach.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-1rem)] w-8 h-px bg-gray-200 z-10" />
                )}

                <div className="p-6 lg:pr-10 border-b-2 border-transparent
                                group-hover:border-secondary transition-all duration-300">
                  {/* Step badge */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary
                                    flex items-center justify-center
                                    text-white text-xl
                                    group-hover:bg-secondary transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="text-4xl font-black text-gray-100 group-hover:text-secondary/20 transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — 2-col asymmetric ── */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-[35%_1fr] gap-12 lg:gap-20 items-start">

            {/* Sticky left heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5
                               bg-secondary/10 text-secondary border border-secondary/30
                               text-xs font-bold uppercase tracking-widest rounded-full mb-5">
                What We Do
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary mb-5 leading-tight">
                Comprehensive PM Services
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                End-to-end capabilities covering every phase of your engineering project —
                from planning to commissioning.
              </p>

              <div className="bg-primary rounded-2xl p-6 text-white">
                <p className="text-3xl font-black text-secondary mb-1">8</p>
                <p className="text-sm text-white/70">Core service areas covering full project lifecycle</p>
              </div>
            </motion.div>

            {/* Right: service list */}
            <div className="space-y-3">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                  className="group flex items-start gap-5
                             bg-white border border-gray-100 rounded-2xl px-6 py-5
                             hover:border-secondary/30 hover:shadow-md
                             transition-all duration-300"
                >
                  <div className="shrink-0 w-9 h-9 rounded-xl
                                  bg-primary text-white text-xs font-black
                                  flex items-center justify-center
                                  group-hover:bg-secondary transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-primary mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <FiArrowRight className="shrink-0 text-gray-300 text-lg mt-1
                                           group-hover:text-secondary group-hover:translate-x-1
                                           transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS — Alternating rows ── */}
      <section className="py-10 md:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5
                             bg-secondary/10 text-secondary border border-secondary/30
                             text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Why REVA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
              Why Choose REVA
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-white border border-gray-100 rounded-3xl p-7
                           hover:shadow-xl hover:shadow-primary/8
                           hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Hover bg wash */}
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300" />

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-secondary
                                group-hover:w-full transition-all duration-500 ease-out" />

                <div className="w-12 h-12 bg-primary/8 border border-primary/10 rounded-2xl
                                flex items-center justify-center text-primary text-xl mb-5
                                group-hover:bg-primary group-hover:text-white
                                transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-base font-bold text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5
                       bg-secondary/10 text-secondary border border-secondary/30
                       text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Sectors
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
              Industries We Serve
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-16">
            {industries.map((industry, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="px-4 py-2 bg-gray-50 border border-gray-200
                     text-primary text-xs sm:text-sm font-semibold rounded-full
                     hover:bg-primary hover:border-primary hover:text-white
                     transition-all duration-300 cursor-default"
              >
                {industry}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto text-center border-t border-gray-100 pt-14"
          >
            <h3 className="text-2xl sm:text-3xl font-black text-primary mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Partner with REVA Process Technologies for professional project management
              services that deliver real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2
                     px-8 py-3.5 bg-secondary text-white font-bold rounded-xl
                     hover:bg-secondary/90 transition-all duration-300"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2
                     px-8 py-3.5 bg-primary/10 border border-primary/20
                     text-primary font-bold rounded-xl
                     hover:bg-primary hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ProjectManagement;
