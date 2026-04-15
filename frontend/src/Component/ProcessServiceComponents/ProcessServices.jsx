import { motion } from "framer-motion";
import {
  Search,
  BarChart3,
  FlaskConical,
  Rocket,
  Shield,
  FileCheck,
  Wrench,
  Layers,
  Settings,
  Zap,
  Target,
  ClipboardCheck,
} from "lucide-react";

// Icon mapping for dynamic icon resolution
const iconMap = {
  Search, BarChart3, FlaskConical, Rocket, Shield, FileCheck,
  Wrench, Layers, Settings, Zap, Target, ClipboardCheck,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ProcessServices = ({ section }) => {
  if (!section) return null;

  const items = section.items || [];

  return (
    <section className="py-8 md:py-12 bg-background border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-xl mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              {section.section_label || "What We Offer"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-4">
            {section.title || "Our"}{" "}
            {section.title_highlight && (
              <span className="text-secondary">{section.title_highlight}</span>
            )}
          </h2>

          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            {section.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon_name] || FlaskConical;
            return (
              <motion.div
                key={item.id || index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white border border-gray-200 rounded-xl p-8 hover:border-secondary hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

                {/* Step number badge */}
                <div className="absolute top-4 right-5 text-4xl font-black text-gray-50 group-hover:text-secondary/10 transition-colors duration-300 pointer-events-none select-none">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-secondary group-hover:border-secondary flex items-center justify-center mb-6 flex-shrink-0 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-700" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessServices;
