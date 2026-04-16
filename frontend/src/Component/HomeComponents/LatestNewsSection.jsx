import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import api from "../../api/api";

const LatestNewsSection = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.getLatestNews(6);
        setNewsArticles(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-gray-100 py-10 lg:py-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Subtitle */}
          <motion.h3
            variants={itemVariants}
            className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 text-center lg:text-left"
          >
            Stay Updated
          </motion.h3>

          {/* Title + Arrows */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-primary text-center lg:text-left"
            >
              Our latest <span className="text-secondary">news</span>
            </motion.h2>

            {/* Arrows */}
            <div className="flex justify-center lg:justify-end gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-accent transition-all duration-300 shadow-md"
                aria-label="Previous slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-accent transition-all duration-300 shadow-md"
                aria-label="Next slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[500px] bg-white/50 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={newsArticles.length > 3}
            speed={800}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {newsArticles.map((article) => (
              <SwiperSlide key={article.id}>
                <NewsCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* VIEW ALL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            to="/news"
            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white font-bold rounded-full hover:shadow-xl transition-all duration-300"
          >
            View all news
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// NEWS CARD
const NewsCard = ({ article }) => {
  return (
    <Link
      to={`/news/${article.slug}`}
      className="group relative block h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-100"
    >
      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent" />

      <div className="relative h-full p-6 flex flex-col justify-between text-white">
        <span className="self-end px-4 py-1.5 bg-accent text-primary text-sm font-bold rounded-full">
          {article.category || "News Article"}
        </span>

        <div>
          <div className="text-sm text-gray-200 mb-3">
            {article.published_date}
          </div>
          <h3 className="text-xl md:text-2xl font-bold leading-tight mb-4 line-clamp-3">
            {article.title}
          </h3>
          <span className="text-accent font-semibold flex items-center gap-2">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default LatestNewsSection;
