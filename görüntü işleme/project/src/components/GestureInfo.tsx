import React from 'react';
import { GestureType } from '../types';
import { getGestureInfo } from '../utils/gestureRecognition';
import { ThumbsUp, ThumbsDown, Factory as Victory, Hand, Fish as Fist, Pointer as PointerUp, Hammer, HelpCircle } from 'lucide-react';

interface GestureInfoProps {
  gesture: GestureType;
  gestureCount: Record<string, number>;
}

const getGestureIcon = (gesture: GestureType) => {
  switch (gesture) {
    case 'thumbs_up':
      return <ThumbsUp className="w-6 h-6 text-green-500" />;
    case 'thumbs_down':
      return <ThumbsDown className="w-6 h-6 text-red-500" />;
    case 'victory':
      return <Victory className="w-6 h-6 text-blue-500" />;
    case 'open_palm':
      return <Hand className="w-6 h-6 text-yellow-500" />;
    case 'closed_fist':
      return <Fist className="w-6 h-6 text-orange-500" />;
    case 'pointing':
      return <PointerUp className="w-6 h-6 text-purple-500" />;
    case 'rock':
      return <Hammer className="w-6 h-6 text-pink-500" />;
    default:
      return <HelpCircle className="w-6 h-6 text-gray-500" />;
  }
};

const GestureInfo: React.FC<GestureInfoProps> = ({ gesture, gestureCount }) => {
  const info = getGestureInfo(gesture);
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 shadow-lg w-full max-w-md mx-auto">
      <div className="flex items-center mb-4">
        {getGestureIcon(gesture)}
        <h2 className="ml-2 text-xl font-semibold text-white">{info.name}</h2>
      </div>
      
      <p className="text-gray-200 mb-5">{info.description}</p>
      
      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-md font-medium text-gray-200 mb-3">Jest Sayıları:</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {Object.entries(gestureCount)
            .filter(([key]) => key !== 'none')
            .map(([key, count]) => (
              <div 
                key={key} 
                className={`flex items-center justify-between p-2 rounded ${
                  key === gesture ? 'bg-purple-800/50 ring-1 ring-purple-400' : 'bg-gray-800/50'
                }`}
              >
                <div className="flex items-center">
                  {getGestureIcon(key as GestureType)}
                  <span className="ml-2 text-sm text-gray-200">
                    {getGestureInfo(key as GestureType).name}
                  </span>
                </div>
                <div className="text-sm font-medium text-white bg-black/30 px-2 py-0.5 rounded">
                  {count}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GestureInfo;