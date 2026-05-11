import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { ACCESSORIES } from "@/lib/site-data";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — Premium Mobile Accessories | City Mobile" },
      { name: "description", content: "AirPods, smart watches, chargers, covers, speakers and more — original premium accessories at City Mobile." },
    ],
  }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">Catalog</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight">Premium <span className="text-gradient">Accessories</span></h1>
        <p className="mt-3 text-muted-foreground max-w-xl">Audio, charging, protection and lifestyle accessories — only originals, sourced from authorized partners.</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {ACCESSORIES.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
