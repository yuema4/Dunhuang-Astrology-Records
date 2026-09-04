import { EndingDefinition, EmpireState, CampaignId } from '../types/game';

export const ENDING_DEFINITIONS: EndingDefinition[] = [
  {
    id: 'ending_grand_master',
    title: '一代天师 · 盛唐国师',
    honorific: '【一代天师 · 盛唐国师】',
    category: 'legend',
    summary: '术精天人，名重两京。天子拜为国师，主修《太常星历志》与敦煌金匮玉策，千秋万代视作历算宗师。',
    poem: '灵台夜定星河局，御札亲批第一人。万卷推步存正道，千秋日月照元真。',
    historicalLegacy: '名列《大唐天文史官传》首位，配享太庙，其所注《步天歌》与星图被司天监奉为后世圭臬。',
    verdict: '极高之清望与圣眷，德术兼备，功名不朽。',
    conditionHint: '清望 ≥ 80 且 圣眷 ≥ 70，国势稳固',
  },
  {
    id: 'ending_restoration_hero',
    title: '大唐中兴 · 定策元勋',
    honorific: '【大唐中兴 · 定策元勋】',
    category: 'loyalist',
    summary: '早在狂澜未发之时，以星象精准预警北疆兵变，促成固守潼关，密调两淮义仓。大难临头之际，成大唐中兴第一定策元勋！',
    poem: '狂风未起算惊澜，九鼎安危系此端。早筑重关防虎骑，中兴元辅照河峦。',
    historicalLegacy: '平叛大将赞叹：若非司天监早定边防关防，两京倾覆在反掌之间。诏赠司空，图形凌烟阁。',
    verdict: '心系社稷，力挽狂澜于既倒，一代柱石。',
    recommendedCampaign: 'kaiyuan',
    conditionHint: '国势 ≥ 75 且 民生 ≥ 70，直面危机保全边防',
  },
  {
    id: 'ending_zhongnan_hermit',
    title: '归隐终南 · 仙逸高士',
    honorific: '【归隐终南 · 仙逸高士】',
    category: 'hermit',
    summary: '见微知著，勘破红尘名利。在乱世将发或盛极之时，怀抱敦煌星经残卷隐入终南山紫阁峰，成为山中传说的得道仙翁。',
    poem: '拂衣谢却紫宸恩，采药终南卧白云。莫问人间兴废事，星图一卷度残春。',
    historicalLegacy: '后人每于云雾之中闻有隐士弹琴诵《步天歌》，寻之不见，唯见绝壁留有三家古星刻痕。',
    verdict: '不慕荣华，独善其身，超然象外。',
    conditionHint: '清望 ≥ 70 且 民生 ≥ 60，未贪恋权柄',
  },
  {
    id: 'ending_lingnan_exile',
    title: '贬谪岭南 · 诗酒孤老',
    honorific: '【贬谪岭南 · 诗酒孤老】',
    category: 'exile',
    summary: '秉节持重，屡因抗言直谏触怒天颜，为奸佞排挤贬斥万里之外的岭南潮州。身处蛮荒瘴疠，却与山民授历兴学，诗酒自适。',
    poem: '一封朝奏九重天，夕贬潮州路八千。海角虽穷心未老，蛮荒星夜谱新篇。',
    historicalLegacy: '岭南百姓立“观星祠”岁时祭祀，其在贬所写就的《南海星经》与诗篇传诵四海，青史长记其孤直。',
    verdict: '不阿世媚俗，宁鸣而死，不默而生。',
    conditionHint: '圣眷 ≤ 25，抗言直谏触忤天颜，但清望卓然',
  },
  {
    id: 'ending_court_villain',
    title: '佞臣弄权 · 窃国太师',
    honorific: '【佞臣弄权 · 窃国太师】',
    category: 'villain',
    summary: '阿谀逢迎，日日粉饰祥瑞，诱使君王沉溺欢宴。虽官居一品、黄金万两，然大祸临头天下分崩离析，沦为万古唾骂的奸佞之徒。',
    poem: '甘言媚主邀恩宠，祸积朝堂覆九霄。金玉满堂终作土，千秋青史骂名雕。',
    historicalLegacy: '被后晋《旧唐书》与宋《新唐书》列入《佞幸传》，评曰：“以天道媚人主，祸延天下，虽诛九族莫赎其罪。”',
    verdict: '一任私欲，罔顾苍生，身败名裂。',
    conditionHint: '圣眷 ≥ 85 且 国势 ≤ 35 或 民生 ≤ 35（多选附会祥瑞）',
  },
  {
    id: 'ending_loyal_martyr',
    title: '青史忠烈 · 喋血灵台',
    honorific: '【青史忠烈 · 喋血灵台】',
    category: 'martyr',
    summary: '叛军铁蹄陷两京，百官溃散奔逃。你独坐司天台顶，手抱敦煌星图与浑天仪抱节不降，痛斥胡虏贼寇，喋血阶前！',
    poem: '胡骑森森犯阙来，文武星散失灵台。血溅浑仪魂不灭，青史长留浩气哀。',
    historicalLegacy: '后继肃宗朝追赠司天大监，谥“忠烈”，立忠臣碑于灵台遗址，历代仰止。',
    verdict: '大义凛然，临难毋苟免，千秋浩气长存。',
    conditionHint: '国势崩颓（国势 ≤ 35）但清望 ≥ 60，坚守气节',
  },
  {
    id: 'ending_flawless_statesman',
    title: '盛世完人 · 功成身退',
    honorific: '【盛世完人 · 功成身退】',
    category: 'paragon',
    summary: '中庸中正，行事严谨周密。内抚君心，外安士民。历仕多年未尝有失，官居三品司天监正，致仕归乡，福寿双全。',
    poem: '辅国从容伴帝王，退思堂下水流长。优游岁月琴书伴，两袖清风晚节香。',
    historicalLegacy: '朝廷赐紫金鱼袋与御制诗，誉为“盛世完人”，门生故吏遍布两京。',
    verdict: '进退有度，方圆自如，盛世文臣楷模。',
    conditionHint: '四维平衡发展（各项数值均在 55-80 之间）',
  },
  {
    id: 'ending_street_diviner',
    title: '市井神算 · 莫测异人',
    honorific: '【市井神算 · 莫测异人】',
    category: 'commoner',
    summary: '辞去微官，披发佯狂，混迹于长安西市胡商酒肆之间。以一块罗盘一柄龟甲为行人断吉凶，言出必验，逍遥自在。',
    poem: '换却朱衣作布衣，长安市肆测天机。金银散尽壶中酒，笑看王侯几度飞。',
    historicalLegacy: '李白、杜甫曾有诗写“西市有奇客，落魄观斗柄”，坊间传为一段奇闻传说。',
    verdict: '逍遥市井，游戏人间，不为名利所累。',
    conditionHint: '清望或圣眷不足，遁入民间卜卦逍遥',
  },
];

