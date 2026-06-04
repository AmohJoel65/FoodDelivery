import React from "react";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";

const CustomModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = "info", 
  onConfirm = null,
  confirmText = "OK",
  cancelText = "Cancel"
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={32} className="text-green-500" />;
      case "error":
        return <AlertTriangle size={32} className="text-red-500" />;
      case "warning":
        return <AlertTriangle size={32} className="text-amber-500" />;
      default:
        return <Info size={32} className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-amber-50 border-amber-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-amber-800";
      default:
        return "text-blue-800";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1a1a]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#1a1a1a]/10 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className={`p-6 border-b border-[#1a1a1a]/5 ${getBgColor()}`}>
          <div className="flex items-start gap-4">
            <div className="shrink-0">{getIcon()}</div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold font-serif ${getTextColor()}`}>
                {title || (type === "confirm" ? "Confirm Action" : "Notification")}
              </h3>
              <p className={`text-sm mt-1 ${getTextColor()}/80 leading-relaxed`}>
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={18} className={getTextColor()} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fdfbf7] flex gap-3 justify-end">
          {onConfirm ? (
            <>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-[#1a1a1a]/20 text-[#1a1a1a] font-semibold text-sm hover:bg-[#1a1a1a]/5 transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#1a1a1a] text-white font-semibold text-sm hover:bg-[#d4af37] transition-colors"
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#1a1a1a] text-white font-semibold text-sm hover:bg-[#d4af37] transition-colors"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
