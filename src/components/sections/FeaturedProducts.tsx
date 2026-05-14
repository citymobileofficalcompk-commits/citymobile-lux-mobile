import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard";
import { SectionHeader } from "./Categories";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export function FeaturedProducts() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [premiumPicks, setPremiumPicks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        // Query bestsellers and premium picks in parallel with strict safety
        const [bestRes, premRes] = await Promise.all([
          supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .eq('is_bestseller', true)
            .order('created_at', { ascending: false })
            .limit(8),
          supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .eq('is_premium', true)
            .order('created_at', { ascending: false })
            .limit(8)
        ]);

        if (bestRes.error) {
          console.error("Homepage Bestseller Fetch Error:", bestRes.error);
        }
        if (premRes.error) {
          console.error("Homepage Premium Pick Fetch Error:", premRes.error);
        }

        setBestsellers(bestRes.data || []);
        setPremiumPicks(premRes.data || []);

      } catch (error) {
        console.error("Homepage Critical Fetch Error:", error);
        setBestsellers([]);
        setPremiumPicks([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Refreshing Inventory...</p>
      </div>
    );
  }

  return (
    <section className="relative py-14 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-6xl px-4">
        {/* Best Sellers Section */}
        <SectionHeader eyebrow="Must Have" title="Best Sellers" subtitle="Most popular devices this month" link="View All" />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {bestsellers?.map((p: any, i: number) => (
            <ProductCard key={p?.id || i} p={p} index={i} />
          ))}
        </div>

        {/* Premium Picks Section */}
        <div className="mt-20">
          <SectionHeader eyebrow="Elite Selection" title="Premium Picks" subtitle="The highest quality accessories" link="View All" />
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {premiumPicks?.map((p: any, i: number) => (
              <ProductCard key={p?.id || i} p={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
