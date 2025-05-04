import { HandLandmarks, GestureType, Point } from '../types';

// Calculate the distance between two points
const distance = (a: Point, b: Point): number => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

// Calculate the angle between three points
const calculateAngle = (a: Point, b: Point, c: Point): number => {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  
  return angle;
};

// Recognize gestures based on hand landmarks
export const recognizeGesture = (handLandmarks: HandLandmarks): GestureType => {
  if (!handLandmarks || !handLandmarks.landmarks || handLandmarks.landmarks.length < 21) {
    return 'none';
  }

  const landmarks = handLandmarks.landmarks;
  
  // Finger indices
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];
  
  const wrist = landmarks[0];
  const thumbMcp = landmarks[2];
  const indexMcp = landmarks[5];
  const middleMcp = landmarks[9];
  const ringMcp = landmarks[13];
  const pinkyMcp = landmarks[17];

  // Check for thumbs up gesture
  if (
    thumbTip.y < wrist.y &&
    indexTip.y > thumbTip.y &&
    middleTip.y > thumbTip.y &&
    ringTip.y > thumbTip.y &&
    pinkyTip.y > thumbTip.y
  ) {
    return 'thumbs_up';
  }

  // Check for thumbs down gesture
  if (
    thumbTip.y > wrist.y &&
    thumbTip.y > indexTip.y &&
    thumbTip.y > middleTip.y &&
    thumbTip.y > ringTip.y &&
    thumbTip.y > pinkyTip.y
  ) {
    return 'thumbs_down';
  }

  // Check for victory/peace sign
  if (
    indexTip.y < indexMcp.y && 
    middleTip.y < middleMcp.y &&
    ringTip.y > ringMcp.y && 
    pinkyTip.y > pinkyMcp.y &&
    distance(indexTip, middleTip) > distance(indexMcp, middleMcp) * 1.3
  ) {
    return 'victory';
  }

  // Check for open palm
  if (
    indexTip.y < indexMcp.y && 
    middleTip.y < middleMcp.y &&
    ringTip.y < ringMcp.y && 
    pinkyTip.y < pinkyMcp.y &&
    thumbTip.x < thumbMcp.x
  ) {
    return 'open_palm';
  }

  // Check for closed fist
  if (
    distance(indexTip, wrist) < distance(indexMcp, wrist) * 1.2 &&
    distance(middleTip, wrist) < distance(middleMcp, wrist) * 1.2 &&
    distance(ringTip, wrist) < distance(ringMcp, wrist) * 1.2 &&
    distance(pinkyTip, wrist) < distance(pinkyMcp, wrist) * 1.2
  ) {
    return 'closed_fist';
  }

  // Check for pointing gesture (index finger extended, others curled)
  if (
    indexTip.y < indexMcp.y &&
    distance(middleTip, middleMcp) < distance(middleMcp, wrist) * 0.3 &&
    distance(ringTip, ringMcp) < distance(ringMcp, wrist) * 0.3 &&
    distance(pinkyTip, pinkyMcp) < distance(pinkyMcp, wrist) * 0.3
  ) {
    return 'pointing';
  }

  // Check for rock gesture (index and pinky extended, others curled)
  if (
    indexTip.y < indexMcp.y &&
    distance(middleTip, middleMcp) < distance(middleMcp, wrist) * 0.3 &&
    distance(ringTip, ringMcp) < distance(ringMcp, wrist) * 0.3 &&
    pinkyTip.y < pinkyMcp.y
  ) {
    return 'rock';
  }

  return 'none';
};

export const getGestureInfo = (gesture: GestureType): { name: string; description: string } => {
  switch (gesture) {
    case 'thumbs_up':
      return {
        name: 'Başparmak Yukarı',
        description: 'Onaylama veya beğenme için kullanılan bir jest.'
      };
    case 'thumbs_down':
      return {
        name: 'Başparmak Aşağı',
        description: 'Reddetme veya beğenmeme için kullanılan bir jest.'
      };
    case 'victory':
      return {
        name: 'Zafer İşareti',
        description: 'Zafer, barış veya sayı iki için kullanılan bir jest.'
      };
    case 'open_palm':
      return {
        name: 'Açık Avuç',
        description: 'Durma, selamlama veya el sallama için kullanılan bir jest.'
      };
    case 'closed_fist':
      return {
        name: 'Kapalı Yumruk',
        description: 'Dayanışma, kararlılık veya direnç için kullanılan bir jest.'
      };
    case 'pointing':
      return {
        name: 'İşaret',
        description: 'Yön gösterme veya dikkat çekme için kullanılan bir jest.'
      };
    case 'rock':
      return {
        name: 'Rock İşareti',
        description: 'Müzik kültüründe yaygın olarak kullanılan bir jest.'
      };
    default:
      return {
        name: 'Tanınmadı',
        description: 'Herhangi bir jest tespit edilmedi.'
      };
  }
};