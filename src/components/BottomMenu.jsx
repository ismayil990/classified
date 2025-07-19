import React, { useState } from 'react';
import { Home, Store, Plus, Heart, User,Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function BottomMenu(){
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Ana Səhifə', path:"/", icon: Home },
    { id: 'messages', label: 'Sevimlilər',path:"/favorites", icon: Heart },
    { id: 'add', label: 'Yeni elan',path:"/yeni", icon: Plus },
    { id: 'profile', label: 'Profil',path:"/dashboard", icon: User },
    { id: 'profile', label: 'Menu',path:"/category", icon: Menu }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white  z-30 min-[643px]:hidden" >
      <div className="flex justify-around items-center p-[2px] pb-[3px] border-t-[1px] border-slate-200">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Link to={item.path}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center min-w-0 flex-1 bg-white pt-[5px]"
            >
              <div 
                className={`w-8 h-8 bg-white rounded-full flex items-center justify-center mb-1 "}`}
               
              >
                <Icon 
                  size={20} 
                  className={isActive ? 'text-blue-500' : 'text-gray-500'}
                />
              </div>
              <span className={`text-xs ${isActive ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};