/**
 * Evaluates the player's final ending based on empire state, rank, and choice history
 */
export function evaluateEnding(
  state: EmpireState,
  campaignId: CampaignId,
  rankTitle: string
): EndingDefinition {
  // 1. Villain check: very high imperial favor while state or people collapsed
  if (state.imperialFavor >= 80 && (state.stateStability <= 35 || state.peopleWelfare <= 35)) {
    return ENDING_DEFINITIONS.find((e) => e.id === 'ending_court_villain')!;
  }

  // 2. Martyr check: state collapsed while high prestige
  if (state.stateStability <= 35 && state.prestige >= 55) {
    return ENDING_DEFINITIONS.find((e) => e.id === 'ending_loyal_martyr')!;
  }

  // 3. Exile check: low imperial favor while decent prestige/welfare
  if (state.imperialFavor <= 25 && (state.prestige >= 50 || state.peopleWelfare >= 45)) {
    return ENDING_DEFINITIONS.find((e) => e.id === 'ending_lingnan_exile')!;
  }

  // 4. Restoration Hero: specifically excels in state stability and welfare
  if (state.stateStability >= 75 && state.peopleWelfare >= 70) {
    return ENDING_DEFINITIONS.find((e) => e.id === 'ending_restoration_hero')!;
  }

  // 5. Grand Master: high prestige & high favor & high rank
  if (state.prestige >= 80 && state.imperialFavor >= 65 && state.stateStability >= 50) {
    return ENDING_DEFINITIONS.find((e) => e.id === 'ending_grand_master')!;
  }

  // 6. Zhongnan Hermit: high prestige, good welfare, doesn't need high favor
  if (state.prestige >= 70 && state.peopleWelfare >= 60) {
    return ENDING_DEFINITIONS.find((e) => e.id === 'ending_zhongnan_hermit')!;
  }

  // 7. Flawless Statesman: balanced stats
  if (
    state.imperialFavor >= 50 &&
    state.stateStability >= 50 &&
    state.peopleWelfare >= 50 &&
    state.prestige >= 50
  ) {
    return ENDING_DEFINITIONS.find((e) => e.id === 'ending_flawless_statesman')!;
  }

  // Default: Street Diviner
  return ENDING_DEFINITIONS.find((e) => e.id === 'ending_street_diviner')!;
}
