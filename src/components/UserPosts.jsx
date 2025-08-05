import { useNavigate, useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Share2,Phone,User,Mail,Heart, Flag } from 'lucide-react';
import Loader from "../ui-components/Loader";
import { IncreaseCallCount } from "../../functions/increaseCallCount";
import ImageGallery from "../ui-components/ImageGallery";
import ReportModal from "../ui-components/ReportModal"; 
import PageHeader from "../ui-components/PageHeader";
import PostCard from "../ui-components/Card";

export default function UserPosts() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [isReportOpen, setIsReportOpen] = useState(false);
  const [posts,setPosts]=useState(null)
  const [user,setUser]=useState(null)
  const [open,setOpen]=useState(false)
  const navigate=useNavigate()
 const [favorites, setFavorites] = useState(() => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
});


 


  useEffect(() => {
    axios.get(`http://localhost:3001/userposts/${id}`)
      .then(res => {
        setPosts(res.data.posts);
        setUser(res.data.user)
       setLoading(false)
       console.log(res.data)
      })
      .catch(err => {
        console.error( err);
        setLoading(false);
      });
  }, [id]);



  if (loading) {
    return (
   <div className="flex items-center justify-center h-[100vh]">
     <Loader/>
   </div>
    );
  }

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" style={{
      animation: 'fadeIn 0.6s ease-out'
    }}>
     <PageHeader title="İstifadəçinin elanları"/>
<div className="w-full flex items-center justify-center bg-gray-100">
       <div className="w-[98%] flex flex-col  mt-[70px] bg-white rounded-xl p-2 border-1 border-gray-100">
        <span className="flex justify-between gap-[20px] p-2">
            <p className="font-bold">Satıcı</p>
            <p>{user?.name}</p>
        </span>
           <span className="flex justify-between p-2">
            <p className="font-bold">Telefon</p>
            <p>{user?.contact}</p>
        </span>
           <span className="flex justify-between p-2">
            <p className="font-bold">Email</p>
            <p>{user?.email}</p>
        </span>
     </div>
  </div> 
     <div className="w-full pt-[70px] p-4 max-[450px]:p-2 max-[450px]:pt-16  bg-slate-100 overflow-hidden mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-[420px]:gap-[3px] gap-[15px] ">
{posts?.map((post)=>{
    return <PostCard post={post}/>
})}
</div>
    </div>
  );
}
