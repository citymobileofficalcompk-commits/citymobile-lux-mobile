import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  highlight: string;
  tag?: string;
  cta?: { label: string; to: string };
  align?: "left" | "right";
  overlay?: string;
};

const SLIDES: Slide[] = [
  {
    image: slide1,
    eyebrow: "City Mobile · Flagship Edition",
    title: "Pure Power.",
    highlight: "Crafted Premium.",
    tag: "Featured Drop",
    cta: { label: "Explore Now", to: "/mobiles" },
    align: "left",
    overlay: "from-black/85 via-black/40 to-transparent",
  },
  {
    image: slide2,
    eyebrow: "Sound · Style · Signal",
    title: "Premium Accessories.",
    highlight: "Cinematic Sound.",
    tag: "Curated Collection",
    align: "right",
    overlay: "from-black/30 via-black/10 to-black/70",
  },
  {
    image: slide3,
    eyebrow: "Limited Time",
    title: "Mega Deals.",
    highlight: "Up to 30% OFF",
    tag: "Hot Sale",
    cta: { label: "View Offers", to: "/offers" },
    align: "left",
    overlay: "from-black/80 via-black/35 to-transparent",
  },
];

export function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const touchX = useRef<number | null>(null);
  const pause = useRef(false);
  const total = SLIDES.length;

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const id = setInterval(() => { if (!pause.current) next(); }, 5500);
    return () => clearInterval(id);
  }, [next]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; pause.current = true; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
    setTimeout(() => (pause.current = false), 1200);
  };

  return (
    <section className="relative pt-20 pb-6 overflow-hidden">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div
          className="relative h-[380px] xs:h-[420px] sm:h-[520px] md:h-[560px] rounded-2xl sm:rounded-[28px] overflow-hidden shadow-elevated ring-1 ring-white/10 bg-slate-950"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => (pause.current = true)}
          onMouseLeave={() => (pause.current = false)}
        >
          {SLIDES.map((s, i) => {
            const active = i === idx;
            const isRight = s.align === "right";
            return (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "opacity-100 scale-100" : "opacity-0 scale-[1.06] pointer-events-none"}`}
              >
                {/* Background image */}
                <img
                  src={s.image}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${active ? "scale-110" : "scale-100"}`}
                />

                {/* Cinematic gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />

                {/* Floating glow accents */}
                <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl animate-glow pointer-events-none" />
                <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl animate-glow pointer-events-none" style={{ animationDelay: "1.2s" }} />

                {/* Content */}
                <div className={`relative h-full flex flex-col justify-end sm:justify-center p-6 sm:p-12 text-white ${isRight ? "items-end text-right" : ""}`}>
                  <div className={`max-w-xl ${isRight ? "ml-auto" : ""}`}>
                    {s.tag && active && (
                      <div className="mb-4 animate-fade-up">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-dark text-[10px] font-bold uppercase tracking-[0.18em] text-white border border-white/20">
                          <Sparkles className="h-3 w-3 text-cyan-300" />
                          {s.tag}
                        </span>
                      </div>
                    )}

                    {active && (
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 animate-fade-up" style={{ animationDelay: "60ms" }}>
                        {s.eyebrow}
                      </p>
                    )}

                    <h1
                      className={`mt-3 font-display text-[28px] leading-[1.05] xs:text-[34px] sm:text-5xl md:text-6xl font-extrabold tracking-tight break-words ${active ? "animate-fade-up" : ""}`}
                      style={{ animationDelay: "120ms" }}
                    >
                      {s.title}{" "}
                      <span className="block bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                        {s.highlight}
                      </span>
                    </h1>

                    {s.cta && active && (
                      <div className="mt-7 animate-fade-up" style={{ animationDelay: "200ms" }}>
                        <Link
                          to={s.cta.to}
                          className="group inline-flex items-center gap-2 h-12 px-7 rounded-2xl bg-white text-slate-900 font-semibold shadow-elevated hover:scale-[1.04] active:scale-95 transition-transform duration-150"
                        >
                          {s.cta.label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Arrows (desktop) */}
          <button onClick={prev} aria-label="Previous" className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full glass-dark text-white items-center justify-center hover:scale-110 transition border border-white/20">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={next} aria-label="Next" className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full glass-dark text-white items-center justify-center hover:scale-110 transition border border-white/20">
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {SLIDES.map((_, i) => (
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
