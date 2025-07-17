import { useState } from "react";
import axios from "axios";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchPosts, showSearch } from "../../redux/postsSlice";

export default function SearchProduct() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
  };

const handleSearch = async () => {
  if (text.trim() !== "") {
    await dispatch(searchPosts(text));  // search tamamlanana qədər gözlə
    dispatch(showSearch());
    setText(""); // input sahəsini sıfırla
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSearch();
    }
  };

  return (
    <div className="flex w-full">
      <Link
        to="/advanced"
        className="flex items-center justify-center w-[42px] h-[42px] bg-gray-50 border-r-[0px] border-[1px] border-gray-200 rounded-l-[7px]"
      >
        <SlidersHorizontal className="text-blue-600 cursor-pointer" />
      </Link>

      <input
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Məhsul axtar..."
        className="w-full bg-gray-50 border border-gray-200 px-4 py-2 focus:outline-none"
      />

      <div
        onClick={handleSearch}
        className="flex items-center justify-center w-[42px] h-[42px] bg-gray-50 border-l-[0px] border-[1px] border-gray-200 rounded-r-[7px]"
      >
        <Search className="text-blue-600 cursor-pointer" />
      </div>
    </div>
  );
}
