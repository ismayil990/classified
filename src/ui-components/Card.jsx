import { useState,useEffect } from "react";
import { Heart,Gem } from "lucide-react";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../functions/addfavorite";

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
     style={{ boxShadow:' 2px 2px 4px rgba(0,0,0,0.1)'}}
      className={`relative bg-white border-[1px] border-gray-200 rounded-[7px] overflow-hidden hover:shadow-sm hover:scale-105 transition-all duration-300 cursor-pointer`}
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
          </span> :  <span className="absolute z-[1] top-[55%] translate-y-[-50%]  left-0 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-r-[5px] px-3 py-1 font-bold shadow-lg">
           İkinci əl
          </span> 
        }
        {post.premium === true ?  <span className="absolute right-2 top-[50%] bg-white text-white text-xs rounded-full p-[3px] font-bold shadow-lg">
           <Gem size={20} className="text-orange-500 border-0"/>
          </span> : null}
      </div>
      <div className="p-4 bg-white backdrop-blur-sm">
        <p className="text-lg font-bold text-black/70 mb-1">{post.price} AZN</p>
        <p className="text-sm text-black/70 font-medium line-clamp-2 mb-2">{post.post_title}</p>
        <p className="text-xs text-black/50 font-medium">{post.city}</p>
      </div>
    </Link>
  );
}
