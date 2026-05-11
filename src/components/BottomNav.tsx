import { Link, useLocation } from "@tanstack/react-router";
import { Home, LayoutGrid, Sparkles, Wrench, Phone } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/mobiles", label: "Categories", icon: LayoutGrid },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/contact", label: "Contact", icon: Phone },
];

export function BottomNav() {
  const loc = useLocation();
  const isActive = (to: string) =>
    to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(to);

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-3 inset-x-0 z-40 px-3 sm:px-4 pointer-events-none"
    >
      <div className="mx-auto max-w-md pointer-events-auto">
        <div className="relative">
          {/* Floating center button */}
          <Link
            to="/offers"
            aria-label="New Offers"
            className="absolute left-1/2 -translate-x-1/2 -top-7 z-10 group"
          >
            <span className="absolute inset-0 rounded-full bg-neon-gradient blur-md opacity-70 animate-glow" />
            <span className="absolute -inset-1 rounded-full border border-white/40 animate-pulse" />
            <span className="relative flex flex-col items-center justify-center h-16 w-16 rounded-full bg-neon-gradient text-white shadow-neon ring-4 ring-background group-hover:scale-105 group-active:scale-95 transition-transform">
              <Sparkles className="h-5 w-5" />
              <span className="text-[9px] font-bold mt-0.5">OFFERS</span>
            </span>
          </Link>

          <div className="glass rounded-2xl shadow-elevated px-2 py-2 flex items-center justify-between border border-border/50">
            {ITEMS.slice(0, 2).map((it) => (
              <NavItem key={it.to} {...it} active={isActive(it.to)} />
            ))}
            <div className="w-16 shrink-0" aria-hidden />
            {ITEMS.slice(2).map((it) => (
              <NavItem key={it.to} {...it} active={isActive(it.to)} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, label, icon: Icon, active }: any) {
  return (
    <Link
      to={to}
      className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 rounded-xl transition-all ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
    >
      <Icon className={`h-[18px] w-[18px] transition-transform ${active ? "scale-110" : ""}`} strokeWidth={active ? 2.4 : 2} />
      <span className={`text-[10px] font-semibold leading-none ${active ? "text-primary" : ""}`}>{label}</span>
    </Link>
  );
}
