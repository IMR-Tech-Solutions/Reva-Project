import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiArrowRight, FiHome } from "react-icons/fi";
import { getNewsBySlug, getAllNews } from "../../services/newsApi";
import Breadcrumb from "../Breadcrumb";

const NewsDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        // Fetch the main article
        const data = await getNewsBySlug(slug);
        setArticle(data);

        // Fetch related articles
        const allData = await getAllNews(0, 10);
        setRelatedArticles(allData.filter(a => a.slug !== slug).slice(0, 3));
        
        setError(null);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Article not found or server error');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticleData();
    }
  }, [slug]);

  // ── LOADING STATE ──
  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center text-center px-4 py-28">
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  // ── 404 / ERROR STATE ──
  if (error || !article) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center text-center px-4 py-28">
        <div className="w-20 h-20 bg-primary/8 border border-primary/15 rounded-3xl
                        flex items-center justify-center mx-auto mb-6">
          <FiArrowLeft className="text-primary text-3xl" />
        </div>
        <h2 className="text-3xl font-black text-primary mb-3">Article Not Found</h2>
        <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-md">
          {error || "The requested news article does not exist or has been removed."}
        </p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-7 py-3
                     bg-primary text-white font-bold rounded-xl
                     hover:bg-secondary transition-all duration-300"
        >
          <FiArrowLeft className="text-sm" />
          Return to All News
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Breadcrumb title={article.title} />


      {/* ── MAIN CONTENT ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Responsive Grid: Stacked on mobile, 2 columns on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-start">

            {/* LEFT: Article body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Featured image - Responsive Height */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-primary/10 mb-8 lg:mb-10 h-[220px] sm:h-[320px] lg:h-[380px]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>

              {/* Article content */}
              <div className="space-y-5 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p className="text-base sm:text-lg font-semibold text-primary border-l-4 border-secondary pl-4 py-1">
                  {article.short_description}
                </p>

                <div 
                  className="prose prose-sm sm:prose-base max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: article.detailed_description }}
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-gray-100">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 px-6 py-3
                             bg-primary text-white font-bold rounded-xl
                             hover:bg-secondary transition-all duration-300"
                >
                  <FiArrowLeft className="text-sm" />
                  All News
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3
                             bg-white border border-gray-200 text-primary font-bold rounded-xl
                             hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <FiHome className="text-sm" />
                  Home
                </Link>
              </div>

              {/* Prev / Next navigation placeholder - Could be enhanced later with API calls */}
              <div className="flex justify-between mt-8 py-8 border-t border-gray-100">
                <Link
                  to="/news"
                  className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-2"
                >
                  <FiArrowLeft /> Back to News List
                </Link>
              </div>
            </motion.div>

            {/* RIGHT: Sidebar - Sticky on desktop, top margin on mobile */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:sticky lg:top-28 space-y-6 mt-12 lg:mt-0"
            >
              {/* Article info card */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h4 className="text-sm font-black text-primary uppercase tracking-wider mb-4">
                  Article Info
                </h4>
                <div className="space-y-3">
                   {[
                    { label: "Category", value: article.category || "General" },
                    { label: "Published", value: article.published_date },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-400 font-semibold">{item.label}</span>
                      <span className="text-xs font-bold text-primary text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related articles */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h4 className="text-sm font-black text-primary uppercase tracking-wider mb-4">
                  More Articles
                </h4>
                 <div className="space-y-4">
                  {relatedArticles.map((related) => (
                      <Link
                        key={related.id}
                        to={`/news/${related.slug}`}
                        className="group flex items-start gap-3"
                      >
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-primary leading-snug line-clamp-2
                                         group-hover:text-secondary transition-colors duration-300">
                            {related.title}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-1">{related.published_date}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-primary rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full border border-white/10 pointer-events-none" />
                <p className="text-sm font-black mb-2 relative z-10">Have a Project?</p>
                <p className="text-white/60 text-xs leading-relaxed mb-5 relative z-10">
                  Talk to our engineering specialists about your requirements.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5
                             bg-secondary text-white text-xs font-bold rounded-xl
                             hover:bg-secondary/90 transition-all duration-300 relative z-10"
                >
                  Contact Us <FiArrowRight className="text-xs" />
                </Link>
              </div>
            </motion.aside>

          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;
