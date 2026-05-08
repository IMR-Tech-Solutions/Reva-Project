import React, { useState, useEffect } from "react";
import {
  Save,
  Trash2,
  Plus,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Pencil,
  X,
  Layout,
  BarChart3,
  Tag,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";
import AdminConfirmModal from "../Component/AdminConfirmModal";

const WorkInActionDashboard = () => {
  // --- Section Content State ---
  const [sectionContent, setSectionContent] = useState({
    label: "",
    heading1: "",
    heading2: "",
    description: "",
    image: "",
    scope_title: "",
    scope_content: "",
    stats: []
  });

  // --- Items State (Project Tags) ---
  const [items, setItems] = useState([]);

  // --- UI State ---
  const [loading, setLoading] = useState(true);
  const [savingContent, setSavingContent] = useState(false);
  const [savingItem, setSavingItem] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, title: "" });

  // --- Item Form State ---
  const [itemForm, setItemForm] = useState({
    title: "",
    description: "",
    icon: "",
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const response = await api.getWorkInAction();
      if (response.content) {
        setSectionContent(response.content);
      }
      const adminItems = await api.getWorkInActionItems();
      if (adminItems) {
        setItems(adminItems.sort((a, b) => a.order - b.order));
      }
    } catch (error) {
      toast.error("Failed to load section data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    try {
      setSavingContent(true);
      await api.updateWorkInActionContent(sectionContent);
      toast.success("Section content updated successfully!");
    } catch (error) {
      toast.error("Failed to update section content");
    } finally {
      setSavingContent(false);
    }
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...sectionContent.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setSectionContent({ ...sectionContent, stats: newStats });
  };

  const openAddModal = () => {
    setEditingItem(null);
    setItemForm({
      title: "",
      description: "",
      icon: "",
      order: items.length + 1,
      is_active: true,
    });
    setShowItemModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setItemForm({
      title: item.title,
      description: item.description || "",
      icon: item.icon || "",
      order: item.order,
      is_active: item.is_active,
    });
    setShowItemModal(true);
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    if (!itemForm.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    try {
      setSavingItem(true);
      if (editingItem) {
        const updated = await api.updateWorkInActionItem(editingItem.id, itemForm);
        setItems((prev) =>
          prev.map((i) => (i.id === editingItem.id ? updated : i)).sort((a, b) => a.order - b.order)
        );
        toast.success("Project tag updated!");
      } else {
        const created = await api.createWorkInActionItem(itemForm);
        setItems((prev) => [...prev, created].sort((a, b) => a.order - b.order));
        toast.success("Project tag created!");
      }
      setShowItemModal(false);
    } catch (error) {
      toast.error(editingItem ? "Failed to update tag" : "Failed to create tag");
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.deleteWorkInActionItem(deleteConfirm.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteConfirm.id));
      toast.success("Project tag deleted!");
    } catch (error) {
      toast.error("Failed to delete tag");
    } finally {
      setDeleteConfirm({ show: false, id: null, title: "" });
    }
  };

  const toggleActive = async (item) => {
    try {
      const updated = await api.updateWorkInActionItem(item.id, {
        ...item,
        is_active: !item.is_active,
      });
      setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
      toast.success(updated.is_active ? "Tag activated" : "Tag deactivated");
    } catch (error) {
      toast.error("Failed to toggle status");
    }
  };

  const moveItem = async (item, direction) => {
    const sorted = [...items].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((i) => i.id === item.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const otherItem = sorted[swapIdx];
    try {
      const [updated1, updated2] = await Promise.all([
        api.updateWorkInActionItem(item.id, { ...item, order: otherItem.order }),
        api.updateWorkInActionItem(otherItem.id, { ...otherItem, order: item.order }),
      ]);
      setItems((prev) =>
        prev
          .map((i) => {
            if (i.id === item.id) return updated1;
            if (i.id === otherItem.id) return updated2;
            return i;
          })
          .sort((a, b) => a.order - b.order)
      );
    } catch (error) {
      toast.error("Failed to reorder");
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500 font-medium text-xs uppercase tracking-widest">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          <span>Loading Work In Action data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20 font-sans">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Work In Action</h1>
        <p className="text-gray-500">
          Manage the "Proven Credentials" section on the Home page
        </p>
      </div>

      <form onSubmit={handleContentSubmit}>
        <div className="space-y-6">
          {/* Main Content Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100 text-xs">
            <div className="flex items-center gap-2 text-primary font-bold border-b pb-3 mb-5">
              <Layout size={20} />
              <h3 className="uppercase tracking-widest">Main Section Content</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
                  Label
                </label>
                <input
                  type="text"
                  value={sectionContent.label}
                  onChange={(e) => setSectionContent({ ...sectionContent, label: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
                  Heading Part 1
                </label>
                <input
                  type="text"
                  value={sectionContent.heading1}
                  onChange={(e) => setSectionContent({ ...sectionContent, heading1: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
                  Heading Part 2
                </label>
                <input
                  type="text"
                  value={sectionContent.heading2}
                  onChange={(e) => setSectionContent({ ...sectionContent, heading2: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={sectionContent.description}
                  onChange={(e) => setSectionContent({ ...sectionContent, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Scope Badge & Image Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100 text-xs">
            <div className="flex items-center gap-2 text-primary font-bold border-b pb-3 mb-5">
              <Tag size={20} />
              <h3 className="uppercase tracking-widest">Scope Badge & Image</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div>
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
                  Scope Title
                </label>
                <input
                  type="text"
                  value={sectionContent.scope_title}
                  onChange={(e) => setSectionContent({ ...sectionContent, scope_title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
                  Image Path
                </label>
                <input
                  type="text"
                  value={sectionContent.image}
                  onChange={(e) => setSectionContent({ ...sectionContent, image: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="./hero3.png or API URL"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
                  Scope Content
                </label>
                <textarea
                  rows={2}
                  value={sectionContent.scope_content}
                  onChange={(e) => setSectionContent({ ...sectionContent, scope_content: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100 text-xs">
            <div className="flex items-center gap-2 text-primary font-bold border-b pb-3 mb-5">
              <BarChart3 size={20} />
              <h3 className="uppercase tracking-widest">Counters / Statistics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sectionContent.stats.map((stat, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-gray-300">STAT {idx + 1}</span>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-400 uppercase mb-1">Number</label>
                    <input
                      type="number"
                      value={stat.number}
                      onChange={(e) => handleStatChange(idx, "number", parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-400 uppercase mb-1">Suffix (e.g. +)</label>
                    <input
                      type="text"
                      value={stat.suffix}
                      onChange={(e) => handleStatChange(idx, "suffix", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-400 uppercase mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-400 uppercase mb-1">Color Class</label>
                    <select
                      value={stat.color}
                      onChange={(e) => handleStatChange(idx, "color", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                    >
                      <option value="text-primary">Primary (Navy)</option>
                      <option value="text-secondary">Secondary (Gold)</option>
                      <option value="text-accent">Accent (Orange/Red)</option>
                      <option value="text-blue-600">Blue</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={savingContent}
              className="bg-primary text-secondary px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 transition-all shadow-xl active:scale-[0.98] disabled:opacity-60 uppercase tracking-widest text-sm"
            >
              <Save size={20} />
              {savingContent ? "Saving..." : "Save All Content & Stats"}
            </button>
          </div>
        </div>
      </form>

      {/* Feature Items Card (Project Tags) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100 mt-8 text-xs">
        <div className="flex items-center justify-between border-b pb-3 mb-5">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Tag size={20} />
            <h3 className="uppercase tracking-widest">Project Reference Tags ({items.length})</h3>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-secondary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 transition-all shadow-md text-xs active:scale-[0.98] uppercase tracking-widest"
          >
            <Plus size={16} /> Add Tag
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`group flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${
                item.is_active
                  ? "bg-white border-primary/20 text-primary shadow-sm"
                  : "bg-gray-50 border-gray-100 text-gray-400 opacity-60"
              }`}
            >
              <span className="text-sm font-bold">{item.title}</span>
              <div className="flex items-center gap-1 overflow-hidden w-0 group-hover:w-auto transition-all duration-300">
                <button
                   onClick={() => moveItem(item, "up")}
                   disabled={idx === 0}
                   className="p-1 hover:text-secondary disabled:opacity-20"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                   onClick={() => moveItem(item, "down")}
                   disabled={idx === items.length - 1}
                   className="p-1 hover:text-secondary disabled:opacity-20"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1 hover:text-blue-500"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => toggleActive(item)}
                  className="p-1 hover:text-green-500"
                >
                  {item.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button
                  onClick={() => setDeleteConfirm({ show: true, id: item.id, title: item.title })}
                  className="p-1 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md text-xs">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-primary uppercase tracking-widest">
                {editingItem ? "Edit Project Tag" : "Add Project Tag"}
              </h3>
              <button
                onClick={() => setShowItemModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleItemSubmit} className="p-6 space-y-5">
              <div>
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Tag Title *
                </label>
                <input
                  type="text"
                  value={itemForm.title}
                  onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="e.g. Biomass to CBG"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="Optional description"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Icon (Class Name)
                </label>
                <input
                  type="text"
                  value={itemForm.icon}
                  onChange={(e) => setItemForm({ ...itemForm, icon: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="e.g. LuHardHat"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest">
                    Order
                  </label>
                  <input
                    type="number"
                    value={itemForm.order}
                    onChange={(e) => setItemForm({ ...itemForm, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-2 tracking-widest">
                    Active
                  </label>
                  <button
                    type="button"
                    onClick={() => setItemForm({ ...itemForm, is_active: !itemForm.is_active })}
                    className={`w-full px-4 py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                      itemForm.is_active ? "border-green-200 bg-green-50 text-green-600" : "border-red-200 bg-red-50 text-red-500"
                    }`}
                  >
                    {itemForm.is_active ? "Yes" : "No"}
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-50 uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="bg-primary text-secondary px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 shadow-lg uppercase tracking-widest text-xs"
                >
                  <Save size={16} />
                  {savingItem ? "Saving..." : editingItem ? "Update" : "Add Tag"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm.show && (
        <AdminConfirmModal
          isOpen={deleteConfirm.show}
          title="Delete Project Tag"
          message={`Are you sure you want to delete "${deleteConfirm.title}"?`}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteConfirm({ show: false, id: null, title: "" })}
          confirmText="Delete"
          type="danger"
        />
      )}
    </div>
  );
};

export default WorkInActionDashboard;
