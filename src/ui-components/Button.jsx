export default function Button({ text,type = "button", ...props}) {
  return (
    <button
   type={type}
    {...props}
 
      className="px-6 py-[3px] h-[55px] bg-red-600 text-white rounded-md hover:bg-primary-700 font-medium disabled:opacity-50"
    >
      {text}
    </button>
  );
}
