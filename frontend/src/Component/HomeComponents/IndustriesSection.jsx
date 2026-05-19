import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../api/api';

const defaultImages = [
  './hero1.png',
  './bgbg2.jpg',
  './industry3.jpg',
  './maintenance.png',
  '/epc.png',
  '/manufacturing.png'
];

const defaultTags = [
  'De-Risk First',
  'Engineering Foundation',
  'Execution-Ready',
  'Right Quality. Right Time.',
  'On-Time. On-Budget.',
  'Concept to Handover'
];

const fallbackIndustries = [
  {
    id: 1,
    title: 'Feasibility & Pilot Plant Study',
    description:
      'Techno-economic feasibility studies and pilot plant design to de-risk scale-up before full investment.',
    image: './industry1.jpg',
    link: '/services/feasibility',
    tag: 'De-Risk First',
  },
  {
    id: 2,
    title: 'Basic Engineering',
    description:
      'Design basis, PFDs, heat & mass balances, equipment sizing, P&IDs, and HAZID — complete BEP ready for detailed engineering.',
    image: './industry2.jpg',
    link: '/services/basic-engineering',
    tag: 'Engineering Foundation',
  },
  {
    id: 3,
    title: 'Detailed Engineering',
    description:
      'Multi-discipline IFC-level construction packages with 3D modeling, piping, civil, structural, and instrumentation.',
    image: './industry3.jpg',
    link: '/services/detailed',
    tag: 'Execution-Ready',
  },
  {
    id: 4,
    title: 'Procurement & Expediting',
    description:
      'Vendor evaluation, PO placement, active expediting, and pre-dispatch inspection — engineering-backed and schedule-driven.',
    image: './industry4.jpg',
    link: '/services/procurement',
    tag: 'Right Quality. Right Time.',
  },
  {
    id: 5,
    title: 'EPC Project Management',
    description:
      'Integrated EPC execution framework — schedule control, cost management, risk mitigation, and stakeholder reporting.',
    image: '/hero1.png',
    link: '/services/basic',
    tag: 'On-Time. On-Budget.',
  },
  {
    id: 6,
    title: 'Manufacturing & Site Services',
    description:
      'Precision equipment fabrication, on-site erection, and cold/hot commissioning through to performance-proven handover.',
    image: '/hero3.png',
    link: '/services/site',
    tag: 'Concept to Handover',
  },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const IndustriesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getActiveServices();
        if (data?.length) {
          setServices(
            data.map((s, index) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              link: s.href
                ? (s.href.startsWith('/') && !s.href.startsWith('/services')
                  ? `/services${s.href}`
                  : s.href)
                : `/services/${s.slug}`,
              tag: s.tagline || defaultTags[index % defaultTags.length],
              image: s.hero_image && !s.hero_image.startsWith('.') ? s.hero_image : defaultImages[index % defaultImages.length],
            }))
          );
        } else {
          setServices(fallbackIndustries);
        }
      } catch (err) {
        console.error("Failed to fetch active services for Home page:", err);
        setServices(fallbackIndustries);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="w-full bg-gray-50 py-8 md:py-12">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-10 md:mb-12 text-center">
          <motion.p
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-2"
          >
            What We Do
          </motion.p>

          <motion.h2
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-3"
          >
            Our <span className="text-secondary">Services</span>
          </motion.h2>

          <motion.p
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto"
          >
            Six integrated EPCC capabilities covering the full project lifecycle
            — from feasibility through engineering, procurement, manufacturing,
            and commissioning.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 mx-auto w-12 h-[3px] bg-secondary rounded-full"
          />
        </div>

        {/* ── Cards Grid ─────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-[280px] sm:h-[300px] bg-white border border-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {services.map((industry, index) => (
              <motion.div
                key={industry.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group"
              >
                <Link
                  to={industry.link}
                  className="relative h-[280px] sm:h-[300px] rounded-2xl overflow-hidden flex flex-col bg-primary shadow-md hover:shadow-xl transition-all duration-400 border border-transparent hover:border-secondary/30 block"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105 brightness-50 group-hover:brightness-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent" />
                  </div>

                  {/* Number badge */}
                  <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shadow-md">
                    <span className="text-primary text-xs font-black">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Tag pill */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2.5 py-1 bg-black/30 backdrop-blur-sm border border-white/15 text-white text-xs font-semibold rounded-full">
                      {industry.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative mt-auto p-5 z-10 flex flex-col gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-secondary transition-colors duration-300">
                      {industry.title}
                    </h3>

                    <div className="w-6 h-[2px] bg-secondary rounded-full group-hover:w-10 transition-all duration-400" />

                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                      {industry.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-secondary font-bold text-xs mt-0.5 group-hover:gap-2.5 transition-all duration-300">
                      <span>Explore Service</span>
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-secondary to-secondary/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── View All CTA ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            to="/services"
            className="group inline-flex items-center gap-2.5 bg-primary text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            View All Services
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default IndustriesSection;
