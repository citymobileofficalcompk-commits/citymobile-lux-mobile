import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Sparkles, Tag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "New Offers & Hot Sale — Best Deals | City Mobile" },
      { name: "description", content: "Premium offers, hot sale and exclusive deals on the latest mobiles and accessories at City Mobile." },
    ],
  }),
  loader: async () => {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .or('discount_badge.neq.null,discounted_price.lt.base_price');
    return { products: products || [] };
  },
  component: OffersPage,
});

function OffersPage() {
  const { products } = Route.useLoaderData();

  return (
    <div className="pt-24 pb-32">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="relative overflow-hidden rounded-[3rem] bg-[#001C4B] text-white p-8 sm:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-400 blur-3xl opacity-20" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="h-4 w-4 text-cyan-400" /> LIVE OFFERS
            </div>
            <h1 className="mt-6 font-display text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Premium <span className="text-cyan-400">Deals</span><br />Available Now
            </h1>
            <p className="mt-4 max-w-md text-slate-400 font-medium text-base">Grab original products at discounted prices. Limited stock available.</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="mt-20 text-center py-20 bg-slate-50 rounded-[3rem] border border-slate-100">
            <Tag className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#001C4B]">No offers available right now</h3>
            <p className="text-slate-400 mt-2">Check back later for exclusive deals and discounts.</p>
            <Link to="/" className="inline-block mt-6 px-8 py-3 bg-[#001C4B] text-white rounded-full font-bold text-sm">Back to Home</Link>
          </div>
        ) : (
          <div className="mt-14 space-y-20">
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-500">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Hot Sale</p>
                    <h2 className="text-2xl font-black text-[#001C4B]">Active Discounts</h2>
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {products.length} Items Found
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
