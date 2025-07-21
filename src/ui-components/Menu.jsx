import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInfoCircle, FaGavel, FaArrowLeft,FaWhatsapp } from 'react-icons/fa';
import { IoIosMailUnread } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../../redux/slice';

export default function Menu() {
  const { menuBar } = useSelector((state) => state.category);
  const location = useLocation();
  const dispatch=useDispatch()

  const menuItems = [
    { path: '/haqqimizda', label: 'Haqqımızda', icon: <FaInfoCircle /> },
    { path: '/qaydalar', label: 'Qaydalar', icon: <FaGavel /> },
  ];

  if (!menuBar) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div onClick={()=>dispatch(closeMenu())} className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Sidebar */}
      <div className="relative z-[101] w-64 p-2 bg-white border-r border-gray-200 h-full shadow-md">
     <div className='flex justify-between items-center'>
         <h2 className="text-lg font-semibold mb-4 text-gray-700">Menu</h2>
        <FaArrowLeft onClick={()=>dispatch(closeMenu())} className="text-lg font-semibold mb-4 text-gray-700"/>
     </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-2 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-red-100 text-red-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-2 pt-[10px]">
          <h1 className='font-medium'>Bizimlə əlaqə</h1>
          <a href='https://wa.me/+994773184121' className='p-2 flex items-center gap-[10px]'><FaWhatsapp className='text-green-600 text-[20px]'/> Whatsapp</a>
                  <a href='mailto:someone@example.com' className='p-2 flex items-center gap-[10px]'><IoIosMailUnread className='text-blue-600 text-[20px]'/> Email</a>
        </ul>
      </div>
    </div>
  );
}
