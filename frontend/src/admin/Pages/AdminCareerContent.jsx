import React, { useState, useEffect } from "react";
import { Save, Plus, Trash2, Info, Layout, Image as ImageIcon, Upload, Briefcase, Globe, UserCheck } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api, { API_BASE_URL } from "../../api/api";

const AdminCareerContent = () => {
  const [content, setContent] = useState({
    hero_title: "",
    hero_subtitle: "",
    hero_description: "",
    hero_image: "",
    hero_year: "",
    specs: [],
    benefits: [],
    total_employees: "",
    total_countries: "",
    total_roles: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroFile, setHeroFile] = useState(null);

  // Helper to get media source for preview
  const getMediaSource = (url, file) => {
    if (file) return URL.createObjectURL(file);
    if (!url) return null;
    if (url.startsWith("/api/uploads")) {
      return `${API_BASE_URL}${url}`;
    }
    return url;
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const data = await api.getCareerContent();
      if (data) {
        setContent({
          ...data,
          specs: data.specs || [],
          benefits: data.benefits || []
        });
      }
    } catch (error) {
      console.error("Error fetching career content:", error);
      toast.error("Failed to load career content");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      const contentToUpdate = {
        ...content,
        hero_file: heroFile
      };

      await api.updateCareerContent(contentToUpdate);
      toast.success("Career content updated successfully!");
      fetchContent(); // Refresh data
      setHeroFile(null); // Clear file state after successful upload
    } catch (error) {
      console.error("Error updating career content:", error);
      toast.error("Failed to update content");
    } finally {
      setSaving(false);
    }
  };

  // Specs handlers
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...content.specs];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setContent({ ...content, specs: newSpecs });
  };

  const addSpec = () => {
    setContent({ ...content, specs: [...content.specs, { label: "", value: "" }] });
  };

  const removeSpec = (index) => {
    const newSpecs = content.specs.filter((_, i) => i !== index);
    setContent({ ...content, specs: newSpecs });
  };

  // Benefits handlers
  const handleBenefitChange = (index, value) => {
    const newBenefits = [...content.benefits];
    newBenefits[index] = { ...newBenefits[index], text: value };
    setContent({ ...content, benefits: newBenefits });
  };

  const addBenefit = () => {
    setContent({ ...content, benefits: [...content.benefits, { text: "" }] });
  };

  const removeBenefit = (index) => {
    const newBenefits = content.benefits.filter((_, i) => i !== index);
    setContent({ ...content, benefits: newBenefits });
  };

  if (loading) return <div className="p-12 text-center text-gray-500 font-medium italic">Loading career content...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight">Career Page CMS</h1>
          <p className="text-gray-500 mt-1">Manage the Hero section and Home Page career block.</p>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={saving} 
          className="bg-secondary text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 active:scale-95 disabled:opacity-50"
        >
          <Save size={20} /> {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Hero Configuration */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 ring-1 ring-gray-100">
            <div className="flex items-center gap-3 text-primary font-bold mb-6 border-b border-gray-50 pb-4">
              <div className="p-2 bg-primary/5 rounded-lg">
                <Layout size={20} className="text-secondary" />
              </div>
              <h3 className="text-xl">Hero Branding</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest">Small Subtitle</label>
                  <input 
                    type="text" 
                    value={content.hero_subtitle} 
                    onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all font-medium" 
                    placeholder="e.g. Careers at REVA" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest">Establishment Year</label>
                  <input 
                    type="text" 
                    value={content.hero_year} 
                    onChange={(e) => setContent({ ...content, hero_year: e.target.value })} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all font-medium" 
                    placeholder="e.g. 2014" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest">Main Headline</label>
                <input 
                  type="text" 
                  value={content.hero_title} 
                  onChange={(e) => setContent({ ...content, hero_title: e.target.value })} 
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all font-bold text-lg" 
                  placeholder="e.g. Build Your Career in Process Engineering" 
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest">Description Paragraph</label>
                <textarea 
                  rows={4} 
                  value={content.hero_description} 
                  onChange={(e) => setContent({ ...content, hero_description: e.target.value })} 
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all leading-relaxed font-medium" 
                  placeholder="Describe the career culture..." 
                />
              </div>
            </div>
          </section>

          {/* Specs & Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Career Specs (Label: Value pairs) */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 ring-1 ring-gray-100 h-fit">
              <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                <h3 className="text-primary font-bold flex items-center gap-2">
                  <Info size={18} className="text-secondary" /> 
                  Section Specs
                </h3>
                <button 
                  type="button" 
                  onClick={addSpec} 
                  className="bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-wider hover:bg-secondary/20 py-1.5 px-3 rounded-full transition-all"
                >
                  + Add New
                </button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {content.specs.map((spec, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3 relative group">
                    <button 
                      type="button" 
                      onClick={() => removeSpec(i)} 
                      className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-tight">Label</label>
                      <input 
                        type="text" 
                        value={spec.label} 
                        onChange={(e) => handleSpecChange(i, "label", e.target.value)} 
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-secondary text-sm font-bold" 
                        placeholder="e.g. Domains" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-tight">Value</label>
                      <input 
                        type="text" 
                        value={spec.value} 
                        onChange={(e) => handleSpecChange(i, "value", e.target.value)} 
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-secondary text-sm" 
                        placeholder="e.g. Refinery · Oil" 
                      />
                    </div>
                  </div>
                ))}
                {content.specs.length === 0 && <p className="text-center text-xs text-gray-400 py-8 italic font-medium">No specs defined.</p>}
              </div>
            </section>

            {/* Benefits (Home Page) */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 ring-1 ring-gray-100 h-fit">
              <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                <h3 className="text-primary font-bold flex items-center gap-2">
                  <UserCheck size={18} className="text-secondary" /> 
                  Team Benefits
                </h3>
                <button 
                  type="button" 
                  onClick={addBenefit} 
                  className="bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-wider hover:bg-secondary/20 py-1.5 px-3 rounded-full transition-all"
                >
                  + Add New
                </button>
              </div>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {content.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl group-hover:border-secondary transition-all">
                      <input 
                        type="text" 
                        value={benefit.text} 
                        onChange={(e) => handleBenefitChange(i, e.target.value)} 
                        className="bg-transparent text-sm font-bold focus:outline-none w-full" 
                        placeholder={`Benefit #${i + 1}`} 
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeBenefit(i)} 
                      className="text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {content.benefits.length === 0 && <p className="text-center text-xs text-gray-400 py-8 italic font-medium">No benefits defined.</p>}
                <p className="text-[10px] text-gray-400 mt-4 leading-relaxed bg-primary/5 p-3 rounded-xl border border-primary/10">
                  <span className="font-bold text-secondary mr-1">Note:</span> These appear on the Home Page "Join Our Team" section.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Sidebar Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Image Upload */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 ring-1 ring-gray-100">
            <h3 className="text-primary font-bold border-b border-gray-50 pb-4 mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-secondary" />
              Hero Image
            </h3>
            <div className="space-y-4">
              <div className="relative group aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-secondary transition-all cursor-pointer">
                {heroFile || content.hero_image ? (
                  <img 
                    src={getMediaSource(content.hero_image, heroFile)} 
                    alt="Hero Preview" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <Upload size={32} className="mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest">Upload Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <Upload className="text-white" size={32} />
                </div>
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => {
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
                    setHeroFile(file);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
              </div>
              <p className="text-[10px] text-gray-400 bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                Best for wide shots of plants or teams. Recommended size: 1200x800px.
              </p>
            </div>
          </section>

          {/* Stats Badge */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 ring-1 ring-gray-100">
            <div className="flex items-center gap-2 text-primary font-bold border-b border-gray-50 pb-4 mb-6">
              <div className="p-2 bg-primary/5 rounded-lg">
                <Globe size={18} className="text-secondary" />
              </div>
              <h3>Public Stats (Home)</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest flex items-center gap-1">
                  <Briefcase size={12} /> Total Roles
                </label>
                <input 
                  type="text" 
                  value={content.total_roles} 
                  onChange={(e) => setContent({ ...content, total_roles: e.target.value })} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold" 
                  placeholder="e.g. 100+" 
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest flex items-center gap-1">
                  <UserCheck size={12} /> Employees
                </label>
                <input 
                  type="text" 
                  value={content.total_employees} 
                  onChange={(e) => setContent({ ...content, total_employees: e.target.value })} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold" 
                  placeholder="e.g. 5000+" 
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest flex items-center gap-1">
                  <Globe size={12} /> Countries
                </label>
                <input 
                  type="text" 
                  value={content.total_countries} 
                  onChange={(e) => setContent({ ...content, total_countries: e.target.value })} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold" 
                  placeholder="e.g. 45+" 
                />
              </div>
            </div>
          </section>

        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default AdminCareerContent;
