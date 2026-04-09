import { motion } from "framer-motion";
import Breadcrumb from "../Component/Breadcrumb";
import { 
  FiSettings, 
  FiTool, 
  FiShield, 
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiAward,
  FiUsers,
  FiClock,
  FiLayers,
  FiZap
} from "react-icons/fi";

const ManufacturingSiteServices = () => {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <Breadcrumb />
      </div>

      {/* Section 1: Hero with Image */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-2 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] md:h-[500px]">
                <img
                  src="/manage.jpg"
                  alt="Manufacturing & Site Services"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block px-3 py-1.5 bg-secondary/10 text-secondary uppercase tracking-widest text-xs font-bold rounded-full mb-5">
                Fabrication & Installation
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-primary mb-5 leading-tight">
                Manufacturing & Site Services
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                REVA Process Technologies offers comprehensive manufacturing and site services, delivering turnkey solutions from fabrication through installation and commissioning. Our state-of-the-art manufacturing facilities and experienced site teams ensure quality execution of complex industrial projects.
              </p>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                With in-house fabrication capabilities, certified welders, and skilled installation crews, we maintain complete control over quality, schedule, and safety throughout the manufacturing and site execution phases of your project.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Manufacturing Capabilities */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
              Manufacturing Capabilities
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Advanced fabrication facilities equipped with modern machinery and skilled workforce
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <FiSettings className="text-3xl" />,
                title: "Pressure Vessel Fabrication",
                description: "ASME-certified manufacturing of pressure vessels, columns, reactors, and heat exchangers with complete code compliance and documentation."
              },
              {
                icon: <FiPackage className="text-3xl" />,
                title: "Structural Steel Fabrication",
                description: "Heavy structural steel fabrication including platforms, pipe racks, equipment supports, and building frames with precision cutting and welding."
              },
              {
                icon: <FiLayers className="text-3xl" />,
                title: "Piping Prefabrication",
                description: "Shop fabrication of piping spools, assemblies, and modules with reduced field labor, improved quality, and faster installation schedules."
              },
              {
                icon: <FiTool className="text-3xl" />,
                title: "Mechanical Assembly",
                description: "Complete mechanical assembly and testing of process equipment, skid-mounted systems, and packaged units in controlled shop environment."
              },
              {
                icon: <FiZap className="text-3xl" />,
                title: "Advanced Welding",
                description: "Certified welders proficient in SMAW, GTAW, GMAW, and SAW processes for carbon steel, stainless steel, and exotic alloy materials."
              },
              {
                icon: <FiShield className="text-3xl" />,
                title: "Quality Control",
                description: "Comprehensive NDT testing, dimensional inspection, hydrostatic testing, and material verification ensuring code compliance and quality."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Site Services */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
              Comprehensive Site Services
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Complete on-site execution capabilities from installation through commissioning
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-5">
            {[
              {
                title: "Equipment Installation & Erection",
                description: "Professional rigging, lifting, positioning, and installation of process equipment including vessels, columns, heat exchangers, pumps, and rotating machinery. Complete foundation work, grouting, alignment, and anchor bolt installation ensuring proper equipment setting and long-term stability."
              },
              {
                title: "Piping Installation",
                description: "Field installation of process piping, utility lines, and interconnecting piping with proper support, alignment, and fit-up. Field welding, radiography, hydrostatic testing, and complete documentation ensuring code compliance and system integrity."
              },
              {
                title: "Structural Erection",
                description: "Installation of structural steel including pipe racks, platforms, stairways, equipment supports, and building frames. Complete anchor bolt installation, steel erection, field welding, bolting, and alignment verification ensuring structural integrity and safety."
              },
              {
                title: "Mechanical Completion",
                description: "Systematic completion of mechanical installation including torqueing of bolts, gasket installation, valve installation, instrumentation hookup, insulation, painting, and ensuring all mechanical systems are ready for pre-commissioning and start-up activities."
              },
              {
                title: "Pre-Commissioning & Commissioning",
                description: "Pre-commissioning activities including system flushing, leak testing, instrument calibration, motor rotation checks, and mechanical run tests. Commissioning support including start-up assistance, performance testing, troubleshooting, and operator training."
              },
              {
                title: "Maintenance & Turnaround Services",
                description: "Planned maintenance, preventive maintenance programs, emergency repair services, and plant turnaround support. Equipment inspection, overhaul, replacement of internals, and performance restoration ensuring optimal plant reliability and uptime."
              },
              {
                title: "Modification & Revamp Projects",
                description: "Brownfield modifications, capacity expansion projects, process improvements, and equipment upgrades. Design, engineering, fabrication, and installation of modifications with minimal disruption to ongoing plant operations."
              },
              {
                title: "Safety & Quality Management",
                description: "Comprehensive HSE programs, safety training, hazard analysis, permit to work systems, and incident prevention. Quality assurance plans, inspection and test plans, material traceability, and complete documentation ensuring safe, quality execution."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 items-start bg-white rounded-2xl p-5 sm:p-6 border-2 border-gray-200 hover:border-secondary/30 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <span className="text-secondary font-bold text-base">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Key Advantages */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
              Why Choose REVA
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Delivering excellence through integrated manufacturing and site services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <FiAward />,
                title: "Code Compliance",
                description: "ASME, API, ANSI, and international code compliant manufacturing with complete documentation and third-party inspection support."
              },
              {
                icon: <FiUsers />,
                title: "Skilled Workforce",
                description: "Certified welders, qualified riggers, experienced fabricators, and skilled craftsmen ensuring quality workmanship and safe execution."
              },
              {
                icon: <FiCheckCircle />,
                title: "Quality Assurance",
                description: "Comprehensive QA/QC programs, NDT testing, material traceability, and complete documentation ensuring compliance and reliability."
              },
              {
                icon: <FiClock />,
                title: "On-Time Delivery",
                description: "Effective planning, resource management, and execution control ensuring projects are completed on schedule without compromising quality."
              },
              {
                icon: <FiShield />,
                title: "Safety Excellence",
                description: "World-class HSE programs, safety training, hazard prevention, and zero-incident culture protecting personnel and assets."
              },
              {
                icon: <FiTruck />,
                title: "Turnkey Solutions",
                description: "Single-source responsibility from design through commissioning simplifying coordination and accelerating project delivery."
              }
            ].map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary text-2xl mb-4">
                  {advantage.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">
                  {advantage.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Equipment & Industries */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          

          {/* Industries Served */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Delivering manufacturing and site services across diverse industrial sectors
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
            {[
              "Oil & Gas",
              "Petrochemical",
              "Chemical Processing",
              "Pharmaceutical",
              "Power Generation",
              "Water Treatment",
              "Food & Beverage",
              "Mining & Minerals"
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-secondary/30 hover:bg-white transition-all duration-300 text-center"
              >
                <p className="text-sm font-semibold text-primary">
                  {industry}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-primary rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                Let's Build Your Project Together
              </h3>
              <p className="text-white/90 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                Experience the REVA difference with integrated manufacturing and site services. Contact us to discuss your fabrication and installation requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-all duration-300"
                >
                  Request Quote
                </a>
              
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ManufacturingSiteServices;
