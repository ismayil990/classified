import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInfoCircle, FaGavel, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { IoIosMailUnread } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../../redux/slice';
import axios from 'axios';


export default function CardBasedMenu() {
  const { menuBar } = useSelector((state) => state.category);
  const [info, setInfo] = useState();
  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    { path: '/haqqimizda', label: 'Haqqımızda', icon: <FaInfoCircle /> },
    { path: '/qaydalar', label: 'Qaydalar', icon: <FaGavel /> }
    
  ];

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await axios.get("http://localhost:3001/siteinfo");
        setInfo(res.data);
        console.log(res.data.number);
      } catch (err) {
        console.log(err);
      }
    };
    getInfo();
  }, []);

  if (!menuBar) return null;

  return (
    <div className="fixed inset-0 z-[100] flex ">
      <div onClick={() => dispatch(closeMenu())} className="fixed inset-0 bg-gray-900/60" />
      <div className="relative z-[101] w-80 p-4 bg-gray-50 h-full shadow-2xl animate-slide-in">
        <div className='flex justify-between items-center mb-8'>
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <FaTimes onClick={() => dispatch(closeMenu())} className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800 transition-colors bg-white p-2 rounded-full shadow-sm hover:shadow-md" />
        </div>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.path} className="bg-white  rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <Link
                to={item.path}
                className={`flex  items-center gap-4 p-2 text-blue-600 bg-white text-gray-700 hover:text-blue-600'`}
              >
                <div className={`p-3 rounded-xl bg-gray-100  text-gray-600 
              `}>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <span className="font-semibold text-lg ">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className=' text-gray-800 mb-4 text-lg '>Bizimlə əlaqə</h3>
          <div className="space-y-3">
            <div className="bg-white  rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <a href={`https://wa.me/${info?.number}`} className='flex items-center gap-4 p-2 text-gray-700 hover:text-green-600'>
                <div className="bg-green-100  p-3 rounded-xl">
                  <FaWhatsapp className="text-green-600 text-lg" />
                </div>
                <span className="font-semibold ">Whatsapp</span>
              </a>
            </div>
            <div className="bg-white  rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <a href={`mailto:${info?.email}`} className='flex items-center gap-4 p-2 text-gray-700 hover:text-blue-600'>
                <div className="bg-blue-100  p-3 rounded-xl">
                  <IoIosMailUnread className="text-blue-600 text-lg" />
                </div>
                <span className="font-semibold ">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
