import React, { useState } from 'react';
import { Home, Store, Plus, Heart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BottomMenu() {
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Ana Səhifə', path: '/', icon: Home },
    { id: 'messages', label: 'Sevimlilər', path: '/favorites', icon: Heart },
    { id: 'add', label: 'Yeni elan', path: '/yeni', icon: Plus },
    { id: 'profile', label: 'Profil', path: '/dashboard', icon: User },
    { id: 'menu', label: 'Menyu', path: '/category', icon: Menu },
  ];

  return (
    <div className="fixed h-[53px] bottom-0 left-0 right-0 bg-white z-30 min-[643px]:hidden">
      <div className="flex justify-around items-center p-[2px] pb-[3px] border-t border-slate-200">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isAddTab = item.id === 'add';

          return (
            <Link
              to={item.path}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center min-w-0 flex-1 relative"
            >
              {/* Icon */}
              <div
                className={`
                  flex items-center justify-center
                  mb-[2px]
                  ${isAddTab ? 'w-10 h-10 bg-red-500 rounded-full text-white absolute -top-5' : 'w-8 h-8'}
                `}
              >
                <Icon
                  size={isAddTab ? 22 : 20}
                  className={isAddTab ? 'text-white font-bold' : isActive ? 'text-blue-500' : 'text-gray-500'}
                />
              </div>

              {/* Label (always aligned at bottom) */}
              <span
                className={`text-[11px] font-medium ${
                  isAddTab ? 'text-gray-500 mt-[32px]' : isActive ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
