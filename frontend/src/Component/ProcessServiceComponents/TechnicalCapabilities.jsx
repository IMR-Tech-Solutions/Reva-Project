import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const CapabilityColumn = ({ title, icon, items }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative"
  >
    <div className="mb-8">
      <div className="w-16 h-16 border-2 border-primary rounded-xl flex items-center justify-center mb-6 mx-auto">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-primary mb-3 text-center">{title}</h3>
      <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
    </div>

    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-3"
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl group hover:border-secondary hover:bg-white hover:shadow-lg transition-all duration-300 relative overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          
          <div className="w-2.5 h-2.5 bg-secondary rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
          
          <span className="text-sm font-bold text-gray-700 group-hover:text-secondary transition-colors duration-300">
            {typeof item === "string" ? item : item.title}
          </span>
          
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-700" />
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
);

const TechnicalCapabilities = ({ section }) => {
  if (!section) return null;

  const items = section.items || [];
  const extraData = section.extra_data || {};

  // Group items by column from extra_data
  const columns = {};
  const columnTitles = {};
  
  items.forEach((item) => {
    const col = item.extra_data?.column || "default";
    const colTitle = item.extra_data?.column_title || col;
    if (!columns[col]) {
      columns[col] = [];
      columnTitles[col] = colTitle;
    }
    columns[col].push(item);
  });

  const columnKeys = Object.keys(columns);

  // Icon mapping for columns
  const columnIcons = {
    studyScope: <span className="text-2xl">📋</span>,
    pilotPlant: <span className="text-2xl">🔬</span>,
    expertise: <FiCheckCircle className="w-8 h-8 text-secondary" />,
  };

  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-secondary text-sm font-bold uppercase tracking-[0.3em]">
              {section.section_label || "Our Capabilities"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-4">
            {section.title || "What We"}{" "}
            {section.title_highlight && (
              <span className="text-secondary">{section.title_highlight}</span>
            )}
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            {section.description}
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className={`grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-${Math.min(columnKeys.length, 3)}`}>
          {columnKeys.map((key) => (
            <CapabilityColumn
              key={key}
              title={columnTitles[key]}
              icon={columnIcons[key] || <FiCheckCircle className="w-8 h-8 text-secondary" />}
              items={columns[key]}
            />
          ))}
        </div>

        {/* Summary Note */}
        {extraData.summary_title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 p-6 lg:p-8 bg-gray-50 border-l-4 border-secondary rounded-2xl"
          >
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                  {extraData.summary_title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {extraData.summary_description}
                </p>
              </div>
              {extraData.summary_tags && (
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {extraData.summary_tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-white border-2 border-primary/20 text-primary text-xs font-semibold rounded-full hover:border-secondary hover:text-secondary transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default TechnicalCapabilities;
