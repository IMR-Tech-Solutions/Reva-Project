import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import { getAllTechnologies, createTechnology, updateTechnology, deleteTechnology } from "../../services/technologiesApi";
import toast, { Toaster } from "react-hot-toast";
import AdminConfirmModal from "../Component/AdminConfirmModal";

const AdminTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialFormState = {
    title: "",
    slug: "",
    herosub: "",
    herotitle: "",
    paragraph1: "",
    paragraph2: "",
    img: "",
    keysubheading: "",
    features: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const data = await getAllTechnologies(0, 100);
      setTechnologies(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching technologies:', err);
      setError('Failed to load technologies');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(technologies.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = technologies.slice(start, start + itemsPerPage);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files && files[0]) {
        const file = files[0];
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

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { title: "", description: "" }]
    });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const generateSlug = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Please provide a Title");
      return;
    }

    try {
      setSubmitting(true);

      const submitData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
      };

      const savePromise = editingId 
        ? updateTechnology(editingId, submitData)
        : createTechnology(submitData);

      await toast.promise(savePromise, {
        loading: editingId ? 'Updating technology...' : 'Creating technology...',
        success: (data) => `Technology "${data.title}" successfully ${editingId ? 'updated' : 'created'}!`,
        error: (err) => err.response?.data?.detail || err.message || 'Failed to save technology'
      });

      await fetchTechnologies();
      setFormData(initialFormState);
      setShowForm(false);
      setEditingId(null);
      if (!editingId) setCurrentPage(1);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      slug: item.slug || "",
      herosub: item.herosub || "",
      herotitle: item.herotitle || "",
      paragraph1: item.paragraph1 || "",
      paragraph2: item.paragraph2 || "",
      img: item.img || "",
      keysubheading: item.keysubheading || "",
      features: item.features || [],
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      setSubmitting(true);
      setActionLoading(itemToDelete.id);
      
      await toast.promise(deleteTechnology(itemToDelete.id), {
        loading: `Deleting "${itemToDelete.title}"...`,
        success: `Technology "${itemToDelete.title}" deleted successfully!`,
        error: (err) => err.response?.data?.detail || err.message || 'Failed to delete'
      });

      await fetchTechnologies();
      const newTotalPages = Math.ceil((technologies.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setSubmitting(false);
      setActionLoading(null);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
              Technologies <span className="text-secondary">Management</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Manage dynamic technologies across the platform</p>
          </div>
          <button
            onClick={() => {
              setFormData(initialFormState);
              setEditingId(null);
              setShowForm(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 bg-secondary text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50"
            disabled={submitting}
          >
            <Plus size={20} />
            Add Technology
          </button>
        </div>

        {loading && (
          <div className="text-center py-12 text-gray-600">Loading technologies...</div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchTechnologies} className="font-semibold hover:underline bg-white px-3 py-1 rounded border border-red-200">Try Again</button>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  {editingId ? "Edit Technology" : "Add New Technology"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      disabled={submitting}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Slug (URL)</label>
                    <input
                      type="text"
                      name="slug"
                      placeholder="Auto-generated if empty"
                      value={formData.slug}
                      onChange={handleFormChange}
                      disabled={submitting}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Image (Upload or Path)</label>
                    <input
                      type="file"
                      name="img"
                      accept="image/*"
                      onChange={handleFormChange}
                      disabled={submitting}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                    {formData.img && (
                      <div className="mt-2 text-center bg-gray-100 rounded-lg p-2 inline-block">
                        <img src={formData.img} alt="Preview" className="h-24 w-auto rounded object-contain" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Title</label>
                    <input
                      type="text"
                      name="herotitle"
                      value={formData.herotitle}
                      onChange={handleFormChange}
                      disabled={submitting}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Subtitle</label>
                    <input
                      type="text"
                      name="herosub"
                      value={formData.herosub}
                      onChange={handleFormChange}
                      disabled={submitting}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Paragraph 1</label>
                    <textarea
                      name="paragraph1"
                      rows={3}
                      value={formData.paragraph1}
                      onChange={handleFormChange}
                      disabled={submitting}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Paragraph 2</label>
                    <textarea
                      name="paragraph2"
                      rows={3}
                      value={formData.paragraph2}
                      onChange={handleFormChange}
                      disabled={submitting}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="col-span-full border-t border-gray-200 mt-2 pt-4">
                    <h3 className="text-sm font-bold text-primary mb-2">Features Section</h3>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Key Subheading</label>
                    <input
                      type="text"
                      name="keysubheading"
                      value={formData.keysubheading}
                      onChange={handleFormChange}
                      disabled={submitting}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary mb-4"
                    />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-gray-700">Features List</label>
                        <button 
                          onClick={addFeature} 
                          type="button"
                          className="text-xs bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-2 py-1 rounded transition-colors flex items-center gap-1"
                        >
                          <Plus size={12} /> Add Feature
                        </button>
                      </div>
                      
                      {formData.features.map((feature, idx) => (
                        <div key={idx} className="p-3 border border-gray-200 rounded-lg bg-gray-50 relative group">
                          <button 
                            type="button" 
                            onClick={() => removeFeature(idx)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white rounded-full transition-colors p-1 shadow-sm"
                            title="Remove feature"
                          >
                            <X size={14} />
                          </button>
                          <div className="space-y-2 max-w-[92%]">
                            <input 
                              type="text" 
                              placeholder="Feature Title"
                              value={feature.title}
                              onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-secondary"
                            />
                            <textarea 
                              placeholder="Feature Description"
                              rows={2}
                              value={feature.description}
                              onChange={(e) => handleFeatureChange(idx, "description", e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-secondary"
                            />
                          </div>
                        </div>
                      ))}
                      {formData.features.length === 0 && (
                        <p className="text-sm text-gray-500 italic text-center p-4">No features added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex-shrink-0">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-sm disabled:opacity-50"
                >
                  {submitting ? "Saving..." : (editingId ? "Update Technology" : "Save Technology")}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  disabled={submitting}
                  className="flex-1 bg-white border border-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Technologies List */}
        {!loading && !error && (
          <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Technology Title</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Slug</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Features</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {item.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">/{item.slug}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">
                          <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200 text-xs font-semibold">{item.features?.length || 0}</span>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <div className="flex gap-3 justify-center">
                            <button
                              onClick={() => handleEdit(item)}
                              disabled={submitting}
                              className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-md transition-colors disabled:opacity-50"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => confirmDelete(item)}
                              disabled={submitting}
                              className={`p-2 rounded-md transition-colors disabled:opacity-50 ${actionLoading === item.id ? "bg-red-500 text-white animate-pulse" : "text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100"}`}
                              title="Delete"
                            >
                              <Trash2 size={16} className={actionLoading === item.id ? "animate-spin" : ""} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        No technologies found. Get started by adding one!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination inside table container */}
            {totalPages > 1 && (
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{Math.min(start + itemsPerPage, technologies.length)}</span> of <span className="font-medium">{technologies.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1 || submitting}
                    className="p-2 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || submitting}
                    className="p-2 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      <AdminConfirmModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Technology?"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This will permanently remove it from the database.`}
        confirmText={submitting ? "Deleting..." : "Delete Technology"}
        type="danger"
      />

      <Toaster position="top-right" />
    </div>
  );
};

export default AdminTechnologies;
