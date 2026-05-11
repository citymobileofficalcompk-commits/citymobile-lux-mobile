import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/site-data";
import { SectionHeader } from "./Categories";

export function Services() {
  return (
    <section id="services" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="What we offer" title="Premium Services" subtitle="Certified technicians, genuine parts" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = (Icons as any)[s.icon] || Icons.Wrench;
            return (
              <div
                key={s.title}
                className="group relative rounded-3xl bg-card border border-border/60 p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 animate-fade-up overflow-hidden"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-neon-gradient opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500" />
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-neon/15 flex items-center justify-center text-primary group-hover:bg-neon-gradient group-hover:text-white group-hover:shadow-neon transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-bold">{s.title}</h3>
                <p className="relative mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                <div className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
