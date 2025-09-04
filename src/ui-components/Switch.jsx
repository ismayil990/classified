import { useState } from "react";

export default function Switch({ defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue); 
  };

  return (
  <div className="flex items-center justify-between h-[50px] bg-white  border border-gray-200  rounded-lg px-6 py-4 cursor-pointer transition-all duration-200" >
    <span>Mağazada satılır?</span>
      <button
    type="button"
      onClick={toggle}
      className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ${
          checked ? "translate-x-6" : ""
        }`}
      ></div>
    </button>
  </div>
  );
}
