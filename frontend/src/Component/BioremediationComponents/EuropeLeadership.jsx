import React from "react";
import { motion } from "framer-motion";

const EuropeLeadership = ({ data }) => {
  const c = data?.content || {};
  const apiFocus = data?.focus_areas;
  const apiChips = data?.info_chips;
  
  const focusAreas = apiFocus?.length ? apiFocus.map(f => ({
    no: f.number,
    title: f.title,
    desc: f.description
  })) : [
    {
      no: "01",
      title: "Europe Business Development",
      desc: "Partner mapping, client engagement, and reference project pipeline.",
    },
    {
      no: "02",
      title: "Single Point of Contact for Europe",
      desc: "All leads/inquiries are routed via Dr. Khan; he leads the project development and execution interface.",
    },
    {
      no: "03",
      title: "Bioremediation Vertical",
      desc: "Nature-based + hybrid solutions for complex sites and effluents.",
    },
    {
      no: "04",
      title: "Environmental & Process Technologies",
      desc: "Industrial wastewater/ZLD, biogas upgrading, used-oil re-refining.",
    },
    {
      no: "05",
      title: "Scientific Depth + Operational Leadership",
      desc: "15+ years + operational leadership and cross-border execution mindset.",
    },
  ];

  const infoChips = apiChips?.length ? apiChips.map(ch => ch.text) : [
    "Germany-Based",
    "15+ Years Experience",
    "Europe Project Leadership"
  ];

  const API_BASE = import.meta.env.VITE_API_URL;

  return (
    <section className="relative py-10 md:py-14 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5"
          >
            <div className="rounded-[2rem] overflow-hidden border border-secondary/50 shadow-xl bg-white">
              <img
                src={c.europe_profile_image ? (c.europe_profile_image.startsWith('http') ? c.europe_profile_image : `${API_BASE}${c.europe_profile_image}`) : "/bioremediation/drirfan khan.jpeg"}
                alt={c.europe_main_heading || "Dr. Irfan Khan"}
                className="w-full h-[420px] md:h-[500px] object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000";
                }}
              />

              <div className="p-6 md:p-7 text-center">
                <h3 className="text-primary text-lg md:text-xl font-black uppercase tracking-wide">
                  {c.europe_designation_badge || "European Strategic Partner"}
                </h3>

                <div className="w-16 h-[2px] bg-secondary mx-auto my-4" />

                <div className="grid grid-cols-3 divide-x divide-secondary/40">
                  {infoChips.map((chip, idx) => (
                    <div key={idx} className="px-2">
                      <p className="text-primary text-[11px] md:text-xs font-semibold uppercase tracking-tight">
                        {chip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[3px] bg-secondary rounded-full" />
              <p className="text-secondary text-xs md:text-sm font-bold uppercase tracking-[0.22em]">
                {c.europe_section_label || "Europe Business Development & Project Leadership"}
              </p>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-primary leading-tight mb-4">
              {c.europe_main_heading || "Dr. Irfan Khan"}
            </h2>

            <div className="w-16 h-[3px] bg-secondary rounded-full mb-5" />

            <h3 className="text-lg md:text-xl font-bold text-primary mb-7">
              {c.europe_subheading || "European Strategic Partner | Reva Process Technologies"}
            </h3>

            <div className="space-y-6 text-justify">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {c.europe_paragraph1 || "Dr. Khan supports Reva’s expansion into Europe as European Strategic Partner, focusing on Business Development in Europe and on R&D and Market Development for environmental & process technologies. Together with Reva’s leadership, he is establishing a dedicated Bioremediation vertical focusing on nature-based and advanced biogeochemical treatment solutions such as constructed wetlands, biological polishing stages, and remediation concepts for complex industrial sites and effluents."}
              </p>

              {c.europe_paragraph2 && (
                <>
                  <div className="w-full h-px bg-secondary/40" />
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {c.europe_paragraph2}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Key Focus Areas */}
        <div className="mt-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="hidden md:block w-28 h-px bg-secondary/60" />
            <h3 className="text-primary text-xl md:text-2xl font-black uppercase tracking-wide text-center">
              Key Focus Areas <span className="text-secondary">(Summary)</span>
            </h3>
            <span className="hidden md:block w-28 h-px bg-secondary/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {focusAreas.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-gray-100 bg-white p-4 md:p-5 text-center shadow-sm hover:shadow-lg hover:border-secondary/40 transition-all duration-300"
              >
                <p className="text-2xl font-black text-secondary mb-1">
                  {item.no}
                </p>

                <div className="w-8 h-[2px] bg-secondary/30 mx-auto mb-4" />

                <h4 className="text-primary text-[13px] md:text-sm font-black leading-tight mb-3 min-h-[35px] flex items-center justify-center">
                  {item.title}
                </h4>

                <p className="text-gray-500 text-[10px] md:text-[11px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EuropeLeadership;