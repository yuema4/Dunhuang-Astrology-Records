import React, { useState } from 'react';
import { Constellation } from '../types/game';
import { BookOpen, X, Sparkles, Scroll, Compass, Star } from 'lucide-react';

interface ConstellationCodexProps {
  isOpen: boolean;
  onClose: () => void;
  constellations: Constellation[];
  onSelectConstellationFromCodex: (c: Constellation) => void;
}

export const ConstellationCodex: React.FC<ConstellationCodexProps> = ({
  isOpen,
  onClose,
  constellations,
  onSelectConstellationFromCodex,
}) => {
  const [activeTab, setActiveTab] = useState<'constellations' | 'lore' | 'history'>('constellations');
  const [selectedCodexConstellation, setSelectedCodexConstellation] = useState<Constellation>(
    constellations[0]
  );

  if (!isOpen) return null;

  return (
    <div
      id="constellation-codex-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in chinese-font"
    >
      <div className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-xl bg-[#0a0a0f] border-2 border-[#3d2b1f] shadow-2xl text-[#d4af37] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#05050a] border-b border-[#3d2b1f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#d4af37] rotate-45 flex items-center justify-center bg-[#121212] shadow-[0_0_8px_rgba(212,175,55,0.25)]">
              <BookOpen className="w-4 h-4 text-[#d4af37] -rotate-45" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#8a7a5f]">
                Directorate of Astronomy · 司天监金匮玉策
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                敦煌星图与古法星占典鉴
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-[#0a0a0f] border-b border-[#3d2b1f] text-xs">
          <button
            onClick={() => setActiveTab('constellations')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
              activeTab === 'constellations'
                ? 'bg-[#d4af37] text-[#05050a] font-bold shadow'
                : 'text-[#8a7a5f] hover:text-[#d4af37]'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>三垣二十八宿谱</span>
          </button>
          <button
            onClick={() => setActiveTab('lore')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
              activeTab === 'lore'
                ? 'bg-[#d4af37] text-[#05050a] font-bold shadow'
                : 'text-[#8a7a5f] hover:text-[#d4af37]'
            }`}
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>《乙巳占》与星占秘要</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
              activeTab === 'history'
                ? 'bg-[#d4af37] text-[#05050a] font-bold shadow'
                : 'text-[#8a7a5f] hover:text-[#d4af37]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>敦煌星图与唐代司天监</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'constellations' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Constellation List */}
              <div className="space-y-1.5 md:col-span-1 max-h-[60vh] overflow-y-auto pr-2">
                <div className="text-xs font-semibold text-[#8a7a5f] mb-2">
                  【星图星官名录】
                </div>
                {constellations.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCodexConstellation(c)}
                    className={`cursor-pointer p-2.5 rounded border text-xs transition-all ${
                      selectedCodexConstellation.id === c.id
                        ? 'bg-[#121212] border-[#d4af37] text-[#d4af37] font-semibold shadow-[0_0_8px_rgba(212,175,55,0.25)]'
                        : 'bg-[#0a0a0f] border-[#3d2b1f] text-[#8a7a5f] hover:border-[#8a7a5f] hover:text-[#c4b59d]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{c.name}</span>
                      <span className="text-[10px] text-[#8a7a5f]">
                        {c.stars.length}星
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Constellation Details */}
              <div className="md:col-span-2 p-5 rounded panel-silk border border-[#3d2b1f] space-y-4">
                <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-3">
                  <div>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#121212] text-[#d4af37] border border-[#3d2b1f] mr-2">
                      {selectedCodexConstellation.division}
                    </span>
                    <h3 className="text-xl font-semibold text-white inline-block mt-1">
                      {selectedCodexConstellation.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      onSelectConstellationFromCodex(selectedCodexConstellation);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded bg-[#d4af37] text-[#05050a] text-xs font-bold transition flex items-center gap-1 hover:brightness-110 shadow-[0_0_8px_rgba(212,175,55,0.25)]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>在星盘中寻访</span>
                  </button>
                </div>

                {/* Poem 《步天歌》 */}
                <div className="p-4 rounded bg-[#0a0a0f] border border-[#3d2b1f]">
                  <div className="text-xs text-[#d4af37] font-semibold mb-1">
                    【步天歌诀】
                  </div>
                  <p className="italic text-base text-[#d4af37] leading-relaxed">
                    “{selectedCodexConstellation.song}”
                  </p>
                </div>

                {/* Lore */}
                <div className="space-y-1 text-sm text-[#c4b59d] leading-relaxed">
                  <div className="text-xs text-[#d4af37] font-semibold">
                    【古经占候释意】
                  </div>
                  <p>{selectedCodexConstellation.lore}</p>
                </div>

                {/* Star components */}
                <div className="space-y-2 pt-2 border-t border-[#3d2b1f]">
                  <div className="text-xs text-[#8a7a5f] font-semibold">
                    【包含古星（甘石巫咸三家）】
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCodexConstellation.stars.map((s) => (
                      <span
                        key={s.id}
                        className="px-2.5 py-1 rounded bg-[#0a0a0f] border border-[#3d2b1f] text-xs flex items-center gap-1.5"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            s.school === 'shi'
                              ? 'bg-[#e2533d]'
                              : s.school === 'gan'
                              ? 'bg-[#666]'
                              : 'bg-[#d4af37]'
                          }`}
                        />
                        <span className="text-[#c4b59d]">{s.name}</span>
                        <span className="text-[10px] text-[#8a7a5f]">
                          ({s.school === 'shi' ? '石氏' : s.school === 'gan' ? '甘氏' : '巫咸'})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lore' && (
            <div className="space-y-6 text-sm leading-relaxed text-[#c4b59d]">
              <div className="p-5 rounded panel-silk border border-[#3d2b1f] space-y-3">
                <h3 className="text-base font-semibold text-[#d4af37] flex items-center gap-2">
                  <Scroll className="w-5 h-5 text-[#d4af37]" />
                  <span>李淳风《乙巳占》与唐代星占哲学</span>
                </h3>
                <p>
                  唐代太史令李淳风所撰《乙巳占》，集先秦汉魏天文星占之大成。古人以为“天道远，人事迩”，天象与王朝政治息息相关：
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded bg-[#0a0a0f] border border-[#3d2b1f]">
                    <div className="font-semibold text-[#e2533d] mb-1">
                      ● 荧惑（火星）与兵丧
                    </div>
                    <p className="text-xs text-[#8a7a5f]">
                      荧惑出没无常，主礼乐崩坏、兵革乱起与宰相死丧。尤以“荧惑守心”最为凶险，心宿二为天王大火，二火相逢天下大动。
                    </p>
                  </div>
                  <div className="p-3.5 rounded bg-[#0a0a0f] border border-[#3d2b1f]">
                    <div className="font-semibold text-[#d4af37] mb-1">
                      ● 太白（金星）昼见与女主
                    </div>
                    <p className="text-xs text-[#8a7a5f]">
                      金星太白至阴也，昼见于天乃“阴乘阳之位”。初唐李淳风曾以此占武后专权，虽险恶万端，然王者崇仁即可弭灾。
                    </p>
                  </div>
                  <div className="p-3.5 rounded bg-[#0a0a0f] border border-[#3d2b1f]">
                    <div className="font-semibold text-[#6ee7b7] mb-1">
                      ● 客星与彗孛（蚩尤旗）
                    </div>
                    <p className="text-xs text-[#8a7a5f]">
                      客星为新星之现，或吉或凶；彗星长星如旗如矛者，主四夷寇边或宗室逆叛。
                    </p>
                  </div>
                  <div className="p-3.5 rounded bg-[#0a0a0f] border border-[#3d2b1f]">
                    <div className="font-semibold text-[#c084fc] mb-1">
                      ● 日食合朔与救日之仪
                    </div>
                    <p className="text-xs text-[#8a7a5f]">
                      正午日食为天地失德之戒。唐代司天监需于数月前精确步算交食时刻分秒，差之毫厘，即受大辟重罪。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded panel-silk border border-[#3d2b1f] space-y-2">
                <h3 className="text-base font-semibold text-[#d4af37]">
                  司天监处世之四道：
                </h3>
                <p className="text-xs text-[#8a7a5f] leading-relaxed">
                  1. <strong className="text-[#f87171]">直言极谏</strong>：为苍生请命，虽逆鳞而名垂青史；
                  <br />
                  2. <strong className="text-[#d4af37]">附会祥瑞</strong>：得天子欢心，享高官厚禄，然天祸积久必溃；
                  <br />
                  3. <strong className="text-[#c084fc]">借星言政</strong>：卷入党争倾轧，以天言人事，游走于刀尖之上；
                  <br />
                  4. <strong className="text-[#6ee7b7]">潜行禳解</strong>：避人耳目，实务备灾，不求功名但求无愧。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6 text-sm leading-relaxed text-[#c4b59d]">
              <div className="p-5 rounded panel-silk border border-[#3d2b1f] space-y-3">
                <h3 className="text-base font-semibold text-[#d4af37] flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#d4af37]" />
                  <span>关于《敦煌星图》（藏经洞 S.3326 遗卷）</span>
                </h3>
                <p>
                  《敦煌星图》于1900年发现于甘肃敦煌莫高窟藏经洞（卷号
                  S.3326，现藏于大英图书馆），是世界上现存最古老、星数最多且绘制精绝的科学星图写本！
                </p>
                <div className="p-4 rounded bg-[#0a0a0f] border border-[#3d2b1f] space-y-2 text-xs text-[#8a7a5f]">
                  <p>
                    ● <strong>十二幅横卷展开图与一幅极区圆盘图</strong>：全卷长约4米，绘有1,350多颗恒星、257个星官，采用近代麦卡托圆柱投影法的雏形来绘制赤道带星宿！
                  </p>
                  <p>
                    ● <strong>甘、石、巫咸三家星经的颜色传承</strong>：中国古代天文学有石申、甘德、巫咸三大家。敦煌星图继承了三家星官绘制体系，以不同色泽（赤、墨、黄）区分渊源。
                  </p>
                  <p>
                    ● <strong>唐代司天监（太史局）</strong>：掌管天下天文历算，官署内有水运浑天仪、灵台观象台、漏刻博士、保章正、灵台郎等，是中国古代科技文明与皇权统治最核心的纽带之一。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#05050a] border-t border-[#3d2b1f] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded border border-[#3d2b1f] hover:border-[#d4af37] text-[#8a7a5f] hover:text-[#d4af37] text-xs transition"
          >
            合卷归匣
          </button>
        </div>
      </div>
    </div>
  );
};
