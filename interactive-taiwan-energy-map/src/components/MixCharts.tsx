import { useState } from "react";
import { motion } from "framer-motion";
import { Atom, ChartPie, Flame, Sun } from "lucide-react";
import { MIX_DATA } from "../data/plants";

type Mode = "gen" | "cap";

const CX = 170;
const CY = 170;
const R = 118;
const C = 2 * Math.PI * R;

const INSIGHTS = [
  {
    icon: Flame,
    color: "#22d3ee",
    title: "燃氣首度登頂",
    body: "2024 年燃氣發電量占比約 42.6%，首度超越燃煤成為台灣第一大電力來源——橋接能源正式接棒基載。",
  },
  {
    icon: Atom,
    color: "#c084fc",
    title: "非核家園啟動",
    body: "2025 年 5 月核三二號機停機後，核能發電正式歸零。夜間基載改由燃氣、燃煤、抽蓄水力與儲能聯手撐起。",
  },
  {
    icon: Sun,
    color: "#facc15",
    title: "光電十年十倍",
    body: "太陽能裝置容量從 2016 年約 1.2 GW 成長至 2024 年逾 13 GW，已超越全部核電機組的歷史總和。",
  },
];

export default function MixCharts() {
  const [mode, setMode] = useState<Mode>("gen");
  const [hover, setHover] = useState<string | null>(null);

  let acc = 0;
  const segments = MIX_DATA.map((d) => {
    const value = mode === "gen" ? d.gen : d.cap;
    const seg = { ...d, value, start: acc };
    acc += value;
    return seg;
  });
  const hoveredSeg = segments.find((s) => s.label === hover);

  return (
    <section id="mix" className="relative scroll-mt-20 py-24 lg:py-32">
      {/* 背景光 */}
      <div className="pointer-events-none absolute right-0 top-24 h-96 w-96 rounded-full bg-emerald-500/8 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-cyan-300/90">
            <ChartPie size={13} />
            02 · POWER MIX
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">發電結構</h2>
            <div className="flex rounded-full border border-white/10 bg-ink-900/70 p-1">
              {(
                [
                  { k: "gen", label: "發電量占比" },
                  { k: "cap", label: "裝置容量占比" },
                ] as const
              ).map((m) => (
                <button
                  key={m.k}
                  onClick={() => setMode(m.k)}
                  className={`rounded-full px-5 py-2 text-[12px] font-medium tracking-wider transition-all ${
                    mode === m.k ? "bg-slate-100 text-slate-950" : "text-slate-500 hover:text-slate-200"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[440px_minmax(0,1fr)]">
          {/* ── 甜甜圈 ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
            className="rounded-3xl border border-white/10 bg-ink-900/70 p-6 backdrop-blur-md"
          >
            <div className="relative mx-auto w-full max-w-[380px]">
              <svg viewBox="0 0 340 340" className="w-full">
                <circle cx={CX} cy={CY} r={R - 26} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="2 5" />
                <circle cx={CX} cy={CY} r={R + 26} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                {segments.map((s, i) => {
                  const len = (s.value / 100) * C;
                  return (
                    <motion.circle
                      key={s.label + mode}
                      cx={CX}
                      cy={CY}
                      r={R}
                      fill="none"
                      stroke={s.color}
                      strokeLinecap="butt"
                      transform={`rotate(-90 ${CX} ${CY})`}
                      initial={{ strokeDasharray: `1 ${C}`, strokeDashoffset: 0, opacity: 0 }}
                      animate={{
                        strokeDasharray: `${Math.max(len - 2.5, 1)} ${C}`,
                        strokeDashoffset: -((s.start / 100) * C),
                        opacity: 1,
                        strokeWidth: hover === s.label ? 42 : 30,
                      }}
                      transition={{ duration: 1.1, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      style={{ cursor: "pointer", filter: hover === s.label ? `drop-shadow(0 0 10px ${s.color}88)` : "none" }}
                      onMouseEnter={() => setHover(s.label)}
                      onMouseLeave={() => setHover(null)}
                    />
                  );
                })}
              </svg>
              {/* 中心資訊 */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                {hoveredSeg ? (
                  <>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-slate-500">{hoveredSeg.label}</div>
                    <div className="mt-1 font-mono text-4xl font-semibold" style={{ color: hoveredSeg.color }}>
                      {hoveredSeg.value}
                      <span className="text-lg">%</span>
                    </div>
                    <div className="mt-1 font-mono text-[10px] tracking-wider text-slate-600">{mode === "gen" ? "發電量占比" : "裝置容量占比"}</div>
                  </>
                ) : (
                  <>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-slate-600">TAIWAN · 2024</div>
                    <div className="mt-1 font-serif text-2xl font-black text-slate-100">{mode === "gen" ? "發電量" : "裝置容量"}</div>
                    <div className="mt-1 font-mono text-[10px] tracking-wider text-slate-600">懸停查看比例</div>
                  </>
                )}
              </div>
            </div>

            {/* 圖例 */}
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-2">
              {segments.map((s) => (
                <button
                  key={s.label}
                  onMouseEnter={() => setHover(s.label)}
                  onMouseLeave={() => setHover(null)}
                  className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition hover:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-2 text-[12px] text-slate-300">
                    <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">{s.value}%</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── 右欄：容量排行 + 洞察 ── */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-ink-900/70 p-7 backdrop-blur-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-slate-100">裝置容量排行</h3>
                <span className="font-mono text-[9.5px] tracking-[0.25em] text-slate-600">UNIT · GW</span>
              </div>
              <p className="mb-6 text-[12.5px] leading-6 text-slate-500">
                容量大不等於發電多：太陽能容量高居第三，但只有白天出力；
                核能曾以不到 3 GW 撐起近 4.7% 的全國電量，這就是「容量因數」的故事。
              </p>
              <div className="space-y-3.5">
                {[...MIX_DATA]
                  .sort((a, b) => b.gw - a.gw)
                  .map((d, i) => (
                    <div key={d.label}>
                      <div className="mb-1 flex items-baseline justify-between text-[12px]">
                        <span className="text-slate-300">{d.label}</span>
                        <span className="font-mono text-slate-400">
                          {d.gw}
                          <span className="ml-1 text-[9px] text-slate-600">GW</span>
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/6">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(d.gw / 20) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${d.color}55, ${d.color})` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-5 font-mono text-[9.5px] tracking-[0.18em] text-slate-700">
                ※ 2024 年概略統計 · 教學用途 · 以台電年報、能源署統計整理
              </div>
            </motion.div>

            {/* 洞察卡 */}
            <div className="grid gap-4 sm:grid-cols-3">
              {INSIGHTS.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
                  className="group rounded-2xl border border-white/10 bg-ink-900/70 p-5 backdrop-blur-md transition-colors hover:border-white/20"
                >
                  <div
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border"
                    style={{ color: c.color, borderColor: c.color + "33", backgroundColor: c.color + "12" }}
                  >
                    <c.icon size={16} />
                  </div>
                  <h4 className="font-serif text-[15px] font-bold text-slate-100">{c.title}</h4>
                  <p className="mt-1.5 text-[11.5px] leading-5.5 text-slate-500">{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
