import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import s1 from "@/assets/store-1.jpg";
import s2 from "@/assets/store-2.jpg";
import s3 from "@/assets/store-3.jpg";
import s4 from "@/assets/store-4.jpg";
import { SectionHeader } from "./Categories";

const SHOTS = [
  { src: s1, label: "Ritz Arcade · DHA Multan", span: "lg:col-span-2 lg:row-span-2" },
  { src: s2, label: "DHA Multan Entrance" },
  { src: s3, label: "Hall Road · DG Khan" },
  { src: s4, label: "Hall Road Storefront", span: "sm:col-span-2 lg:col-span-1" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Our spaces" title="Store Gallery" subtitle="Step inside our premium retail experience" />
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 sm:gap-4">
          {SHOTS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-3xl shadow-soft hover:shadow-elevated transition-all text-left ${s.span ?? ""}`}
            >
              <img src={s.src} alt={s.label} loading="lazy" className="h-full w-full object-cover aspect-square sm:aspect-[4/3] lg:aspect-auto group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute top-3 right-3 h-9 w-9 rounded-full glass-dark flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <p className="text-sm font-semibold">{s.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in" onClick={() => setActive(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          <button
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 h-11 w-11 rounded-full glass-dark text-white flex items-center justify-center hover:scale-110 transition z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative max-w-4xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img src={SHOTS[active].src} alt={SHOTS[active].label} className="w-full max-h-[85vh] object-contain rounded-2xl shadow-elevated" />
            <p className="mt-3 text-center text-white/90 font-semibold">{SHOTS[active].label}</p>
            <div className="mt-4 flex justify-center gap-2">
              {SHOTS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-14 w-14 rounded-xl overflow-hidden ring-2 transition ${i === active ? "ring-white" : "ring-white/30 opacity-60 hover:opacity-100"}`}
                >
                  <img src={s.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
