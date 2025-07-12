import { Smartphone, Laptop } from "lucide-react";

export default function CategoryNav({ currentCategory, onCategoryChange }) {
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <button 
            onClick={() => onCategoryChange("phones")}
            className={`flex items-center border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              currentCategory === "phones" 
                ? "border-primary-600 text-primary-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Telefonlar
          </button>
          <button 
            onClick={() => onCategoryChange("computers")}
            className={`flex items-center border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              currentCategory === "computers" 
                ? "border-primary-600 text-primary-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Laptop className="w-4 h-4 mr-2" />
            Bilgisayarlar
          </button>
        </div>
      </div>
  );
}
