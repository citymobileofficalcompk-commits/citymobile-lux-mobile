import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact City Mobile — Multan & DG Khan" },
      { name: "description", content: "Visit, call or WhatsApp City Mobile in Multan & DG Khan for premium mobiles, accessories and expert service." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">Get in Touch</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
          Contact <span className="text-gradient">City Mobile</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          We'd love to help. Reach us on WhatsApp, call our store or visit our locations.
        </p>
      </div>
      <Contact />
    </div>
  );
}
