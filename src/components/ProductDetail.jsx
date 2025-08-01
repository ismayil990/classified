import { useNavigate, useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Share2,Phone,User,Mail,Heart, Flag } from 'lucide-react';
import Loader from "../ui-components/Loader";
import { IncreaseCallCount } from "../../functions/increaseCallCount";
import ImageGallery from "../ui-components/ImageGallery";
import ReportModal from "../ui-components/ReportModal"; 

export default function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [isReportOpen, setIsReportOpen] = useState(false);
  const [product,setProduct]=useState(null)
  const [open,setOpen]=useState(false)
  const navigate=useNavigate()
 const [favorites, setFavorites] = useState(() => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
});

const handleToggleFavorite = (e, id) => {
  e.preventDefault();
  let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (updatedFavorites.includes(id)) {
    updatedFavorites = updatedFavorites.filter(item => item !== id);
  } else {
    updatedFavorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  setFavorites(updatedFavorites);
};
 
  const productFields = [
  { key: "brand", label: "Marka" },
  { key: "model", label: "Model" },
  { key: "memory", label: "Yaddaş" },
  { key: "ram", label: "RAM" },
  { key: "processor", label: "Prosessor" },
  { key: "storage_type", label: "Yaddaş növü" },
   { key: "camera", label: "Kamera" },
  { key: "color", label: "Rəng" },
  { key: "status", label: "Vəziyyəti" },
];

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`)
      .then(res => {
        setProduct(res.data);
       setLoading(false)
      })
      .catch(err => {
        console.error( err);
        setLoading(false);
      });
  }, [id]);

 useEffect(() => {
  if (product && product.images?.length > 0) {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }
}, [product]);

  const changeImage = (index) => {
    setCurrentImageIndex(index);
  };

 
  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.post_title,
        text: 'Bu məhsulu yoxlayın!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('Link kopyalandı!');
      });
    }
  };

  const makeCall = () => {
    window.location.href = `tel:${product.contact}`;
    IncreaseCallCount(product._id)
  };


   const handlePremiumClick = (id) => {
    navigate(`/payment/${id}`);
  };


  if (loading) {
    return (
   <div className="flex items-center justify-center h-[100vh]">
     <Loader/>
   </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 text-red-600 text-2xl">⚠️</div>
          </div>
          <p className="text-slate-600 text-lg font-medium">Məhsul tapılmadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" style={{
      animation: 'fadeIn 0.6s ease-out'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .tech-shadow {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        
        .tech-shadow-lg {
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.1);
        }
        
        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #1e40af;
        }
      `}</style>
      
    
      <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="w-full mx-auto px-2 sm:px-2 lg:px-2">
          <div className="flex items-center justify-between h-16">
            <Link to="/"
             
              className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 bg-none border-0 cursor-pointer font-medium text-base p-2 rounded-xl hover:bg-slate-100"
            >
              <span className="text-xl">←</span>
              <span>Geri</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button
  onClick={() => setIsReportOpen(true)}
  className="p-2 text-slate-600 hover:text-red-500 transition-colors duration-200 rounded-xl hover:bg-slate-100"
  title="Şikayət et"
>
  <Flag className="w-5 h-5" />
</button>
              <button
                 onClick={(e) => handleToggleFavorite(e, product._id)}
                className="p-2 text-slate-600 hover:text-red-600 transition-colors duration-200 bg-none border-0 cursor-pointer rounded-xl hover:bg-slate-100"
              >
                <Heart className="text-2xl text-gray-400" fill={`${favorites.includes(product._id) ? "red" : "gray"}`}/>
              </button>
              <button
                onClick={shareProduct}
                className="p-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 bg-none border-0 cursor-pointer rounded-xl hover:bg-slate-100"
              >
                <Share2 className="text-2xl text-gray-400"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-full p-[10px] overflow-hidden mt-[20px] pb-[100px] max-[770px]:mt-[0px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
       
          <div className="space-y-6">
            <div onClick={()=>{setOpen(true)}} className="bg-white overflow-hidden rounded-2xl tech-shadow-lg">
              <div className="aspect-square relative">
                <img
                  src={product.images[currentImageIndex]}
                  alt={`Şəkil ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => changeImage(index)}
                      className={`w-[5px] h-[5px] rounded-full cursor-pointer transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
           
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin p-[5px]">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => changeImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden ring-2 shadow-md transition-all duration-200 hover:ring-4 cursor-pointer ${
                    index === currentImageIndex
                      ? 'ring-blue-600'
                      : 'ring-slate-200 hover:ring-blue-600'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Kiçik şəkil ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8 animate-slide-in">
            
            
          {product.isApproved === false ? <div className="bg-[#ffcc00] font-semibold text-black flex items-center p-2 rounded-md">
            Elanınız yoxlamaya göndərildi. Təsdiq edildikdən sonra saytda yayımlanacaq
          </div> :
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {product.premium != true ? <span onClick={()=>{handlePremiumClick(product._id)}} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Premium et / 3 azn
                </span> : <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Premium
                </span>}
              </div>
              
              
            </div>
          }

           
            <div className="bg-white text-white p-6 rounded-3xl ">
              <div className="flex flex-col  items-start justify-between gap-[30px]">
                <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                {product.post_title}
              </h1>
                <div className="flex items-center justify-between w-full">
                  <p className="text-black text-sm font-bold mb-1">Qiymət</p>
                  <p className="text-black text-3xl font-bold">
                    {product.price} ₼
                  </p>
                </div>
              </div>
            </div>



            
            <div className="bg-white rounded-3xl p-6 ">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Məhsul haqqında</h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {product.description}
              </p>
              
         
      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
  {productFields.map(({ key, label }) => (
    product[key] ? (
      <div key={key} className="flex justify-between bg-slate-50 p-4 rounded-xl border-l-[2px] border-blue-600">
        <p className="text-slate-600 text-sm font-medium">{label}</p>
        <p className="text-slate-800 font-bold">{product[key]}</p>
      </div>
    ) : null
  ))}
</div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-3xl p-6  space-y-4">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Satıcı məlumatları</h3>
              
             <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg"><User className="text-blue-600"/></span>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Satıcının adı</p>
                    <p className="text-slate-800 font-semibold">{product.name}</p>
                  </div>
                </div>
              
            
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg"><Phone className="text-blue-600"/></span>
                  </div>
              
                  <div onClick={()=>{makeCall()}}>
                    <p className="text-slate-600 text-sm font-medium">Telefon</p>
                    <p className="text-blue-500 font-semibold">{product.contact}</p>
                  </div>
                </div>
                
                {product.email && (
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg"><Mail className="text-blue-600"/></span>
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm font-medium">Email</p>
                      <p className="text-slate-800 font-semibold">{product.email}</p>
                    </div>
                  </div>
                )}
              
            </div>
          </div>
        </div>
      </div>
      <span onClick={makeCall} className="fixed w-[90%] left-[50%] translate-x-[-50%] bottom-2 p-2 flex items-center justify-center rounded-md font-bold bg-red-600 text-white min-[760px]:hidden">Zəng et</span>
<ImageGallery open={open} images={product.images} setOpen={setOpen}/>
<ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} postId={product._id} />

    </div>
  );
}
