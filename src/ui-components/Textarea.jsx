export default function Textarea({ placeholder, value, onChange }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        flex items-center focus:ring-1 focus:ring-blue-500 justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-opacity-20 resize-none
      "
    />
  );
}
