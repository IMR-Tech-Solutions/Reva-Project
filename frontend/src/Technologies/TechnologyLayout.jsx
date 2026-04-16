import { motion } from "framer-motion";
import Breadcrumb from "../Component/Breadcrumb";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

const TechnologyLayout = ({
  title,
  herotitle,
  herosub,
  paragraph1,
  paragraph2,
  img,
  keysubheading,
  features,
  stats = [], // Default to empty array
}) => {
  // Default stats if none provided
  const displayStats = stats && stats.length > 0 ? stats : [
    { value: "98%", label: "Operational Efficiency" },
    { value: "500+", label: "Successful Units" },
    { value: "100%", label: "Safety Record" }
  ];

  return (
    <div className="bg-background min-h-screen text-text ">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <Breadcrumb />
      </div>

      {/* HERO SECTION */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-background to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Meta row */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
           

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-gray-500">


              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* IMAGE SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                {/* “Technical frame” behind image */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border border-gray-200 rounded-xl bg-gradient-to-br from-gray-100 to-transparent" />
                <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-secondary rounded-xl bg-white" />

                <div className="relative z-10 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 h-[360px] md:h-[430px] lg:h-[460px] shadow-md">
                  <img
                    src={img?.startsWith('http') || img?.startsWith('data:') ? img : `${import.meta.env.VITE_API_URL}${img}`}
                    alt={herotitle}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle top overlay for text readability if needed later */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                </div>

                {/* Small “spec label” badge */}
                <div className="">
                  <div className="flex flex-col">
                    
                  </div>
                 
                  <div className="hidden sm:flex flex-col">
                   
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CONTENT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              {/* Sub badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-secondary" />
                <span className="text-secondary text-xs font-semibold uppercase tracking-[0.28em]">
                  {herosub}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-tight mb-4">
                {herotitle}
              </h1>

              {/* Thin underline bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-[2px] w-16 bg-secondary" />
                <div className="h-[2px] w-6 bg-secondary/40" />
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                {paragraph1}
              </p>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-7">
                {paragraph2}
              </p>

              {/* Statistics Section - 3 Compact Cards */}
              <div className="grid grid-cols-3 gap-3">
                {displayStats.slice(0, 3).map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center group hover:border-secondary transition-all duration-300"
                  >
                    <p className="text-xl sm:text-2xl font-black text-secondary mb-0.5 transform group-hover:scale-110 transition-transform">
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-primary/70 uppercase tracking-wider leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-8 md:py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-1.5 bg-gray-100 border border-gray-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-secondary text-[11px] font-semibold uppercase tracking-[0.3em]">
                Key Benefits
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-primary mb-4">
              Key Features & Advantages
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              {keysubheading}
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative rounded-xl border border-gray-200 bg-background hover:bg-white hover:border-secondary/60 transition-all duration-300 overflow-hidden"
              >
                {/* top border accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 p-5 flex gap-4 items-start">
                  {/* Number badge – now more technical */}
                  <div className="flex-shrink-0">
                    <div className="w-11 h-11 rounded-md border border-gray-300 bg-white flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary/10 transition-colors">
                      <span className="text-xs font-black text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* bottom line accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-secondary group-hover:w-full transition-all duration-400" />
              </motion.div>
            ))}
          </div>

          {/* CTA BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-16 relative rounded-2xl border border-primary/20 bg-primary text-white overflow-hidden"
          >
            {/* subtle pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-black mb-1">
                  Interested in this technology?
                </h3>
                <p className="text-sm text-gray-100/90">
                  Connect with our process engineers to evaluate fit, scope, and implementation options for your plant.
                </p>
              </div>

              <div className="flex gap-3 flex-shrink-0">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-secondary hover:bg-yellow-400 text-text font-bold text-sm rounded-lg transition-colors duration-200 shadow-md whitespace-nowrap"
                >
                  Get In Touch
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-white/25 transition-colors duration-200 whitespace-nowrap"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyLayout;
