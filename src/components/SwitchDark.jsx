import { useState, useEffect } from "react";

export default function DarkModeSwitch() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <label className="flex items-center justify-between cursor-pointer select-none">
      <span className="mr-2 text-black dark:text-gray-300">Qaranlıq rejim</span>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
       
        <div
          className={`w-10 h-6 rounded-full shadow-inner transition-colors duration-300 ${
            darkMode ? "bg-gray-700" : "bg-white"
          }`}
        ></div>
       
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-300 ${
            darkMode
              ? "translate-x-4 bg-white"
              : "translate-x-0 bg-red-600"
          }`}
        ></div>
      </div>
    </label>
  );
}
