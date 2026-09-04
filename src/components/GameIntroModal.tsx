import React from 'react';
import { Scroll, Compass, Sparkles, AlertTriangle, Trophy } from 'lucide-react';

interface GameIntroModalProps {
  isOpen: boolean;
  onStart: () => void;
  gameOverType: 'favor_lost' | 'state_collapsed' | 'welfare_starved' | 'grand_master' | null;
  onRestart: () => void;
}

export const GameIntroModal: React.FC<GameIntroModalProps> = ({
  isOpen,
  onStart,
  gameOverType,
  onRestart,
}) => {
  if (!isOpen && !gameOverType) return null;

  // Game over state
  if (gameOverType) {
    const getGameOverContent = () => {
      switch (gameOverType) {
        case 'favor_lost':
          return {
            title: '【削职罢黜 · 发配岭南】',
            subtitle: '天子雷霆之怒，圣眷归零',
            desc: '你在御前密奏中数度逆拂龙颜，遭权相谗构。唐皇一道朱批将你除名司天籍，贬为岭南连州参军，终老荒烟瘴雨之中。',
            isWin: false,
          };
        case 'state_collapsed':
          return {
            title: '【烽火连天 · 大唐鼎革】',
            subtitle: '天意未备，藩镇兵起',
            desc: '北方兵戈骤起，安史铁骑踏碎霓裳羽衣！潼关失守，两京沦陷。司天台毁于战火，敦煌星图卷轴散落民间，青史空余浩叹。',
            isWin: false,
          };
        case 'welfare_starved':
          return {
            title: '【赤地千里 · 民怨沸腾】',
            subtitle: '粉饰太平，天下饥馁',
            desc: '朝廷沉迷祥瑞，对天灾兵祸视而不见。关中黄河赤地千里，流民揭竿而起，司天台终被愤怒的百姓付之一炬。',
            isWin: false,
          };
        case 'grand_master':
          return {
            title: '【一代国师 · 盛唐天枢】',
            subtitle: '通天彻地，功在社稷',
            desc: '你历经数十年朝堂风云，秉持天心正道，上规谏人主，下恤念苍生。所修敦煌星图与新大衍历被奉为万代法典，名垂青史，位极司天监正！',
            isWin: true,
          };
      }
    };

    const content = getGameOverContent();

    return (
      <div
        id="game-over-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in chinese-font"
      >
        <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-xl bg-[#0a0a0f] border-2 border-[#3d2b1f] shadow-2xl text-center space-y-5 text-[#d4af37]">
          <div className="w-16 h-16 mx-auto border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#121212] shadow-[0_0_15px_rgba(212,175,55,0.35)]">
            {content.isWin ? (
              <Trophy className="w-8 h-8 text-[#d4af37] -rotate-45" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-[#f87171] -rotate-45" />
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
            <div className="text-xs text-[#8a7a5f] tracking-widest uppercase">
              {content.subtitle}
            </div>
          </div>

          <p className="text-sm text-[#c4b59d] leading-relaxed px-2 panel-silk p-4 rounded border border-[#3d2b1f]">
            {content.desc}
          </p>

          <button
            onClick={onRestart}
            className="w-full py-3 rounded bg-[#d4af37] text-[#05050a] font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-95 transition"
          >
            拨转星盘 · 重新开局推演
          </button>
        </div>
      </div>
    );
  }

  // Welcome / Instructions modal
  return (
    <div
      id="game-intro-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-xl bg-[#0a0a0f] border-2 border-[#3d2b1f] shadow-2xl space-y-6 text-[#d4af37]">
        {/* Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#121212] border border-[#3d2b1f] text-xs text-[#d4af37] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>大唐长安 · 司天台保章正试炼</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-wide">
            司天监：敦煌星占录
          </h1>
          <p className="text-xs text-[#8a7a5f] max-w-md mx-auto">
            “天垂象，见吉凶，圣人象之。”
            <br />
            ——基于莫高窟藏经洞《敦煌星图》写卷与唐代古法星占
          </p>
        </div>

        {/* Narrative Intro */}
        <div className="p-4 rounded panel-silk border border-[#3d2b1f] text-xs sm:text-sm text-[#c4b59d] leading-relaxed space-y-3">
          <p>
            大唐开元年间，天威赫赫，万邦来朝。你身为<strong>司天台保章正</strong>
            ，夜值长安灵台，手捧太史局秘藏的敦煌星图长卷，仰窥三垣二十八宿之行度。
          </p>
          <p>
            星象动而风云变：荧惑守心、太白昼见、蚩尤旗出玄武……天机之变，不仅关乎阴阳五行，更牵系着边关兵戈、朝堂相权、黎民生息与天子之怒！
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#3d2b1f] text-xs">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Compass className="w-4 h-4 text-[#d4af37]" />
              <span>观天测象：寻觅星天异动</span>
            </div>
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Scroll className="w-4 h-4 text-[#d4af37]" />
              <span>御前密奏：抉择社稷国运</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3 rounded bg-[#d4af37] text-[#05050a] font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-95 transition"
          >
            登灵台 · 夜观天象
          </button>
        </div>
      </div>
    </div>
  );
};
