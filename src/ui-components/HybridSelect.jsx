import React, { useState, useRef, useEffect } from "react";

const HybridSelect = ({ options, onChange, disabled, value = "" }) => {
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const showLabel = isFocused || inputValue;

  useEffect(() => {
    setInputValue(value || ""); 
  }, [value]);

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
        opt.toLowerCase().startsWith(val.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setFilteredOptions([]);
      setShowOptions(false);
    }

    onChange(val);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setShowOptions(false);
    onChange(option);
  };

  return (
    <div className="relative w-full bg-white rounded-lg" ref={wrapperRef}>
      <label
        onClick={() =>  inputRef.current?.focus()}
        className={`
          absolute left-5 pt-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 transition-all duration-200 cursor-text z-10
          ${showLabel ? "top-2 text-xs text-gray-500 " : ""}
        `}
      >
        Model seç və ya yaz
      </label>

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        disabled={disabled}
        onFocus={() => {
          setIsFocused(true);
          if (inputValue.length > 0) {
            const filtered = options.filter((opt) =>
              opt.toLowerCase().startsWith(inputValue.toLowerCase())
            );
            setFilteredOptions(filtered);
            setShowOptions(true);
          }
        }}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        className={`
          peer w-full h-[50px]  border border-gray-200  rounded-lg px-5 pt-5 pb-2
          focus:outline-none transition-all focus:ring-1 focus:ring-blue-500 
          ${disabled ? "bg-gray-50  cursor-not-allowed" : ""}
        `}
      />

      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-20 top-full left-0 right-0 max-h-[300px] overflow-auto noscroll border border-gray-100  bg-white  rounded-md shadow-md divide-y divide-gray-100 mt-1">
          {filteredOptions.map((opt, i) => (
            <li
              key={i}
              onClick={() => handleOptionClick(opt)}
              onMouseDown={(e) => e.preventDefault()}
              className="px-6 py-3 text-gray-700    hover:bg-blue-50   hover:text-gray-900 cursor-pointer transition-colors duration-150 flex items-center gap-2"
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
