import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = ({ content }) => {
  if (!content) return null;

  const highlights = content.highlights || [];
  const corePills = content.core_pills || ["Excellence", "Quality", "Trust", "Innovation", "Teamwork"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Helper to format image paths
  const getImageUrl = (path, defaultImg) => {
    if (!path) return defaultImg;
    if (path.startsWith("http")) return path;
    if (path.startsWith("/api/uploads")) {
      return `http://localhost:8000${path}`;
    }
    if (path.startsWith("/")) return `http://localhost:8000${path}`;
    return path; // Assume local path like ./hero1.png
  };

  return (
    <section className="w-full bg-gray-light py-8 sm:py-12 md:py-16 lg:py-16 xl:py-16 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-stretch">

          {/* Left Side - Image (5 cols) */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl ring-2 sm:ring-4 ring-gray-light/50 aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto">
              <img
                src={getImageUrl(content.hero_image_main, "./hero1.png")}
                alt="Reva Process Technologies facility"
                className="w-full h-full object-cover"
              />

              {/* Primary corner accent */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.95 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: "backOut" }}
                className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-primary/80 rounded-br-[60px] sm:rounded-br-[80px] md:rounded-br-[100px]"
              />

              {/* Floating year badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border-l-4 border-secondary"
              >
                <p className="text-2xl sm:text-3xl font-bold text-primary leading-none mb-1">{content.hero_year || "2014"}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Est. in Pune, India</p>
              </motion.div>
            </div>

            {/* Overlapping small image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -bottom-4 -right-4 w-24 h-24
                         sm:-bottom-6 sm:-right-6 sm:w-32 sm:h-32
                         md:-bottom-8 md:-right-8 md:w-40 md:h-40
                         lg:-bottom-10 lg:-right-10 lg:w-48 lg:h-48
                         xl:w-52 xl:h-52
                         rounded-2xl sm:rounded-3xl overflow-hidden
                         shadow-xl sm:shadow-2xl
                         border-4 sm:border-6 md:border-8 border-gray-light/80
                         z-20 transition-all duration-500"
            >
              <img
                src={getImageUrl(content.hero_image_sub, "./hero2.png")}
                alt="Reva project execution"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Content (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center lg:col-span-7 order-1 lg:order-2"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-secondary rounded-full" />
              <span className="text-xs sm:text-sm md:text-base font-semibold text-secondary uppercase tracking-wide">
                {content.hero_subtitle || "About Reva Process Technologies"}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold leading-tight mb-4 sm:mb-5 text-primary"
            >
              {content.hero_title || "One Roof. Every Stage."}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-md text-gray-500 leading-relaxed mb-6 sm:mb-7 max-w-full lg:max-w-2xl"
            >
              {content.hero_description}
            </motion.p>

            {/* Key Differentiators Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7"
            >
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-primary">{item.label}</p>
                    <p className="text-xs text-gray-500 leading-snug">{item.desc || ""}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Core Values Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-7">
              {corePills.map((val, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-semibold rounded-full border border-primary/15 hover:bg-primary/10 transition-colors duration-200"
                >
                  {val}
                </span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;
