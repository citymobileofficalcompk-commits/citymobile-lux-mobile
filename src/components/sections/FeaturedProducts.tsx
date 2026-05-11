import { ProductCard } from "../ProductCard";
import { ACCESSORIES, PRODUCTS } from "@/lib/site-data";
import { SectionHeader } from "./Categories";

export function FeaturedProducts() {
  return (
    <section className="relative py-14 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Bestsellers" title="Featured Smartphones" subtitle="Handpicked flagship devices" link="View All" />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {PRODUCTS.slice(0, 4).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>

        <div className="mt-16">
          <SectionHeader eyebrow="Premium Picks" title="Best Selling Accessories" subtitle="Audio, charging & protection" link="View All" />
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {ACCESSORIES.slice(0, 4).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
