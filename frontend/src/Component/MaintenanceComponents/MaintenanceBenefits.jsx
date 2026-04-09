import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Specifications Written by Engineers",
    description:
      "MRs and datasheets are prepared by the same engineers who designed the process — eliminating ambiguity at the bid stage and reducing vendor queries and deviations.",
    metric: "Zero",
    metricLabel: "Spec Ambiguity",
  },
  {
    title: "Techno-Commercially Sound Evaluation",
    description:
      "Bid evaluations cover both technical compliance and commercial terms — ensuring award decisions are based on fit-for-purpose supply, not just lowest price.",
    metric: "100%",
    metricLabel: "Technical Review",
  },
  {
    title: "Proactive Expediting",
    description:
      "Active vendor follow-up on manufacturing progress, drawing submissions, and dispatch readiness — identifying delays early before they cascade to site execution.",
    metric: "Early",
    metricLabel: "Delay Detection",
  },
  {
    title: "Inspection-Verified Supply",
    description:
      "Third-party inspection, vendor drawing approval, and pre-dispatch QA ensure every item arrives to specification — reducing site rejections and rework.",
    metric: "Pre-Dispatch",
    metricLabel: "QA Verification",
  },
  {
    title: "Schedule-Aligned Delivery",
    description:
      "Procurement timelines are built around the engineering and site schedule — ensuring equipment and bulk materials are available when construction teams need them.",
    metric: "On-Time",
    metricLabel: "Site Delivery",
  },
  {
    title: "Single-Window Accountability",
    description:
      "One team handles engineering, procurement, and expediting — eliminating interface gaps between disciplines and giving clients a single point of contact for all supply issues.",
    metric: "1 Team",
    metricLabel: "Full Ownership",
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const MaintenanceBenefits = () => {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        <div className="grid gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-2">

          {/* Left Side - Header */}
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
              <span className="text-secondary">Procurement & Expediting?</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              Reva's procurement is not a standalone function — it's driven by
              the same engineering team that designed the plant, ensuring
              specifications are precise, evaluations are technically grounded,
              and supply is verified before it reaches your site.
            </p>

            {/* Contact CTAs */}
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-4 bg-secondary/5 border-l-4 border-secondary rounded-r-xl hover:bg-secondary/10 transition-colors group"
              >
                <span className="text-2xl">📞</span>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">
                    Procurement Enquiries
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

            {/* CTA button */}
            <a
              href="/contact"
              className="group mt-5 inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Start Procurement Planning
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* Right Side - Benefits List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
                className="group flex gap-5 items-start border-l-4 border-gray-200 hover:border-secondary pl-6 py-4 transition-colors duration-300"
              >
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Metric */}
                <div className="flex-shrink-0 text-right min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-black text-secondary leading-none mb-1">
                    {benefit.metric}
                  </div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide leading-tight">
                    {benefit.metricLabel}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-10 border-t-2 border-gray-100"
        >
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4 text-center">
            {[
              { value: "End-to-End", label: "Procurement Scope" },
              { value: "In-House", label: "Engineering + Procurement" },
              { value: "Pre-Dispatch", label: "QA & Inspection" },
              { value: "On-Time", label: "Site Delivery Focus" },
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
};

export default MaintenanceBenefits;
