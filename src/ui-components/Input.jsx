import { useState } from "react";

export default function Input({ type = "text", placeholder, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || value;
  const inputId = `input-${placeholder.replace(/\s+/g, "-").toLowerCase()}`; // Unikal id

  return (
    <div className="relative w-full">
      <label
        htmlFor={inputId}
        className={`
          absolute left-5 pt-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 transition-all duration-200 cursor-text
          ${showLabel ? 'top-2 text-xs text-gray-500' : ''}
        `}
      >
        {placeholder}
      </label>

      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full h-[50px] bg-white border border-gray-200 rounded-lg px-5 pt-5 pb-2
          focus:outline-none transition-all
        `}
      />
    </div>
  );
}
