import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import api, { API_BASE_URL } from "../../api/api";

const HeroHomeSection = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  // Helper to get media source
  const getMediaSource = (url) => {
    if (!url) return null;
    if (url.startsWith("/api/uploads")) {
      return `${API_BASE_URL}${url}`;
    }
    return url;
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await api.getHomeHeroSlides();
        if (data && data.length > 0) {
          setSlides(data);
        }
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const handleNavigation = (dir) => {
    setIsAutoPlaying(false);
    setDirection(dir === "next" ? 1 : -1);

    if (dir === "next") {
      setCurrent((prev) => (prev + 1) % slides.length);
    } else {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (loading) return <div className="h-[600px] md:h-[700px] bg-primary animate-pulse" />;
  if (slides.length === 0) return null;

  const currentSlide = slides[current] || slides[0];

  if (!currentSlide) return null;

  return (
    <section className="relative h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden pt-16 lg:pt-20">
      {/* Dynamic Background Media */}
      <div className="absolute inset-0 z-0">
        {currentSlide.media_type === "image" ? (
          <img
            src={getMediaSource(currentSlide.media_url) || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"}
            alt={currentSlide.heading}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            key={currentSlide.media_url} // Force reload on URL change
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source 
              src={getMediaSource(currentSlide.media_url) || "./vid11.mp4"} 
              type="video/mp4" 
            />
          </video>
        )}

        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent" />
      </div>

      {/* Changing Text Content */}
      <div className="relative z-20 max-w-[1600px] mx-auto h-full px-6 md:px-10 lg:px-16">
        <div className="flex items-center h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="max-w-4xl text-white"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Small label with line */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-4"
              >
                <div className="h-[2px] w-12 bg-secondary" />
                <p className="text-sm md:text-base lg:text-lg font-medium tracking-wide text-secondary uppercase">
                  {currentSlide.small_text}
                </p>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 max-w-3xl"
              >
                {currentSlide.heading}
              </motion.h1>

              {/* Subheading */}
              {currentSlide.sub_text && (
                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl lg:text-2xl font-light mb-8 max-w-2xl leading-relaxed opacity-90"
                >
                  {currentSlide.sub_text}
                </motion.p>
              )}

              {/* CTA Button */}
              {currentSlide.button_text && (
                <motion.a
                  variants={itemVariants}
                  href={currentSlide.button_link || "#"}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white font-semibold rounded hover:bg-secondary/90 transition-all duration-300 text-base md:text-lg shadow-lg hover:shadow-xl"
                >
                  {currentSlide.button_text}
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Clean Navigation Controls */}
      <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12 z-30 flex flex-col items-end gap-5">
        {/* Arrow Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavigation("prev")}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="text-xl lg:text-2xl text-primary" />
          </button>

          <button
            onClick={() => handleNavigation("next")}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
            aria-label="Next slide"
          >
            <FiChevronRight className="text-xl lg:text-2xl text-primary" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-10 bg-secondary"
                  : "w-2 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroHomeSection;
