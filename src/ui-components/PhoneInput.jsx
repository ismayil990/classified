import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PhoneInput({ prefix, setPrefix, contact, setContact }) {
  const [open, setOpen] = useState(false);
  const prefixes = ["050", "051","010", "055", "070", "077", "099"];

  return (
    <div className="flex  items-center relative">
      <div
        className="flex items-center bg-gray-50 justify-between border border-gray-200 rounded-2xl rounded-r-[0px] px-4 py-3 cursor-pointer  min-w-[80px]"
        onClick={() => setOpen(!open)}
      >
        <span>{prefix}</span>
        <ChevronDown size={18} />
      </div>

      {open && (
        <div className="absolute top-14 left-0 bg-white border border-gray-200 rounded-xl shadow-md w-[80px] z-50">
          {prefixes.map((item) => (
            <div
              key={item}
              onClick={() => {
                setPrefix(item);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                prefix === item ? "bg-gray-50 font-medium" : ""
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
        className="w-full bg-white border border-gray-200 rounded-2xl rounded-l-[0px] px-4 py-3  focus:outline-none"
      />
    </div>
  );
}
