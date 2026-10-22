import React, { useMemo } from 'react';
import { DroneNode } from '../types/drone';
import { Eye, Layers } from 'lucide-react';

interface FeatureFocusBarProps {
  drones: DroneNode[];
  activeGroup: string | null;
  onSelectGroup: (group: string | null) => void;
}

export const FeatureFocusBar: React.FC<FeatureFocusBarProps> = ({
  drones,
  activeGroup,
  onSelectGroup,
}) => {
  // Aggregate groups and counts
  const groups = useMemo(() => {
    const map = new Map<string, number>();
    drones.forEach((d) => {
      map.set(d.landmarkGroup, (map.get(d.landmarkGroup) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [drones]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold text-white">建築構造聚焦檢視 (Architecture Focus)</h3>
        </div>
        <span className="text-[11px] text-slate-400">
          點擊突顯特定古蹟構造
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onSelectGroup(null)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
            activeGroup === null
              ? 'border-amber-500/50 bg-amber-950/40 text-amber-300'
              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          全構件點陣 ({drones.length})
        </button>

        {groups.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => onSelectGroup(activeGroup === name ? null : name)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeGroup === name
                ? 'border-sky-500/60 bg-sky-950/40 text-sky-300 shadow-sm'
                : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{name}</span>
            <span className="text-[10px] opacity-75 font-mono-num">({count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};
