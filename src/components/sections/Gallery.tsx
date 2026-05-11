import s1 from "@/assets/store-1.jpg";
import s2 from "@/assets/store-2.jpg";
import s3 from "@/assets/store-3.jpg";
import s4 from "@/assets/store-4.jpg";
import { SectionHeader } from "./Categories";

const SHOTS = [
  { src: s1, label: "Showroom · DHA Multan", span: "lg:col-span-2 lg:row-span-2" },
  { src: s2, label: "Display Counter" },
  { src: s3, label: "Premium Accessories" },
  { src: s4, label: "Repair Workshop", span: "sm:col-span-2 lg:col-span-1" },
];

export function Gallery() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Our spaces" title="Store Gallery" subtitle="Step inside our premium retail experience" />
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 sm:gap-4">
          {SHOTS.map((s, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-3xl shadow-soft hover:shadow-elevated transition-all ${s.span ?? ""}`}>
              <img src={s.src} alt={s.label} loading="lazy" className="h-full w-full object-cover aspect-square sm:aspect-[4/3] lg:aspect-auto group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <p className="text-sm font-semibold">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
