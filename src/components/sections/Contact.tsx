import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { PHONES, WHATSAPP } from "@/lib/site-data";
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
      </div>
    </section>
  );
}
