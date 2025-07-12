import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, Eye, Phone } from "lucide-react";
export default function Statistic(){
  const [statistics,setStatistics]=useState([])
      useEffect(() => {
      const fetchProfile = async () => {
  
        const token = localStorage.getItem("token");
        if (!token) return;
  
        try {
          const response = await axios.get("https://backend-kmti.onrender.com/views-stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         setStatistics(response.data)
          console.log(response.data)
        } catch (err) {
          console.log(err);
          
        }
      };
  
      fetchProfile();
    }, []);
    return(
           <div className="px-6 pb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-teal-600 mr-3" />
                <span className="text-sm font-medium">Aktif elan</span>
              </div>
              <span className="text-lg font-bold text-teal-600">{statistics?.totalPosts}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium">Görüntüləmə</span>
              </div>
              <span className="text-lg font-bold text-blue-600">{statistics?.totalViews}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-sm font-medium">Əlaqə</span>
              </div>
              <span className="text-lg font-bold text-red-600">{statistics?.totalContacts}</span>
            </div>
          </div>
        </div>
    )
}