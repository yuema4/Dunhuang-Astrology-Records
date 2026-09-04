import React from 'react';
import { EndingDefinition, EmpireState, OfficialRank, CampaignInfo } from '../types/game';
import { Trophy, BookOpen, RotateCcw, Compass, Award, Shield, Users, Crown, Sparkles, Scroll } from 'lucide-react';

interface EndingModalProps {
  isOpen: boolean;
  ending: EndingDefinition | null;
  campaign: CampaignInfo;
  finalRank: OfficialRank;
  finalState: EmpireState;
  onRestartCurrentCampaign: () => void;
  onOpenCampaignSelect: () => void;
  onOpenGallery: () => void;
}

export const EndingModal: React.FC<EndingModalProps> = ({
  isOpen,
  ending,
  campaign,
  finalRank,
  finalState,
  onRestartCurrentCampaign,
  onOpenCampaignSelect,
  onOpenGallery,
}) => {
  if (!isOpen || !ending) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'legend':
        return 'text-[#ffd700] border-[#ffd700] bg-[#ffd700]/10';
      case 'loyalist':
        return 'text-[#6ee7b7] border-[#6ee7b7] bg-[#6ee7b7]/10';
      case 'hermit':
        return 'text-[#c084fc] border-[#c084fc] bg-[#c084fc]/10';
      case 'exile':
        return 'text-[#f59e0b] border-[#f59e0b] bg-[#f59e0b]/10';
      case 'villain':
        return 'text-[#ef4444] border-[#ef4444] bg-[#ef4444]/10';
      case 'martyr':
        return 'text-[#f43f5e] border-[#f43f5e] bg-[#f43f5e]/10';
      case 'paragon':
        return 'text-[#d4af37] border-[#d4af37] bg-[#d4af37]/10';
      default:
        return 'text-[#a3a3a3] border-[#a3a3a3] bg-[#a3a3a3]/10';
    }
  };

  return (
    <div
      id="ending-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl bg-[#0a0a0f] border-2 border-[#d4af37] shadow-2xl text-[#d4af37] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#05050a] border-b border-[#3d2b1f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#121212] shadow-[0_0_12px_rgba(212,175,55,0.35)]">
              <Trophy className="w-5 h-5 text-[#d4af37] -rotate-45" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#8a7a5f]">
                {campaign.title} · 司天官生平终章
              </div>
              <h2 className="text-xl font-semibold text-white tracking-wide">
                大唐天文起居注 · 归宿长卷
              </h2>
            </div>
          </div>

          <button
            onClick={onOpenGallery}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#3d2b1f] hover:border-[#d4af37] text-xs text-[#c4b59d] hover:text-[#d4af37] transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>结局全图鉴</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Top Banner with Badge */}
          <div className="text-center space-y-2 pb-2 border-b border-[#3d2b1f]">
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded border ${getCategoryColor(
                ending.category
              )}`}
            >
              {ending.honorific}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-widest">
              {ending.title}
            </h1>
            <p className="text-xs text-[#8a7a5f] max-w-xl mx-auto">
              终局官秩：【{finalRank.title}】（{finalRank.grade}） · {campaign.emperor}朝
            </p>
          </div>

          {/* Classical 7-character Quatrain Poem Card */}
          <div className="p-5 rounded panel-silk border border-[#d4af37]/40 text-center space-y-2 bg-gradient-to-b from-[#121212]/80 to-[#0a0a0f]/80 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <div className="text-[11px] text-[#8a7a5f] flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>【青史绝句】</span>
            </div>
            <p className="text-base sm:text-lg font-serif italic text-[#f5ebd7] tracking-wider leading-relaxed">
              “{ending.poem}”
            </p>
          </div>

          {/* Epilogue Narratives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            {/* Summary & Verdict */}
            <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2">
              <div className="font-semibold text-sm text-white flex items-center gap-2">
                <Scroll className="w-4 h-4 text-[#d4af37]" />
                <span>【生平总评】</span>
              </div>
              <p className="text-[#c4b59d]">{ending.summary}</p>
              <div className="pt-2 border-t border-[#3d2b1f] text-[#8a7a5f]">
                <strong className="text-[#d4af37]">史论定语：</strong>
                {ending.verdict}
              </div>
            </div>

            {/* Historical Legacy */}
            <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2">
              <div className="font-semibold text-sm text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#d4af37]" />
                <span>【太庙史官长编记载】</span>
              </div>
              <p className="text-[#c4b59d]">{ending.historicalLegacy}</p>
            </div>
          </div>

          {/* Final Metrics Snapshot */}
          <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2.5">
            <div className="text-xs font-semibold text-[#8a7a5f] flex items-center justify-between">
              <span>【大唐社稷与仕途终局四维】</span>
              <span className="text-[10px] text-[#d4af37]">剧本：{campaign.title}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded bg-[#0a0a0f] border border-[#3d2b1f] flex items-center justify-between">
                <span className="flex items-center gap-1 text-[#8a7a5f]">
                  <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>圣眷</span>
                </span>
                <span className="font-bold text-white">{finalState.imperialFavor}%</span>
              </div>

              <div className="p-2.5 rounded bg-[#0a0a0f] border border-[#3d2b1f] flex items-center justify-between">
                <span className="flex items-center gap-1 text-[#8a7a5f]">
                  <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>国势</span>
                </span>
                <span className="font-bold text-white">{finalState.stateStability}%</span>
              </div>

              <div className="p-2.5 rounded bg-[#0a0a0f] border border-[#3d2b1f] flex items-center justify-between">
                <span className="flex items-center gap-1 text-[#8a7a5f]">
                  <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>民生</span>
                </span>
                <span className="font-bold text-white">{finalState.peopleWelfare}%</span>
              </div>

              <div className="p-2.5 rounded bg-[#0a0a0f] border border-[#3d2b1f] flex items-center justify-between">
                <span className="flex items-center gap-1 text-[#8a7a5f]">
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>清望</span>
                </span>
                <span className="font-bold text-white">{finalState.prestige}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 py-4 bg-[#05050a] border-t border-[#3d2b1f] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={onOpenCampaignSelect}
            className="w-full sm:w-auto px-4 py-2.5 rounded border border-[#3d2b1f] hover:border-[#d4af37] text-[#c4b59d] hover:text-[#d4af37] transition flex items-center justify-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>切换至其他朝代剧本</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onOpenGallery}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded border border-[#3d2b1f] hover:border-[#d4af37] text-[#8a7a5f] hover:text-[#d4af37] transition flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>全结局图鉴</span>
            </button>

            <button
              onClick={onRestartCurrentCampaign}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#d4af37] text-[#05050a] font-bold text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.35)] rounded flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-[#05050a]" />
              <span>重开本卷推演</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
