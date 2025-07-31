import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PhoneInput({ prefix, setPrefix, contact, setContact }) {
  const [open, setOpen] = useState(false);
  const prefixes = ["050", "051","010", "055", "070", "077", "099"];

  return (
    <div className="flex  items-center relative">
      <div
        className="flex items-center bg-gray-50 dark:bg-[#2E2F2F] dark:text-white justify-between border border-gray-200 dark:border-gray-900 rounded-lg rounded-r-[0px] px-4 py-3 cursor-pointer  min-w-[80px]"
        onClick={() => setOpen(!open)}
      >
        <span>{prefix}</span>
        <ChevronDown size={18} />
      </div>

      {open && (
        <div className="absolute top-14 dark:text-white left-0 bg-white dark:bg-[#2E2F2F] border border-gray-200 dark:border-gray-900 rounded-lg shadow-md w-[80px] z-50">
          {prefixes.map((item) => (
            <div
              key={item}
              onClick={() => {
                setPrefix(item);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-black ${
                prefix === item ? "bg-gray-50 dark:bg-black font-medium" : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      <input
        type="text"
        placeholder="XXX-XX-XX"
        value={contact}
        onChange={(e) => {
          const val = e.target.value;
          // sadəcə rəqəm və maksimum 7 simvol qəbul etsin
          if (/^\d{0,7}$/.test(val)) {
            setContact(val);
          }
        }}
        className="w-full focus:ring-1 focus:ring-blue-500 bg-white dark:bg-[#2E2F2F] dark:text-white border border-gray-200 dark:border-gray-900 rounded-lg rounded-l-[0px] px-4 py-3  focus:outline-none"
      />
    </div>
  );
}
