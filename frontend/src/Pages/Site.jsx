import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumb from "../Component/Breadcrumb";
import api from "../api/api";
import { Link } from "react-router-dom";
import {
  FiSettings,
  FiTool,
  FiShield,
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiAward,
  FiUsers,
  FiClock,
  FiLayers,
  FiZap
} from "react-icons/fi";
import { ArrowRight } from "lucide-react";

const MotionLink = motion(Link);

// ─── ICON MAPPING ────────────────────────────────────────────────────────────
const iconMap = {
  FiSettings: <FiSettings />,
  FiTool: <FiTool />,
  FiShield: <FiShield />,
  FiCheckCircle: <FiCheckCircle />,
  FiPackage: <FiPackage />,
  FiTruck: <FiTruck />,
  FiAward: <FiAward />,
  FiUsers: <FiUsers />,
  FiClock: <FiClock />,
  FiLayers: <FiLayers />,
  FiZap: <FiZap />
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const HeroSection = ({ service }) => {
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

  const heroImage = getImageUrl(service.hero_image) || "/manage.jpg";

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-2 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] md:h-[500px] group">
              <img
                src={heroImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Stat badge - Only show if stat title exists and is not empty */}
              {service.hero_stat_title && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.5 }} className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl border-l-4 border-secondary">
                  <p className="text-sm font-bold text-primary leading-none mb-1.5">{service.hero_stat_title}</p>
                  {service.hero_stat_text && <p className="text-xs text-gray-500 font-medium">{service.hero_stat_text}</p>}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-3 py-1.5 bg-secondary/10 text-secondary uppercase tracking-widest text-xs font-bold rounded-full mb-5">
              {service.tagline || "Fabrication & Installation"}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-primary mb-5 leading-tight">
              {service.hero_title || service.title}
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-10">
              {service.hero_description || service.description}
            </p>

            {/* Standardized Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.8 }} 
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2"
            >
              {service.hero_cta1_text && (
                <MotionLink 
                  to={service.hero_cta1_link || "/contact"} 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  className="group inline-flex items-center justify-center gap-3 bg-secondary text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 text-sm sm:text-base cursor-pointer"
                >
                  {service.hero_cta1_text}
                </MotionLink>
              )}

              {service.hero_cta2_text && (
                <MotionLink 
                  to={service.hero_cta2_link || "/services"} 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base cursor-pointer"
                >
                  {service.hero_cta2_text}
                </MotionLink>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CapabilitiesSection = ({ section }) => {
  if (!section) return null;

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {section.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {(section.items || []).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-4 text-3xl">
                {iconMap[item.icon_name] || <FiSettings />}
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = ({ section }) => {
  if (!section) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {section.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-5">
          {(section.items || []).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 items-start bg-white rounded-2xl p-5 sm:p-6 border-2 border-gray-200 hover:border-secondary/30 transition-colors duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <span className="text-secondary font-bold text-base">
                  {service.step_number || index + 1}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AdvantagesSection = ({ section }) => {
  if (!section) return null;

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {section.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {(section.items || []).map((advantage, index) => (
            <motion.div
              key={advantage.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary text-2xl mb-4">
                {iconMap[advantage.icon_name] || <FiAward />}
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">
                {advantage.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustriesSection = ({ section }) => {
  if (!section) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {section.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
          {(section.items || []).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-secondary/30 hover:bg-white transition-all duration-300 text-center"
            >
              <p className="text-sm font-semibold text-primary">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ section, service }) => {
  if (!section) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-primary rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
            {section.title}
          </h3>
          <p className="text-white/90 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
            {section.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={service.hero_cta1_link || "/contact"}
              className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-all duration-300"
            >
              {service.hero_cta1_text || "Request Quote"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const ManufacturingSiteServices = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await api.getServiceBySlug("manufacturing-site-services");
        setService(data);
      } catch (err) {
        console.error("Error fetching site-services:", err);
        setError("Failed to load manufacturing & site services content.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md text-center">
          <div className="text-secondary text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The requested service content could not be loaded."}</p>
          <Link to="/services" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all">Return to Services</Link>
        </div>
      </div>
    );
  }

  const getSection = (key) => service.sections?.find((s) => s.section_key === key);

  return (
    <div className="bg-white scroll-smooth overflow-x-hidden">
      <div className="bg-gray-50 border-b border-gray-200">
        <Breadcrumb />
      </div>

      <HeroSection service={service} />
      <CapabilitiesSection section={getSection("capabilities")} />
      <ServicesSection section={getSection("services")} />
      <AdvantagesSection section={getSection("advantages")} />
      <IndustriesSection section={getSection("industries")} />
      <CTASection section={getSection("cta")} service={service} />
    </div>
  );
};

export default ManufacturingSiteServices;
