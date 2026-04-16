import React, { useState, useEffect, useCallback } from "react";
import { Edit2, Trash2, Plus, X, ChevronDown, ChevronUp, GripVertical, Eye, EyeOff, ArrowLeft, Save, Upload, Layers } from "lucide-react";
import api from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import AdminConfirmModal from "../Component/AdminConfirmModal";

const API_BASE = import.meta.env.VITE_API_URL || "";

// ─── SECTION ITEM EDITOR ────────────────────────────────────────────────────
const ItemEditor = ({ item, onSave, onDelete, onCancel, isNew }) => {
  const [form, setForm] = useState({
    title: item?.title || "",
    description: item?.description || "",
    icon_name: item?.icon_name || "",
    step_number: item?.step_number || "",
    image: item?.image || "",
    extra_data: JSON.stringify(item?.extra_data || {}, null, 2),
    display_order: item?.display_order || 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    let parsedExtra = {};
    try { parsedExtra = JSON.parse(form.extra_data || "{}"); } catch { parsedExtra = {}; }
    onSave({
      ...form,
      display_order: parseInt(form.display_order) || 0,
      extra_data: parsedExtra,
    });
  };

  return (
    <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="Item title" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Icon Name</label>
          <input name="icon_name" value={form.icon_name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="e.g. Search, Shield" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="Item description" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Step Number</label>
          <input name="step_number" value={form.step_number} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="01" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Display Order</label>
          <input name="display_order" type="number" value={form.display_order} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="/api/uploads/..." />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1">Extra Data (JSON)</label>
        <textarea name="extra_data" value={form.extra_data} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
      </div>
      <div className="flex gap-2">
        <button onClick={handleSave} className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary/90 transition-colors flex items-center gap-1"><Save size={14} />{isNew ? "Add Item" : "Save Item"}</button>
        {!isNew && onDelete && <button onClick={onDelete} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-1"><Trash2 size={14} />Delete</button>}
        <button onClick={onCancel} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">Cancel</button>
      </div>
    </div>
  );
};

// ─── SECTION EDITOR ──────────────────────────────────────────────────────────
const SectionEditor = ({ section, serviceId, onRefresh }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [form, setForm] = useState({
    section_key: section.section_key || "",
    section_label: section.section_label || "",
    title: section.title || "",
    title_highlight: section.title_highlight || "",
    description: section.description || "",
    image: section.image || "",
    extra_data: JSON.stringify(section.extra_data || {}, null, 2),
    display_order: section.display_order || 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveSection = async () => {
    try {
      let parsedExtra = {};
      try { parsedExtra = JSON.parse(form.extra_data || "{}"); } catch { parsedExtra = {}; }
      await api.updateSection(section.id, {
        ...form,
        display_order: parseInt(form.display_order) || 0,
        extra_data: parsedExtra,
      });
      toast.success("Section updated");
      setEditing(false);
      onRefresh();
    } catch (err) {
      toast.error("Failed to update section");
    }
  };

  const handleDeleteSection = async () => {
    if (!confirm("Delete this section and all its items?")) return;
    try {
      await api.deleteSection(section.id);
      toast.success("Section deleted");
      onRefresh();
    } catch (err) {
      toast.error("Failed to delete section");
    }
  };

  const handleSaveItem = async (itemData, itemId) => {
    try {
      if (itemId) {
        await api.updateItem(itemId, itemData);
        toast.success("Item updated");
      } else {
        await api.createItem(section.id, itemData);
        toast.success("Item added");
      }
      setEditingItemId(null);
      setAddingItem(false);
      onRefresh();
    } catch (err) {
      toast.error("Failed to save item");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await api.deleteItem(itemId);
      toast.success("Item deleted");
      setEditingItemId(null);
      onRefresh();
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await api.uploadServiceImage(file);
      setForm({ ...form, image: result.url });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Failed to upload image");
    }
  };

  const items = section.items || [];

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      {/* Section Header Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <GripVertical size={16} className="text-gray-400" />
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">{section.section_key}</span>
            <h4 className="text-sm font-bold text-primary">{section.title} {section.title_highlight}</h4>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">{items.length} items</span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Section Content */}
      {expanded && (
        <div className="p-4 space-y-4 border-t border-gray-100">
          {/* Section Edit Toggle */}
          <div className="flex gap-2">
            <button onClick={() => setEditing(!editing)} className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"><Edit2 size={14} />{editing ? "Cancel Edit" : "Edit Section"}</button>
            <button onClick={handleDeleteSection} className="text-sm font-bold text-red-600 hover:text-red-800 flex items-center gap-1"><Trash2 size={14} />Delete Section</button>
          </div>

          {/* Section Edit Form */}
          {editing && (
            <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Section Key</label>
                  <input name="section_key" value={form.section_key} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Section Label</label>
                  <input name="section_label" value={form.section_label} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Display Order</label>
                  <input name="display_order" type="number" value={form.display_order} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Title</label>
                  <input name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Title Highlight</label>
                  <input name="title_highlight" value={form.title_highlight} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Image</label>
                  <div className="flex gap-2">
                    <input name="image" value={form.image} onChange={handleChange} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="/api/uploads/..." />
                    <label className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-300 transition-colors cursor-pointer flex items-center gap-1"><Upload size={14} />Upload<input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" /></label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Extra Data (JSON)</label>
                <textarea name="extra_data" value={form.extra_data} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
              </div>
              <button onClick={handleSaveSection} className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-secondary/90 transition-colors flex items-center gap-1"><Save size={14} />Save Section</button>
            </div>
          )}

          {/* Items List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-bold text-gray-700">Items ({items.length})</h5>
              <button onClick={() => setAddingItem(true)} className="text-sm font-bold text-secondary hover:text-secondary/80 flex items-center gap-1"><Plus size={14} />Add Item</button>
            </div>

            {addingItem && (
              <ItemEditor
                isNew
                onSave={(data) => handleSaveItem(data, null)}
                onCancel={() => setAddingItem(false)}
              />
            )}

            {items.map((item) => (
              <div key={item.id}>
                {editingItemId === item.id ? (
                  <ItemEditor
                    item={item}
                    onSave={(data) => handleSaveItem(data, item.id)}
                    onDelete={() => handleDeleteItem(item.id)}
                    onCancel={() => setEditingItemId(null)}
                  />
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-secondary/30 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-xs font-mono text-gray-400 w-6">{item.display_order}</span>
                      {item.step_number && <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">{item.step_number}</span>}
                      <span className="text-sm font-semibold text-gray-800 truncate">{item.title}</span>
                      {item.icon_name && <span className="text-xs text-gray-400">[{item.icon_name}]</span>}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => setEditingItemId(item.id)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MAIN ADMIN SERVICES ────────────────────────────────────────────────────
const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingService, setEditingService] = useState(null); // full service data with sections
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [addingSection, setAddingSection] = useState(false);

  const initialForm = {
    title: "", slug: "", tagline: "", description: "", icon_name: "", number: "", href: "",
    tags: "", hero_breadcrumb: "", hero_title: "", hero_highlight: "", hero_description: "",
    hero_pills: "", hero_image: "", hero_stat_title: "", hero_stat_text: "",
    hero_cta1_text: "", hero_cta1_link: "", hero_cta2_text: "", hero_cta2_link: "",
    is_active: true, display_order: 0,
  };

  const [form, setForm] = useState(initialForm);
  const [activeTab, setActiveTab] = useState("info");

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getAdminServices();
      setServices(data);
      setError(null);
    } catch (err) {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const loadServiceDetail = async (id) => {
    try {
      const data = await api.getAdminService(id);
      setEditingService(data);
      setForm({
        title: data.title || "", slug: data.slug || "", tagline: data.tagline || "",
        description: data.description || "", icon_name: data.icon_name || "",
        number: data.number || "", href: data.href || "",
        tags: (data.tags || []).join(", "),
        hero_breadcrumb: data.hero_breadcrumb || "", hero_title: data.hero_title || "",
        hero_highlight: data.hero_highlight || "", hero_description: data.hero_description || "",
        hero_pills: (data.hero_pills || []).join(", "),
        hero_image: data.hero_image || "", hero_stat_title: data.hero_stat_title || "",
        hero_stat_text: data.hero_stat_text || "",
        hero_cta1_text: data.hero_cta1_text || "", hero_cta1_link: data.hero_cta1_link || "",
        hero_cta2_text: data.hero_cta2_text || "", hero_cta2_link: data.hero_cta2_link || "",
        is_active: data.is_active !== false, display_order: data.display_order || 0,
      });
      setActiveTab("info");
      setShowForm(true);
    } catch (err) {
      toast.error("Failed to load service details");
    }
  };

  const handleRefresh = async () => {
    if (editingService) {
      await loadServiceDetail(editingService.id);
    }
    await fetchServices();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const buildPayload = () => ({
    title: form.title, slug: form.slug, tagline: form.tagline, description: form.description,
    icon_name: form.icon_name, number: form.number, href: form.href,
    tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    hero_breadcrumb: form.hero_breadcrumb, hero_title: form.hero_title,
    hero_highlight: form.hero_highlight, hero_description: form.hero_description,
    hero_pills: form.hero_pills.split(",").map(t => t.trim()).filter(Boolean),
    hero_image: form.hero_image, hero_stat_title: form.hero_stat_title,
    hero_stat_text: form.hero_stat_text, hero_cta1_text: form.hero_cta1_text,
    hero_cta1_link: form.hero_cta1_link, hero_cta2_text: form.hero_cta2_text,
    hero_cta2_link: form.hero_cta2_link, is_active: form.is_active,
    display_order: parseInt(form.display_order) || 0,
  });

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and Slug are required");
      return;
    }
    try {
      setSubmitting(true);
      const payload = buildPayload();
      if (editingService) {
        await api.updateService(editingService.id, payload);
        toast.success(`"${form.title}" updated`);
      } else {
        await api.createService(payload);
        toast.success(`"${form.title}" created`);
      }
      await fetchServices();
      if (editingService) {
        await loadServiceDetail(editingService.id);
      } else {
        backToList();
      }
    } catch (err) {
      toast.error("Failed to save service");
    } finally {
      setSubmitting(false);
    }
  };

  const backToList = () => {
    setShowForm(false);
    setEditingService(null);
    setForm(initialForm);
    setActiveTab("info");
  };

  const confirmDelete = (item) => { setItemToDelete(item); setShowDeleteConfirm(true); };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setSubmitting(true);
      await api.deleteService(itemToDelete.id);
      toast.success("Service deleted");
      await fetchServices();
    } catch (err) {
      toast.error("Failed to delete service");
    } finally {
      setSubmitting(false);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await api.uploadServiceImage(file);
      setForm({ ...form, [field]: result.url });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Failed to upload image");
    }
  };

  const handleAddSection = async (sectionData) => {
    try {
      let parsedExtra = {};
      try { parsedExtra = JSON.parse(sectionData.extra_data || "{}"); } catch { parsedExtra = {}; }
      await api.createSection(editingService.id, {
        ...sectionData,
        display_order: parseInt(sectionData.display_order) || 0,
        extra_data: parsedExtra,
      });
      toast.success("Section added");
      setAddingSection(false);
      await handleRefresh();
    } catch (err) {
      toast.error("Failed to add section");
    }
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────

  const renderInput = (label, name, placeholder, type = "text") => (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
      {type === "textarea" ? (
        <textarea name={name} value={form[name]} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder={placeholder} />
      ) : (
        <input type={type} name={name} value={form[name]} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder={placeholder} />
      )}
    </div>
  );

  const renderImageField = (label, name) => (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
      <div className="flex gap-2">
        <input name={name} value={form[name]} onChange={handleChange} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="/api/uploads/services/..." />
        <label className="bg-secondary text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-secondary/90 transition-colors cursor-pointer flex items-center gap-1 flex-shrink-0">
          <Upload size={14} />Upload
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, name)} className="hidden" />
        </label>
      </div>
      {form[name] && (
        <div className="mt-2">
          <img src={form[name].startsWith("/api/") ? `${API_BASE}${form[name]}` : form[name]} alt="Preview" className="h-20 rounded-lg object-cover border" onError={(e) => e.target.style.display = 'none'} />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            {showForm && (
              <button onClick={backToList} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-2 transition-colors">Back to Services</button>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
              Services <span className="text-secondary">Management</span>
            </h1>
            <p className="text-sm text-gray-600 mt-1">{showForm ? (editingService ? `Editing: ${editingService.title}` : "Create new service") : "Manage your service pages"}</p>
          </div>
          {!showForm && (
            <button onClick={() => { setForm(initialForm); setEditingService(null); setShowForm(true); }} className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
              <Plus size={20} />Add Service
            </button>
          )}
        </div>

        {loading && <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" /></div>}
        {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg flex justify-between"><span>{error}</span><button onClick={fetchServices} className="font-semibold underline">Retry</button></div>}

        {/* ─── LIST VIEW ─── */}
        {!loading && !error && !showForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all hover:border-secondary/30 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl font-black text-gray-100">{service.number}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${service.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {service.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-1">{service.title}</h3>
                <p className="text-xs text-secondary font-bold uppercase mb-2">{service.tagline}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">{service.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {(service.tags || []).slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-3 pt-3 border-t border-gray-100">
                  <button onClick={() => loadServiceDetail(service.id)} className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    <Edit2 size={16} />Edit
                  </button>
                  <button onClick={() => confirmDelete(service)} className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    <Trash2 size={16} />Delete
                  </button>
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="col-span-full bg-white rounded-2xl border border-gray-200 border-dashed p-12 text-center text-gray-500">
                No services found. Click "Add Service" to create one.
              </div>
            )}
          </div>
        )}

        {/* ─── EDIT VIEW ─── */}
        {showForm && (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 overflow-x-auto">
              {[
                { key: "info", label: "Service Info" },
                { key: "hero", label: "Hero / Banner" },
                { key: "sections", label: `Sections${editingService ? ` (${(editingService.sections || []).length})` : ""}`, disabled: !editingService },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => !tab.disabled && setActiveTab(tab.key)}
                  disabled={tab.disabled}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? "bg-secondary text-white shadow-sm"
                      : tab.disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ─── SERVICE INFO TAB ─── */}
            {activeTab === "info" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderInput("Service Title *", "title", "Feasibility & Pilot Plant Study")}
                  {renderInput("Slug *", "slug", "feasibility")}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {renderInput("Tagline", "tagline", "De-Risk Before You Invest")}
                  {renderInput("Number", "number", "01")}
                  {renderInput("Icon Name", "icon_name", "FlaskConical")}
                </div>
                {renderInput("Description", "description", "Service description...", "textarea")}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderInput("Route / href", "href", "/services/feasibility")}
                  {renderInput("Tags (comma-separated)", "tags", "Technical Feasibility, Pilot Plant Design")}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderInput("Display Order", "display_order", "1", "number")}
                  <div className="flex items-center gap-3 pt-6">
                    <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-secondary" />
                    <label className="text-sm font-bold text-gray-700">Active (visible on frontend)</label>
                  </div>
                </div>
              </div>
            )}

            {/* ─── HERO TAB ─── */}
            {activeTab === "hero" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                {renderInput("Hero Breadcrumb", "hero_breadcrumb", "Services / Feasibility & Pilot Plant Study")}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderInput("Hero Title", "hero_title", "Feasibility & Pilot Plant")}
                  {renderInput("Hero Highlight", "hero_highlight", "Studies")}
                </div>
                {renderInput("Hero Description", "hero_description", "Reva evaluates technical feasibility...", "textarea")}
                {renderInput("Hero Pills (comma-separated)", "hero_pills", "Technical Feasibility, Economic Viability, ...")}
                {renderImageField("Hero Image", "hero_image")}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderInput("Stat Title", "hero_stat_title", "De-Risk First")}
                  {renderInput("Stat Text", "hero_stat_text", "Validate before full-scale investment")}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderInput("CTA 1 Text", "hero_cta1_text", "Discuss Your Study")}
                  {renderInput("CTA 1 Link", "hero_cta1_link", "/contact")}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderInput("CTA 2 Text", "hero_cta2_text", "View All Services")}
                  {renderInput("CTA 2 Link", "hero_cta2_link", "/services")}
                </div>
              </div>
            )}

            {/* ─── SECTIONS TAB ─── */}
            {activeTab === "sections" && editingService && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2"><Layers size={20} />Sections</h3>
                  <button onClick={() => setAddingSection(true)} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary/90 transition-colors">
                    <Plus size={16} />Add Section
                  </button>
                </div>

                {addingSection && (
                  <div className="border border-green-200 bg-green-50/50 rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-bold text-green-700">New Section</h4>
                    <NewSectionForm onSave={handleAddSection} onCancel={() => setAddingSection(false)} />
                  </div>
                )}

                {(editingService.sections || []).map((section) => (
                  <SectionEditor
                    key={section.id}
                    section={section}
                    serviceId={editingService.id}
                    onRefresh={handleRefresh}
                  />
                ))}

                {(editingService.sections || []).length === 0 && !addingSection && (
                  <div className="bg-white rounded-xl border border-gray-200 border-dashed p-8 text-center text-gray-500">
                    No sections yet. Click "Add Section" to create one.
                  </div>
                )}
              </div>
            )}

            {/* Save Button */}
            {activeTab !== "sections" && (
              <div className="flex gap-4">
                <button onClick={handleSubmit} disabled={submitting} className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors disabled:opacity-70 flex items-center gap-2">
                  <Save size={16} />
                  {submitting ? "Saving..." : editingService ? "Update Service" : "Create Service"}
                </button>
                <button onClick={backToList} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              </div>
            )}
          </div>
        )}
      </div>

      <AdminConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Service?"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This will remove all sections and items. This cannot be undone.`}
        confirmText={submitting ? "Deleting..." : "Yes, Delete"}
        type="danger"
      />
    </div>
  );
};

// ─── NEW SECTION FORM ────────────────────────────────────────────────────────
const NewSectionForm = ({ onSave, onCancel }) => {
  const [form, setForm] = useState({
    section_key: "", section_label: "", title: "", title_highlight: "",
    description: "", image: "", extra_data: "{}", display_order: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Section Key</label>
          <input name="section_key" value={form.section_key} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g. services, workflow" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Section Label</label>
          <input name="section_label" value={form.section_label} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g. What We Offer" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Display Order</label>
          <input name="display_order" type="number" value={form.display_order} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Title Highlight</label>
          <input name="title_highlight" value={form.title_highlight} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1">Extra Data (JSON)</label>
        <textarea name="extra_data" value={form.extra_data} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono" />
      </div>
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary/90 transition-colors flex items-center gap-1"><Plus size={14} />Add Section</button>
        <button onClick={onCancel} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">Cancel</button>
      </div>
    </div>
  );
};

export default AdminServices;
