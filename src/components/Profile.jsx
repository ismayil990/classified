
import { useState,useEffect } from "react";
import axios from "axios";
import PageHeader from "../ui-components/PageHeader";
import Statistic from "./profile-pages/Statistics";
import Loader from "../ui-components/Loader";
import Myposts from "./profile-pages/MyPosts";

export default function UserProfile() {
    const [activeTab,setActiveTab]=useState(1)
    const [user,setUser]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(() => {
    const fetchProfile = async () => {
        setLoading(true)
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("https://backend-kmti.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false)
        console.log(response.data)
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };

    fetchProfile();
  }, []);


  if(loading){
   return <div className="flex items-center justify-center h-[100vh] lg:mt-[-50px]">
         <Loader/>
       </div>
  }

  return (
<>
<PageHeader title="Profil"/>
 <div className="w-full min-h-[100vh] backdrop-blur-lg pb-[60px] pt-[50px]">
      <div className="bg-white   overflow-hidden min-h-[100vh] noscroll">
        {/* Mobile Header */}
        <div className="bg-white p-6 text-white">
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
              alt="Profil Resmi" 
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-3 border-white"
            />
            <h2 className="text-xl font-bold text-black/30">{user?.name}</h2>
            <p className="text-sm text-black/50">{user?.email}</p>
            <p className="text-sm text-black/50">{user?.contact}</p>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="px-2 py-4 flex ">
          <div className="grid grid-cols-4 gap-2 text-xs">
            <button onClick={()=>{setActiveTab(1)}} className={`p-3 ${activeTab===1 ? "bg-teal-50" : "bg-white"} hover:bg-gray-50 text-teal-600 rounded-lg font-medium text-center`}>Statistika</button>
            <button onClick={()=>{setActiveTab(2)}} className={`p-3 ${activeTab===2 ? "bg-teal-50" : "bg-white"} hover:bg-gray-50 text-teal-600 rounded-lg font-medium text-center`}>İlanlarım</button>
            <button onClick={()=>{setActiveTab(3)}} className={`p-3 ${activeTab===3 ? "bg-teal-50" : "bg-white"} hover:bg-gray-50 text-teal-600 rounded-lg font-medium text-center`}>Ödemeler</button>
            <button onClick={()=>{setActiveTab(4)}} className={`p-3 ${activeTab===4 ? "bg-teal-50" : "bg-white"} hover:bg-gray-50 text-teal-600 rounded-lg font-medium text-center`}>Çıkış</button>
          </div>
        </div>
        
        {/* Mobile Stats */}
    {activeTab===1 &&  <Statistic/>}
    {activeTab===2 && <Myposts/>}
      </div>
    </div>
</>
  );
}
