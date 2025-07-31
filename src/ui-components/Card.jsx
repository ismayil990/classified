import { useState,useEffect } from "react";
import { Heart,Gem } from "lucide-react";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../functions/addfavorite";
import { RiVipCrownFill } from "react-icons/ri";
export default function PostCard({ post }) {
     const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleFavoriteClick = (e, id) => {
    toggleFavorite(e, id);
    const updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(updatedFavorites);
  };
  return (
    <Link to={`/product/${post._id}`}
     
      className={`relative bg-white dark:bg-[#383838] border-[1px] border-gray-200 dark:border-gray-700  rounded-[7px] overflow-hidden hover:shadow-sm hover:scale-105 transition-all duration-300 cursor-pointer`}
    >
      <div className=" w-full max-[450px]:h-[150px] h-[180px] overflow-hidden">
        <img
          src={post.images[0]}
          alt={post.title}
          className="w-full h-full object-cover"
        />
       
          <Heart  className={` absolute top-2 right-2  w-[25px] h-[25px] ${favorites.includes(post._id) ? "text-red-600" : "text-gray-500"} `} onClick={(e)=>{handleFavoriteClick(e,post._id)}} fill={favorites.includes(post._id) ? "red" : "slate"} />
      
        {post.status === "Yeni" ? 
          <span className="absolute z-[1] top-[55%] translate-y-[-50%]  left-0 bg-gradient-to-r from-blue-400 to-blue-500 text-white text-xs rounded-r-[5px] px-3 py-1 font-bold shadow-lg">
           YENİ
          </span> :  <span className="absolute z-[1] top-[55%] translate-y-[-50%]  left-0 bg-red-600 text-white text-xs rounded-r-[5px] px-3 py-1 font-bold shadow-lg">
           İkinci əl
          </span> 
        }
        {post.premium === true ?  <span className="absolute right-2 top-[50%] bg-white text-white w-[40px] flex items-center justify-center text-xs rounded-md p-[3px] font-bold shadow-lg">
           <RiVipCrownFill size={20} className="text-red-500 border-0"/>
          </span> : null}
      </div>
      <div className="p-4 bg-white dark:bg-[#383838] backdrop-blur-sm">
        <p className="text-lg font-bold text-black/70 mb-1 dark:text-white">{post.price} AZN</p>
        <p className="text-sm text-black/70 font-medium line-clamp-2 mb-2 dark:text-white">{post.post_title}</p>
        <p className="text-xs text-black/50 font-medium dark:text-white">{post.city}</p>
      </div>
    </Link>
  );
}
