import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, MessageCircle, ShieldCheck, Smartphone, Star, Truck } from "lucide-react";
import { findProductBySlug, productsByCategory, WHATSAPP } from "@/lib/site-data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$productSlug")({
  head: ({ params }) => {
    const p = findProductBySlug(params.productSlug);
    const title = p ? `${p.name} — Buy Online | City Mobile` : "Product | City Mobile";
    const desc = p?.description ?? "Order premium mobiles & accessories from City Mobile.";
    return { meta: [{ title }, { name: "description", content: desc }] };
  },
  loader: ({ params }) => {
    const product = findProductBySlug(params.productSlug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="pt-32 pb-20 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Link to="/" className="text-primary mt-4 inline-block">Back home</Link>
    </div>
  ),
});

const fmt = (n: number) => "Rs. " + n.toLocaleString("en-PK");

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const related = useMemo(
    () => productsByCategory(p.category).filter((x) => x.id !== p.id).slice(0, 4),
    [p]
  );
  const off = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  const [form, setForm] = useState({
    name: "", phone: "", city: "", address: "", quantity: 1, notes: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `*New Order — City Mobile*\n\n` +
      `*Product:* ${p.name}\n` +
      `*Price:* ${fmt(p.price)}\n` +
      `*Quantity:* ${form.quantity}\n\n` +
      `*Customer Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*City:* ${form.city}\n` +
      `*Address:* ${form.address}\n` +
      `*Notes:* ${form.notes || "—"}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="pt-24 pb-32">
      <div className="mx-auto max-w-6xl px-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mt-4 grid lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-secondary via-background to-accent overflow-hidden shadow-elevated">
              <div className="absolute inset-0 bg-glow opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center text-primary/30 animate-float">
                <Smartphone className="h-48 w-48" strokeWidth={1} />
              </div>
              {(p.badge || off > 0) && (
                <span className="absolute top-4 left-4 rounded-full bg-neon-gradient text-white text-xs font-bold px-3 py-1.5 shadow-neon">
                  {p.badge || `-${off}%`}
                </span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-primary/30 border border-border/60 hover:border-primary/40 transition cursor-pointer">
                  <Smartphone className="h-8 w-8" strokeWidth={1} />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">{p.brand}</p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">{p.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <div className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
              <span className="text-muted-foreground">(4.9 · 250+ reviews)</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold text-primary">{fmt(p.price)}</span>
              {p.oldPrice && <span className="text-base text-muted-foreground line-through">{fmt(p.oldPrice)}</span>}
              {off > 0 && <span className="text-xs font-bold text-[oklch(0.66_0.17_150)]">Save {off}%</span>}
            </div>

            {p.description && <p className="mt-5 text-foreground/80 leading-relaxed">{p.description}</p>}

            {p.features && p.features.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-[oklch(0.66_0.17_150)] mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                { i: ShieldCheck, t: "PTA Approved" },
                { i: Truck, t: "Free Delivery" },
                { i: Star, t: "Warranty" },
              ].map((x) => (
                <div key={x.t} className="flex flex-col items-center gap-1 rounded-2xl glass p-3 text-xs font-medium">
                  <x.i className="h-4 w-4 text-primary" />
                  <span>{x.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order form */}
        <div className="mt-12 relative overflow-hidden rounded-3xl bg-hero text-white shadow-elevated">
          <div className="absolute inset-0 bg-glow opacity-50" />
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-neon-gradient blur-3xl opacity-30" />
          <div className="relative p-6 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-bold">
              <MessageCircle className="h-3.5 w-3.5 text-neon" /> ORDER NOW
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold">Place Your Order</h2>
            <p className="mt-1.5 text-sm text-white/70">Fill the form — we'll confirm on WhatsApp instantly.</p>

            <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Customer Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Phone Number" required type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <Field label="City" required value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
              <Field label="Quantity" required type="number" min={1} value={String(form.quantity)} onChange={(v) => setForm({ ...form, quantity: Math.max(1, Number(v) || 1) })} />
              <div className="sm:col-span-2">
                <Field label="Product" value={p.name} disabled onChange={() => {}} />
              </div>
              <div className="sm:col-span-2">
                <Field label="Address" required value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">Notes (optional)</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="mt-1.5 w-full rounded-xl glass-dark px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-neon"
                  placeholder="Color, model preference, etc."
                />
              </div>

              <button
                type="submit"
                className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 h-14 rounded-2xl bg-neon-gradient text-white text-base font-bold shadow-neon hover:scale-[1.02] active:scale-95 transition-transform"
              >
                <MessageCircle className="h-5 w-5" /> ORDER NOW VIA WHATSAPP
              </button>
            </form>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-extrabold">You May Also Like</h2>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {related.map((r, i) => <ProductCard key={r.id} p={r} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, disabled, min }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; disabled?: boolean; min?: number }) {
  return (
    <div>
      <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">{label}{required && <span className="text-neon"> *</span>}</label>
      <input
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full h-12 rounded-xl glass-dark px-4 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-neon disabled:opacity-70"
      />
    </div>
  );
}
