export default function Button({ text,type = "button", ...props}) {
  return (
    <button
   type={type}
    {...props}
 
      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-primary-700 font-medium disabled:opacity-50"
    >
      {text}
    </button>
  );
}
