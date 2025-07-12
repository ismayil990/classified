import { useState } from "react";
import axios from "axios";

export default function OptionsEditor({ category, fieldIndex, options, onOptionsUpdate,onChange }) {
  const [newOption, setNewOption] = useState("");

  const addOption = async () => {
  if (!newOption.trim()) return;
  const newOptions = [...options, newOption.trim()];

  await axios.patch(`http://localhost:3001/formconfigs/${category}/updateOptions`, {
    fieldIndex,
    options: newOptions,
  });

  onChange(newOptions);
  setNewOption("");
};

  const removeOption = async (index) => {
  const newOptions = options.filter((_, i) => i !== index);

  await axios.patch(`http://localhost:3001/formconfigs/${category}/updateOptions`, {
    fieldIndex,
    options: newOptions,
  });

  onChange(newOptions);
};

  return (
    <div className="space-y-2">
      <div className="flex">
        <input
          type="text"
          placeholder="Yeni option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-2 py-1 focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="button"
          onClick={addOption}
          className="bg-green-500 text-white px-3 rounded-r hover:bg-green-600"
        >
          +
        </button>
      </div>

      <div className="border border-gray-300 rounded max-h-36 overflow-y-auto">
        {options.length === 0 && (
          <div className="text-gray-400 text-sm p-2">Option yoxdur</div>
        )}
        {options.map((opt, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b last:border-0 px-2 py-1"
          >
            <span>{opt}</span>
            <button
              type="button"
              onClick={() => removeOption(idx)}
              className="text-red-500 text-sm hover:text-red-600"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
