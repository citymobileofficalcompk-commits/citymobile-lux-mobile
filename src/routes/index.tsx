import { createFileRoute } from "@tanstack/react-router";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Categories } from "@/components/sections/Categories";
import { DealOfTheDay } from "@/components/sections/DealOfTheDay";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Brands } from "@/components/sections/Brands";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "City Mobile — Premium Mobiles & Accessories Store in Pakistan" },
      { name: "description", content: "Shop original PTA-approved smartphones, premium accessories & expert mobile repair at City Mobile. Multan & DG Khan." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSlider />
      <TrustStrip />
      <Categories />
      <DealOfTheDay />
      <FeaturedProducts />
      <Brands />
      <Services />
      <Reviews />
      <Gallery />
      <FAQ />
      <Contact />
    </>
  );
}
