import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Play, Star, Copy, BarChart3, Share2, Download, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { MdOutlineError } from "react-icons/md";
import Button from "../../ui-components/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Myposts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Posts-u backend-dən çəkmək üçün funksiya
  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("https://backend-kmti.onrender.com/my-posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.posts);
      setLoading(false);
    } catch (err) {
      setError("Xəta baş verdi yenidən cəhd edin");
      setLoading(false);
    }
  };

  // İlk yüklənmədə çağır
  useEffect(() => {
    fetchProfile();
  }, []);

  // Delete üçün custom confirm toast
  const confirmDelete = (id) => {
    const ToastContent = () => (
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <p>Bu elanı silmək istədiyinizə əminsiniz?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
          >
            Xeyr
          </button>
          <button
            onClick={() => {
              deletePost(id);
              toast.dismiss();
            }}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Bəli
          </button>
        </div>
      </div>
    );

    toast.warning(<ToastContent />, {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      position: "top-center",
      className:"flex flex-col gap-[15px]",
    });
  };

  // Elanı silmə funksiyası
  const deletePost = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/delete-post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Elan uğurla silindi.");
      fetchProfile(); 
    } catch (error) {
      console.error("Elan silinərkən xəta baş verdi:", error);
      toast.error("Xəta baş verdi, zəhmət olmasa yenidən cəhd edin.");
    }
  };

  const handlePremiumClick = (id) => {
    navigate(`/payment/${id}`);
  };

  if (error) {
    return (
      <div className="w-full pt-[50px] flex flex-col items-center justify-center gap-[20px]">
        <MdOutlineError size={50} className="text-red-500" />
        <p className="text-slate-700">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center pt-[50px]">
        <CircularProgress size={30} className="text-black" />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 p-2 max-[645px]:grid-cols-1 pb-[50px] ">
      {posts.length > 0 ? posts.map((post) => (
        <div className="bg-white rounded-lg shadow-md border border-slate-200" key={post._id}>
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

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handlePremiumClick(post._id)}
                className="flex items-center justify-center px-3 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                <Star className="w-4 h-4 mr-2" />
                Premium et
              </button>
              <button 
                className="flex items-center justify-center px-3 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                onClick={() => confirmDelete(post._id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Sil
              </button>
            </div>
          </div>
        </div>
      )) : (
        <div className="w-full h-full pt-[50px] flex flex-col items-center justify-center">
          <p>Elan paylaşmamısınız</p>
          <Link to="/yeni">
            <Button text="Yeni elan" />
          </Link>
        </div>
      )}
    </div>
  );
}
