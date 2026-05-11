import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Mobile Repair, PTA Approval & More | City Mobile" },
      { name: "description", content: "Certified mobile repair, PTA approval, software solutions, screen replacement and data transfer — by expert technicians at City Mobile." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">Expertise</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight">Premium <span className="text-gradient">Services</span></h1>
        <p className="mt-3 text-muted-foreground max-w-xl">From repair to PTA approval, our certified team handles your device with care, speed and genuine parts.</p>
      </div>
      <Services />
      <Contact />
    </div>
  );
}
