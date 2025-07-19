export default function Input({type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
       w-full h-[60px] flex items-center justify-between bg-white border border-gray-200 rounded-lg  px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-opacity-20
      "
    />
  );
}
