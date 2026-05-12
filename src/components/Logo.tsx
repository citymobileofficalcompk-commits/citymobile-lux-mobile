import logoImg from "@/assets/logo.jpg";

export function Logo({
  size = "md",
  variant = "default",
  showText = true,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "light";
  showText?: boolean;
}) {
  const dim =
    size === "sm" ? "h-9 w-9" : size === "lg" ? "h-16 w-16" : size === "xl" ? "h-24 w-24" : "h-11 w-11";
  const text =
    size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : size === "xl" ? "text-3xl" : "text-base";
  const sub =
    size === "sm" ? "text-[8px]" : size === "lg" ? "text-xs" : size === "xl" ? "text-[13px]" : "text-[10px]";

  return (
    <div className="flex items-center gap-2.5">
      <div className={`relative ${dim} shrink-0`}>
        <div className="absolute inset-0 rounded-2xl bg-neon-gradient blur-md opacity-60 animate-glow" />
        <div className="relative h-full w-full rounded-2xl overflow-hidden ring-1 ring-white/30 shadow-neon bg-white">
          <img src={logoImg} alt="City Mobile" className="h-full w-full object-cover" loading="eager" />
        </div>
      </div>
      {showText && (
        <div className="leading-none">
          <div className={`font-display font-extrabold tracking-tight ${text} ${variant === "light" ? "text-white" : "text-foreground"}`}>
            CITY <span className="text-gradient">MOBILE</span>
          </div>
          <div className={`mt-0.5 font-medium uppercase tracking-[0.18em] ${sub} ${variant === "light" ? "text-white/60" : "text-muted-foreground"}`}>
            Premium Mobile Store
          </div>
        </div>
      )}
    </div>
  );
}
