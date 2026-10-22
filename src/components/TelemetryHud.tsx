import React from 'react';
import { Radio, Wifi, BatteryCharging, Wind, Compass, MapPin } from 'lucide-react';

interface TelemetryHudProps {
  droneCount: number;
  activeChapterTitle: string;
  effectType: string;
  lightModeName: string;
}

export const TelemetryHud: React.FC<TelemetryHudProps> = ({
  droneCount,
  activeChapterTitle,
  effectType,
  lightModeName,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h3 className="text-sm font-semibold text-white">群飛飛控與光影遙測儀表 (Telemetry)</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono-num text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-red-400" />
          <span>台南安平夜空 (22.99°N, 120.20°E)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
        {/* Metric 1 */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>在空機群</span>
            <span className="text-emerald-400 font-bold">同步正常</span>
          </div>
          <div className="text-lg font-bold text-white font-mono-num mt-0.5">
            {droneCount} <span className="text-xs font-normal text-slate-400">架 UAV</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>RTK 差分定位</span>
            <Wifi className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-lg font-bold text-white font-mono-num mt-0.5">
            ±1.2 <span className="text-xs font-normal text-slate-400">cm 精度</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>空域風速 / 阻抗</span>
            <Wind className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-white font-mono-num mt-0.5">
            3.6 <span className="text-xs font-normal text-slate-400">m/s 微風</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>平均電池電量</span>
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-white font-mono-num mt-0.5">
            94% <span className="text-xs font-normal text-slate-400">約 18 分鐘</span>
          </div>
        </div>
      </div>
    </div>
  );
};
