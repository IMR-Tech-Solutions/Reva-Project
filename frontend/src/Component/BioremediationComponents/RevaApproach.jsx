import React from "react";
import { motion } from "framer-motion";
import { SearchCheck, Microscope, Settings, ShieldCheck, Leaf, Target } from "lucide-react";

const RevaApproach = ({ data }) => {
  const c = data?.content || {};
  const apiSteps = data?.approach_steps;
  const apiHighlights = data?.approach_highlights;
  
  const iconMap = { SearchCheck, Microscope, Settings, ShieldCheck, Leaf, Target };
  
  const steps = apiSteps?.length ? apiSteps.map(s => ({
    number: s.number,
    icon: iconMap[s.icon_name] || SearchCheck,
    title: s.title,
    desc: s.description,
    image: s.image
  })) : [
    {
      number: "01",
      icon: SearchCheck,
      title: "Diagnose & Define",
      desc: "We assess site chemistry, variability, risks, and regulatory context to define clear, measurable performance targets for discharge or reuse.",
      image: "/bioremediation/define.png",
    },
    {
      number: "02",
      icon: Microscope,
      title: "Validate (As Needed)",
      desc: "We conduct treatability testing or pilots to confirm stability, kinetics, and by-products—de-risking performance before full-scale implementation.",
      image: "/bioremediation/validate.png",
    },
    {
      number: "03",
      icon: Settings,
      title: "Deliver",
      desc: "We deliver integrated hybrid solutions with EPC/EPCM execution, commissioning, and ongoing performance monitoring to ensure long-term reliability and compliance.",
      image: "/bioremediation/deliver.png",
    },
  ];

  const highlights = apiHighlights?.length ? apiHighlights.map(h => ({
    icon: iconMap[h.icon_name] || ShieldCheck,
    title: h.title,
    sub: h.description
  })) : [
    { icon: ShieldCheck, title: "Science-Led Decisions", sub: "Data-driven at every step" },
    { icon: Leaf, title: "Sustainable Outcomes", sub: "Nature-based. Future-ready." },
    { icon: Target, title: "Performance Assured", sub: "Measured. Monitored. Delivered." }
  ];

  const API_BASE = import.meta.env.VITE_API_URL;

  return (
    <section className="relative py-8 md:py-12 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 md:px-10 lg:px-16">
        {/* Heading Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-secondary" />
              <span className="text-secondary text-[11px] font-bold uppercase tracking-[0.2em]">
                {c.approach_section_label || "Our Approach"}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-2">
              <span className="text-primary">{c.approach_heading1 || "REVA"}</span>{" "}
              <span className="text-secondary uppercase">{c.approach_heading2 || "Approach"}</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium mb-4">
              {c.approach_subtitle || "Simple Project Logic"}
            </p>
            <div className="flex items-center">
              <Leaf className="w-6 h-6 text-secondary/60 rotate-45" />
            </div>
          </div>

          <div className="lg:max-w-sm lg:border-l border-gray-100 lg:pl-10">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium text-justify">
              {c.approach_side_description || "A science-led, results-driven process designed to deliver reliable, sustainable outcomes at every stage."}
            </p>
          </div>
        </div>

        {/* Timeline / Steps Section */}
        <div className="relative max-w-6xl mx-auto pl-4 md:pl-12">
          {/* Vertical Connecting Line */}
          <div className="absolute left-0 md:left-2 top-10 bottom-10 w-[1px] bg-gray-100 hidden md:block">
            {steps.map((_, idx) => (
              <div 
                key={idx}
                className="absolute w-2 h-2 rounded-full bg-white border border-primary -left-[3.5px]"
                style={{ top: `${(idx * 100) / (steps.length - 1)}%` }}
              />
            ))}
          </div>

          <div className="space-y-6 md:space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-center group"
              >
                {/* Step Card (Capsule Shape) */}
                <div className="flex-1 bg-white rounded-full border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden flex min-h-[110px] md:min-h-[130px]">
                  
                  {/* Left Colored Section with Number & Icon */}
                  <div className={`relative w-28 md:w-44 flex items-center justify-start pl-4 md:pl-8 shrink-0 ${index === 1 ? 'bg-secondary' : 'bg-primary'}`}>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-md border border-gray-50 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-300">
                      <step.icon className={`w-6 h-6 md:w-8 md:h-8 ${index === 1 ? 'text-secondary' : 'text-primary'}`} />
                    </div>
                    <span className="text-xl md:text-3xl font-black text-white/90 ml-3 md:ml-6">
                      {step.number}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 px-5 md:px-10 py-4 md:py-6 flex flex-col justify-center">
                    <h3 className="text-lg md:text-2xl font-black text-primary leading-tight mb-1 md:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-[12px] md:text-[15px] leading-relaxed max-w-xl">
                      {apiSteps?.length ? step.desc : step.desc.split(/(clear, measurable performance targets|de-risking performance|long-term reliability and compliance)/).map((part, i) => 
                        /(clear, measurable performance targets|de-risking performance|long-term reliability and compliance)/.test(part) ? 
                        <strong key={i} className="text-gray-800 font-bold">{part}</strong> : part
                      )}
                    </p>
                  </div>

                  {/* Right Image Area */}
                  <div className="hidden lg:block w-[30%] relative overflow-hidden">
                    <img
                      src={step.image ? (step.image.startsWith('http') ? step.image : `${API_BASE}${step.image}`) : ""}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Bottom Highlights Bar */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="rounded-full border border-secondary/20 bg-white shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4 md:px-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                    <item.icon className="w-5 h-5 text-secondary group-hover:text-white transition-colors" />
                  </div>
                  <div className="md:border-r border-gray-100 last:border-0 md:pr-10">
                    <h4 className="text-primary font-bold text-sm md:text-base leading-tight">{item.title}</h4>
                    <p className="text-gray-400 text-xs md:text-[13px]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevaApproach;