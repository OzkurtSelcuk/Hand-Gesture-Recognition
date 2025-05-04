import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, Ban } from 'lucide-react';
import { HandLandmarks, GestureType } from '../types';

interface CameraProps {
  onHandLandmarks: (landmarks: HandLandmarks | null) => void;
  showDebug: boolean;
  currentGesture: GestureType;
}

const Camera: React.FC<CameraProps> = ({ onHandLandmarks, showDebug, currentGesture }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let handDetectorModule: any;
    let detector: any;
    
    const loadModels = async () => {
      try {
        // Import TensorFlow.js and the hand-pose-detection model
        const tf = await import('@tensorflow/tfjs');
        await import('@tensorflow/tfjs-backend-webgl');
        handDetectorModule = await import('@tensorflow-models/hand-pose-detection');
        
        await tf.ready();
        
        // Load the MediaPipe hands model
        detector = await handDetectorModule.createDetector(
          handDetectorModule.SupportedModels.MediaPipeHands,
          {
            runtime: 'tfjs',
            modelType: 'full',
            maxHands: 1
          }
        );
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading models:', error);
        setIsLoading(false);
      }
    };
    
    loadModels();
    
    const intervalId = setInterval(() => {
      detectHands(detector, handDetectorModule);
    }, 100);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [onHandLandmarks]);
  
  const detectHands = async (detector: any, handDetectorModule: any) => {
    if (
      detector &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      
      if (canvasRef.current) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
        
        const hands = await detector.estimateHands(video);
        
        const ctx = canvasRef.current.getContext('2d');
        
        if (ctx && showDebug) {
          ctx.clearRect(0, 0, videoWidth, videoHeight);
          
          if (hands && hands.length > 0) {
            // Draw hand landmarks
            for (const hand of hands) {
              const keypoints = hand.keypoints;
              
              // Draw keypoints
              for (let i = 0; i < keypoints.length; i++) {
                const keypoint = keypoints[i];
                
                ctx.beginPath();
                ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = '#00FF00';
                ctx.fill();
                
                // Draw connections between landmarks
                if (i > 0 && i % 4 !== 0) {
                  const prevKeypoint = keypoints[i - 1];
                  ctx.beginPath();
                  ctx.moveTo(prevKeypoint.x, prevKeypoint.y);
                  ctx.lineTo(keypoint.x, keypoint.y);
                  ctx.strokeStyle = '#FFFFFF';
                  ctx.lineWidth = 2;
                  ctx.stroke();
                }
              }
              
              // Connect palm landmarks
              const palmIndices = [0, 1, 2, 5, 9, 13, 17, 0];
              ctx.beginPath();
              ctx.moveTo(keypoints[palmIndices[0]].x, keypoints[palmIndices[0]].y);
              for (let i = 1; i < palmIndices.length; i++) {
                const idx = palmIndices[i];
                ctx.lineTo(keypoints[idx].x, keypoints[idx].y);
              }
              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          } else {
            ctx.clearRect(0, 0, videoWidth, videoHeight);
          }
        } else if (ctx) {
          ctx.clearRect(0, 0, videoWidth, videoHeight);
        }
        
        if (hands && hands.length > 0) {
          const landmarks = hands[0].keypoints.map(kp => ({ x: kp.x, y: kp.y }));
          onHandLandmarks({ landmarks });
        } else {
          onHandLandmarks(null);
        }
      }
    }
  };
  
  const checkCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setHasCamera(videoDevices.length > 0);
    } catch (error) {
      console.error('Error checking camera:', error);
      setHasCamera(false);
    }
  };
  
  useEffect(() => {
    checkCamera();
  }, []);
  
  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg aspect-video bg-gray-800">
      {!hasCamera ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-900">
          <Ban size={48} className="mb-4 text-red-500" />
          <p className="text-xl font-semibold">Kamera erişilemedi</p>
          <p className="mt-2 text-gray-400">Lütfen kamera izinlerini kontrol edin</p>
        </div>
      ) : isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-900">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Model yükleniyor...</p>
        </div>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            mirrored={true}
            className="absolute inset-0 object-cover w-full h-full"
          />
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full z-10"
          />
          {currentGesture !== 'none' && (
            <div className="absolute top-2 right-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium z-20 animate-pulse">
              {currentGesture}
            </div>
          )}
        </>
      )}
      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs z-20">
        <CameraIcon size={14} />
        <span>Canlı</span>
      </div>
    </div>
  );
};

export default Camera;