import React from 'react';
import { Info, Hand, ThumbsUp, Factory as Victory, Fish as Fist, Pointer as PointerUp, Hammer } from 'lucide-react';

const Instructions: React.FC = () => {
  return (
    <div className="bg-gray-900/70 backdrop-blur-md rounded-lg p-5 shadow-lg w-full max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400" />
        <h2 className="ml-2 text-lg font-semibold text-white">Nasıl Kullanılır</h2>
      </div>
      
      <p className="text-gray-300 mb-4 text-sm">
        Kameranıza izin verdiğinizde, sistem elinizi takip edecek ve aşağıdaki jestleri tanıyacaktır:
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center p-2 bg-white/5 rounded-md">
          <ThumbsUp className="w-5 h-5 text-green-500 mr-3" />
          <div>
            <span className="text-white text-sm font-medium">Başparmak Yukarı/Aşağı</span>
            <p className="text-gray-400 text-xs">Onay veya ret bildirmek için</p>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-white/5 rounded-md">
          <Victory className="w-5 h-5 text-blue-500 mr-3" />
          <div>
            <span className="text-white text-sm font-medium">Zafer İşareti</span>
            <p className="text-gray-400 text-xs">Zafer veya barış ifadesi için</p>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-white/5 rounded-md">
          <Hand className="w-5 h-5 text-yellow-500 mr-3" />
          <div>
            <span className="text-white text-sm font-medium">Açık Avuç</span>
            <p className="text-gray-400 text-xs">Durma veya selamlama için</p>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-white/5 rounded-md">
          <Fist className="w-5 h-5 text-orange-500 mr-3" />
          <div>
            <span className="text-white text-sm font-medium">Kapalı Yumruk</span>
            <p className="text-gray-400 text-xs">Dayanışma veya kararlılık için</p>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-white/5 rounded-md">
          <PointerUp className="w-5 h-5 text-purple-500 mr-3" />
          <div>
            <span className="text-white text-sm font-medium">İşaret</span>
            <p className="text-gray-400 text-xs">Yön gösterme veya vurgulama için</p>
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-white/5 rounded-md">
          <Hammer className="w-5 h-5 text-pink-500 mr-3" />
          <div>
            <span className="text-white text-sm font-medium">Rock İşareti</span>
            <p className="text-gray-400 text-xs">Müzikte kullanılan popüler bir jest</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>* Debug modunu açarak el izleme noktalarını görebilirsiniz.</p>
        <p>* Her jestin kaç kez yapıldığı kaydedilir ve gösterilir.</p>
      </div>
    </div>
  );
};

export default Instructions;