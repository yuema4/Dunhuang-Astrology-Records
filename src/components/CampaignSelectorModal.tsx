import React from 'react';
import { CAMPAIGNS } from '../data/campaigns';
import { CampaignId } from '../types/game';
import { Compass, X, Check, Crown, Shield, Sparkles, Scroll } from 'lucide-react';

interface CampaignSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCampaignId: CampaignId;
  onSelectCampaign: (id: CampaignId) => void;
}

export const CampaignSelectorModal: React.FC<CampaignSelectorModalProps> = ({
  isOpen,
  onClose,
  currentCampaignId,
  onSelectCampaign,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="campaign-selector-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl bg-[#0a0a0f] border-2 border-[#d4af37] shadow-2xl text-[#d4af37] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#05050a] border-b border-[#3d2b1f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#121212] shadow-[0_0_12px_rgba(212,175,55,0.3)]">
              <Compass className="w-5 h-5 text-[#d4af37] -rotate-45" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white tracking-wide">
                大唐历史剧幕 · 卷帙择定
              </h2>
              <p className="text-xs text-[#8a7a5f]">
                择定不同大唐历史时空，领司天台实职，推验星运与朝局走向
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded border border-[#3d2b1f] hover:border-[#d4af37] text-[#8a7a5f] hover:text-[#d4af37] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Campaign Cards Grid */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CAMPAIGNS.map((camp) => {
              const isSelected = camp.id === currentCampaignId;

              return (
                <div
                  key={camp.id}
                  onClick={() => onSelectCampaign(camp.id)}
                  className={`cursor-pointer rounded-xl p-5 border-2 transition-all flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-[#121218] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                      : 'bg-[#07070b] border-[#3d2b1f] hover:border-[#d4af37]/60 hover:bg-[#0c0c12]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] px-2.5 py-0.5 rounded border border-[#d4af37]/40 bg-[#05050a] text-[#d4af37] font-semibold">
                        {camp.badge}
                      </span>
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-xs text-[#6ee7b7] font-bold">
                          <Check className="w-4 h-4" />
                          <span>当前推演</span>
                        </span>
                      ) : (
                        <span className="text-xs text-[#8a7a5f] hover:text-[#d4af37]">
                          点击切换 ➔
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white pt-1">{camp.title}</h3>
                    <div className="text-xs text-[#d4af37] font-medium">{camp.subtitle}</div>
                    <div className="text-[11px] text-[#8a7a5f]">{camp.period}</div>

                    <div className="pt-2 text-xs text-[#c4b59d] leading-relaxed line-clamp-4">
                      {camp.intro}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#3d2b1f] space-y-1.5 text-xs text-[#8a7a5f]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>君主：{camp.emperor}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>令司：{camp.director}</span>
                      </span>
                    </div>

                    <div className="p-2 rounded bg-[#05050a] border border-[#222] text-[11px] text-[#d4af37] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>焦点：{camp.focus}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#05050a] border-t border-[#3d2b1f] flex items-center justify-between text-xs text-[#8a7a5f]">
          <span>提示：切换剧本将重置当前剧本的历史进程与四维社稷指数。</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#d4af37] text-[#05050a] font-bold hover:brightness-110 transition shadow"
          >
            确定起步
          </button>
        </div>
      </div>
    </div>
  );
};
