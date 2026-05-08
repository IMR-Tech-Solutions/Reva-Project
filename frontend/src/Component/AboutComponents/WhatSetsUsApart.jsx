import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LuHardHat,
  LuClock,
  LuPencilRuler,
  LuFactory,
  LuUsers,
  LuLock,
  LuFileBadge,
  LuSettings,
  LuShield,
  LuZap,
  LuTarget,
  LuAward,
  LuLayers,
  LuWrench,
  LuGlobe,
  LuTrendingUp,
  LuHeart,
  LuCpu,
  LuChartBar,
} from 'react-icons/lu';
import aboutApi from '../../services/aboutApi';

// Icon map to dynamically render icons from their string names
const ICON_MAP = {
  LuHardHat,
  LuClock,
  LuPencilRuler,
  LuFactory,
  LuUsers,
  LuLock,
  LuFileBadge,
  LuSettings,
  LuShield,
  LuZap,
  LuTarget,
  LuAward,
  LuLayers,
  LuWrench,
  LuGlobe,
  LuTrendingUp,
  LuHeart,
  LuCpu,
  LuChartBar,
};

// Static fallback data (original content) used when API is unavailable
const FALLBACK_CONTENT = {
  label: "WHY CHOOSE REVA",
  heading: "What Sets Us Apart?",
  description:
    "At REVA Process Technologies, we stand out through engineering excellence, execution capabilities, industry expertise, and reliable process solutions tailored to evolving industrial requirements.",
};

const FALLBACK_FEATURES = [
  {
    title: "Superior Expertise",
    description:
      "We possess strong proficiency in Process Designing, Mechanical, Piping, Instrumentation, and Control Systems.Our team of experts is well-versed in these areas, enabling us to deliver exceptional results.",
    icon: "LuHardHat",
  },
  {
    title: "Timely Delivery & Quality",
    description:
      "We take pride in delivering projects that not only meet but exceed customer expectations within the agreed-upon time frame. Our commitment to world-class quality ensures that our clients receive the best possible outcomes.",
    icon: "LuClock",
  },
  {
    title: "Tailor-Made Solutions",
    description:
      "Our team comprises experienced engineers and consultants who work collaboratively to provide customized solutions that address the evolving needs of our clients. We understand that each project is unique, and our approach is always tailored accordingly.",
    icon: "LuPencilRuler",
  },
  {
    title: "Strong Infrastructure",
    description:
      "Our infrastructure supports process designing, manufacturing, project management, and plant maintenance activities.",
    icon: "LuFactory",
  },
  {
    title: "Expert Project Management",
    description:
      "Our project management team ensures smooth coordination, efficient execution, and timely completion.",
    icon: "LuUsers",
  },
  {
    title: "Advanced Network IT System",
    description:
      "We use a secured and advanced Network IT System for efficient operations and secure data handling.",
    icon: "LuLock",
  },
  {
    title: "Process License Acquisition",
    description:
      "REVA has acquired the Process License for Hydrogen Sulfide (H2S) Removal using ISET Technology developed by IISc Bangalore.",
    icon: "LuFileBadge",
  },
];

const WhatSetsUsApart = () => {
  const [content, setContent] = useState(FALLBACK_CONTENT);
  const [features, setFeatures] = useState(FALLBACK_FEATURES);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await aboutApi.getWhatSetsUsApart();
        if (data?.content) {
          setContent({
            label: data.content.label || FALLBACK_CONTENT.label,
            heading: data.content.heading || FALLBACK_CONTENT.heading,
            description: data.content.description || FALLBACK_CONTENT.description,
          });
        }
        if (data?.items && data.items.length > 0) {
          setFeatures(data.items);
        }
      } catch (error) {
        // Silently fall back to static content
        console.warn("Using fallback content for What Sets Us Apart section");
      }
    };
    fetchData();
  }, []);

  const renderIcon = (iconName) => {
    const IconComponent = ICON_MAP[iconName] || LuHardHat;
    return <IconComponent className="w-10 h-10 text-[#06264a]" />;
  };

  return (
    <section className="py-8 md:py-12 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

        {/* Header Section */}
        <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-12 h-[1px] bg-[#f5b400]" />
            <span className="text-sm font-bold tracking-[0.2em] text-[#f5b400] uppercase">
              {content.label}
            </span>
            <div className="w-12 h-[1px] bg-[#f5b400]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#06264a] mb-4">
            {content.heading}
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed font-medium text-justify">
            {content.description}
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {features.map((feature, index) => {
            const isLast = index === features.length - 1;
            const isSingleInLastRow = features.length % 3 === 1 && isLast;
            
            return (
              <motion.div
                key={feature.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start gap-6 p-6 md:p-8 
                  ${(index % 3 !== 2 && !isSingleInLastRow) ? 'lg:border-r border-gray-100' : ''} 
                  ${(index % 2 !== 1) ? 'md:border-r lg:md:border-none' : ''}
                  ${(index < features.length - (features.length % 3 || 3)) ? 'border-b border-gray-100' : ''}
                  ${isSingleInLastRow ? 'lg:col-start-2 border-t lg:border-t-0' : ''}
                  transition-all duration-300 hover:bg-gray-50/30
                `}
              >
                {/* Icon Column */}
                <div className="flex-shrink-0 pt-1">
                  {renderIcon(feature.icon)}
                </div>

                {/* Content Column */}
                <div className="flex flex-col">
                  <span className="text-[#f5b400] font-black text-xl mb-2">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <h3 className="text-xl font-bold text-[#06264a] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium text-justify">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhatSetsUsApart;
