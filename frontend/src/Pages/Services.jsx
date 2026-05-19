// Pages/Services.jsx — Dynamic All Services page
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "../Component/Breadcrumb";
import api from "../api/api";
import SEO from "../Component/SEO";
import {
  FlaskConical,
  Layers,
  ShoppingCart,
  HardHat,
  BarChart3,
  Wrench,
} from "lucide-react";

// Icon mapping — maps icon_name from DB to actual component
const iconMap = {
  FlaskConical,
  Layers,
  ShoppingCart,
  HardHat,
  BarChart3,
  Wrench,
};

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const ServiceSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-7 flex flex-col h-full animate-pulse">
    <div className="flex justify-between mb-5">
      <div className="w-12 h-12 bg-gray-200 rounded-xl" />
      <div className="w-8 h-8 bg-gray-100 rounded" />
    </div>
    <div className="w-3/4 h-6 bg-gray-200 rounded mb-3" />
    <div className="w-1/2 h-3 bg-gray-100 rounded mb-5" />
    <div className="space-y-2 mb-6">
      <div className="w-full h-3 bg-gray-50 rounded" />
      <div className="w-full h-3 bg-gray-50 rounded" />
      <div className="w-4/5 h-3 bg-gray-50 rounded" />
    </div>
    <div className="flex gap-2 mb-6 mt-auto">
      <div className="w-16 h-5 bg-gray-100 rounded-full" />
      <div className="w-16 h-5 bg-gray-100 rounded-full" />
    </div>
    <div className="w-24 h-4 bg-gray-200 rounded" />
  </div>
);

const ServiceCard = React.memo(({ service }) => {
  const IconComponent = iconMap[service.icon_name] || FlaskConical;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="group relative bg-white border border-gray-200 rounded-2xl p-6 md:p-7 flex flex-col h-full transition-all duration-300 hover:border-secondary hover:shadow-xl overflow-hidden"
    >
      {/* Top and Bottom Accent Borders */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

      {/* Step number */}
      <span className="absolute top-6 right-6 text-3xl md:text-3xl font-black text-gray-100 group-hover:text-secondary/20 transition-colors duration-300 leading-none select-none">
        {service.number}
      </span>

      {/* Icon Section */}
      <div className="mb-5 relative">
        <div className="w-12 h-12 bg-secondary/5 group-hover:bg-secondary border border-secondary/20 group-hover:border-secondary rounded-xl flex items-center justify-center transition-all duration-300">
          <IconComponent
            className="w-6 h-6 text-secondary group-hover:text-white transition-colors duration-300"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-primary hover:text-secondary transition-colors duration-300 mb-1.5 leading-tight pr-8">
          {service.title}
        </h3>

        {/* Tagline */}
        <p className="text-[11px] text-gray-500 font-black uppercase tracking-[0.15em] mb-4">
          {service.tagline}
        </p>

        {/* Description */}
        <p className="text-[13px] md:text-sm text-gray-600 leading-relaxed mb-6 text-justify">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {(service.tags || []).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-[11px] font-medium rounded-full group-hover:border-secondary/30 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA link */}
        <Link
          to={
            service.href
              ? (service.href.startsWith('/') && !service.href.startsWith('/services')
                ? `/services${service.href}`
                : service.href)
              : `/services/${service.slug}`
          }
          className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest transition-all duration-300 hover:gap-3 hover:text-secondary"
        >
          <span>Learn More</span>
        </Link>
      </div>
    </motion.div>
  );
});

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getActiveServices();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <SEO 
        title="Our Engineering & Process Services"
        description="REVA Process Technologies delivers six core engineering and manufacturing services: Feasibility Studies, Basic Engineering, Detailed Engineering, Procurement, EPC Management, and Manufacturing & Site Services."
        keywords="feasibility study, basic engineering, process detailed engineering, procurement services, EPC management, skid manufacturing, Pune"
      />
      <Breadcrumb />
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">

          {/* Header */}
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
                What We Do
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
              Our <span className="text-secondary">Services</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl text-justify">
              Six integrated service capabilities spanning the full project
              lifecycle — from feasibility and engineering through procurement,
              manufacturing, and site commissioning.
            </p>
          </motion.div>

          {/* Loading / Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {loading
              ? Array(6).fill(0).map((_, i) => <ServiceSkeleton key={i} />)
              : services.map((service) => <ServiceCard key={service.id} service={service} />)
            }
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default React.memo(ServicesSection);
