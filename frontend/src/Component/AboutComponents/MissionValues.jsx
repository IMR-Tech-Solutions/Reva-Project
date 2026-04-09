import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiShield, FiZap, FiAward, FiUsers, FiInfo } from 'react-icons/fi';

const iconMap = {
  FiTarget: <FiTarget className="w-7 h-7" />,
  FiEye: <FiEye className="w-7 h-7" />,
  FiShield: <FiShield className="w-7 h-7" />,
  FiZap: <FiZap className="w-7 h-7" />,
  FiAward: <FiAward className="w-7 h-7" />,
  FiUsers: <FiUsers className="w-7 h-7" />,
  FiInfo: <FiInfo className="w-7 h-7" />,
};

const MissionValues = ({ content, values }) => {
  if (!content) return null;

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

  return (
    <section className="w-full bg-primary py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">

          {/* Left Side — Mission & Vision (5 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5 space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            {/* Mission Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl
                         shadow-xl hover:shadow-2xl hover:shadow-secondary/10
                         transition-all duration-500
                         border border-white/10 hover:border-secondary/30
                         group hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14
                                bg-secondary/20 backdrop-blur-sm
                                rounded-xl sm:rounded-2xl
                                flex items-center justify-center
                                group-hover:bg-secondary group-hover:scale-110
                                transition-all duration-500
                                border border-secondary/20">
                  <FiTarget className="w-6 h-6 sm:w-7 sm:h-7 text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                {content.mission_text}
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl
                         shadow-xl hover:shadow-2xl hover:shadow-secondary/10
                         transition-all duration-500
                         border border-white/10 hover:border-secondary/30
                         group hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14
                                bg-secondary/20 backdrop-blur-sm
                                rounded-xl sm:rounded-2xl
                                flex items-center justify-center
                                group-hover:bg-secondary group-hover:scale-110
                                transition-all duration-500
                                border border-secondary/20">
                  <FiEye className="w-6 h-6 sm:w-7 sm:h-7 text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Our Vision
                </h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                {content.vision_text}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side — Core Values (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-secondary rounded-full" />
                <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest">
                  What Drives Us
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {content.values_title || "Our Core Values"}
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mt-3 max-w-lg">
                {content.values_description}
              </p>
            </motion.div>

            {/* 2×2 grid — 2 cols on sm and up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {values && values.map((value, index) => (
                <ValueCard key={index} {...value} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// Value Card
const ValueCard = ({ icon_name, title, description, delay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white/5 backdrop-blur-sm
                 p-5 sm:p-6 md:p-7
                 rounded-xl sm:rounded-2xl
                 shadow-lg hover:shadow-2xl hover:shadow-secondary/10
                 transition-all duration-500
                 hover:-translate-y-2
                 border border-white/10 hover:border-secondary/30
                 hover:bg-white/[0.07]"
    >
      {/* Icon */}
      <div className="w-12 h-12
                      bg-secondary/20 backdrop-blur-sm
                      rounded-lg sm:rounded-xl
                      flex items-center justify-center
                      text-secondary
                      group-hover:bg-secondary group-hover:text-white group-hover:scale-110
                      transition-all duration-500
                      border border-secondary/20 mb-4">
        {iconMap[icon_name] || <FiTarget className="w-7 h-7" />}
      </div>

      {/* Text */}
      <h4 className="text-base sm:text-lg font-bold text-white mb-2
                     group-hover:text-secondary transition-colors duration-300">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default MissionValues;
