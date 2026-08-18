import React from "react";
import { Sparkles, X } from "lucide-react";

const AIChatWidget = ({ onClick, isOpen }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Pulse ring */}
      {!isOpen && (
        <div
          className="absolute inset-0 rounded-full animate-pulseRing"
          style={{ backgroundColor: "var(--accent-primary)", opacity: 0.3 }}
        />
      )}
      <button
        onClick={onClick}
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
        className="relative w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
        style={{
          width: "52px",
          height: "52px",
          backgroundColor: "var(--accent-primary)",
          color: "#fff",
          boxShadow: "0 4px 24px rgba(124,108,252,0.4)",
          transform: isOpen ? "scale(0.92)" : "scale(1)",
        }}
        onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.transform = "scale(1.07)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = isOpen ? "scale(0.92)" : "scale(1)"; }}
      >
        {isOpen
          ? <X size={20} />
          : <Sparkles size={20} />
        }
      </button>
    </div>
  );
};

export default AIChatWidget;
