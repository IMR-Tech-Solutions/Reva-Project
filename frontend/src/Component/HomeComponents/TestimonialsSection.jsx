import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/api";

const staticTestimonials = [
  {
    id: 1,
    name: "Rajesh Kulkarni",
    role: "Project Director",
    company: "Reliance Industries",
    quote:
      "REVA Engineering delivered exceptional process equipment with outstanding quality and adherence to timelines. Their attention to detail is unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Anita Deshmukh",
    role: "Plant Head",
    company: "HPCL",
    quote:
      "Their engineering expertise and attention to safety standards made them a trusted long-term partner for our critical projects.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Mehta",
    role: "Operations Manager",
    company: "L&T Heavy Engineering",
    quote:
      "Professional execution, clear communication, and reliable performance across complex projects. Highly recommended.",
    rating: 5,
  },
  {
    id: 4,
    name: "Suresh Patil",
    role: "Maintenance Lead",
    company: "IOCL",
    quote:
      "High-quality fabrication and excellent post-installation support. They exceeded our expectations.",
    rating: 5,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-1 mb-4">
    {[...Array(rating || 5)].map((_, i) => (
      <svg
        key={i}
        className="w-5 h-5 text-secondary"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);


const TestimonialsSection = ({ testimonials: dynamicTestimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fetchedTestimonials, setFetchedTestimonials] = useState([]);
  const [loading, setLoading] = useState(!dynamicTestimonials);
  
  useEffect(() => {
    if (dynamicTestimonials) return;
    const fetchTestimonials = async () => {
      try {
        const data = await api.getTestimonials();
        if (data && data.length > 0) {
          setFetchedTestimonials(data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [dynamicTestimonials]);

  // Priority: 1. Props, 2. Fetched, 3. Static fallback
  const activeTestimonials = dynamicTestimonials && dynamicTestimonials.length > 0 
    ? dynamicTestimonials 
    : fetchedTestimonials.length > 0 
      ? fetchedTestimonials 
      : staticTestimonials;

  const totalTestimonials = activeTestimonials.length;

  const handleNext = useCallback(() => {
    if (totalTestimonials === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
  }, [totalTestimonials]);

  const handleDotClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (totalTestimonials <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext, totalTestimonials]);

  if (totalTestimonials === 0) return null;

  const currentTestimonial = activeTestimonials[currentIndex];
  // Safe initials generation
  const initials = currentTestimonial.name
    ? currentTestimonial.name.split(" ").map((n) => n[0]).join("")
    : "RC";

  return (
    <section className="w-full bg-gray-50 py-10 lg:py-16 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="text-gray-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4 block">
            TESTIMONIALS
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">
            What clients say about our
          </h2>
          <p className="text-secondary text-xl lg:text-2xl">
            engineering excellence
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* LEFT: Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 lg:p-10
                         shadow-xl border border-gray-100
                         flex flex-col justify-between
                         min-h-[360px] lg:min-h-0"
            >
              {/* Top content */}
              <div className="flex flex-col flex-1 justify-center">
                <StarRating rating={currentTestimonial.rating} />
                <blockquote className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
                  "{currentTestimonial.quote}"
                </blockquote>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-primary
                                flex items-center justify-center
                                text-white font-bold text-lg shadow-lg shrink-0">
                  {initials}
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-sm text-secondary font-semibold">
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: Stats Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group
                       h-[400px] sm:h-[420px] lg:h-auto lg:min-h-0"
          >
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80"
              alt="REVA Engineering Projects"
              className="w-full h-full object-cover
                         group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/20" />

            {/* Stats — evenly spaced */}
            <div className="absolute inset-0 flex flex-col justify-evenly
                            items-center text-white px-8 py-8">

              {[
                { value: "250+", label: "Happy Clients", delay: 0.2 },
                { value: "40+", label: "Engineering Projects", delay: 0.4 },
                { value: "200+", label: "Safety Certifications", delay: 0.6 },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay, duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm lg:text-base text-white font-medium tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}

            </div>
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2.5 mt-10">
          {activeTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-secondary w-10 h-3"
                  : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Real Stories From Industry Leaders and Their Projects
        </motion.p>

      </div>
    </section>
  );
};

export default TestimonialsSection;
