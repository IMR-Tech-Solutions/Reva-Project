import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FlaskConical,
  GitBranch,
  Layers,
  SlidersHorizontal,
  FileText,
  ShieldCheck,
  Search,
  BarChart3,
  Rocket,
  Shield,
  FileCheck,
  Clipboard,
  Microscope,
  CheckCircle,
} from "lucide-react";
import Breadcrumb from "../Component/Breadcrumb";
import api from "../api/api";
import ProcessHero from "../Component/ProcessServiceComponents/ProcessHero";

// Icon mapping to safely resolve icons from DB
const iconMap = {
  GitBranch,
  SlidersHorizontal,
  Layers,
  FlaskConical,
  FileText,
  ShieldCheck,
  Search,
  BarChart3,
  Rocket,
  Shield,
  FileCheck,
  Clipboard,
  Microscope,
  CheckCircle,
};

// ─── DATA ────────────────────────────────────────────────────────────────────

// Helper to get nested extra_data or default
const getExtra = (obj, path, def = null) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || def;
};

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─── HERO ─────────────────────────────────────────────────────────────────────


// ─── SERVICES GRID ────────────────────────────────────────────────────────────

const BasicEngineeringServices = ({ section }) => {
  if (!section) return null;
  const items = section.items || [];

  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              {section.section_label || "What We Cover"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            {section.title || "Basic Engineering"}{" "}
            <span className="text-secondary">{section.title_highlight || "Scope"}</span>
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
          className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((service, index) => {
            const Icon = iconMap[service.icon_name] || GitBranch;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:border-secondary hover:shadow-lg overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="absolute top-4 right-5 text-4xl font-black text-gray-50 group-hover:text-secondary/10 transition-colors duration-300 pointer-events-none select-none">
                  0{index + 1}
                </div>

                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gray-50 group-hover:bg-secondary border border-gray-100 group-hover:border-secondary rounded-2xl flex items-center justify-center transition-all duration-300">
                    <Icon
                      className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {service.description}
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

// ─── WORKFLOW ─────────────────────────────────────────────────────────────────

const BasicEngineeringWorkflow = ({ section }) => {
  if (!section) return null;
  const items = section.items || [];

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              {section.section_label || "Our Approach"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
            {section.title || "Basic Engineering"}{" "}
            <span className="text-secondary">{section.title_highlight || "Workflow"}</span>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.3 }}
              className="group flex gap-5 items-start bg-gray-50 hover:bg-white border border-gray-100 hover:border-secondary/30 hover:shadow-md rounded-2xl p-5 sm:p-6 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-white border border-primary/10 group-hover:bg-secondary group-hover:border-secondary flex items-center justify-center shadow-sm transition-all duration-300">
                  <span className="text-sm font-black text-primary group-hover:text-white transition-colors duration-300">
                    {item.step_number || index + 1}
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── TOOLS & DELIVERABLES ─────────────────────────────────────────────────────

const BasicEngineeringStandards = ({ section }) => {
  if (!section) return null;
  const items = section.items || [];

  const columns = [
    
    { key: "deliverables", title: "BEP Deliverables", icon: "📐", label: "01" },
    { key: "codes", title: "Codes & Standards", icon: "📋", label: "02" },
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const listItem = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
  <section className="relative bg-primary py-8 md:py-10 overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]"
    />

    <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          <span className="inline-flex items-center gap-2 text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
            {section.section_label || "Technical Foundation"}
          </span>
          <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
          {section.title || "Tools, Deliverables &"}{" "}
          <span className="text-secondary">
            {section.title_highlight || "Engineering Standards"}
          </span>
        </h2>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {section.description}
        </p>
      </motion.div>

     <div className="grid grid-cols-1 md:grid-cols-2  place-items-center">
  {columns.map((col, index) => {
    const columnItems = items.filter(
      (i) => getExtra(i.extra_data, "column") === col.key
    );

    return (
      <motion.div
        key={col.key}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group w-full max-w-[450px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />

        <div className="mb-5">
          <div className="flex items-center justify-between mb-5">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center text-2xl">
              {col.icon}
            </div>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              {col.label}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-secondary transition-colors duration-300">
            {col.title}
          </h3>

          <div className="w-14 h-1 bg-secondary rounded-full" />
        </div>

        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {columnItems.map((item, idx) => (
            <motion.li
              key={idx}
              variants={listItem}
              className="flex items-start gap-3 text-gray-200"
            >
              <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0 mt-2" />
              <span className="text-sm sm:text-base font-semibold leading-relaxed">
                {item.title}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    );
  })}
</div>

      {getExtra(section.extra_data, "bottom_note") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-5"
        >
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed text-center">
            {getExtra(section.extra_data, "bottom_note")}
          </p>
        </motion.div>
      )}
    </div>
  </section>
);
};

// ─── HIGHLIGHTS (dark cards) ──────────────────────────────────────────────────

const BasicEngineeringHighlights = ({ section }) => {
  if (!section) return null;
  const items = section.items || [];
  const bottomStats = getExtra(section.extra_data, 'bottom_stats', []);

  return (
    <section className="relative bg-primary py-8 md:py-12 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-12 md:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="inline-flex items-center gap-2 text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              {section.section_label || "The Reva Difference"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            {section.title || "Basic Engineering That's"}<br />
            <span className="text-secondary">{section.title_highlight || "Built to Last Through Execution"}</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {section.description}
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div key={index} variants={scaleVariants} whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
              <div className="absolute top-4 right-5 text-xs font-black text-white/10 group-hover:text-secondary/30 transition-colors duration-300">
                0{index + 1}
              </div>
              <div className="mb-5">
                <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center text-3xl group-hover:bg-secondary/30 transition-colors duration-300">
                  {item.icon_name}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                {item.description}
              </p>
              {getExtra(item.extra_data, 'features') && (
                <ul className="space-y-2 pt-4 border-t border-white/10">
                  {getExtra(item.extra_data, 'features').map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>

        {bottomStats.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {bottomStats.map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 hover:border-secondary/30 transition-all duration-300">
                <p className="text-secondary font-black text-sm sm:text-base mb-1">{stat.value}</p>
                <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

// ─── WHY REVA ─────────────────────────────────────────────────────────────────

const BasicEngineeringWhyReva = ({ section }) => {
  if (!section) return null;
  const items = section.items || [];
  const contact = getExtra(section.extra_data, 'contact', {});
  const bottomStatsBar = getExtra(section.extra_data, 'bottom_stats_bar', []);

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-2">
          {/* Left sticky */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
                {section.section_label || "Value Proposition"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-5 leading-tight">
              {section.title || "Why Reva for"}<br />
              <span className="text-secondary">{section.title_highlight || "Basic Engineering?"}</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {section.description}
            </p>
            <div className="space-y-3">
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 p-4 bg-secondary/5 border-l-4 border-secondary rounded-r-xl hover:bg-secondary/10 transition-colors group">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Engineering Enquiries</div>
                    <div className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">{contact.phone}</div>
                  </div>
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl hover:bg-primary/10 transition-colors group">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Email Us</div>
                    <div className="text-sm font-bold text-primary group-hover:text-secondary transition-colors break-all">{contact.email}</div>
                  </div>
                </a>
              )}
            </div>
          </motion.div>

          {/* Right list */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
            {items.map((point, index) => (
              <motion.div key={index} variants={listItemVariants} whileHover={{ x: 6 }} transition={{ duration: 0.3 }} className="group flex gap-5 items-start border-l-4 border-gray-200 hover:border-secondary pl-6 py-4 transition-colors duration-300">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-300">{point.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{point.description}</p>
                </div>
                <div className="flex-shrink-0 text-right min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-black text-secondary leading-none mb-1">{getExtra(point.extra_data, 'metric')}</div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide leading-tight">{getExtra(point.extra_data, 'metricLabel')}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {bottomStatsBar.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-16 pt-10 border-t-2 border-gray-100">
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4 text-center">
              {bottomStatsBar.map((stat) => (
                <div key={stat.label}>
                  <div className="text-lg sm:text-2xl font-black text-secondary mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// ─── CTA BANNER ───────────────────────────────────────────────────────────────

const BasicEngineeringCTA = ({ section }) => {
  if (!section) return null;
  const extra = section.extra_data || {};

  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-primary rounded-3xl px-8 py-12 md:py-16 text-center relative overflow-hidden">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-0 right-0 w-80 h-80 bg-secondary rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              {section.section_label || "Start Strong"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              {section.title || "Ready to Build on a"}<br />
              <span className="text-secondary">{section.title_highlight || "Solid Engineering Foundation?"}</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              {section.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={extra.button1_link || "/contact"} className="group inline-flex items-center gap-3 bg-secondary text-white font-semibold px-8 py-4 rounded-lg hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 text-sm sm:text-base">
                {extra.button1_text || "Discuss Your Project"}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to={extra.button2_link || "/services"} className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                {extra.button2_text || "View All Services"}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── PAGE ASSEMBLY ────────────────────────────────────────────────────────────

const BasicEngineering = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await api.getServiceBySlug("basic-engineering");
        setService(data);
      } catch (err) {
        console.error("Error fetching basic engineering service:", err);
        setError("Failed to load service content.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
          <Link href="/services" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all">Return to Services</Link>
        </div>
      </div>
    );
  }

  const sections = service.sections || [];
  const getSection = (key) => sections.find((s) => s.section_key === key);

  return (
    <>
      <Breadcrumb />
      <ProcessHero service={service} />
      <BasicEngineeringServices section={getSection("coverage")} />
      <BasicEngineeringWorkflow section={getSection("workflow")} />
      <BasicEngineeringStandards section={getSection("standards")} />
      <BasicEngineeringHighlights section={getSection("highlights")} />
      <BasicEngineeringWhyReva section={getSection("why_reva")} />
      <BasicEngineeringCTA section={getSection("cta")} />
    </>
  );
};

export default BasicEngineering;
