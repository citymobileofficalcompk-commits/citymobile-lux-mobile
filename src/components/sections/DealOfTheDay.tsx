import { useEffect, useState } from "react";
import { Flame, Zap } from "lucide-react";

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setT({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

export function DealOfTheDay() {
  const target = new Date(Date.now() + 1000 * 60 * 60 * 50);
  const t = useCountdown(target);
  const cells = [
    { v: t.d, l: "Days" },
    { v: t.h, l: "Hours" },
    { v: t.m, l: "Mins" },
    { v: t.s, l: "Secs" },
  ];

  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-hero text-white p-6 sm:p-10 shadow-elevated">
          <div className="absolute inset-0 bg-glow opacity-60" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-neon-gradient blur-3xl opacity-40" />
          <div className="relative grid gap-6 md:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-bold">
                <Flame className="h-3.5 w-3.5 text-neon" /> DEAL OF THE DAY
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold leading-tight">
                Up to <span className="text-gradient">30% OFF</span><br/> on Premium Smartphones
              </h2>
              <p className="mt-3 text-white/70 max-w-md">Limited stock. Hand-selected flagships at unbeatable prices — only at City Mobile.</p>
              <button className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-neon-gradient text-white font-semibold shadow-neon hover:scale-[1.03] transition-transform">
                <Zap className="h-4 w-4" /> Shop Deals
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {cells.map((c) => (
                <div key={c.l} className="rounded-2xl glass-dark p-3 sm:p-5 text-center">
                  <div className="font-display text-2xl sm:text-4xl font-extrabold tabular-nums">{String(c.v).padStart(2, "0")}</div>
                  <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider text-white/60">{c.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
