import React from "react";
import { motion } from "framer-motion";

const keyDifferentiators = [
  {
    title: "Single Point Responsibility",
    description:
      "Unified accountability from design to commissioning eliminates coordination gaps and ensures seamless project execution.",
    number: "01",
  },
  {
    title: "Cost & Schedule Certainty",
    description:
      "Fixed-price contracts with guaranteed delivery timelines provide predictable budgets and reduced financial risk.",
    number: "02",
  },
  {
    title: "Integrated Project Management",
    description:
      "Cross-functional teams working in parallel accelerate timelines and optimize resource utilization throughout the project.",
    number: "03",
  },
  {
    title: "Quality Assurance Framework",
    description:
      "Rigorous QA/QC protocols at every stage ensure compliance with international standards and client specifications.",
    number: "04",
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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const EPCAdvantages = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        <div className="grid gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-2 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1.5 bg-secondary/10 text-secondary uppercase tracking-widest text-xs font-bold rounded-full mb-4">
              The Reva Advantage
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4 leading-tight">
              Why Choose<br />
              <span className="text-secondary">Integrated EPC?</span>
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              Our comprehensive EPC model streamlines project delivery, reduces complexity, and delivers superior outcomes through proven methodologies and technical excellence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-secondary text-white font-bold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 text-center text-sm"
              >
                Discuss Your Project
              </motion.a>
              
              
            </div>
          </motion.div>

          {/* Right Side - Key Differentiators */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            {keyDifferentiators.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-gray-50 border-l-4 border-secondary rounded-r-2xl p-5 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                
                {/* Number Badge */}
                <div className="absolute -left-6 top-5 w-10 h-10 bg-secondary text-white font-black text-base rounded-xl flex items-center justify-center shadow-lg">
                  {item.number}
                </div>

                {/* Content */}
                <div className="pl-7">
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-secondary/5 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              </motion.div>
            ))}
          </motion.div>

        </div>

   

      </div>
    </section>
  );
};

export default EPCAdvantages;
