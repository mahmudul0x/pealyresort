import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useState } from "react";
import heroImg from "@/assets/hero-sundarbans.jpg";
import cottageImg from "@/assets/cottage-river.jpg";
import cultureImg from "@/assets/culture-baul.jpg";
import foodImg from "@/assets/food-bengali.jpg";
import boatImg from "@/assets/boat-tour.jpg";
import tentImg from "@/assets/tent-experience.jpg";
import wildlifeImg from "@/assets/wildlife-tiger.jpg";
import villageImg from "@/assets/village-life.jpg";
import roomImg from "@/assets/room-interior.jpg";
import { X } from "lucide-react";

const ALL = [
  { src: heroImg, cat: "Nature" },
  { src: boatImg, cat: "Tours" },
  { src: cottageImg, cat: "Resort" },
  { src: roomImg, cat: "Resort" },
  { src: tentImg, cat: "Resort" },
  { src: cultureImg, cat: "Culture" },
  { src: villageImg, cat: "Culture" },
  { src: wildlifeImg, cat: "Nature" },
  { src: foodImg, cat: "Food" },
  { src: heroImg, cat: "Nature" },
  { src: boatImg, cat: "Tours" },
  { src: cottageImg, cat: "Resort" },
];

const CATS = ["All", "Nature", "Resort", "Culture", "Tours", "Food"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Pealy Eco Resort" },
      { name: "description", content: "Photographs and footage from Pealy Eco Resort and the Sundarbans — cottages, culture, wildlife, and the river." },
      { property: "og:title", content: "Gallery" },
      { property: "og:url", content: "/gallery" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);
  const filtered = cat === "All" ? ALL : ALL.filter((i) => i.cat === cat);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Gallery"
        title="Through the lens of the river."
        subtitle="A visual diary from our forests, kitchens, courtyards, and quiet mornings."
        image={heroImg}
      />

      <section className="container-x py-24">
        <div className="flex flex-wrap justify-center gap-2 pb-12">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                cat === c
                  ? "border-forest bg-forest text-beige"
                  : "border-border text-foreground/70 hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img, i) => (
            <button
              key={i}
              onClick={() => setOpen(img.src)}
              className={`group relative overflow-hidden rounded-md ${i % 7 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
            >
              <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-forest/0 transition-colors group-hover:bg-forest/30" />
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm">
          <button onClick={() => setOpen(null)} className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white">
            <X size={18} />
          </button>
          <img src={open} alt="" className="max-h-[88vh] max-w-[92vw] rounded-md object-contain" />
        </div>
      )}
    </SiteLayout>
  );
}
