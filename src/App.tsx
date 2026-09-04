import React, { useState, useEffect } from 'react';
import {
  EmpireState,
  OfficialRank,
  AstrologicalAnomaly,
  MemorialOption,
  ChronicleLog,
  Constellation,
  CampaignId,
  UnlockedEndingRecord,
  EndingDefinition,
} from './types/game';
import { DUNHUANG_CONSTELLATIONS, OFFICIAL_RANKS } from './data/dunhuangConstellations';
import { ASTROLOGY_EVENTS } from './data/astrologyEvents';
import { CAMPAIGNS } from './data/campaigns';
import { evaluateEnding } from './data/endings';
import { StatusHeader } from './components/StatusHeader';
import { StarSkyCanvas } from './components/StarSkyCanvas';
import { MemorialModal } from './components/MemorialModal';
import { DecreeModal } from './components/DecreeModal';
import { ConstellationCodex } from './components/ConstellationCodex';
import { IdeasDiscussionModal } from './components/IdeasDiscussionModal';
import { ChronicleModal } from './components/ChronicleModal';
import { GameIntroModal } from './components/GameIntroModal';
import { EndingModal } from './components/EndingModal';
import { EndingGalleryModal } from './components/EndingGalleryModal';
import { CampaignSelectorModal } from './components/CampaignSelectorModal';
import { Sparkles, Scroll, BookOpen, Compass, Lightbulb, AlertCircle, Trophy, Milestone } from 'lucide-react';

