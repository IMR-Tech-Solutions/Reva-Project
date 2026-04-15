import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api, { API_BASE_URL } from '../../api/api';

const JoinTeamSection = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.getCareerContent();
        setContent(data);
      } catch (error) {
        console.error("Error fetching career content for home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Animation variants
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
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const defaultBenefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: '45+ Countries',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      text: 'Diverse Teams',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      text: 'Impactful Projects',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      text: 'Career Growth',
    },
  ];

  // Map dynamic benefits to icons
  const benefits = content?.benefits?.length > 0
    ? content.benefits.map((b, i) => ({
      icon: defaultBenefits[i % defaultBenefits.length].icon,
      text: b.text
    }))
    : defaultBenefits;

  return (
    <section className="w-full bg-gradient-to-br from-primary via-primary to-gray-100 py-8 md:py-10 lg:py-12 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Geometric patterns */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-secondary/20 rounded-lg rotate-45" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-gray-500/20 rounded-full" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Content (7 columns) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1"
          >
            {/* Subtitle */}
            <motion.h3
              variants={itemVariants}
              className="text-sm md:text-base lg:text-sm font-semibold text-gray-200 uppercase tracking-wider mb-2"
            >
              {content?.hero_subtitle || "Careers at REVA"}
            </motion.h3>

            {/* Heading */}
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight mb-6 text-white"
            >
              {content?.hero_title || (
                <>
                  Join a <span className=" text-secondary ">global team</span> delivering{' '}
                  <span className=" text-white">real impact</span>
                </>
              )}
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-gray-100 leading-relaxed mb-8"
            >
              To shape the future of energy, chemicals and resources, we need the right people in the right places. Join our community of experts across {content?.total_countries || "45+"} countries solving some of the world's most complex challenges.
            </motion.p>

            {/* Benefits Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-secondary/30 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary to-gray-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <span className="text-sm md:text-base text-white font-semibold">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                to="/career"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white text-base md:text-lg font-bold rounded-full hover:bg-gray-500/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Explore careers
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="#"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white text-base md:text-lg font-bold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Our culture
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Image Collage (5 columns) */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5 relative order-1 lg:order-2"
          >
            {/* Main large image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={content?.hero_image?.startsWith("/api") ? `${API_BASE_URL}${content.hero_image}` : "./careers-team.jpg"}
                alt="Team collaboration"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

              {/* Floating stats badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-secondary">{content?.total_employees || "5000+"}</p>
                    <p className="text-xs text-gray-100 font-medium">Employees</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800">{content?.total_countries || "45+"}</p>
                    <p className="text-xs text-gray-100 font-medium">Countries</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{content?.total_roles || "100+"}</p>
                    <p className="text-xs text-gray-100 font-medium">Roles</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary rounded-full opacity-20 blur-2xl" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-500 rounded-full opacity-20 blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection;
