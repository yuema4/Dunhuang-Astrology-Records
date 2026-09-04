import React from 'react';
import { MemorialOption, OfficialRank } from '../types/game';
import { Crown, Sparkles, TrendingUp, TrendingDown, ArrowRight, Award } from 'lucide-react';

interface DecreeModalProps {
  isOpen: boolean;
  chosenOption: MemorialOption | null;
  currentRank: OfficialRank;
  newRank: OfficialRank | null;
  isPromoted: boolean;
  onContinue: () => void;
}

export const DecreeModal: React.FC<DecreeModalProps> = ({
  isOpen,
  chosenOption,
  currentRank,
  newRank,
  isPromoted,
  onContinue,
}) => {
  if (!isOpen || !chosenOption) return null;

  const decree = chosenOption.emperorDecree;
  const effects = chosenOption.effects;

  return (
    <div
      id="imperial-decree-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-2xl flex flex-col rounded-xl bg-[#0a0a0f] border-2 border-[#3d2b1f] shadow-2xl text-[#d4af37] overflow-hidden">
        {/* Imperial Gold Top Ribbon */}
        <div className="px-6 py-5 bg-[#05050a] border-b border-[#3d2b1f] text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#121212] border border-[#3d2b1f] text-[11px] text-[#d4af37] uppercase tracking-widest mb-1.5">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>大唐皇帝制诰 · 御批朱墨回奏</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            {decree.reactionTitle}
          </h2>

          {/* Imperial Seal Stamp Icon */}
          <div className="absolute top-3 right-5 hidden sm:flex w-14 h-14 border border-[#e2533d]/70 items-center justify-center text-[#e2533d] font-bold text-xs text-center leading-3 rotate-12 select-none opacity-80">
            受命
            <br />
            于天
          </div>
        </div>

        {/* Decree Contents */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Vermilion Emperor's Ink (朱批) */}
          <div className="p-5 rounded bg-[#1a0806] border border-[#852317] relative shadow-inner">
            <div className="text-xs uppercase tracking-wider text-[#ff8d7a] font-semibold mb-2 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#e2533d] animate-ping" />
              <span>【大明宫御笔朱批】</span>
            </div>
            <p className="text-base text-[#ffd8d0] leading-relaxed italic pl-3 border-l-2 border-[#e2533d]">
              {decree.decreeText}
            </p>
          </div>

          {/* Real historical outcome */}
          <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-1 text-sm">
            <div className="font-semibold text-[#d4af37] text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>【国运事态变迁】</span>
            </div>
            <p className="text-[#c4b59d] leading-relaxed">
              {decree.historicalOutcome}
            </p>
          </div>

          {/* State Values Changes */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#8a7a5f]">
              【社稷与司天监因果结算】
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {/* Imperial Favor */}
              <div className="p-3 rounded bg-[#121212] border border-[#3d2b1f] flex flex-col items-center">
                <span className="text-[#8a7a5f]">天子圣眷</span>
                <div
                  className={`mt-1 flex items-center gap-1 font-bold text-sm ${
                    effects.imperialFavor >= 0 ? 'text-[#d4af37]' : 'text-[#f87171]'
                  }`}
                >
                  {effects.imperialFavor >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {effects.imperialFavor >= 0 ? '+' : ''}
                    {effects.imperialFavor}
                  </span>
                </div>
              </div>

              {/* State Stability */}
              <div className="p-3 rounded bg-[#121212] border border-[#3d2b1f] flex flex-col items-center">
                <span className="text-[#8a7a5f]">大唐国势</span>
                <div
                  className={`mt-1 flex items-center gap-1 font-bold text-sm ${
                    effects.stateStability >= 0 ? 'text-[#6ee7b7]' : 'text-[#f87171]'
                  }`}
                >
                  {effects.stateStability >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {effects.stateStability >= 0 ? '+' : ''}
                    {effects.stateStability}
                  </span>
                </div>
              </div>

              {/* People Welfare */}
              <div className="p-3 rounded bg-[#121212] border border-[#3d2b1f] flex flex-col items-center">
                <span className="text-[#8a7a5f]">天下苍生</span>
                <div
                  className={`mt-1 flex items-center gap-1 font-bold text-sm ${
                    effects.peopleWelfare >= 0 ? 'text-[#6ee7b7]' : 'text-[#f87171]'
                  }`}
                >
                  {effects.peopleWelfare >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {effects.peopleWelfare >= 0 ? '+' : ''}
                    {effects.peopleWelfare}
                  </span>
                </div>
              </div>

              {/* Prestige */}
              <div className="p-3 rounded bg-[#121212] border border-[#3d2b1f] flex flex-col items-center">
                <span className="text-[#8a7a5f]">清望名位</span>
                <div className="mt-1 flex items-center gap-1 font-bold text-sm text-[#c084fc]">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{effects.prestige}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Promotion Notice */}
          {isPromoted && newRank && (
            <div className="p-4 rounded border border-[#d4af37] bg-[#121212] shadow-[0_0_15px_rgba(212,175,55,0.2)] flex items-center gap-4 text-[#d4af37]">
              <div className="w-11 h-11 border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#0a0a0f] shrink-0">
                <Award className="w-5 h-5 text-[#d4af37] -rotate-45" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-[#8a7a5f] uppercase tracking-wider">
                  ★ 吏部推恩 · 官秩超迁 ★
                </div>
                <div className="text-base font-semibold text-white">
                  升任【{newRank.title}】（{newRank.grade}）
                </div>
                <p className="text-xs text-[#c4b59d] leading-relaxed">
                  {newRank.desc}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="px-6 py-4 bg-[#05050a] border-t border-[#3d2b1f] flex justify-end">
          <button
            onClick={onContinue}
            className="px-6 py-2.5 bg-[#d4af37] text-[#05050a] font-bold text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.35)] rounded flex items-center gap-2"
          >
            <span>谨奉圣谕 · 夜移星转</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
