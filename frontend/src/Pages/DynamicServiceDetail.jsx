import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
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
  GitMerge,
  Clock,
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
import SEO from "../Component/SEO";

// ─── ICON MAPPING ───────────────────────────────────────────────────────────
const iconMap = {
  FlaskConical, GitBranch, Layers, SlidersHorizontal, FileText,
  ShieldCheck, Search, BarChart3, Rocket, Shield, FileCheck,
  Clipboard, Microscope, CheckCircle, GitMerge, Clock,
  Headphones, Compass, Layout, Settings, Building, Zap, Box
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

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ─── SECTION RENDERERS ──────────────────────────────────────────────────────

/**
 * Standard Grid Section (Coverage, Scope, Disciplines)
 */
const GridSection = ({ section }) => {
  if (!section) return null;
  const items = section.items || [];

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
              {section.section_label || "What We Cover"}
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
          {items.map((item, index) => {
            const Icon = iconMap[item.icon_name] || Layers;
            return (
              <motion.div
                key={item.id || index}
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
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
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

/**
 * Workflow Section
 */
const WorkflowSection = ({ section }) => {
  if (!section) return null;
  const items = section.items || [];

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
              {section.section_label || "Our Process"}
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
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              variants={cardVariants}
              whileHover={{ x: 6 }}
              className="group flex gap-5 items-start bg-gray-50 border border-gray-100 hover:border-secondary/30 hover:shadow-md rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-white border border-primary/10 group-hover:bg-secondary group-hover:border-secondary flex items-center justify-center transition-all duration-300">
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
      </div>
    </section>
  );
};

/**
 * Standards / Highlights Section
 */
const HighlightsSection = ({ section }) => {
  if (!section) return null;
  const items = section.items || [];

  return (
    <section className="relative bg-primary py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

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
            <span className="text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
              {section.section_label || "Why Choose Us"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {section.description}
          </p>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-secondary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {item.description}
              </p>
              {getExtra(item.extra_data, "features") && (
                <ul className="space-y-2 border-t border-white/10 pt-4">
                  {getExtra(item.extra_data, "features").map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1 h-1 bg-secondary rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * CTA Section
 */
const CTASection = ({ section }) => {
  if (!section) return null;
  const extra = section.extra_data || {};

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
              {section.title} <span className="text-secondary">{section.title_highlight}</span>
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-8">
              {section.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={getExtra(extra, "button1_link", "/contact")}
                className="px-8 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-all"
              >
                {getExtra(extra, "button1_text", "Get Started")}
              </Link>
              <Link
                to={getExtra(extra, "button2_link", "/services")}
                className="px-8 py-3 bg-white/10 text-white font-bold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                {getExtra(extra, "button2_text", "View All Services")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Simple Content Section (Fallback for text-only sections)
 */
const ContentSection = ({ section }) => {
  if (!section) return null;
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              {section.section_label || "Overview"}
            </span>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-6">
            {section.title} <span className="text-secondary">{section.title_highlight}</span>
          </h2>
          <div className="text-gray-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
            {section.description}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const DynamicServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        console.log("Fetching service for slug:", slug);
        const data = await api.getServiceBySlug(slug);
        console.log("Service Data Received:", data);
        if (data) {
          setService(data);
        } else {
          setError("Service not found.");
        }
      } catch (err) {
        console.error("Error fetching dynamic service:", err);
        setError("Failed to load service details.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-secondary text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-black text-primary mb-2">Service Not Found</h2>
        <p className="text-gray-500 mb-8">{error || "The service you're looking for is unavailable."}</p>
        <Link to="/services" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition-colors">
          Return to Services
        </Link>
      </div>
    );
  }

  const sections = service.sections || [];
  const getSection = (key) => sections.find((s) => s.section_key === key);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description || service.tagline || "",
    "provider": {
      "@type": "Organization",
      "name": "REVA Process Technologies",
      "url": "https://revaprocess.in"
    }
  };

  return (
    <div className="bg-white scroll-smooth overflow-x-hidden">
      <SEO 
        title={service.title}
        description={service.description || service.tagline || `Learn about REVA's professional ${service.title} services.`}
        keywords={`${service.title}, process engineering service, industrial manufacturing`}
        schema={serviceSchema}
      />
      <Breadcrumb />

      {/* Hero Section */}
      <ProcessHero service={service} />

      {/* Dynamic Sections Based on Keys */}
      {sections.length > 0 ? (
        sections.map((section) => {
          const key = (section.section_key || "").toLowerCase();

          // Route to appropriate renderer based on key or content
          if (["coverage", "scope", "disciplines", "features", "grid"].includes(key)) {
            return <GridSection key={section.id} section={section} />;
          }
          if (["workflow", "process", "steps", "approach"].includes(key)) {
            return <WorkflowSection key={section.id} section={section} />;
          }
          if (["highlights", "standards", "why_reva", "values"].includes(key)) {
            return <HighlightsSection key={section.id} section={section} />;
          }
          if (["cta", "contact_banner", "action"].includes(key)) {
            return <CTASection key={section.id} section={section} />;
          }

          // Fallback logic
          if (section.items && section.items.length > 0) {
            return <GridSection key={section.id} section={section} />;
          }
          if (section.description || section.title) {
            return <ContentSection key={section.id} section={section} />;
          }

          return null;
        })
      ) : (
        <div className="py-20 text-center text-gray-400">
          <p>No content sections found for this service yet.</p>
          <p className="text-xs mt-2 italic">Add sections in the dashboard to see them here.</p>
        </div>
      )}

      {/* Always ensure some spacing at bottom if no CTA */}
      <div className="h-12" />
    </div>
  );
};

export default DynamicServiceDetail;
