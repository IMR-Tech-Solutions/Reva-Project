import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ClipboardList, 
  Truck, 
  Handshake, 
  ShieldCheck,
  Search,
  CheckCircle,
  Phone,
  Mail,
  ArrowRightCircle
} from "lucide-react";
import {
  FaClipboardList,
  FaBalanceScale,
  FaHandshake,
  FaTruck,
  FaSearchPlus,
} from "react-icons/fa";
import Breadcrumb from "../Component/Breadcrumb";
import ProcessHero from "../Component/ProcessServiceComponents/ProcessHero";
import api from "../api/api";

// Icon mapping for procurement services
const iconMap = {
  "FaClipboardList": FaClipboardList,
  "FaBalanceScale": FaBalanceScale,
  "FaHandshake": FaHandshake,
  "FaTruck": FaTruck,
  "FaSearchPlus": FaSearchPlus,
  "📐": Search,
  "🚚": Truck,
  "✅": CheckCircle,
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

const ProcurementServices = ({ section }) => {
  if (!section) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              {section.section_label}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            {section.title}{" "}
            <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            {section.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {(section.items || []).map((item, index) => {
            const IconComponent = iconMap[item.icon_name] || ClipboardList;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -6, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-secondary/30"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-5 text-xs font-black text-gray-200 group-hover:text-secondary/30 transition-colors duration-300">
                  0{index + 1}
                </div>
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/20 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="relative text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="relative text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-6 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-sm"
        >
          <p className="text-primary font-bold text-base">
            {getExtra(section.extra_data, "bottom_note_title")}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl">
            {getExtra(section.extra_data, "bottom_note_desc")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ProcurementWorkflow = ({ section }) => {
  if (!section) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              {section.section_label}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {section.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {(section.items || []).map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="group flex gap-5 items-start bg-gray-50 hover:bg-white border border-gray-100 hover:border-secondary/30 hover:shadow-md rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-white border border-primary/10 group-hover:bg-secondary group-hover:border-secondary flex items-center justify-center shadow-sm transition-all duration-300">
                  <span className="text-sm font-black text-primary group-hover:text-white transition-colors duration-300">
                    {item.step_number || `0${index + 1}`}
                  </span>
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-xs sm:text-sm">
                  {item.description}
                </p>
              </div>
              <div className="flex-shrink-0 text-gray-200 group-hover:text-secondary transition-colors duration-300 pt-1">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-6 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center gap-2"
        >
          <p className="text-primary font-bold text-base">
            {getExtra(section.extra_data, "bottom_note_title")}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl">
            {getExtra(section.extra_data, "bottom_note_desc")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ProcurementHighlights = ({ section }) => {
  if (!section) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative bg-primary py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="inline-flex items-center gap-2 text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              {section.section_label}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            {section.title} <br />
            <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {section.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3"
        >
          {(section.items || []).map((item, index) => {
            const IconComponent = iconMap[item.icon_name] || CheckCircle;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
                <div className="absolute top-4 right-5 text-xs font-black text-white/10 group-hover:text-secondary/30 transition-colors duration-300">
                  0{index + 1}
                </div>
                <div className="mb-5">
                  <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center text-3xl group-hover:bg-secondary/30 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                  {item.description}
                </p>
                <ul className="space-y-2 pt-4 border-t border-white/10">
                  {(getExtra(item.extra_data, "features", [])).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {(getExtra(section.extra_data, "bottom_stats", [])).map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 hover:border-secondary/30 transition-all duration-300"
            >
              <p className="text-secondary font-black text-sm sm:text-base mb-1">
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProcurementQuality = ({ section }) => {
  if (!section) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
                {section.section_label}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-5 leading-tight">
              {section.title} <br />
              <span className="text-secondary">{section.title_highlight}</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {section.description}
            </p>

            <div className="space-y-3">
              <a
                href={`tel:${getExtra(section.extra_data, "contact_phone")}`}
                className="flex items-center gap-3 p-4 bg-secondary/5 border-l-4 border-secondary rounded-r-xl hover:bg-secondary/10 transition-colors group"
              >
                <Phone className="w-6 h-6 text-secondary" />
                <div>
                  <div className="text-xs text-gray-500 font-semibold">
                    Procurement Enquiries
                  </div>
                  <div className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                    {getExtra(section.extra_data, "contact_phone")}
                  </div>
                </div>
              </a>
              <a
                href={`mailto:${getExtra(section.extra_data, "contact_email")}`}
                className="flex items-center gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl hover:bg-primary/10 transition-colors group"
              >
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <div className="text-xs text-gray-500 font-semibold">
                    Email Us
                  </div>
                  <div className="text-sm font-bold text-primary group-hover:text-secondary transition-colors break-all">
                    {getExtra(section.extra_data, "contact_email")}
                  </div>
                </div>
              </a>
            </div>

            <Link
              to={getExtra(section.extra_data, "cta_button_link", "/contact")}
              className="group mt-5 inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {getExtra(section.extra_data, "cta_button_text")}
            </Link>
          </motion.div>

          {/* Right Side - Benefits List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            {(section.items || []).map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ x: 6 }}
                className="group flex gap-5 items-start border-l-4 border-gray-200 hover:border-secondary pl-6 py-4 transition-colors duration-300"
              >
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-black text-secondary leading-none mb-1">
                    {getExtra(item.extra_data, "metric")}
                  </div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide leading-tight">
                    {getExtra(item.extra_data, "metricLabel")}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-10 border-t-2 border-gray-100"
        >
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4 text-center">
            {(getExtra(section.extra_data, "bottom_stats", [])).map((stat) => (
              <div key={stat.label}>
                <div className="text-lg sm:text-2xl font-black text-secondary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const ProcurementPage = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        const data = await api.getServiceBySlug("procurement");
        if (data) {
          setService(data);
        } else {
          setError("Procurement service data not found.");
        }
      } catch (err) {
        console.error("Error fetching procurement:", err);
        setError("Failed to load Procurement service details.");
      } finally {
        setLoading(false);
      }
    };
    loadService();
  }, []);

  const getSection = (key) => service?.sections?.find((s) => s.section_key === key);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col pt-20">
        <div className="w-full h-[400px] bg-gray-100 animate-pulse mb-12" />
        <div className="container mx-auto px-4 lg:px-16">
          <div className="h-10 w-64 bg-gray-100 animate-pulse mb-6" />
          <div className="h-4 w-full bg-gray-50 animate-pulse mb-4" />
          <div className="h-4 w-3/4 bg-gray-50 animate-pulse mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" />
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-secondary text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-black text-primary mb-2 text-center">Data Unavailable</h2>
        <p className="text-gray-500 text-center max-w-md mb-8">{error || "Please check back later."}</p>
        <Link to="/services" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-colors">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white scroll-smooth overflow-x-hidden">
      <Breadcrumb />
      
      {/* Hero */}
      <ProcessHero service={service} />

      {/* Services (services) */}
      <ProcurementServices section={getSection("services")} />

      {/* Workflow (workflow) */}
      <ProcurementWorkflow section={getSection("workflow")} />

      {/* Highlights (highlights) */}
      <ProcurementHighlights section={getSection("highlights")} />

      {/* Quality & Contact (quality_proposition) */}
      <ProcurementQuality section={getSection("quality_proposition")} />
    </div>
  );
};

export default ProcurementPage;