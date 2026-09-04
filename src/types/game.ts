export type CampaignId = 'zhenguan' | 'kaiyuan';

export interface CampaignInfo {
  id: CampaignId;
  title: string;
  period: string;
  subtitle: string;
  emperor: string;
  director: string;
  intro: string;
  focus: string;
  badge: string;
}

export interface EndingDefinition {
  id: string;
  title: string;
  honorific: string;
  category: 'legend' | 'loyalist' | 'hermit' | 'exile' | 'villain' | 'martyr' | 'paragon' | 'commoner';
  summary: string;
  poem: string;
  historicalLegacy: string;
  verdict: string;
  recommendedCampaign?: CampaignId;
  conditionHint: string;
}

export interface UnlockedEndingRecord {
  endingId: string;
  unlockedAt: string;
  campaignId: CampaignId;
  finalRank: string;
  finalStats: EmpireState;
}

export type OfficialRank = {
  title: string;
  grade: string;
  desc: string;
  minPrestige: number;
};

export type EmpireState = {
  // 圣眷 (0-100): 皇帝信赖程度。过低会被贬官黜退，过高更容易获恩赐。
  imperialFavor: number;
  // 国势 (0-100): 边防稳定与朝廷稳固。过低会爆发叛乱或倾覆。
  stateStability: number;
  // 民生 (0-100): 黎庶生息与灾害抵御。过低天下民不聊生。
  peopleWelfare: number;
  // 清望 (0-100): 术数造诣与士林声望。决定官职晋升。
  prestige: number;
};

export interface ConstellationStar {
  id: string;
  name: string;
  // Ancient school: Shi (red), Gan (black), Wu Xian (yellow/white)
  school: 'shi' | 'gan' | 'wuxian';
  magnitude: number; // 1 to 5 brightness
  x: number; // 0 to 1000 coordinate on chart
  y: number; // 0 to 500 coordinate on chart
}

export interface Constellation {
  id: string;
  name: string;
  direction: 'north' | 'east' | 'west' | 'south' | 'center'; // 四象与中官三垣
  division: string; // e.g. "紫微垣", "东方苍龙", "北方玄武"
  stars: ConstellationStar[];
  lines: [string, string][]; // Pairs of star IDs to connect
  centerCoord: { x: number; y: number };
  song: string; // 步天歌咏诀
  lore: string; // 星官释意与占候要诀
}

export interface AstrologicalAnomaly {
  id: string;
  campaignId: CampaignId;
  title: string;
  yearName: string; // 年号，如 "开元三年 孟秋"
  season: string;
  constellationId: string;
  targetStarId?: string;
  anomalyType: 'planet' | 'comet' | 'eclipse' | 'nova' | 'color_change' | 'occultation';
  anomalyName: string; // e.g. "荧惑犯心", "客星入紫微", "太白经天"
  description: string;
  historicalContext: string; // 历史背景
  ancientTextQuote: string; // 《开元占经》或《乙巳占》古籍记载
  targetCoords: { x: number; y: number }; // Target coordinates to spot
  options: MemorialOption[];
}

export interface MemorialOption {
  id: string;
  label: string; // e.g. "直陈天变，乞请修德弭兵"
  stance: 'direct_remonstrance' | 'flatter_omen' | 'court_intrigue' | 'secret_ritual';
  summary: string;
  memorialDraft: string; // 呈递给唐皇的文言奏折原文
  expectedRisk: string; // 风险提示
  effects: {
    imperialFavor: number;
    stateStability: number;
    peopleWelfare: number;
    prestige: number;
  };
  emperorDecree: {
    reactionTitle: string;
    decreeText: string;
    historicalOutcome: string;
  };
}

export interface ChronicleLog {
  id: string;
  yearName: string;
  anomalyName: string;
  chosenStance: string;
  choiceSummary: string;
  decreeResult: string;
  statusChanges: {
    imperialFavor: number;
    stateStability: number;
    peopleWelfare: number;
    prestige: number;
  };
}
