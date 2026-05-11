import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/site-data";
import { SectionHeader } from "./Categories";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="relative py-16">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader eyebrow="Help" title="Frequently Asked Questions" subtitle="Everything you need to know" />
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`rounded-2xl bg-card border transition-all ${isOpen ? "border-primary/30 shadow-soft" : "border-border/60"}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-3 p-5 text-left">
                  <span className="font-display font-semibold">{f.q}</span>
                  <span className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-neon-gradient text-white rotate-45 shadow-neon" : "bg-secondary text-foreground"}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className={`overflow-hidden transition-[max-height,opacity] duration-400 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
