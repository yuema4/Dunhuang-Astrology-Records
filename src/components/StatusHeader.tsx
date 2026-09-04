import React from 'react';
import { EmpireState, OfficialRank } from '../types/game';
import { Crown, Shield, Users, Award, BookOpen, Lightbulb, History, RotateCcw } from 'lucide-react';

interface StatusHeaderProps {
  empireState: EmpireState;
  currentRank: OfficialRank;
  yearName: string;
  season: string;
  onOpenCodex: () => void;
  onOpenIdeas: () => void;
  onOpenChronicle: () => void;
  onResetGame: () => void;
}

export const StatusHeader: React.FC<StatusHeaderProps> = ({
  empireState,
  currentRank,
  yearName,
  season,
  onOpenCodex,
  onOpenIdeas,
  onOpenChronicle,
  onResetGame,
}) => {
  // Helper for 5-segment modular bars as in Immersive UI
  const renderSegmentPips = (value: number, maxVal = 100) => {
    const activeSegments = Math.round((value / maxVal) * 5);
    return (
      <div className="flex gap-1 mt-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-1.5 h-3.5 rounded-[1px] transition-all duration-300 ${
              i < activeSegments
                ? 'bg-[#d4af37] shadow-[0_0_4px_rgba(212,175,55,0.5)]'
                : 'bg-[#d4af37]/15'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <header className="w-full bg-[#0a0a0f] border-b border-[#3d2b1f] px-4 py-3 sm:px-8 select-none chinese-font text-[#d4af37]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Rotated Diamond Crest, Title & Subtitle from Immersive UI */}
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div className="flex items-center gap-4">
            {/* Diamond Crest Emblem */}
            <div className="w-10 h-10 border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#05050a] shadow-[0_0_12px_rgba(212,175,55,0.25)] shrink-0">
              <span className="-rotate-45 font-bold text-lg text-[#d4af37]">唐</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg sm:text-xl font-semibold tracking-widest text-[#f5ebd7]">
                  大唐司天监 · 敦煌星占
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded border border-[#3d2b1f] bg-[#121212] text-[#d4af37]">
                  {yearName} · {season}
                </span>
              </div>
              <p className="text-[10px] text-[#8a7a5f] uppercase tracking-tighter">
                Directorate of Astronomy - Imperial Star Observation · 官秩：
                <span className="text-[#c4b59d] font-semibold">{currentRank.title}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Imperial & State Metrics Styled with Immersive 5-segment Indicator Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 max-w-2xl text-xs">
          {/* Imperial Favor */}
          <div className="p-2.5 rounded panel-silk flex flex-col justify-between border border-[#3d2b1f]">
            <div className="flex items-center justify-between text-[#8a7a5f]">
              <span className="flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>圣眷</span>
              </span>
              <span className="text-xs font-bold text-[#d4af37]">{empireState.imperialFavor}%</span>
            </div>
            {renderSegmentPips(empireState.imperialFavor)}
          </div>

          {/* State Stability */}
          <div className="p-2.5 rounded panel-silk flex flex-col justify-between border border-[#3d2b1f]">
            <div className="flex items-center justify-between text-[#8a7a5f]">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>国势</span>
              </span>
              <span className="text-xs font-bold text-[#d4af37]">{empireState.stateStability}%</span>
            </div>
            {renderSegmentPips(empireState.stateStability)}
          </div>

          {/* People Welfare */}
          <div className="p-2.5 rounded panel-silk flex flex-col justify-between border border-[#3d2b1f]">
            <div className="flex items-center justify-between text-[#8a7a5f]">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>民生</span>
              </span>
              <span className="text-xs font-bold text-[#d4af37]">{empireState.peopleWelfare}%</span>
            </div>
            {renderSegmentPips(empireState.peopleWelfare)}
          </div>

          {/* Prestige */}
          <div className="p-2.5 rounded panel-silk flex flex-col justify-between border border-[#3d2b1f]">
            <div className="flex items-center justify-between text-[#8a7a5f]">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>清望</span>
              </span>
              <span className="text-xs font-bold text-[#d4af37]">{empireState.prestige}</span>
            </div>
            {renderSegmentPips(empireState.prestige, 120)}
          </div>
        </div>

        {/* Right: Actions Styled to Match Immersive UI */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenCodex}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#3d2b1f] hover:border-[#d4af37] hover:bg-[#d4af37]/10 text-xs text-[#c4b59d] hover:text-[#d4af37] transition shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>星谱秘典</span>
          </button>

          <button
            onClick={onOpenChronicle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#3d2b1f] hover:border-[#d4af37] hover:bg-[#d4af37]/10 text-xs text-[#c4b59d] hover:text-[#d4af37] transition shadow-sm"
          >
            <History className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>起居注</span>
          </button>

          <button
            onClick={onOpenIdeas}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-xs text-[#d4af37] font-semibold transition shadow-sm"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>研讨案</span>
          </button>

          <button
            onClick={onResetGame}
            title="重新推演星占"
            className="p-2 rounded border border-[#3d2b1f] hover:border-[#d4af37] text-[#8a7a5f] hover:text-[#d4af37] transition shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
