import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X, Zap, Video, Image as ImageIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/api";

const AdminHomeHero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const data = await api.getHomeHeroSlides();
      setSlides(data);
    } catch (error) {
      toast.error("Failed to fetch slides");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (slide = null) => {
    setCurrentSlide(slide || {
      small_text: "",
      heading: "",
      sub_text: "",
      button_text: "",
      button_link: "",
      media_type: "video",
      media_url: "",
      order: slides.length + 1
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (currentSlide.id) {
        await api.updateHomeHeroSlide(currentSlide.id, currentSlide);
        toast.success("Slide updated successfully");
      } else {
        await api.createHomeHeroSlide(currentSlide);
        toast.success("Slide created successfully");
      }
      setShowModal(false);
      fetchSlides();
    } catch (error) {
      // Show backend error message if available (e.g. file too large details)
      const msg = error?.message || "Error saving slide";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;
    try {
      await api.deleteHomeHeroSlide(id);
      toast.success("Slide deleted");
      fetchSlides();
    } catch (error) {
      toast.error("Error deleting slide");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Loading slides...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Home Hero Slider</h1>
          <p className="text-gray-500">Manage the slides shown in the home page hero section</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-secondary text-primary px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-secondary/90 transition-all">
          <Plus size={20} /> Add New Slide
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {slides.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium text-lg">No slides available. Create your first slide!</p>
          </div>
        ) : (
          slides.map((slide) => (
            <div key={slide.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start hover:border-secondary/30 transition-all group">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase rounded-md tracking-wider">Slide {slide.order}</span>
                  <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">{slide.heading}</h3>
                </div>
                <p className="text-sm font-bold text-secondary uppercase tracking-widest leading-none">{slide.small_text}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{slide.sub_text}</p>
                <div className="pt-3 flex flex-wrap gap-4 text-xs font-bold">
                  <span className={`px-3 py-1 rounded-full ${slide.media_type === 'video' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                    {slide.media_type?.toUpperCase() || 'VIDEO'}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full max-w-[200px] truncate">Media: {slide.media_url || 'Default'}</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Button: {slide.button_text || 'None'}</span>
                </div>
              </div>
              <div className="flex md:flex-col gap-2 w-full md:w-auto shrink-0">
                <button onClick={() => handleOpenModal(slide)} className="flex-1 md:w-32 bg-primary/5 text-primary py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/10 transition-all border border-primary/5">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(slide.id)} className="flex-1 md:w-32 bg-red-50 text-red-600 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-50">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">{currentSlide.id ? "Edit Hero Slide" : "Create New Slide"}</h3>
              <button onClick={() => setShowModal(false)} className="hover:bg-white/10 p-1 rounded-full border border-white/20 transition-all"><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest underline decoration-secondary underline-offset-4">Small Top Text</label>
                  <input required type="text" value={currentSlide.small_text} onChange={(e) => setCurrentSlide({ ...currentSlide, small_text: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder="e.g. End-to-End Project Delivery Since 2014" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest underline decoration-secondary underline-offset-4">Main Heading</label>
                  <input required type="text" value={currentSlide.heading} onChange={(e) => setCurrentSlide({ ...currentSlide, heading: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest underline decoration-secondary underline-offset-4">Subtext / Description</label>
                  <textarea rows={3} value={currentSlide.sub_text} onChange={(e) => setCurrentSlide({ ...currentSlide, sub_text: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest underline decoration-secondary underline-offset-4">CTA Button Text</label>
                  <input type="text" value={currentSlide.button_text} onChange={(e) => setCurrentSlide({ ...currentSlide, button_text: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder="e.g. Explore Now" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest underline decoration-secondary underline-offset-4">CTA Link</label>
                  <input type="text" value={currentSlide.button_link} onChange={(e) => setCurrentSlide({ ...currentSlide, button_link: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder="/services" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest underline decoration-secondary underline-offset-4">Background Media (Image or Video)</label>
                  <div className="flex flex-col gap-4">
                    {/* Preview Area */}
                    {(currentSlide.media_url || currentSlide.media_file) && (
                      <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                        {currentSlide.media_type === "image" ? (
                          <div className="w-full h-full relative">
                            <img 
                              src={currentSlide.media_file ? URL.createObjectURL(currentSlide.media_file) : currentSlide.media_url} 
                              alt="Preview" 
                              className="w-full h-full object-cover" 
                            />
                            {!currentSlide.media_file && !currentSlide.media_url && (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
                                <ImageIcon size={48} />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-primary/5 text-primary gap-3">
                            <Video size={48} className="animate-pulse" />
                            <span className="font-bold text-sm tracking-widest uppercase">Video Sequence</span>
                            <p className="text-[10px] opacity-60 px-6 text-center">
                              {currentSlide.media_file ? currentSlide.media_file.name : (currentSlide.media_url ? 'Active Video Stream' : 'No Video Selected')}
                            </p>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-lg">
                          Live Preview
                        </div>
                      </div>
                    )}
                    
                    <div className="relative group">
                      <input 
                        type="file" 
                        accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const isVideo = file.type.startsWith('video/');
                            const MAX_IMAGE_SIZE = 10 * 1024 * 1024;  // 10 MB
                            const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

                            if (isVideo) {
                              // Validate video format
                              const ext = file.name.split('.').pop().toLowerCase();
                              if (!['mp4', 'webm'].includes(ext)) {
                                toast.error("Invalid video format. Only MP4 and WEBM are allowed.");
                                e.target.value = "";
                                return;
                              }
                              // Validate video size
                              if (file.size > MAX_VIDEO_SIZE) {
                                const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
                                toast.error(`Video is too large (${sizeMB} MB). Maximum allowed size is 100 MB.`);
                                e.target.value = "";
                                return;
                              }
                              setCurrentSlide({ 
                                ...currentSlide, 
                                media_file: file, 
                                media_type: 'video' 
                              });
                            } else {
                              // Validate image format
                              const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
                              const fileExtension = file.name.split('.').pop().toLowerCase();
                              const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                              if (!allowedExtensions.includes(fileExtension) || !allowedMimeTypes.includes(file.type)) {
                                toast.error("Invalid image format. Only JPG, JPEG, PNG and WEBP are allowed.");
                                e.target.value = "";
                                return;
                              }
                              // Validate image size
                              if (file.size > MAX_IMAGE_SIZE) {
                                const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
                                toast.error(`Image is too large (${sizeMB} MB). Maximum allowed size is 10 MB.`);
                                e.target.value = "";
                                return;
                              }
                              setCurrentSlide({ 
                                ...currentSlide, 
                                media_file: file, 
                                media_type: 'image' 
                              });
                            }
                          }
                        }}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-3 file:px-6
                          file:rounded-xl file:border-0
                          file:text-sm file:font-bold
                          file:bg-primary file:text-white
                          hover:file:bg-blue-900 transition-all cursor-pointer" 
                      />
                      <p className="mt-2 text-[10px] text-gray-400 font-medium">
                        Images: JPG, JPEG, PNG, WEBP (max 10 MB) &nbsp;|&nbsp; Videos: MP4, WEBM (max 100 MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest underline decoration-secondary underline-offset-4">Display Order</label>
                  <input type="number" value={currentSlide.order} onChange={(e) => setCurrentSlide({ ...currentSlide, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
                </div>
              </div>
              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button type="submit" disabled={saving} className="flex-1 bg-secondary text-primary py-4 rounded-xl font-bold hover:bg-secondary/90 transition-all shadow-xl active:scale-[0.98]">{saving ? "Processing..." : "Save Slide Configuration"}</button>
                <button type="button" onClick={() => setShowModal(false)} className="px-8 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default AdminHomeHero;
