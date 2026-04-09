import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiMail } from 'react-icons/fi';

const Team = ({ content, team }) => {
  if (!content) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

  const displayTeam = team && team.length > 0 ? team : [];

  return (
    <section className="w-full bg-white py-10 md:py-14 lg:py-16">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <p className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-widest">
              Meet The Experts
            </p>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary"
          >
            {content.team_title || "Our Leadership Team"}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            {content.team_subtitle}
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {displayTeam.map((member, index) => (
            <TeamCard key={member.id || index} {...member} delay={index * 0.1} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

// Team Card Component
const TeamCard = ({ name, role, bio, image, linkedin, email, delay }) => {
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

  const getMemberImageUrl = (img) => {
    if (!img) return "/team-placeholder.jpg";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return `http://localhost:8000${img}`;
    return img; // Fallback for seeds like ./team-1.jpg
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group bg-gray-50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-secondary/20"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={getMemberImageUrl(image)}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-br-[50px]" />

        {/* Hover overlay with socials */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 gap-3">
          <a
            href={linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-110"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a
            href={email ? `mailto:${email}` : "#"}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-110"
          >
            <FiMail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 sm:p-6">
        {/* Role pill */}
        <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
          {role}
        </span>

        <h3 className="text-lg md:text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
          {name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          {bio}
        </p>
      </div>
    </motion.div>
  );
};

export default Team;
