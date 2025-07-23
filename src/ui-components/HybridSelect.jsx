import React, { useState, useRef, useEffect } from "react";

const HybridSelect = ({ options, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (val.length > 0) {
      const filtered = options.filter((opt) =>
        opt.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }

    onChange(val);
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setShowOptions(false);
    onChange(option);
  };

  return (
    <div className="w-full relative" ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          setFilteredOptions(options);
          setShowOptions(true);
        }}
        placeholder="Model seç veya yaz"
        className="w-full outline-none flex items-center justify-between h-[50px] bg-white border border-gray-200 rounded-lg px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
      />

      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-20 top-full left-0 right-0 max-h-[300px] overflow-auto noscroll border border-gray-100 bg-white rounded-md shadow-md divide-y divide-gray-100 mt-1">
          {filteredOptions.map((opt, i) => (
            <li
              key={i}
              onClick={() => handleOptionClick(opt)}
              className="px-6 py-3  text-gray-700  hover:bg-blue-50 hover:text-gray-900 cursor-pointer transition-colors duration-150 flex items-center gap-2"
              onMouseDown={(e) => e.preventDefault()} // Blur önlemek için
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HybridSelect;
