export default function Modal({ isOpen, onClose, messageList }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-[400px] w-full">
        <h2 className="text-lg font-semibold mb-4">Xəta</h2>
        <p className="mb-3">Zəhmət olmasa aşağıdakı xanaları doldurun:</p>

        <div className="flex flex-col gap-2 mb-4">
          {messageList.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-700"
            >
              <span className="text-red-500 font-semibold">•</span> {item}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Bağla
        </button>
      </div>
    </div>
  );
}
