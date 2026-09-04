import React from 'react';
import { CampaignId, CampaignInfo } from '../types/game';
import { CAMPAIGNS } from '../data/campaigns';
import { Compass, Sparkles, Scroll, Crown, Shield } from 'lucide-react';

interface GameIntroModalProps {
  isOpen: boolean;
  onStart: () => void;
  selectedCampaignId: CampaignId;
  onSelectCampaign: (id: CampaignId) => void;
}

export const GameIntroModal: React.FC<GameIntroModalProps> = ({
  isOpen,
  onStart,
  selectedCampaignId,
  onSelectCampaign,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="game-intro-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-3xl p-6 sm:p-8 rounded-xl bg-[#0a0a0f] border-2 border-[#d4af37] shadow-2xl space-y-6 text-[#d4af37]">
        {/* Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#121218] border border-[#3d2b1f] text-xs text-[#d4af37] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>大唐长安 · 灵台保章正试炼</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-wide">
            司天监：敦煌星占录
          </h1>
          <p className="text-xs text-[#8a7a5f] max-w-md mx-auto">
            “天垂象，见吉凶，圣人象之。”
            <br />
            ——基于莫高窟藏经洞《敦煌星图》写卷与大唐历史剧幕
          </p>
        </div>

        {/* Narrative Intro */}
        <div className="p-4 rounded panel-silk border border-[#3d2b1f] text-xs text-[#c4b59d] leading-relaxed space-y-2">
          <p>
            夜值长安观象台，手捧太史局秘藏的敦煌星图长卷，仰窥三垣二十八宿之运行。
            星象之变，不仅关乎阴阳五行，更系于边关兵戈、朝堂相权、黎民生息与天子圣意。
          </p>
        </div>

        {/* Campaign Selection Grid */}
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-[#8a7a5f] flex items-center justify-between">
            <span className="flex items-center gap-1 text-[#d4af37]">
              <Compass className="w-3.5 h-3.5" />
              <span>请择定开卷历史剧幕：</span>
            </span>
            <span className="text-[11px] text-[#8a7a5f]">随时可于顶部切换剧本</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CAMPAIGNS.map((c) => {
              const isSelected = c.id === selectedCampaignId;

              return (
                <div
                  key={c.id}
                  onClick={() => onSelectCampaign(c.id)}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-[#121218] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-[#050508] border-[#3d2b1f] hover:border-[#d4af37]/50 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded border border-[#d4af37]/30 text-[#d4af37] bg-[#05050a]">
                        {c.badge}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] text-[#6ee7b7] font-bold">● 已择定</span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white">{c.title}</h3>
                    <div className="text-xs text-[#d4af37]">{c.subtitle}</div>
                    <p className="text-[11px] text-[#8a7a5f] mt-1.5 line-clamp-2 leading-relaxed">
                      {c.intro}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#3d2b1f] text-[10px] text-[#8a7a5f] flex items-center justify-between">
                    <span>帝王：{c.emperor}</span>
                    <span>主理：{c.director}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-10 py-3 rounded bg-[#d4af37] text-[#05050a] font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-95 transition"
          >
            登临灵台 · 开卷推演
          </button>
        </div>
      </div>
    </div>
  );
};
