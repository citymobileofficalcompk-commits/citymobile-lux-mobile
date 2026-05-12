import { Clock, MapPin, MessageCircle, Phone, Instagram, Facebook } from "lucide-react";
import { PHONES, WHATSAPP, SOCIALS } from "@/lib/site-data";
import { SectionHeader } from "./Categories";

const LOCATIONS = [
  { name: "Ritz Arcade — DHA Multan", address: "Ritz Arcade, DHA Multan, Pakistan" },
  { name: "Hall Road — DG Khan", address: "Hall Road, DG Khan, Pakistan" },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Get in touch" title="Visit or Contact Us" subtitle="We're open all 7 days · 10AM – 10PM" />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {LOCATIONS.map((l) => (
            <div key={l.name} className="rounded-3xl bg-card border border-border/60 shadow-soft overflow-hidden">
              <iframe
                title={l.name}
                src={`https://www.google.com/maps?q=${encodeURIComponent(l.address)}&output=embed`}
                className="w-full h-56 border-0"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {l.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{l.address}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-[oklch(0.66_0.17_150)] text-white text-sm font-semibold">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                  <a href={`tel:${PHONES[0].replace(/\D/g, "")}`} className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-foreground text-background text-sm font-semibold">
                    <Phone className="h-4 w-4" /> Call Us
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {PHONES.map((p) => (
            <a key={p} href={`tel:${p.replace(/\D/g, "")}`} className="flex items-center gap-3 rounded-2xl glass p-4 hover:bg-accent transition">
              <div className="h-10 w-10 rounded-xl bg-neon-gradient text-white flex items-center justify-center shadow-neon"><Phone className="h-4 w-4" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Call or WhatsApp</p>
                <p className="font-semibold">{p}</p>
              </div>
            </a>
          ))}
          <div className="flex items-center gap-3 rounded-2xl glass p-4">
            <div className="h-10 w-10 rounded-xl bg-neon-gradient text-white flex items-center justify-center shadow-neon"><Clock className="h-4 w-4" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Working hours</p>
              <p className="font-semibold">Mon – Sun · 10AM – 10PM</p>
            </div>
          </div>
        </div>

        {/* Premium social icons */}
        <div className="mt-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Follow Us</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <SocialIcon href={SOCIALS.instagram} label="Instagram" gradient="from-[#feda75] via-[#d62976] to-[#4f5bd5]">
              <Instagram className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href={SOCIALS.facebook} label="Facebook" gradient="from-[#1877f2] to-[#0a52c4]">
              <Facebook className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href={SOCIALS.tiktok} label="TikTok" gradient="from-[#25F4EE] via-black to-[#FE2C55]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.07A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.9a4.79 4.79 0 0 1-1.84-.21Z"/></svg>
            </SocialIcon>
            <SocialIcon href={`https://wa.me/${WHATSAPP}`} label="WhatsApp" gradient="from-[#25D366] to-[#128C7E]">
              <MessageCircle className="h-5 w-5" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ href, label, gradient, children }: { href: string; label: string; gradient: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`group relative h-12 w-12 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-soft hover:scale-110 hover:shadow-elevated active:scale-95 transition-all duration-200`}
    >
      <span className="absolute inset-0 rounded-full ring-1 ring-white/30" />
      {children}
    </a>
  );
}
