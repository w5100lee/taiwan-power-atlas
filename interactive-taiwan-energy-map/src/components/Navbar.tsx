import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const LINKS = [
  { href: "#map", label: "能源地圖" },
  { href: "#mix", label: "發電結構" },
  { href: "#timeline", label: "轉型時間線" },
  { href: "#concepts", label: "關鍵概念" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink-950/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 transition group-hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]">
            <Zap size={17} strokeWidth={2.4} />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-[15px] font-bold tracking-[0.2em] text-slate-100">電力島嶼</span>
            <span className="block font-mono text-[9px] tracking-[0.32em] text-slate-500">TAIWAN POWER ATLAS</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[11px] tracking-[0.25em] text-slate-400 transition hover:text-slate-100"
            >
              <span className="mr-1.5 text-cyan-400/60">0{i + 1}</span>
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#map"
          className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-slate-300 transition hover:border-cyan-300/50 hover:text-cyan-200 sm:block"
        >
          開始探索 →
        </a>
      </div>
    </header>
  );
}
