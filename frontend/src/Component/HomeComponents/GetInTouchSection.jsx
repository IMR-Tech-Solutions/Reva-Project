import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getContactSettings, submitContactMessage } from "../../services/contactApi";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const GetInTouchSection = () => {
  const [settings, setSettings] = useState(null);
  const [isNotRobot, setIsNotRobot] = useState(false);
  const recaptchaRef = useRef(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const initialFormState = {
    full_name: "",
    company_name: "",
    email: "",
    phone: "",
    project_type: "",
    message_body: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getContactSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch contact settings", error);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //   //   if (!isNotRobot) {
  //   //   alert("Please confirm you are not a robot.");
  //   //   return;  // stops form from submitting
  //   // }
  //   if (!captchaVerified) {
  //   alert("Please complete the CAPTCHA verification.");
  //   return;
  // }
  //     setSubmitting(true);

  //     try {
  //       await submitContactMessage(formData);
  //       toast.success("Message sent successfully! We will get back to you soon.");
  //       setFormData(initialFormState); // reset
  //     } catch (error) {
  //       toast.error("Failed to send message. Please try again later.");
  //       console.error(error);
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }

    setSubmitting(true);

    try {
      await submitContactMessage(formData);
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData(initialFormState);
      recaptchaRef.current.reset();
      setCaptchaVerified(false);
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: "Email Us",
      description: "Project inquiries & engineering support",
      contact: settings?.email_inquiry || "info@revaprocesstechnologies.com",
      link: `mailto:${settings?.email_inquiry || "info@revaprocesstechnologies.com"}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Call Us",
      description: "Available during operating hours",
      contact: settings?.phone_primary || "+91 98765 43210",
      link: `tel:${settings?.phone_primary?.replace(/\s/g, '') || ""}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
        </svg>
      ),
    },
    {
      title: "Visit Us",
      description: "Headquarters",
      contact: settings?.address_hq || "Baner, Pune, Maharashtra",
      link: "#location-map",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-12 md:py-16 bg-white overflow-hidden">
      <Toaster position="top-center" />
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(47,63,143,1)_1px,transparent_1px),linear-gradient(90deg,rgba(47,63,143,1)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
            <span className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-widest">
              Contact Us
            </span>
            <div className="w-8 sm:w-10 h-[3px] bg-secondary rounded-full" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-4"
          >
            Get In <span className="text-secondary">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Have an EPCC project inquiry or need engineering support?
            Our team at Reva Process Technologies responds within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">

          {/* LEFT - Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            {contactMethods.map((method, i) => (
              <motion.a
                key={i}
                href={method.link}
                target={method.title === "Visit Us" ? undefined : undefined}
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group flex items-start gap-4 p-5 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-secondary transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 text-white group-hover:bg-secondary transition-colors duration-300">
                  {method.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-primary text-sm uppercase tracking-[0.16em] mb-1">
                    {method.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-1.5">{method.description}</p>
                  <p className="text-sm font-semibold text-gray-800">{method.contact}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              variants={itemVariants}
              className="p-5 bg-primary rounded-xl text-white"
            >
              <h4 className="font-bold text-sm uppercase tracking-[0.18em] mb-3 text-secondary">
                Operating Hours
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">Monday – Friday</span>
                  <span className="font-semibold">{settings?.hours_weekday || "9:00 AM - 6:00 PM"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Saturday</span>
                  <span className="font-semibold">{settings?.hours_saturday || "9:00 AM - 2:00 PM"}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Sunday</span>
                  <span>{settings?.hours_sunday || "Closed"}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-white/10">
                  <p className="text-xs text-white/60 leading-relaxed">
                    All times in IST (Indian Standard Time).
                    For urgent project inquiries, email us anytime.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-10 border-2 border-gray-200"
          >
            <div className="mb-7">
              <h3 className="text-2xl sm:text-3xl font-black text-primary mb-2">
                Send a Message
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Tell us about your project — our engineering team will get back
                to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-[0.18em] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-sm placeholder-gray-400 focus:border-secondary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-[0.18em] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-sm placeholder-gray-400 focus:border-secondary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-[0.18em] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    required
                    className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-sm placeholder-gray-400 focus:border-secondary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-[0.18em] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-sm placeholder-gray-400 focus:border-secondary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-[0.18em] mb-2">
                  Project Type *
                </label>
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-sm text-gray-700 focus:border-secondary focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select project type</option>
                  <option value="EPCC / Full Project Delivery">EPCC / Full Project Delivery</option>
                  <option value="Basic & Detailed Engineering">Basic & Detailed Engineering</option>
                  <option value="Feasibility / Pilot Plant Study">Feasibility / Pilot Plant Study</option>
                  <option value="Procurement & Equipment Supply">Procurement & Equipment Supply</option>
                  <option value="Site Erection & Commissioning">Site Erection & Commissioning</option>
                  <option value="Plant Revamp / Upgrade">Plant Revamp / Upgrade</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-[0.18em] mb-2">
                  Project Details *
                </label>
                <textarea
                  rows="4"
                  name="message_body"
                  value={formData.message_body}
                  onChange={handleInputChange}
                  placeholder="Describe your process requirements, plant capacity, industry, and any specific technical needs..."
                  required
                  className="w-full px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-sm placeholder-gray-400 focus:border-secondary focus:outline-none resize-vertical transition-colors"
                />
              </div>

              {/* I am not a Robot */}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdDIrwsAAAAACOUpAapTkprwQCB5mgB1zcd62-w"
                onChange={(token) => {
                  if (token) setCaptchaVerified(true);
                }}
                onExpired={() => setCaptchaVerified(false)}
              />

              {/* Submit Button - unchanged */}
              <button
                type="submit"
                disabled={submitting}
                className="group w-full py-4 bg-secondary text-white font-bold text-sm rounded-lg hover:bg-secondary/90 shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-[0.18em] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Message"}
                {!submitting && (
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
              </button>
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy. We never share your data with third parties.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
