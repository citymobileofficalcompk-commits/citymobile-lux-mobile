import { useEffect, useState } from "react";
import { WHATSAPP } from "@/lib/site-data";

export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi City Mobile, I'd like to inquire about a product.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className={`fixed bottom-24 right-4 z-30 transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping" />
      <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-elevated hover:scale-110 transition-transform">
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.715.315-.515.515-.844 1.39-.844 2.092 0 .8.272 1.582.557 2.32.93 2.39 3.255 5.1 5.7 6.1.49.2 1.054.347 1.6.347.673 0 1.376-.13 1.776-.526.273-.273.515-.7.515-1.087 0-.272-.114-.515-.32-.687-.473-.4-1.08-.625-1.62-.83l-.146-.057zM16 .5C7.45.5.5 7.45.5 16c0 2.85.788 5.55 2.16 7.85l-1.86 6.65 6.85-1.79c2.21 1.22 4.74 1.79 7.35 1.79 8.55 0 15.5-6.95 15.5-15.5S24.55.5 16 .5zm0 28.43c-2.42 0-4.79-.62-6.84-1.81l-.49-.29-5.07 1.32 1.36-4.94-.32-.51A12.86 12.86 0 0 1 3.07 16C3.07 8.85 8.85 3.07 16 3.07S28.93 8.85 28.93 16 23.15 28.93 16 28.93z"/>
        </svg>
      </span>
    </a>
  );
}
