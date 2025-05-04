import React, { useState, useEffect } from 'react';
import { HandLandmarks, GestureType, GestureCount } from './types';
import { recognizeGesture } from './utils/gestureRecognition';
import Camera from './components/Camera';
import GestureInfo from './components/GestureInfo';
import Header from './components/Header';
import Instructions from './components/Instructions';

function App() {
  const [handLandmarks, setHandLandmarks] = useState<HandLandmarks | null>(null);
  const [currentGesture, setCurrentGesture] = useState<GestureType>('none');
  const [gestureCount, setGestureCount] = useState<GestureCount>({
    thumbs_up: 0,
    thumbs_down: 0,
    victory: 0,
    open_palm: 0,
    closed_fist: 0,
    pointing: 0,
    rock: 0
  });
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [lastRecognizedGesture, setLastRecognizedGesture] = useState<GestureType>('none');
  const [gestureTimeout, setGestureTimeout] = useState<NodeJS.Timeout | null>(null);

  // Process hand landmarks and recognize gestures
  useEffect(() => {
    if (handLandmarks) {
      const recognizedGesture = recognizeGesture(handLandmarks);
      
      // If a new gesture is recognized and it's not 'none'
      if (recognizedGesture !== 'none' && recognizedGesture !== lastRecognizedGesture) {
        setCurrentGesture(recognizedGesture);
        setLastRecognizedGesture(recognizedGesture);
        
        // Update the gesture count
        setGestureCount(prev => ({
          ...prev,
          [recognizedGesture]: prev[recognizedGesture] + 1
        }));
        
        // Clear any existing timeout
        if (gestureTimeout) {
          clearTimeout(gestureTimeout);
        }
        
        // Set a timeout to reset the current gesture (prevents rapid flashing)
        const timeout = setTimeout(() => {
          setLastRecognizedGesture('none');
        }, 2000);
        
        setGestureTimeout(timeout as NodeJS.Timeout);
      } else if (!handLandmarks) {
        setCurrentGesture('none');
      }
    } else {
      setCurrentGesture('none');
    }
    
    return () => {
      if (gestureTimeout) {
        clearTimeout(gestureTimeout);
      }
    };
  }, [handLandmarks, lastRecognizedGesture, gestureTimeout]);

  const toggleDebug = () => {
    setShowDebug(!showDebug);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header showDebug={showDebug} toggleDebug={toggleDebug} />
        
        <main className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col space-y-6">
            <Camera 
              onHandLandmarks={setHandLandmarks} 
              showDebug={showDebug}
              currentGesture={currentGesture}
            />
            
            <GestureInfo 
              gesture={currentGesture} 
              gestureCount={gestureCount}
            />
          </div>
          
          <div>
            <Instructions />
          </div>
        </main>
        
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>
            © 2025 El Jest Tanıma Uygulaması - TensorFlow.js ve MediaPipe ile geliştirilmiştir
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;