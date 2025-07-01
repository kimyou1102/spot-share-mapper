
import React from 'react';
import { MapPin } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MapPin className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-gray-800">PlaceShare</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              내 장소
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              탐색하기
            </a>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200">
              로그인
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
