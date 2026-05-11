import { Sparkles } from "lucide-react";

export function Logo({ size = "md", variant = "default" }: { size?: "sm" | "md" | "lg"; variant?: "default" | "light" }) {
  const dim = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-14 w-14" : "h-10 w-10";
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg";
  const sub = size === "sm" ? "text-[8px]" : size === "lg" ? "text-xs" : "text-[10px]";

  return (
    <div className="flex items-center gap-2.5">
      <div className={`relative ${dim} shrink-0`}>
        <div className="absolute inset-0 rounded-2xl bg-neon-gradient blur-md opacity-70 animate-glow" />
        <div className="relative h-full w-full rounded-2xl bg-neon-gradient flex items-center justify-center shadow-neon">
          <Sparkles className="h-1/2 w-1/2 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <div className="leading-none">
        <div className={`font-display font-extrabold tracking-tight ${text} ${variant === "light" ? "text-white" : "text-foreground"}`}>
          CITY <span className="text-gradient">MOBILE</span>
        </div>
        <div className={`mt-0.5 font-medium uppercase tracking-[0.18em] ${sub} ${variant === "light" ? "text-white/60" : "text-muted-foreground"}`}>
          Premium Mobile Store
        </div>
      </div>
    </div>
  );
}
