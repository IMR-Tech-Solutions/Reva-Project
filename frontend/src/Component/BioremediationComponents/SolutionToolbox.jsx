import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Waves,
  Sprout,
  Droplets,
  Filter,
  Settings,
  Layers,
  CircleDot,
  ShieldCheck,
  Network,
} from "lucide-react";

const SolutionToolbox = ({ data }) => {
  const c = data?.content || {};
  const apiNature = data?.nature_options;
  const apiEngineered = data?.engineered_options;
  
  const iconMap = { Leaf, Waves, Sprout, Droplets, Filter, Settings, Layers, CircleDot, Network };
  
  const natureOptions = apiNature?.length ? apiNature.map(n => ({
    icon: iconMap[n.icon_name] || Sprout,
    text: n.title
  })) : [
    { icon: Sprout, text: "Constructed wetlands" },
    { icon: Waves, text: "Free-water surface systems" },
    { icon: Droplets, text: "Subsurface flow systems" },
    { icon: CircleDot, text: "Bio-reactive barriers" },
    { icon: Filter, text: "Bio-filters" },
    { icon: Leaf, text: "Biopolishing stages" },
  ];

  const engineeredOptions = apiEngineered?.length ? apiEngineered.map(e => ({
    icon: iconMap[e.icon_name] || Layers,
    text: e.title
  })) : [
    { icon: Layers, text: "Clarification / Lamella" },
    { icon: CircleDot, text: "DAF / Flotation" },
    { icon: Filter, text: "Activated Carbon polishing" },
    { icon: Settings, text: "Selective oxidation steps" },
    { icon: Network, text: "Hybrid treatment trains" },
  ];

  return (
    <section className="relative py-8 md:py-10 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[360px] h-[360px] bg-secondary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-green-100/50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="container relative z-10 mx-auto px-4 md:px-10 lg:px-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-4xl mx-auto mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-12 h-[2px] bg-secondary rounded-full" />
            <Leaf className="w-5 h-5 text-secondary" />
            <span className="w-12 h-[2px] bg-secondary rounded-full" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight mb-2">
            {c.toolbox_heading || "Solution"} <span className="text-secondary">{c.toolbox_heading_highlight || "Toolbox"}</span>
          </h2>

          <div className="w-24 h-[5px] bg-secondary rounded-full mx-auto mb-3" />

          <p className="text-gray-600 text-base md:text-lg leading-relaxed text-justify max-w-2xl mx-auto">
            {c.toolbox_subtitle || "A practical mix of nature-based and engineered treatment options selected according to site chemistry, performance targets and project needs."}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <ToolboxCard
            title="Nature-Based / Biogeochemical Options"
            icon={Leaf}
            items={natureOptions}
            theme="green"
          />

          <ToolboxCard
            title="Engineered Unit Processes"
            icon={Settings}
            items={engineeredOptions}
            theme="navy"
          />
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-6 flex items-center justify-center gap-4 text-center"
        >
          <span className="hidden md:block w-32 h-[1px] bg-secondary" />
          <div className="w-11 h-11 rounded-full border border-secondary/40 bg-secondary/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-primary font-semibold">
            {c.toolbox_bottom_note || "Right combination. Right performance. Sustainable results."}
          </p>
          <span className="hidden md:block w-32 h-[1px] bg-secondary" />
        </motion.div>
      </div>
    </section>
  );
};

const ToolboxCard = ({ title, icon: Icon, items, theme }) => {
  const isGreen = theme === "green";

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={`rounded-3xl border shadow-sm p-5 md:p-6 ${
        isGreen
          ? "bg-green-50/70 border-green-200"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
            isGreen ? "bg-green-100" : "bg-primary/10"
          }`}
        >
          <Icon
            className={`w-7 h-7 ${
              isGreen ? "text-green-700" : "text-primary"
            }`}
          />
        </div>

        <div className="pt-1">
          <h3
            className={`text-xl md:text-2xl font-black leading-tight ${
              isGreen ? "text-green-700" : "text-primary"
            }`}
          >
            {title}
          </h3>
          <div
            className={`mt-2 h-[2px] w-full rounded-full ${
              isGreen ? "bg-green-600" : "bg-primary"
            }`}
          />
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 border-b border-gray-200/80 last:border-b-0 pb-3 last:pb-0"
          >
            <div
              className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${
                isGreen
                  ? "border-green-600 bg-white text-green-700"
                  : "border-primary bg-white text-primary"
              }`}
            >
              <item.icon className="w-4 h-4" />
            </div>

            <p className="text-gray-800 text-sm md:text-base font-medium">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SolutionToolbox;