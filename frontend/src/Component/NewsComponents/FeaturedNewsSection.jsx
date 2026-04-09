import React from "react";
import { motion } from "framer-motion";

const FeaturedNewsSection = ({ articles }) => {
  if (!articles || articles.length < 3) return null;

  const [main, second, third] = articles;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },  
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="mb-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mb-8"
      >
        <motion.h3
          variants={itemVariants}
          className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 text-center lg:text-left"
        >
          Featured Stories
        </motion.h3>
        <motion.h2
          variants={itemVariants}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-primary text-center lg:text-left"
        >
          Top <span className="text-secondary">Headlines</span>
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {/* MAIN FEATURED - Enhanced */}
        <motion.a
          href={main.link}
          variants={itemVariants}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative lg:col-span-2 h-[480px] rounded-3xl overflow-hidden group shadow-xl border-2 border-gray-100 hover:border-secondary/30"
        >
          {/* Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={main.image}
              alt={main.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent group-hover:from-primary/98 transition-all duration-500" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-7 text-white">
            {/* Featured Badge */}
            <div className="flex justify-between items-start">
              <span className="px-4 py-2 bg-secondary text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm uppercase tracking-wider">
                Featured Story
              </span>
              
              {/* Category Badge (if exists) */}
              {main.category && (
                <span className="px-4 py-2 bg-accent text-primary text-xs font-bold rounded-full shadow-lg backdrop-blur-sm uppercase tracking-wide">
                  {main.category}
                </span>
              )}
            </div>

            {/* Bottom Content */}
            <div>
              {/* Date & Read Time */}
              <div className="flex items-center gap-2 text-sm text-gray-200 mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{main.date}</span>
                <span className="text-accent">•</span>
                <span>{main.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 group-hover:text-accent transition-colors duration-300">
                {main.title}
              </h2>

              {/* Excerpt (if exists) */}
              {main.excerpt && (
                <p className="text-gray-300 text-base leading-relaxed line-clamp-2 mb-4">
                  {main.excerpt}
                </p>
              )}

              {/* Arrow Indicator */}
              <div className="inline-flex items-center gap-2 text-accent font-bold text-sm group-hover:gap-3 transition-all duration-300">
                <span>Explore story</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.a>

        {/* SIDE FEATURED - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
          {[second, third].map((item, index) => (
            <motion.a
              key={item.id}
              href={item.link}
              variants={itemVariants}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative h-[230px] rounded-3xl overflow-hidden group shadow-xl border-2 border-gray-100 hover:border-secondary/30"
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent group-hover:from-primary/98 transition-all duration-500" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-5 text-white">
                {/* Category Badge */}
                {item.category && (
                  <div className="flex justify-end">
                    <span className="px-3 py-1.5 bg-accent text-primary text-xs font-bold rounded-full shadow-lg backdrop-blur-sm uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                )}

                {/* Bottom Content */}
                <div>
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-2 text-xs text-gray-200 mb-2">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item.date}</span>
                    <span className="text-accent">•</span>
                    <span>{item.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold leading-snug line-clamp-2 mb-2 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Excerpt (if exists) */}
                  {item.excerpt && (
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                      {item.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedNewsSection;
