import  { useState } from 'react';
import { 
  FaHome, 
  FaSearch, 
  FaPlus, 
  FaHeart, 
  FaUser, 
  FaTh, 
  FaCompass, 

} from 'react-icons/fa';
import { BiSolidCategory } from "react-icons/bi";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { openCategorySheet } from '../../redux/slice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
export default function BottomMenu() {
  const [activeTab, setActiveTab] = useState('home');
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location = useLocation();
const currentPath = location.pathname;
  
  return (
    <div className="fixed left-[50%] translate-x-[-50%] h-[60px] bottom-[-5px]  w-full  z-[60] min-[643px]:hidden">
      <div className="bg-white  shadow-xl px-4 py-2 border border-gray-100">
        <div className="flex items-center justify-between ">
          <Link to="/" 
            className={`flex flex-col gap-[5px] items-center rounded-full transition-all ${ currentPath === '/' ? 'text-red-500' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaHome className="text-[20px]" />
            <p className='text-[10px]'>Əsas</p>
          </Link>
          
          <Link to="/favorites" 
            className={` flex flex-col gap-[5px] items-center rounded-full transition-all ${ currentPath === '/favorites' ? 'text-red-500' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaHeart className="text-[20px]" />
            <p className='text-[10px]'>Sevimlilər</p>
          </Link>
          
          <Link to="/yeni"
            className="relative text-gray-400  flex flex-col gap-[5px] items-center"
          >
            <div className='absolute top-[-25px] bg-red-600 text-white p-[10px] flex flex-col items-center  rounded-full shadow-md transform scale-100 hover:scale-130 transition-all'>
            <FaPlus className="text-[23px] font-small" />
            </div>
            <p className='mt-6 text-[10px]'>Yeni elan</p>
          </Link>
          
          <Link to="/dashboard" 
  
            className={` flex flex-col gap-[5px] items-center rounded-full transition-all ${ currentPath === '/login' || currentPath==="/dashboard" ? 'text-red-500' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <FaUser className="text-[20px]" />
            <p className='text-[10px]'>Profil</p>
          </Link>
          
        <button 
  onClick={() => {
    navigate("/")
    dispatch(openCategorySheet());
  }}
  className={` flex flex-col gap-[5px] items-center rounded-full transition-all text-gray-400 hover:bg-gray-100`}
>
  <BiSolidCategory className="text-[20px]" />
  <p className='text-[10px]'>Kataloq</p>
</button>
        </div>
      </div>
    </div>
  );
};

