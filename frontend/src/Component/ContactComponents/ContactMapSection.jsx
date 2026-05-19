import { motion } from "framer-motion";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { useReducedMotion } from "framer-motion";
import React, { memo, useState, useEffect } from "react";
import { getContactSettings } from "../../services/contactApi";

const OfficeCard = memo(({ office, variants }) => (
  <motion.div
    variants={variants}
    whileHover={{
      scale: 1.02,
      y: -8,
      boxShadow: "0 20px 40px rgba(237, 29, 36, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    }}
    className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 hover:border-secondary/30 shadow-lg transition-all duration-300"
  >
    {/* Left accent line */}
    <motion.div
      className="absolute left-0 top-0 h-full w-1 bg-secondary"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: office.isPrimary ? 1 : 0 }}
      whileHover={{ scaleY: 1 }}
      transition={{ duration: 0.4 }}
    />

    <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="relative p-6 z-10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            {office.city}
            {office.isPrimary && (
              <span className="px-2 py-0.5 bg-secondary text-white text-[10px] font-black uppercase tracking-wider rounded-sm">
                HQ
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500 font-medium">{office.country}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 text-gray-600 group-hover:text-primary transition-colors">
          <HiOutlineLocationMarker className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <p className="text-sm font-medium leading-relaxed">{office.address}</p>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-3">
          <a
            href={`tel:${office.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-3 text-gray-600 hover:text-secondary group/link transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-secondary/10">
              <HiOutlinePhone className="w-4 h-4 text-primary group-hover/link:text-secondary transition-colors" />
            </div>
            <span className="text-sm font-semibold">{office.phone}</span>
          </a>

          <a
            href={`mailto:${office.email}`}
            className="flex items-center gap-3 text-gray-600 hover:text-secondary group/link transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-secondary/10">
              <HiOutlineMail className="w-4 h-4 text-primary group-hover/link:text-secondary transition-colors" />
            </div>
            <span className="text-sm font-semibold break-all">{office.email}</span>
          </a>
        </div>
      </div>
    </div>
  </motion.div>
));

const ContactMapSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getContactSettings().then((data) => {
      setSettings(data);
    }).catch((err) => console.log(err));
  }, []);

  const officeLocations = [
    {
      id: 1,
      city: "Pune",
      country: "India (HQ)",
      address: settings?.address_hq || "Trident Business Center, Baner, Pune",
      phone: settings?.phone_primary || "+91 98765 43210",
      email: settings?.email_inquiry || "info@revaprocesstechnologies.com",
      isPrimary: true,
    },
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, link: settings?.social_linkedin || "#", label: "LinkedIn" },
    { icon: <FaTwitter />, link: settings?.social_twitter || "#", label: "Twitter" },
    { icon: <FaFacebook />, link: settings?.social_facebook || "#", label: "Facebook" },
    { icon: <FaInstagram />, link: settings?.social_instagram || "#", label: "Instagram" },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative w-full bg-gray-50 py-8 lg:py-12 overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #000619 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-primary rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-widest">
              Our Location
            </span>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-primary mb-4 tracking-tight">
            Find <span className="text-secondary">Reva</span> Process Technologies
          </h2>
          <p className="text-base text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Headquartered in Pune, India — serving clients across India and
            international markets including the Middle East.
          </p>
        </motion.div>

        {/* Map & Office Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">

          {/* Map */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 h-[450px] lg:h-[500px] rounded-2xl overflow-hidden bg-white border-4 border-primary shadow-2xl relative group"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-secondary opacity-80 z-10"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-secondary opacity-80 z-10"
              style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />

            <div className="w-full h-full p-2">
              <iframe
                src={settings?.map_link || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.0!2d73.7793!3d18.5590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e4a1234567%3A0xabcdef1234567890!2sBaner%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Reva Process Technologies Location"
                className="rounded-xl"
              />
            </div>
          </motion.div>

          {/* Office Card + Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {officeLocations.map((office) => (
              <OfficeCard key={office.id} office={office} variants={itemVariants} />
            ))}

            {/* Markets served card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-6"
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Markets Served
              </p>
              <div className="flex flex-wrap gap-2">
                {(settings?.markets_served || [
                  "India",
                  "Middle East",
                  "International",
                  "Chemicals",
                  "Petrochemicals",
                  "Biogas",
                  "Environmental Tech",
                ]).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/5 text-primary text-xs font-semibold rounded-full border border-primary/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Social Media Banner */}
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative bg-primary rounded-3xl p-10 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-full bg-secondary/10 transform skew-x-12 translate-x-32" />

          <div className="relative z-10">
            <motion.h3
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-black text-white text-center mb-3"
            >
              Connect With{" "}
              <span className="text-secondary">Reva</span>
            </motion.h3>
            <p className="text-gray-300 text-center mb-8 text-base">
              Follow us for project updates, engineering insights, and industry news
            </p>

            <div className="flex justify-center gap-5 flex-wrap">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -10, 10, 0],
                    backgroundColor: "#ED1D24",
                    transition: { duration: 0.4 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/10 hover:bg-secondary text-white text-2xl border-2 border-white/20 hover:border-secondary shadow-lg hover:shadow-secondary/50 transition-all duration-300"
                  aria-label={`Reva Process Technologies on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div> */}

      </div>
    </section>
  );
};

export default ContactMapSection;
