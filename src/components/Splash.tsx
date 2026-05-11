import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Splash() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("citymobile-splash")) {
      setGone(true);
      return;
    }
    const t1 = setTimeout(() => setHide(true), 1700);
    const t2 = setTimeout(() => {
      setGone(true);
      sessionStorage.setItem("citymobile-splash", "1");
    }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-hero flex items-center justify-center transition-opacity duration-500 ${hide ? "opacity-0" : "opacity-100"}`}>
      <div className="absolute inset-0 bg-glow opacity-80" />
      {/* Particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-neon animate-float"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 6) * 0.3}s`,
            opacity: 0.5,
            boxShadow: "0 0 12px var(--neon)",
          }}
        />
      ))}
      <div className="relative animate-scale-in flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-neon-gradient blur-3xl opacity-40 animate-glow" />
          <Logo size="lg" variant="light" />
        </div>
        <div className="h-0.5 w-44 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-full bg-neon-gradient origin-left animate-[shimmer_1.5s_ease-out_forwards]" style={{ animation: "fade-in 1.6s ease-out, shimmer 2s linear infinite", backgroundSize: "200% 100%" }} />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Premium Mobile Experience</p>
      </div>
    </div>
  );
}
