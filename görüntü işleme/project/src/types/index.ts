export interface Point {
  x: number;
  y: number;
}

export interface HandLandmarks {
  landmarks: Point[];
}

export type GestureType = 
  | 'thumbs_up'
  | 'thumbs_down'
  | 'victory'
  | 'open_palm'
  | 'closed_fist'
  | 'pointing'
  | 'rock'
  | 'none';

export interface GestureCount {
  [key: string]: number;
}

export interface GestureInfo {
  name: string;
  description: string;
  icon: string;
}