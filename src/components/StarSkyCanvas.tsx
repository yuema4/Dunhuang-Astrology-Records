import React, { useState, useRef, useEffect } from 'react';
import { Constellation, AstrologicalAnomaly } from '../types/game';
import { Compass, ZoomIn, ZoomOut, RotateCcw, Sparkles, Scroll, Eye } from 'lucide-react';

interface StarSkyCanvasProps {
  constellations: Constellation[];
  currentAnomaly: AstrologicalAnomaly | null;
  selectedConstellation: Constellation | null;
  onSelectConstellation: (c: Constellation) => void;
  onFocusAnomaly: () => void;
  onInspectDone?: () => void;
}

export const StarSkyCanvas: React.FC<StarSkyCanvasProps> = ({
  constellations,
  currentAnomaly,
  selectedConstellation,
  onSelectConstellation,
  onFocusAnomaly,
  onInspectDone,
}) => {
  const [viewMode, setViewMode] = useState<'scroll' | 'sphere'>('scroll');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [anomalyLocated, setAnomalyLocated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // When current anomaly changes, reset search state
  useEffect(() => {
    setAnomalyLocated(false);
  }, [currentAnomaly?.id]);

  // Center on current anomaly when requested
  const handleJumpToAnomaly = () => {
    if (!currentAnomaly) return;
    const target = currentAnomaly.targetCoords;
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setZoom(1.4);
      setOffset({
        x: clientWidth / 2 - target.x * 1.4,
        y: clientHeight / 2 - target.y * 1.4,
      });
      setAnomalyLocated(true);
      onFocusAnomaly();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // Find star details
  const getStarColor = (school: 'shi' | 'gan' | 'wuxian') => {
    switch (school) {
      case 'shi':
        return '#c83c23'; // 石氏赤星 (Vermilion cinnabar)
      case 'gan':
        return '#262422'; // 甘氏墨星 (Deep ink with halo)
      case 'wuxian':
        return '#d4a359'; // 巫咸黄星 (Ochre gold)
    }
  };

  return (
    <div
      id="dunhuang-star-canvas-container"
      className="relative w-full h-[520px] rounded-xl overflow-hidden select-none border-2 border-[#3d2b1f] star-map flex flex-col shadow-2xl chinese-font"
    >
      {/* Ancient Silk Texture & Radial Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#05050a]/70 via-transparent to-[#05050a]/85" />

      {/* Top Controls Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#0a0a0f] border-b border-[#3d2b1f] text-xs text-[#c4b59d]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-serif text-sm font-semibold text-[#d4af37]">
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span className="tracking-wide">司天监灵台 · 敦煌写本星图 S.3326 观星台</span>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-[#121212] text-[#8a7a5f] border border-[#3d2b1f]">
            古制三家星官：<span className="text-[#e2533d]">● 石氏(赤)</span>{' '}
            <span className="text-[#a89d8b]">● 甘氏(墨)</span>{' '}
            <span className="text-[#d4af37]">● 巫咸(金黄)</span>
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          {/* Mode Switch */}
          <div className="flex items-center rounded bg-[#121212] p-0.5 border border-[#3d2b1f]">
            <button
              onClick={() => setViewMode('scroll')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                viewMode === 'scroll'
                  ? 'bg-[#d4af37] text-[#05050a] font-bold shadow'
                  : 'text-[#8a7a5f] hover:text-[#d4af37]'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>长卷展开</span>
            </button>
            <button
              onClick={() => setViewMode('sphere')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                viewMode === 'sphere'
                  ? 'bg-[#d4af37] text-[#05050a] font-bold shadow'
                  : 'text-[#8a7a5f] hover:text-[#d4af37]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>浑仪圆盘</span>
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
              title="放大浑仪视距"
              className="p-1.5 rounded bg-[#121212] hover:bg-[#d4af37]/10 border border-[#3d2b1f] text-[#c4b59d] hover:text-[#d4af37] transition"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.2))}
              title="缩小视距"
              className="p-1.5 rounded bg-[#121212] hover:bg-[#d4af37]/10 border border-[#3d2b1f] text-[#c4b59d] hover:text-[#d4af37] transition"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              title="重置星盘"
              className="p-1.5 rounded bg-[#121212] hover:bg-[#d4af37]/10 border border-[#3d2b1f] text-[#c4b59d] hover:text-[#d4af37] transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Find Anomaly */}
          {currentAnomaly && (
            <button
              onClick={handleJumpToAnomaly}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition shadow ${
                anomalyLocated
                  ? 'bg-[#2a4d38] text-[#a4f0c4] border border-[#3e7555]'
                  : 'bg-[#5e1910] hover:bg-[#7a2015] text-[#ffd6cc] border border-[#a83324] animate-pulse'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{anomalyLocated ? '已锁定制空异象' : '窥管对准天变'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating HUD Cards directly from Immersive UI */}
      <div className="absolute top-14 right-4 flex flex-col gap-2.5 z-20 pointer-events-none">
        {selectedConstellation && (
          <div className="p-3 bg-[#121212]/90 border border-[#3d2b1f] backdrop-blur-sm shadow-xl rounded min-w-[170px]">
            <div className="text-[10px] text-[#8a7a5f] uppercase tracking-wider mb-0.5">当前聚焦 · Focus</div>
            <div className="text-sm font-semibold text-white font-serif">{selectedConstellation.name}</div>
            <div className="text-[10px] text-[#d4af37] mt-0.5">{selectedConstellation.division} · 星度安宁</div>
          </div>
        )}
        {currentAnomaly && (
          <div className="p-3 bg-[#121212]/90 border border-[#3d2b1f] backdrop-blur-sm shadow-xl rounded min-w-[170px]">
            <div className="text-[10px] text-[#8a7a5f] uppercase tracking-wider mb-0.5">异常波动 · Anomaly</div>
            <div className="text-sm font-semibold text-red-400 font-serif">{currentAnomaly.title}</div>
            <div className="text-[10px] text-red-500/90 mt-0.5">{currentAnomaly.anomalyName} · 动荡之兆</div>
          </div>
        )}
      </div>

      {/* Main Interactive Sky Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative flex-1 cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {/* Subtle Watermark Seal: 唐 司天监印 */}
        <div className="absolute top-4 left-6 pointer-events-none opacity-20 flex flex-col items-center">
          <div className="w-14 h-14 border border-[#d4af37] flex items-center justify-center text-[#d4af37] font-serif font-bold text-center leading-4 text-xs tracking-wider p-1">
            大唐
            <br />
            司天监
          </div>
        </div>

        {/* The SVG Celestial Map */}
        <svg
          className="w-full h-full"
          viewBox={viewMode === 'scroll' ? '0 0 1000 500' : '250 0 500 500'}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          <defs>
            {/* Anomaly Glow Filters */}
            <filter id="cinnabarGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="celestialGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a1b3a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#05050a" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Celestial Grid & Celestial Equator / Yellow Ecliptic (赤道与黄道) */}
          <g stroke="#3d2b1f" strokeWidth="0.8" opacity="0.6">
            {/* Celestial Equator (赤道线) */}
            <line x1="0" y1="240" x2="1000" y2="240" stroke="#8e352e" strokeDasharray="6,4" />
            <text x="15" y="235" fill="#8e352e" fontSize="10" fontFamily="serif">
              赤道規
            </text>

            {/* Ecliptic Curve (黄道) */}
            <path
              d="M 0,260 Q 250,180 500,240 T 1000,220"
              fill="none"
              stroke="#d4af37"
              strokeDasharray="4,4"
              strokeWidth="0.9"
            />
            <text x="15" y="275" fill="#d4af37" fontSize="10" fontFamily="serif">
              黄道度
            </text>

            {/* Division Meridian Lines (二十八宿经线) */}
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
              <line
                key={x}
                x1={x}
                y1="40"
                x2={x}
                y2="460"
                stroke="#2b1f16"
                strokeDasharray="2,6"
              />
            ))}
          </g>

          {/* Armillary Rings (渾象圈) when in sphere view */}
          {viewMode === 'sphere' && (
            <g stroke="#3d2b1f" fill="none" opacity="0.65">
              <circle cx="500" cy="250" r="220" strokeWidth="1.5" stroke="#d4af37" opacity="0.4" />
              <circle cx="500" cy="250" r="170" strokeWidth="1" strokeDasharray="4,4" stroke="#8a7a5f" />
              <circle cx="500" cy="250" r="100" strokeWidth="1" stroke="#8e352e" />
              <circle cx="500" cy="250" r="30" strokeWidth="0.8" stroke="#d4af37" />
              <line x1="500" y1="30" x2="500" y2="470" stroke="#3d2b1f" strokeWidth="1" />
              <line x1="280" y1="250" x2="720" y2="250" stroke="#3d2b1f" strokeWidth="1" />
              {/* Compass directions with Immersive UI typography */}
              <text x="492" y="24" fill="#d4af37" fontSize="11" fontFamily="serif">
                北极中天
              </text>
              <text x="492" y="488" fill="#d4af37" fontSize="11" fontFamily="serif">
                南极之极
              </text>
              <text x="250" y="254" fill="#d4af37" fontSize="11" fontFamily="serif">
                东方苍龙
              </text>
              <text x="735" y="254" fill="#d4af37" fontSize="11" fontFamily="serif">
                西方白虎
              </text>
            </g>
          )}

          {/* Render Constellations */}
          {constellations.map((constellation) => {
            const isSelected = selectedConstellation?.id === constellation.id;
            const isAnomalyHost = currentAnomaly?.constellationId === constellation.id;

            return (
              <g
                key={constellation.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectConstellation(constellation);
                }}
                className="cursor-pointer group"
              >
                {/* Connecting Lines */}
                {constellation.lines.map(([starIdA, starIdB], idx) => {
                  const starA = constellation.stars.find((s) => s.id === starIdA);
                  const starB = constellation.stars.find((s) => s.id === starIdB);
                  if (!starA || !starB) return null;
                  return (
                    <line
                      key={`${constellation.id}-line-${idx}`}
                      x1={starA.x}
                      y1={starA.y}
                      x2={starB.x}
                      y2={starB.y}
                      stroke={
                        isSelected
                          ? '#d4af37'
                          : isAnomalyHost
                          ? '#e2533d'
                          : 'rgba(212, 175, 55, 0.25)'
                      }
                      strokeWidth={isSelected || isAnomalyHost ? 1.8 : 1}
                      strokeOpacity={isSelected ? 0.95 : 0.65}
                      strokeDasharray={isSelected ? 'none' : '3,2'}
                      className="transition-all duration-300 group-hover:stroke-[#d4af37]"
                    />
                  );
                })}

                {/* Stars of Constellation */}
                {constellation.stars.map((star) => {
                  const starColor = getStarColor(star.school);
                  const isHovered = hoveredStar === star.id;
                  const isTargetAnomalyStar =
                    currentAnomaly?.targetStarId === star.id;
                  const starRadius = Math.max(2.5, 6 - star.magnitude * 0.8);

                  return (
                    <g
                      key={star.id}
                      onMouseEnter={() => setHoveredStar(star.id)}
                      onMouseLeave={() => setHoveredStar(null)}
                      className="transition-transform"
                    >
                      {/* Special Halo for Gan clan (black ink stars in Dunhuang) */}
                      {star.school === 'gan' && (
                        <circle
                          cx={star.x}
                          cy={star.y}
                          r={starRadius + 1.8}
                          fill="none"
                          stroke="#8b7355"
                          strokeWidth="0.75"
                        />
                      )}

                      {/* Main Star Body with subtle gold glow */}
                      <circle
                        cx={star.x}
                        cy={star.y}
                        r={starRadius}
                        fill={starColor}
                        stroke={star.school === 'gan' ? '#c4b59d' : '#ffffff'}
                        strokeWidth={star.school === 'gan' ? 0.8 : 0.4}
                        className="transition-all duration-150"
                      />

                      {/* Star Name Label on Hover or Selection */}
                      {(isHovered || isSelected || isTargetAnomalyStar) && (
                        <g>
                          <rect
                            x={star.x + 8}
                            y={star.y - 14}
                            width={star.name.length * 11 + 8}
                            height={18}
                            rx={2}
                            fill="#0a0a0f"
                            stroke="#3d2b1f"
                            strokeWidth="0.8"
                            opacity="0.95"
                          />
                          <text
                            x={star.x + 12}
                            y={star.y - 1}
                            fill="#d4af37"
                            fontSize="10"
                            fontFamily="serif"
                            fontWeight="bold"
                          >
                            {star.name}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Constellation Name Plaque */}
                <g
                  transform={`translate(${constellation.centerCoord.x}, ${constellation.centerCoord.y})`}
                  className="pointer-events-none select-none"
                >
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fill={isSelected ? '#d4af37' : '#8a7a5f'}
                    fontSize="11"
                    fontFamily="serif"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    opacity={isSelected ? 1 : 0.8}
                    className="transition-all"
                  >
                    {constellation.name.split('·')[1]?.trim() || constellation.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* ACTIVE ANOMALY VISUAL EFFECT */}
          {currentAnomaly && (
            <g
              transform={`translate(${currentAnomaly.targetCoords.x}, ${currentAnomaly.targetCoords.y})`}
              className="cursor-pointer"
              onClick={() => {
                setAnomalyLocated(true);
                onFocusAnomaly();
              }}
            >
              {/* Pulsing Aura Rings */}
              <circle
                cx="0"
                cy="0"
                r="18"
                fill="none"
                stroke="#c83c23"
                strokeWidth="1.5"
                opacity="0.8"
                className="animate-ping"
              />
              <circle
                cx="0"
                cy="0"
                r="10"
                fill="#c83c23"
                fillOpacity="0.4"
                stroke="#ff6b4a"
                strokeWidth="1.8"
                filter="url(#cinnabarGlow)"
              />

              {/* Special graphical rendering by anomaly type */}
              {currentAnomaly.anomalyType === 'comet' && (
                /* Comet Trail pointing northeast */
                <g stroke="#ffaa88" opacity="0.85">
                  <path
                    d="M 0,0 L 45,-35 L 60,-50"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#cinnabarGlow)"
                  />
                  <path d="M 0,0 L 35,-42" strokeWidth="1.5" strokeDasharray="3,2" />
                  <text
                    x="50"
                    y="-55"
                    fill="#ffaa88"
                    fontSize="10"
                    fontFamily="serif"
                    fontWeight="bold"
                  >
                    蚩尤旗彗星
                  </text>
                </g>
              )}

              {currentAnomaly.anomalyType === 'eclipse' && (
                /* Solar Eclipse Ring */
                <g>
                  <circle cx="0" cy="0" r="14" fill="#080706" stroke="#d4af37" strokeWidth="2.5" />
                  <circle cx="2" cy="-1" r="13" fill="#120e0a" />
                  <text x="18" y="4" fill="#d4af37" fontSize="10" fontFamily="serif" fontWeight="bold">
                    日全蚀既
                  </text>
                </g>
              )}

              {currentAnomaly.anomalyType === 'nova' && (
                /* Bright Supernova Burst */
                <g stroke="#64d2ff" strokeWidth="1.5">
                  <line x1="-12" y1="0" x2="12" y2="0" />
                  <line x1="0" y1="-12" x2="0" y2="12" />
                  <circle cx="0" cy="0" r="5" fill="#c4f0ff" />
                </g>
              )}

              {/* Targeting Sighting Crosshair (浑仪测景环) */}
              <g stroke="#d4af37" strokeWidth="1" opacity={anomalyLocated ? 1 : 0.75}>
                <circle cx="0" cy="0" r="26" fill="none" strokeDasharray="3,3" />
                <line x1="-32" y1="0" x2="-20" y2="0" />
                <line x1="20" y1="0" x2="32" y2="0" />
                <line x1="0" y1="-32" x2="0" y2="-20" />
                <line x1="0" y1="20" x2="0" y2="32" />
              </g>

              {/* Title Tag */}
              <rect
                x="-40"
                y="30"
                width="80"
                height="18"
                rx="2"
                fill="#240e0b"
                stroke="#c83c23"
                strokeWidth="1"
              />
              <text
                x="0"
                y="43"
                textAnchor="middle"
                fill="#ffd6cc"
                fontSize="10"
                fontFamily="serif"
                fontWeight="bold"
              >
                【天象异动】
              </text>
            </g>
          )}
        </svg>

        {/* Bottom Left: Sighting Tube Hint */}
        <div className="absolute bottom-3 left-3 bg-[#0a0a0f]/90 backdrop-blur border border-[#3d2b1f] rounded px-3 py-2 text-xs text-[#c4b59d] max-w-sm pointer-events-none">
          <div className="font-serif font-bold text-[#d4af37] flex items-center gap-1.5 mb-1">
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>灵台观天诀要</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#8a7a5f]">
            鼠标可拖动星图全景，滚轮缩放。天际赤芒闪烁处为当夜异象，点击或按右上角窥管即可锁定星宿推验。
          </p>
        </div>

        {/* Bottom Right: Anomaly Discovered Badge & Action with Immersive UI styling */}
        {currentAnomaly && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={() => {
                handleJumpToAnomaly();
                if (onInspectDone) onInspectDone();
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#d4af37] text-[#05050a] font-bold text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.35)] rounded"
            >
              <Sparkles className="w-4 h-4 text-[#05050a]" />
              <span>定格异象 · 批拟密奏</span>
            </button>
          </div>
        )}
      </div>

      {/* Selected Constellation Footer Info Strip */}
      {selectedConstellation && (
        <div className="px-4 py-2.5 bg-[#0a0a0f] border-t border-[#3d2b1f] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#c4b59d]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#121212] text-[#d4af37] font-serif font-semibold border border-[#3d2b1f]">
              {selectedConstellation.division}
            </span>
            <span className="font-serif text-white text-sm font-semibold">
              {selectedConstellation.name}
            </span>
            <span className="text-[#8a7a5f]">
              (共包含 {selectedConstellation.stars.length} 颗古星)
            </span>
          </div>
          <div className="italic text-[#8a7a5f] font-serif truncate max-w-xl">
            『{selectedConstellation.song}』
          </div>
        </div>
      )}
    </div>
  );
};
