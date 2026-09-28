import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { CONCEPTS } from "../data/plants";

export default function Concepts() {
  return (
    <section id="concepts" className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="pointer-events-none absolute right-10 bottom-10 h-80 w-80 rounded-full bg-cyan-500/8 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-cyan-300/90">
            <BookOpen size={13} />
            04 · KEY CONCEPTS
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">關鍵概念</h2>
            <p className="max-w-md text-[13.5px] leading-6 text-slate-500">
              讀懂能源新聞與政策辯論，需要這六把鑰匙——寫報告、做田野、參加說明會都用得上。
            </p>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {CONCEPTS.map((c, i) => (
            <motion.article
              key={c.no}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.09 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/70 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-300/25 hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.18)]"
            >
              <div className="mb-5 flex items-start justify-between">
                <span className="font-mono text-[11px] tracking-[0.3em] text-slate-600 transition group-hover:text-cyan-300">
                  {c.no}
                </span>
                <span className="font-mono text-[9px] tracking-[0.22em] text-slate-700">{c.en}</span>
              </div>
              <h3 className="font-serif text-[1.35rem] font-black leading-snug text-slate-100">{c.title}</h3>
              <p className="mt-3 flex-1 text-[12.5px] leading-6.5 text-slate-500">{c.body}</p>
              <div className="mt-6 border-t border-white/8 pt-4">
                <div className="font-mono text-xl font-semibold text-cyan-200">{c.stat}</div>
                <div className="mt-1 text-[10.5px] tracking-wide text-slate-600">{c.statLabel}</div>
              </div>
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-400/10" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
