import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Breadcrumb from "../Component/Breadcrumb";
import { Link } from "react-router-dom";


const ProductLayout = ({
  title,
  herotitle,
  herosub,
  paragraph1,
  paragraph2,
  img,
  keysubheading,
  features,
  applications = [],
  reactor_types = [],
  stats = [],
}) => {
  return (
    <div className="bg-background">
      <Breadcrumb />

      {/* ── HERO ── */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 sm:w-96 h-72 sm:h-96
                        rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full
                        border border-white/5 pointer-events-none
                        -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12
                        py-10 sm:py-12 md:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-1"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5
                                 bg-secondary/20 text-secondary border border-secondary/30
                                 text-xs font-bold uppercase tracking-widest rounded-full">
                  {herosub}
                </span>
                
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white
                             leading-tight mb-5">{herotitle}</h1>

              <div className="h-px w-16 bg-secondary mb-6" />

              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-3 text-justify">{paragraph1}</p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 text-justify">{paragraph2}</p>

             

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2
               px-7 py-3.5 bg-secondary text-white font-bold
               text-sm rounded-xl hover:bg-secondary/90
               transition-all duration-300"
                >
                  Request Quote
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2
               px-7 py-3.5 bg-white/10 border border-white/20
               text-white font-bold text-sm rounded-xl
               hover:bg-white/20 transition-all duration-300"
                >
                  Our Services
                </Link>
              </div>

            </motion.div>

            {/* Image & Stats Row */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 relative"
            >
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden
                              h-[280px] sm:h-[360px] lg:h-[440px]
                              border border-white/10 shadow-2xl mb-8">
                <img src={img} alt={herotitle}
                   className="w-full h-full object-cover"
                   loading="lazy" />
                <div className="absolute inset-0 bg-primary/20" />
              </div>

              {/* Dynamic Stats Row below image */}
              {stats && stats.length > 0 && (
                <div className="flex flex-wrap gap-8 justify-center lg:justify-start px-4">
                  {stats.map((s, idx) => (
                    <div key={idx} className="text-center lg:text-left">
                      <p className="text-2xl sm:text-3xl font-black text-secondary leading-none">
                        {s.value}
                      </p>
                      <p className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1.5">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES — Row list, no cards ── */}
      <section className="py-10 sm:py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5
                             bg-secondary/10 text-secondary border border-secondary/30
                             text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Technical Specifications
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
                Key Features & Advantages
              </h2>
              <p className="text-gray-400 text-sm max-w-xs sm:text-right leading-relaxed text-justify">
                {keysubheading}
              </p>
            </div>
          </motion.div>

          {/* Divider rows — NO cards */}
          <div className="divide-y divide-primary/8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group flex flex-col sm:flex-row items-start sm:items-center
                           gap-4 sm:gap-8 py-6 sm:py-7
                           hover:bg-primary/[0.02] px-3 sm:px-4 rounded-xl
                           transition-all duration-300 relative"
              >
                {/* Left hover bar */}
                <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-secondary
                                scale-y-0 group-hover:scale-y-100 origin-top
                                transition-transform duration-400 rounded-full" />

                {/* Index + icon */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-3xl sm:text-4xl font-black text-primary/10
                                   group-hover:text-secondary/20 transition-colors duration-300
                                   w-10 sm:w-12 leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/10
                                  flex items-center justify-center text-primary
                                  group-hover:bg-primary group-hover:text-white
                                  transition-all duration-300">
                    <FiCheckCircle className="text-sm" />
                  </div>
                </div>

                {/* Title */}
                <div className="sm:w-56 shrink-0">
                  <h3 className="text-sm sm:text-base font-bold text-primary
                                 group-hover:text-secondary transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>

                {/* Divider dot — desktop only */}
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-secondary/40 shrink-0" />

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed flex-1 text-justify">
                  {feature.description}
                </p>

                {/* Arrow */}
                
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS / INDUSTRIES ── */}
      {applications && applications.length > 0 && (
        <section className="py-10 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5
                               bg-primary/10 text-primary border border-primary/20
                               text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Industries Served
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
                Applications & Industries
              </h2>
              <p className="text-gray-400 text-sm mt-2 max-w-lg leading-relaxed">
                Our {title?.toLowerCase() || "products"} are trusted across diverse industrial sectors worldwide.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5">
              {applications.map((app, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group relative bg-gray-50 border border-gray-100 rounded-xl
                             px-5 py-5 hover:bg-primary hover:border-primary
                             transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/10
                                    flex items-center justify-center shrink-0
                                    group-hover:bg-white/20 group-hover:border-white/20
                                    transition-all duration-300">
                      <FiCheckCircle className="text-primary group-hover:text-white text-sm transition-colors duration-300" />
                    </div>
                    <h3 className="text-sm font-bold text-primary group-hover:text-white transition-colors duration-300">
                      {app}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── TYPES OF REACTORS ── */}
      {reactor_types && reactor_types.length > 0 && (
        <section className="py-10 sm:py-12 bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
            
            {/* Header section matched to theme */}
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5
                               bg-secondary/10 text-secondary border border-secondary/30
                               text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Equipment Overview
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary mb-5">
                Types of Reactors
              </h2>
              <div className="w-20 h-1.5 bg-secondary rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14 mt-12">
              {reactor_types.map((rtype, index) => {
                // We'll alternate the offset shadow subtly using theme colors
                const isSecondary = index % 2 === 0;
                const shadowColor = isSecondary ? 'bg-secondary/10' : 'bg-primary/5';

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col group"
                  >
                    {/* Image Container with Theme Offset */}
                    <div className="relative pt-4 px-4">
                      {/* Theme offset shadow */}
                      <div className={`absolute top-0 right-0 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-3xl translate-x-3 -translate-y-3 ${shadowColor} z-0 transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4`} />
                      
                      {/* Main bordered box */}
                      <div className="relative z-10 bg-white border border-gray-100 shadow-sm rounded-2xl aspect-square overflow-hidden flex items-center justify-center group-hover:shadow-xl group-hover:border-primary/10 transition-all duration-500">
                        {rtype.is_important && (
                          <div className="absolute top-4 right-4 bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-20 shadow-md">
                            Featured
                          </div>
                        )}
                        {rtype.image ? (
                          <img 
                            src={rtype.image} 
                            alt={rtype.title} 
                            className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="text-gray-300 text-sm font-semibold relative z-10 flex flex-col items-center gap-2">
                            No Image Found
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content Container */}
                    <div className="mt-8 px-2">
                      <h3 className="text-xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors duration-300">
                        {rtype.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 leading-relaxed text-justify">
                        {rtype.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA SECTION ── */}
      <section className="py-10 sm:py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary rounded-2xl sm:rounded-3xl
                       px-6 sm:px-10 py-8 sm:py-10 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full
                            border border-white/5 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full
                            border border-white/5 pointer-events-none
                            -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 flex flex-col sm:flex-row
                            items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-white font-black text-lg sm:text-xl mb-1">
                  Ready to get started?
                </p>
                <p className="text-white/50 text-xs sm:text-sm max-w-md leading-relaxed">
                  Contact our engineering team for specifications, custom requirements,
                  or a project quote.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/contact"
                  className="inline-flex items-center justify-center gap-2
                              px-6 py-3 bg-secondary text-white font-bold text-sm
                              rounded-xl hover:bg-secondary/90 transition-all duration-300
                              whitespace-nowrap">
                  Contact Us
                </Link>
                {/* <Link to="/products"
                   className="inline-flex items-center justify-center gap-2
                              px-6 py-3 bg-white/10 border border-white/20
                              text-white font-bold text-sm rounded-xl
                              hover:bg-white/20 transition-all duration-300
                              whitespace-nowrap">
                  All Products
                </Link> */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ProductLayout;
