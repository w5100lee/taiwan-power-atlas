import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { History } from "lucide-react";
import { TIMELINE } from "../data/plants";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="timeline" className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-violet-500/8 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.35em] text-cyan-300/90">
            <History size={13} />
            03 · ENERGY TRANSITION
          </div>
          <h2 className="font-serif text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">轉型時間線</h2>
          <p className="mx-auto mt-4 max-w-xl text-[13.5px] leading-7 text-slate-500">
            從 1978 年第一座核電機組併網，到 2025 年正式進入非核家園——
            台灣用近半世紀走出一條高密度、高張力的能源轉型路。
          </p>
        </motion.div>

        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* 中軸線 */}
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-white/8 md:left-1/2" />
          <motion.div
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-cyan-300 via-emerald-300 to-violet-400 md:left-1/2"
            style={{ scaleY: lineScale }}
          />

          {TIMELINE.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={e.year + e.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.05 }}
                className={`relative mb-10 pl-14 md:w-1/2 md:pl-0 ${left ? "md:pr-12" : "md:ml-auto md:pl-12"}`}
              >
                {/* 節點 */}
                <span
                  className={`absolute top-2 h-3.5 w-3.5 rounded-full border-2 bg-ink-950 ${
                    left ? "left-[13px] md:-right-[7px] md:left-auto" : "left-[13px] md:-left-[7px]"
                  }`}
                  style={{ borderColor: e.color, boxShadow: `0 0 12px ${e.color}88` }}
                />

                <div
                  className={`rounded-2xl border border-white/10 bg-ink-900/70 p-6 backdrop-blur-md transition-colors hover:border-white/20 ${
                    left ? "md:text-right" : ""
                  }`}
                >
                  <div className={`flex items-center gap-3 ${left ? "md:flex-row-reverse" : ""}`}>
                    <span className="font-mono text-[1.35rem] font-semibold" style={{ color: e.color }}>
                      {e.year}
                    </span>
                    <span
                      className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.25em]"
                      style={{ color: e.color, borderColor: e.color + "44", backgroundColor: e.color + "10" }}
                    >
                      {e.tag}
                    </span>
                  </div>
                  <h3 className="mt-2.5 font-serif text-lg font-bold text-slate-100">{e.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-6 text-slate-500">{e.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
