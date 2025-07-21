import { useState, useEffect } from 'react';

export default function SearchSelect({ title, items, onClick, colorMap}) {
  const [open, setOpen] = useState(false);
 const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearchChange = (e) => {
    const val = e.target.value.toLowerCase();

    const filtered = items.filter(item => {
      const text = typeof item === "string" ? item : item?.name || "";
      return text.toLowerCase().startsWith(val);
    });

    setFilteredItems(filtered);
    setSearch(e.target.value);
  };

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
    <div className="relative w-auto min-w-[10%] animate-fadeInUp">
      {/* Select Header */}
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center animate-fadeInUp justify-between h-[50px]  bg-white border border-gray-200 rounded-lg  px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200`}
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
            className="hidden max-[599px]:block fixed inset-0 bg-black/30 backdrop-blur-lg z-50 transition-all duration-300"
          />

          {/* Dropdown / Bottom Sheet */}
          <div
  className={`
    ${open ? 'block' : 'hidden'}
    z-50 transition-all duration-300
    ${isMobile
      ? 'fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[60vh] overflow-hidden noscroll'
      : 'absolute mt-4 w-full max-h-[300px] overflow-hidden noscroll p-[5px] bg-white border border-gray-200 rounded-2xl shadow-xl'}
  `}
>
  {/* Üst span */}
  <div className='w-full min-[643px]:hidden flex justify-center'>
    <span className='w-[25px] h-[2px] bg-black flex'></span>
  </div>

  {/* Scroll sahəsi */}
  <div className="overflow-hidden flex flex-col items-center pt-[10px] bg-white noscroll max-h-[250px] ">
      <input
      type="text"
      placeholder="Axtar..."
      onChange={handleSearchChange}
      className={`
       w-[97%] h-[50px]  flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg  px-6 py-2 noscroll cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-opacity-20
      `}
    />
    <ul className="divide-y divide-gray-100 w-full overflow-y-scroll pt-[10px] noscroll">
      {filteredItems.map((item, index) => (
        <li
          key={index}
          onClick={() => handleSelect(item)}
          className="max-[643px]:px-2 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-gray-900 cursor-pointer transition-colors duration-150 flex items-center gap-2 rounded-xl"
        >
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
</div>
        </>
      )}
    </div>
  );
}
