import React from 'react';
import { motion } from 'framer-motion';

const GlobalPresenceSection = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight mb-4"
          >
            Global <span className="text-secondary">Presence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 text-base md:text-lg max-w-2xl"
          >
            Delivering excellence in engineering across the world's leading industrial sectors.
          </motion.p>
        </div>

        {/* Map Section */}
  <motion.div
  initial={{ opacity: 0, scale: 0.96 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3, duration: 0.7 }}
  className="relative w-full 
             h-[220px] sm:h-[300px] md:h-[380px] lg:h-[450px]
             overflow-hidden rounded-xl"
>
  {/* Map Image */}
  <img
    src="/wm.png"
    alt="REVA Global Operations Map"
    className="w-full h-full object-cover"
  />

  {/* Soft overlay (makes crop look intentional) */}
  <div className="absolute inset-0 bg-black/10" />

  {/* Animated indicator */}
  <div className="absolute top-[54%] left-[68%] w-3 h-3 bg-secondary rounded-full animate-ping opacity-70" />
  <div className="absolute top-[54%] left-[68%] w-2.5 h-2.5 bg-secondary rounded-full" />
</motion.div>

      </div>
    </section>
  );
};

export default GlobalPresenceSection;
