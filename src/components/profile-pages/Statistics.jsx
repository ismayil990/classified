import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, Eye, Phone } from "lucide-react";
import CircularProgress from '@mui/material/CircularProgress';
import { MdOutlineError } from "react-icons/md";
export default function Statistic(){
  const [statistics,setStatistics]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
      useEffect(() => {
      const fetchProfile = async () => {
  setLoading(true)
        const token = localStorage.getItem("token");
        if (!token) return;
  
        try {
          const response = await axios.get("https://backend-kmti.onrender.com/views-stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         setStatistics(response.data)
           setLoading(false)
          console.log(response.data)
        } catch (err) {
          console.log(err);
            setLoading(false)
            setError("Xəta baş verdi yenidən cəhd edin")
          
        }
      };
  
      fetchProfile();
    }, []);

    if(error){
      return <div className="w-full pt-[50px] flex flex-col items-center justify-center gap-[20px]">
        <MdOutlineError size={50} className="text-red-500"/>
      <p className="text-slate-700">{error}</p>
      </div>
    }
    return(
           <div className="px-6 pb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-teal-600 mr-3" />
                <span className="text-sm font-medium">Aktif elan</span>
              </div>
              <span className="text-lg font-bold text-teal-600">{loading ? <CircularProgress size={15} className="text-black"/> : statistics?.totalPosts}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium">Görüntüləmə</span>
              </div>
              <span className="text-lg font-bold text-blue-600">{loading ? <CircularProgress size={15} className="text-black"/> : statistics?.totalViews}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-sm font-medium">Əlaqə</span>
              </div>
              <span className="text-lg font-bold text-red-600">{loading ? <CircularProgress size={15} className="text-black"/> : statistics?.totalContacts}</span>
            </div>
          </div>
        </div>
    )
}