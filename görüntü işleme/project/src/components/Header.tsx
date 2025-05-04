import React from 'react';
import { HandMetal, Settings } from 'lucide-react';

interface HeaderProps {
  showDebug: boolean;
  toggleDebug: () => void;
}

const Header: React.FC<HeaderProps> = ({ showDebug, toggleDebug }) => {
  return (
    <header className="w-full py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <HandMetal className="h-8 w-8 text-purple-400" />
          <h1 className="ml-2 text-2xl font-bold text-white">
            El Jest <span className="text-teal-400">Tanıma</span>
          </h1>
        </div>
        
        <button
          onClick={toggleDebug}
          className={`flex items-center px-3 py-1.5 rounded-full transition-colors ${
            showDebug 
              ? 'bg-purple-700 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <Settings size={16} className="mr-1" />
          <span className="text-sm">Debug Mod</span>
        </button>
      </div>
    </header>
  );
};

export default Header;