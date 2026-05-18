import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, X, List, Upload, Image as ImageIcon } from "lucide-react";
import { getAllTechnologies, createTechnology, updateTechnology, deleteTechnology, uploadTechnologyImage } from "../../services/technologiesApi";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import AdminConfirmModal from "../Component/AdminConfirmModal";

// ═══════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const InputField = ({ label, name, value, onChange, required, type = "text", placeholder, rows, disabled }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-gray-700">
      {label} {required && <span className="text-secondary">*</span>}
    </label>
    {rows ? (
      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary transition-all resize-none"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary transition-all"
        placeholder={placeholder}
      />
    )}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SUB-VIEW: TECHNOLOGY FORM (MODAL CONTENT)
// ═══════════════════════════════════════════════════════════════════════════

const TechnologyForm = ({ formData, setFormData, submitting }) => {
  const [uploading, setUploading] = useState(false);
  
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedExtensions.includes(fileExtension) || !allowedMimeTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);
      const res = await uploadTechnologyImage(file);
      setFormData(prev => ({ ...prev, img: res.url }));
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...(prev.features || []), { title: "", description: "" }]
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData(prev => ({ ...prev, stats: newStats }));
  };

  const addStat = () => {
    setFormData(prev => ({
      ...prev,
      stats: [...(prev.stats || []), { label: "", value: "" }]
    }));
  };

  const removeStat = (index) => {
    const newStats = formData.stats.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, stats: newStats }));
  };

  // Helper to get correctly prefixed image URL
  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return `${import.meta.env.VITE_API_URL}${url}`;
  };

  return (
    <div className="p-6 overflow-y-auto space-y-6 scrollbar-hide">
      {/* Grid: Title & Path */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Amine Gas Treatment" disabled={submitting} />
        <InputField label="Path (URL)" name="slug" value={formData.slug} onChange={handleChange} placeholder="Auto-generated if empty (e.g. /amine-treatment)" disabled={submitting} />
      </div>

      {/* Full Width: Image Upload */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-700">Image (Upload or Path)</label>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full relative">
                <input 
                    type="file" accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleImageUpload}
                    disabled={submitting || uploading}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 cursor-pointer"
                />
                {uploading && <div className="absolute right-3 top-2.5 w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />}
            </div>
            {formData.img && (
                <div className="h-16 w-24 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                    <img 
                        src={getImageUrl(formData.img)} 
                        alt="Preview" 
                        className="w-full h-full object-contain"
                    />
                </div>
            )}
        </div>
      </div>

      {/* Grid: Hero Title & Subtitle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Hero Title" name="herotitle" value={formData.herotitle} onChange={handleChange} placeholder="Main headline on page" disabled={submitting} />
        <InputField label="Hero Subtitle" name="herosub" value={formData.herosub} onChange={handleChange} placeholder="Meta pill text" disabled={submitting} />
      </div>

      {/* Full Width: Paragraphs */}
      <InputField label="Paragraph 1" name="paragraph1" value={formData.paragraph1} onChange={handleChange} rows={3} placeholder="Initial technology description..." disabled={submitting} />
      <InputField label="Paragraph 2" name="paragraph2" value={formData.paragraph2} onChange={handleChange} rows={3} placeholder="Secondary technical details..." disabled={submitting} />

      {/* Features Section */}
      <div className="border-t border-gray-100 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-primary">Features Section</h3>
          <button 
            type="button" onClick={addFeature}
            className="text-xs bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-2 py-1 rounded transition-colors flex items-center gap-1 font-semibold"
          >
            <Plus size={12} /> Add Feature
          </button>
        </div>
        <InputField label="Key Subheading" name="keysubheading" value={formData.keysubheading} onChange={handleChange} placeholder="Engineering Excellence" disabled={submitting} />
        
        <div className="space-y-3">
          {formData.features?.map((feature, idx) => (
            <div key={idx} className="p-4 bg-gray-50/50 border border-gray-200 rounded-xl relative group">
              <button 
                type="button" onClick={() => removeFeature(idx)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white rounded-full transition-colors p-1 shadow-sm"
              >
                <X size={14} />
              </button>
              <div className="space-y-2 pr-6">
                <input 
                  type="text" placeholder="Feature Title"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm font-semibold focus:outline-none focus:border-secondary"
                />
                <textarea 
                  placeholder="Technical description..."
                  rows={2}
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(idx, "description", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 focus:outline-none focus:border-secondary resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-gray-100 pt-4 space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-primary">Performance Metrics</h3>
          <button 
            type="button" onClick={addStat}
            className="text-xs bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-2 py-1 rounded transition-colors flex items-center gap-1 font-semibold"
          >
            <Plus size={12} /> Add Metric
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {formData.stats?.map((stat, idx) => (
            <div key={idx} className="p-3 bg-gray-50/50 border border-gray-200 rounded-xl relative flex items-center gap-2 pr-8">
              <button 
                type="button" onClick={() => removeStat(idx)}
                className="absolute top-1 right-1 text-gray-300 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
              <input 
                type="text" placeholder="98%"
                value={stat.value}
                onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                className="w-16 bg-white border border-gray-300 rounded px-2 py-1 text-xs font-black text-secondary focus:outline-none"
              />
              <input 
                type="text" placeholder="Metric Label"
                value={stat.label}
                onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-[10px] font-semibold text-gray-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const AdminTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialFormState = {
    title: "", slug: "", herosub: "", herotitle: "",
    paragraph1: "", paragraph2: "", img: "",
    keysubheading: "", features: [], stats: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => { fetchTechnologies(); }, []);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const data = await getAllTechnologies(0, 100);
      setTechnologies(data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load technologies');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title?.trim()) return toast.error("Title is required");
    try {
      setSubmitting(true);
      const submitData = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      const action = editingId ? updateTechnology(editingId, submitData) : createTechnology(submitData);
      await toast.promise(action, {
        loading: editingId ? 'Updating...' : 'Creating...',
        success: (res) => `Technology "${res.title}" successfully ${editingId ? 'updated' : 'created'}!`,
        error: (err) => err.message || 'Operation failed'
      });

      await fetchTechnologies();
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({ 
      ...item, 
      features: item.features || [], 
      stats: item.stats || [] 
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setSubmitting(true);
      await deleteTechnology(itemToDelete.id);
      toast.success("Technology deleted successfully");
      await fetchTechnologies();
    } catch (err) {
      toast.error('Failed to delete technology');
    } finally {
      setSubmitting(false);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  // Helper to get correctly prefixed image URL
  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return `${import.meta.env.VITE_API_URL}${url}`;
  };

  // Pagination logic
  const totalPages = Math.ceil(technologies.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = technologies.slice(start, start + itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">

        {/* Header - Sticking to the Product Management style */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-primary">
              Technologies <span className="text-secondary">Management</span>
            </h1>
            <p className="text-sm text-gray-600 mt-2">Manage dynamic technologies across the platform</p>
          </div>
          <button
            onClick={() => { setFormData(initialFormState); setEditingId(null); setShowForm(true); }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-all shadow-md"
          >
            <Plus size={20} /> Add Technology
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading Technologies...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-[#f8fafc] border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Visual</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Technology Title</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Path</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Features</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                           <div className="h-10 w-16 bg-gray-50 rounded border border-gray-100 overflow-hidden flex items-center justify-center">
                             {item.img ? (
                               <img 
                                 src={getImageUrl(item.img)} 
                                 alt={item.title} 
                                 className="w-full h-full object-cover"
                               />
                             ) : (
                               <ImageIcon size={18} className="text-gray-200" />
                             )}
                           </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-primary">
                           {item.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                           /{item.slug}
                        </td>
                        <td className="px-6 py-4 text-center">
                           <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200 text-xs font-semibold text-gray-600">
                             {item.features?.length || 0}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-3 justify-center">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 rounded-md transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => { setItemToDelete(item); setShowDeleteConfirm(true); }}
                              className="text-red-500 bg-red-50 hover:bg-red-500 hover:text-white p-2 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        No technologies found. Get started by adding one!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {totalPages > 1 && (
              <div className="bg-[#f8fafc] px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{Math.min(start + itemsPerPage, technologies.length)}</span> of <span className="font-medium">{technologies.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
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

      {/* Control Interface: Simplified Modal to match Product design */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden"
            >
              {/* Header: Simplified */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <h2 className="text-2xl font-bold text-primary">
                  {editingId ? "Edit Technology" : "Add New Technology"}
                </h2>
                <button 
                  onClick={() => setShowForm(false)} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Form Body: Grid Layout */}
              <div className="flex-1 overflow-y-auto">
                <TechnologyForm 
                  formData={formData} setFormData={setFormData}
                  submitting={submitting} 
                />
              </div>

              {/* Footer: Yellow/White Buttons */}
              <div className="flex gap-4 p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-all text-sm disabled:opacity-50 shadow-md"
                >
                  {submitting ? "Saving..." : (editingId ? "Update Technology" : "Save Technology")}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  disabled={submitting}
                  className="flex-1 bg-white border border-gray-300 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all text-sm shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AdminConfirmModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Technology?"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This will permanently remove it from the database.`}
        confirmText={submitting ? "Deleting..." : "Delete Technology"}
        type="danger"
      />
    </div>
  );
};

export default AdminTechnologies;
