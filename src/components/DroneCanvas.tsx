import React, { useState, useRef, useEffect, useMemo } from 'react';
import { DroneNode, CameraState, LightModeId } from '../types/drone';
import { Compass, Eye, Wind, Sparkles, Navigation } from 'lucide-react';

interface DroneCanvasProps {
  drones: DroneNode[];
  activeChapterTitle: string;
  activeChapterEnglish: string;
  activeChapterEra: string;
  activeChapterId: string;
  lightMode: LightModeId;
  effectType: 'pulse' | 'strobe' | 'cycle' | 'steady';
  camera: CameraState;
  onUpdateCamera: (newCamera: Partial<CameraState>) => void;
  selectedDroneId: number | null;
  onSelectDrone: (drone: DroneNode | null) => void;
  windDrift: boolean;
}

export const DroneCanvas: React.FC<DroneCanvasProps> = ({
  drones,
  activeChapterTitle,
  activeChapterEnglish,
  activeChapterEra,
  activeChapterId,
  lightMode,
  effectType,
  camera,
  onUpdateCamera,
  selectedDroneId,
  onSelectDrone,
  windDrift,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: 0,
    rotY: 0,
  });

  // Background stars calculation (fixed seed)
  const stars = useMemo(() => {
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: (i * 37) % 100,
      y: (i * 61) % 65,
      size: 1 + (i % 3) * 0.8,
      opacity: 0.25 + ((i * 19) % 70) / 100,
      duration: 2.5 + (i % 5) * 0.8,
      delay: (i * 0.3) % 4,
    }));
  }, []);

  // Mouse drag handlers for 3D orbit
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      rotX: camera.rotateX,
      rotY: camera.rotateY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    // Rotate camera
    const newRotY = dragStart.rotY + deltaX * 0.35;
    const newRotX = Math.max(-65, Math.min(65, dragStart.rotX - deltaY * 0.35));
    onUpdateCamera({ rotateX: newRotX, rotateY: newRotY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0012;
    const newZoom = Math.max(0.65, Math.min(1.85, camera.zoom + zoomDelta));
    onUpdateCamera({ zoom: newZoom });
  };

  // Find selected drone data
  const activeSelectedDrone = useMemo(() => {
    if (!selectedDroneId) return null;
    return drones.find((d) => d.id === selectedDroneId) || null;
  }, [drones, selectedDroneId]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      className="relative w-full h-[620px] lg:h-[720px] rounded-2xl overflow-hidden select-none border border-slate-800 bg-gradient-to-b from-[#020617] via-[#050b1f] to-[#040817] shadow-2xl cursor-grab active:cursor-grabbing"
      tabIndex={0}
      aria-label="3D 無人機表演主畫布"
    >
      {/* 1. Celestial Night Sky Stars & Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animation: `starTwinkle ${s.duration}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

        {/* Soft Moon & Coastal Ambient Nebula Light */}
        <div className="absolute top-12 right-24 w-72 h-72 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-16 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {/* 2. Top-Left Live Landmark Title Overlay */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-mono-num font-medium">
            {activeChapterEra}
          </span>
          <span className="text-slate-600 text-xs">/</span>
          <span className="text-xs text-slate-400 tracking-wide">
            400 DRONES FLEET
          </span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-wide font-serif-tc text-shadow drop-shadow-md">
          {activeChapterTitle}
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-medium tracking-normal mt-0.5">
          {activeChapterEnglish}
        </p>
      </div>

      {/* 3. Top-Right 3D Camera & Orientation Indicator */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3 pointer-events-auto">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl px-3 py-1.5 flex items-center gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-mono-num">
              {Math.round((camera.rotateY % 360 + 360) % 360)}°
            </span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono-num">{Math.round(camera.rotateX)}° 仰角</span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="font-mono-num text-slate-400">
            {Math.round(camera.zoom * 100)}%
          </div>
        </div>

        {/* Reset Camera button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdateCamera({ rotateX: 18, rotateY: 0, zoom: 1.0 });
          }}
          className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 px-2.5 py-1.5 rounded-xl text-xs transition-colors flex items-center gap-1"
          title="重設視角"
        >
          <Navigation className="w-3.5 h-3.5 rotate-45" />
          <span>正向</span>
        </button>
      </div>

      {/* 4. Special Zeelandia Lighthouse Rotating Searchlight Beam */}
      {activeChapterId === 'zeelandia' && (
        <div
          className="absolute pointer-events-none z-10 transition-opacity duration-1000"
          style={{
            top: '32%',
            left: '68%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              animation: 'beaconRaySweep 12s linear infinite',
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(56, 189, 248, 0.22) 22deg, rgba(255,255,255,0.45) 25deg, transparent 28deg)',
              filter: 'blur(3px)',
            }}
          />
        </div>
      )}

      {/* 5. 3D Drone Swarm Stage */}
      <div className="scene-3d-wrap absolute inset-0 flex items-center justify-center">
        <div
          className="scene-3d-stage relative w-[540px] h-[540px] transition-transform duration-300"
          style={{
            transform: `scale(${camera.zoom}) rotateX(${camera.rotateX}deg) rotateY(${camera.rotateY}deg)`,
          }}
        >
          {/* Swarm Grid Plane subtle guideline circle */}
          <div
            className="absolute inset-0 rounded-full border border-sky-500/10 pointer-events-none"
            style={{ transform: 'rotateX(90deg) translateZ(-60px)' }}
          />

          {/* Drones Rendering */}
          {drones.map((drone) => {
            // Calculate screen space offsets from normalized coordinates [-100, 100]
            const pxX = (drone.x / 100) * 260;
            const pxY = (drone.y / 100) * 240;
            const pxZ = (drone.z / 100) * 160;

            const isSelected = selectedDroneId === drone.id;

            // Class selection based on lighting effect type
            let effectClass = 'drone-pulse-active';
            if (effectType === 'strobe') {
              effectClass = 'drone-strobe-active';
            } else if (effectType === 'cycle') {
              if (lightMode === 'heritage') effectClass = 'cycle-heritage-active';
              else if (lightMode === 'zeelandia') effectClass = 'cycle-zeelandia-active';
              else if (lightMode === 'festive') effectClass = 'cycle-festive-active';
              else effectClass = 'cycle-cyber-active';
            } else if (effectType === 'steady') {
              effectClass = '';
            }

            const hoverClass = windDrift ? 'drone-hover-active' : '';

            // Size: 5px to 7.5px based on z depth
            const nodeSize = isSelected ? 12 : 5.8;

            return (
              <div
                key={drone.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDrone(isSelected ? null : drone);
                }}
                className={`drone-particle ${effectClass} ${hoverClass} cursor-pointer transition-all duration-300 hover:scale-150`}
                style={
                  {
                    '--tx': `${pxX}px`,
                    '--ty': `${pxY}px`,
                    '--tz': `${pxZ}px`,
                    '--size': `${nodeSize}px`,
                    '--glow-color': drone.glowColor,
                    '--base-brightness': drone.brightness,
                    '--pulse-dur': `${drone.pulseSpeed}s`,
                    '--strobe-dur': `${1.2 + (drone.id % 4) * 0.2}s`,
                    '--delay': `${drone.strobeDelay}s`,
                    '--scale': isSelected ? 1.6 : 1.0,
                    backgroundColor: isSelected ? '#FFFFFF' : drone.color,
                    boxShadow: isSelected
                      ? '0 0 16px #38BDF8, 0 0 32px #FFFFFF'
                      : `0 0 8px ${drone.glowColor}`,
                    transform: `translate3d(${pxX}px, ${pxY}px, ${pxZ}px)`,
                    zIndex: Math.round(100 + drone.z),
                  } as React.CSSProperties
                }
                title={`#${drone.id} ${drone.featureTag}`}
              />
            );
          })}
        </div>
      </div>

      {/* 6. Bottom Anping Harbor Water Reflection (大員港灣倒影) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none overflow-hidden border-t border-sky-950/40 bg-gradient-to-t from-[#020617]/95 via-[#030d29]/60 to-transparent">
        {/* Subtle Water Shimmer Lines */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 opacity-40"
          style={{
            animation: 'waterSurfaceWave 4s ease-in-out infinite',
            background:
              'repeating-linear-gradient(0deg, rgba(56, 189, 248, 0.08) 0px, transparent 3px, rgba(2, 132, 199, 0.06) 6px)',
          }}
        />

        {/* Faint Silhouette of Historic Tainan Skyline / Coastline */}
        <div className="absolute bottom-0 inset-x-0 h-12 flex items-end justify-between px-8 text-[11px] text-slate-500/80 font-mono-num pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block animate-pulse" />
            <span>安平水域觀賞區 · 倒影水波模擬</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>經度 120.20°E</span>
            <span>緯度 22.99°N</span>
            <span>風速 3.6 m/s 良好</span>
          </div>
        </div>
      </div>

      {/* 7. Selected Drone Detail Card Overlay */}
      {activeSelectedDrone && (
        <div className="absolute bottom-14 left-6 z-30 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 text-xs shadow-xl max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-sm"
                style={{
                  backgroundColor: activeSelectedDrone.color,
                  boxShadow: `0 0 8px ${activeSelectedDrone.glowColor}`,
                }}
              />
              <span className="font-bold text-white font-mono-num">
                無人機 #{activeSelectedDrone.id}
              </span>
            </div>
            <button
              onClick={() => onSelectDrone(null)}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <div className="mt-2 space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">成型部隊:</span>
              <span className="text-slate-200 font-medium">
                {activeSelectedDrone.landmarkGroup}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">歷史特徵:</span>
              <span className="text-amber-300 font-medium">
                {activeSelectedDrone.featureTag}
              </span>
            </div>
            <div className="flex justify-between font-mono-num text-[11px]">
              <span className="text-slate-500">相對座標:</span>
              <span>
                X:{activeSelectedDrone.x.toFixed(1)} Y:{activeSelectedDrone.y.toFixed(1)} Z:{activeSelectedDrone.z.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between font-mono-num text-[11px]">
              <span className="text-slate-500">LED 色階:</span>
              <span>{activeSelectedDrone.color}</span>
            </div>
          </div>
        </div>
      )}

      {/* 8. Drag instruction hint */}
      <div className="absolute bottom-14 right-6 z-20 hidden md:flex items-center gap-1.5 text-[11px] text-slate-400/80 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
        <span>按住滑鼠拖曳旋轉 3D 視角 · 滾輪縮放</span>
      </div>
    </div>
  );
};
