import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, User, Heart, Menu,SlidersHorizontal } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleCategorySheet} from "../../redux/slice";
import categoryIcon from "../assets/category.png";
import SearchProduct from "../ui-components/SearchProduct";


export default function Header() {
  const dispatch = useDispatch();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Aşağı gedir və 200px-dən artıqdırsa gizlət
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        // Yuxarı gedirsə hər halda göstər
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-[30] w-full flex justify-between items-center h-[60px] px-6 max-[643px]:px-2 bg-white transition-all duration-500 ease-in-out ${
        showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="flex items-center gap-5 max-[643px]:w-full max-[643px]:justify-between">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-[5px] flex items-center justify-center ">
            <Menu className="text-black w-6 h-6" />
          </div>
          <h1 className="text-black font-bold text-2xl max-[400px]:text-xl">Texnomart</h1>
        </div>
        <div
          className="w-auto bg-blue-400 p-[4px] px-2 rounded-[7px] max-[643px]:bg-white flex items-center justify-center gap-[10px]  cursor-pointer  transition-all duration-300"
          onClick={() => {
            dispatch(toggleCategorySheet());
          }}
        >
          <img src={categoryIcon} className="min-[643px]:hidden"/>
          <h1 className="text-white  font-medium max-[643px]:hidden">Kateqoriya</h1>
        </div>
      </div>

      <div className="absolute flex items-center  px-6 top-15 left-0 w-full p-2 bg-white max-[643px]:px-2">
        <SearchProduct />
      </div>

      <div className="flex max-[643px]:hidden items-center gap-[15px]">
        <Link to="/favorites" className="shadow-[_2px_2px_4px_#d1d1d1,_-8px_-8px_16px_#ffffff] rounded-[7px] flex items-center justify-center p-[8px] cursor-pointer hover:shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff] transition-all duration-300">
          <Heart className="text-gray-600 w-5 h-5" />
        </Link>
        <Link to="/login" className="shadow-[_2px_2px_4px_#d1d1d1,_-8px_-8px_16px_#ffffff] rounded-[7px] flex items-center justify-center p-[8px] cursor-pointer hover:shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff] transition-all duration-300">
          <User className="text-gray-600 w-5 h-5" />
        </Link>
        <Link to="/yeni">
          <button className="text-gray-700 shadow-[_2px_2px_4px_#d1d1d1,_-8px_-8px_16px_#ffffff] rounded-xl px-4 py-2 text-sm font-semibold hover:shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff] transition-all duration-300 hidden sm:flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni elan
          </button>
        </Link>
      </div>
    </header>
  );
}
