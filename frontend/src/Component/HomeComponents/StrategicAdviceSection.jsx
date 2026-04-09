import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api, { API_BASE_URL } from "../../api/api";

const StrategicAdviceSection = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getStrategicAdvice();
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch strategic advice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper to resolve image paths
  const getImageUrl = (path) => {
    if (!path) return "./strategic-advice.jpg";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/api/uploads")) return `${API_BASE_URL}${path}`;
    if (path.startsWith("./") || path.startsWith("../")) {
        return path.replace("./", "/").replace("../", "/");
    }
    return `/${path}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading || !content) return null;

  return (
    <section className="w-full bg-gray-50 py-8 md:py-10 lg:py-12 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {/* Accent frame behind */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl -z-10" />
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={getImageUrl(content.image)}
                alt={content.heading}
                className="w-full h-auto object-cover"
              />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-br-[80px]" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-secondary/90 rounded-tl-[60px]" />
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl px-6 py-5 border-l-4 border-secondary"
            >
              <p className="text-4xl font-bold text-primary mb-1">{content.exp_year || "25+"}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-600">{content.exp_text || "Years Experience"}</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* Label */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-12 h-[3px] bg-gradient-to-r from-secondary to-secondary/50 rounded-full" />
              <span className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider">
                {content.label || "Expert Guidance"}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              variants={itemVariants} 
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6"
            >
              <span className="text-primary">{content.heading || "Strategic advice. "}</span>
              <span className="text-secondary">{content.sub_heading || "Practical delivery."}</span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={itemVariants} 
              className="text-base md:text-lg text-gray-600 leading-relaxed mb-8"
            >
              {content.description}
            </motion.p>

            {/* Features */}
            <motion.div 
              variants={itemVariants} 
              className="grid sm:grid-cols-2 gap-4 mb-8"
            >
              {(content.features || []).map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-base text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StrategicAdviceSection;
