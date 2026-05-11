import { TRUST } from "@/lib/site-data";

export function TrustStrip() {
  return (
    <section className="relative -mt-2 pb-2">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-hero text-white shadow-elevated overflow-hidden relative">
          <div className="absolute inset-0 bg-glow opacity-50" />
          <div className="relative grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {TRUST.map((t) => (
              <div key={t.label} className="p-5 sm:p-7 text-center">
                <p className="font-display text-2xl sm:text-3xl font-extrabold">{t.value}</p>
                <p className="mt-1 text-xs sm:text-sm text-white/70">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
