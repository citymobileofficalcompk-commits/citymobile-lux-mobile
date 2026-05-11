import { Link } from "@tanstack/react-router";
import { Heart, Smartphone, Eye } from "lucide-react";
import type { Product } from "@/lib/site-data";

const fmt = (n: number) => "Rs. " + n.toLocaleString("en-PK");

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const off = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  return (
    <Link
      to="/product/$productSlug"
      params={{ productSlug: p.slug }}
      className="group relative rounded-3xl bg-card border border-border/60 overflow-hidden shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 animate-fade-up block"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-secondary via-background to-accent overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-primary/30 group-hover:scale-110 transition-transform duration-500">
          <Smartphone className="h-24 w-24" strokeWidth={1} />
        </div>
        {(p.badge || off > 0) && (
          <span className="absolute top-3 left-3 rounded-full bg-neon-gradient text-white text-[10px] font-bold px-2.5 py-1 shadow-neon">
            {p.badge || `-${off}%`}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full glass flex items-center justify-center hover:bg-destructive hover:text-white transition-colors"
          aria-label="Wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{p.brand}</p>
        <h3 className="mt-0.5 font-display font-bold text-sm leading-tight line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
        {(p.ram || p.storage) && (
          <p className="mt-1 text-xs text-muted-foreground">{[p.ram, p.storage].filter(Boolean).join(" · ")}</p>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-base font-extrabold text-primary">{fmt(p.price)}</span>
          {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{fmt(p.oldPrice)}</span>}
        </div>
        <div className="mt-3 w-full h-10 rounded-xl bg-foreground text-background text-sm font-semibold inline-flex items-center justify-center gap-2 group-hover:bg-primary transition-colors">
          <Eye className="h-3.5 w-3.5" /> View & Order
        </div>
      </div>
    </Link>
  );
}
