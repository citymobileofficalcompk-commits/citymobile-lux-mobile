import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { BRANDS, PRODUCTS } from "@/lib/site-data";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Tag, X } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/mobiles")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Mobiles — Original PTA Approved Smartphones | City Mobile" },
      { name: "description", content: "Browse iPhones, Samsung, Xiaomi, Vivo, Oppo & Realme smartphones at City Mobile. 100% original & PTA approved." },
    ],
  }),
  component: MobilesPage,
});

const PRICE_BUCKETS = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "u50", label: "Under 50K", min: 0, max: 50000 },
  { id: "50-150", label: "50K – 150K", min: 50000, max: 150000 },
  { id: "150-300", label: "150K – 300K", min: 150000, max: 300000 },
  { id: "300+", label: "300K+", min: 300000, max: Infinity },
];

function MobilesPage() {
  const { q: initialQ } = Route.useSearch();
  const [query, setQuery] = useState(initialQ ?? "");
  const [brand, setBrand] = useState<string>("All");
  const [price, setPrice] = useState<string>("all");
  const [offersOnly, setOffersOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const mobiles = useMemo(
    () => PRODUCTS.filter((p) => p.category === "new-mobile" || p.category === "used-mobile"),
    [],
  );

  const filtered = useMemo(() => {
    const bucket = PRICE_BUCKETS.find((b) => b.id === price)!;
    const q = query.trim().toLowerCase();
    return mobiles.filter((p) => {
      if (brand !== "All" && p.brand !== brand) return false;
      if (p.price < bucket.min || p.price > bucket.max) return false;
      if (offersOnly && !p.oldPrice) return false;
      if (q && !`${p.name} ${p.brand}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [mobiles, brand, price, offersOnly, query]);

  const activeCount = (brand !== "All" ? 1 : 0) + (price !== "all" ? 1 : 0) + (offersOnly ? 1 : 0);

  return (
    <div className="pt-24 pb-32">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">Catalog</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight">Premium <span className="text-gradient">Smartphones</span></h1>
        <p className="mt-3 text-muted-foreground max-w-xl">Handpicked flagship and mid-range devices — every phone is original, PTA approved and comes with official warranty.</p>

        {/* Premium search bar */}
        <div className="mt-6 flex gap-2">
          <div className="relative flex-1 glass rounded-2xl shadow-soft overflow-hidden">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search iPhone, Samsung, Xiaomi…"
              className="w-full h-12 bg-transparent pl-11 pr-10 text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`relative h-12 px-4 rounded-2xl font-semibold text-sm inline-flex items-center gap-2 transition ${filtersOpen ? "bg-neon-gradient text-white shadow-neon" : "glass border border-border/60"}`}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
            {activeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center">{activeCount}</span>
            )}
          </button>
        </div>

        {/* Filters panel */}
        <div className={`grid transition-all duration-300 ${filtersOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="rounded-2xl glass border border-border/60 p-4 space-y-4">
              <FilterGroup label="Brand">
                {["All", ...BRANDS.map((b) => b.name)].map((b) => (
                  <Chip key={b} active={brand === b} onClick={() => setBrand(b)}>{b}</Chip>
                ))}
              </FilterGroup>
              <FilterGroup label="Price">
                {PRICE_BUCKETS.map((b) => (
                  <Chip key={b.id} active={price === b.id} onClick={() => setPrice(b.id)}>{b.label}</Chip>
                ))}
              </FilterGroup>
              <FilterGroup label="Offers">
                <Chip active={offersOnly} onClick={() => setOffersOnly((v) => !v)}>
                  <Tag className="h-3 w-3" /> On Sale Only
                </Chip>
                {(activeCount > 0 || query) && (
                  <button
                    onClick={() => { setBrand("All"); setPrice("all"); setOffersOnly(false); setQuery(""); }}
                    className="ml-auto text-xs font-semibold text-primary hover:underline"
                  >
                    Reset all
                  </button>
                )}
              </FilterGroup>
            </div>
          </div>
        </div>

        {/* Quick brand chips */}
        {!filtersOpen && (
          <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {["All", ...BRANDS.map((b) => b.name)].map((b) => (
              <button key={b} onClick={() => setBrand(b)} className={`shrink-0 px-4 h-10 rounded-full text-sm font-semibold transition-all ${brand === b ? "bg-foreground text-background shadow-soft" : "glass border border-border/60 hover:bg-accent"}`}>
                {b}
              </button>
            ))}
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground">{filtered.length} product{filtered.length === 1 ? "" : "s"} found</p>

        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl glass border border-border/60 p-10 text-center">
            <p className="font-display text-lg font-bold">No products match your filters</p>
            <p className="mt-1 text-sm text-muted-foreground">Try clearing filters or searching for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">{label}</p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-semibold transition-all ${active ? "bg-neon-gradient text-white shadow-neon" : "bg-card border border-border/60 hover:bg-accent"}`}
    >
      {children}
    </button>
  );
}
