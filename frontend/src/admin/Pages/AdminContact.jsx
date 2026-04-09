import React, { useState, useEffect } from "react";
import { Trash2, MessageSquare, Mail, Settings, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import AdminConfirmModal from "../Component/AdminConfirmModal";
import { 
  getContactSettings, 
  updateContactSettings, 
  getContactMessages, 
  markMessageRead, 
  deleteContactMessage 
} from "../../services/contactApi";

const AdminContact = () => {
  // Tabs: 'inbox' | 'settings'
  const [activeTab, setActiveTab] = useState("inbox");

  // Messaging State
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // Settings State
  const [settings, setSettings] = useState(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [submittingSettings, setSubmittingSettings] = useState(false);

  // Modal State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Fetch Logic
  useEffect(() => {
    fetchMessages();
    fetchSettings();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const data = await getContactMessages();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to load messages");
      console.error(error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchSettings = async () => {
    try {
      setLoadingSettings(true);
      const data = await getContactSettings();
      setSettings(data);
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        toast.error("Failed to load contact settings");
      }
      console.error(error);
    } finally {
      setLoadingSettings(false);
    }
  };

  // Messages Actions
  const handleMarkAsRead = async (id) => {
    try {
      await markMessageRead(id);
      setMessages(messages.map(msg => msg.id === id ? { ...msg, is_read: true } : msg));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: true });
      }
      toast.success("Marked as read");
    } catch (error) {
      toast.error("Failed to mark message as read");
    }
  };

  const confirmDelete = (id) => {
    setMessageToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    
    // Optimistic check
    const previousMessages = [...messages];
    setMessages(messages.filter(msg => msg.id !== messageToDelete));
    if (selectedMessage && selectedMessage.id === messageToDelete) {
      setSelectedMessage(null);
    }
    setShowDeleteConfirm(false);

    try {
      await deleteContactMessage(messageToDelete);
      toast.success("Message deleted successfully!");
    } catch (error) {
      setMessages(previousMessages);
      toast.error("Failed to delete message. Please try again.");
      console.error(error);
    } finally {
      setMessageToDelete(null);
    }
  };

  // Settings Actions
  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleMarketsChange = (e) => {
    // Basic comma separated parsing
    const tagsArray = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
    setSettings({ ...settings, markets_served: tagsArray });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!settings) return;
    
    setSubmittingSettings(true);
    toast.promise(
      updateContactSettings(settings),
      {
        loading: "Saving contact settings...",
        success: (data) => {
          setSettings(data);
          return "Contact settings updated successfully!";
        },
        error: "Failed to update settings. Please try again."
      }
    ).finally(() => setSubmittingSettings(false));
  };

  const unreadCount = messages.filter((msg) => !msg.is_read).length;

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Contact Management</h1>
          <p className="text-gray-600 mt-2">Manage incoming messages and update website contact details</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`px-4 py-2 font-semibold text-sm rounded-md transition-colors flex items-center gap-2 ${
              activeTab === "inbox" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Mail size={16} /> Inbox
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-semibold text-sm rounded-md transition-colors flex items-center gap-2 ${
              activeTab === "settings" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Settings size={16} /> Contact Details
          </button>
        </div>
      </div>

      {activeTab === "inbox" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
              <MessageSquare className="text-primary mb-2 opacity-80" size={32} strokeWidth={1.5} />
              <p className="text-gray-500 text-sm font-semibold tracking-wide uppercase">Total Messages</p>
              <p className="text-3xl font-black text-primary mt-1">{messages.length}</p>
            </div>
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center transition-all ${unreadCount > 0 ? "ring-2 ring-secondary/50 bg-secondary/5" : ""}`}>
              <Mail className={`${unreadCount > 0 ? "text-secondary" : "text-gray-400"} mb-2`} size={32} strokeWidth={1.5} />
              <p className="text-gray-500 text-sm font-semibold tracking-wide uppercase">Unread</p>
              <p className={`text-3xl font-black mt-1 ${unreadCount > 0 ? "text-secondary" : "text-gray-500"}`}>{unreadCount}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
              <CheckCircle className="text-green-500 mb-2 opacity-80" size={32} strokeWidth={1.5} />
              <p className="text-gray-500 text-sm font-semibold tracking-wide uppercase">Read</p>
              <p className="text-3xl font-black text-green-600 mt-1">{messages.length - unreadCount}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 shrink-0">
                <h2 className="font-bold text-primary">Inbox</h2>
              </div>
              <div className="overflow-y-auto flex-1 p-2 space-y-1">
                {loadingMessages ? (
                  <p className="text-center text-sm text-gray-500 py-4">Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p className="text-center text-sm text-gray-500 py-4">No messages found.</p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border ${
                        selectedMessage?.id === message.id
                          ? "bg-primary border-primary text-white shadow-md relative z-10"
                          : message.is_read
                            ? "bg-white border-transparent text-gray-800 hover:bg-gray-50 hover:border-gray-200"
                            : "bg-blue-50/50 border-secondary/30 text-gray-800 hover:bg-secondary/10"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`font-semibold truncate pr-2 ${!message.is_read && selectedMessage?.id !== message.id ? "text-secondary" : ""}`}>
                          {message.full_name}
                        </h3>
                        {!message.is_read && selectedMessage?.id !== message.id && (
                          <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2 shadow-[0_0_8px_rgba(237,29,36,0.5)] animate-pulse" />
                        )}
                      </div>
                      <p className={`text-sm truncate mb-1 ${selectedMessage?.id === message.id ? "text-white/80" : "text-gray-600 font-medium"}`}>
                        {message.project_type || "General Inquiry"}
                      </p>
                      <p className={`text-xs ${selectedMessage?.id === message.id ? "text-white/60" : "text-gray-400"}`}>
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Read view */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              {selectedMessage ? (
                <>
                  <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50 shrink-0">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-black text-primary tracking-tight">{selectedMessage.project_type || "No Subject"}</h2>
                        {!selectedMessage.is_read && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-secondary text-white rounded">New</span>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600">
                        <p><strong className="text-gray-900 pr-1">From:</strong> {selectedMessage.full_name}</p>
                        <p><strong className="text-gray-900 pr-1">Email:</strong> <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">{selectedMessage.email}</a></p>
                      </div>
                      {(selectedMessage.company_name || selectedMessage.phone) && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600 mt-1">
                          {selectedMessage.company_name && <p><strong className="text-gray-900 pr-1">Company:</strong> {selectedMessage.company_name}</p>}
                          {selectedMessage.phone && <p><strong className="text-gray-900 pr-1">Phone:</strong> <a href={`tel:${selectedMessage.phone}`} className="text-primary hover:underline">{selectedMessage.phone}</a></p>}
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400 font-medium mb-3">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                      {!selectedMessage.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(selectedMessage.id)}
                          className="text-xs font-bold text-secondary border border-secondary/30 hover:bg-secondary hover:text-white px-3 py-1.5 rounded transition-colors"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-6 overflow-y-auto flex-1">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">{selectedMessage.message_body}</p>
                  </div>

                  <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="flex-1 bg-primary text-white px-4 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors text-center text-sm flex items-center justify-center gap-2"
                    >
                      <Mail size={16} /> Reply
                    </a>
                    <button
                      onClick={() => confirmDelete(selectedMessage.id)}
                      className="bg-white border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-bold hover:bg-red-50 hover:border-red-300 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30 p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-600 mb-1">No Message Selected</h3>
                  <p className="text-sm">Click on a message from the inbox to read its contents.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-black text-primary">Public Contact Details</h2>
            <p className="text-gray-500 text-sm mt-1">Configure exactly what visitors see on the public "Contact" page and navigation menus.</p>
          </div>

          {loadingSettings ? (
            <div className="py-12 text-center text-gray-500">Loading settings...</div>
          ) : settings ? (
            <form onSubmit={handleSaveSettings} className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Primary Contact Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Corporate Email</label>
                    <input type="text" name="email_inquiry" value={settings.email_inquiry || ""} onChange={handleSettingChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary" placeholder="info@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
                    <input type="text" name="phone_primary" value={settings.phone_primary || ""} onChange={handleSettingChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary" placeholder="+1234567890" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Address</label>
                    <textarea name="address_hq" value={settings.address_hq || ""} onChange={handleSettingChange} rows={2} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary resize-y" />
                  </div>
                </div>
              </div>

              {/* Map & Markets */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Location & Presence</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Google Maps Embed URL (src parameter)</label>
                    <p className="text-[11px] text-gray-500 mb-2">Paste the 'src' link from a Google Maps iframe embed (starts with https://www.google.com/maps/embed...)</p>
                    <textarea name="map_link" value={settings.map_link || ""} onChange={handleSettingChange} rows={2} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary font-mono text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Markets Served (Comma Separated)</label>
                    <input type="text" className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary text-xs font-mono" value={settings.markets_served ? settings.markets_served.join(', ') : ""} onChange={handleMarketsChange} placeholder="India, USA, UAE" />
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Operating Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mon – Fri</label>
                    <input type="text" name="hours_weekday" value={settings.hours_weekday || ""} onChange={handleSettingChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Saturday</label>
                    <input type="text" name="hours_saturday" value={settings.hours_saturday || ""} onChange={handleSettingChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Sunday</label>
                    <input type="text" name="hours_sunday" value={settings.hours_sunday || ""} onChange={handleSettingChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary" />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">LinkedIn</label>
                    <input type="text" name="social_linkedin" value={settings.social_linkedin || ""} onChange={handleSettingChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Twitter</label>
                    <input type="text" name="social_twitter" value={settings.social_twitter || ""} onChange={handleSettingChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Facebook</label>
                    <input type="text" name="social_facebook" value={settings.social_facebook || ""} onChange={handleSettingChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Instagram</label>
                    <input type="text" name="social_instagram" value={settings.social_instagram || ""} onChange={handleSettingChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-secondary" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={submittingSettings}
                  className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-all shadow border-b-4 border-black/20 active:border-b-0 active:translate-y-1 disabled:opacity-50"
                >
                  {submittingSettings ? "Saving Settings..." : "Save Platform Settings"}
                </button>
              </div>

            </form>
          ) : (
            <div className="py-12 text-center text-red-500">
              <p className="font-bold">Settings configuration not found.</p>
              <p className="text-sm mt-2 text-gray-500">Please make sure the backend database was seeded.</p>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AdminConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
      />
    </div>
  );
};

export default AdminContact;
