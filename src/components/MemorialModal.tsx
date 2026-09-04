import React, { useState } from 'react';
import { AstrologicalAnomaly, MemorialOption } from '../types/game';
import { Scroll, AlertTriangle, Send, X, BookOpen, ShieldAlert, Sparkles, Scale } from 'lucide-react';

interface MemorialModalProps {
  anomaly: AstrologicalAnomaly;
  isOpen: boolean;
  onClose: () => void;
  onSubmitMemorial: (option: MemorialOption) => void;
}

export const MemorialModal: React.FC<MemorialModalProps> = ({
  anomaly,
  isOpen,
  onClose,
  onSubmitMemorial,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    anomaly.options[0]?.id || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentOption =
    anomaly.options.find((opt) => opt.id === selectedOptionId) ||
    anomaly.options[0];

  const handleConfirmSubmit = () => {
    if (!currentOption) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitMemorial(currentOption);
    }, 400);
  };

  const getStanceBadge = (stance: MemorialOption['stance']) => {
    switch (stance) {
      case 'direct_remonstrance':
        return {
          label: '极言直谏 · 忠言逆耳',
          color: 'bg-[#5c241c] text-[#f8b4a8] border-[#8e3528]',
        };
      case 'flatter_omen':
        return {
          label: '附会祥瑞 · 粉饰盛世',
          color: 'bg-[#5c4a1c] text-[#ffd67a] border-[#8e7428]',
        };
      case 'court_intrigue':
        return {
          label: '借星言政 · 朝堂政争',
          color: 'bg-[#2d2242] text-[#d6bfff] border-[#553b82]',
        };
      case 'secret_ritual':
        return {
          label: '秘法禳解 · 潜行弭灾',
          color: 'bg-[#1c3f30] text-[#9ee2c2] border-[#2c6850]',
        };
    }
  };

  return (
    <div
      id="memorial-scroll-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl bg-[#0a0a0f] border-2 border-[#3d2b1f] shadow-2xl text-[#d4af37] overflow-hidden">
        {/* Ancient Scroll Top Header with Gold & Bronze Trim */}
        <div className="relative flex items-center justify-between px-6 py-4 bg-[#05050a] border-b border-[#3d2b1f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#121212] shadow-[0_0_8px_rgba(212,175,55,0.25)]">
              <Scroll className="w-4 h-4 text-[#d4af37] -rotate-45" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#8a7a5f] font-serif">
                Directorate of Astronomy · 灵台夜报密折
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                <span>{anomaly.title}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#121212] text-[#d4af37] font-normal border border-[#3d2b1f]">
                  {anomaly.yearName} · {anomaly.season}
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded border border-[#3d2b1f] hover:border-[#d4af37] hover:bg-[#d4af37]/10 text-[#8a7a5f] hover:text-[#d4af37] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Observation & Ancient Codex Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Observation Card */}
            <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37]">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>【灵台测候实况】</span>
              </div>
              <p className="text-sm text-[#c4b59d] leading-relaxed">
                {anomaly.description}
              </p>
              <div className="text-xs text-[#8a7a5f] pt-1 border-t border-[#3d2b1f]">
                <span className="font-semibold text-[#d4af37]">历史机杼：</span>
                {anomaly.historicalContext}
              </div>
            </div>

            {/* Ancient Divination Book Reference */}
            <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37]">
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span>【司天秘典考据 · 《开元占经》与《乙巳占》】</span>
              </div>
              <blockquote className="text-sm italic text-[#c4b59d] leading-relaxed pl-3 border-l-2 border-[#d4af37]">
                {anomaly.ancientTextQuote}
              </blockquote>
              <p className="text-xs text-[#8a7a5f] pt-1">
                司天台训示：天垂象，圣人象之。若占断有误或欺罔天子，罪在不赦。
              </p>
            </div>
          </div>

          {/* Memorial Draft Options Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-[#d4af37] flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#d4af37]" />
                <span>【密奏草拟权衡】 请决断呈递御前之奏疏策论：</span>
              </h3>
              <span className="text-xs text-[#8a7a5f]">点击选项切换奏稿</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {anomaly.options.map((opt) => {
                const isSelected = opt.id === selectedOptionId;
                const badge = getStanceBadge(opt.stance);
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`cursor-pointer p-4 rounded border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#121212] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                        : 'bg-[#0a0a0f] border-[#3d2b1f] hover:border-[#8a7a5f]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded border font-semibold ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                        {isSelected && (
                          <span className="text-xs text-[#d4af37] font-bold">
                            ● 拟定中
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm text-white leading-snug">
                        {opt.label}
                      </h4>
                      <p className="text-xs text-[#8a7a5f] mt-1.5 line-clamp-2">
                        {opt.summary}
                      </p>
                    </div>

                    {/* Numeric Impact Preview Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2 border-t border-[#3d2b1f] text-[11px]">
                      <span
                        className={`px-1.5 py-0.5 rounded border ${
                          opt.effects.imperialFavor >= 0
                            ? 'bg-[#121212] text-[#d4af37] border-[#3d2b1f]'
                            : 'bg-[#180e0c] text-[#f87171] border-[#5e1910]'
                        }`}
                      >
                        圣眷 {opt.effects.imperialFavor >= 0 ? '+' : ''}
                        {opt.effects.imperialFavor}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded border ${
                          opt.effects.stateStability >= 0
                            ? 'bg-[#121212] text-[#6ee7b7] border-[#3d2b1f]'
                            : 'bg-[#180e0c] text-[#f87171] border-[#5e1910]'
                        }`}
                      >
                        国势 {opt.effects.stateStability >= 0 ? '+' : ''}
                        {opt.effects.stateStability}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded border ${
                          opt.effects.peopleWelfare >= 0
                            ? 'bg-[#121212] text-[#6ee7b7] border-[#3d2b1f]'
                            : 'bg-[#180e0c] text-[#f87171] border-[#5e1910]'
                        }`}
                      >
                        民生 {opt.effects.peopleWelfare >= 0 ? '+' : ''}
                        {opt.effects.peopleWelfare}
                      </span>
                      <span className="px-1.5 py-0.5 rounded border bg-[#121212] text-[#c084fc] border-[#3d2b1f]">
                        清望 +{opt.effects.prestige}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Classical Chinese Memorial Draft View (奏折正文) */}
          {currentOption && (
            <div className="p-5 rounded bg-[#e8dfcf] text-[#1c140e] border-2 border-[#8a7a5f] shadow-inner font-serif relative">
              {/* Antique Paper Seals & Fold Lines */}
              <div className="absolute top-3 right-4 w-12 h-12 border-2 border-[#b83320] flex items-center justify-center text-[#b83320] font-bold text-[10px] leading-3 text-center rotate-6 select-none opacity-80">
                通事
                <br />
                舍人进
              </div>

              <div className="text-xs uppercase tracking-widest text-[#6e5842] mb-2 font-bold flex items-center gap-1">
                <span>【司天台进呈黄敕奏折正本】</span>
              </div>

              <div className="text-sm leading-relaxed whitespace-pre-wrap font-serif text-[#1c140e] border-l-2 border-[#8a7a5f] pl-4 py-1">
                {currentOption.memorialDraft}
              </div>

              {/* Risk warning */}
              <div className="mt-4 pt-3 border-t border-[#8a7a5f]/40 flex items-start gap-2 text-xs text-[#6e4e32]">
                <AlertTriangle className="w-4 h-4 text-[#b83320] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#8c2a1c]">御前风险推演：</span>
                  {currentOption.expectedRisk}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 bg-[#05050a] border-t border-[#3d2b1f] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-[#3d2b1f] hover:border-[#d4af37] text-[#8a7a5f] hover:text-[#d4af37] text-xs transition"
          >
            返回灵台复核星象
          </button>

          <button
            onClick={handleConfirmSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#d4af37] text-[#05050a] font-bold text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.35)] rounded flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-[#05050a]" />
            <span>{isSubmitting ? '通事舍人飞骑进呈...' : '钤印发折 · 进呈御览'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
