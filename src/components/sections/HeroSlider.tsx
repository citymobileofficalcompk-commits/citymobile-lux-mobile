import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { HERO_SLIDES } from "@/lib/site-data";

export function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const total = HERO_SLIDES.length;
  const touchX = useRef<number | null>(null);
  const pause = useRef(false);

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const id = setInterval(() => { if (!pause.current) next(); }, 5000);
    return () => clearInterval(id);
  }, [next]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; pause.current = true; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
    setTimeout(() => (pause.current = false), 1500);
  };

  return (
    <section className="relative pt-20 pb-6 overflow-hidden">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div
          className="relative h-[480px] sm:h-[520px] rounded-3xl overflow-hidden shadow-elevated"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => (pause.current = true)}
          onMouseLeave={() => (pause.current = false)}
        >
          {HERO_SLIDES.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${i === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.accent}`} />
              <div className="absolute inset-0 bg-glow opacity-60" />
              <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -top-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <div className="relative h-full flex flex-col justify-end sm:justify-center p-6 sm:p-12 text-white">
                <div className="inline-flex w-fit items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-[10px] sm:text-xs font-bold animate-fade-up">
                  <Sparkles className="h-3.5 w-3.5" /> {s.badge}
                </div>
                <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/80 animate-fade-up" style={{ animationDelay: "80ms" }}>
                  {s.eyebrow}
                </p>
                <h1 className="mt-2 font-display text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight max-w-xl animate-fade-up" style={{ animationDelay: "160ms" }}>
                  {s.title}<br />
                  <span className="text-gradient">{s.highlight}</span>
                </h1>
                <p className="mt-4 max-w-md text-sm sm:text-base text-white/85 animate-fade-up" style={{ animationDelay: "240ms" }}>
                  {s.desc}
                </p>
                <div className="mt-6 flex gap-3 animate-fade-up" style={{ animationDelay: "320ms" }}>
                  <Link
                    to={s.cta.to}
                    className="group inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-white text-foreground font-semibold shadow-elevated hover:scale-[1.03] active:scale-95 transition-transform"
                  >
                    {s.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/offers"
                    className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl glass-dark text-white font-semibold border border-white/20 hover:bg-white/10 transition"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-8 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
