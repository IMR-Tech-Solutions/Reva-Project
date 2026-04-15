import React from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL || "";

const IndustriesServed = ({ section }) => {
  if (!section) return null;

  const items = section.items || [];
  const extraData = section.extra_data || {};

  const sectionImage = extraData.image
    ? extraData.image.startsWith("/api/")
      ? `${API_BASE}${extraData.image}`
      : extraData.image
    : "./hero1.png";

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
              {section.section_label || "Sectors Served"}
            </span>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-primary mb-5 leading-tight">
            {section.title || "Industries We"}{" "}
            {section.title_highlight && (
              <span className="text-secondary">{section.title_highlight}</span>
            )}
          </h2>
          <p className="text-lg text-gray-500 max-w-xl leading-relaxed font-medium mx-auto">
            {section.description}
          </p>
        </motion.div>

        {/* Content Split */}
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20">

          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative group">
              <img
                src={sectionImage}
                alt={section.title || "Industries Served"}
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl group-hover:shadow-primary/30 transition-all duration-700 lg:rounded-[3rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl lg:rounded-[3rem]" />

              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-br-[60px] rounded-tl-[3rem]" />

              {/* Floating badge */}
              {extraData.image_badge_title && (
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border-l-4 border-secondary">
                  <p className="text-primary font-bold text-sm leading-none mb-0.5">
                    {extraData.image_badge_title}
                  </p>
                  <p className="text-gray-500 text-xs font-medium">
                    {extraData.image_badge_text}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right - Industry Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Intro text */}
            {extraData.intro_text && (
              <p className="text-base text-gray-600 leading-relaxed border-l-4 border-primary pl-4">
                {extraData.intro_text}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              {items.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="group flex items-start gap-4 p-5 bg-white/60 backdrop-blur-sm border-l-4 border-primary/40 hover:border-secondary rounded-r-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-white"
                >
                  <div className="w-3 h-3 mt-1.5 bg-gradient-to-r from-primary to-secondary rounded-full flex-shrink-0 shadow-md" />
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Bottom tags */}
            {extraData.bottom_tags && extraData.bottom_tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {extraData.bottom_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-semibold rounded-full border border-primary/15 hover:bg-primary/10 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
                <span className="px-3 py-1.5 bg-secondary/10 text-secondary text-xs font-semibold rounded-full border border-secondary/20">
                  + More
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;
