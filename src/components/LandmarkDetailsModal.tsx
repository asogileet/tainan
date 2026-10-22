import React, { useState } from 'react';
import { LandmarkChapter } from '../types/drone';
import { X, BookOpen, Landmark, Anchor, Flower2, Compass, ShieldCheck } from 'lucide-react';

interface LandmarkDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: LandmarkChapter[];
  initialChapterIndex?: number;
  onJumpToChapter: (index: number) => void;
}

export const LandmarkDetailsModal: React.FC<LandmarkDetailsModalProps> = ({
  isOpen,
  onClose,
  chapters,
  initialChapterIndex = 0,
  onJumpToChapter,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(initialChapterIndex);

  if (!isOpen) return null;

  const currentChapter = chapters[selectedIdx];

  const getIcon = (id: string) => {
    switch (id) {
      case 'confucian-temple':
        return <Landmark className="w-4 h-4 text-amber-400" />;
      case 'zeelandia':
        return <Anchor className="w-4 h-4 text-sky-400" />;
      case 'tainan-400':
        return <Flower2 className="w-4 h-4 text-rose-400" />;
      case 'kunshen':
        return <Compass className="w-4 h-4 text-cyan-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif-tc">
                府城四百年歷史文化導覽
              </h2>
              <p className="text-xs text-slate-400">
                台南孔廟全臺首學 · 1624 熱蘭遮城稜堡 · 鳳凰木與大員灣
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content split */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Chapter Tabs Sidebar */}
          <div className="md:col-span-4 border-r border-slate-800 p-4 space-y-2 overflow-y-auto bg-slate-950/50">
            <div className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
              展演篇章索引
            </div>
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                  selectedIdx === idx
                    ? 'bg-slate-800/90 border-amber-500/40 text-white shadow-sm'
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <div className="mt-0.5">{getIcon(ch.id)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-amber-400 font-mono-num">
                    0{idx + 1} · {ch.era}
                  </div>
                  <div className="text-sm font-semibold truncate text-white mt-0.5">
                    {ch.title.split(' · ')[1] || ch.title}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Chapter Content Details */}
          <div className="md:col-span-8 p-6 overflow-y-auto space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-num mb-1">
                <span>{currentChapter.era}</span>
                <span className="text-slate-600">·</span>
                <span>無人機點陣: 400 節點編隊</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-serif-tc tracking-wide">
                {currentChapter.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono-num">
                {currentChapter.englishTitle}
              </p>
            </div>

            {/* Main Narrative */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-sm text-slate-300 leading-relaxed">
              {currentChapter.description}
            </div>

            {/* Cultural Insights */}
            <div>
              <h4 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>歷史典故與建築精髓</span>
              </h4>
              <div className="space-y-3">
                {currentChapter.culturalNotes.map((note, nIdx) => (
                  <div
                    key={nIdx}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-3"
                  >
                    <span className="font-mono-num font-bold text-amber-400 mt-0.5">
                      0{nIdx + 1}
                    </span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural formation features represented by drones */}
            <div>
              <h4 className="text-sm font-bold text-sky-300 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>無人機群飛光影勾勒特徵</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentChapter.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA: Jump to this chapter in drone simulator */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onJumpToChapter(selectedIdx);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-medium text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>即刻在主舞台展演此篇章</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
