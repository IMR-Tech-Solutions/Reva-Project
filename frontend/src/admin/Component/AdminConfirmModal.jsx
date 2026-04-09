import React from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to perform this action?", 
  confirmText = "Confirm", 
  type = "danger" // 'danger' | 'warning' | 'info'
}) => {
  if (!isOpen) return null;

  const colors = {
    danger: {
      bg: "bg-red-100",
      icon: "text-red-600",
      button: "bg-red-600 hover:bg-red-700 shadow-red-200",
      iconComp: Trash2
    },
    warning: {
      bg: "bg-yellow-100",
      icon: "text-yellow-600",
      button: "bg-yellow-600 hover:bg-yellow-700 shadow-yellow-200",
      iconComp: AlertTriangle
    },
    info: {
      bg: "bg-blue-100",
      icon: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
      iconComp: AlertTriangle
    }
  };

  const activeColor = colors[type] || colors.danger;
  const IconComponent = activeColor.iconComp;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        >
          {/* Header/Banner Area */}
          <div className={`${activeColor.bg} p-6 flex justify-center relative`}>
            <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm ${activeColor.icon}`}>
              <IconComponent size={32} />
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 text-center space-y-2">
            <h3 className="text-xl font-bold text-primary">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {message}
            </p>
          </div>

          <div className="p-6 pt-0 flex gap-3">
            <button
              onClick={onConfirm}
              className={`flex-1 ${activeColor.button} text-white py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-sm`}
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors active:scale-95 text-sm"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminConfirmModal;
