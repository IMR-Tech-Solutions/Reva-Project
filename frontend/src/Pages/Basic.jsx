import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaRulerCombined, 
  FaBoxOpen, 
  FaHardHat 
} from "react-icons/fa";
import { 
  Leaf, 
  Wrench, 
  Package, 
  Target, 
  Recycle, 
  Zap,
  ArrowRight
} from "lucide-react";
import Breadcrumb from "../Component/Breadcrumb";
import api from "../api/api";

const MotionLink = motion(Link);

// ─── ICON MAPPING ────────────────────────────────────────────────────────────
const iconMap = {
  // Lucide
  Leaf: <Leaf />,
  Wrench: <Wrench />,
  Package: <Package />,
  Target: <Target />,
  Recycle: <Recycle />,
  Zap: <Zap />,
  // FontAwesome
  FaRulerCombined: <FaRulerCombined />,
  FaBoxOpen: <FaBoxOpen />,
  FaHardHat: <FaHardHat />,
};

// ─── HELPER ──────────────────────────────────────────────────────────────────
const getExtra = (data, key, fallback = null) => {
  if (!data) return fallback;
  try {
    const extra = typeof data === "string" ? JSON.parse(data) : data;
    return extra[key] || fallback;
  } catch (e) {
    return fallback;
  }
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const EPCHero = ({ service }) => {
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

  const heroImage = getImageUrl(service.hero_image) || "./epc.png";

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-transparent -z-10" />

      {/* Floating particles */}
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="hidden lg:block absolute top-20 left-10 w-2 h-2 bg-secondary/40 rounded-full" />
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="hidden lg:block absolute top-40 right-20 w-3 h-3 bg-primary/30 rounded-full" />
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="hidden lg:block absolute bottom-32 left-1/4 w-2 h-2 bg-secondary/30 rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10">
        {/* Left Side - Content */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="order-2 lg:order-1 flex flex-col gap-5">
          <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xs sm:text-sm uppercase tracking-widest text-secondary font-semibold">
            {service.hero_breadcrumb || `Services / ${service.title}`}
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold leading-tight text-primary">
            {service.hero_title || service.title} <br />
            {service.hero_highlight && <span className="text-secondary">{service.hero_highlight}</span>}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {service.hero_description || service.description}
          </motion.p>

          {/* Feature pills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-wrap gap-2">
            {(service.hero_pills || []).map((tag) => (
              <span key={tag} className="px-3 py-1.5 border border-primary/20 bg-primary/5 text-primary text-xs font-semibold rounded-full">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
            {service.hero_cta1_text && (
              <MotionLink 
                to={service.hero_cta1_link || "/contact"} 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                className="group inline-flex items-center justify-center gap-3 bg-secondary text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                {service.hero_cta1_text}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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

        {/* Right Side - Image */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="order-1 lg:order-2">
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: "easeOut" }} className="relative group">
            <img src={heroImage} alt={service.title} className="w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />
            
            {/* Stat badge - Only show if stat title exists and is not empty */}
            {service.hero_stat_title && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.5 }} className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl border-l-4 border-secondary">
                <p className="text-sm font-bold text-primary leading-none mb-1.5">{service.hero_stat_title}</p>
                {service.hero_stat_text && <p className="text-xs text-gray-500 font-medium">{service.hero_stat_text}</p>}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const EPCServices = ({ section }) => {
  if (!section) return null;

  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-12 md:mb-14">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary uppercase tracking-widest text-xs sm:text-sm font-bold rounded-full mb-4">
            {section.section_label || "Complete EPC Delivery"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-4">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{section.description}</p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          {(section.items || []).map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }} className="group relative bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:border-secondary hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="absolute top-4 right-5 text-4xl font-black text-gray-50 group-hover:text-secondary/10 transition-colors duration-300 pointer-events-none select-none">
                0{index + 1}
              </div>
              <div className="mb-6 relative">
                <div className="w-16 h-16 bg-gray-50 group-hover:bg-secondary border border-gray-100 group-hover:border-secondary rounded-2xl flex items-center justify-center transition-all duration-300">
                  <span className="text-primary group-hover:text-white transition-colors duration-300 text-3xl">
                    {iconMap[item.icon_name] || iconMap.FaRulerCombined}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{item.description}</p>
                <ul className="space-y-2 mt-auto">
                  {(getExtra(item.extra_data, "points", [])).map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span className="font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectLifecycle = ({ section }) => {
  if (!section) return null;

  return (
    <section className="py-8 md:py-12 bg-[hsl(220,15%,98%)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-8 lg:mb-12 max-w-3xl mx-auto">
          <span className="inline-block bg-[#F4B400]/10 text-[#F4B400] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
            {section.section_label || "Project Execution"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
            {section.title} <span className="text-[#F4B400]">{section.title_highlight}</span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">{section.description}</p>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#2F3F8F]/20" />

          {(section.items || []).map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className={`flex flex-col lg:flex-row items-start gap-8 mb-20 lg:mb-2 ${isEven ? "lg:flex-row-reverse" : ""}`}>
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }} className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-[#2F3F8F] flex items-center justify-center shadow-xl shadow-[#2F3F8F]/20 lg:shadow-2xl border-4 border-white mx-auto lg:mx-0 z-10">
                  <span className="text-2xl lg:text-lg font-black text-white">{item.step_number || index + 1}</span>
                </motion.div>
                <div className="flex-1 lg:max-w-md p-8 lg:p-10 rounded-3xl shadow-2xl border border-[#F3F4F6] hover:border-[#F4B400]/50 hover:shadow-[#2F3F8F]/10 transition-all duration-500 bg-white group">
                  <h3 className="text-sm md:text-xl font-bold text-secondary group-hover:text-[#2F3F8F] transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{item.description}</p>
                </div>
                <div className="lg:hidden w-full h-px bg-[#2F3F8F]/20 mt-8" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EPCCapabilities = ({ section }) => {
  if (!section) return null;

  return (
    <section className="relative bg-primary py-12 md:py-12 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-secondary uppercase tracking-widest text-xs sm:text-sm font-bold rounded-full mb-4">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            {section.section_label || "Project Delivery Models"}
          </span>
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-white mb-5">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-md md:text-md leading-relaxed max-w-2xl mx-auto">{section.description}</p>
        </motion.div>

        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(section.items || []).map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(237, 29, 36, 0.2)" }} className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-7 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-5">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                  <span className="text-3xl">{iconMap[item.icon_name] || iconMap.Leaf}</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-300">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{item.description}</p>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12 md:mt-16 text-center">
          <p className="text-gray-400 text-sm sm:text-base">All delivery models backed by rigorous quality control, safety management, and regulatory compliance</p>
        </motion.div>
      </div>
    </section>
  );
};

const EPCAdvantages = ({ section }) => {
  if (!section) return null;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-3 py-1.5 bg-secondary/10 text-secondary uppercase tracking-widest text-xs font-bold rounded-full mb-4">
              {section.section_label || "The Reva Advantage"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4 leading-tight">
              {section.title} <br />
              <span className="text-secondary">{section.title_highlight}</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">{section.description}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <MotionLink to="/contact" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-secondary text-white font-bold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 text-center text-sm">
                Discuss Your Project
              </MotionLink>
            </div>
          </motion.div>

          <div className="space-y-5">
            {(section.items || []).map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ x: 4 }} className="group relative bg-gray-50 border-l-4 border-secondary rounded-r-2xl p-5 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="absolute -left-6 top-5 w-10 h-10 bg-secondary text-white font-black text-base rounded-xl flex items-center justify-center shadow-lg">
                  {item.step_number || index + 1}
                </div>
                <div className="pl-7">
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-secondary/5 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const EPCPage = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await api.getServiceBySlug("epc-solutions");
        setService(data);
      } catch (err) {
        console.error("Error fetching epc-solutions:", err);
        setError("Failed to load EPC service content.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full" />
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
    <div className="bg-background scroll-smooth overflow-x-hidden">
      <Breadcrumb />
      <EPCHero service={service} />
      <EPCServices section={getSection("services")} />
      <ProjectLifecycle section={getSection("lifecycle")} />
      <EPCCapabilities section={getSection("capabilities")} />
      <EPCAdvantages section={getSection("advantages")} />
    </div>
  );
};

export default EPCPage;