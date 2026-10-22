export interface DroneNode {
  id: number;
  // Normalized coordinates in range [-100, 100] for responsive calculation
  x: number;
  y: number;
  z: number;
  // Light properties
  color: string;
  glowColor: string;
  brightness: number; // 0.2 to 1.5
  pulseSpeed: number; // duration in seconds
  strobeDelay: number; // delay offset
  // Landmark annotation tag
  featureTag: string;
  landmarkGroup: string;
}

export type LightModeId = 'heritage' | 'zeelandia' | 'cyber' | 'festive';

export interface LightMode {
  id: LightModeId;
  name: string;
  subtitle: string;
  description: string;
  primaryGlow: string;
  badgeColor: string;
}

export interface LandmarkChapter {
  id: string;
  index: number;
  title: string;
  englishTitle: string;
  era: string;
  duration: number; // in seconds
  description: string;
  culturalNotes: string[];
  features: string[];
  recommendedLightMode: LightModeId;
  drones: DroneNode[];
}

export type CameraView = 'spectator' | 'skyline' | 'free3d' | 'topdown';

export interface CameraState {
  view: CameraView;
  rotateX: number;
  rotateY: number;
  zoom: number;
}
