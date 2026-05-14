import { Link } from "@tanstack/react-router";
import { Heart, Smartphone, Eye } from "lucide-react";
import { useState, useEffect } from "react";

const fmt = (n: number) => "Rs. " + (n || 0).toLocaleString("en-PK");

export function ProductCard({ p, index = 0 }: { p: any; index?: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const price = p.discounted_price || p.price;
  const oldPrice = p.base_price || p.oldPrice;
  const badge = p.discount_badge || p.badge;
  const off = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const image = p.images?.[0] || p.image;
  const slug = p.id; // Using ID as slug for simplicity

  // Load wishlist state from local storage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('citymobile_wishlist');
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
      setIsLiked(wishlist.includes(p.id));
    }
  }, [p.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const savedWishlist = localStorage.getItem('citymobile_wishlist');
    let wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

    if (isLiked) {
      wishlist = wishlist.filter((id: string) => id !== p.id);
    } else {
      wishlist.push(p.id);
    }

    localStorage.setItem('citymobile_wishlist', JSON.stringify(wishlist));
    setIsLiked(!isLiked);
  };

  return (
    <Link
      to="/product/$productSlug"
      params={{ productSlug: slug }}
      className="group relative rounded-3xl bg-card border border-border/60 overflow-hidden shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-transform duration-200 animate-fade-up block"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-secondary via-background to-accent overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-40" />
        {image ? (
          <img 
            src={image} 
            alt={p.name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary/30 group-hover:scale-110 transition-transform duration-500">
            <Smartphone className="h-24 w-24" strokeWidth={1} />
          </div>
        )}
        {(badge || off > 0) && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-neon-gradient text-white text-[10px] font-bold px-2.5 py-1 shadow-neon">
            {badge || `-${off}%`}
          </span>
        )}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 z-10 h-9 w-9 rounded-full glass flex items-center justify-center transition-all ${
            isLiked ? 'text-red-500 bg-white/90 scale-110' : 'text-slate-400 hover:bg-destructive hover:text-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{p.brand}</p>
        <h3 className="mt-0.5 font-display font-bold text-sm leading-tight line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
        {p.specs?.[0] && (
          <p className="mt-1 text-xs text-muted-foreground">{p.specs[0].value} · {p.specs[1]?.value}</p>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-base font-extrabold text-primary">{fmt(price)}</span>
          {oldPrice && oldPrice > price && <span className="text-xs text-muted-foreground line-through">{fmt(oldPrice)}</span>}
        </div>
        <div className="mt-3 w-full h-10 rounded-xl bg-foreground text-background text-sm font-semibold inline-flex items-center justify-center gap-2 group-hover:bg-primary transition-colors">
          <Eye className="h-3.5 w-3.5" /> View & Order
        </div>
      </div>
    </Link>
  );
}
