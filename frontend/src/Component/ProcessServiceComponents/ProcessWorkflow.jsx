import React from "react";
import { motion } from "framer-motion";

const workflowSteps = [
  {
    step: "01",
    title: "Client Briefing & Scope Definition",
    description:
      "Understanding project objectives, process requirements, capacity targets, regulatory constraints, and investment boundaries to define a clear and focused study scope.",
  },
  {
    step: "02",
    title: "Technical Feasibility Assessment",
    description:
      "Evaluating process chemistry, technology options, feedstock availability, and engineering requirements to confirm technical viability and identify the most suitable process route.",
  },
  {
    step: "03",
    title: "Economic Viability & Market Analysis",
    description:
      "Detailed assessment of CAPEX, OPEX, market demand, projected returns, and risk factors — providing decision-makers with a clear financial picture before capital commitment.",
  },
  {
    step: "04",
    title: "Pilot Plant Design & Engineering",
    description:
      "Engineering of pilot-scale facilities that replicate real-world process conditions, enabling testing of new processes, parameter optimization, and bottleneck identification in a controlled environment.",
  },
  {
    step: "05",
    title: "Environmental, HSE & Regulatory Review",
    description:
      "Evaluation of environmental impact, health & safety implications, and applicable regulatory compliance requirements to ensure the proposed plant meets all approvals from the outset.",
  },
  {
    step: "06",
    title: "Feasibility Report & Scale-Up Roadmap",
    description:
      "Delivery of a comprehensive feasibility report with technical, economic, and environmental findings — plus a structured scale-up roadmap to support smooth transition to commercial-scale plant development.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ProcessWorkflow = () => {
  return (
    <section className="py-8 md:py-12 bg-[hsl(220,15%,98%)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 lg:mb-12 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
              Our Approach
            </span>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight">
            Feasibility &amp; Pilot Plant{" "}
            <span className="text-secondary">Study Process</span>
          </h2>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A structured, step-by-step methodology to validate your process,
            de-risk investment, and build the confidence needed for
            full-scale plant development.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Central Line */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/20" />

          {workflowSteps.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className={`flex flex-col lg:flex-row items-start gap-8 mb-16 lg:mb-4 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Step Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 lg:shadow-2xl border-4 border-white mx-auto lg:mx-0 z-10"
                >
                  <span className="text-2xl lg:text-lg font-black text-white">
                    {item.step}
                  </span>
                </motion.div>

                {/* Content Card */}
                <div className="flex-1 lg:max-w-md p-8 lg:p-10 rounded-3xl shadow-lg border border-gray-100 hover:border-secondary/40 hover:shadow-xl transition-all duration-500 bg-white group">
                  {/* Step label pill */}
                  <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-widest mb-3">
                    Step {item.step}
                  </span>

                  <h3 className="text-base md:text-xl font-bold text-secondary group-hover:text-primary transition-colors duration-300 leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Mobile connector */}
                <div className="lg:hidden w-full h-px bg-primary/20 mt-4" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 p-6 lg:p-8 bg-white border-l-4 border-secondary rounded-2xl shadow-sm max-w-4xl mx-auto text-center"
        >
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
            Every study is tailored to the client's process, capacity, and
            investment objectives —{" "}
            <span className="font-semibold text-primary">
              no generic reports, no off-the-shelf assessments.
            </span>
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Feasibility Study
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessWorkflow;
