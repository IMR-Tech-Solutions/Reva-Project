import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Activity,
  ClipboardCheck,
  Settings2,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";

const WhatClientsReceive = () => {
  const deliverables = [
    {
      title: "Concept note / process selection memo",
      content: "(options, risks, pros/cons)",
      icon: FileText,
    },
    {
      title: "Treatability / pilot plan and results interpretation",
      content: "(if required)",
      icon: FlaskConical,
    },
    {
      title: "Process package",
      content: "Basis of Design, BFD/PFD/P&ID, equipment list, datasheets",
      icon: Settings2,
    },
    {
      title: "Execution plan and commissioning & handover plan",
      content: "",
      icon: ClipboardCheck,
    },
    {
      title: "Performance monitoring framework",
      content: "(KPIs, sampling plan, optimization roadmap)",
      icon: Activity,
    },
  ];

  return (
    <section className="relative py-8 md:py-12 bg-white overflow-hidden border-t border-gray-100">
      <div className="container relative z-10 mx-auto px-4 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[2px] bg-secondary" />
              <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.3em]">
                Deliverables
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-primary leading-tight">
              What Clients <span className="text-secondary">Receive</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-slate-400"
          >
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest">ISO Certified Quality</span>
          </motion.div>
        </div>

        <div className="relative max-w-5xl">
          {/* Vertical Technical Line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[1px] bg-slate-100" />

          <div className="space-y-6 md:space-y-8">
            {deliverables.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative flex items-start gap-6 md:gap-10 pl-1 md:pl-2"
              >
                {/* Indicator */}
                <div className="relative z-10 flex flex-col items-center pt-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary/5 transition-all duration-300">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-secondary opacity-0 group-hover:opacity-100 transition-all" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-4 md:pb-6 border-b border-slate-50 last:border-b-0">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                    <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    {item.content && (
                      <span className="text-gray-500 text-sm md:text-base font-medium italic">
                        {item.content}
                      </span>
                    )}
                  </div>
                </div>

                {/* Index Number (Opaque) */}
                <span className="hidden md:block absolute right-0 top-0 text-4xl font-black text-slate-50 group-hover:text-slate-100/50 transition-colors pointer-events-none">
                  0{idx + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatClientsReceive;

