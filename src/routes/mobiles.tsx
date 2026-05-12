import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/site-data";
import { useMemo, useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import * as Icons from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({ q: z.string().optional(), cat: z.string().optional() });

export const Route = createFileRoute("/mobiles")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — Premium Mobiles & Accessories | City Mobile" },
      { name: "description", content: "Browse adapters, chargers, headphones, AirPods, watches, mobiles & more at City Mobile. 100% original." },
    ],
  }),
  component: ShopPage,
});

// Real product categories (instruction-defined order)
const SHOP_CATEGORIES = [
  { slug: "all", name: "All", icon: "Sparkles" },
  { slug: "new-mobile", name: "Mobiles", icon: "Smartphone" },
  { slug: "adapter", name: "Adapter / Charger", icon: "Plug" },
  { slug: "headphones", name: "Headphones", icon: "Headset" },
  { slug: "buds", name: "Buds", icon: "Ear" },
  { slug: "airpods", name: "AirPods", icon: "Airplay" },
  { slug: "data-cable", name: "Data Cable", icon: "Cable" },
  { slug: "covers", name: "Covers", icon: "ShieldCheck" },
  { slug: "glass", name: "Glass", icon: "Square" },
  { slug: "3d-sheets", name: "3D Sheets", icon: "Layers" },
  { slug: "speakers", name: "Speakers", icon: "Speaker" },
  { slug: "mic", name: "Mic", icon: "Mic" },
  { slug: "lights", name: "Lights", icon: "Lightbulb" },
  { slug: "holders", name: "Holders", icon: "MonitorSmartphone" },
  { slug: "watch", name: "Watches", icon: "Watch" },
  { slug: "power-bank", name: "Power Banks", icon: "BatteryCharging" },
  { slug: "tablet", name: "Tablets", icon: "Tablet" },
  { slug: "games", name: "Games", icon: "Gamepad2" },
  { slug: "hand-free", name: "Hand Free", icon: "Headphones" },
];

void CATEGORIES;

function ShopPage() {
  const { q: initialQ, cat: initialCat } = Route.useSearch();
  const [query, setQuery] = useState(initialQ ?? "");
  const [active, setActive] = useState<string>(initialCat ?? "all");
  const tabsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (active !== "all" && p.category !== active) return false;
      if (q && !`${p.name} ${p.brand}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [active, query]);

  // Smoothly scroll active tab into view
  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLButtonElement>(`[data-cat="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const activeName = SHOP_CATEGORIES.find((c) => c.slug === active)?.name ?? "All";

  return (
    <div className="pt-24 pb-32">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">Shop</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
          Premium <span className="text-gradient">Collection</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Original mobiles & accessories — handpicked, premium quality, ready to ship.
        </p>

        {/* Search bar */}
        <div className="mt-6 relative glass rounded-2xl shadow-soft overflow-hidden">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full h-12 bg-transparent pl-11 pr-10 text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear" className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category tabs - horizontal scroll */}
        <div ref={tabsRef} className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          {SHOP_CATEGORIES.map((c) => {
            const Icon = (Icons as any)[c.icon] || Icons.Package;
            const isActive = active === c.slug;
            return (
              <button
                key={c.slug}
                data-cat={c.slug}
                onClick={() => setActive(c.slug)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-4 h-10 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "bg-neon-gradient text-white shadow-neon scale-[1.04]"
                    : "glass border border-border/60 hover:bg-accent"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Smooth product reveal */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> {activeName.toLowerCase()} product{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        <div
          key={active + query}
          className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-up"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.id} p={p} index={Math.min(i, 8)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl glass border border-border/60 p-10 text-center animate-fade-up">
            <p className="font-display text-lg font-bold">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try another category or clear your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
