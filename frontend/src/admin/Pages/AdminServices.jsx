import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";

const AdminServices = () => {
  const [services, setServices] = useState([
    { id: 1, title: "Engineering Consulting", description: "Expert engineering solutions" },
    { id: 2, title: "Digital Transformation", description: "Transform your business digitally" },
    { id: 3, title: "Technical Support", description: "24/7 technical support" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEdit = (service) => {
    setEditingId(service.id);
    setEditTitle(service.title);
    setEditDescription(service.description);
  };

  const handleSave = () => {
    setServices(
      services.map((item) =>
        item.id === editingId
          ? { ...item, title: editTitle, description: editDescription }
          : item
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setServices(services.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    setServices([
      ...services,
      { id: Date.now(), title: "New Service", description: "Add description..." },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary">Services Management</h1>
          <p className="text-gray-600 mt-2">Manage your services</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            {editingId === service.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Service title"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24"
                  placeholder="Service description"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex items-center gap-2 flex-1 bg-blue-100 text-primary px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors justify-center text-sm"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex items-center gap-2 flex-1 bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors justify-center text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
