import { createFileRoute } from "@tanstack/react-router";
import { Flame, Sparkles, Tag } from "lucide-react";
import { PRODUCTS } from "@/lib/site-data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "New Offers & Hot Sale — Best Deals | City Mobile" },
      { name: "description", content: "Premium offers, hot sale and exclusive deals on the latest mobiles and accessories at City Mobile." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  const newOffers = PRODUCTS.filter((p) => p.badge === "New" || p.badge === "Hot").slice(0, 2);
  const hotSale = PRODUCTS.filter((p) => p.oldPrice && (p.oldPrice - p.price) / p.oldPrice >= 0.1).slice(0, 2);
  const featured = PRODUCTS.filter((p) => p.badge === "Best" || p.badge === "Premium").slice(0, 2);

  return (
    <div className="pt-24 pb-32">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-hero text-white p-8 sm:p-12 shadow-elevated">
          <div className="absolute inset-0 bg-glow opacity-60" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-neon-gradient blur-3xl opacity-40" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-neon" /> EXCLUSIVE OFFERS
            </div>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold leading-[1.05]">
              Premium <span className="text-gradient">Deals</span><br />Just For You
            </h1>
            <p className="mt-4 max-w-md text-white/75">Limited time offers on top brands — original products, premium prices.</p>
          </div>
        </div>

        <OfferSection
          eyebrow="Just Dropped"
          title="New Offers"
          icon={Sparkles}
          accent="neon"
          products={newOffers}
        />
        <OfferSection
          eyebrow="Limited Time"
          title="Hot Sale"
          icon={Flame}
          accent="hot"
          products={hotSale}
        />
        <OfferSection
          eyebrow="Editor's Choice"
          title="Featured Deals"
          icon={Tag}
          accent="primary"
          products={featured}
        />
      </div>
    </div>
  );
}

function OfferSection({ eyebrow, title, icon: Icon, products, accent }: { eyebrow: string; title: string; icon: any; products: any[]; accent: string }) {
  return (
    <section className="mt-14">
      <div className="flex items-center gap-3">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-neon ${accent === "hot" ? "bg-gradient-to-br from-[oklch(0.6_0.24_27)] to-[oklch(0.7_0.2_60)] animate-glow" : "bg-neon-gradient"}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">{eyebrow}</p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {products.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
      </div>
    </section>
  );
}
