import { motion } from "framer-motion";
import { ArrowDown, MousePointerClick, Satellite } from "lucide-react";
import CountUp from "./CountUp";
import { KEY_STATS, PLANTS, ENERGY_META } from "../data/plants";
import { TAIWAN_PATH, VIEW_W, VIEW_H } from "../components/TaiwanMap";

const CHIPS = [
  { label: "台中電廠", value: "5,824 MW", color: "#fb923c", top: "36%", left: "4%" },
  { label: "核三廠・非核倒數", value: "1,902 MW", color: "#c084fc", top: "76%", left: "34%" },
  { label: "彰化外海風場群", value: "≈ 1.2 GW", color: "#34d399", top: "28%", left: "-3%" },
];

const TICKER = PLANTS.map(
  (p) => `${p.short} ${p.capacityMw >= 1000 ? (p.capacityMw / 1000).toFixed(2) + " GW" : p.capacityMw + " MW"}`
);

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* 背景光暈 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-500/12 blur-[130px]" />
        <div className="absolute -bottom-56 right-[-8rem] h-[36rem] w-[36rem] rounded-full bg-violet-500/12 blur-[140px]" />
        <div className="grid-bg absolute inset-0 opacity-60" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-5 pb-24 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-24">
        {/* ── 左：標題敘事 ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-cyan-300/90"
          >
            <Satellite size={13} />
            INTERACTIVE ENERGY ATLAS · 互動式能源教材
            <span className="h-px w-16 bg-gradient-to-r from-cyan-400/70 to-transparent" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="font-serif text-[clamp(3.4rem,9vw,7.2rem)] font-black leading-[1.02] tracking-tight text-slate-50"
          >
            電力
            <span className="relative text-transparent" style={{ WebkitTextStroke: "2px rgba(125,211,252,0.75)" }}>
              島嶼
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-3 font-mono text-[11px] tracking-[0.42em] text-slate-500"
          >
            TAIWAN POWER ATLAS — 每一度電都有自己的座標
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32 }}
            className="mt-8 max-w-xl text-[15px] leading-8 text-slate-400"
          >
            一座 394 公里長的島嶼，如何在 0.04 秒內把電從彰化外海的風機、
            龍井的燃煤機組、日月潭的水面送到你的宿舍？點開地圖上的每一顆光點——
            這是專為大學與研究所課堂打造的台灣能源全景。
          </motion.p>

          {/* 關鍵數據 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.44 }}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/8 pt-8 sm:grid-cols-4"
          >
            {KEY_STATS.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-2xl font-semibold text-slate-100 sm:text-[1.7rem]">
                  <CountUp value={s.value} decimals={s.decimals} />
                  <span className="ml-1 text-xs text-cyan-300">{s.unit}</span>
                </div>
                <div className="mt-1.5 text-[11px] leading-4 tracking-wide text-slate-500">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#map"
              className="group inline-flex items-center gap-2.5 rounded-full bg-cyan-300 px-6 py-3 text-[13px] font-bold tracking-wider text-slate-950 transition hover:bg-cyan-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            >
              <MousePointerClick size={16} />
              進入互動地圖
            </a>
            <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">
              收錄 {PLANTS.length} 座電廠 · 8 大能源類型
            </span>
          </motion.div>
        </div>

        {/* ── 右：發光島嶼 ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative mx-auto h-[46vh] w-full max-w-sm lg:h-[70vh]"
        >
          {/* 環狀軌道 */}
          <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-400/15" />
          <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/6 blur-2xl" />

          <div className="animate-drift relative h-full w-full">
            <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="hero-land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(34,211,238,0.16)" />
                  <stop offset="100%" stopColor="rgba(192,132,252,0.14)" />
                </linearGradient>
              </defs>
              <motion.path
                d={TAIWAN_PATH}
                fill="url(#hero-land)"
                stroke="#67e8f9"
                strokeWidth="1.6"
                strokeLinejoin="round"
                style={{ filter: "drop-shadow(0 0 14px rgba(34,211,238,0.45))" }}
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ pathLength: { duration: 2.4, ease: "easeInOut", delay: 0.3 }, fillOpacity: { duration: 1.4, delay: 1.8 } }}
              />
              {/* 能量脈衝點 */}
              {[
                [290, 273],
                [357, 62],
                [282, 807],
                [210, 316],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="4" fill="#67e8f9" className="animate-blink" style={{ animationDelay: `${i * 0.5}s` }} />
                  <circle cx={x} cy={y} r="10" fill="none" stroke="#67e8f9" strokeWidth="1" className="marker-ring" style={{ animationDelay: `${i * 0.5}s` }} />
                </g>
              ))}
            </svg>

            {/* 浮動晶片 */}
            {CHIPS.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.25, duration: 0.7 }}
                className="absolute hidden rounded-xl border border-white/10 bg-ink-900/80 px-3.5 py-2.5 backdrop-blur-md sm:block"
                style={{ top: c.top, left: c.left }}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                  {c.label}
                </div>
                <div className="mt-0.5 font-mono text-sm font-semibold text-slate-100">{c.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 跑馬燈 */}
      <div className="relative border-t border-white/6 bg-ink-950/70 py-3.5 backdrop-blur-sm">
        <div className="flex overflow-hidden" aria-hidden>
          <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="mx-6 flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.18em] text-slate-500">
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: Object.values(ENERGY_META)[i % 8].color }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 text-slate-600 lg:block"
      >
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
