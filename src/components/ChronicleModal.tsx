import React from 'react';
import { ChronicleLog } from '../types/game';
import { History, X, Scroll, Sparkles } from 'lucide-react';

interface ChronicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: ChronicleLog[];
}

export const ChronicleModal: React.FC<ChronicleModalProps> = ({
  isOpen,
  onClose,
  logs,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="chronicle-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-xl bg-[#0a0a0f] border-2 border-[#3d2b1f] shadow-2xl text-[#d4af37] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#05050a] border-b border-[#3d2b1f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#121212] shadow-[0_0_8px_rgba(212,175,55,0.25)]">
              <History className="w-4 h-4 text-[#d4af37] -rotate-45" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#8a7a5f]">
                Directorate of Astronomy · 司天监编年纪事
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                太史局天文起居注录
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

        {/* List of chronicles */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {logs.length === 0 ? (
            <div className="text-center py-12 text-[#8a7a5f] space-y-2">
              <Scroll className="w-12 h-12 mx-auto text-[#3d2b1f] opacity-60" />
              <p>灵台初辟，尚无奏折结案记录。</p>
              <p className="text-xs text-[#8a7a5f]/80">
                请在星盘中寻找当夜星变，并批拟密奏进呈御览。
              </p>
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={log.id}
                className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-[#121212] text-[#d4af37] font-semibold border border-[#3d2b1f]">
                    {log.yearName}
                  </span>
                  <span className="text-[#8a7a5f]">卷第 {index + 1} 录</span>
                </div>

                <div className="font-semibold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>{log.anomalyName}</span>
                </div>

                <div className="text-xs text-[#c4b59d] bg-[#0a0a0f] p-3 rounded border border-[#3d2b1f] leading-relaxed">
                  <span className="text-[#d4af37] font-semibold">【御前批策】：</span>
                  {log.choiceSummary}
                </div>

                <div className="text-xs text-[#c4b59d] pl-3 border-l-2 border-[#d4af37]">
                  <span className="text-[#d4af37] font-semibold">【天旨与变迁】：</span>
                  {log.decreeResult}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#05050a] border-t border-[#3d2b1f] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded border border-[#3d2b1f] hover:border-[#d4af37] text-[#8a7a5f] hover:text-[#d4af37] text-xs transition"
          >
            合卷
          </button>
        </div>
      </div>
    </div>
  );
};
