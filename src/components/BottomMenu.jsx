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
    <div className="fixed left-[50%] translate-x-[-50%] h-[60px] bottom-[0px]  w-full  z-[70]">
      <div className="bg-white  shadow-xl px-4 py-2 border border-gray-100">
        <div className="flex items-center justify-between ">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col gap-[5px] items-center rounded-full transition-all ${activeTab === 'home' ? 'text-red-500' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaHome className="text-[23px]" />
            <p className='text-[10px]'>Əsas</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('explore')}
            className={` flex flex-col gap-[5px] items-center rounded-full transition-all ${activeTab === 'explore' ? 'text-red-500' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaCompass className="text-[23px]" />
            <p className='text-[10px]'>Sevimlilər</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('add')}
            className="relative text-gray-400  flex flex-col gap-[5px] items-center"
          >
            <div className='absolute top-[-25px] bg-red-600 text-white p-2 flex flex-col items-center  rounded-full shadow-md transform scale-100 hover:scale-130 transition-all'>
            <FaPlus className="text-[23px]" />
            </div>
            <p className='mt-6 text-[10px]'>Yeni elan</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('saved')}
            className={` flex flex-col gap-[5px] items-center rounded-full transition-all ${activeTab === 'saved' ? 'text-red-500' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaUser className="text-[20px]" />
            <p className='text-[10px]'>Profil</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={` flex flex-col gap-[5px] items-center rounded-full transition-all ${activeTab === 'profile' ? 'text-red-500' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaUser className="text-[20px]" />
            <p className='text-[10px]'>Menu</p>
          </button>
        </div>
      </div>
    </div>
  );
};

