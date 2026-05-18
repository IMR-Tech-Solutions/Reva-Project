import React, { useState, useEffect } from "react";
import { Save, Trash2, Plus, ChevronDown, ChevronUp, Pencil, X, Eye, EyeOff, Image, Leaf, Layout } from "lucide-react";
import toast from "react-hot-toast";
import bioremediationApi from "../../services/bioremediationApi";
import AdminConfirmModal from "../Component/AdminConfirmModal";

const API_BASE = import.meta.env.VITE_API_URL;

const SECTIONS_CONFIG = [
  { key: "hero", label: "Hero Section", itemType: "hero-badges", itemLabel: "Feature Badges", fields: ["hero_small_label","hero_main_heading","hero_highlight_text","hero_subtitle","hero_partner_label","hero_partner_name","hero_partner_designation","hero_cta1_text","hero_cta1_link","hero_cta2_text","hero_cta2_link"], imageFields: ["hero_bg_image"], fileKey: "hero_bg_file" },
  { key: "what", label: "What We Mean by Bioremediation", itemType: "features", itemLabel: "Feature Cards", fields: ["what_section_label","what_heading","what_heading_highlight","what_description1","what_description2"], imageFields: ["what_image"], fileKey: "what_image_file", textareas: ["what_description1","what_description2"] },
  { key: "where", label: "Where It Fits", itemType: "applications", itemLabel: "Application Cards", fields: ["where_heading","where_heading_highlight","where_subtitle"], textareas: ["where_subtitle"] },
  { key: "approach", label: "REVA Approach", itemType: "approach-steps", itemLabel: "Steps", secondaryItemType: "approach-highlights", secondaryLabel: "Highlight Cards", fields: ["approach_section_label","approach_heading1","approach_heading2","approach_subtitle","approach_side_description"], textareas: ["approach_side_description"] },
  { key: "toolbox", label: "Solution Toolbox", itemType: "nature-options", itemLabel: "Nature-Based Options", secondaryItemType: "engineered-options", secondaryLabel: "Engineered Options", fields: ["toolbox_heading","toolbox_heading_highlight","toolbox_subtitle","toolbox_bottom_note"], textareas: ["toolbox_subtitle"] },
  { key: "deliverables", label: "What Clients Receive", itemType: "deliverables", itemLabel: "Deliverables", fields: ["deliverables_section_label","deliverables_heading","deliverables_heading_highlight","deliverables_subtitle"] },
  { key: "europe", label: "Dr. Irfan Khan / Europe Leadership", itemType: "focus-areas", itemLabel: "Focus Areas", secondaryItemType: "info-chips", secondaryLabel: "Info Chips", fields: ["europe_section_label","europe_main_heading","europe_subheading","europe_designation_badge","europe_paragraph1","europe_paragraph2"], imageFields: ["europe_profile_image"], fileKey: "europe_profile_file", textareas: ["europe_paragraph1","europe_paragraph2"] },
  { key: "pilot", label: "Example Pilot Systems", itemType: "pilot-images", itemLabel: "Gallery Images", fields: ["pilot_heading","pilot_subtitle"] },
];

const FIELD_LABELS = {
  hero_small_label: "Small Label", hero_main_heading: "Main Heading", hero_highlight_text: "Highlight Text",
  hero_subtitle: "Subtitle", hero_partner_label: "Partner Label", hero_partner_name: "Partner Name",
  hero_partner_designation: "Partner Designation", hero_cta1_text: "CTA 1 Text", hero_cta1_link: "CTA 1 Link",
  hero_cta2_text: "CTA 2 Text", hero_cta2_link: "CTA 2 Link", hero_bg_image: "Background Image",
  what_section_label: "Section Label", what_heading: "Heading", what_heading_highlight: "Highlight Text",
  what_description1: "Description Paragraph 1", what_description2: "Description Paragraph 2", what_image: "Section Image",
  where_heading: "Heading", where_heading_highlight: "Heading Highlight", where_subtitle: "Subtitle/Description",
  approach_section_label: "Section Label", approach_heading1: "Heading Part 1", approach_heading2: "Heading Part 2",
  approach_subtitle: "Subtitle", approach_side_description: "Side Description",
  toolbox_heading: "Heading", toolbox_heading_highlight: "Heading Highlight", toolbox_subtitle: "Subtitle",
  toolbox_bottom_note: "Bottom Note", deliverables_section_label: "Section Label", deliverables_heading: "Heading",
  deliverables_heading_highlight: "Heading Highlight", deliverables_subtitle: "Subtitle Badge",
  europe_section_label: "Section Label", europe_main_heading: "Main Heading", europe_subheading: "Subheading",
  europe_designation_badge: "Designation Badge", europe_paragraph1: "Paragraph 1", europe_paragraph2: "Paragraph 2",
  europe_profile_image: "Profile Image", pilot_heading: "Heading", pilot_subtitle: "Subtitle Note",
};

