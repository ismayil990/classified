import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Play, Star, Copy, BarChart3, Share2, Download, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Myposts(){
    const [posts,setPosts]=useState([])
    const navigate=useNavigate()
     useEffect(() => {
    const fetchProfile = async () => {

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("https://backend-kmti.onrender.com/my-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       setPosts(response.data.posts)
        console.log(response.data)
      } catch (err) {
        console.log(err);
        
      }
    };

    fetchProfile();
  }, []);

   const handlePremiumClick = (id) => {
    navigate(`/payment/${id}`);
  };
    return(
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 p-2 max-[645px]:grid-cols-1 pb-[50px] ">
        {posts?.map((post,index)=>{
            return  <div className="bg-white rounded-lg shadow-md border border-slate-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex space-x-4">
            <img 
              src={post.images[0]} 
              alt={post.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-slate-900">{post.title}</h3>
              <p className="text-slate-600 text-sm">{post.description}</p>
              <p className="text-slate-500 text-sm">{post.city}</p>
              <span className="text-xl font-bold text-blue-600">{post.price + "  Azn"}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2  gap-2">
          <button 
          onClick={()=>{handlePremiumClick(post._id)}}
            className="flex items-center justify-center px-3 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            <Star className="w-4 h-4 mr-2" />
            Premium et
          </button>
          <button 
            variant="outline"
            className="flex items-center justify-center px-3 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Sil
          </button>
        </div>
      </div>
    </div>
        })}
      </div>
    )
}