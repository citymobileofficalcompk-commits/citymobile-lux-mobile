import { BRANDS } from "@/lib/site-data";
import { SectionHeader } from "./Categories";

export function Brands() {
  const loop = [...BRANDS, ...BRANDS];
  return (
    <section className="relative py-14 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Trusted" title="Top Brands" subtitle="Authorized partners we proudly stock" />
      </div>
      <div className="mt-8 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-4 animate-marquee w-max">
          {loop.map((b, i) => (
            <div key={i} className="shrink-0 w-36 h-20 rounded-2xl glass border border-border/60 flex items-center justify-center font-display font-bold text-lg text-foreground/80 hover:text-primary hover:border-primary/40 hover:shadow-neon transition-all">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
