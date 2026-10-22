/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LANDMARK_CHAPTERS, LIGHT_MODES } from './data/formations';
import { DroneCanvas } from './components/DroneCanvas';
import { ShowControls } from './components/ShowControls';
import { HeaderNav } from './components/HeaderNav';
import { TelemetryHud } from './components/TelemetryHud';
import { FeatureFocusBar } from './components/FeatureFocusBar';
import { LandmarkDetailsModal } from './components/LandmarkDetailsModal';
import { droneSoundscape } from './utils/audio';
import { CameraState, CameraView, DroneNode, LightModeId } from './types/drone';
import { Sparkles, Landmark, Anchor, Compass, Info, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(1); // Default to Confucian Temple for instant landmark recognition
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [lightMode, setLightMode] = useState<LightModeId>('heritage');
  const [effectType, setEffectType] = useState<'pulse' | 'strobe' | 'cycle' | 'steady'>('pulse');
  const [selectedDroneId, setSelectedDroneId] = useState<number | null>(null);
  const [activeFocusGroup, setActiveFocusGroup] = useState<string | null>(null);
  const [windDrift, setWindDrift] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  // Camera state
  const [camera, setCamera] = useState<CameraState>({
    view: 'spectator',
    rotateX: 25,
    rotateY: 0,
    zoom: 1.0,
  });

  const currentChapter = LANDMARK_CHAPTERS[activeChapterIndex];

  // When chapter changes, auto-recommend lighting mode and play transition chime
  const handleSelectChapter = (index: number) => {
    setActiveChapterIndex(index);
    setCurrentSeconds(0);
    setActiveFocusGroup(null);
    setSelectedDroneId(null);
    const newChapter = LANDMARK_CHAPTERS[index];
    setLightMode(newChapter.recommendedLightMode);
    droneSoundscape.playLandmarkChime(newChapter.id);
  };

  // Playback timer ticker
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 100;
    const timer = setInterval(() => {
      setCurrentSeconds((prev) => {
        const next = prev + (intervalMs / 1000) * playbackSpeed;
        if (next >= currentChapter.duration) {
          // Advance to next chapter
          const nextChapterIndex = (activeChapterIndex + 1) % LANDMARK_CHAPTERS.length;
          handleSelectChapter(nextChapterIndex);
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, currentChapter.duration, activeChapterIndex]);

  // Handle Camera Presets
  const handleSelectCameraPreset = (preset: CameraView) => {
    switch (preset) {
      case 'spectator':
        setCamera({ view: 'spectator', rotateX: 35, rotateY: 0, zoom: 1.0 });
        break;
      case 'skyline':
        setCamera({ view: 'skyline', rotateX: 10, rotateY: 0, zoom: 0.88 });
        break;
      case 'free3d':
        setCamera({ view: 'free3d', rotateX: 25, rotateY: -35, zoom: 1.05 });
        break;
      case 'topdown':
        setCamera({ view: 'topdown', rotateX: 65, rotateY: 0, zoom: 1.15 });
        break;
    }
  };

  const handleUpdateCamera = (newCam: Partial<CameraState>) => {
    setCamera((prev) => ({
      ...prev,
      ...newCam,
      view: 'free3d',
    }));
  };

  // Sound toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    droneSoundscape.setMuted(nextMuted);
    if (!nextMuted) {
      droneSoundscape.playLandmarkChime(currentChapter.id);
    }
  };

  // Drones with focus group filtering
  const displayDrones = useMemo(() => {
    return currentChapter.drones.map((drone) => {
      if (activeFocusGroup && drone.landmarkGroup !== activeFocusGroup) {
        return {
          ...drone,
          brightness: 0.16,
          color: '#334155',
          glowColor: '#1E293B',
        };
      }
      return drone;
    });
  }, [currentChapter.drones, activeFocusGroup]);

  const progressPercent = Math.min(
    100,
    (currentSeconds / currentChapter.duration) * 100
  );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Header (Strict Top Bar Contract: Brand - Nav - Action) */}
      <HeaderNav
        chapters={LANDMARK_CHAPTERS}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={handleSelectChapter}
        onOpenDocModal={() => setIsDocModalOpen(true)}
      />

      {/* 2. Main Stage Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stage Hero Title & Introduction Strip */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-num mb-1.5 font-medium">
              <span>台南歷史文化光影特展</span>
              <span className="text-slate-600">/</span>
              <span>400 架無人機群飛演繹</span>
              <span className="text-slate-600">/</span>
              <span>CSS KEYFRAMES 燈光秀</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif-tc text-balance">
              府城天際光影 · 台南無人機燈光秀
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              以現代無人機群飛技術與精準 CSS 動畫燈光，具象化呈現「全臺首學」台南孔廟大成殿飛簷、1624年熱蘭遮城紅磚稜堡、荷蘭大帆船與府城鳳凰花盛開之歷史篇章。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsDocModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-amber-300 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>觀看本篇章文化導覽</span>
            </button>
          </div>
        </section>

        {/* 3. 3D Drone Light Show Main Canvas */}
        <section className="relative">
          <DroneCanvas
            drones={displayDrones}
            activeChapterTitle={currentChapter.title}
            activeChapterEnglish={currentChapter.englishTitle}
            activeChapterEra={currentChapter.era}
            activeChapterId={currentChapter.id}
            lightMode={lightMode}
            effectType={effectType}
            camera={camera}
            onUpdateCamera={handleUpdateCamera}
            selectedDroneId={selectedDroneId}
            onSelectDrone={(d) => setSelectedDroneId(d ? d.id : null)}
            windDrift={windDrift}
          />
        </section>

        {/* 4. Architectural Focus / Component Filter Bar */}
        <section>
          <FeatureFocusBar
            drones={currentChapter.drones}
            activeGroup={activeFocusGroup}
            onSelectGroup={setActiveFocusGroup}
          />
        </section>

        {/* 5. Playback Timeline, Speed, Palette, and Keyframe Effect Controls */}
        <section>
          <ShowControls
            chapters={LANDMARK_CHAPTERS}
            activeChapterIndex={activeChapterIndex}
            onSelectChapter={handleSelectChapter}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onRestart={() => {
              setActiveChapterIndex(0);
              setCurrentSeconds(0);
              handleSelectChapter(0);
            }}
            playbackSpeed={playbackSpeed}
            onChangeSpeed={setPlaybackSpeed}
            progressPercent={progressPercent}
            currentSeconds={currentSeconds}
            totalChapterSeconds={currentChapter.duration}
            lightMode={lightMode}
            onSelectLightMode={setLightMode}
            effectType={effectType}
            onSelectEffectType={setEffectType}
            camera={camera}
            onSelectCameraPreset={handleSelectCameraPreset}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            windDrift={windDrift}
            onToggleWindDrift={() => setWindDrift(!windDrift)}
          />
        </section>

        {/* 6. Real-Time Telemetry HUD & Flight Mesh Metrics */}
        <section>
          <TelemetryHud
            droneCount={400}
            activeChapterTitle={currentChapter.title}
            effectType={effectType}
            lightModeName={LIGHT_MODES.find((m) => m.id === lightMode)?.name || ''}
          />
        </section>

        {/* 7. Landmark Historical Highlights Card Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Confucian Temple Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono-num text-amber-400 font-medium">
                  明鄭永曆十九年 (1665)
                </div>
                <h3 className="text-lg font-bold text-white font-serif-tc">
                  全臺首學 · 台南孔廟大成殿
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              台南孔子廟為台灣最早設立之官辦學府，建築群以「左學右廟」格局配置。無人機編隊重現大成殿雙層歇山燕尾脊之優美弧線，以及御賜「全臺首學」金匾，象徵台灣文教啟蒙之始。
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
              <span className="text-slate-400">建築特徵: 燕尾飛簷 / 螭吻 / 丹墀八佾舞</span>
              <button
                onClick={() => handleSelectChapter(1)}
                className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                切換至此篇章 →
              </button>
            </div>
          </div>

          {/* Fort Zeelandia Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Anchor className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono-num text-sky-400 font-medium">
                  荷治大航海時期 (1624)
                </div>
                <h3 className="text-lg font-bold text-white font-serif-tc">
                  熱蘭遮城與安平古堡
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              1624年荷蘭東印度公司於大員沙洲築起台灣首座洋式要塞熱蘭遮城（Fort Zeelandia）。無人機光影呈現紅磚星形稜堡、迎風破浪的三桅大帆船與現代安平古堡白燈塔探照光束。
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
              <span className="text-slate-400">歷史意象: 紅磚稜堡 / VOC三桅帆船 / 燈塔光束</span>
              <button
                onClick={() => handleSelectChapter(2)}
                className="text-sky-400 hover:text-sky-300 font-medium cursor-pointer"
              >
                切換至此篇章 →
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Cultural Documentation Modal */}
      <LandmarkDetailsModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        chapters={LANDMARK_CHAPTERS}
        initialChapterIndex={activeChapterIndex}
        onJumpToChapter={handleSelectChapter}
      />

      {/* 9. Quiet Footer */}
      <footer className="border-t border-slate-800 py-6 mt-12 bg-slate-950/60 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">府城天際光影</span>
            <span>·</span>
            <span>台南無人機燈光秀模擬器 (400 UAV Swarm Simulation)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>台南孔廟大成殿</span>
            <span>·</span>
            <span>熱蘭遮城 (1624)</span>
            <span>·</span>
            <span>台南 400 盛典</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
