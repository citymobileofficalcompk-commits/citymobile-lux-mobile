import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { PHONES, EMAIL, SOCIALS, WHATSAPP } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative mt-20 bg-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-glow opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Logo size="md" variant="light" />
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Pakistan's trusted mobile & accessories store. Best quality, best prices, and best service in Multan & DG Khan.
            </p>
            <div className="mt-5 flex gap-2">
              <SocialBtn href={SOCIALS.instagram} label="Instagram"><Instagram className="h-4 w-4" /></SocialBtn>
              <SocialBtn href={SOCIALS.facebook} label="Facebook"><Facebook className="h-4 w-4" /></SocialBtn>
              <SocialBtn href={SOCIALS.tiktok} label="TikTok">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.07A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.9a4.79 4.79 0 0 1-1.84-.21Z"/></svg>
              </SocialBtn>
              <SocialBtn href={`https://wa.me/${WHATSAPP}`} label="WhatsApp"><MessageCircle className="h-4 w-4" /></SocialBtn>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/mobiles" className="hover:text-white transition">Shop</Link></li>
              <li><Link to="/offers" className="hover:text-white transition">Offers</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2.5"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-neon" /><span>Ritz Arcade, DHA Multan<br/>Hall Road, DG Khan</span></li>
              {PHONES.map((p) => (
                <li key={p} className="flex gap-2.5"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-neon" /><a href={`tel:${p.replace(/\D/g, "")}`} className="hover:text-white">{p}</a></li>
              ))}
              <li className="flex gap-2.5"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-neon" /><a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a></li>
              <li className="flex gap-2.5"><Clock className="h-4 w-4 mt-0.5 shrink-0 text-neon" /><span>Mon – Sun: 10AM – 10PM</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/60">
          <p>© {new Date().getFullYear()} City Mobile. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}
       className="h-10 w-10 flex items-center justify-center rounded-xl glass-dark hover:bg-neon-gradient hover:scale-110 transition-all duration-200 text-white">
      {children}
    </a>
  );
}
