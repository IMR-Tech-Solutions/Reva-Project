import React from "react";
import { motion } from "framer-motion";
import {
  Waves,
  Factory,
  Droplets,
  Mountain,
  ShieldCheck,
  Leaf,
  Settings,
  Shield,
  RefreshCcw,
  HandHeart,
} from "lucide-react";

const WhereItFits = () => {
  const applications = [
    {
      icon: Waves,
      number: "01",
      title: "Contaminated Ponds, Lagoons & Basins",
      desc: "Addressing odor, high COD/BOD, and algae/cyanobacteria risk.",
      image: "/bioremediation/ponds.jpg",
    },
    {
      icon: Factory,
      number: "02",
      title: "Industrial Effluents",
      desc: "Handling complex chemistry including high salinity, variable pH, sulfides, metals, and solvents.",
      image: "/bioremediation/efluents.jpg",
    },
    {
      icon: Droplets,
      number: "03",
      title: "Refinery / Petrochemical Runoff",
      desc: "Managing refinery runoff and tank-farm drainage with robust, nature-based treatment.",
      image: "/bioremediation/refinery.jpg",
    },
    {
      icon: Mountain,
      number: "04",
      title: "Mining-Impacted Waters",
      desc: "Treating acid mine drainage and metal-rich streams safely and effectively.",
      image: "/bioremediation/mining.jpg",
    },
    {
      icon: ShieldCheck,
      number: "05",
      title: "Pre-treatment & Polishing Before Discharge/Reuse",
      desc: "Used before discharge or reuse, including as part of ZLD (Zero Liquid Discharge) strategies.",
      image: "/bioremediation/polishing.jpg",
    },
  ];

  const features = [
    { icon: Leaf, text: "Nature-based & sustainable" },
    { icon: Settings, text: "Low OPEX, high efficiency" },
    { icon: Shield, text: "Robust, reliable & long-life performance" },
    { icon: RefreshCcw, text: "Customizable for site-specific needs" },
    { icon: HandHeart, text: "Safe for environment & communities" },
  ];

  return (
    <section className="relative py-8 md:py-12 bg-[#f8fafc] overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 md:px-10 lg:px-16">
        {/* Heading Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-secondary" />
              {/* <span className="text-secondary text-[11px] font-bold uppercase tracking-[0.2em]">
                Where It Fits
              </span> */}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight mb-4">
              Where It Fits{" "}
              <span className="text-secondary font-bold">
                (Typical Client Problems)
              </span>
            </h2>
            <div className="flex items-center">
              <Leaf className="w-6 h-6 text-secondary/60 rotate-45" />
            </div>
          </div>

          <div className="lg:max-w-md lg:border-l border-gray-200 lg:pl-10">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
              Our bioremediation solutions are designed to solve complex
              contamination challenges across a wide range of industries.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {applications.slice(0, 3).map((item, index) => (
            <ApplicationCard key={index} item={item} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {applications.slice(3).map((item, index) => (
            <ApplicationCard key={index + 3} item={item} index={index + 3} />
          ))}
        </div>

        {/* Bottom Features Bar */}
        <div className="border-t border-gray-100 pt-10">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all duration-300">
                  <feature.icon className="w-5 h-5 text-secondary group-hover:text-white transition-colors" />
                </div>
                <span className="text-[13px] font-bold text-gray-500 group-hover:text-primary transition-colors max-w-[140px] leading-tight">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ApplicationCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col min-h-[260px]"
    >
      {/* Content Area */}
      <div className="p-8 pb-4 pr-[45%] flex-1">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-50 flex items-center justify-center">
            <item.icon className="w-6 h-6 text-secondary" />
          </div>
          <span className="text-3xl font-black text-gray-100 group-hover:text-primary/10 transition-colors">
            {item.number}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-black text-primary leading-tight mb-3">
          {item.title}
        </h3>

        <div className="w-10 h-[2px] bg-secondary mb-4" />

        <p className="text-gray-500 text-[13px] leading-relaxed font-medium">
          {item.desc}
        </p>
      </div>

      {/* Image Area with Curve */}
      <div className="absolute top-0 right-0 bottom-0 w-[42%] overflow-hidden">
        <div 
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "4rem 0 0 4rem"
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=900";
            }}
          />
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Badge Icon on Image */}
        <div className="absolute bottom-6 right-6 z-10">
          <div className="w-10 h-10 rounded-full bg-primary border-[3px] border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <item.icon className="w-4 h-4 text-secondary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhereItFits;