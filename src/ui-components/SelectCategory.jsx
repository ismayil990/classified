import { useState, useEffect } from 'react';

export default function SelectCategory({selectedItem,setSelectedItem,label, items, onClick, colorMap }) {
  const [open, setOpen] = useState(false);
 

  const handleSelect = (value,label) => {
    setSelectedItem(value);
    onClick?.(value);
    setOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 599;

  return (
    <div className="relative w-auto min-w-[10%] animate-fadeInUp">
      {/* Başlıq və seçim hissəsi */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between h-[50px] bg-white  border border-gray-200  rounded-lg px-6 py-4 cursor-pointer hover:bg-gray-50  transition-all duration-200"
      >
        <div className="flex flex-col">
          {/* Title - seçiləndə yuxarı qalxır */}
          <span
            className={`text-xs text-gray-400 transition-all duration-200 ${
              selectedItem ? 'opacity-100 mb-1' : 'opacity-0 h-0'
            }`}
          >
            {label}
          </span>

          {/* Əsas görünən mətn */}
          <span className="text-sm font-medium text-gray-800 ">
            {selectedItem || label}
          </span>
        </div>

        <svg
          className={`w-4 h-4 text-gray-500  transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
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
          {/* Mobil fon overlay */}
          <div
            onClick={() => setOpen(false)}
            className="hidden max-[599px]:block fixed inset-0 bg-black/30 backdrop-blur-lg z-50 transition-all duration-300"
          />

          {/* Dropdown menyusu */}
          <div
            className={`
              z-50 transition-all duration-300
              ${
                isMobile
                  ? 'fixed bottom-0 left-0 right-0 bg-white  rounded-t-2xl p-4 max-h-[60vh] overflow-hidden noscroll'
                  : 'absolute mt-4 w-full max-h-[300px] overflow-hidden noscroll p-[5px] bg-white  border border-gray-200 rounded-2xl shadow-xl'
              }
            `}
          >
            {/* Mobil üçün yuxarı xət */}
            <div className="w-full min-[643px]:hidden flex justify-center">
              <span className="w-[25px] h-[2px] bg-black  flex" />
            </div>

            {/* Scroll hissəsi */}
            <div className="overflow-y-auto  noscroll max-h-[250px]">
              <ul className="divide-y divide-gray-100 ">
                {items.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(item)}
                    className="max-[643px]:px-2 px-6 py-3 text-gray-700  border-0 hover:bg-blue-50  hover:text-gray-900 cursor-pointer transition-colors duration-150 flex items-center gap-2 rounded-xl"
                  >
                    {colorMap?.[item] && (
                      <div
                        className="w-4 h-4 rounded-full "
                        style={{ backgroundColor: colorMap[item] }}
                      />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
