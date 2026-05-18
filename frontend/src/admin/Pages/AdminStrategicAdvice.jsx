import React, { useState, useEffect } from "react";
import { Save, Trash2, Layout, Upload } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api, { API_BASE_URL } from "../../api/api";

const AdminStrategicAdvice = () => {
  const [strategicContent, setStrategicContent] = useState({
    label: "",
    heading: "",
    sub_heading: "",
    description: "",
    features: [],
    exp_year: "",
    exp_text: "",
    image: ""
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const strategicData = await api.getStrategicAdvice();
      if (strategicData) setStrategicContent(strategicData);
    } catch (error) {
      toast.error("Failed to load strategic advice content");
    } finally {
      setLoading(false);
    }
  };

  const handleStrategicSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateStrategicAdvice(strategicContent);
      toast.success("Strategic advice content updated successfully!");
    } catch (error) {
      toast.error("Failed to update strategic advice");
    } finally {
      setSaving(false);
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...strategicContent.features];
    newFeatures[index] = value;
    setStrategicContent({ ...strategicContent, features: newFeatures });
  };

  const addFeature = () => {
    setStrategicContent({ ...strategicContent, features: [...strategicContent.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = strategicContent.features.filter((_, i) => i !== index);
    setStrategicContent({ ...strategicContent, features: newFeatures });
  };

  if (loading) return <div className="p-12 text-center text-gray-500 font-medium">Loading section contents...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Strategic Advice Management</h1>
        <p className="text-gray-500">Customize the consulting and strategic section shown on the homepage</p>
      </div>

      <form onSubmit={handleStrategicSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Content Card */}
          <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100">
            <div className="flex items-center gap-2 text-primary font-bold border-b pb-3 mb-4">
              <Layout size={20} className="text-primary" />
              <h3>Consulting Content Configuration</h3>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">Label</label>
                  <input 
                    type="text" 
                    value={strategicContent.label} 
                    onChange={(e) => setStrategicContent({ ...strategicContent, label: e.target.value })} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                    placeholder="e.g. Expert Guidance"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">Heading</label>
                  <input 
                    type="text" 
                    value={strategicContent.heading} 
                    onChange={(e) => setStrategicContent({ ...strategicContent, heading: e.target.value })} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                    placeholder="e.g. Strategic advice."
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">Sub-heading</label>
                <input 
                  type="text" 
                  value={strategicContent.sub_heading} 
                  onChange={(e) => setStrategicContent({ ...strategicContent, sub_heading: e.target.value })} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                  placeholder="e.g. Practical delivery."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest decoration-primary underline underline-offset-4 decoration-2">Description</label>
                <textarea 
                  rows={4} 
                  value={strategicContent.description} 
                  onChange={(e) => setStrategicContent({ ...strategicContent, description: e.target.value })} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Side Assets */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100">
              <h3 className="text-primary font-bold border-b pb-3 mb-4">Strategic Features</h3>
              <div className="space-y-2">
                {strategicContent.features.map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <input 
                      type="text" 
                      value={f} 
                      onChange={(e) => handleFeatureChange(i, e.target.value)} 
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" 
                    />
                    <button type="button" onClick={() => removeFeature(i)} className="text-red-400 p-1 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addFeature} 
                  className="w-full py-2 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg text-xs font-bold text-gray-400 hover:border-primary transition-all"
                >
                  + Add Feature
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100 space-y-4">
              <h3 className="text-primary font-bold border-b pb-3 mb-1 text-sm">Visual Asset</h3>
              <div className="relative group aspect-video bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-primary transition-colors cursor-pointer">
                {(strategicContent.image || strategicContent.strategic_file) ? (
                  <img src={getMediaSource(strategicContent.image, strategicContent.strategic_file)} alt="Strategic Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <Upload size={24} />
                    <span className="text-[10px] mt-1 text-center px-4">Click to upload consulting image</span>
                  </div>
                )}
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
                    setStrategicContent({ ...strategicContent, strategic_file: file });
                  }} 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Exp. Year</label>
                  <input 
                    type="text" 
                    value={strategicContent.exp_year} 
                    onChange={(e) => setStrategicContent({...strategicContent, exp_year: e.target.value})} 
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" 
                    placeholder="e.g. 25+" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Exp. Label</label>
                  <input 
                    type="text" 
                    value={strategicContent.exp_text} 
                    onChange={(e) => setStrategicContent({...strategicContent, exp_text: e.target.value})} 
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs" 
                    placeholder="e.g. Years" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100 mt-8">
          <button 
            type="submit" 
            disabled={saving} 
            className="bg-primary text-secondary px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/95 transition-all shadow-xl active:scale-[0.98]"
          >
            <Save size={20} className="text-secondary" /> {saving ? "Saving Changes..." : "Update Strategic Advice"}
          </button>
        </div>
      </form>

      <Toaster position="top-center" />
    </div>
  );
};

export default AdminStrategicAdvice;
