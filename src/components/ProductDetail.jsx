import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Share2,Phone,User,Mail } from 'lucide-react';
import { fieldLabels } from "../../data/options";
import Loader from "../ui-components/Loader";
import { IncreaseCallCount } from "../../functions/increaseCallCount";
export default function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product,setProduct]=useState(null)

  // Mock data for tech products
  const productFields = [
  { key: "brand", label: "Marka" },
  { key: "model", label: "Model" },
  { key: "memory", label: "Yaddaş" },
  { key: "ram", label: "RAM" },
  { key: "color", label: "Rəng" },
  { key: "status", label: "Vəziyyəti" },
];

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`)
      .then(res => {
        setProduct(res.data);
       setLoading(false)
        console.log(res.data)
      })
      .catch(err => {
        console.error("Məhsul alınarkən xəta:", err);
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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showNotification(isFavorite ? 'Sevimlilərdən silindi' : 'Sevimlilərə əlavə edildi');
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


  const goBack = () => {
    window.history.back();
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: 600;
      box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
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
      
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="w-full mx-auto px-2 sm:px-2 lg:px-2">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={goBack}
              className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 bg-none border-0 cursor-pointer font-medium text-base p-2 rounded-xl hover:bg-slate-100"
            >
              <span className="text-xl">←</span>
              <span>Geri</span>
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleFavorite}
                className="p-2 text-slate-600 hover:text-red-600 transition-colors duration-200 bg-none border-0 cursor-pointer rounded-xl hover:bg-slate-100"
              >
                <span className="text-4xl text-gray-400">{isFavorite ? '♥' : '♡'}</span>
              </button>
              <button
                onClick={shareProduct}
                className="p-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 bg-none border-0 cursor-pointer rounded-xl hover:bg-slate-100"
              >
                <Share2 className="text-xl text-gray-400"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-full p-[10px] overflow-hidden mt-[20px] pb-[100px] max-[770px]:mt-[0px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Image Section */}
          <div className="space-y-6">
            <div className="bg-white overflow-hidden rounded-2xl tech-shadow-lg">
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
            
            {/* Thumbnail Navigation */}
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin">
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

          {/* Product Info */}
          <div className="space-y-8 animate-slide-in">
            
            {/* Product Title and Badges */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Premium et / 3 azn
                </span>
              </div>
              
              
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-3xl ">
              <div className="flex flex-col  items-start justify-between gap-[30px]">
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                {product.post_title}
              </h1>
                <div className="flex items-center justify-between w-full">
                  <p className="text-blue-100 text-sm font-bold mb-1">Qiymət</p>
                  <p className="text-white text-3xl font-bold">
                    {product.price} ₼
                  </p>
                </div>
              </div>
            </div>



            {/* Product Description */}
            <div className="bg-white rounded-3xl p-6 ">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Məhsul haqqında</h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {product.description}
              </p>
              
              {/* Specifications */}
      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
  {productFields.map(({ key, label }) => (
    product[key] ? (
      <div key={key} className="bg-slate-50 p-4 rounded-2xl border-l-[2px] border-blue-600">
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

    </div>
  );
}
