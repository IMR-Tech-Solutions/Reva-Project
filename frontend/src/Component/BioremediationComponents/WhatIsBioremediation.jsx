import React from "react";
import { motion } from "framer-motion";
import { Zap, Leaf, Clock, ShieldCheck, Microscope, Droplets } from "lucide-react";

const WhatIsBioremediation = () => {
  const features = [
    {
      icon: Zap,
      title: "Low OPEX",
      desc: "Cost-effective long-term operational model.",
    },
    {
      icon: Leaf,
      title: "Sustainable Treatment",
      desc: "Nature-based biological treatment pathways.",
    },
    {
      icon: Clock,
      title: "Long-Life Performance",
      desc: "Designed for stable and durable operation.",
    },
    {
      icon: ShieldCheck,
      title: "Reduced Secondary Risks",
      desc: "Lower dependency on chemical-only treatment.",
    },
  ];

  return (
    <section className="relative py-8 md:py-12 bg-white overflow-hidden border-y border-gray-100">
      <div className="container relative z-10 mx-auto px-4 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                <img
                  src="/bioremediation/bioremidiation.png"
                  alt="Environmental Treatment"
                  className="w-full h-[300px] md:h-[400px] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                      <Microscope className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-primary font-bold text-base leading-tight">
                        Microbial & Biogeochemical
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">
                        Advanced Water & Soil Treatment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/5 border border-secondary/10 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary font-semibold uppercase tracking-wider text-[10px]">
                Process Overview
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight">
              What we mean by  <span className="text-secondary">Bioremediation</span>
            </h2>

            <div className="space-y-4 text-justify max-w-2xl">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Bioremediation leverages natural microbial and biogeochemical processes to 
                degrade, transform, or immobilize contaminants within water and soil systems. 
                It represents a sophisticated synergy between biological science and environmental engineering.
              </p>

              <div className="bg-slate-50/80 rounded-xl p-5 border-l-2 border-secondary/50">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Ideal for clients seeking <span className="font-semibold text-primary">sustainable, low-OPEX solutions</span> where chemical-heavy alternatives are either cost-prohibitive or pose secondary environmental risks.
                </p>
              </div>
            </div>

            {/* Feature Cards - Compact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-4 rounded-xl border border-gray-100 bg-white hover:border-secondary/30 transition-all duration-300 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                      <feature.icon className="w-4.5 h-4.5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary mb-0.5">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-snug">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsBioremediation;