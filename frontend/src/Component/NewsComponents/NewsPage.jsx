import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAllNews } from "../../services/newsApi";

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const articlesPerPage = 6;

  const filters = ["All", "Process Engineering", "Sustainability", "Innovation", "Projects", "Industry News"];

  // Fetch news on mount
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getAllNews(0, 100);
      setArticles(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news articles');
    } finally {
      setLoading(false);
    }
  };

  // Filter articles based on active filter
  const filteredArticles = activeFilter === "All"
    ? articles
    : articles.filter(article =>
      article.category?.toLowerCase().includes(activeFilter.toLowerCase())
    );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const start = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(start, start + articlesPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background min-h-screen">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-xl mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
                News & Insights
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary mb-4">
              Latest <span className="text-secondary">Updates</span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Engineering innovations, industry developments, and sustainability advancements from REVA
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Loading articles...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={fetchNews}
                className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Filters */}
          {!loading && !error && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setCurrentPage(1);
                    }}
                    className={`px-6 py-2.5 text-sm font-semibold rounded-lg border-2 transition-all duration-200 whitespace-nowrap ${activeFilter === filter
                        ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/25"
                        : "bg-white border-gray-200 hover:border-secondary hover:bg-secondary/5 hover:text-secondary text-gray-700"
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </motion.div>

              {/* Results Count */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm text-gray-500 mb-8"
              >
                Showing {currentArticles.length} of {filteredArticles.length} articles
                {activeFilter !== "All" && ` • ${activeFilter}`}
              </motion.p>

              {/* News Grid */}
              <motion.div
                key={`${activeFilter}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              >
                {currentArticles.length > 0 ? (
                  currentArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <h3 className="text-2xl font-bold text-gray-600 mb-4">No articles found</h3>
                    <p className="text-gray-500 mb-8">Try adjusting your filter</p>
                    <button
                      onClick={() => setActiveFilter("All")}
                      className="px-8 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all"
                    >
                      Show All Articles
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-center items-center gap-2"
                >
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-12 h-12 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-md transition-all"
                  >
                    ←
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => changePage(i + 1)}
                      className={`w-12 h-12 rounded-xl font-bold transition-all shadow-sm ${currentPage === i + 1
                          ? "bg-secondary text-white shadow-lg shadow-secondary/30"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-md"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-md transition-all"
                  >
                    →
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

// NewsCard Component
const NewsCard = ({ article }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative h-[380px] rounded-xl overflow-hidden bg-white border-2 border-gray-200 hover:border-secondary shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/news/${article.id}`} className="absolute inset-0 z-10" aria-label={`Read article ${article.title}`} />

      {/* Image */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={article.image || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800';
          }}
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {article.category || "General"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-[192px] justify-between">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span>{article.published_date || 'N/A'}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-primary text-base sm:text-lg leading-tight line-clamp-3 mb-4 group-hover:text-secondary transition-colors">
          {article.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1 mb-4">
          {article.short_description}
        </p>

        {/* Read more */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
            Read More
          </span>
          <svg className="w-4 h-4 text-primary group-hover:text-secondary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsPage;
