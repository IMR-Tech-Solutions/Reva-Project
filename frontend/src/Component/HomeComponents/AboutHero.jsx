import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api, { API_BASE_URL } from "../../api/api";

const AboutHero = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get media source
  const getMediaSource = (url) => {
    if (!url) return null;
    if (url.startsWith("/api/uploads")) {
      return `${API_BASE_URL}${url}`;
    }
    return url;
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.getHomeAboutContent();
        if (data) setContent(data);
      } catch (error) {
        console.error("Error fetching home about content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) return <div className="py-28 text-center text-gray-400">Loading section...</div>;
  if (!content) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-28 relative overflow-hidden pt-20 lg:pt-24">
      {/* Geometric background blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />

      {/* Subtle geometric shapes */}
      <div className="absolute top-40 right-20 w-32 h-32 border-2 border-primary/10 rounded-lg rotate-12" />
      <div className="absolute bottom-20 left-10 w-24 h-24 border-2 border-secondary/10 rounded-full" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* Left Side - Image Section */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative order-2 lg:order-1 h-full"
          >
            <div className="relative h-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl -z-10" />

              <div className="relative rounded-xl overflow-hidden shadow-2xl h-full">
                <img
                  src={getMediaSource(content.image_main) || "./hero1.png"}
                  alt="Reva Process Technologies facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-primary to-primary/80 rounded-br-[100px]" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-secondary/90 rounded-tl-[60px]" />
              </div>
            </div>

            {/* Overlapping image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-10 -right-5 w-48 h-48 lg:w-56 lg:h-56 rounded-xl overflow-hidden shadow-2xl border-[6px] border-white z-10"
            >
              <img
                src={getMediaSource(content.image_sub) || "./hero2.png"}
                alt="Reva project execution"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 w-12 h-12 bg-secondary rounded-bl-[40px]" />
            </motion.div>

            {/* Stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute -left-6 top-1/3 bg-white rounded-xl shadow-xl px-6 py-4 border-l-4 border-secondary"
            >
              <p className="text-4xl font-bold text-primary mb-1">{content.stat_year}</p>
              <p className="text-sm text-gray-600 font-medium">{content.stat_text}</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center order-1 lg:order-2"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
              <div className="w-12 h-[3px] bg-gradient-to-r from-secondary to-secondary/50 rounded-full" />
              <span className="text-sm md:text-base font-bold text-secondary uppercase tracking-wider">
                {content.label}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary leading-[1.15] mb-6"
            >
              {content.heading}
              <span className="block mt-2 text-gray-700">
                {content.sub_heading}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 max-w-xl"
            >
              {content.description}
            </motion.p>

            {/* Highlight box */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 border-l-4 border-primary rounded-lg p-5 mb-7"
            >
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {content.highlight_text}
              </p>
            </motion.div>

            {/* Value Pillars */}
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Our Core Values
              </p>
              <div className="flex flex-wrap gap-2">
                {content.pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold rounded-full border border-primary/15 hover:bg-primary/10 transition-colors duration-200"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white text-base font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More About Us
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
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:gap-3 transition-all duration-300"
              >
                Get in Touch
                <svg
                  className="w-5 h-5"
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
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
