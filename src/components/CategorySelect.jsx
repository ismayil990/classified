import { useEffect, useState } from "react";
import { CarFront, LaptopMinimal, Smartphone, X,Tally4} from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { openCategorySheet } from "../../redux/slice";
import { closeCategorySheet } from "../../redux/slice";
import { changeCategory } from "../../redux/slice";
import CircularProgress from '@mui/material/CircularProgress';
import { getCategories } from "../../redux/slice";
import { LuGamepad2 } from "react-icons/lu";
export default function CategorySelect({ setCategoryName }) {
  const { openCategoryMenu,categoryName,loading,categories } = useSelector((state) => state.category);
  const [animationClass, setAnimationClass] = useState("animate-slideUp");
  const dispatch = useDispatch();

  useEffect(() => {
dispatch(getCategories())
}, []);

  // Ekran ölçüsünə görə animasiyanı dəyiş
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setAnimationClass("animate-slideRight");
      } else {
        setAnimationClass("animate-slideUp");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

const handleCategoryChange = (name) => {
  dispatch(changeCategory({categoryName:name}))
  dispatch(closeCategorySheet());
};


  if (!openCategoryMenu) return null;

  return (
    <>

      <div
        onClick={() => dispatch(closeCategorySheet())}
        className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50"
      ></div>


      <div className={`fixed   bottom-0 left-0 right-0 lg:left-0 lg:top-0 lg:h-full lg:w-[300px] lg:rounded-none z-60 bg-white rounded-t-3xl p-4 border-t border-gray-100 transition-transform duration-300 ${animationClass}`}>
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-lg text-slate-800">Kateqoriya seç</p>
          <button onClick={() => dispatch(closeCategorySheet())}>
            <X className="text-slate-600" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
           <button
              type="button"
              key={0}
              onClick={() => handleCategoryChange("Bütün elanlar")}
              className={`flex items-center gap-2 p-3 rounded-xl transition ${
                categoryName === "Bütün elanlar" ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <p className="font-medium text-[16px]">Bütün elanlar</p>
            </button>
            {loading ? (
  <div className="flex justify-center p-4">
    <CircularProgress size={30}/>
  </div>
) : (
  categories.map((category) => (
    <button
      type="button"
      key={category.name}
      onClick={() => handleCategoryChange(category.name)}
      className={`flex items-center gap-2 p-3 rounded-xl transition ${
        categoryName === category.name ? "bg-gray-50" : "hover:bg-gray-50"
      }`}
    >
      <p className="font-medium text-[16px]">{category.name}</p>
    </button>
  ))
)}
        </div>
      </div>

 
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slideRight {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        .animate-slideRight {
          animation: slideRight 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
