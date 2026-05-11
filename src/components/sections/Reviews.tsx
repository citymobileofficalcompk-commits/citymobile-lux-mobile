import { useEffect, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/lib/site-data";
import { SectionHeader } from "./Categories";

export function Reviews() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % REVIEWS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="reviews" className="relative py-16 bg-gradient-to-b from-secondary/30 to-background">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Loved by thousands" title="What Our Customers Say" subtitle="Real stories from happy buyers" />

        <div className="mt-10 relative">
          <div className="overflow-hidden rounded-3xl">
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
              {REVIEWS.map((r) => (
                <div key={r.name} className="w-full shrink-0 px-1">
                  <div className="rounded-3xl bg-card border border-border/60 shadow-soft p-7 sm:p-10 relative overflow-hidden">
                    <Quote className="absolute top-6 right-6 h-16 w-16 text-primary/8" />
                    <div className="flex gap-1 text-[oklch(0.78_0.18_85)]">
                      {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                    </div>
                    <p className="mt-5 text-lg sm:text-xl font-display leading-relaxed text-foreground/90">"{r.text}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-neon-gradient flex items-center justify-center text-white font-bold shadow-neon">
                        {r.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => setI((i - 1 + REVIEWS.length) % REVIEWS.length)} className="h-10 w-10 rounded-full glass border border-border/60 flex items-center justify-center hover:bg-accent" aria-label="Prev">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {REVIEWS.map((_, k) => (
                <button key={k} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-neon-gradient" : "w-1.5 bg-foreground/15"}`} aria-label={`Slide ${k + 1}`} />
              ))}
            </div>
            <button onClick={() => setI((i + 1) % REVIEWS.length)} className="h-10 w-10 rounded-full glass border border-border/60 flex items-center justify-center hover:bg-accent" aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