const AdminBioremediation = () => {
  const [content, setContent] = useState({});
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingContent, setSavingContent] = useState(false);
  const [savingItem, setSavingItem] = useState(false);
  const [openSections, setOpenSections] = useState({ hero: true });
  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentItemType, setCurrentItemType] = useState("");
  const [itemForm, setItemForm] = useState({ title: "", description: "", icon_name: "", image: "", number: "", text: "", caption: "", order: 0, is_active: true });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, type: "", title: "" });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const data = await bioremediationApi.getAll();
      if (data?.content) setContent(data.content);
      const itemsMap = {};
      const types = ["hero-badges","features","applications","approach-steps","approach-highlights","nature-options","engineered-options","deliverables","focus-areas","info-chips","pilot-images"];
      for (const t of types) {
        try { itemsMap[t] = await bioremediationApi.getItems(t); } catch { itemsMap[t] = data?.[t.replace(/-/g,"_")] || []; }
      }
      setItems(itemsMap);
    } catch (err) { toast.error("Failed to load data"); console.error(err); } finally { setLoading(false); }
  };

  const handleContentChange = (field, value) => setContent(prev => ({ ...prev, [field]: value }));

  const handleFileChange = (fileKey, imageField, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedExtensions.includes(fileExtension) || !allowedMimeTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, and WEBP images are allowed.");
      e.target.value = "";
      return;
    }
    setFiles(prev => ({ ...prev, [fileKey]: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreviews(prev => ({ ...prev, [imageField]: reader.result }));
    reader.readAsDataURL(file);
  };

  const saveContent = async () => {
    try {
      setSavingContent(true);
      const contentData = { ...content };
      delete contentData.id; delete contentData.created_at; delete contentData.updated_at;
      await bioremediationApi.updateContent(contentData, files);
      setFiles({});
      toast.success("Content saved successfully!");
    } catch { toast.error("Failed to save content"); } finally { setSavingContent(false); }
  };

  const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const openAddModal = (itemType) => {
    setEditingItem(null);
    setCurrentItemType(itemType);
    setItemForm({ title: "", description: "", icon_name: "", image: "", number: "", text: "", caption: "", order: (items[itemType]?.length || 0) + 1, is_active: true });
    setShowItemModal(true);
  };

  const openEditModal = (itemType, item) => {
    setEditingItem(item);
    setCurrentItemType(itemType);
    setItemForm({ title: item.title || "", description: item.description || "", icon_name: item.icon_name || "", image: item.image || "", number: item.number || "", text: item.text || "", caption: item.caption || "", order: item.order || 0, is_active: item.is_active !== false });
    setShowItemModal(true);
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    if (!itemForm.title?.trim() && !itemForm.text?.trim()) { toast.error("Title is required"); return; }
    try {
      setSavingItem(true);
      if (editingItem) {
        const updated = await bioremediationApi.updateItem(currentItemType, editingItem.id, itemForm);
        setItems(prev => ({ ...prev, [currentItemType]: prev[currentItemType].map(i => i.id === editingItem.id ? updated : i).sort((a,b) => a.order - b.order) }));
        toast.success("Item updated!");
      } else {
        const created = await bioremediationApi.createItem(currentItemType, itemForm);
        setItems(prev => ({ ...prev, [currentItemType]: [...(prev[currentItemType]||[]), created].sort((a,b) => a.order - b.order) }));
        toast.success("Item created!");
      }
      setShowItemModal(false);
    } catch { toast.error(editingItem ? "Failed to update" : "Failed to create"); } finally { setSavingItem(false); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
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
      const result = await bioremediationApi.uploadImage(file);
      setItemForm(prev => ({ ...prev, image: result.url }));
      toast.success("Image uploaded!");
    } catch { toast.error("Image upload failed"); }
  };

  const handleDeleteConfirm = async () => {
    try {
      await bioremediationApi.deleteItem(deleteConfirm.type, deleteConfirm.id);
      setItems(prev => ({ ...prev, [deleteConfirm.type]: prev[deleteConfirm.type].filter(i => i.id !== deleteConfirm.id) }));
      toast.success("Item deleted!");
    } catch { toast.error("Failed to delete"); } finally { setDeleteConfirm({ show: false, id: null, type: "", title: "" }); }
  };

  const toggleActive = async (itemType, item) => {
    try {
      const updated = await bioremediationApi.updateItem(itemType, item.id, { ...item, is_active: !item.is_active });
      setItems(prev => ({ ...prev, [itemType]: prev[itemType].map(i => i.id === item.id ? updated : i) }));
      toast.success(updated.is_active ? "Activated" : "Deactivated");
    } catch { toast.error("Failed to toggle"); }
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    if (path.startsWith("/api/")) return `${API_BASE}${path}`;
    return path;
  };

  if (loading) return (
    <div className="p-12 text-center text-gray-500 font-medium">
      <div className="animate-pulse flex flex-col items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-xl" />
        <span>Loading bioremediation data...</span>
      </div>
    </div>
  );

  const renderItemsList = (itemType, label) => {
    const list = items[itemType] || [];
    return (
      <div className="mt-6 border-t border-gray-100 pt-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2"><Layout size={16} /> {label} ({list.length})</h4>
          <button onClick={() => openAddModal(itemType)} className="bg-primary text-secondary px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 text-xs shadow-md active:scale-[0.98]">
            <Plus size={14} /> Add
          </button>
        </div>
        {list.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Layout size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No items yet. Click "Add" to create.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {list.map((item) => (
              <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${item.is_active ? "bg-white border-gray-100 hover:border-primary/30" : "bg-gray-50/50 border-gray-100 opacity-60"}`}>
                {item.image && <img src={getImageUrl(item.image)} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0" onError={e => e.currentTarget.style.display='none'} />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-300">#{item.order || 0}</span>
                    <h5 className="font-bold text-gray-800 truncate text-sm">{item.title || item.text || "Untitled"}</h5>
                    {item.number && <span className="text-[10px] font-bold bg-primary/5 text-primary px-1.5 py-0.5 rounded">{item.number}</span>}
                    {!item.is_active && <span className="text-[10px] font-bold bg-red-50 text-red-400 px-2 py-0.5 rounded-full">INACTIVE</span>}
                  </div>
                  {(item.description || item.caption) && <p className="text-xs text-gray-400 truncate mt-0.5">{item.description || item.caption}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggleActive(itemType, item)} className={`p-1.5 rounded-lg transition-colors ${item.is_active ? "text-green-500 hover:bg-green-50" : "text-gray-300 hover:bg-gray-100"}`}>
                    {item.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => openEditModal(itemType, item)} className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-50"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteConfirm({ show: true, id: item.id, type: itemType, title: item.title || item.text || "" })} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4 pb-20">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-3"><Leaf size={28} className="text-secondary" /> Bioremediation Management</h1>
        <p className="text-gray-500 mt-1">Manage all content on the Bioremediation page</p>
      </div>

      {/* Global Save Button */}
      <div className="flex justify-end">
        <button onClick={saveContent} disabled={savingContent} className="bg-primary text-secondary px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 shadow-lg active:scale-[0.98] disabled:opacity-60">
          <Save size={18} /> {savingContent ? "Saving..." : "Save All Content"}
        </button>
      </div>

      {/* Collapsible Section Panels */}
      {SECTIONS_CONFIG.map((section) => (
        <div key={section.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100 overflow-hidden">
          <button onClick={() => toggleSection(section.key)} className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center"><Leaf size={16} className="text-secondary" /></div>
              <h3 className="font-bold text-primary text-lg">{section.label}</h3>
            </div>
            {openSections[section.key] ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          </button>

          {openSections[section.key] && (
            <div className="px-5 pb-5 border-t border-gray-100">
              {/* Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {section.fields.map((field) => (
                  <div key={field} className={section.textareas?.includes(field) ? "md:col-span-2" : ""}>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">{FIELD_LABELS[field] || field}</label>
                    {section.textareas?.includes(field) ? (
                      <textarea rows={3} value={content[field] || ""} onChange={(e) => handleContentChange(field, e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder={`Enter ${FIELD_LABELS[field] || field}...`} />
                    ) : (
                      <input type="text" value={content[field] || ""} onChange={(e) => handleContentChange(field, e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder={`Enter ${FIELD_LABELS[field] || field}...`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Image Upload Fields */}
              {section.imageFields?.map((imgField) => (
                <div key={imgField} className="mt-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">{FIELD_LABELS[imgField] || imgField}</label>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => handleFileChange(section.fileKey, imgField, e)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/5 file:text-primary file:font-bold hover:file:bg-primary/10 file:cursor-pointer" />
                      {content[imgField] && <p className="text-xs text-gray-400 mt-1 truncate">Current: {content[imgField]}</p>}
                    </div>
                    {(previews[imgField] || content[imgField]) && (
                      <img src={previews[imgField] || getImageUrl(content[imgField])} alt="Preview" className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    )}
                  </div>
                </div>
              ))}

              {/* Primary Item List */}
              {section.itemType && renderItemsList(section.itemType, section.itemLabel)}

              {/* Secondary Item List */}
              {section.secondaryItemType && renderItemsList(section.secondaryItemType, section.secondaryLabel)}
            </div>
          )}
        </div>
      ))}

      {/* ADD/EDIT ITEM MODAL */}
      {showItemModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-primary">{editingItem ? "Edit Item" : "Add Item"} — {currentItemType}</h3>
              <button onClick={() => setShowItemModal(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleItemSubmit} className="p-5 space-y-4">
              {currentItemType === "info-chips" ? (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">Text *</label>
                  <input type="text" value={itemForm.text} onChange={(e) => setItemForm({ ...itemForm, text: e.target.value, title: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Germany-Based" required />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">Title *</label>
                    <input type="text" value={itemForm.title} onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Enter title..." required />
                  </div>
                  {!["hero-badges","nature-options","engineered-options"].includes(currentItemType) && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">Description</label>
                      <textarea rows={3} value={itemForm.description} onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Enter description..." />
                    </div>
                  )}
                </>
              )}

              {currentItemType === "pilot-images" && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">Caption</label>
                  <input type="text" value={itemForm.caption} onChange={(e) => setItemForm({ ...itemForm, caption: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Image caption..." />
                </div>
              )}

              {["applications","approach-steps","deliverables","focus-areas"].includes(currentItemType) && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">Number</label>
                  <input type="text" value={itemForm.number} onChange={(e) => setItemForm({ ...itemForm, number: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. 01" />
                </div>
              )}

              {currentItemType !== "info-chips" && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">Icon Name</label>
                  <input type="text" value={itemForm.icon_name} onChange={(e) => setItemForm({ ...itemForm, icon_name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Leaf, Waves, Factory..." />
                </div>
              )}

              {["applications","approach-steps","pilot-images"].includes(currentItemType) && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">Image</label>
                  <div className="flex items-center gap-3">
                    <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleImageUpload} className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-primary/5 file:text-primary file:font-bold hover:file:bg-primary/10 file:cursor-pointer" />
                    {itemForm.image && <img src={getImageUrl(itemForm.image)} alt="" className="w-14 h-14 rounded-lg object-cover border border-gray-200" onError={e => e.currentTarget.style.display='none'} />}
                  </div>
                  {itemForm.image && <p className="text-xs text-gray-400 mt-1 truncate">{itemForm.image}</p>}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">Order</label>
                  <input type="number" value={itemForm.order} onChange={(e) => setItemForm({ ...itemForm, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" min="0" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-widest">Status</label>
                  <button type="button" onClick={() => setItemForm({ ...itemForm, is_active: !itemForm.is_active })} className={`w-full px-4 py-3 rounded-xl font-bold text-sm border-2 transition-all ${itemForm.is_active ? "border-green-200 bg-green-50 text-green-600" : "border-red-200 bg-red-50 text-red-500"}`}>
                    {itemForm.is_active ? "✓ Active" : "✗ Inactive"}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setShowItemModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-400 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={savingItem} className="bg-primary text-secondary px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 shadow-lg active:scale-[0.98] disabled:opacity-60">
                  <Save size={16} /> {savingItem ? "Saving..." : editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      <AdminConfirmModal isOpen={deleteConfirm.show} title="Delete Item" message={`Delete "${deleteConfirm.title}"? This cannot be undone.`} onConfirm={handleDeleteConfirm} onClose={() => setDeleteConfirm({ show: false, id: null, type: "", title: "" })} confirmText="Delete" type="danger" />
    </div>
  );
};

export default AdminBioremediation;
