import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, Hand, Info } from "lucide-react";
import { ENERGY_META, PLANTS, type EnergyType, type Plant } from "../data/plants";
import { IslandBase, VIEW_H, VIEW_W, project } from "./TaiwanMap";
import PlantPanel from "./PlantPanel";

type Filter = EnergyType | "all";

const FILTER_ORDER: EnergyType[] = ["coal", "gas", "oil", "nuclear", "hydro", "wind", "solar", "geo"];

function markerRadius(mw: number) {
  return Math.min(9.5, Math.max(3.8, 3.2 + Math.sqrt(mw) * 0.082));
}

export default function EnergyMap() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Plant | null>(null);
  const [hovered, setHovered] = useState<Plant | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const c = {} as Record<EnergyType, number>;
    for (const p of PLANTS) c[p.type] = (c[p.type] ?? 0) + 1;
    return c;
  }, []);

  const top5 = useMemo(() => [...PLANTS].sort((a, b) => b.capacityMw - a.capacityMw).slice(0, 5), []);

  const hoverPos = hovered ? project(hovered.lon, hovered.lat) : null;
  const active = hovered && (filter === "all" || hovered.type === filter);

  useEffect(() => {
    if (selected && panelRef.current && window.innerWidth < 1024) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selected]);

  return (
    <section id="map" className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* 標題 */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-cyan-300/90">
            <Crosshair size={13} />
            01 · ENERGY MAP
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">
              能源地圖
              <span className="ml-4 align-middle font-mono text-xs font-normal tracking-[0.3em] text-slate-600">
                {PLANTS.length} SITES / 8 TYPES
              </span>
            </h2>
            <p className="max-w-md text-[13.5px] leading-6 text-slate-500">
              光點大小對應裝置容量，虛線外圈代表已除役或除役中的機組。
              點擊任一光點，展開它的電廠檔案。
            </p>
          </div>
        </motion.div>

        {/* 篩選器 */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="全部" count={PLANTS.length} color="#e2e8f0" />
          {FILTER_ORDER.map((t) => (
            <FilterChip
              key={t}
              active={filter === t}
              onClick={() => setFilter(filter === t ? "all" : t)}
              label={ENERGY_META[t].label}
              count={counts[t] ?? 0}
              color={ENERGY_META[t].color}
            />
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* ══ 地圖 ══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-900/90 to-ink-950/95"
          >
            {/* 海圖格線 */}
            <div className="grid-bg absolute inset-0 opacity-70" />

            {/* 標題列 */}
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2.5">
              <span className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 font-mono text-[9px] tracking-[0.28em] text-cyan-300">
                POWER PLANT REGISTRY
              </span>
              <span className="hidden font-mono text-[9px] tracking-[0.2em] text-slate-600 sm:block">台灣本島 · 澎湖 · 離岸風場</span>
            </div>
            <div className="absolute right-5 top-5 z-10 font-mono text-[9px] tracking-[0.2em] text-slate-700">
              N ↑ · 119.5°E–122.0°E
            </div>

            {/* 懸浮提示 */}
            {active && hoverPos && (
              <div
                className="pointer-events-none absolute z-20 w-max max-w-[220px] rounded-xl border border-white/10 bg-ink-950/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-md"
                style={{
                  left: `clamp(104px, ${(hoverPos[0] / VIEW_W) * 100}%, calc(100% - 104px))`,
                  top: `${(hoverPos[1] / VIEW_H) * 100}%`,
                  transform:
                    hoverPos[1] < 140 ? "translate(-50%, 18px)" : "translate(-50%, calc(-100% - 18px))",
                }}
              >
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-100">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ENERGY_META[hovered!.type].color, boxShadow: `0 0 8px ${ENERGY_META[hovered!.type].color}` }}
                  />
                  {hovered!.name}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-wider text-slate-500">
                  {ENERGY_META[hovered!.type].label} ·{" "}
                  {hovered!.capacityMw >= 1000 ? (hovered!.capacityMw / 1000).toFixed(2) + " GW" : hovered!.capacityMw + " MW"} ·{" "}
                  {hovered!.status}
                </div>
              </div>
            )}

            <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="relative mx-auto h-[64vh] max-h-[740px] w-full lg:h-[78vh]" role="img" aria-label="台灣能源地圖">
              <IslandBase />

              {/* 電廠標記 */}
              {PLANTS.map((p) => {
                const [x, y] = project(p.lon, p.lat);
                const meta = ENERGY_META[p.type];
                const dimmed = filter !== "all" && p.type !== filter;
                const isSel = selected?.id === p.id;
                const isHov = hovered?.id === p.id;
                const r = markerRadius(p.capacityMw);
                const retired = p.status === "已除役" || p.status === "除役中";
                return (
                  <g
                    key={p.id}
                    transform={`translate(${x} ${y})`}
                    className={dimmed ? "pointer-events-none" : "cursor-pointer"}
                    opacity={dimmed ? 0.1 : 1}
                    style={{ transition: "opacity 0.35s" }}
                    onClick={() => !dimmed && setSelected(p)}
                    onMouseEnter={() => !dimmed && setHovered(p)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {(isSel || isHov) && (
                      <circle r={r * 1.7} fill="none" stroke={meta.color} strokeWidth="1.2" className="marker-ring" />
                    )}
                    {retired ? (
                      <>
                        <circle r={r + 2.5} fill="none" stroke={meta.color} strokeWidth="1.4" strokeDasharray="3.5 3.5" opacity="0.9" />
                        <circle r={Math.max(2, r * 0.4)} fill={meta.color} opacity="0.85" />
                      </>
                    ) : (
                      <>
                        <circle r={r + 4.5} fill={meta.color} opacity="0.14" />
                        <circle r={r} fill={meta.color} opacity="0.92" style={{ filter: `drop-shadow(0 0 6px ${meta.color}aa)` }} />
                        <circle r={Math.max(1.8, r * 0.4)} fill="#060a13" opacity="0.8" />
                      </>
                    )}
                    {/* 擴大點擊範圍 */}
                    <circle r="15" fill="transparent" />
                    {isSel && (
                      <text
                        y="-18"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill="#f1f5f9"
                        fontFamily="Noto Sans TC"
                        style={{ paintOrder: "stroke", stroke: "#060a13", strokeWidth: 4 }}
                      >
                        {p.short}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* 圖例 */}
            <div className="absolute bottom-4 left-5 z-10 flex items-center gap-4 font-mono text-[9px] tracking-[0.18em] text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-300" /> 運轉中
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full border border-dashed border-slate-400" /> 已除役／除役中
              </span>
            </div>
            <div className="absolute bottom-4 right-5 z-10 hidden items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] text-slate-700 sm:flex">
              <Info size={10} /> 位置與容量為教學示意概略值
            </div>
          </motion.div>

          {/* ══ 側欄 ══ */}
          <div ref={panelRef} className="lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              {selected ? (
                <PlantPanel key={selected.id} plant={selected} onClose={() => setSelected(null)} />
              ) : (
                <motion.div
                  key="registry"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900/80 p-7 backdrop-blur-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-300">
                    <Hand size={20} />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-black text-slate-50">點擊地圖上的光點</h3>
                  <p className="mt-2 text-[13px] leading-6 text-slate-500">
                    每一顆光點都是一座真實的電廠。點開它，你會看到機組規格、營運背景，
                    以及一段為大學課堂準備的「研究視角」。
                  </p>

                  <div className="mt-7 border-t border-white/8 pt-6">
                    <div className="mb-4 font-mono text-[9.5px] tracking-[0.3em] text-slate-600">裝置容量 TOP 5 · 點擊直達</div>
                    <ol className="space-y-1.5">
                      {top5.map((p, i) => {
                        const meta = ENERGY_META[p.type];
                        return (
                          <li key={p.id}>
                            <button
                              onClick={() => setSelected(p)}
                              className="group flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/[0.045]"
                            >
                              <span className="font-mono text-[11px] text-slate-600">0{i + 1}</span>
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color, boxShadow: `0 0 8px ${meta.color}66` }} />
                              <span className="flex-1">
                                <span className="block text-[13px] font-medium text-slate-200 transition group-hover:text-cyan-200">{p.name}</span>
                                <span className="block font-mono text-[9.5px] tracking-wider text-slate-600">{p.city}</span>
                              </span>
                              <span className="font-mono text-[12px] font-semibold text-slate-300">
                                {(p.capacityMw / 1000).toFixed(2)}
                                <span className="ml-1 text-[9px] text-slate-600">GW</span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  <div className="mt-7 border-t border-white/8 pt-6">
                    <div className="mb-3 font-mono text-[9.5px] tracking-[0.3em] text-slate-600">名錄分布</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {FILTER_ORDER.map((t) => (
                        <span key={t} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ENERGY_META[t].color }} />
                          {ENERGY_META[t].label}
                          <span className="font-mono text-slate-400">{counts[t]}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium tracking-wider transition-all duration-300 ${
        active ? "text-slate-950" : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-slate-200"
      }`}
      style={active ? { backgroundColor: color, borderColor: color, boxShadow: `0 0 24px ${color}55` } : undefined}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: active ? "#060a13" : color, boxShadow: active ? "none" : `0 0 6px ${color}` }} />
      {label}
      <span className={`font-mono text-[10px] ${active ? "text-slate-800" : "text-slate-600"}`}>{count}</span>
    </button>
  );
}
