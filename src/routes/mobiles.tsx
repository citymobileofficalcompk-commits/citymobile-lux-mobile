import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { BRANDS, PRODUCTS } from "@/lib/site-data";
import { useState } from "react";

export const Route = createFileRoute("/mobiles")({
  head: () => ({
    meta: [
      { title: "Mobiles — Original PTA Approved Smartphones | City Mobile" },
      { name: "description", content: "Browse the latest iPhones, Samsung, Xiaomi, Vivo, Oppo & Realme smartphones at City Mobile. 100% original & PTA approved." },
    ],
  }),
  component: MobilesPage,
});

function MobilesPage() {
  const [active, setActive] = useState<string>("All");
  const mobiles = PRODUCTS.filter((p) => p.category === "new-mobile" || p.category === "used-mobile");
  const filtered = active === "All" ? mobiles : mobiles.filter((p) => p.brand === active);

  return (
    <div className="pt-24 pb-32">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">Catalog</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight">Premium <span className="text-gradient">Smartphones</span></h1>
        <p className="mt-3 text-muted-foreground max-w-xl">Handpicked flagship and mid-range devices — every phone is original, PTA approved and comes with official warranty.</p>

        {/* Brand filter */}
        <div className="mt-6 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {["All", ...BRANDS.map((b) => b.name)].map((b) => (
            <button key={b} onClick={() => setActive(b)} className={`shrink-0 px-4 h-10 rounded-full text-sm font-semibold transition-all ${active === b ? "bg-foreground text-background shadow-soft" : "glass border border-border/60 hover:bg-accent"}`}>
              {b}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
