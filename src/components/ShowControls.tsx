import React from 'react';
import { LandmarkChapter, LightModeId, CameraView, CameraState } from '../types/drone';
import { LIGHT_MODES } from '../data/formations';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Compass,
  Wind,
  Sparkles,
  Layers,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface ShowControlsProps {
  chapters: LandmarkChapter[];
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  progressPercent: number; // 0 to 100 within current chapter
  currentSeconds: number;
  totalChapterSeconds: number;
  lightMode: LightModeId;
  onSelectLightMode: (mode: LightModeId) => void;
  effectType: 'pulse' | 'strobe' | 'cycle' | 'steady';
  onSelectEffectType: (type: 'pulse' | 'strobe' | 'cycle' | 'steady') => void;
  camera: CameraState;
  onSelectCameraPreset: (preset: CameraView) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  windDrift: boolean;
  onToggleWindDrift: () => void;
}

export const ShowControls: React.FC<ShowControlsProps> = ({
  chapters,
  activeChapterIndex,
  onSelectChapter,
  isPlaying,
  onTogglePlay,
  onRestart,
  playbackSpeed,
  onChangeSpeed,
  progressPercent,
  currentSeconds,
  totalChapterSeconds,
  lightMode,
  onSelectLightMode,
  effectType,
  onSelectEffectType,
  camera,
  onSelectCameraPreset,
  isMuted,
  onToggleMute,
  windDrift,
  onToggleWindDrift,
}) => {
  const currentChapter = chapters[activeChapterIndex];

  return (
    <div className="w-full space-y-4">
      {/* 1. Main Timeline & Playback Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          {/* Left: Playback controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const prev = Math.max(0, activeChapterIndex - 1);
                onSelectChapter(prev);
              }}
              disabled={activeChapterIndex === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 transition-colors"
              title="上一篇章"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePlay}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-medium shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span className="text-sm">暫停展演</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span className="text-sm">播放燈光秀</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                const next = Math.min(chapters.length - 1, activeChapterIndex + 1);
                onSelectChapter(next);
              }}
              disabled={activeChapterIndex === chapters.length - 1}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 transition-colors"
              title="下一篇章"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={onRestart}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="重新開始整場演出"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Playback speed segmented buttons */}
            <div className="hidden sm:flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              {[0.5, 1.0, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => onChangeSpeed(s)}
                  className={`px-2.5 py-1 rounded-lg font-mono-num font-medium transition-colors ${
                    playbackSpeed === s
                      ? 'bg-slate-800 text-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Right: Sound toggle and wind drift toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleWindDrift}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                windDrift
                  ? 'border-sky-500/40 bg-sky-950/40 text-sky-300'
                  : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
              }`}
              title="模擬安平港海風陣風微飄動態"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>陣風微浮動 {windDrift ? '開啟' : '關閉'}</span>
            </button>

            <button
              onClick={onToggleMute}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                !isMuted
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                  : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
              }`}
              title="啟用/關閉即時合成環境音效"
            >
              {!isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>群飛音效 開啟</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>音效 靜音中</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Timeline track with chapter pins */}
        <div className="pt-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono-num mb-1.5">
            <span className="font-medium text-amber-300">
              篇章 {activeChapterIndex + 1}/{chapters.length} · {currentChapter.title}
            </span>
            <span>
              {Math.floor(currentSeconds)}s / {totalChapterSeconds}s
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-200 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Timeline markers */}
          <div className="grid grid-cols-5 gap-1 mt-2 text-[11px]">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(idx)}
                className={`text-left p-1.5 rounded-lg transition-colors truncate ${
                  activeChapterIndex === idx
                    ? 'bg-slate-800 text-amber-300 font-semibold'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                <div className="font-mono-num text-[10px] opacity-75">
                  0{idx + 1}.
                </div>
                <div className="truncate">{ch.title.split(' · ')[1] || ch.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Visual Configuration Bar: Lighting Modes & CSS Effect Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Light Palette Scheme Selector */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">主題色彩光影</h3>
            </div>
            <span className="text-[11px] text-slate-400">CSS 色盤轉換</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {LIGHT_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onSelectLightMode(mode.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  lightMode === mode.id
                    ? `${mode.badgeColor} ring-1 ring-amber-400/40 shadow-sm`
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-semibold text-white">
                  {mode.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {mode.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Keyframe Light Effect Mode */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-semibold text-white">動態 Keyframe 光效</h3>
            </div>
            <span className="text-[11px] text-slate-400">GPU 硬體加速</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'pulse', label: '呼吸微光 (Pulse)', sub: '溫潤漸變光暈' },
              { id: 'strobe', label: '航標頻閃 (Strobe)', sub: '精準無人機信標' },
              { id: 'cycle', label: '琉璃彩波 (Wave)', sub: '多段色階循環' },
              { id: 'steady', label: '典雅恆亮 (Steady)', sub: '靜謐建築勾勒' },
            ].map((eff) => (
              <button
                key={eff.id}
                onClick={() => onSelectEffectType(eff.id as any)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  effectType === eff.id
                    ? 'border-orange-500/50 bg-orange-950/30 text-orange-300 ring-1 ring-orange-500/30'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-semibold text-white">
                  {eff.label}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {eff.sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Camera Viewing Presets */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-semibold text-white">3D 觀賞視角切換:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'spectator', label: '安平水岸仰視 (35°)', rotX: 35, rotY: 0, zoom: 1.0 },
            { id: 'skyline', label: '港灣俯瞰全景 (10°)', rotX: 10, rotY: 0, zoom: 0.88 },
            { id: 'free3d', label: '3D 側向斜角 (45°)', rotX: 25, rotY: -35, zoom: 1.05 },
            { id: 'topdown', label: '天頂垂直俯瞰 (65°)', rotX: 65, rotY: 0, zoom: 1.15 },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                onSelectCameraPreset(preset.id as CameraView);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                camera.view === preset.id
                  ? 'border-sky-500/60 bg-sky-950/40 text-sky-300 shadow-sm'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
