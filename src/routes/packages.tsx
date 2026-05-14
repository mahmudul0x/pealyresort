import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import tentImg from "@/assets/tent-experience.jpg";
import cottageImg from "@/assets/cottage-river.jpg";
import roomImg from "@/assets/room-interior.jpg";
import cultureImg from "@/assets/culture-baul.jpg";
import boatImg from "@/assets/boat-tour.jpg";
import villageImg from "@/assets/village-life.jpg";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Pealy Eco Resort & Culture Centre" },
      { name: "description", content: "Friends, couple, family, tent, and cultural retreat packages — all-inclusive Sundarbans journeys with food, boat, and tours." },
      { property: "og:title", content: "Curated Packages" },
      { property: "og:description", content: "All-inclusive journeys, thoughtfully priced." },
      { property: "og:url", content: "/packages" },
      { property: "og:image", content: tentImg },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: PackagesPage,
});

const PACKAGES = [
  {
    name: "Friends Package", days: "2 Days · 1 Night", price: "৳ 3,500 / person", img: tentImg,
    incl: ["Welcome drink & snacks", "Friends house stay (shared)", "3 Bengali meals", "1 boat ride", "Bonfire & cultural night", "Pickup from Mongla"],
  },
  {
    name: "Couple Package", days: "2 Days · 1 Night", price: "৳ 5,800 / couple", img: cottageImg,
    incl: ["Private river-view cottage", "Candle-lit riverside dinner", "Sunset boat ride", "All Bengali meals", "Cultural evening", "Pickup & drop"],
  },
  {
    name: "Family Package", days: "3 Days · 2 Nights", price: "৳ 12,500 / family of 4", img: roomImg,
    incl: ["Two adjoining cottages", "Karamjal wildlife day-tour", "All meals + tea breaks", "Village walking tour", "Folk performance evening", "Pickup & drop"],
  },
  {
    name: "Tent Package", days: "1 Night Glamping", price: "৳ 2,800 / person", img: tentImg,
    incl: ["Riverside tent stay", "BBQ dinner under stars", "Morning boat ride", "Tea & breakfast", "Bonfire experience"],
  },
  {
    name: "Cultural Retreat", days: "3 Days · 2 Nights", price: "৳ 9,800 / person", img: cultureImg,
    incl: ["Eco wooden cottage", "Daily folk music sessions", "Baul artist workshop", "Village heritage tour", "Traditional Bengali feast", "All transfers"],
  },
];

function PackagesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="All-Inclusive Journeys"
        title="Packages built like memories."
        subtitle="Every package includes food, transfers, cultural programming, and a boat ride. No surprises — only stories."
        image={villageImg}
      />

      <section className="container-x py-24">
        <div className="grid gap-12">
          {PACKAGES.map((p, i) => (
            <article key={p.name} className="grid overflow-hidden rounded-md border border-border bg-card lg:grid-cols-12">
              <div className="relative lg:col-span-5">
                <img src={p.img} alt={p.name} loading="lazy" className="h-full min-h-[300px] w-full object-cover" />
                <div className="absolute left-5 top-5 rounded-full bg-forest/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-beige">
                  Pkg 0{i + 1}
                </div>
              </div>
              <div className="p-8 md:p-12 lg:col-span-7">
                <div className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.days}</div>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">{p.name}</h2>
                <ul className="mt-6 grid gap-3 text-sm md:grid-cols-2">
                  {p.incl.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-foreground/85">
                      <Check size={16} className="mt-0.5 shrink-0 text-mangrove" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Starting at</div>
                    <div className="font-display text-2xl text-forest">{p.price}</div>
                  </div>
                  <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-foreground hover:-translate-y-0.5 transition-transform">
                    Book this package <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x pb-32">
        <div className="rounded-md bg-forest p-12 text-center text-beige md:p-16">
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Custom Itinerary</div>
          <h3 className="mt-4 font-display text-3xl md:text-4xl">Need something tailored?</h3>
          <p className="mx-auto mt-4 max-w-xl text-beige/80">We design private journeys for honeymooners, photographers, families, and corporate retreats.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-foreground">
            Talk to a host <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <BoatStrip />
    </SiteLayout>
  );
}

function BoatStrip() {
  return (
    <div className="relative h-64 overflow-hidden">
      <img src={boatImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-forest/70" />
      <div className="container-x relative flex h-full items-center justify-center text-center text-beige">
        <p className="font-display text-2xl italic md:text-3xl">"Where the river leads, the soul follows."</p>
      </div>
    </div>
  );
}
