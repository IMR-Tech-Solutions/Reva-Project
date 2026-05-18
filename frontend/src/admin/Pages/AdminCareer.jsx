import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import api, { API_BASE_URL } from "../../api/api";
import { 
  Edit2, Trash2, Plus, X, Loader2, Download, 
  Settings, Layout, UserCheck, Info, Image as ImageIcon,
  Upload, Globe, Briefcase, Save
} from "lucide-react";

const AdminCareer = () => {
  const [openPositions, setOpenPositions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showPositionForm, setShowPositionForm] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  
  // New States for Consolidation
  const [activeTab, setActiveTab] = useState("jobs"); // "jobs" or "content"
  const [careerContent, setCareerContent] = useState({
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
  const [careerLoading, setCareerLoading] = useState(false);
  const [careerSaving, setCareerSaving] = useState(false);
  const [heroFile, setHeroFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [posData, appData, contentData] = await Promise.all([
        api.getPositions(),
        api.getApplications(),
        api.getCareerContent()
      ]);
      setOpenPositions(posData);
      setApplications(appData);
      if (contentData) {
        setCareerContent({
          ...contentData,
          specs: contentData.specs || [],
          benefits: contentData.benefits || []
        });
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(`Error: ${err.message || "Failed to connect to backend API"}. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-Time",
    experience: "",
    description: "",
    skills: "",
    responsibilities: "",
  });

  const handlePositionFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPosition = async () => {
    if (!formData.title || !formData.department) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const positionToSave = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        type: formData.type,
        experience: formData.experience,
        description: formData.description,
        skills: formData.skills.split(",").map((s) => s.trim()),
        responsibilities: formData.responsibilities.split(",").map((r) => r.trim()),
      };

      if (editingPosition) {
        const updated = await api.updatePosition(editingPosition.id, positionToSave);
        setOpenPositions(
          openPositions.map((pos) => (pos.id === editingPosition.id ? updated : pos))
        );
        toast.success("Position updated successfully!");
      } else {
        const added = await api.createPosition(positionToSave);
        setOpenPositions([...openPositions, added]);
        toast.success("Position added successfully!");
      }

      setFormData({
        title: "",
        department: "",
        location: "",
        type: "Full-Time",
        experience: "",
        description: "",
        skills: "",
        responsibilities: "",
      });
      setEditingPosition(null);
      setShowPositionForm(false);
    } catch (err) {
      toast.error("Failed to save position. Please try again.");
      console.error(err);
    }
  };

  const handleEditPosition = (position) => {
    setEditingPosition(position);
    setFormData({
      title: position.title,
      department: position.department,
      location: position.location,
      type: position.type,
      experience: position.experience,
      description: position.description,
      skills: position.skills.join(", "),
      responsibilities: position.responsibilities.join(", "),
    });
    setShowPositionForm(true);
  };

  const handleDeletePosition = async (id) => {
    if (!window.confirm("Are you sure you want to delete this position?")) {
      return;
    }
    try {
      await api.deletePosition(id);
      setOpenPositions(openPositions.filter((pos) => pos.id !== id));
      toast.success("Position deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete position. Please try again.");
      console.error(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log(`🔄 Changing status - App ID: ${id}, New Status: ${newStatus}`);
      
      await api.updateApplicationStatus(id, newStatus);
      
      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
      
      console.log(`✓ Status changed successfully`);
      toast.success(`Status updated to ${newStatus}! Email sent to applicant.`);
    } catch (err) {
      console.error(`❌ Status change failed:`, err);
      const errorMsg = err.message || "Failed to update status. Please try again.";
      toast.error(errorMsg);
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }
    try {
      await api.deleteApplication(id);
      setApplications(applications.filter((app) => app.id !== id));
      toast.success("Application deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete application. Please try again.");
      console.error(err);
    }
  };

  const handleDownloadResume = async (applicationId, applicantName) => {
    try {
      if (!applicantName) {
        toast.error("Unable to download resume: applicant name not found");
        return;
      }
      console.log(`⬇️ Starting download for application ${applicationId}`);
      await api.downloadResume(applicationId);
      toast.success("Resume downloaded successfully!");
    } catch (err) {
      console.error("Download error:", err);
      const errorMsg = err.message || "Failed to download resume";
      toast.error(errorMsg);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Reviewed":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // Content Management Handlers
  const getMediaSource = (url, file) => {
    if (file) return URL.createObjectURL(file);
    if (!url) return null;
    if (url.startsWith("/api/uploads")) {
      return `${API_BASE_URL}${url}`;
    }
    return url;
  };

  const handleCareerContentSubmit = async (e) => {
    e.preventDefault();
    try {
      setCareerSaving(true);
      const contentToUpdate = { ...careerContent, hero_file: heroFile };
      await api.updateCareerContent(contentToUpdate);
      toast.success("Career content updated successfully!");
      setHeroFile(null);
      // Refresh only content
      const contentData = await api.getCareerContent();
      if (contentData) {
        setCareerContent({
          ...contentData,
          specs: contentData.specs || [],
          benefits: contentData.benefits || []
        });
      }
    } catch (err) {
      toast.error(err.message || "Failed to update career content");
      console.error(err);
    } finally {
      setCareerSaving(false);
    }
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...careerContent.specs];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setCareerContent({ ...careerContent, specs: newSpecs });
  };

  const addSpec = () => {
    setCareerContent({ ...careerContent, specs: [...careerContent.specs, { label: "", value: "" }] });
  };

  const removeSpec = (index) => {
    const newSpecs = careerContent.specs.filter((_, i) => i !== index);
    setCareerContent({ ...careerContent, specs: newSpecs });
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...careerContent.benefits];
    newBenefits[index] = { ...newBenefits[index], text: value };
    setCareerContent({ ...careerContent, benefits: newBenefits });
  };

  const addBenefit = () => {
    setCareerContent({ ...careerContent, benefits: [...careerContent.benefits, { text: "" }] });
  };

  const removeBenefit = (index) => {
    const newBenefits = careerContent.benefits.filter((_, i) => i !== index);
    setCareerContent({ ...careerContent, benefits: newBenefits });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Career Management</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">Manage job openings, applications, and page content</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === "jobs"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Jobs & Applications
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === "content"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Page Content
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin text-secondary mr-2" />
            <p className="text-gray-600">Connecting to Dashboard...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700 font-semibold">{error}</p>
            <p className="text-red-600 text-sm">Please make sure the FastAPI backend is running.</p>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Open Positions Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg w-full overflow-hidden">
        <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary">Open Positions</h2>
            <button
              onClick={() => {
                setEditingPosition(null);
                setFormData({
                  title: "",
                  department: "",
                  location: "",
                  type: "Full-Time",
                  experience: "",
                  description: "",
                  skills: "",
                  responsibilities: "",
                });
                setShowPositionForm(true);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-secondary/90 transition-colors"
            >
              <Plus size={18} />
              <span>Add Position</span>
            </button>
          </div>
        </div>

        {/* Position Form Modal */}
        {showPositionForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-lg sm:rounded-2xl max-w-lg sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-gray-200 bg-white">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-primary">
                  {editingPosition ? "Edit Position" : "Add New Position"}
                </h3>
                <button
                  onClick={() => setShowPositionForm(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <input
                    type="text"
                    name="title"
                    placeholder="Job Title *"
                    value={formData.title}
                    onChange={handlePositionFormChange}
                    required
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="Department *"
                    value={formData.department}
                    onChange={handlePositionFormChange}
                    required
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handlePositionFormChange}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handlePositionFormChange}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  >
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                  </select>
                </div>

                <input
                  type="text"
                  name="experience"
                  placeholder="Experience Required (e.g., 5-8 Years)"
                  value={formData.experience}
                  onChange={handlePositionFormChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />

                <textarea
                  name="description"
                  placeholder="Job Description"
                  value={formData.description}
                  onChange={handlePositionFormChange}
                  rows="3"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none"
                />

                <textarea
                  name="skills"
                  placeholder="Key Skills (comma-separated)"
                  value={formData.skills}
                  onChange={handlePositionFormChange}
                  rows="2"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none"
                />

                <textarea
                  name="responsibilities"
                  placeholder="Responsibilities (comma-separated)"
                  value={formData.responsibilities}
                  onChange={handlePositionFormChange}
                  rows="2"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none"
                />

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={handleAddPosition}
                    className="flex-1 bg-secondary text-white font-bold py-2 rounded-lg text-sm hover:bg-secondary/90 transition-colors"
                  >
                    {editingPosition ? "Update" : "Add"} Position
                  </button>
                  <button
                    onClick={() => setShowPositionForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-lg text-sm hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Positions Table - Desktop */}
        <div className="w-full overflow-hidden">
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Title</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Dept</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Location</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Type</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Exp</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Skills</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs font-bold text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {openPositions.map((position) => (
                  <tr key={position.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-xs sm:text-sm text-gray-800 truncate">{position.title}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 truncate">{position.department}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 truncate">{position.location}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded whitespace-nowrap">
                        {position.type}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 truncate">{position.experience}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <div className="flex flex-wrap gap-1">
                        {position.skills.slice(0, 1).map((skill, idx) => (
                          <span key={idx} className="px-1 py-0.5 bg-gray-100 text-gray-700 text-xs rounded whitespace-nowrap truncate">
                            {skill.substring(0, 8)}...
                          </span>
                        ))}
                        {position.skills.length > 1 && (
                          <span className="px-1 py-0.5 bg-secondary/10 text-secondary text-xs font-bold rounded whitespace-nowrap">
                            +{position.skills.length - 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEditPosition(position)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePosition(position.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Positions Cards - Mobile */}
        <div className="md:hidden w-full">
          {openPositions.map((position) => (
            <div key={position.id} className="w-full border-b border-gray-200 p-3 sm:p-4 hover:bg-gray-50 transition-colors">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary text-sm mb-1 truncate">{position.title}</h3>
                    <p className="text-xs text-gray-600 truncate">{position.department}</p>
                  </div>
                  <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded whitespace-nowrap flex-shrink-0">
                    {position.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="min-w-0">
                    <p className="text-gray-600 font-semibold">Location</p>
                    <p className="text-gray-800 truncate">{position.location}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-600 font-semibold">Experience</p>
                    <p className="text-gray-800 truncate">{position.experience}</p>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Description</p>
                  <p className="text-xs text-gray-800 line-clamp-2">{position.description}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {position.skills.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded truncate">
                        {skill.substring(0, 10)}
                      </span>
                    ))}
                    {position.skills.length > 2 && (
                      <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded whitespace-nowrap">
                        +{position.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleEditPosition(position)}
                    className="flex-1 py-2 px-3 bg-blue-100 text-blue-600 font-bold text-sm rounded hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePosition(position.id)}
                    className="flex-1 py-2 px-3 bg-red-100 text-red-600 font-bold text-sm rounded hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Received Applications Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg w-full overflow-hidden">
        <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200 w-full">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary">Received Applications</h2>
        </div>

        {/* Desktop View */}
        <div className="w-full overflow-hidden">
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Name</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Email</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Phone</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Position</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Exp</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Resume</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Date</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-primary">Status</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs font-bold text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-xs sm:text-sm text-gray-800 truncate">{app.name}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 text-xs truncate">{app.email}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 text-xs truncate">{app.phone}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 text-xs truncate">{app.position}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 text-xs whitespace-nowrap">{app.experience}y</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs">
                      {app.resume ? (
                        <button 
                          onClick={() => handleDownloadResume(app.id, app.name)}
                          className="text-secondary hover:underline font-semibold truncate inline-flex items-center gap-1 max-w-xs"
                          title="Download resume"
                        >
                          <Download size={14} />
                          Download
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">No Resume</span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 text-xs whitespace-nowrap">{app.appliedDate}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs font-bold border cursor-pointer ${getStatusColor(
                          app.status
                        )}`}
                      >
                        <option>Pending</option>
                        <option>Reviewed</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </select>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right">
                      <button
                        onClick={() => handleDeleteApplication(app.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden w-full">
          {applications.map((app) => (
            <div key={app.id} className="w-full border-b border-gray-200 p-3 sm:p-4 hover:bg-gray-50 transition-colors">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary text-sm mb-1 truncate">{app.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{app.position}</p>
                  </div>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className={`px-2 py-1 rounded text-xs font-bold border cursor-pointer whitespace-nowrap flex-shrink-0 ${getStatusColor(
                      app.status
                    )}`}
                  >
                    <option>Pending</option>
                    <option>Reviewed</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="min-w-0">
                    <p className="text-gray-600 font-semibold">Email</p>
                    <p className="text-gray-800 truncate">{app.email}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-600 font-semibold">Phone</p>
                    <p className="text-gray-800 truncate">{app.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Experience</p>
                    <p className="text-gray-800">{app.experience} yrs</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Applied</p>
                    <p className="text-gray-800 whitespace-nowrap">{app.appliedDate}</p>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Resume</p>
                  {app.resume ? (
                    <button 
                      onClick={() => handleDownloadResume(app.id, app.name)}
                      className="text-secondary hover:underline font-semibold text-xs truncate inline-flex items-center gap-1 max-w-full"
                      title="Download resume"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">No Resume</span>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteApplication(app.id)}
                  className="w-full py-2 px-3 bg-red-100 text-red-600 font-bold text-sm rounded hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

        </div>
      )}

      {/* Career Content Management Tab */}
      {activeTab === "content" && (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-primary">Page Branding & Content</h2>
              <p className="text-gray-500 text-sm mt-1">Manage the Hero section and Home Page career block.</p>
            </div>
            <button 
              onClick={handleCareerContentSubmit} 
              disabled={careerSaving} 
              className="bg-secondary text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              <Save size={20} /> {careerSaving ? "Saving..." : "Save Content Changes"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Main Forms */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Hero Configuration */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 text-primary font-bold mb-6 border-b border-gray-50 pb-3">
                  <Layout size={18} className="text-secondary" />
                  <h3>Hero Branding</h3>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Small Subtitle</label>
                      <input 
                        type="text" 
                        value={careerContent.hero_subtitle} 
                        onChange={(e) => setCareerContent({ ...careerContent, hero_subtitle: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-secondary transition-all" 
                        placeholder="e.g. Careers at REVA" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Est. Year</label>
                      <input 
                        type="text" 
                        value={careerContent.hero_year} 
                        onChange={(e) => setCareerContent({ ...careerContent, hero_year: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-secondary transition-all" 
                        placeholder="e.g. 2014" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Main Headline</label>
                    <input 
                      type="text" 
                      value={careerContent.hero_title} 
                      onChange={(e) => setCareerContent({ ...careerContent, hero_title: e.target.value })} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-secondary transition-all font-bold" 
                      placeholder="e.g. Build Your Career in Process Engineering" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Description Paragraph</label>
                    <textarea 
                      rows={4} 
                      value={careerContent.hero_description} 
                      onChange={(e) => setCareerContent({ ...careerContent, hero_description: e.target.value })} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-secondary transition-all leading-relaxed" 
                      placeholder="Describe the career culture..." 
                    />
                  </div>
                </div>
              </section>

              {/* Specs & Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Career Specs */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-3">
                    <h3 className="text-primary font-bold flex items-center gap-2">
                      <Info size={16} className="text-secondary" /> 
                      Page Specs
                    </h3>
                    <button 
                      type="button" 
                      onClick={addSpec} 
                      className="text-secondary text-[10px] font-bold uppercase tracking-wider hover:underline"
                    >
                      + Add New
                    </button>
                  </div>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {careerContent.specs.map((spec, i) => (
                      <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative group">
                        <button 
                          type="button" 
                          onClick={() => removeSpec(i)} 
                          className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={spec.label} 
                            onChange={(e) => handleSpecChange(i, "label", e.target.value)} 
                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold" 
                            placeholder="Label (e.g. Domains)" 
                          />
                          <input 
                            type="text" 
                            value={spec.value} 
                            onChange={(e) => handleSpecChange(i, "value", e.target.value)} 
                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs" 
                            placeholder="Value (e.g. Refinery)" 
                          />
                        </div>
                      </div>
                    ))}
                    {careerContent.specs.length === 0 && <p className="text-center text-xs text-gray-400 py-4 italic">No specs defined.</p>}
                  </div>
                </section>

                {/* Team Benefits */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-3">
                    <h3 className="text-primary font-bold flex items-center gap-2">
                      <UserCheck size={16} className="text-secondary" /> 
                      Team Benefits
                    </h3>
                    <button 
                      type="button" 
                      onClick={addBenefit} 
                      className="text-secondary text-[10px] font-bold uppercase tracking-wider hover:underline"
                    >
                      + Add New
                    </button>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {careerContent.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 group">
                        <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl group-hover:border-secondary transition-all">
                          <input 
                            type="text" 
                            value={benefit.text} 
                            onChange={(e) => handleBenefitChange(i, e.target.value)} 
                            className="bg-transparent text-xs font-bold focus:outline-none w-full" 
                            placeholder={`Benefit #${i + 1}`} 
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeBenefit(i)} 
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {careerContent.benefits.length === 0 && <p className="text-center text-xs text-gray-400 py-4 italic">No benefits defined.</p>}
                  </div>
                </section>
              </div>
            </div>

            {/* Right Column - Sidebar Controls */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Image Upload */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-primary font-bold border-b border-gray-50 pb-3 mb-4 flex items-center gap-2">
                  <ImageIcon size={16} className="text-secondary" />
                  Hero Image
                </h3>
                <div className="space-y-4">
                  <div className="relative group aspect-video bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-secondary transition-all cursor-pointer">
                    {heroFile || careerContent.hero_image ? (
                      <img 
                        src={getMediaSource(careerContent.hero_image, heroFile)} 
                        alt="Hero Preview" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <Upload size={24} className="mb-1" />
                        <span className="text-[10px] font-bold uppercase">Upload Image</span>
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
                        setHeroFile(file);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Recommended: 1200x800px Wide shot.</p>
                </div>
              </section>

              {/* Stats Badge */}
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-primary font-bold border-b border-gray-50 pb-3 mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-secondary" />
                  Public Stats (Home)
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Total Roles", key: "total_roles", icon: Briefcase },
                    { label: "Employees", key: "total_employees", icon: UserCheck },
                    { label: "Countries", key: "total_countries", icon: Globe }
                  ].map((stat) => (
                    <div key={stat.key}>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                        <stat.icon size={10} /> {stat.label}
                      </label>
                      <input 
                        type="text" 
                        value={careerContent[stat.key]} 
                        onChange={(e) => setCareerContent({ ...careerContent, [stat.key]: e.target.value })} 
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:border-secondary" 
                        placeholder="e.g. 100+" 
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default AdminCareer;