export default function App() {
  // Campaign & Dynasty Era
  const [currentCampaignId, setCurrentCampaignId] = useState<CampaignId>('zhenguan');

  // Game States
  const [empireState, setEmpireState] = useState<EmpireState>({
    imperialFavor: 65,
    stateStability: 65,
    peopleWelfare: 60,
    prestige: 45,
  });

  const [currentRank, setCurrentRank] = useState<OfficialRank>(OFFICIAL_RANKS[2]); // 保章正
  const [eventIndex, setEventIndex] = useState<number>(0);
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation | null>(
    DUNHUANG_CONSTELLATIONS[1] // 心宿
  );
  const [chosenOption, setChosenOption] = useState<MemorialOption | null>(null);
  const [promotedRank, setPromotedRank] = useState<OfficialRank | null>(null);
  const [isPromoted, setIsPromoted] = useState<boolean>(false);
  const [chronicleLogs, setChronicleLogs] = useState<ChronicleLog[]>([]);

  // Endings
  const [currentEnding, setCurrentEnding] = useState<EndingDefinition | null>(null);
  const [unlockedRecords, setUnlockedRecords] = useState<UnlockedEndingRecord[]>([]);

  // Modals
  const [introModalOpen, setIntroModalOpen] = useState<boolean>(true);
  const [memorialModalOpen, setMemorialModalOpen] = useState<boolean>(false);
  const [decreeModalOpen, setDecreeModalOpen] = useState<boolean>(false);
  const [codexModalOpen, setCodexModalOpen] = useState<boolean>(false);
  const [ideasModalOpen, setIdeasModalOpen] = useState<boolean>(false);
  const [chronicleModalOpen, setChronicleModalOpen] = useState<boolean>(false);
  const [endingModalOpen, setEndingModalOpen] = useState<boolean>(false);
  const [campaignSelectModalOpen, setCampaignSelectModalOpen] = useState<boolean>(false);
  const [endingGalleryModalOpen, setEndingGalleryModalOpen] = useState<boolean>(false);

  // Load unlocked endings from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('tang_astrology_unlocked_endings');
      if (raw) {
        setUnlockedRecords(JSON.parse(raw));
      }
    } catch (e) {
      console.error('Failed to load endings:', e);
    }
  }, []);

  // Save unlocked ending to localStorage
  const saveEndingRecord = (ending: EndingDefinition, finalState: EmpireState) => {
    try {
      const newRecord: UnlockedEndingRecord = {
        endingId: ending.id,
        unlockedAt: new Date().toLocaleDateString('zh-CN'),
        campaignId: currentCampaignId,
        finalRank: currentRank.title,
        finalStats: finalState,
      };

      setUnlockedRecords((prev) => {
        const filtered = prev.filter((r) => r.endingId !== ending.id);
        const updated = [newRecord, ...filtered];
        localStorage.setItem('tang_astrology_unlocked_endings', JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error('Failed to save ending:', e);
    }
  };

  const currentCampaign = CAMPAIGNS.find((c) => c.id === currentCampaignId) || CAMPAIGNS[0];
  const campaignEvents = ASTROLOGY_EVENTS.filter((e) => e.campaignId === currentCampaignId);
  const currentAnomaly: AstrologicalAnomaly =
    campaignEvents[eventIndex % campaignEvents.length] || campaignEvents[0];

  // Auto-select host constellation when anomaly changes
  useEffect(() => {
    if (!currentAnomaly) return;
    const host = DUNHUANG_CONSTELLATIONS.find((c) => c.id === currentAnomaly.constellationId);
    if (host) {
      setSelectedConstellation(host);
    }
  }, [currentAnomaly?.id]);

  // Handle Submitting Memorial
  const handleSubmitMemorial = (option: MemorialOption) => {
    setChosenOption(option);
    setMemorialModalOpen(false);

    // Calculate new stats
    const newFavor = Math.max(0, Math.min(100, empireState.imperialFavor + option.effects.imperialFavor));
    const newStability = Math.max(0, Math.min(100, empireState.stateStability + option.effects.stateStability));
    const newWelfare = Math.max(0, Math.min(100, empireState.peopleWelfare + option.effects.peopleWelfare));
    const newPrestige = Math.max(0, Math.min(120, empireState.prestige + option.effects.prestige));

    const updatedState: EmpireState = {
      imperialFavor: newFavor,
      stateStability: newStability,
      peopleWelfare: newWelfare,
      prestige: newPrestige,
    };
    setEmpireState(updatedState);

    // Check rank promotion based on prestige
    let highestEligibleRank = OFFICIAL_RANKS[0];
    for (const rank of OFFICIAL_RANKS) {
      if (newPrestige >= rank.minPrestige) {
        highestEligibleRank = rank;
      }
    }

    if (highestEligibleRank.minPrestige > currentRank.minPrestige) {
      setPromotedRank(highestEligibleRank);
      setCurrentRank(highestEligibleRank);
      setIsPromoted(true);
    } else {
      setIsPromoted(false);
      setPromotedRank(null);
    }

    // Add to Chronicle Logs
    const newLog: ChronicleLog = {
      id: `log-${Date.now()}`,
      yearName: currentAnomaly.yearName,
      anomalyName: currentAnomaly.anomalyName,
      chosenStance: option.label,
      choiceSummary: option.summary,
      decreeResult: option.emperorDecree.decreeText,
      statusChanges: option.effects,
    };
    setChronicleLogs((prev) => [newLog, ...prev]);

    // Open Decree Modal
    setDecreeModalOpen(true);
  };

  // Trigger Ending & Epilogue
  const triggerEnding = (stateToEvaluate = empireState) => {
    const ending = evaluateEnding(stateToEvaluate, currentCampaignId, currentRank.title);
    setCurrentEnding(ending);
    saveEndingRecord(ending, stateToEvaluate);
    setDecreeModalOpen(false);
    setEndingModalOpen(true);
  };

  // Continue after emperor decree
  const handleContinueAfterDecree = () => {
    setDecreeModalOpen(false);

    // Critical crisis checks
    if (empireState.imperialFavor <= 0 || empireState.stateStability <= 0 || empireState.peopleWelfare <= 0) {
      triggerEnding(empireState);
      return;
    }

    // Check if campaign events sequence is completed
    if (eventIndex >= campaignEvents.length - 1) {
      triggerEnding(empireState);
      return;
    }

    // Advance to next event in this campaign
    setEventIndex((prev) => prev + 1);
  };

  // Switch Campaign
  const handleSelectCampaign = (id: CampaignId) => {
    setCurrentCampaignId(id);
    setEmpireState({
      imperialFavor: 65,
      stateStability: 65,
      peopleWelfare: 60,
      prestige: 45,
    });
    setCurrentRank(OFFICIAL_RANKS[2]);
    setEventIndex(0);
    setChronicleLogs([]);
    setCampaignSelectModalOpen(false);
    setEndingModalOpen(false);
  };

  // Reset current campaign
  const handleResetCurrentGame = () => {
    setEmpireState({
      imperialFavor: 65,
      stateStability: 65,
      peopleWelfare: 60,
      prestige: 45,
    });
    setCurrentRank(OFFICIAL_RANKS[2]);
    setEventIndex(0);
    setChronicleLogs([]);
    setEndingModalOpen(false);
    setIntroModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-[#d4af37] flex flex-col chinese-font">
      {/* Top Directorate of Astronomy Status & Imperial Metrics */}
      <StatusHeader
        empireState={empireState}
        currentRank={currentRank}
        campaign={currentCampaign}
        yearName={currentAnomaly.yearName}
        season={currentAnomaly.season}
        unlockedEndingsCount={unlockedRecords.length}
        onOpenCodex={() => setCodexModalOpen(true)}
        onOpenIdeas={() => setIdeasModalOpen(true)}
        onOpenChronicle={() => setChronicleModalOpen(true)}
        onOpenCampaignSelect={() => setCampaignSelectModalOpen(true)}
        onOpenEndingGallery={() => setEndingGalleryModalOpen(true)}
        onResetGame={handleResetCurrentGame}
      />

      {/* Main Celestial Observation & Affairs Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-4">
        {/* Interactive Dunhuang Star Sky Canvas */}
        <StarSkyCanvas
          constellations={DUNHUANG_CONSTELLATIONS}
          currentAnomaly={currentAnomaly}
          selectedConstellation={selectedConstellation}
          onSelectConstellation={(c) => setSelectedConstellation(c)}
          onFocusAnomaly={() => {
            const host = DUNHUANG_CONSTELLATIONS.find(
              (c) => c.id === currentAnomaly.constellationId
            );
            if (host) setSelectedConstellation(host);
          }}
          onInspectDone={() => setMemorialModalOpen(true)}
        />

        {/* Directorate Bureau Dashboard & Astrological Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Column 1: Active Anomaly Briefing & Memorial Trigger */}
          <div className="lg:col-span-2 p-5 sm:p-6 rounded panel-silk border border-[#3d2b1f] flex flex-col justify-between space-y-4 shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-[#3d2b1f] pb-3 mb-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37]">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>【{currentCampaign.title} · 灵台子夜急务】</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#0a0a0f] text-[#d4af37] border border-[#3d2b1f] flex items-center gap-1">
                    <Milestone className="w-3 h-3 text-[#d4af37]" />
                    <span>剧幕进度：第 {eventIndex + 1} / {campaignEvents.length} 幕</span>
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#0a0a0f] text-[#c4b59d] border border-[#3d2b1f]">
                    {currentAnomaly.yearName}
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                {currentAnomaly.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#c4b59d] leading-relaxed mb-3">
                {currentAnomaly.description}
              </p>

              {/* Classical Quote Strip */}
              <div className="p-3 rounded bg-[#0a0a0f] border-l-2 border-[#d4af37] text-xs italic text-[#8a7a5f]">
                {currentAnomaly.ancientTextQuote}
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#3d2b1f]">
              <div className="text-xs text-[#8a7a5f] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#d4af37]" />
                <span>此折关乎天子圣眷与天下社稷安危，落笔需审慎。</span>
              </div>

              <div className="flex items-center gap-2">
                {eventIndex > 0 && (
                  <button
                    onClick={() => triggerEnding(empireState)}
                    title="以当前仕途政绩提前告老，结算生平结局"
                    className="px-3 py-2 rounded border border-[#3d2b1f] hover:border-[#d4af37] text-xs text-[#8a7a5f] hover:text-[#d4af37] transition flex items-center gap-1"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>提前结算归宿</span>
                  </button>
                )}

                <button
                  onClick={() => setMemorialModalOpen(true)}
                  className="px-6 py-2.5 bg-[#d4af37] text-[#05050a] font-bold text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] rounded flex items-center justify-center gap-2"
                >
                  <Scroll className="w-4 h-4 text-[#05050a]" />
                  <span>拟草密奏 · 进呈御览</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Constellation Navigation & Lore Guide */}
          <div className="p-5 sm:p-6 rounded panel-silk border border-[#3d2b1f] flex flex-col justify-between space-y-3 shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37]">
                  <Compass className="w-4 h-4 text-[#d4af37]" />
                  <span>【敦煌长卷星官谱系】</span>
                </div>
                <button
                  onClick={() => setCodexModalOpen(true)}
                  className="text-[11px] text-[#8a7a5f] hover:text-[#d4af37] underline flex items-center gap-1 transition"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>翻阅全册</span>
                </button>
              </div>

              {/* Fast selector chips for constellations */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {DUNHUANG_CONSTELLATIONS.map((c) => {
                  const isCurrent = selectedConstellation?.id === c.id;
                  const hasAnomaly = currentAnomaly.constellationId === c.id;

                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedConstellation(c)}
                      className={`p-2 rounded text-left transition flex items-center justify-between border ${
                        isCurrent
                          ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#d4af37] font-semibold shadow-[0_0_8px_rgba(212,175,55,0.2)]'
                          : 'bg-[#0a0a0f] border-[#3d2b1f] text-[#8a7a5f] hover:border-[#d4af37] hover:text-[#c4b59d]'
                      }`}
                    >
                      <span className="truncate">{c.name.split('·')[0]}</span>
                      {hasAnomaly && (
                        <span className="w-2 h-2 rounded-full bg-[#e2533d] shadow-[0_0_6px_#e2533d] animate-pulse shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ideas Discussion Promo Card */}
            <div
              onClick={() => setIdeasModalOpen(true)}
              className="cursor-pointer p-3 rounded border border-[#3d2b1f] bg-[#0a0a0f] hover:border-[#d4af37] transition flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Lightbulb className="w-4 h-4 text-[#d4af37]" />
                <div>
                  <div className="font-semibold text-[#d4af37]">
                    探讨更多好想法？
                  </div>
                  <div className="text-[11px] text-[#8a7a5f]">
                    点击查看框架梳理与进阶创意
                  </div>
                </div>
              </div>
              <span className="text-[#d4af37] font-bold">查看 ➔</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#0a0a0f] border-t border-[#3d2b1f] py-4 text-center text-xs text-[#8a7a5f]">
        大唐司天台 · 敦煌莫高窟藏经洞遗卷 S.3326 星图摹本研制 · {currentCampaign.title}
      </footer>

      {/* Modals */}
      <MemorialModal
        anomaly={currentAnomaly}
        isOpen={memorialModalOpen}
        onClose={() => setMemorialModalOpen(false)}
        onSubmitMemorial={handleSubmitMemorial}
      />

      <DecreeModal
        isOpen={decreeModalOpen}
        chosenOption={chosenOption}
        currentRank={currentRank}
        newRank={promotedRank}
        isPromoted={isPromoted}
        onContinue={handleContinueAfterDecree}
      />

      <ConstellationCodex
        isOpen={codexModalOpen}
        onClose={() => setCodexModalOpen(false)}
        constellations={DUNHUANG_CONSTELLATIONS}
        onSelectConstellationFromCodex={(c) => setSelectedConstellation(c)}
      />

      <IdeasDiscussionModal
        isOpen={ideasModalOpen}
        onClose={() => setIdeasModalOpen(false)}
      />

      <ChronicleModal
        isOpen={chronicleModalOpen}
        onClose={() => setChronicleModalOpen(false)}
        logs={chronicleLogs}
      />

      <GameIntroModal
        isOpen={introModalOpen}
        onStart={() => setIntroModalOpen(false)}
        selectedCampaignId={currentCampaignId}
        onSelectCampaign={(id) => setCurrentCampaignId(id)}
      />

      <CampaignSelectorModal
        isOpen={campaignSelectModalOpen}
        onClose={() => setCampaignSelectModalOpen(false)}
        currentCampaignId={currentCampaignId}
        onSelectCampaign={handleSelectCampaign}
      />

      <EndingModal
        isOpen={endingModalOpen}
        ending={currentEnding}
        campaign={currentCampaign}
        finalRank={currentRank}
        finalState={empireState}
        onRestartCurrentCampaign={handleResetCurrentGame}
        onOpenCampaignSelect={() => {
          setEndingModalOpen(false);
          setCampaignSelectModalOpen(true);
        }}
        onOpenGallery={() => setEndingGalleryModalOpen(true)}
      />

      <EndingGalleryModal
        isOpen={endingGalleryModalOpen}
        onClose={() => setEndingGalleryModalOpen(false)}
        unlockedRecords={unlockedRecords}
      />
    </div>
  );
}
