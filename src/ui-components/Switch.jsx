import { useState } from "react";

export default function ModernSwitch({ value, onChange, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
          value ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        ></span>
      </button>
    </div>
  );
}
