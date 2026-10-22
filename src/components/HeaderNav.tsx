import React from 'react';
import { LandmarkChapter } from '../types/drone';
import { Sparkles, BookOpen } from 'lucide-react';

interface HeaderNavProps {
  chapters: LandmarkChapter[];
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  onOpenDocModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  chapters,
  activeChapterIndex,
  onSelectChapter,
  onOpenDocModal,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelectChapter(0);
        }}
        className="text-lg font-bold tracking-tight text-white font-serif-tc whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors"
      >
        府城天際光影
      </a>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        {chapters.map((ch, idx) => {
          const shortName = ch.title.split(' · ')[1] || ch.title;
          const isActive = activeChapterIndex === idx;
          return (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(idx)}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 text-sm ${
                isActive ? 'text-amber-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {shortName}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenDocModal}
          className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>歷史文獻導覽</span>
        </button>
      </div>
    </header>
  );
};
