import React from "react";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { Button } from "./ui";

const typeStyles = {
  success: { icon: "text-green-600", bg: "bg-green-50 border-green-200", text: "text-green-800" },
  error: { icon: "text-red-600", bg: "bg-red-50 border-red-200", text: "text-red-800" },
  warning: { icon: "text-amber-600", bg: "bg-amber-50 border-amber-200", text: "text-amber-800" },
  info: { icon: "text-brand-gold", bg: "bg-brand-gold/10 border-brand-gold/20", text: "text-brand-charcoal" },
  confirm: { icon: "text-brand-gold", bg: "bg-brand-gold/10 border-brand-gold/20", text: "text-brand-charcoal" },
};

const CustomModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  onConfirm = null,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  const style = typeStyles[type] || typeStyles.info;
  const Icon = type === "success" ? CheckCircle : type === "error" || type === "warning" ? AlertTriangle : Info;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-charcoal/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-brand-cream rounded-xl shadow-card-hover border border-brand-charcoal/10 overflow-hidden animate-scale-in">
        <div className={`p-5 border-b border-brand-charcoal/5 ${style.bg}`}>
          <div className="flex items-start gap-3">
            <Icon size={24} className={`shrink-0 ${style.icon}`} />
            <div className="flex-1">
              <h3 className={`text-base font-bold font-serif ${style.text}`}>
                {title || (type === "confirm" ? "Confirm" : "Notice")}
              </h3>
              <p className={`text-sm mt-2 ${style.text} opacity-80 leading-relaxed whitespace-pre-line`}>{message}</p>
            </div>
            <button onClick={onClose} className="shrink-0 p-1 hover:bg-brand-charcoal/5 rounded-full transition-colors">
              <X size={16} className={style.text} />
            </button>
          </div>
        </div>

        <div className="p-4 flex gap-2 justify-end">
          {onConfirm ? (
            <>
              <Button variant="secondary" size="sm" onClick={onClose}>
                {cancelText}
              </Button>
              <Button size="sm" onClick={() => { onConfirm(); onClose(); }}>
                {confirmText}
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={onClose}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
