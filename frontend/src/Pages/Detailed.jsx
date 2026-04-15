import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Layers, 
  GitMerge, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  Headphones,
  Compass,
  Layout,
  Settings,
  Building,
  Zap,
  Box
} from "lucide-react";
import Breadcrumb from "../Component/Breadcrumb";
import ProcessHero from "../Component/ProcessServiceComponents/ProcessHero";
import api from "../api/api";

// Icon mapping for engineering disciplines
const iconMap = {
  "drafting-compass": Compass,
  "project-diagram": Layout,
  "cogs": Settings,
  "building": Building,
  "bolt": Zap,
  "layer-group": Box,
  "Layers": Layers,
  "GitMerge": GitMerge,
  "ShieldCheck": ShieldCheck,
  "Clock": Clock,
  "FileCheck": FileCheck,
  "Headphones": Headphones
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

const DetailedDisciplines = ({ section }) => {
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
            const IconComponent = iconMap[item.icon_name] || Settings;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:border-secondary hover:shadow-lg overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="absolute top-4 right-5 text-4xl font-black text-gray-50 group-hover:text-secondary/10 transition-colors duration-300 pointer-events-none select-none">
                  0{index + 1}
                </div>
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gray-50 group-hover:bg-secondary border border-gray-100 group-hover:border-secondary rounded-2xl flex items-center justify-center transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const DetailedScope = ({ section }) => {
  if (!section) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-white py-12 md:py-16">
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

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {(section.items || []).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-secondary/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="mb-5">
                <span className="inline-block px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-widest mb-3">
                  0{index + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="w-12 h-1 bg-secondary rounded-full" />
              </div>

              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2.5"
              >
                {(getExtra(item.extra_data, "items", [])).map((subItem, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-3 text-gray-700 group/item"
                  >
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0 mt-1.5 group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-xs sm:text-sm font-medium group-hover/item:text-secondary transition-colors duration-300">
                      {subItem}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-6 bg-primary rounded-2xl flex flex-col items-center justify-center text-center gap-2"
        >
          <p className="text-white font-bold text-base sm:text-lg">
            {getExtra(section.extra_data, "bottom_note_title", "All deliverables issued to IFC standard")}
          </p>
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
            {getExtra(section.extra_data, "bottom_note_text", "")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const DetailedStandards = ({ section }) => {
  if (!section) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  // Group items by column
  const groups = (section.items || []).reduce((acc, item) => {
    const col = getExtra(item.extra_data, "column");
    if (!acc[col]) {
      acc[col] = {
        title: getExtra(item.extra_data, "column_title"),
        icon: getExtra(item.extra_data, "column_icon"),
        items: []
      };
    }
    acc[col].items.push(item);
    return acc;
  }, {});

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
              {section.section_label}
            </span>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {section.description}
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 place-items-center">
          {Object.entries(groups).map(([key, group], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group  w-full max-w-[450px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
              <div className="mb-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center text-2xl">
                    {group.icon}
                  </div>
                  <span className="text-xs font-bold text-secondary/60 uppercase tracking-widest">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300">
                  {group.title}
                </h3>
                <div className="w-12 h-1 bg-secondary rounded-full" />
              </div>

              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2.5"
              >
                {group.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-2.5 text-gray-300 group/item"
                  >
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0 mt-1.5 group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-xs sm:text-sm font-medium group-hover/item:text-white transition-colors duration-300">
                      {item.title}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-5 bg-white/5 border border-white/10 rounded-2xl text-center"
        >
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {getExtra(section.extra_data, "bottom_note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const DetailedWorkflow = ({ section }) => {
  if (!section) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-gray-50 py-12 md:py-16">
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
              className="group flex gap-5 items-start bg-white border border-gray-100 hover:border-secondary/30 hover:shadow-md rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 group-hover:bg-secondary group-hover:border-secondary flex items-center justify-center transition-all duration-300">
                  <span className="text-sm font-black text-primary group-hover:text-white">
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
          className="mt-10 p-6 bg-white border border-gray-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
        >
          <div>
            <p className="text-primary font-bold text-base mb-1">
              {getExtra(section.extra_data, "bottom_note")}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {getExtra(section.extra_data, "bottom_note_desc")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const DetailedWhyReva = ({ section }) => {
  if (!section) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              {section.section_label}
            </span>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            {section.title} <br />
            <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
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
            const IconComponent = iconMap[item.icon_name] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-secondary/30 hover:bg-white hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="relative mb-4">
                  <div className="w-14 h-14 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/20 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-secondary stroke-[2px]" />
                  </div>
                  <div className="absolute inset-0 bg-secondary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-4"
        >
          {(getExtra(section.extra_data, "bottom_checklist", [])).map((label) => (
            <div
              key={label}
              className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-secondary/30 hover:bg-white transition-all duration-300"
            >
              <div className="text-secondary font-black text-xl mb-1">✓</div>
              <div className="text-xs text-gray-700 font-semibold leading-snug">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const DetailedCTA = ({ section }) => {
  if (!section) return null;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
              {section.title} <br />
              <span className="text-secondary">{section.title_highlight}</span>
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-10 leading-relaxed">
              {section.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={getExtra(section.extra_data, "button1_link", "/contact")}
                className="px-8 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {getExtra(section.extra_data, "button1_text")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={getExtra(section.extra_data, "button2_link", "/services")}
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                {getExtra(section.extra_data, "button2_text")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const DetailedEngineeringPage = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        const data = await api.getServiceBySlug("detailed");
        if (data) {
          setService(data);
        } else {
          setError("Detailed Engineering service data not found.");
        }
      } catch (err) {
        console.error("Error fetching detailed engineering:", err);
        setError("Failed to load Detailed Engineering service details.");
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-gray-50 rounded-2xl animate-pulse" />
            ))}
          </div>
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

      {/* Disciplines (coverage) */}
      <DetailedDisciplines section={getSection("coverage")} />

      {/* Scope (scope) */}
      <DetailedScope section={getSection("scope")} />

      {/* Standards (standards) */}
      <DetailedStandards section={getSection("standards")} />

      {/* Workflow (workflow) */}
      <DetailedWorkflow section={getSection("workflow")} />

      {/* Why REVA (why_reva) */}
      <DetailedWhyReva section={getSection("why_reva")} />

      {/* CTA (cta) */}
      <DetailedCTA section={getSection("cta")} />
    </div>
  );
};

export default DetailedEngineeringPage;