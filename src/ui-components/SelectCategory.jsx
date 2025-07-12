import { useState, useEffect } from 'react';

export default function SelectCategory({ title, items, onClick, colorMap }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    onClick?.(value);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 599;

  return (
    <div className="relative w-full animate-fadeInUp">
      {/* Select Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center animate-fadeInUp justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
      >
        <span className="font-small">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown menyu */}
      {open && (
        <>
          {/* Yüngül overlay */}
          <div
            onClick={() => setOpen(false)}
            className="hidden max-[599px]:block fixed inset-0 bg-[rgba(0,0,0,0.05)] backdrop-black backdrop-blur-[5px] z-40 transition-all duration-300"
          />

          {/* Dropdown / Bottom Sheet */}
          <div
            className={`
              ${open ? 'block' : 'hidden'}
              z-50 transition-all duration-300
              ${isMobile
                ? 'fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[60vh] overflow-y-auto'
                : 'absolute mt-4 w-full max-h-[300px] overflow-y-scroll noscroll p-[5px] bg-white border border-gray-200 rounded-2xl shadow-xl'}
            `}
          >
            <ul className="divide-y divide-gray-100">
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item)}
                  className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-gray-900 cursor-pointer transition-colors duration-150 flex items-center gap-2 rounded-xl"
                >
                  {/* Rəng dairəsi varsa */}
                  {colorMap && colorMap[item] && (
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: colorMap[item] }}
                    />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
