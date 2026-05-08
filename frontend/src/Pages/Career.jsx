

// export default Career;
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FiMail, FiPhone, FiMapPin, FiUpload, FiUser,
  FiBriefcase, FiClock, FiTrendingUp, FiCheck, FiChevronDown,
} from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Breadcrumb from "../Component/Breadcrumb";
import api, { API_BASE_URL } from "../api/api";
import { getContactSettings } from "../services/contactApi";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const Career = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [careerLoading, setCareerLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", position: "", experience: "", resume: null,
  });
  const [fileName, setFileName] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [contactSettings, setContactSettings] = useState(null);
  const [careerContent, setCareerContent] = useState(null);

    const [isNotRobot, setIsNotRobot] = useState(false);
    const recaptchaRef = useRef(null);
    const [captchaVerified, setCaptchaVerified] = useState(false);
  // Fetch career data from backend
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await api.getPositions();
        setPositions(data);
        if (data.length === 0) {
          toast.info("No positions currently available");
        }
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };
    const fetchSettings = async () => {
      try {
        const settings = await getContactSettings();
        setContactSettings(settings);
      } catch (error) {
        console.error("Error fetching contact settings:", error);
      }
    };
    const fetchCareerContent = async () => {
      try {
        setCareerLoading(true);
        const content = await api.getCareerContent();
        setCareerContent(content);
      } catch (error) {
        console.error("Error fetching career content:", error);
      } finally {
        setCareerLoading(false);
        setLoading(false);
      }
    };
    fetchPositions();
    fetchSettings();
    fetchCareerContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.position || !formData.experience) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const applicationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        resume: formData.resume, // Pass the actual file object
      };

      await api.submitApplication(applicationData);
      
      // Success notification
      toast.success("Thank you for applying! We'll review your application soon.", {
        duration: 4000,
        position: "top-center",
      });

      // Reset form
      setFormData({
        name: "", email: "", phone: "", position: "", experience: "", resume: null,
      });
      setFileName("");

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Application submission failed:", error);
      const errorMessage = error.message || "Failed to submit application. Please try again.";
      toast.error(errorMessage, {
        duration: 4000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplyClick = (jobTitle) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    document.getElementById("application-form").scrollIntoView({
      behavior: "smooth", block: "start",
    });
  };

  return (
    <div className="bg-white">

      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-200">
        <Breadcrumb />
      </div>

      {/* ── HERO ── */}
      <section className="py-12 sm:py-6 md:py-8 bg-white border-b border-gray-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:pr-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20
                              text-secondary font-semibold text-xs sm:text-sm uppercase
                              tracking-wider rounded-lg mb-5 sm:mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {careerContent?.hero_subtitle || "Careers at REVA"}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black
                             text-primary tracking-tight mb-4 sm:mb-5 leading-tight">
                {careerContent?.hero_title?.split(" in ")[0] || "Build Your Career in"}
                <span className="block mt-2 text-secondary">
                  {careerContent?.hero_title?.split(" in ")[1] || "Process Engineering"}
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-lg lg:max-w-xl
                            mb-6 sm:mb-8 leading-relaxed font-medium text-justify">
                {careerContent?.hero_description || "Work on mission-critical refinery projects with a team that treats process engineering like precision manufacturing."}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <motion.button
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    document.getElementById("openings-section")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3
                             bg-secondary text-white font-bold text-sm sm:text-base
                             rounded-lg shadow-md hover:shadow-lg hover:bg-secondary/95
                             border border-secondary/20 transition-all duration-300"
                >
                  View Open Positions
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.button>
                <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium">
                  On-site · EPCCM · Industrial
                </span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                {(careerContent?.specs?.length > 0 ? careerContent.specs : [
                  { label: "Domains", value: "Refinery · Petrochem" },
                  { label: "Projects", value: "EPCCM · BEP" },
                  { label: "Locations", value: "Pune · Mumbai" },
                ]).map((spec, i) => (
                  <div key={i}
                       className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-gray-500 uppercase tracking-wide text-[10px] mb-1">
                      {spec.label}
                    </p>
                    <p className="font-semibold text-primary">{spec.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-tr
                              from-primary/10 to-white/50 rounded-xl opacity-60
                              blur-sm lg:blur-md" />
              <div className="relative rounded-xl lg:rounded-2xl overflow-hidden
                              border border-gray-200/50 shadow-xl hover:shadow-2xl
                              transition-all duration-500 bg-white">
                <div className="aspect-[4/3] sm:aspect-square w-full">
                  <img
                    src={careerContent?.hero_image?.startsWith("/api") ? `${API_BASE_URL}${careerContent.hero_image}` : (careerContent?.hero_image || "/hero2.png")}
                    alt="Process engineering at refinery site"
                    className="w-full h-full object-cover hover:scale-[1.02]
                               transition-transform duration-700"
                    loading="eager"
                  />
                </div>
                <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/70
                                backdrop-blur-sm border border-white/30 rounded-md
                                text-xs uppercase tracking-wider text-gray-100 font-medium">
                  Process Plant
                </div>
                <div className="absolute bottom-0 left-0 right-0
                                bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center
                                  justify-between gap-3 text-xs">
                    <div>
                      <p className="text-gray-400 uppercase tracking-wider mb-1">Scale</p>
                      <p className="text-white font-semibold">Multi-unit Systems</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-gray-400 uppercase tracking-wider mb-1">Focus</p>
                      <p className="text-white font-semibold">Process Eng.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section id="openings-section"
               className="py-8 md:py-12 bg-gradient-to-b from-gray-100 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white
                            border border-gray-200 text-secondary font-semibold
                            text-[11px] tracking-[0.18em] uppercase rounded-md shadow-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Current Openings
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-3">
              Open <span className="text-secondary">Positions</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
              Explore core process engineering roles across BEP, DEP, and EPCCM
              projects in refinery, petrochemical, and waste-treatment domains.
            </p>
          </motion.div>

          {/* Job Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-secondary animate-spin" />
                  </div>
                  <p className="text-gray-600 font-medium">Loading positions...</p>
                </div>
              </div>
            ) : positions.length === 0 ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="text-center bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <FiBriefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No positions available at the moment</p>
                  <p className="text-sm text-gray-500 mt-1">Please check back later for opportunities</p>
                </div>
              </div>
            ) : (
              positions.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-full flex flex-col rounded-2xl border border-gray-200
                             bg-white hover:border-secondary/70 transition-all duration-300
                             overflow-hidden shadow-sm hover:shadow-xl"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1
                                  bg-gradient-to-r from-primary via-secondary to-primary" />

                  {/* Header */}
                  <div className="p-6 pb-5 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200
                                      flex items-center justify-center
                                      group-hover:border-secondary group-hover:bg-secondary/10
                                      transition-colors">
                        <FiBriefcase className="text-lg text-secondary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-primary leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.16em]">
                          {job.department}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary text-white text-[11px]
                                     font-semibold rounded-lg uppercase tracking-[0.16em]
                                     shadow-sm shrink-0">
                      {job.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="px-6 py-3 border-y border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white border border-gray-200
                                        flex items-center justify-center">
                          <HiOutlineLocationMarker className="text-secondary text-sm" />
                        </div>
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white border border-gray-200
                                        flex items-center justify-center">
                          <FiClock className="text-secondary text-sm" />
                        </div>
                        <span className="font-medium">{job.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-6 pt-4 pb-3 flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                      {job.description}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="px-6 pb-4">
                    <p className="text-[10px] font-bold text-gray-500 uppercase
                                   tracking-[0.2em] mb-2">
                      Key Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx}
                              className="px-2.5 py-1 bg-gray-100 text-[11px] text-primary
                                         font-semibold rounded-lg border border-gray-200">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-2.5 py-1 bg-secondary/10 text-[11px] text-secondary
                                         font-semibold rounded-lg border border-secondary/40">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-6 pt-3 pb-5 border-t border-gray-100 bg-gray-50">
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          setSelectedJob(selectedJob?.id === job.id ? null : job)
                        }
                        className="flex-1 py-2.5 px-3 border border-gray-200 text-primary
                                   font-bold text-xs rounded-xl hover:border-secondary
                                   hover:text-secondary hover:bg-secondary/5 transition-all"
                      >
                        {selectedJob?.id === job.id ? "Hide Details" : "View Details"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleApplyClick(job.title)}
                        className="flex-1 py-2.5 px-3 bg-secondary text-white font-bold
                                   text-xs rounded-xl hover:bg-secondary/90
                                   shadow-md shadow-secondary/30 transition-all"
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </div>

                  {/* ── Expanded Details — fixed, scoped per card ── */}
                  <AnimatePresence initial={false}>
                    {selectedJob?.id === job.id && (
                      <motion.div
                        key={`detail-${job.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-4 border-t border-gray-100 bg-white">
                          <h4 className="text-xs font-black text-primary mb-3
                                         uppercase tracking-[0.18em]">
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-2.5">
                            {job.responsibilities.map((resp, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.06 }}
                                className="flex items-start gap-2 text-xs text-gray-600"
                              >
                                <div className="mt-0.5 w-4 h-4 rounded-full
                                                border border-secondary/70
                                                flex items-center justify-center flex-shrink-0">
                                  <FiCheck className="text-secondary text-[9px]" />
                                </div>
                                <span className="leading-relaxed">{resp}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </motion.div>
            )))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM + MAP ── */}
      <section id="application-form" className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl
                              border-2 border-gray-200 p-8 sm:p-10 shadow-xl">
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary
                                   font-bold text-xs uppercase tracking-wider rounded-lg mb-4">
                    Application Form
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-primary mb-3">
                    Apply <span className="text-secondary">Now</span>
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Fill out the form below and we'll get back to you soon
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3
                                      uppercase tracking-wider">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2
                                          transition-colors duration-300
                                          ${focusedInput === "name" ? "text-secondary" : "text-gray-400"}`} />
                      <input type="text" name="name" value={formData.name}
                             onChange={handleChange}
                             onFocus={() => setFocusedInput("name")}
                             onBlur={() => setFocusedInput(null)}
                             required placeholder="Enter your full name"
                             className="w-full pl-12 pr-4 py-4 border-2 border-gray-200
                                        rounded-xl focus:border-secondary focus:outline-none
                                        focus:ring-4 focus:ring-secondary/10
                                        transition-all duration-300 bg-white" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3
                                      uppercase tracking-wider">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2
                                          transition-colors duration-300
                                          ${focusedInput === "email" ? "text-secondary" : "text-gray-400"}`} />
                      <input type="email" name="email" value={formData.email}
                             onChange={handleChange}
                             onFocus={() => setFocusedInput("email")}
                             onBlur={() => setFocusedInput(null)}
                             required placeholder="your.email@example.com"
                             className="w-full pl-12 pr-4 py-4 border-2 border-gray-200
                                        rounded-xl focus:border-secondary focus:outline-none
                                        focus:ring-4 focus:ring-secondary/10
                                        transition-all duration-300 bg-white" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3
                                      uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <FiPhone className={`absolute left-4 top-1/2 -translate-y-1/2
                                           transition-colors duration-300
                                           ${focusedInput === "phone" ? "text-secondary" : "text-gray-400"}`} />
                      <input type="tel" name="phone" value={formData.phone}
                             onChange={handleChange}
                             onFocus={() => setFocusedInput("phone")}
                             onBlur={() => setFocusedInput(null)}
                             required placeholder="+91 98765 43210"
                             className="w-full pl-12 pr-4 py-4 border-2 border-gray-200
                                        rounded-xl focus:border-secondary focus:outline-none
                                        focus:ring-4 focus:ring-secondary/10
                                        transition-all duration-300 bg-white" />
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3
                                      uppercase tracking-wider">
                      Position Applied For *
                    </label>
                    <div className="relative">
                      <FiBriefcase className={`absolute left-4 top-1/2 -translate-y-1/2
                                               transition-colors duration-300
                                               ${focusedInput === "position" ? "text-secondary" : "text-gray-400"}`} />
                      <input type="text" name="position" value={formData.position}
                             onChange={handleChange}
                             onFocus={() => setFocusedInput("position")}
                             onBlur={() => setFocusedInput(null)}
                             required placeholder="e.g., Process Engineer"
                             className="w-full pl-12 pr-4 py-4 border-2 border-gray-200
                                        rounded-xl focus:border-secondary focus:outline-none
                                        focus:ring-4 focus:ring-secondary/10
                                        transition-all duration-300 bg-white" />
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3
                                      uppercase tracking-wider">
                      Years of Experience *
                    </label>
                    <div className="relative">
                      <FiTrendingUp className={`absolute left-4 top-1/2 -translate-y-1/2
                                                transition-colors duration-300
                                                ${focusedInput === "experience" ? "text-secondary" : "text-gray-400"}`} />
                      <select name="experience" value={formData.experience}
                              onChange={handleChange}
                              onFocus={() => setFocusedInput("experience")}
                              onBlur={() => setFocusedInput(null)}
                              required
                              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200
                                         rounded-xl focus:border-secondary focus:outline-none
                                         focus:ring-4 focus:ring-secondary/10
                                         transition-all duration-300 appearance-none
                                         bg-white cursor-pointer">
                        <option value="">Select experience level</option>
                        <option value="0-1">0-1 years (Fresher)</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2
                                                text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Resume */}
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3
                                      uppercase tracking-wider">
                      Upload Resume *
                    </label>
                    <input type="file" id="resume" name="resume"
                           onChange={handleFileChange}
                           accept=".pdf,.doc,.docx" className="hidden" />
                    <label htmlFor="resume"
                           className={`flex items-center justify-between w-full px-6 py-5
                                       border-2 border-dashed rounded-xl cursor-pointer
                                       transition-all duration-300
                                       ${fileName
                                         ? "border-secondary bg-secondary/5"
                                         : "border-gray-300 hover:border-secondary hover:bg-gray-50"}`}>
                      <span className="flex items-center gap-3 text-gray-700 font-semibold text-sm">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                                         ${fileName ? "bg-secondary text-white" : "bg-gray-100 text-gray-400"}`}>
                          <FiUpload className="text-lg" />
                        </div>
                        {fileName || "Choose file (PDF, DOC, DOCX)"}
                      </span>
                      <span className="text-xs text-gray-400 font-medium shrink-0">Max 5MB</span>
                    </label>
                  </div>

                  
              {/* I am not a Robot */}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={`${import.meta.env.VITE_SITE_KEY}`}
                onChange={(token) => {
                  if (token) setCaptchaVerified(true);
                }}
                onExpired={() => setCaptchaVerified(false)}
              />

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className={`w-full bg-secondary text-white font-bold py-4 rounded-xl
                               shadow-xl hover:shadow-secondary/30
                               transition-all duration-300 text-base
                               ${submitting 
                                 ? "opacity-70 cursor-not-allowed bg-secondary/70" 
                                 : "hover:bg-secondary/90"}`}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Map + Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-white rounded-3xl border-2 border-gray-200
                              overflow-hidden h-[400px] shadow-xl">
                <iframe
                  src={contactSettings?.map_link || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41710788142!2d72.82229535!3d21.19593145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1642424242424!5m2!1sen!2sin"}
                  width="100%" height="100%"
                  style={{ border: 0 }} allowFullScreen="" loading="lazy"
                  title="REVA Office Location"
                />
              </div>

              {/* Contact */}
              <div className="relative bg-primary text-white p-8 rounded-3xl
                              shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10
                                rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <FiMapPin className="text-xl text-white" />,
                        label: "Office Address",
                        value: contactSettings?.address_hq || "Industrial Area, Pune, Maharashtra, India - 411019",
                      },
                      {
                        icon: <FiPhone className="text-xl text-white" />,
                        label: "Phone",
                        value: contactSettings?.phone_primary || "+91 98765 43210",
                      },
                      {
                        icon: <FiMail className="text-xl text-white" />,
                        label: "Email",
                        value: contactSettings?.email_inquiry || "careers@revaenergy.in",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-4 p-4 bg-white/10
                                   backdrop-blur-sm rounded-xl border border-white/20"
                      >
                        <div className="w-11 h-11 bg-secondary rounded-xl
                                        flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-bold mb-1 text-secondary text-sm">
                            {item.label}
                          </p>
                          <p className="text-sm text-white/90 leading-relaxed">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
};

export default Career;
