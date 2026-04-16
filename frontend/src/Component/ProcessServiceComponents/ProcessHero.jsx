import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "";

const ProcessHero = ({ service }) => {
  if (!service) return null;

  const API_BASE = import.meta.env.VITE_API_URL || "";
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    if (path.startsWith("/api/")) {
      const domain = API_BASE.replace(/\/api$/, "");
      return `${domain}${path}`;
    }
    return path;
  };

  const heroImage = getImageUrl(service.hero_image) || "./process.png";

  return (
    <section className="relative text-white overflow-hidden min-h-screen lg:h-[90vh] flex items-center py-12 md:py-16 lg:py-8">

      {/* Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">

        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-4 md:space-y-6 order-2 lg:order-1"
        >
          {/* Breadcrumb */}
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-xs sm:text-sm uppercase tracking-widest text-secondary"
          >
            {service.hero_breadcrumb || `Services / ${service.title}`}
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold leading-tight text-primary"
          >
            {service.hero_title || service.title}{" "}
            {service.hero_highlight && (
              <span className="text-secondary">{service.hero_highlight}</span>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed"
          >
            {service.hero_description || service.description}
          </motion.p>

          {/* Feature pills */}
          {service.hero_pills && service.hero_pills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-2"
            >
              {service.hero_pills.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-primary/8 border border-primary/20 text-primary text-xs font-semibold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2"
          >
            {service.hero_cta1_text && (
              <motion.a
                href={service.hero_cta1_link || "/contact"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group inline-flex items-center justify-center gap-3 bg-secondary text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                {service.hero_cta1_text}
              </motion.a>
            )}

            {service.hero_cta2_text && (
              <motion.a
                href={service.hero_cta2_link || "/services"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                {service.hero_cta2_text}
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-full flex items-center justify-center lg:justify-end order-1 lg:order-2"
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative group w-full h-full"
          >
            <img
              src={heroImage}
              alt={service.title}
              className="w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />

            {/* Floating stat badge - Only show if stat title exists and is not empty */}
            {service.hero_stat_title && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl border-l-4 border-secondary"
              >
                <p className="text-lg font-bold text-primary leading-none mb-1.5">
                  {service.hero_stat_title}
                </p>
                {service.hero_stat_text && (
                  <p className="text-xs text-gray-500 font-medium">
                    {service.hero_stat_text}
                  </p>
                )}
              </motion.div>
            )}

            {/* Decorative blobs */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block absolute -top-4 md:-top-6 -right-4 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-secondary/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden md:block absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 w-32 h-32 md:w-40 md:h-40 bg-primary/10 rounded-full blur-3xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-transparent -z-10" />

      {/* Floating particles */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-20 left-10 w-2 h-2 bg-secondary/40 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden lg:block absolute top-40 right-20 w-3 h-3 bg-primary/30 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="hidden lg:block absolute bottom-32 left-1/4 w-2 h-2 bg-secondary/30 rounded-full"
      />
    </section>
  );
};

export default ProcessHero;
