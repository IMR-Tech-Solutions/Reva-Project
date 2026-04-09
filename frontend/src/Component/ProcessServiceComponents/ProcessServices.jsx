import { motion } from "framer-motion";
import {
  Search,
  BarChart3,
  FlaskConical,
  Rocket,
  Shield,
  FileCheck,
} from "lucide-react";

const services = [
  {
    title: "Technical Feasibility Assessment",
    description:
      "Rigorous evaluation of process chemistry, technology options, and engineering requirements to confirm technical viability before committing to full-scale investment.",
    Icon: Search,
  },
  {
    title: "Economic Viability Analysis",
    description:
      "Detailed assessment of CAPEX, OPEX, market demand, and return on investment to provide decision-makers with a clear view of financial risks and returns.",
    Icon: BarChart3,
  },
  {
    title: "Pilot Plant Design & Engineering",
    description:
      "Engineering of pilot facilities that replicate real-world process conditions — enabling testing of new processes, optimization of operating parameters, and identification of bottlenecks in a controlled environment.",
    Icon: FlaskConical,
  },
  {
    title: "Scale-Up & Technology Transfer",
    description:
      "Structured transition from pilot scale to commercial-scale units, minimizing scale-up risk and ensuring smoother start-up of full-scale plants aligned with performance guarantees.",
    Icon: Rocket,
  },
  {
    title: "Environmental Impact & Regulatory Compliance",
    description:
      "Evaluation of environmental impact, HSE implications, and regulatory requirements to ensure proposed plants meet applicable standards and approvals from the outset.",
    Icon: Shield,
  },
  {
    title: "Feasibility Report & Decision Support",
    description:
      "Comprehensive feasibility reports covering technical, economic, environmental, and strategic findings — giving stakeholders the clarity needed for informed go/no-go decisions.",
    Icon: FileCheck,
  },
];

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

const ProcessServices = () => {
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
              What We Offer
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-4">
            Feasibility &amp; Pilot Plant{" "}
            <span className="text-secondary">Services</span>
          </h2>

          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            From concept validation to pilot-scale execution — Reva provides the
            technical and economic intelligence needed to{" "}
            <span className="font-semibold text-gray-800">
              de-risk your investment
            </span>{" "}
            before committing to full-scale plant development.
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
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-secondary shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-primary group-hover:bg-secondary flex items-center justify-center mb-6 flex-shrink-0 transition-colors duration-300">
                <service.Icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-secondary group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessServices;
