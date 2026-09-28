import { motion } from "framer-motion";
import { Database, GraduationCap, HelpCircle, Zap } from "lucide-react";

const QUESTIONS = [
  {
    q: "如果今天重啟核四，你會用哪些指標評估它對 2030 年電網韌性與電價的影響？",
    tag: "政策評估",
  },
  {
    q: "離岸風場選址，該如何在漁業權、白海豚保育與減碳時程之間設計協商機制？",
    tag: "空間治理",
  },
  {
    q: "台灣民生電價長期低於發電成本。若要推動電價改革，如何兼顧能源公平與產業競爭力？",
    tag: "能源經濟",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {/* 討論題 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="mb-3 flex items-center gap-2.5 font-mono text-[10px] tracking-[0.35em] text-cyan-300/90">
            <GraduationCap size={13} />
            FOR THE CLASSROOM
          </div>
          <h2 className="font-serif text-3xl font-black text-slate-50 sm:text-4xl">帶回課堂的三個討論題</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {QUESTIONS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-ink-900/70 p-6 backdrop-blur-md transition-colors hover:border-cyan-300/25"
              >
                <div className="mb-3 flex items-center justify-between">
                  <HelpCircle size={16} className="text-cyan-300/70" />
                  <span className="font-mono text-[9px] tracking-[0.25em] text-slate-600">{item.tag}</span>
                </div>
                <p className="text-[13px] leading-6.5 text-slate-300">{item.q}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col items-start justify-between gap-10 border-t border-white/8 pt-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                <Zap size={16} strokeWidth={2.4} />
              </span>
              <div>
                <div className="font-serif text-lg font-bold tracking-[0.15em] text-slate-100">電力島嶼</div>
                <div className="font-mono text-[9px] tracking-[0.32em] text-slate-500">TAIWAN POWER ATLAS</div>
              </div>
            </div>
            <p className="mt-4 max-w-lg text-[12px] leading-6 text-slate-500">
              為大學與研究所課堂製作的互動式能源教材。地圖位置、容量與結構數據皆為教學用概略值，
              正式研究請引用官方統計原始資料。
            </p>
          </div>
          <div className="text-left md:text-right">
            <div className="mb-2 flex items-center gap-2 font-mono text-[9.5px] tracking-[0.3em] text-slate-600 md:justify-end">
              <Database size={11} />
              DATA SOURCES
            </div>
            <p className="max-w-sm text-[11.5px] leading-5.5 text-slate-600">
              台灣電力公司統計年報 · 經濟部能源署全國電力資源供需報告 · 環境部電力排碳係數公告 · 各風場公開環評資料（2024–2025）
            </p>
            <p className="mt-4 font-mono text-[9px] tracking-[0.25em] text-slate-700">
              © 2025 POWER ATLAS · EDUCATIONAL USE ONLY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
