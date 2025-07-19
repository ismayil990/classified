import  { useState } from 'react';
import { 
  FaHome, 
  FaSearch, 
  FaPlus, 
  FaHeart, 
  FaUser, 
  FaTh, 
  FaCompass, 
  FaBookmark, 
  FaEnvelope, 
  FaUserCircle,
  FaComments,
  FaBell,
  FaCog,
  FaFire,
  FaThumbsUp,
  FaThLarge,
  FaTags,
  FaList,
  FaLeaf,
  FaTree,
  FaRocket,
  FaStar,
  FaMap
} from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";

export default function BottomMenu() {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="fixed left-[50%] translate-x-[-50%] bottom-[0px]  w-full  z-[70]">
      <div className="bg-white  shadow-xl px-2 py-2 border border-gray-100">
        <div className="flex items-center justify-between ">
          <button 
            onClick={() => setActiveTab('home')}
            className={`p-2 rounded-full transition-all ${activeTab === 'home' ? 'bg-amber-500 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaHome className="text-lg" />
          </button>
          
          <button 
            onClick={() => setActiveTab('explore')}
            className={`p-2 rounded-full transition-all ${activeTab === 'explore' ? 'bg-amber-500 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaCompass className="text-lg" />
          </button>
          
          <button 
            onClick={() => setActiveTab('add')}
            className="bg-red-600 text-white p-2 rounded-full shadow-lg transform scale-100 hover:scale-130 transition-all"
          >
            <FaPlus className="text-lg" />
          </button>
          
          <button 
            onClick={() => setActiveTab('saved')}
            className={`p-2 rounded-full transition-all ${activeTab === 'saved' ? 'bg-amber-500 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaBookmark className="text-lg" />
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`p-2 rounded-full transition-all ${activeTab === 'profile' ? 'bg-amber-500 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaUser className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

