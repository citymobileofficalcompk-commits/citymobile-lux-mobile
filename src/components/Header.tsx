import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X, Search, Phone, Home, Smartphone, Headphones, Wrench, Star, HelpCircle, MessageCircle, Info, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { WHATSAPP } from "@/lib/site-data";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/mobiles", label: "Mobiles", icon: Smartphone },
  { to: "/accessories", label: "Accessories", icon: Headphones },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/offers", label: "Offers", icon: Sparkles },
  { to: "/about", label: "About", icon: Info },
];

const MENU_EXTRA = [
  { to: "/#reviews", label: "Reviews", icon: Star },
  { to: "/#faqs", label: "FAQs", icon: HelpCircle },
  { to: "/contact", label: "Contact", icon: MessageCircle },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setSearchOpen(false); }, [loc.pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    navigate({ to: "/mobiles", search: q ? { q } as any : undefined });
  };

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <div className="mx-auto max-w-6xl px-3">
          <div className={`glass rounded-2xl px-3 py-2.5 flex items-center justify-between gap-2 ${scrolled ? "shadow-soft" : ""}`}>
            <Link to="/" className="flex items-center">
              <Logo size="sm" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                  activeProps={{ className: "px-3 py-2 rounded-xl text-sm font-semibold text-primary bg-primary/8" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors"
                aria-label="Search products"
              >
                <Search className="h-4 w-4" />
              </button>
              <button onClick={() => setOpen(true)} className="h-10 w-10 flex items-center justify-center rounded-xl bg-neon-gradient text-white shadow-neon hover:scale-105 active:scale-95 transition-transform" aria-label="Menu">
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <div className={`fixed inset-0 z-[70] transition-opacity duration-300 ${searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
        <div className="relative mx-auto max-w-2xl px-4 pt-24">
          <form onSubmit={submitSearch} className="glass rounded-2xl shadow-elevated p-2 flex items-center gap-2 animate-scale-in">
            <Search className="ml-3 h-5 w-5 text-muted-foreground" />
            <input
              autoFocus={searchOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search iPhone, Samsung, AirPods, covers…"
              className="flex-1 bg-transparent outline-none px-2 py-3 text-sm placeholder:text-muted-foreground"
            />
            <button type="submit" className="h-10 px-4 rounded-xl bg-neon-gradient text-white text-sm font-semibold shadow-neon">Search</button>
            <button type="button" onClick={() => setSearchOpen(false)} className="h-10 w-10 flex items-center justify-center rounded-xl bg-foreground/5 hover:bg-foreground/10">
              <X className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {["iPhone 15", "Samsung S24", "AirPods", "Smart Watch", "Cover", "Charger"].map((t) => (
              <button key={t} onClick={() => { setQuery(t); }} className="px-3 py-1.5 rounded-full glass text-xs font-semibold hover:bg-accent">
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide-in menu */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-150 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside className={`absolute top-0 right-0 h-full w-[88%] max-w-sm bg-card glass shadow-elevated transition-transform duration-200 ease-out will-change-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-5 border-b flex items-center justify-between">
            <Logo size="sm" />
            <button onClick={() => setOpen(false)} className="h-9 w-9 flex items-center justify-center rounded-xl bg-foreground/5 hover:bg-foreground/10">
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="p-3 flex flex-col gap-1 overflow-y-auto max-h-[calc(100%-180px)]">
            {[...NAV, ...MENU_EXTRA].map((n, i) => {
              const Icon = n.icon;
              const isHash = n.to.includes("#");
              const Comp: any = isHash ? "a" : Link;
              const props: any = isHash ? { href: n.to } : { to: n.to };
              return (
                <Comp
                  key={n.to}
                  {...props}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-accent transition-all animate-fade-up"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <span className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-neon-gradient group-hover:text-white transition-all">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{n.label}</span>
                </Comp>
              );
            })}
          </nav>
          <div className="absolute bottom-0 inset-x-0 p-5 border-t bg-card/80">
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-neon-gradient text-white font-semibold shadow-neon">
              <Phone className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
