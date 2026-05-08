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
  Star,
  Layout,
} from "lucide-react";
import toast from "react-hot-toast";
import aboutApi from "../../services/aboutApi";
import AdminConfirmModal from "../Component/AdminConfirmModal";

const ICON_OPTIONS = [
  "LuHardHat",
  "LuClock",
  "LuPencilRuler",
  "LuFactory",
  "LuUsers",
  "LuLock",
  "LuFileBadge",
  "LuSettings",
  "LuShield",
  "LuZap",
  "LuTarget",
  "LuAward",
  "LuLayers",
  "LuWrench",
  "LuGlobe",
  "LuTrendingUp",
  "LuHeart",
  "LuCpu",
  "LuChartBar",
];

const AdminWhatSetsUsApart = () => {
  // --- Section Content State ---
  const [sectionContent, setSectionContent] = useState({
    label: "",
    heading: "",
    description: "",
  });

  // --- Items State ---
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
    icon: "LuHardHat",
    order: 0,
    is_active: true,
  });

  // =====================================================================
  // Data Fetching
  // =====================================================================

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [contentRes, itemsRes] = await Promise.all([
        aboutApi.getWhatSetsUsApart(),
        aboutApi.getWhatSetsUsApartItems(),
      ]);
      if (contentRes?.content) {
        setSectionContent({
          label: contentRes.content.label || "",
          heading: contentRes.content.heading || "",
          description: contentRes.content.description || "",
        });
      }
      if (itemsRes) {
        setItems(itemsRes.sort((a, b) => a.order - b.order));
      }
    } catch (error) {
      toast.error("Failed to load section data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================================
  // Section Content Handlers
  // =====================================================================

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    if (!sectionContent.heading?.trim()) {
      toast.error("Heading is required");
      return;
    }
    try {
      setSavingContent(true);
      await aboutApi.updateWhatSetsUsApartContent(sectionContent);
      toast.success("Section content updated successfully!");
    } catch (error) {
      toast.error("Failed to update section content");
    } finally {
      setSavingContent(false);
    }
  };

  // =====================================================================
  // Item CRUD Handlers
  // =====================================================================

  const openAddModal = () => {
    setEditingItem(null);
    setItemForm({
      title: "",
      description: "",
      icon: "LuHardHat",
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
      icon: item.icon || "LuHardHat",
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
        const updated = await aboutApi.updateWhatSetsUsApartItem(editingItem.id, itemForm);
        setItems((prev) =>
          prev.map((i) => (i.id === editingItem.id ? updated : i)).sort((a, b) => a.order - b.order)
        );
        toast.success("Feature point updated!");
      } else {
        const created = await aboutApi.createWhatSetsUsApartItem(itemForm);
        setItems((prev) => [...prev, created].sort((a, b) => a.order - b.order));
        toast.success("Feature point created!");
      }
      setShowItemModal(false);
    } catch (error) {
      toast.error(editingItem ? "Failed to update item" : "Failed to create item");
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await aboutApi.deleteWhatSetsUsApartItem(deleteConfirm.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteConfirm.id));
      toast.success("Feature point deleted!");
    } catch (error) {
      toast.error("Failed to delete item");
    } finally {
      setDeleteConfirm({ show: false, id: null, title: "" });
    }
  };

  const toggleActive = async (item) => {
    try {
      const updated = await aboutApi.updateWhatSetsUsApartItem(item.id, {
        ...item,
        is_active: !item.is_active,
      });
      setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
      toast.success(updated.is_active ? "Feature activated" : "Feature deactivated");
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
        aboutApi.updateWhatSetsUsApartItem(item.id, { ...item, order: otherItem.order }),
        aboutApi.updateWhatSetsUsApartItem(otherItem.id, { ...otherItem, order: item.order }),
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

  // =====================================================================
  // Render
  // =====================================================================

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500 font-medium">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          <span>Loading section contents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">What Sets Us Apart</h1>
        <p className="text-gray-500">
          Manage the "What Sets Us Apart?" section shown on the About page
        </p>
      </div>

      {/* ============================================================= */}
      {/* SECTION CONTENT CARD                                          */}
      {/* ============================================================= */}
      <form onSubmit={handleContentSubmit}>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100">
          <div className="flex items-center gap-2 text-primary font-bold border-b pb-3 mb-5">
            <Layout size={20} className="text-primary" />
            <h3>Section Content Configuration</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
                Small Label
              </label>
              <input
                type="text"
                value={sectionContent.label}
                onChange={(e) =>
                  setSectionContent({ ...sectionContent, label: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="e.g. WHY CHOOSE REVA"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
                Main Heading
              </label>
              <input
                type="text"
                value={sectionContent.heading}
                onChange={(e) =>
                  setSectionContent({ ...sectionContent, heading: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="e.g. What Sets Us Apart?"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">
              Intro Description
            </label>
            <textarea
              rows={3}
              value={sectionContent.description}
              onChange={(e) =>
                setSectionContent({ ...sectionContent, description: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Enter the introductory paragraph for this section..."
            />
          </div>

          <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={savingContent}
              className="bg-primary text-secondary px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 transition-all shadow-lg active:scale-[0.98] disabled:opacity-60"
            >
              <Save size={18} className="text-secondary" />
              {savingContent ? "Saving..." : "Save Content"}
            </button>
          </div>
        </div>
      </form>

      {/* ============================================================= */}
      {/* FEATURE ITEMS CARD                                            */}
      {/* ============================================================= */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100">
        <div className="flex items-center justify-between border-b pb-3 mb-5">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Star size={20} className="text-primary" />
            <h3>Feature Points ({items.length})</h3>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-secondary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 transition-all shadow-md text-sm active:scale-[0.98]"
          >
            <Plus size={16} /> Add Feature
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Star size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No feature points yet</p>
            <p className="text-sm mt-1">Click "Add Feature" to create your first point</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  item.is_active
                    ? "bg-white border-gray-100 hover:border-primary/30 hover:shadow-sm"
                    : "bg-gray-50/50 border-gray-100 opacity-60"
                }`}
              >
                {/* Drag Handle + Order */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => moveItem(item, "up")}
                    disabled={idx === 0}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed text-gray-400 hover:text-primary transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <div className="text-xs font-bold text-gray-300 w-6 text-center">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <button
                    onClick={() => moveItem(item, "down")}
                    disabled={idx === items.length - 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed text-gray-400 hover:text-primary transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>

                {/* Icon Badge */}
                <div className="w-11 h-11 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-primary/60 text-center leading-tight">
                    {item.icon?.replace("Lu", "")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-800 truncate">{item.title}</h4>
                    {!item.is_active && (
                      <span className="text-[10px] font-bold bg-red-50 text-red-400 px-2 py-0.5 rounded-full">
                        INACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate mt-0.5">
                    {item.description || "No description"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(item)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.is_active
                        ? "text-green-500 hover:bg-green-50"
                        : "text-gray-300 hover:bg-gray-100"
                    }`}
                    title={item.is_active ? "Deactivate" : "Activate"}
                  >
                    {item.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-lg text-blue-400 hover:bg-blue-50 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteConfirm({ show: true, id: item.id, title: item.title })
                    }
                    className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================= */}
      {/* ADD / EDIT ITEM MODAL                                         */}
      {/* ============================================================= */}
      {showItemModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-primary">
                {editingItem ? "Edit Feature Point" : "Add Feature Point"}
              </h3>
              <button
                onClick={() => setShowItemModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleItemSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Title *
                </label>
                <input
                  type="text"
                  value={itemForm.title}
                  onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g. Superior Expertise"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Describe this feature point..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Icon
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_OPTIONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setItemForm({ ...itemForm, icon })}
                      className={`p-2 rounded-xl text-center text-[9px] font-bold transition-all border-2 ${
                        itemForm.icon === icon
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      {icon.replace("Lu", "")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={itemForm.order}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                    Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setItemForm({ ...itemForm, is_active: !itemForm.is_active })}
                    className={`w-full px-4 py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                      itemForm.is_active
                        ? "border-green-200 bg-green-50 text-green-600"
                        : "border-red-200 bg-red-50 text-red-500"
                    }`}
                  >
                    {itemForm.is_active ? "✓ Active" : "✗ Inactive"}
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="bg-primary text-secondary px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 transition-all shadow-lg active:scale-[0.98] disabled:opacity-60"
                >
                  <Save size={16} />
                  {savingItem
                    ? "Saving..."
                    : editingItem
                    ? "Update Feature"
                    : "Create Feature"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* DELETE CONFIRMATION MODAL                                     */}
      {/* ============================================================= */}
      {deleteConfirm.show && (
        <AdminConfirmModal
          isOpen={deleteConfirm.show}
          title="Delete Feature Point"
          message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteConfirm({ show: false, id: null, title: "" })}
          confirmText="Delete"
          type="danger"
        />
      )}
    </div>
  );
};

export default AdminWhatSetsUsApart;
