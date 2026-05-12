import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Globe2, Droplets, Factory, ShieldCheck } from "lucide-react";

const BioremediationHero = () => {
  const badges = [
    { icon: Leaf, title: "Nature-Based Solutions" },
    { icon: Factory, title: "Engineered Systems" },
    { icon: Droplets, title: "Water & Soil Treatment" },
    { icon: ShieldCheck, title: "Sustainable Future" },
  ];

  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-primary pt-8 md:pt-12">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bioremediation/bioremidiation.png"
          alt="Bioremediation treatment facility"
          className="w-full h-full object-cover opacity-90 scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&q=80&w=2000";
          }}
        />

        {/* Multi-layer Overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-10 lg:px-16 py-4 md:py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[700px]"
        >
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-[2px] bg-secondary rounded-full" />
            <span className="text-secondary text-[11px] md:text-xs font-bold uppercase tracking-[0.3em]">
              Nature-Based Industrial Solutions
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-2 tracking-tight">
            BIOREMEDIATION
            <span className="block text-secondary drop-shadow-sm mt-0.5">@ REVA</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-[580px] mb-4 opacity-90">
            Nature-based + engineered treatment solutions for complex water,
            soil and industrial sites.
          </p>

          {/* Partner Card - Compact Glassmorphism */}
          <div className="max-w-[540px] rounded-xl border border-white/10 bg-primary/40 backdrop-blur-md p-4 md:p-5 shadow-2xl mb-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-3xl -mr-12 -mt-12 transition-all duration-500 group-hover:bg-secondary/10" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-secondary/30 bg-secondary/5 flex items-center justify-center shrink-0 shadow-inner">
                <Globe2 className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
              </div>

              <div>
                <p className="text-[9px] md:text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em] mb-1.5 opacity-80 leading-none">
                  Europe focal point for inquiries and project leadership
                </p>
                <h3 className="text-xl md:text-2xl font-black text-secondary leading-tight tracking-wide">
                  Dr. Irfan Khan
                </h3>
                <p className="text-xs md:text-sm text-gray-200 italic font-medium mt-0.5 opacity-90">
                  European Strategic Partner
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3.5 mb-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg bg-secondary text-primary font-bold hover:bg-white transition-all duration-300 shadow-lg shadow-secondary/10 text-sm md:text-base active:scale-95"
            >
              Discuss Your Project
            </Link>

            {/* <Link
              to="/contact"
              className="px-6 py-3 rounded-lg bg-white/5 text-white font-bold border border-white/15 hover:bg-white hover:text-primary transition-all duration-300 text-sm md:text-base backdrop-blur-sm active:scale-95"
            >
              Contact REVA
            </Link> */}
          </div>

          {/* Feature Badges - Compact Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-[680px]">
            {badges.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="rounded-lg border border-white/5 bg-white/[0.03] backdrop-blur-sm px-3.5 py-3.5 hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-secondary mb-2 opacity-90" />
                <p className="text-white text-[11px] md:text-xs font-bold leading-tight uppercase tracking-wider">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom transition fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/10 to-transparent z-[2]" />
    </section>
  );
};

export default BioremediationHero;