import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { HERO_SLIDES } from "@/lib/site-data";
import logoImg from "@/assets/logo.jpg";

export function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const total = HERO_SLIDES.length;
  const touchX = useRef<number | null>(null);
  const pause = useRef(false);

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const id = setInterval(() => { if (!pause.current) next(); }, 6000);
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
          className="relative h-[540px] sm:h-[580px] rounded-[28px] overflow-hidden shadow-elevated ring-1 ring-white/10"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => (pause.current = true)}
          onMouseLeave={() => (pause.current = false)}
        >
          {HERO_SLIDES.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${i === idx ? "opacity-100 scale-100" : "opacity-0 scale-[1.06] pointer-events-none"}`}
            >
              {/* Cinematic gradient layers */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.accent}`} />
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_90%_100%,rgba(0,0,0,0.45),transparent_70%)]" />
              <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/15 blur-3xl animate-glow" />
              <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

              {/* Floating logo */}
              <div className={`absolute right-4 sm:right-12 top-10 sm:top-1/2 sm:-translate-y-1/2 transition-all duration-1000 ${i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="relative">
                  <div className="absolute -inset-10 bg-white/30 blur-3xl rounded-full animate-glow" />
                  <div className="relative h-32 w-32 sm:h-56 sm:w-56 rounded-3xl overflow-hidden ring-2 ring-white/40 shadow-2xl bg-white animate-float">
                    <img src={logoImg} alt="City Mobile" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="relative h-full flex flex-col justify-end sm:justify-center p-6 sm:p-12 text-white max-w-xl">
                <div className="inline-flex w-fit items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-[10px] sm:text-xs font-bold animate-fade-up border border-white/20">
                  <Sparkles className="h-3.5 w-3.5" /> {s.badge}
                </div>
                <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white/80 animate-fade-up" style={{ animationDelay: "100ms" }}>
                  {s.eyebrow}
                </p>
                <h1 className="mt-2 font-display text-[40px] leading-[1.02] sm:text-6xl font-extrabold tracking-tight animate-fade-up" style={{ animationDelay: "200ms" }}>
                  {s.title}<br />
                  <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.25)]">{s.highlight}</span>
                </h1>
                <p className="mt-4 max-w-md text-sm sm:text-base text-white/85 animate-fade-up" style={{ animationDelay: "300ms" }}>
                  {s.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "400ms" }}>
                  <Link
                    to={s.cta.to}
                    className="group inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-white text-foreground font-semibold shadow-elevated hover:scale-[1.04] active:scale-95 transition-transform"
                  >
                    {s.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/offers"
                    className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl glass-dark text-white font-semibold border border-white/25 hover:bg-white/15 transition"
                  >
                    Explore Offers
                  </Link>
                </div>
                <div className="mt-5 flex items-center gap-2 text-[11px] text-white/75 animate-fade-up" style={{ animationDelay: "500ms" }}>
                  <ShieldCheck className="h-3.5 w-3.5" /> Original · PTA Approved · Warranty Included
                </div>
              </div>
            </div>
          ))}

          {/* Arrows (desktop) */}
          <button onClick={prev} aria-label="Previous" className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full glass-dark text-white items-center justify-center hover:scale-110 transition border border-white/20">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={next} aria-label="Next" className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full glass-dark text-white items-center justify-center hover:scale-110 transition border border-white/20">
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-10 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
