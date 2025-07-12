import { useState } from 'react';

export default function MultiSelectCategory({ title, items, value = [], onChange }) {
  const [open, setOpen] = useState(false);

  const handleToggle = (item) => {
    let updated;
    if (value.includes(item)) {
      updated = value.filter((v) => v !== item);
    } else {
      updated = [...value, item];
    }
    onChange?.(updated);
  };

  const handleRemove = (item) => {
    const updated = value.filter((v) => v !== item);
    onChange?.(updated);
  };

  return (
    <div className="relative w-full">
      {/* Select Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex flex-wrap gap-2 items-center bg-white border border-gray-200 rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
      >
        {value.length > 0 ? (
          value.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{item}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <span className="font-small text-gray-500">{title}</span>
        )}

        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ml-auto ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Items */}
      {open && (
        <div className="absolute mt-4 w-full max-h-[300px] overflow-y-auto noscroll p-[5px] bg-white border border-gray-200 rounded-2xl shadow-xl z-10 transition-all duration-200">
          <ul className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleToggle(item)}
                className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-gray-900 cursor-pointer transition-colors duration-150 flex items-center rounded-xl mx-2"
              >
                <input
                  type="checkbox"
                  checked={value.includes(item)}
                  readOnly
                  className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
