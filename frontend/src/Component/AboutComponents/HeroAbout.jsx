import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const AboutHero = ({ content }) => {
  if (!content) return null;

  // Helper to format image paths
  const getImageUrl = (path, defaultImg) => {
    if (!path) return defaultImg;
    if (path.startsWith("http")) return path;
    if (path.startsWith("/api/uploads")) {
      return `${import.meta.env.VITE_API_URL}${path}`;
    }
    if (path.startsWith("/")) return `${import.meta.env.VITE_API_URL}${path}`;
    return path;
  };

  // Helper to render dynamic Lucide Icon
  const DynamicIcon = ({ name, className }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.Info;
    return <IconComponent className={className} />;
  };

  const featureItems = content.core_pills && content.core_pills.length > 0 
    ? [...content.core_pills].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  const statsItems = content.highlights && content.highlights.length > 0
    ? [...content.highlights].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] pt-16 pb-12 lg:pb-16">
      {/* Decorative Dot Pattern */}
      <div className="absolute right-10 bottom-16 hidden lg:grid grid-cols-5 gap-2 opacity-20 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#f5b400]"></span>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-10 w-10 rounded-xl bg-[#06264a] flex items-center justify-center text-[#f5b400]">
                <LucideIcons.TrendingUp className="w-5 h-5" />
              </span>
              <p className="text-[#d99a00] text-xs sm:text-sm font-bold uppercase tracking-[0.22em]">
                {content.hero_label || "ABOUT REVA PROCESS TECHNOLOGIES"}
              </p>
              <span className="hidden sm:block w-16 h-[1px] bg-[#d99a00]"></span>
            </div>

            <h1 className="text-[#06264a] text-4xl sm:text-4xl lg:text-4xl font-extrabold leading-tight mb-4">
              {content.hero_title || "Engineering Solutions."}<br />
              {content.hero_highlight ? (
                <span className="text-[#d99a00]">{content.hero_highlight}</span>
              ) : (
                <>Built for <span className="text-[#d99a00]">Progress.</span></>
              )}
            </h1>

            <div className="w-12 h-[3px] bg-[#06264a] mb-4"></div>

            <div className="space-y-4 text-gray-700 text-base lg:text-lg leading-relaxed max-w-2xl">
              <p className="text-justify">
                {content.hero_description || "REVA Process Technologies is a Pune-based engineering and manufacturing company delivering complete process solutions for chemical, petrochemical, biogas, environmental, and allied industries."}
              </p>
              {content.hero_description2 && (
                <p className="text-justify">{content.hero_description2}</p>
              )}
            </div>
          </motion.div>

          {/* Right Image with Organic Mask */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="relative min-h-[420px] lg:min-h-[560px]">
              <div className="absolute inset-0 rounded-[44%_56%_38%_62%/38%_40%_60%_62%] overflow-hidden shadow-2xl">
                <img
                  src={getImageUrl(content.hero_image_main, "./hero1.png")}
                  alt="REVA Process Plant"
                  className="h-full w-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#06264a]/10 hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Overlapping Badge */}
              <div className="absolute -left-5 lg:-left-12 top-1/2 -translate-y-1/2 h-32 w-32 lg:h-40 lg:w-40 rounded-full bg-white shadow-2xl border-4 border-[#f5b400]/20 flex items-center justify-center text-center p-4">
                <div className="flex flex-col items-center">
                  <p className="text-[10px] font-bold text-[#06264a] uppercase tracking-widest">Since</p>
                  <h3 className="text-3xl lg:text-4xl font-black text-[#06264a] leading-none my-1">{content.hero_year || "2015"}</h3>
                  <p className="text-[8px] font-bold text-[#06264a] uppercase leading-tight text-center">
                    {content.hero_year_text ? (
                      content.hero_year_text.split(' ').map((word, i) => (
                        <React.Fragment key={i}>{word}{i === 1 ? <br /> : ' '}</React.Fragment>
                      ))
                    ) : (
                      <>Committed to<br />Excellence</>
                    )}
                  </p>
                </div>
              </div>

              {/* Geometric Decoration */}
              <div className="absolute -bottom-5 right-10 h-20 w-44 rounded-tl-[50px] rounded-br-[50px] bg-[#06264a] -z-10"></div>
            </div>
          </motion.div>
        </div>

        {/* Feature Items Row */}
        {featureItems.length > 0 && (
          <div className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {featureItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 border-r-0 lg:border-r border-gray-200 lg:pr-6 last:border-r-0"
              >
                <div className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#06264a] shrink-0 border border-gray-50">
                  <DynamicIcon name={item.icon} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[#06264a] font-bold text-sm mb-3">{item.title}</h3>
                  <div className="w-8 h-[2px] bg-[#f5b400] mb-3"></div>
                  <p className="text-gray-600 text-[13px] leading-relaxed text-justify">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Floating Stats Bar */}
        {statsItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative z-30 mt-12 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 lg:p-10"
          >
            <div className={`grid grid-cols-1 md:grid-cols-${statsItems.length} gap-10 divide-y md:divide-y-0 md:divide-x divide-gray-100`}>
              {statsItems.map((stat, i) => (
                <div key={i} className={`flex items-center gap-6 justify-center ${i > 0 ? 'pt-8 md:pt-0' : ''}`}>
                  <div className="h-16 w-16 rounded-2xl bg-[#f8fafc] text-[#06264a] flex items-center justify-center text-3xl shadow-sm border border-gray-50">
                    <DynamicIcon name={stat.icon || "TrendingUp"} className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-[#06264a]">{stat.number}</h4>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutHero;
