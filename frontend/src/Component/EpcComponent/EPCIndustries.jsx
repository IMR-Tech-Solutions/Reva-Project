import React from "react";
import { motion } from "framer-motion";
import { Leaf, Wrench, Package, Target, Recycle, Zap } from "lucide-react"; // Spot-on: greenfield=Leaf, brownfield=Wrench, modular=Package, LSTK=Target, revamp=Recycle, fast-track=Zap [web:38][web:44][web:45][web:46]

const capabilities = [
  { 
    name: "Greenfield Projects", 
    icon: Leaf,
    description: "Complete new facility construction from ground up"
  },
  { 
    name: "Brownfield Expansion", 
    icon: Wrench,
    description: "Retrofitting and upgrading existing facilities"
  },
  { 
    name: "Modular Construction", 
    icon: Package,
    description: "Pre-fabricated modules for faster deployment"
  },
  { 
    name: "LSTK Projects", 
    icon: Target,
    description: "Lump Sum Turnkey delivery with fixed pricing"
  },
  { 
    name: "Plant Revamps", 
    icon: Recycle,
    description: "Modernization and capacity enhancement"
  },
  { 
    name: "Fast Track Execution", 
    icon: Zap,
    description: "Accelerated project delivery with parallel workflows"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const EPCCapabilities = () => {
  return (
    <section className="relative bg-primary py-12 md:py-12 overflow-hidden">
      
      {/* Background decorative lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      {/* Animated red glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.15, 0.08]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-secondary uppercase tracking-widest text-xs sm:text-sm font-bold rounded-full mb-4">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            Project Delivery Models
          </span>
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-white mb-5">
            EPC Execution <span className="text-secondary">Capabilities</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-md md:text-md leading-relaxed max-w-2xl mx-auto">
            Flexible delivery approaches tailored to your project requirements, timeline, and budget constraints.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(237, 29, 36, 0.2)" }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-7 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 overflow-hidden"
            >
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Icon */}
              <div className="mb-5">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                {item.name}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {item.description}
              </p>

              {/* Decorative glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-gray-400 text-sm sm:text-base">
            All delivery models backed by rigorous quality control, safety management, and regulatory compliance
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default EPCCapabilities;
