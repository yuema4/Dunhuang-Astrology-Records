import React from 'react';
import { Lightbulb, X, Sparkles, BrainCircuit, Compass, History, Users, Layers, CheckCircle2 } from 'lucide-react';

interface IdeasDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IdeasDiscussionModal: React.FC<IdeasDiscussionModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="ideas-discussion-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl bg-[#0a0a0f] border-2 border-[#3d2b1f] shadow-2xl text-[#d4af37] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#05050a] border-b border-[#3d2b1f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#121212] shadow-[0_0_8px_rgba(212,175,55,0.25)]">
              <Lightbulb className="w-4 h-4 text-[#d4af37] -rotate-45" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#8a7a5f]">
                Game Design Blueprint · 游戏策划案与架构研讨
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                《司天监：敦煌星占录》框架与后续创意研讨
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Current Implemented Framework Summary */}
          <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#d4af37]">
              <CheckCircle2 className="w-4 h-4 text-[#6ee7b7]" />
              <span>【已落地构建的第一期基础框架 (V1.0 MVP)】</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#c4b59d]">
              <div className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">✔</span>
                <span>
                  <strong>敦煌写本S.3326星图视界</strong>：长卷展开与浑仪圆盘双模式，复原甘、石、巫咸三家三色星点与二十八宿古星连线。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">✔</span>
                <span>
                  <strong>司天监密奏决策流</strong>：真实引用《开元占经》《乙巳占》，包含极言直谏、附会祥瑞、借星言政、潜行禳解四大抉择方向。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">✔</span>
                <span>
                  <strong>大唐社稷与官品体系</strong>：圣眷、国势、民生、清望四维数值流转，从历算生到正三品司天监正的官秩晋升。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">✔</span>
                <span>
                  <strong>皇帝御批朱批与历史回响</strong>：天子批阅奏疏、朝堂反应与民生变迁因果。
                </span>
              </div>
            </div>
          </div>

          {/* Deep Feature Brainstorming & Discussion */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#d4af37] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>【我为您整理的 5 个进阶玩法创意，期待与您探讨】：</span>
            </h3>

            {/* Idea 1: Gemini AI Freeform Memorial */}
            <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2 hover:border-[#d4af37] transition">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-[#6ee7b7]" />
                  <span>创意一：【AI赋能 · 御前自由撰折与君臣舌战】</span>
                </h4>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#121212] text-[#d4af37] border border-[#3d2b1f]">
                  Gemini API 深度结合
                </span>
              </div>
              <p className="text-xs text-[#8a7a5f] leading-relaxed">
                除了目前的预设选项，未来可以提供一个“御墨亲书”模式：玩家可以用自己的文字（哪怕是半文言或白话）写一封奏折。我们通过大模型扮演唐玄宗或唐太宗，现场生成极具唐风文采的朱批与朝臣驳议，根据玩家的说服逻辑动态增减四维数值！
              </p>
            </div>

            {/* Idea 2: Armillary & Water-Clock Mechanism */}
            <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2 hover:border-[#d4af37] transition">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#d4af37]" />
                  <span>创意二：【水运浑天仪机关与圭表测影解谜】</span>
                </h4>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#121212] text-[#d4af37] border border-[#3d2b1f]">
                  科学解谜玩法
                </span>
              </div>
              <p className="text-xs text-[#8a7a5f] leading-relaxed">
                唐代僧一行与梁令瓒发明了世界上最早带有擒纵机构的水运浑象与黄道游仪。可以加入小游戏：在特定节气（冬至/夏至），玩家需要通过调校浑仪齿轮注水速率、调整八尺圭表日影长度，来完成天下历法测定（如推算《大衍历》），让司天监不仅仅是“占卜”，更有唐代高超天文科学的实感！
              </p>
            </div>

            {/* Idea 3: Historical Dynasty Eras */}
            <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2 hover:border-[#d4af37] transition">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-[#e2533d]" />
                  <span>创意三：【大唐历史剧幕与多结局走向】</span>
                </h4>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#121212] text-[#d4af37] border border-[#3d2b1f]">
                  历史沉浸与多结局
                </span>
              </div>
              <p className="text-xs text-[#8a7a5f] leading-relaxed">
                可设置不同剧本包：
                <br />
                ① <strong>贞观篇</strong>：协助太宗推历，应对太白昼见之谜，保全忠良；
                <br />
                ② <strong>开元天宝篇</strong>：盛极而衰，面对蚩尤旗彗星横扫幽燕，你能否在安史之乱前夕警醒朝野？
                <br />
                根据玩家的累计抉择，可达成诸如“【一代天师国师】”、“【归隐终南山仙逸】”、“【大唐中兴定策重臣】”、“【贬谪岭南诗酒老】”等多种仕途与国运结局。
              </p>
            </div>

            {/* Idea 4: Internal Directorate Faction Politics */}
            <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2 hover:border-[#d4af37] transition">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#c084fc]" />
                  <span>创意四：【司天监内廷人际与门客同僚交际】</span>
                </h4>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#121212] text-[#d4af37] border border-[#3d2b1f]">
                  职场与势力互动
                </span>
              </div>
              <p className="text-xs text-[#8a7a5f] leading-relaxed">
                司天监内并非一人独大：有老成持重的监正、嫉贤妒能的五官正、一心算学的历算博士、还有受命于权相或宦官的密探。奏折可能需要先过副监之手，或者需要寻找盟友联署上奏，增加官场博弈的趣味性。
              </p>
            </div>

            {/* Idea 5: Dunhuang Cultural Preservation & Real Relic Collection */}
            <div className="p-4 rounded panel-silk border border-[#3d2b1f] space-y-2 hover:border-[#d4af37] transition">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#d4af37]" />
                  <span>创意五：【敦煌藏经洞写卷收集与星官拼图】</span>
                </h4>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#121212] text-[#d4af37] border border-[#3d2b1f]">
                  文化图鉴收集
                </span>
              </div>
              <p className="text-xs text-[#8a7a5f] leading-relaxed">
                随着游戏进程，玩家可逐步解锁完整的12幅敦煌星图残卷高清临摹图谱、唐代星官神怪图（如二十八宿神形兽首人身像）以及古乐古谱音律。
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#05050a] border-t border-[#3d2b1f] flex items-center justify-between text-xs text-[#8a7a5f]">
          <span>随时可在对话中提出您最感兴趣的方向，我们持续深化迭代！</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#d4af37] text-[#05050a] font-bold text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.35)] rounded"
          >
            领会构想 · 开启司天之旅
          </button>
        </div>
      </div>
    </div>
  );
};
