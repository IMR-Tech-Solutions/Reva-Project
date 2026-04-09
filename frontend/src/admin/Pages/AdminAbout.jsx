import React, { useState, useEffect } from "react";
import {
  Users,
  Target,
  HelpCircle,
  FileText,
  Plus,
  Pencil,
  Trash2,
  Linkedin,
  Mail,
  Save,
  Image as ImageIcon,
  CheckCircle,
  Info,
  X,
  Upload,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import aboutApi from "../../services/aboutApi";

const AdminAbout = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("general"); // For why-us sub-tabs

  // --- States for different sections ---
  const [content, setContent] = useState({
    hero_title: "",
    hero_subtitle: "",
    hero_description: "",
    hero_year: "",
    hero_image_main: "",
    hero_image_sub: "",
    mission_text: "",
    vision_text: "",
    values_title: "",
    values_description: "",
    why_us_title: "",
    why_us_description: "",
    why_us_years_excellence: "",
    why_us_image: "",
    team_title: "",
    team_subtitle: "",
    highlights: [],
    core_pills: [],
    advantages: [],
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Helper to get media source for preview
  const getMediaSource = (url, file) => {
    if (file) return URL.createObjectURL(file);
    if (!url) return null;
    if (url.startsWith("/api/uploads")) {
      return `${API_BASE_URL}${url}`;
    }
    return url;
  };

  const [team, setTeam] = useState([]);
  const [values, setValues] = useState([]);
  const [differentiators, setDifferentiators] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // --- Modal / Form States ---
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [memberFile, setMemberFile] = useState(null);

  const [showIndicatorModal, setShowIndicatorModal] = useState(false);
  const [currentIndicator, setCurrentIndicator] = useState(null);

  const [showDiffModal, setShowDiffModal] = useState(false);
  const [currentDiff, setCurrentDiff] = useState(null);

  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await aboutApi.getAboutFull();
      setContent(data.content);
      setTeam(data.team);
      setValues(data.values);
      setDifferentiators(data.differentiators);
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Error fetching about data:", error);
      toast.error("Failed to load about content");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      await aboutApi.updateAboutContent(content);
      toast.success("About content updated successfully!");
    } catch (error) {
      toast.error("Failed to update content");
    } finally {
      setSaving(false);
    }
  };

  // --- Team Member Handlers ---
  const handleOpenMemberModal = (member = null) => {
    setCurrentMember(
      member || {
        name: "",
        role: "",
        bio: "",
        linkedin: "",
        email: "",
        order: team.length + 1,
      },
    );
    setMemberFile(null);
    setShowMemberModal(true);
  };

  const handleSaveMember = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();
      Object.keys(currentMember).forEach((key) => {
        if (currentMember[key] !== null && key !== "id" && key !== "image") {
          formData.append(key, currentMember[key]);
        }
      });
      if (memberFile) formData.append("image", memberFile);

      if (currentMember.id) {
        await aboutApi.updateTeamMember(currentMember.id, formData);
        toast.success("Team member updated");
      } else {
        await aboutApi.createTeamMember(formData);
        toast.success("Team member added");
      }
      setShowMemberModal(false);
      fetchData();
    } catch (error) {
      toast.error("Error saving team member");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to remove this team member?"))
      return;
    try {
      await aboutApi.deleteTeamMember(id);
      toast.success("Team member removed");
      fetchData();
    } catch (error) {
      toast.error("Error deleting team member");
    }
  };

  // --- Indicator Handlers (Company Values Cards) ---
  const handleOpenIndicatorModal = (item = null) => {
    setCurrentIndicator(
      item || {
        title: "",
        description: "",
        icon_name: "FiShield",
        order: values.length + 1,
      },
    );
    setShowIndicatorModal(true);
  };

  const handleSaveIndicator = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (currentIndicator.id) {
        await aboutApi.updateValue(currentIndicator.id, currentIndicator);
        toast.success("Value card updated");
      } else {
        await aboutApi.createValue(currentIndicator);
        toast.success("Value card added");
      }
      setShowIndicatorModal(false);
      fetchData();
    } catch (error) {
      toast.error("Error saving value card");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteIndicator = async (id) => {
    if (!window.confirm("Delete this value card?")) return;
    try {
      await aboutApi.deleteValue(id);
      toast.success("Card removed");
      fetchData();
    } catch (error) {
      toast.error("Error deleting");
    }
  };

  // --- Differentiator Handlers (Why Choose Us Cards) ---
  const handleOpenDiffModal = (item = null) => {
    setCurrentDiff(
      item || {
        title: "",
        description: "",
        icon_name: "FiShield",
        order: differentiators.length + 1,
      },
    );
    setShowDiffModal(true);
  };

  const handleSaveDiff = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (currentDiff.id) {
        await aboutApi.updateDifferentiator(currentDiff.id, currentDiff);
        toast.success("Differentiator updated");
      } else {
        await aboutApi.createDifferentiator(currentDiff);
        toast.success("Differentiator added");
      }
      setShowDiffModal(false);
      fetchData();
    } catch (error) {
      toast.error("Error saving differentiator");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDiff = async (id) => {
    if (!window.confirm("Delete this card?")) return;
    try {
      await aboutApi.deleteDifferentiator(id);
      toast.success("Card removed");
      fetchData();
    } catch (error) {
      toast.error("Error deleting");
    }
  };

  // --- Testimonial Handlers ---
  const handleOpenTestimonialModal = (item = null) => {
    setCurrentTestimonial(
      item || {
        name: "",
        role: "",
        company: "",
        quote: "",
        rating: 5,
        order: testimonials.length + 1,
      },
    );
    setShowTestimonialModal(true);
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (currentTestimonial.id) {
        await aboutApi.updateTestimonial(
          currentTestimonial.id,
          currentTestimonial,
        );
        toast.success("Review updated");
      } else {
        await aboutApi.createTestimonial(currentTestimonial);
        toast.success("Review added");
      }
      setShowTestimonialModal(false);
      fetchData();
    } catch (error) {
      toast.error("Error saving review");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await aboutApi.deleteTestimonial(id);
      toast.success("Review removed");
      fetchData();
    } catch (error) {
      toast.error("Error deleting");
    }
  };

  // --- Array Helpers (Highlights, Advantages) ---
  const handleAddHighlight = () => {
    setContent({
      ...content,
      highlights: [...content.highlights, { label: "", desc: "" }],
    });
  };
  const handleUpdateHighlight = (index, field, value) => {
    const newHighlights = [...content.highlights];
    newHighlights[index][field] = value;
    setContent({ ...content, highlights: newHighlights });
  };
  const handleRemoveHighlight = (index) => {
    setContent({
      ...content,
      highlights: content.highlights.filter((_, i) => i !== index),
    });
  };

  const handleAddAdvantage = () => {
    setContent({ ...content, advantages: [...content.advantages, ""] });
  };
  const handleUpdateAdvantage = (index, value) => {
    const newAdv = [...content.advantages];
    newAdv[index] = value;
    setContent({ ...content, advantages: newAdv });
  };
  const handleRemoveAdvantage = (index) => {
    setContent({
      ...content,
      advantages: content.advantages.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            About Us Management
          </h1>
          <p className="text-gray-500">
            Manage all dynamic sections of your About page
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {[
          { id: "general", label: "General & Hero", icon: FileText },
          { id: "team", label: "Management Team", icon: Users },
          { id: "values", label: "Company Values", icon: Target },
          { id: "why-us", label: "Why Choose Us", icon: HelpCircle },
          { id: "testimonials", label: "Client Reviews", icon: CheckCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all
              ${
                activeTab === tab.id
                  ? "border-b-2 border-secondary text-secondary bg-secondary/5"
                  : "text-gray-500 hover:text-primary hover:bg-gray-50"
              }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "general" && (
          <form onSubmit={handleSaveContent} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-primary border-b pb-2">
                  Hero Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider text-xs">
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={content.hero_title}
                      onChange={(e) =>
                        setContent({ ...content, hero_title: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider text-xs">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.hero_subtitle}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero_subtitle: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider text-xs">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={content.hero_description}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero_description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary/20 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider text-xs">
                        Est. Year
                      </label>
                      <input
                        type="text"
                        value={content.hero_year}
                        onChange={(e) =>
                          setContent({ ...content, hero_year: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary/20 outline-none"
                      />
                    </div>
                  </div>

                  {/* Hero Image Uploads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    {/* Hero Main */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Hero Main Image
                      </label>
                      <div className="relative group aspect-video bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-secondary transition-colors cursor-pointer">
                        {content.hero_image_main || content.hero_main_file ? (
                          <img
                            src={getMediaSource(
                              content.hero_image_main,
                              content.hero_main_file,
                            )}
                            alt="Hero Main Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <Upload size={24} className="mb-2" />
                            <span className="text-[10px] font-medium">
                              Hero Main
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <Upload className="text-white" size={24} />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setContent({
                              ...content,
                              hero_main_file: e.target.files[0],
                            })
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                      </div>
                    </div>

                    {/* Hero Sub */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Hero Sub Image
                      </label>
                      <div className="relative group aspect-video bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-secondary transition-colors cursor-pointer">
                        {content.hero_image_sub || content.hero_sub_file ? (
                          <img
                            src={getMediaSource(
                              content.hero_image_sub,
                              content.hero_sub_file,
                            )}
                            alt="Hero Sub Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <Upload size={24} className="mb-2" />
                            <span className="text-[10px] font-medium">
                              Hero Sub
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <Upload className="text-white" size={24} />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setContent({
                              ...content,
                              hero_sub_file: e.target.files[0],
                            })
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-primary border-b pb-2">
                  Mission & Vision
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider text-xs">
                      Our Mission Text
                    </label>
                    <textarea
                      rows={4}
                      value={content.mission_text}
                      onChange={(e) =>
                        setContent({ ...content, mission_text: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider text-xs">
                      Our Vision Text
                    </label>
                    <textarea
                      rows={4}
                      value={content.vision_text}
                      onChange={(e) =>
                        setContent({ ...content, vision_text: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary/20 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h3 className="text-lg font-bold text-primary">
                  Hero Highlights
                </h3>
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="text-secondary flex items-center gap-1 font-bold text-sm hover:underline"
                >
                  <Plus size={16} /> Add Highlight
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-start bg-gray-50 p-3 rounded-xl border border-gray-200"
                  >
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Label"
                        value={h.label}
                        onChange={(e) =>
                          handleUpdateHighlight(i, "label", e.target.value)
                        }
                        className="w-full px-3 py-1 text-sm border rounded bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={h.desc}
                        onChange={(e) =>
                          handleUpdateHighlight(i, "desc", e.target.value)
                        }
                        className="w-full px-3 py-1 text-sm border rounded bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(i)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-white px-12 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg"
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save All General Content"}
              </button>
            </div>
          </form>
        )}

        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-primary">
                  Core Leadership
                </h3>
                <p className="text-sm text-gray-500">
                  Add or manage team members shown on the About page
                </p>
              </div>
              <button
                onClick={() => handleOpenMemberModal()}
                className="bg-secondary text-primary px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary/90 shadow-md"
              >
                <Plus size={18} /> Add Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:border-secondary/30 transition-all"
                >
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    {member.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${member.image}`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-4">
                      <h4 className="font-bold text-primary text-lg">
                        {member.name}
                      </h4>
                      <p className="text-secondary text-sm font-semibold">
                        {member.role}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenMemberModal(member)}
                        className="flex-1 bg-gray-50 text-primary py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="px-3 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "values" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-primary">
                    Company Values Indicators
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage value cards shown in the Mission & Values section
                  </p>
                </div>
                <button
                  onClick={() => handleOpenIndicatorModal()}
                  className="bg-secondary text-primary px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary/90 transition-all"
                >
                  <Plus size={18} /> Add Value
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div
                  key={v.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4"
                >
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                    <Info size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary mb-1">{v.title}</h4>
                    <p className="text-sm text-gray-500 mb-3">
                      {v.description}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenIndicatorModal(v)}
                        className="text-primary text-xs font-bold hover:underline flex items-center gap-1"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteIndicator(v.id)}
                        className="text-red-500 text-xs font-bold hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "why-us" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-4 border-b mb-6">
                <button
                  onClick={() => setActiveSubTab("general")}
                  className={`pb-2 px-2 text-sm font-bold ${activeSubTab === "general" ? "border-b-2 border-secondary text-secondary" : "text-gray-400"}`}
                >
                  General Info
                </button>
                <button
                  onClick={() => setActiveSubTab("advantages")}
                  className={`pb-2 px-2 text-sm font-bold ${activeSubTab === "advantages" ? "border-b-2 border-secondary text-secondary" : "text-gray-400"}`}
                >
                  Advantages List
                </button>
                <button
                  onClick={() => setActiveSubTab("differentiators")}
                  className={`pb-2 px-2 text-sm font-bold ${activeSubTab === "differentiators" ? "border-b-2 border-secondary text-secondary" : "text-gray-400"}`}
                >
                  Differentiator Cards
                </button>
              </div>

              {activeSubTab === "general" && (
                <form onSubmit={handleSaveContent} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Why Us Title
                    </label>
                    <input
                      type="text"
                      value={content.why_us_title}
                      onChange={(e) =>
                        setContent({ ...content, why_us_title: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Why Us Description
                    </label>
                    <textarea
                      rows={3}
                      value={content.why_us_description}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          why_us_description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg outline-none"
                    />
                  </div>

                  {/* Why Us Image Upload */}
                  <div className="space-y-2 pt-4 border-t">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Section Primary Image
                    </label>
                    <div className="relative group aspect-video bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-secondary transition-colors cursor-pointer w-full max-w-sm">
                      {content.why_us_image || content.why_us_file ? (
                        <img
                          src={getMediaSource(
                            content.why_us_image,
                            content.why_us_file,
                          )}
                          alt="Why Us Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                          <Upload size={32} className="mb-2" />
                          <span className="text-xs font-medium">
                            Click to upload image
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <Upload className="text-white" size={32} />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setContent({
                            ...content,
                            why_us_file: e.target.files[0],
                          })
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary text-white px-8 py-2 rounded-lg font-bold"
                  >
                    Save Info
                  </button>
                </form>
              )}

              {activeSubTab === "advantages" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Checklist shown in 'Why Choose Us' section
                    </p>
                    <button
                      type="button"
                      onClick={handleAddAdvantage}
                      className="text-secondary font-bold text-sm"
                    >
                      + Add Point
                    </button>
                  </div>
                  <div className="space-y-2">
                    {content.advantages.map((adv, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={adv}
                          onChange={(e) =>
                            handleUpdateAdvantage(i, e.target.value)
                          }
                          className="flex-1 px-4 py-2 border rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAdvantage(i)}
                          className="text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveContent}
                    className="bg-primary text-white px-8 py-2 rounded-lg font-bold mt-4"
                  >
                    Save Advantages
                  </button>
                </div>
              )}

              {activeSubTab === "differentiators" && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleOpenDiffModal()}
                      className="bg-secondary text-primary px-6 py-2 rounded-xl font-bold flex items-center gap-2"
                    >
                      <Plus size={18} /> Add Card
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {differentiators.map((d) => (
                      <div
                        key={d.id}
                        className="bg-gray-50 p-4 rounded-xl border flex justify-between items-start"
                      >
                        <div>
                          <h5 className="font-bold text-primary">{d.title}</h5>
                          <p className="text-xs text-gray-500">
                            {d.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenDiffModal(d)}
                            className="text-primary hover:text-secondary"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteDiff(d.id)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-primary">
                  Client Testimonials
                </h3>
                <p className="text-sm text-gray-500">
                  Manage reviews shown in the 'Testimonials' section
                </p>
              </div>
              <button
                onClick={() => handleOpenTestimonialModal()}
                className="bg-secondary text-primary px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary/90 transition-all shadow-md"
              >
                <Plus size={18} /> Add Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group"
                >
                  <div className="flex gap-4 mb-4">
                    <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center font-bold text-primary capitalize">
                      {t.name[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-primary">{t.name}</h4>
                      <p className="text-xs text-gray-500">
                        {t.role} {t.company ? `at ${t.company}` : ""}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-sm text-gray-600 italic border-l-4 border-secondary/30 pl-4 py-1">
                    "{t.quote}"
                  </blockquote>
                  <div className="mt-6 pt-4 border-t border-gray-50 flex gap-2 justify-end">
                    <button
                      onClick={() => handleOpenTestimonialModal(t)}
                      className="text-primary p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="text-red-400 p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Modals --- */}

      {/* Team Member Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {currentMember.id ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <button
                onClick={() => setShowMemberModal(false)}
                className="hover:bg-white/10 p-1 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <form
              onSubmit={handleSaveMember}
              className="p-6 space-y-4 overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={currentMember.name}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Role / Designation
                  </label>
                  <input
                    required
                    type="text"
                    value={currentMember.role}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        role: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Biography
                </label>
                <textarea
                  rows={3}
                  value={currentMember.bio}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, bio: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={currentMember.linkedin}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        linkedin: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={currentMember.email}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Profile Image
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border">
                    {memberFile ? (
                      <img
                        src={URL.createObjectURL(memberFile)}
                        className="w-full h-full object-cover"
                      />
                    ) : currentMember.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${currentMember.image}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="text-gray-400" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setMemberFile(e.target.files[0])}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-secondary text-primary py-3 rounded-xl font-bold hover:bg-secondary/90 transition-all shadow-lg"
                >
                  {saving ? "Saving..." : "Save Member"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="px-6 bg-gray-100 text-gray-500 py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Value Indicator Modal */}
      {showIndicatorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {currentIndicator.id ? "Edit Value Card" : "Add Value Card"}
              </h3>
              <button
                onClick={() => setShowIndicatorModal(false)}
                className="hover:bg-white/10 p-1 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveIndicator} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Title
                </label>
                <input
                  required
                  type="text"
                  value={currentIndicator.title}
                  onChange={(e) =>
                    setCurrentIndicator({
                      ...currentIndicator,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={currentIndicator.description}
                  onChange={(e) =>
                    setCurrentIndicator({
                      ...currentIndicator,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Icon Name (Lucide/Fi)
                </label>
                <input
                  type="text"
                  value={currentIndicator.icon_name}
                  onChange={(e) =>
                    setCurrentIndicator({
                      ...currentIndicator,
                      icon_name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                  placeholder="e.g. FiShield"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-secondary text-primary py-3 rounded-xl font-bold"
                >
                  {saving ? "Saving..." : "Save Card"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowIndicatorModal(false)}
                  className="px-6 bg-gray-100 text-gray-500 py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Differentiator Modal */}
      {showDiffModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {currentDiff.id ? "Edit Card" : "Add Card"}
              </h3>
              <button
                onClick={() => setShowDiffModal(false)}
                className="hover:bg-white/10 p-1 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveDiff} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Title
                </label>
                <input
                  required
                  type="text"
                  value={currentDiff.title}
                  onChange={(e) =>
                    setCurrentDiff({ ...currentDiff, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Description (short)
                </label>
                <input
                  required
                  type="text"
                  value={currentDiff.description}
                  onChange={(e) =>
                    setCurrentDiff({
                      ...currentDiff,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-secondary text-primary py-3 rounded-xl font-bold"
                >
                  Save Card
                </button>
                <button
                  type="button"
                  onClick={() => setShowDiffModal(false)}
                  className="px-6 bg-gray-100 text-gray-500 py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {showTestimonialModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {currentTestimonial.id ? "Edit Review" : "Add Review"}
              </h3>
              <button
                onClick={() => setShowTestimonialModal(false)}
                className="hover:bg-white/10 p-1 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveTestimonial} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={currentTestimonial.name}
                    onChange={(e) =>
                      setCurrentTestimonial({
                        ...currentTestimonial,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={currentTestimonial.role}
                    onChange={(e) =>
                      setCurrentTestimonial({
                        ...currentTestimonial,
                        role: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={currentTestimonial.company}
                  onChange={(e) =>
                    setCurrentTestimonial({
                      ...currentTestimonial,
                      company: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Quote
                </label>
                <textarea
                  required
                  rows={4}
                  value={currentTestimonial.quote}
                  onChange={(e) =>
                    setCurrentTestimonial({
                      ...currentTestimonial,
                      quote: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-secondary text-primary py-3 rounded-xl font-bold hover:bg-secondary/90 transition-all shadow-lg"
                >
                  {saving ? "Saving..." : "Save Review"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTestimonialModal(false)}
                  className="px-6 bg-gray-100 text-gray-500 py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  );
};

export default AdminAbout;
