import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/lib/site-data";

export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi City Mobile, I'd like to inquire about a product.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className={`fixed bottom-5 right-5 z-40 transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <span className="absolute inset-0 rounded-full bg-[oklch(0.66_0.17_150)] opacity-50 animate-ping" />
      <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[oklch(0.66_0.17_150)] text-white shadow-elevated hover:scale-110 transition-transform">
        <MessageCircle className="h-6 w-6" fill="white" strokeWidth={0} />
      </span>
    </a>
  );
}
