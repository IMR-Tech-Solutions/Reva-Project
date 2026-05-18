import React, { useState, useEffect } from "react";
import { Save, Layout, Shield, FileText, Plus, Trash2, Globe, Share2, Mail, Phone, MapPin } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/api";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // General Settings State
  const [settings, setSettings] = useState({
    site_name: "",
    site_description: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    facebook: "",
    whatsapp: "",
    linkedin: "",
    instagram: ""
  });

  // Legal Content State (used for both Privacy and Terms)
  const [legalContent, setLegalContent] = useState({
    title: "",
    description: "",
    last_updated: "",
    sections: [],
    contact_email: "",
    contact_phone: "",
    contact_address: ""
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === "general") {
        const data = await api.getSettings();
        if (data) setSettings(data);
      } else {
        const data = await api.getLegalContent(activeTab); // activeTab is 'privacy' or 'terms'
        if (data) setLegalContent(data);
      }
    } catch (error) {
      toast.error(`Failed to load ${activeTab} settings`);
    } finally {
      setLoading(false);
    }
  };

  const [whatsappError, setWhatsappError] = useState("");

  const validateWhatsapp = (num) => {
    const digits = num.replace(/\D/g, "");
    if (num === "") return "";
    if (!/^\d+$/.test(digits)) return "Only digits are allowed (no spaces, dashes, or +).";
    if (digits.length < 7 || digits.length > 15) return "Enter 7–15 digits (e.g. 919999999999 for India).";
    return "";
  };

  const handleSettingsSave = async (e) => {
    e.preventDefault();
    // Block save if WhatsApp number is invalid
    const waErr = validateWhatsapp(settings.whatsapp || "");
    if (waErr) {
      setWhatsappError(waErr);
      toast.error("Please fix the WhatsApp number before saving.");
      return;
    }
    try {
      setSaving(true);
      await api.updateSettings(settings);
      toast.success("General settings updated!");
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  const handleLegalSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateLegalContent(activeTab, legalContent);
      toast.success(`${activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'} updated!`);
    } catch (error) {
      toast.error(`Failed to update ${activeTab}`);
    } finally {
      setSaving(false);
    }
  };

  const addLegalSection = () => {
    setLegalContent({
      ...legalContent,
      sections: [...legalContent.sections, { title: "", content: [""] }]
    });
  };

  const removeLegalSection = (index) => {
    const newSections = legalContent.sections.filter((_, i) => i !== index);
    setLegalContent({ ...legalContent, sections: newSections });
  };

  const handleLegalSectionChange = (index, field, value) => {
    const newSections = [...legalContent.sections];
    newSections[index][field] = value;
    setLegalContent({ ...legalContent, sections: newSections });
  };

  const addParagraph = (sectionIndex) => {
    const newSections = [...legalContent.sections];
    newSections[sectionIndex].content.push("");
    setLegalContent({ ...legalContent, sections: newSections });
  };

  const removeParagraph = (sectionIndex, paraIndex) => {
    const newSections = [...legalContent.sections];
    newSections[sectionIndex].content = newSections[sectionIndex].content.filter((_, i) => i !== paraIndex);
    setLegalContent({ ...legalContent, sections: newSections });
  };

  const handleParagraphChange = (sectionIndex, paraIndex, value) => {
    const newSections = [...legalContent.sections];
    newSections[sectionIndex].content[paraIndex] = value;
    setLegalContent({ ...legalContent, sections: newSections });
  };

  const renderTabButton = (id, label, icon) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition-all ${
        activeTab === id 
        ? "bg-primary text-secondary shadow-lg scale-105" 
        : "text-gray-500 hover:bg-gray-100 hover:text-primary"
      }`}
    >
      {React.createElement(icon, { size: 18 })}
      {label}
    </button>
  );

  if (loading) return <div className="p-12 text-center text-gray-400 font-medium">Loading settings...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-primary">Setting Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Manage global site configuration and legal documentation</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-fit">
        {renderTabButton("general", "General Settings", Globe)}
        {renderTabButton("privacy", "Privacy Policy", Shield)}
        {renderTabButton("terms", "Terms & Conditions", FileText)}
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {activeTab === "general" && (
          <form onSubmit={handleSettingsSave} className="p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b pb-4 mb-2">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                    <Layout className="text-primary" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Identity & Info</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Site Name</label>
                    <input 
                      type="text" 
                      value={settings.site_name} 
                      onChange={(e) => setSettings({...settings, site_name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Site Description</label>
                    <textarea 
                      rows={4}
                      value={settings.site_description} 
                      onChange={(e) => setSettings({...settings, site_description: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b pb-4 pt-4 mb-2">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Global Contact</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Admin Email</label>
                    <input 
                      type="email" 
                      value={settings.contact_email} 
                      onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Global Phone</label>
                    <input 
                      type="text" 
                      value={settings.contact_phone} 
                      onChange={(e) => setSettings({...settings, contact_phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Head Office Address</label>
                    <textarea 
                      rows={2}
                      value={settings.address} 
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b pb-4 mb-2">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                    <Share2 className="text-primary" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Social Connectivity</h3>
                </div>

                <div className="space-y-4">
                  {/* Facebook */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Facebook</label>
                    <input
                      type="url"
                      value={settings.facebook || ""}
                      onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-300"
                      placeholder="https://facebook.com/..."
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={settings.whatsapp || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d]/g, ""); // strip non-digits
                        setSettings({...settings, whatsapp: val});
                        setWhatsappError(validateWhatsapp(val));
                      }}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none transition-all placeholder:text-gray-300 ${
                        whatsappError
                          ? "border-red-400 focus:ring-red-100 focus:border-red-400"
                          : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                      }`}
                      placeholder="e.g. 919999999999 (country code + number)"
                      maxLength={15}
                    />
                    {whatsappError && (
                      <p className="mt-1 text-xs text-red-500 font-medium ml-1">{whatsappError}</p>
                    )}
                    {!whatsappError && settings.whatsapp && (
                      <p className="mt-1 text-xs text-green-600 font-medium ml-1">
                        Link preview: https://wa.me/{settings.whatsapp}
                      </p>
                    )}
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">LinkedIn</label>
                    <input
                      type="url"
                      value={settings.linkedin || ""}
                      onChange={(e) => setSettings({...settings, linkedin: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-300"
                      placeholder="https://linkedin.com/..."
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Instagram</label>
                    <input
                      type="url"
                      value={settings.instagram || ""}
                      onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-300"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex justify-end">
              <button disabled={saving} type="submit" className="flex items-center gap-3 bg-primary text-secondary px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                <Save size={22} />
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        )}

        {(activeTab === "privacy" || activeTab === "terms") && (
          <form onSubmit={handleLegalSave} className="p-8 space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3 space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4 sticky top-4">
                  <div className="flex items-center gap-2 text-primary font-black border-b pb-3 mb-2">
                    <Info className="text-secondary" size={18} />
                    <span>Header Content</span>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Page Title</label>
                    <input 
                      type="text" 
                      value={legalContent.title} 
                      onChange={(e) => setLegalContent({...legalContent, title: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-secondary transition-all font-bold text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Hero Description</label>
                    <textarea 
                      rows={4}
                      value={legalContent.description} 
                      onChange={(e) => setLegalContent({...legalContent, description: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-secondary transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Last Updated Date</label>
                    <input 
                      type="text" 
                      value={legalContent.last_updated} 
                      onChange={(e) => setLegalContent({...legalContent, last_updated: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-secondary transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-black text-primary uppercase mb-4 mt-2">Legal Support Contact</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 bg-white p-2 border border-gray-100 rounded-lg">
                        <Mail size={14} className="text-secondary" />
                        <input type="email" value={legalContent.contact_email} onChange={(e) => setLegalContent({...legalContent, contact_email: e.target.value})} className="bg-transparent text-[11px] focus:outline-none w-full" placeholder="Support Email" />
                      </div>
                      <div className="flex items-center gap-2 bg-white p-2 border border-gray-100 rounded-lg">
                        <Phone size={14} className="text-secondary" />
                        <input type="text" value={legalContent.contact_phone} onChange={(e) => setLegalContent({...legalContent, contact_phone: e.target.value})} className="bg-transparent text-[11px] focus:outline-none w-full" placeholder="Support Phone" />
                      </div>
                      <div className="flex items-center gap-2 bg-white p-2 border border-gray-100 rounded-lg">
                        <MapPin size={14} className="text-secondary" />
                        <textarea rows={2} value={legalContent.contact_address} onChange={(e) => setLegalContent({...legalContent, contact_address: e.target.value})} className="bg-transparent text-[11px] focus:outline-none w-full" placeholder="Contact Address" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 space-y-6">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <h3 className="text-2xl font-black text-primary">Content Sections</h3>
                  <button type="button" onClick={addLegalSection} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
                    <Plus size={16} /> Add Section
                  </button>
                </div>

                <div className="space-y-8 pr-2 max-h-[800px] overflow-y-auto custom-scrollbar">
                  {legalContent.sections.map((section, sIndex) => (
                    <div key={sIndex} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 hover:border-secondary/40 transition-colors">
                      <div className="flex items-center justify-between gap-4">
                        <input 
                          type="text" 
                          value={section.title} 
                          onChange={(e) => handleLegalSectionChange(sIndex, "title", e.target.value)}
                          className="flex-1 text-xl font-bold text-primary bg-transparent border-b-2 border-dashed border-gray-100 focus:border-secondary outline-none py-1"
                          placeholder="Section Title (e.g. Information We Collect)"
                        />
                        <button type="button" onClick={() => removeLegalSection(sIndex)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="space-y-3 pl-4 border-l-2 border-gray-100">
                        {section.content.map((para, pIndex) => (
                          <div key={pIndex} className="flex items-start gap-2 group">
                            <textarea 
                              rows={2}
                              value={para} 
                              onChange={(e) => handleParagraphChange(sIndex, pIndex, e.target.value)}
                              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-secondary transition-all outline-none"
                              placeholder={`Paragraph #${pIndex + 1}`}
                            />
                            <button type="button" onClick={() => removeParagraph(sIndex, pIndex)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1 transition-all">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addParagraph(sIndex)} className="text-[10px] font-bold text-secondary hover:underline flex items-center gap-1">
                          <Plus size={12} /> Add Paragraph
                        </button>
                      </div>
                    </div>
                  ))}
                  {legalContent.sections.length === 0 && (
                    <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                      <p className="text-gray-400 font-medium italic">No sections added yet. Click 'Add Section' to begin.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex justify-end">
              <button disabled={saving} type="submit" className="flex items-center gap-3 bg-secondary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all">
                <Save size={22} />
                {saving ? "Saving..." : `Update ${activeTab === 'privacy' ? 'Privacy Policy' : 'Terms'}`}
              </button>
            </div>
          </form>
        )}
      </div>

      <Toaster position="top-center" />
      
      {/* Dynamic styles for scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f9fafb; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}} />
    </div>
  );
};

// Simple Info icon replacement since it wasn't in imports
const Info = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default AdminSettings;
