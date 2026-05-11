import owner from "@/assets/owner.jpg";
import { Award, BadgeCheck, Heart } from "lucide-react";

export function AboutOwner() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-neon-gradient blur-3xl opacity-20 rounded-full" />
            <div className="relative rounded-3xl overflow-hidden shadow-elevated max-w-md mx-auto">
              <img src={owner} alt="Farrukh Ishaq Mastoi — Owner of City Mobile" loading="lazy" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute bottom-4 inset-x-4 rounded-2xl glass p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Founder & CEO</p>
                <p className="font-display text-lg font-bold">Farrukh Ishaq Mastoi</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">About the founder</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Built on trust. Driven by service.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Founded by <strong className="text-foreground">Farrukh Ishaq Mastoi</strong>, City Mobile has grown into one of South Punjab's most trusted destinations for premium smartphones and accessories. Our mission is simple — original products, fair prices, and after-sales service that earns lifelong customers.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { i: Award, t: "10+ Years", s: "Experience" },
                { i: BadgeCheck, t: "10K+", s: "Happy Buyers" },
                { i: Heart, t: "4.8★", s: "Customer Love" },
              ].map((x) => (
                <div key={x.s} className="rounded-2xl glass p-4 text-center">
                  <x.i className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-2 font-display font-extrabold">{x.t}</p>
                  <p className="text-xs text-muted-foreground">{x.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
