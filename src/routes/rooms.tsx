import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { ROOMS } from "@/lib/rooms-data";
import roomImg from "@/assets/room-interior.jpg";
import { Bed, Users, Wifi, Wind, Bath, Trees, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Accommodation — Pealy Eco Resort" },
      { name: "description", content: "Riverside cottages, eco-wooden houses, and luxury tent stays in the Sundarbans. Rates from ৳3,500/night." },
      { property: "og:title", content: "Rooms & Accommodation" },
      { property: "og:description", content: "Five styles of stay, each handcrafted and locally rooted." },
      { property: "og:url", content: "/rooms" },
      { property: "og:image", content: roomImg },
    ],
    links: [{ rel: "canonical", href: "/rooms" }],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Stay With Us"
        title="Rooms shaped by river, wood, and quiet."
        subtitle="Every cottage is built by local craftsmen using reclaimed timber and natural fibres."
        image={roomImg}
      />

      <section className="container-x py-24">
        <div className="space-y-20">
          {ROOMS.map((r, i) => (
            <article key={r.slug} className="grid items-center gap-10 lg:grid-cols-12">
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <Link to="/rooms/$slug" params={{ slug: r.slug }} className="block">
                  <div className="relative overflow-hidden rounded-md">
                    <img src={r.img} alt={r.name} loading="lazy" className="h-[480px] w-full object-cover transition-transform duration-[1500ms] hover:scale-105" />
                    <div className="absolute left-5 top-5 rounded-full bg-card/80 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-forest">{r.size} · {r.view}</div>
                  </div>
                </Link>
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                <div className="text-[11px] uppercase tracking-[0.32em] text-gold">0{i + 1} · Accommodation</div>
                <h2 className="mt-4 font-display text-4xl text-balance md:text-5xl">{r.name}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{r.desc}</p>
                <ul className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <Feat Icon={Users} t={r.occ} />
                  <Feat Icon={Bath} t={r.bath} />
                  <Feat Icon={Wind} t={r.ac} />
                  <Feat Icon={Wifi} t="Wi-Fi in lounge" />
                  <Feat Icon={Bed} t="Hand-loomed linens" />
                  <Feat Icon={Trees} t="Eco-built" />
                </ul>
                <div className="mt-10 flex items-center justify-between gap-6 border-t border-border pt-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">From</div>
                    <div className="font-display text-3xl text-forest">৳ {r.price.toLocaleString()}<span className="text-sm text-muted-foreground"> / night</span></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to="/rooms/$slug" params={{ slug: r.slug }} className="text-sm text-forest hover:text-gold">View details</Link>
                    <Link to="/booking" search={{ room: r.slug }} className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm text-beige hover:-translate-y-0.5 transition-transform">
                      Reserve <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Feat({ Icon, t }: { Icon: typeof Users; t: string }) {
  return (
    <li className="flex items-center gap-3 text-foreground/85">
      <Icon size={16} className="text-mangrove" /> {t}
    </li>
  );
}
