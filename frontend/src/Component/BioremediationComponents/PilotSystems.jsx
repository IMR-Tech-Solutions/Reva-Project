import React from "react";
import { motion } from "framer-motion";

const PilotSystems = () => {
  const pilots = [
    { 
      title: "Wetland system", 
      caption: "Phytotechnikum front view", 
      img: "/bioremediation/frontview.png" 
    },
    { 
      title: "Wetland system", 
      caption: "Phytotechnikum side view", 
      img: "/bioremediation/backview.png" 
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 md:px-12 lg:px-20">
        {/* Heading Section */}
        <div className="mb-8">
          <div className="inline-block relative mb-1">
            <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
              Bioremediation – Example Pilot Systems
            </h2>
            <div className="w-20 h-1 bg-secondary mt-1" />
          </div>
          <p className="text-[11px] md:text-[12px] text-red-700 font-medium tracking-wide uppercase mt-1">
            Images shown are representative pilot/research-scale systems for concept illustration.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {pilots.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] border border-gray-100 group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>
              <div className="p-4 bg-white border-t border-gray-50">
                <h4 className="text-primary font-bold text-base md:text-lg">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs md:text-sm italic font-medium">
                  ({item.caption})
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PilotSystems;


