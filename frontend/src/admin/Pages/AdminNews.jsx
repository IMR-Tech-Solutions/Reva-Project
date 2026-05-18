import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import { getAllNews, createNews, updateNews, deleteNews } from "../../services/newsApi";
import toast, { Toaster } from "react-hot-toast";
import AdminConfirmModal from "../Component/AdminConfirmModal";

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Process Engineering",
    short_description: "",
    detailed_description: "",
    image: "",
    published_date: new Date().toISOString().split('T')[0],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // ID of the article being processed
  const articlesPerPage = 6;

  const categories = ["All", "Process Engineering", "Sustainability", "Innovation", "Projects", "Industry News"];

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-hide feedback after 5 seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getAllNews(0, 100);
      setNews(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news articles');
    } finally {
      setLoading(false);
    }
  };

  // Filter articles
  const filteredNews = activeFilter === "All"
    ? news
    : news.filter(article => article.category?.toLowerCase().includes(activeFilter.toLowerCase()));

  const totalPages = Math.ceil(filteredNews.length / articlesPerPage);
  const start = (currentPage - 1) * articlesPerPage;
  const currentNews = filteredNews.slice(start, start + articlesPerPage);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files && files[0]) {
        const file = files[0];
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedExtensions.includes(fileExtension) || !allowedMimeTypes.includes(file.type)) {
          toast.error("Only JPG, PNG, and WEBP images are allowed.");
          e.target.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData({ ...formData, [name]: event.target.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddNews = async () => {
    // Validation
    if (!formData.title.trim() || !formData.short_description.trim() || !formData.detailed_description.trim()) {
      toast.error("Please fill in all required fields (Title, Short Description, Detailed Description)");
      return;
    }

    try {
      setSubmitting(true);

      // Prepare data for API
      const newsData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        category: formData.category,
        short_description: formData.short_description,
        detailed_description: formData.detailed_description,
        image: formData.image,
        published_date: formData.published_date,
      };

      const savePromise = editingId 
        ? updateNews(editingId, newsData)
        : createNews(newsData);

      await toast.promise(savePromise, {
        loading: editingId ? 'Updating article...' : 'Creating article...',
        success: (data) => {
          setFeedback({ type: 'success', message: `Article "${data.title}" ${editingId ? 'updated' : 'created'} successfully!` });
          return `Article "${data.title}" ${editingId ? 'updated' : 'created'} successfully!`;
        },
        error: (err) => {
          const msg = err.response?.data?.detail || err.message || 'Failed to save article';
          setFeedback({ type: 'error', message: msg });
          return msg;
        }
      });

      // Refresh news list
      await fetchNews();

      // Reset form
      setFormData({
        title: "",
        slug: "",
        category: "Process Engineering",
        short_description: "",
        detailed_description: "",
        image: "",
        published_date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      setEditingId(null);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error saving news:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      slug: article.slug || "",
      category: article.category || "Process Engineering",
      short_description: article.short_description,
      detailed_description: article.detailed_description,
      image: article.image || "",
      published_date: article.published_date,
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const confirmDelete = (article) => {
    setArticleToDelete(article);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    
    try {
      setSubmitting(true);
      setActionLoading(articleToDelete.id);
      
      const deletePromise = deleteNews(articleToDelete.id);
      
      await toast.promise(deletePromise, {
        loading: `Deleting "${articleToDelete.title}"...`,
        success: () => {
          setFeedback({ type: 'success', message: `Article "${articleToDelete.title}" deleted successfully!` });
          return `Article "${articleToDelete.title}" deleted successfully!`;
        },
        error: (err) => {
          const msg = err.response?.data?.detail || err.message || 'Failed to delete article';
          setFeedback({ type: 'error', message: msg });
          return msg;
        }
      });

      await fetchNews();
      setCurrentPage(1);
    } catch (err) {
      console.error('Error deleting news:', err);
    } finally {
      setSubmitting(false);
      setActionLoading(null);
      setShowDeleteConfirm(false);
      setArticleToDelete(null);
    }
  };

  const handleAddClick = () => {
    setFormData({
      title: "",
      slug: "",
      category: "Process Engineering",
      short_description: "",
      detailed_description: "",
      image: "",
      published_date: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
              News <span className="text-secondary">Management</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Manage and create news articles</p>
          </div>
          <button
            onClick={handleAddClick}
            className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 bg-secondary text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50"
            disabled={submitting}
          >
            <Plus size={20} />
            Add News Article
          </button>
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div className={`p-4 rounded-xl flex items-center justify-between shadow-sm border ${
            feedback.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
              <p className="text-sm font-semibold">{feedback.message}</p>
            </div>
            <button 
              onClick={() => setFeedback(null)}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading articles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
            <button
              onClick={fetchNews}
              className="ml-2 font-semibold hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  {editingId ? "Edit Article" : "Add New Article"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Article Title *"
                    value={formData.title}
                    onChange={handleFormChange}
                    disabled={submitting}
                    className="col-span-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:bg-gray-100"
                  />

                  <input
                    type="text"
                    name="slug"
                    placeholder="Slug (auto-generated if empty)"
                    value={formData.slug}
                    onChange={handleFormChange}
                    disabled={submitting}
                    className="col-span-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:bg-gray-100"
                  />

                  <div className="col-span-full">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Upload Image</label>
                    <input
                      type="file"
                      name="image"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleFormChange}
                      disabled={submitting}
                      className="col-span-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 w-full disabled:bg-gray-100"
                    />
                    {formData.image && (
                      <div className="mt-2">
                        <img src={formData.image} alt="Preview" className="h-32 w-auto rounded-lg object-cover" />
                      </div>
                    )}
                  </div>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    disabled={submitting}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:bg-gray-100"
                  >
                    <option>Process Engineering</option>
                    <option>Sustainability</option>
                    <option>Innovation</option>
                    <option>Projects</option>
                    <option>Industry News</option>
                  </select>

                  <input
                    type="date"
                    name="published_date"
                    value={formData.published_date}
                    onChange={handleFormChange}
                    disabled={submitting}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Short Description *</label>
                  <textarea
                    name="short_description"
                    placeholder="Brief summary shown in news list"
                    value={formData.short_description}
                    onChange={handleFormChange}
                    disabled={submitting}
                    rows="2"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Detailed Description (Full Article Content) *</label>
                  <textarea
                    name="detailed_description"
                    placeholder="Full article content shown on detail page. Supports HTML formatting."
                    value={formData.detailed_description}
                    onChange={handleFormChange}
                    disabled={submitting}
                    rows="6"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:bg-gray-100"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleAddNews}
                    disabled={submitting}
                    className="flex-1 bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-sm disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : (editingId ? "Update Article" : "Add Article")}
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    disabled={submitting}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                  className={`px-3 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-lg border-2 transition-all duration-200 whitespace-nowrap ${activeFilter === filter
                    ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/25"
                    : "bg-white border-gray-200 hover:border-secondary hover:bg-secondary/5 hover:text-secondary text-gray-700"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-center text-xs sm:text-sm text-gray-500">
              Showing {currentNews.length} of {filteredNews.length} articles
              {activeFilter !== "All" && ` • ${activeFilter}`}
            </p>

            {/* News List */}
            <div className="w-full overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block w-full overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Title</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Category</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Published Date</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs font-bold text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentNews.length > 0 ? (
                      currentNews.map((article) => (
                        <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-3 sm:px-4 py-3 text-sm text-gray-800 truncate">{article.title}</td>
                          <td className="px-3 sm:px-4 py-3 text-sm text-gray-600 truncate">{article.category}</td>
                          <td className="px-3 sm:px-4 py-3 text-sm text-gray-600">{article.published_date}</td>
                          <td className="px-3 sm:px-4 py-3 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleEdit(article)}
                                disabled={submitting}
                                className="p-2 bg-blue-100 text-primary rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => confirmDelete(article)}
                                disabled={submitting}
                                className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                                  actionLoading === article.id 
                                    ? "bg-red-500 text-white animate-pulse" 
                                    : "bg-red-100 text-red-600 hover:bg-red-200"
                                }`}
                                title="Delete"
                              >
                                <Trash2 size={16} className={actionLoading === article.id ? "animate-spin" : ""} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                          No articles found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile List */}
              <div className="md:hidden w-full space-y-3">
                {currentNews.length > 0 ? (
                  currentNews.map((article) => (
                    <div key={article.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-primary text-sm truncate">{article.title}</h3>
                          <p className="text-xs text-gray-600">{article.category}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(article)}
                            disabled={submitting}
                            className="p-2 bg-blue-100 text-primary rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => confirmDelete(article)}
                            disabled={submitting}
                            className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                              actionLoading === article.id 
                                ? "bg-red-500 text-white animate-pulse" 
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                          >
                            <Trash2 size={16} className={actionLoading === article.id ? "animate-spin" : ""} />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>{article.published_date}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">No articles found</div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || submitting}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-md transition-all text-sm sm:text-base"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    disabled={submitting}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-bold transition-all shadow-sm text-sm disabled:opacity-50 ${currentPage === i + 1
                      ? "bg-secondary text-white shadow-lg shadow-secondary/30"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-md"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || submitting}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-md transition-all text-sm sm:text-base"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AdminConfirmModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Article?"
        message={`Are you sure you want to delete "${articleToDelete?.title}"? This action cannot be undone and will remove it from the news section.`}
        confirmText={submitting ? "Deleting..." : "Delete Article"}
        type="danger"
      />

      <Toaster position="top-center" />
    </div>
  );
};

export default AdminNews;
