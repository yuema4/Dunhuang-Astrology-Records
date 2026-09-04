import React, { useState } from 'react';
import { ENDING_DEFINITIONS } from '../data/endings';
import { UnlockedEndingRecord, EndingDefinition } from '../types/game';
import { BookOpen, X, Lock, CheckCircle2, Trophy, Sparkles, Scroll, Compass } from 'lucide-react';

interface EndingGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedRecords: UnlockedEndingRecord[];
}

export const EndingGalleryModal: React.FC<EndingGalleryModalProps> = ({
  isOpen,
  onClose,
  unlockedRecords,
}) => {
  const [selectedEnding, setSelectedEnding] = useState<EndingDefinition>(ENDING_DEFINITIONS[0]);

  if (!isOpen) return null;

  const isEndingUnlocked = (id: string) => {
    return unlockedRecords.some((r) => r.endingId === id);
  };

  const getRecord = (id: string) => {
    return unlockedRecords.find((r) => r.endingId === id);
  };

  const unlockedCount = ENDING_DEFINITIONS.filter((e) => isEndingUnlocked(e.id)).length;

  return (
    <div
      id="ending-gallery-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-xl bg-[#0a0a0f] border-2 border-[#3d2b1f] shadow-2xl text-[#d4af37] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#05050a] border-b border-[#3d2b1f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#121212] shadow-[0_0_12px_rgba(212,175,55,0.25)]">
              <Trophy className="w-5 h-5 text-[#d4af37] -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-white tracking-wide">
                  大唐星官史册 · 结局全图鉴
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded bg-[#121212] border border-[#d4af37]/40 text-[#d4af37]">
                  已达成 {unlockedCount} / {ENDING_DEFINITIONS.length}
                </span>
              </div>
              <p className="text-xs text-[#8a7a5f]">
                历经贞观推历与开元兵革风云，探寻司天监八大归宿与大唐国运变迁
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

        {/* Content: Master-Detail Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: List of 8 Endings */}
          <div className="lg:col-span-5 p-4 overflow-y-auto border-r border-[#3d2b1f] space-y-2 bg-[#08080d]">
            {ENDING_DEFINITIONS.map((def) => {
              const unlocked = isEndingUnlocked(def.id);
              const isSelected = selectedEnding.id === def.id;
              const record = getRecord(def.id);

              return (
                <button
                  key={def.id}
                  onClick={() => setSelectedEnding(def)}
                  className={`w-full text-left p-3 rounded transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : unlocked
                      ? 'bg-[#0f0f16] border-[#3d2b1f] text-[#c4b59d] hover:border-[#d4af37]/50'
                      : 'bg-[#050508] border-[#202028] text-[#555] hover:border-[#3d2b1f]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded flex items-center justify-center text-xs shrink-0 ${
                        unlocked
                          ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40'
                          : 'bg-[#151520] text-[#555] border border-[#333]'
                      }`}
                    >
                      {unlocked ? <CheckCircle2 className="w-4 h-4 text-[#6ee7b7]" /> : <Lock className="w-3.5 h-3.5" />}
                    </div>

                    <div>
                      <div className="font-semibold text-xs sm:text-sm tracking-wide">
                        {unlocked ? def.title : '【迷雾重重 · 未探明】'}
                      </div>
                      <div className="text-[10px] text-[#8a7a5f] mt-0.5">
                        {unlocked && record
                          ? `终官：${record.finalRank} · ${record.campaignId === 'zhenguan' ? '贞观卷' : '开元卷'}`
                          : `线索：${def.conditionHint}`}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#8a7a5f] shrink-0 ml-2">
                    {unlocked ? '查看 ➔' : '锁闭'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed View of Selected Ending */}
          <div className="lg:col-span-7 p-6 overflow-y-auto space-y-4 bg-[#0a0a0f]">
            {isEndingUnlocked(selectedEnding.id) ? (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-[#3d2b1f] pb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded border border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] mb-2">
                    {selectedEnding.honorific}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedEnding.title}
                  </h3>
                  {getRecord(selectedEnding.id) && (
                    <div className="text-xs text-[#8a7a5f] mt-1">
                      达成时间：{getRecord(selectedEnding.id)?.unlockedAt} · 终任：
                      {getRecord(selectedEnding.id)?.finalRank}
                    </div>
                  )}
                </div>

                {/* Poem */}
                <div className="p-4 rounded panel-silk border border-[#d4af37]/30 text-center space-y-1 bg-[#121218]">
                  <div className="text-[11px] text-[#8a7a5f] flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>【七言绝句】</span>
                  </div>
                  <p className="text-base font-serif italic text-[#f5ebd7] tracking-wider leading-relaxed">
                    “{selectedEnding.poem}”
                  </p>
                </div>

                {/* Narrative & Lore */}
                <div className="space-y-3 text-xs leading-relaxed text-[#c4b59d]">
                  <div className="p-3.5 rounded bg-[#07070b] border border-[#3d2b1f] space-y-1.5">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>生平总论</span>
                    </div>
                    <p>{selectedEnding.summary}</p>
                  </div>

                  <div className="p-3.5 rounded bg-[#07070b] border border-[#3d2b1f] space-y-1.5">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>太史局金匮史载</span>
                    </div>
                    <p>{selectedEnding.historicalLegacy}</p>
                  </div>

                  <div className="p-3 rounded border-l-2 border-[#d4af37] bg-[#07070b] text-[#8a7a5f]">
                    <strong className="text-[#d4af37]">史臣赞语：</strong>
                    {selectedEnding.verdict}
                  </div>
                </div>
              </div>
            ) : (
              /* Locked Hint Screen */
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#3d2b1f] flex items-center justify-center text-[#555]">
                  <Lock className="w-8 h-8 text-[#8a7a5f]" />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h4 className="text-lg font-bold text-[#8a7a5f]">该结局尚未在史册中探明</h4>
                  <p className="text-xs text-[#555] leading-relaxed">
                    大唐司天监观星者在风云诡谲的历史大势中，因不同立场的密奏抉择，将引向迥异的仕途与国运归宿。
                  </p>
                </div>

                <div className="w-full max-w-md p-4 rounded bg-[#07070b] border border-[#3d2b1f] text-left space-y-2">
                  <div className="text-xs font-semibold text-[#d4af37] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>【太史局秘档 · 解锁线索】</span>
                  </div>
                  <p className="text-xs text-[#c4b59d]">{selectedEnding.conditionHint}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#05050a] border-t border-[#3d2b1f] flex items-center justify-between text-xs text-[#8a7a5f]">
          <span>提示：完成贞观或天宝各篇章，或触发极端朝局情势，均可解锁对应结局。</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#d4af37] text-[#05050a] font-bold hover:brightness-110 transition"
          >
            返回灵台
          </button>
        </div>
      </div>
    </div>
  );
};
