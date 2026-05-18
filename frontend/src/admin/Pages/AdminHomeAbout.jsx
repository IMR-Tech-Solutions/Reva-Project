import React, { useState, useEffect } from "react";
import { Save, Plus, Trash2, Info, Layout, Image as ImageIcon, Upload } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api, { API_BASE_URL } from "../../api/api";

const AdminHomeAbout = () => {
  const [content, setContent] = useState({
    label: "",
    heading: "",
    sub_heading: "",
    description: "",
    highlight_text: "",
    pillars: [],
    stat_year: "",
    stat_text: "",
    image_main: "",
    image_sub: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      const data = await api.getHomeAboutContent();
      if (data) setContent(data);
    } catch (error) {
      toast.error("Failed to load home about content");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateHomeAboutContent(content);
      toast.success("Home about content updated successfully!");
    } catch (error) {
      toast.error("Failed to update content");
    } finally {
      setSaving(false);
    }
  };

  const handlePillarChange = (index, value) => {
    const newPillars = [...content.pillars];
    newPillars[index] = value;
    setContent({ ...content, pillars: newPillars });
  };

  const addPillar = () => {
    setContent({ ...content, pillars: [...content.pillars, ""] });
  };

  const removePillar = (index) => {
    const newPillars = content.pillars.filter((_, i) => i !== index);
    setContent({ ...content, pillars: newPillars });
  };

  if (loading) return <div className="p-12 text-center text-gray-500 font-medium">Loading section content...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Home Page About Section</h1>
        <p className="text-gray-500">Customize the about section shown uniquely on the homepage</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Main Content Card */}
          <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100">
            <div className="flex items-center gap-2 text-primary font-bold border-b pb-3 mb-4">
              <Layout size={20} className="text-secondary" />
              <h3>Text Content Configuration</h3>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-secondary underline underline-offset-4 decoration-2">Small Label (Top)</label>
                <input type="text" value={content.label} onChange={(e) => setContent({ ...content, label: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder="e.g. About Reva Process Technologies" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-secondary underline underline-offset-4 decoration-2">Main Heading</label>
                  <input type="text" value={content.heading} onChange={(e) => setContent({ ...content, heading: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-secondary underline underline-offset-4 decoration-2">Sub-heading / Tagline</label>
                  <input type="text" value={content.sub_heading} onChange={(e) => setContent({ ...content, sub_heading: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-secondary underline underline-offset-4 decoration-2">Detailed Description</label>
                <textarea rows={5} value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all leading-relaxed" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-secondary underline underline-offset-4 decoration-2">Highlight Card Text</label>
                <textarea rows={4} value={content.highlight_text} onChange={(e) => setContent({ ...content, highlight_text: e.target.value })} className="w-full px-4 py-3 bg-primary/5 border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium italic" />
                <p className="mt-1 text-[10px] text-gray-400">This text appears in the styled side box.</p>
              </div>
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-6">
            {/* Pillars */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-primary font-bold flex items-center gap-2"><Info size={18} className="text-secondary" /> Core Pillars</h3>
                <button type="button" onClick={addPillar} className="text-secondary text-xs font-bold hover:underline py-1 px-2 bg-secondary/10 rounded-full">+ Add New</button>
              </div>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {content.pillars.map((pillar, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg group-hover:border-secondary transition-all">
                      <input type="text" value={pillar} onChange={(e) => handlePillarChange(i, e.target.value)} className="bg-transparent text-sm font-medium focus:outline-none w-full" placeholder={`Value #${i + 1}`} />
                    </div>
                    <button type="button" onClick={() => removePillar(i)} className="text-red-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                ))}
                {content.pillars.length === 0 && <p className="text-center text-xs text-gray-400 py-4">No pillars added yet.</p>}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100">
              <div className="flex items-center gap-2 text-primary font-bold border-b pb-3 mb-4">
                <ImageIcon size={18} className="text-secondary" />
                <h3>Floating Stat Card</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Stat Year / Num</label>
                  <input type="text" value={content.stat_year} onChange={(e) => setContent({ ...content, stat_year: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder="e.g. 2014" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Stat Description</label>
                  <input type="text" value={content.stat_text} onChange={(e) => setContent({ ...content, stat_text: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder="e.g. Est. in Pune" />
                </div>
              </div>
            </div>

            {/* Visual Assets */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100">
              <h3 className="text-primary font-bold border-b pb-3 mb-4">Section Images</h3>
              <p className="text-[10px] text-gray-400 mb-4 bg-gray-50 p-2 rounded border border-gray-100">
                Upload images directly. Recommended formats: JPG, PNG, WebP.
              </p>
              <div className="space-y-6">
                
                {/* Primary Image Upload */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Primary Image</label>
                  <div className="relative group aspect-video bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-secondary transition-colors cursor-pointer">
                    {content.image_main || content.main_file ? (
                      <img 
                        src={getMediaSource(content.image_main, content.main_file)} 
                        alt="Primary Preview" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <Upload size={32} className="mb-2" />
                        <span className="text-xs font-medium">Click to upload primary image</span>
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
                        setContent({ ...content, main_file: file });
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </div>
                </div>

                {/* Secondary Image Upload */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Secondary Image</label>
                  <div className="relative group aspect-square w-32 bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-secondary transition-colors cursor-pointer">
                    {content.image_sub || content.sub_file ? (
                      <img 
                        src={getMediaSource(content.image_sub, content.sub_file)} 
                        alt="Secondary Preview" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <Upload size={24} className="mb-1" />
                        <span className="text-[10px] text-center px-2 font-medium">Upload secondary image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <Upload className="text-white" size={24} />
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
                        setContent({ ...content, sub_file: file });
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button type="submit" disabled={saving} className="bg-primary text-secondary px-12 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 transition-all shadow-xl active:scale-[0.98]">
            <Save size={22} className="text-secondary" /> {saving ? "Saving Changes..." : "Update Home About Section"}
          </button>
        </div>
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default AdminHomeAbout;
