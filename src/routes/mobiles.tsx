import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { useMemo, useState, useRef, useEffect } from "react";
import { Search, X, Loader2, Package } from "lucide-react";
import * as Icons from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({ q: z.string().optional(), cat: z.string().optional() });

export const Route = createFileRoute("/mobiles")({
  validateSearch: searchSchema,
  component: ShopPage,
});

const SHOP_CATEGORIES = [
  { slug: "all", name: "All", icon: "Sparkles" },
  { slug: "New Mobile", name: "Mobiles", icon: "Smartphone" },
  { slug: "Used Mobile", name: "Used Phones", icon: "RotateCw" },
  { slug: "Tablet", name: "Tablets", icon: "Tablet" },
  { slug: "Headphones", name: "Audio", icon: "Headphones" },
];

function ShopPage() {
  const { q: initialQ, cat: initialCat } = Route.useSearch();
  const [query, setQuery] = useState(initialQ ?? "");
  const [active, setActive] = useState<string>(initialCat ?? "all");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      let q = supabase.from('products').select('*').eq('is_active', true);
      
      if (active !== "all") {
        q = q.eq('category', active);
      }
      
      if (query.trim()) {
        q = q.ilike('name', `%${query}%`);
      }

      const { data } = await q.order('created_at', { ascending: false });
      if (data) setProducts(data);
      setIsLoading(false);
    }
    
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [active, query]);

  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLButtonElement>(`[data-cat="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const activeName = SHOP_CATEGORIES.find((c) => c.slug === active)?.name ?? "All";

  return (
    <div className="pt-24 pb-32 min-h-screen bg-white font-inter">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">Inventory</p>
        <h1 className="mt-2 text-4xl sm:text-6xl font-black text-[#001C4B] tracking-tight">
          Premium <span className="text-cyan-500 underline decoration-cyan-400/20 underline-offset-8">Store</span>
        </h1>
        <p className="mt-4 text-slate-500 max-w-xl text-sm font-medium">
          Original PTA-approved smartphones and accessories — handpicked quality, ready to ship nationwide.
        </p>

        {/* Search bar */}
        <div className="mt-8 relative bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden group focus-within:ring-2 focus-within:ring-cyan-400/50 transition-all">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search original products..."
            className="w-full h-14 bg-transparent pl-12 pr-12 text-sm outline-none font-medium text-[#001C4B]"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl bg-slate-200/50 hover:bg-slate-200 flex items-center justify-center transition">
              <X className="h-4 w-4 text-slate-500" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div ref={tabsRef} className="mt-6 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {SHOP_CATEGORIES.map((c) => {
            const Icon = (Icons as any)[c.icon] || Package;
            const isActive = active === c.slug;
            return (
              <button
                key={c.slug}
                data-cat={c.slug}
                onClick={() => setActive(c.slug)}
                className={`shrink-0 inline-flex items-center gap-2 px-6 h-12 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "bg-[#001C4B] text-white shadow-xl shadow-blue-900/20 scale-[1.05]"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {c.name}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <div className="py-32 flex flex-col items-center gap-4 animate-in fade-in">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Updating Catalog...</p>
          </div>
        ) : (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Found <span className="text-[#001C4B]">{products.length}</span> {activeName.toLowerCase()} items
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {products.map((p, i) => (
                <ProductCard key={p.id} p={p} index={i} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="mt-10 rounded-[3rem] bg-slate-50 border border-slate-100 p-20 text-center flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-soft">
                  <Package className="w-10 h-10 text-slate-200" />
                </div>
                <div>
                  <p className="text-xl font-black text-[#001C4B]">No products found</p>
                  <p className="mt-1 text-sm text-slate-400 font-medium">Try another category or refine your search.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
