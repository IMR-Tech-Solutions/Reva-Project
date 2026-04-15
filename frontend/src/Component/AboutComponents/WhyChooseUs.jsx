import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShield, FiZap, FiUsers, FiAward, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const iconMap = {
  FiShield: <FiShield className="w-5 h-5" />,
  FiZap: <FiZap className="w-5 h-5" />,
  FiUsers: <FiUsers className="w-5 h-5" />,
  FiAward: <FiAward className="w-5 h-5" />,
  FiInfo: <FiInfo className="w-5 h-5" />,
};

const WhyChooseUs = ({ content, differentiators }) => {
  if (!content) return null;

  const advantages = content.advantages || [];
  const displayDifferentiators = differentiators && differentiators.length > 0 ? differentiators : [];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const getImageUrl = (path, defaultImg) => {
    if (!path) return defaultImg;
    if (path.startsWith("http")) return path;
    if (path.startsWith("/api/uploads")) {
      return `${import.meta.env.VITE_API_URL}${path}`;
    }
    if (path.startsWith("/")) return `${import.meta.env.VITE_API_URL}${path}`;
    return path;
  };

  return (
    <section className="w-full bg-gray-50 py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-stretch">

          {/* Left Side - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative group order-1 lg:order-1 h-full"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl h-full min-h-[400px] sm:min-h-[500px]">
              <img
                src={getImageUrl(content.why_us_image, "./why-choose-us.jpg")}
                alt="Reva Process Technologies site execution"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-primary/80 rounded-br-[60px] sm:rounded-br-[80px]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-secondary/90 rounded-tl-[50px] sm:rounded-tl-[60px]" />

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-6 left-6 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl border-l-4 border-secondary"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1">{content.hero_year || "2014"}</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-600">
                  Delivering EPCC Excellence
                </p>
              </motion.div>
            </div>

            {/* Decorative blocks */}
            <div className="hidden sm:block absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-24 sm:w-32 h-24 sm:h-32 bg-secondary/20 rounded-2xl sm:rounded-3xl -z-10" />
            <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-32 sm:w-40 h-32 sm:h-40 bg-primary/10 rounded-2xl sm:rounded-3xl -z-10" />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center order-2 lg:order-2"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 sm:w-10 md:w-12 h-[3px] bg-secondary rounded-full" />
                <p className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-widest">
                  Why Partner With Us
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
                {content.why_us_title || "Why Choose Reva"}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {content.why_us_description}
              </p>
            </motion.div>

            {/* Advantages Checklist */}
            <motion.ul variants={itemVariants} className="space-y-2.5 mb-6">
              {advantages.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FiCheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700 leading-snug">{point}</span>
                </li>
              ))}
            </motion.ul>

            {/* Differentiator Cards — 2×2 grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3 mb-7"
            >
              {displayDifferentiators.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-secondary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary flex-shrink-0">
                    {iconMap[item.icon_name] || <FiCheckCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary mb-0.5">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Project
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
