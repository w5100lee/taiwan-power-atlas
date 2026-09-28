import { motion } from "framer-motion";
import { Building2, Factory, Lightbulb, MapPin, X } from "lucide-react";
import type { Plant } from "../data/plants";
import { ENERGY_META } from "../data/plants";

const STATUS_STYLE: Record<Plant["status"], string> = {
  運轉中: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10",
  擴建中: "text-cyan-300 border-cyan-400/40 bg-cyan-400/10",
  除役中: "text-amber-300 border-amber-400/40 bg-amber-400/10",
  已除役: "text-slate-400 border-slate-500/40 bg-slate-500/10",
};

export const NATIONAL_CAPACITY_GW = 71.7;

export default function PlantPanel({ plant, onClose }: { plant: Plant; onClose: () => void }) {
  const meta = ENERGY_META[plant.type];
  const share = ((plant.capacityMw / 1000 / NATIONAL_CAPACITY_GW) * 100).toFixed(1);
  const co2 = meta.co2PerKwh;
  const avg = 0.494;

  return (
    <motion.div
      key={plant.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/80 p-7 backdrop-blur-md"
    >
      {/* 類型光暈 */}
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-[90px]"
        style={{ backgroundColor: meta.color + "26" }}
      />

      <button
        onClick={onClose}
        aria-label="關閉"
        className="absolute right-5 top-5 rounded-full border border-white/10 p-1.5 text-slate-500 transition hover:border-white/30 hover:text-slate-200"
      >
        <X size={14} />
      </button>

      {/* 類型徽章 */}
      <div className="flex items-center gap-2.5">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.22em]"
          style={{ color: meta.color, borderColor: meta.color + "55", backgroundColor: meta.color + "14" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color, boxShadow: `0 0 8px ${meta.color}` }} />
          {meta.label} · {meta.en}
        </span>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] tracking-widest ${STATUS_STYLE[plant.status]}`}>{plant.status}</span>
      </div>

      <h3 className="mt-4 font-serif text-[1.65rem] font-black leading-tight text-slate-50">{plant.name}</h3>
      <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] text-slate-500">
        <MapPin size={12} className="shrink-0" />
        {plant.city}
      </p>

      {/* 容量 */}
      <div className="mt-6 flex items-end gap-2 border-y border-white/8 py-5">
        <span className="font-mono text-[2.6rem] font-semibold leading-none text-slate-50">
          {plant.capacityMw >= 1000 ? (plant.capacityMw / 1000).toFixed(2) : plant.capacityMw}
        </span>
        <span className="pb-1 font-mono text-sm" style={{ color: meta.color }}>
          {plant.capacityMw >= 1000 ? "GW" : "MW"}
        </span>
        <span className="pb-1 font-mono text-[10px] tracking-[0.18em] text-slate-600">裝置容量 · 佔全國約 {share}%</span>
      </div>

      {/* 資料格 */}
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-[12.5px]">
        <div className="col-span-2">
          <dt className="mb-1 flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.25em] text-slate-600">
            <Factory size={11} /> 機組組成
          </dt>
          <dd className="text-slate-300">{plant.units}</dd>
        </div>
        <div>
          <dt className="mb-1 flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.25em] text-slate-600">
            <Building2 size={11} /> 營運單位
          </dt>
          <dd className="text-slate-300">{plant.operator}</dd>
        </div>
        <div>
          <dt className="mb-1 font-mono text-[9.5px] tracking-[0.25em] text-slate-600">商轉時程</dt>
          <dd className="text-slate-300">{plant.commissioned}</dd>
        </div>
      </dl>

      {/* 碳排比較 */}
      <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
        <div className="mb-3 font-mono text-[9.5px] tracking-[0.25em] text-slate-600">每度電碳排係數 · 生命週期概估（kg CO₂e）</div>
        <div className="space-y-2.5">
          <div>
            <div className="mb-1 flex justify-between text-[11px] text-slate-400">
              <span>{meta.label}</span>
              <span className="font-mono" style={{ color: meta.color }}>{co2}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(co2 / 0.9) * 100}%` }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: meta.color }}
              />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-[11px] text-slate-400">
              <span>全國電力平均（2023 公告）</span>
              <span className="font-mono text-slate-300">{avg}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(avg / 0.9) * 100}%` }}
                transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                className="h-full rounded-full bg-slate-400/70"
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-[13.5px] leading-7 text-slate-400">{plant.description}</p>

      {/* 研究視角 */}
      <div className="mt-6 rounded-2xl border p-4" style={{ borderColor: meta.color + "30", backgroundColor: meta.color + "0d" }}>
        <div className="mb-2 flex items-center gap-2 font-mono text-[9.5px] tracking-[0.28em]" style={{ color: meta.color }}>
          <Lightbulb size={12} />
          研究視角 RESEARCH LENS
        </div>
        <p className="text-[12.5px] leading-6.5 text-slate-300">{plant.insight}</p>
      </div>
    </motion.div>
  );
}
