import heroPhone from "@/assets/hero-phone.jpg";
import { ArrowRight, Headphones, MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { WHATSAPP } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-soft" />
      <div className="absolute -top-40 -right-32 h-[500px] w-[500px] rounded-full bg-neon/30 blur-3xl opacity-50" />
      <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Copy */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium animate-fade-up">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Pakistan's Premium Mobile Store</span>
            </div>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight animate-fade-up" style={{ animationDelay: "80ms" }}>
              Your Trusted{" "}
              <span className="text-gradient">Mobile & Accessories</span>{" "}
              Store
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
              Original PTA-approved smartphones, premium accessories and certified repair services — delivered with luxury experience across Pakistan.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "240ms" }}>
              <Link to="/mobiles" className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-foreground text-background font-semibold shadow-elevated hover:scale-[1.02] active:scale-95 transition-transform">
                Shop Mobiles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/accessories" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl glass border border-foreground/10 font-semibold hover:bg-accent transition">
                <Headphones className="h-4 w-4" /> Explore Accessories
              </Link>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-[oklch(0.66_0.17_150)] text-white font-semibold shadow-soft hover:scale-[1.02] transition">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-8 grid grid-cols-3 gap-2 max-w-md mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "320ms" }}>
              {[
                { icon: ShieldCheck, label: "100% Original" },
                { icon: Zap, label: "Free Delivery" },
                { icon: Sparkles, label: "PTA Approved" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-1 rounded-2xl glass p-3 text-xs font-medium">
                  <t.icon className="h-4 w-4 text-primary" />
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 relative animate-scale-in">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 bg-neon-gradient blur-3xl opacity-30 rounded-full" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-elevated">
                <img
                  src={heroPhone}
                  alt="Featured premium smartphone — flagship floating with neon glow"
                  width={1280}
                  height={1280}
                  className="w-full aspect-square object-cover animate-float"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-bold">
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.66_0.17_150)] animate-pulse" /> NEW ARRIVAL
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl glass p-4">
                  <p className="text-xs text-muted-foreground">Featured Flagship</p>
                  <p className="font-display text-lg font-bold mt-0.5">Galaxy S24 Ultra · 12GB / 256GB</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-bold text-primary">Rs. 379,999</p>
                    <Link to="/mobiles" className="text-xs font-semibold text-primary inline-flex items-center gap-1">View <ArrowRight className="h-3 w-3" /></Link>
                  </div>
                </div>
              </div>
              {/* Floating chips */}
              <div className="absolute -left-4 top-1/3 hidden sm:block animate-float" style={{ animationDelay: "1s" }}>
                <div className="rounded-2xl glass p-3 shadow-soft text-xs">
                  <div className="font-bold">⚡ Same-day</div>
                  <div className="text-muted-foreground">Delivery</div>
                </div>
              </div>
              <div className="absolute -right-4 bottom-1/3 hidden sm:block animate-float" style={{ animationDelay: "2s" }}>
                <div className="rounded-2xl glass p-3 shadow-soft text-xs">
                  <div className="font-bold">🔒 Warranty</div>
                  <div className="text-muted-foreground">Official</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
