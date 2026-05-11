import * as Icons from "lucide-react";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { SERVICES, WHATSAPP } from "@/lib/site-data";
import { SectionHeader } from "./Categories";

export function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="What we offer" title="Premium Services" subtitle="Tap any service to learn more" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = (Icons as any)[s.icon] || Icons.Wrench;
            const isOpen = open === s.slug;
            const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi City Mobile, I'd like to inquire about your ${s.title} service.`)}`;
            return (
              <div
                key={s.slug}
                className={`group relative rounded-3xl bg-card border p-6 shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-up overflow-hidden ${isOpen ? "border-primary/40 shadow-elevated" : "border-border/60"}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-neon-gradient opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500" />

                <button
                  onClick={() => setOpen(isOpen ? null : s.slug)}
                  className="relative w-full text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-neon/15 flex items-center justify-center text-primary group-hover:bg-neon-gradient group-hover:text-white group-hover:shadow-neon transition-all shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                </button>

                <div className={`grid transition-all duration-400 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-foreground/80 pb-4 border-t border-border/60 pt-4">{s.long}</p>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noreferrer"
                      className="relative inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-neon-gradient text-white font-semibold shadow-neon hover:scale-[1.02] active:scale-95 transition-transform overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors" />
                      <MessageCircle className="h-4 w-4" /> Contact Us on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
