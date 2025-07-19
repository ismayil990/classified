import { useRef } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";

export default function MultiImageUpload({ value = [], onChange, placeholder = "Məhsul şəkilləri əlavə edin" }) {
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    // Mövcud fayllara əlavə et
    const updatedFiles = [...value, ...selectedFiles];
    onChange(updatedFiles);

    e.target.value = null; // input-u resetlə
  };

  const handleRemove = (index) => {
    const updatedFiles = value.filter((_, i) => i !== index);
    onChange(updatedFiles);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex items-center h-[60px] justify-start overflow-hidden flex-wrap gap-2 bg-white border border-gray-200 rounded-lg px-6  cursor-pointer hover:bg-gray-50 transition-all duration-200"
      >
        <PhotoCameraIcon className="text-gray-400 flex-shrink-0" />

        {value.length === 0 && <span className="truncate">{placeholder}</span>}

        {value.map((file, index) => (
          <div
            key={index}
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center gap-2 bg-gray-100 rounded-md p-1"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className="h-10 w-10 object-cover rounded-md border border-gray-200"
            />
            <span className="max-w-[100px] truncate text-xs">{file.name}</span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="p-1 rounded-full hover:bg-gray-300"
              title="Şəkli sil"
            >
              <CloseIcon className="text-gray-600 hover:text-gray-900" fontSize="small" />
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileRef}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
