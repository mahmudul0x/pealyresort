import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VideoBackground } from "@/components/site/VideoBackground";
import boatImg from "@/assets/boat-tour.jpg";
import wildlifeImg from "@/assets/wildlife-tiger.jpg";
import aerialImg from "@/assets/tour-aerial.jpg";
import villageImg from "@/assets/village-life.jpg";
import { Shield, Compass, Camera, Trees, ArrowRight, Clock, Users, Map, Check } from "lucide-react";

export const Route = createFileRoute("/tour")({
  head: () => ({
    meta: [
      { title: "Sundarbans Tour — Pealy Eco Resort" },
      { name: "description", content: "Boat tours through Karamjal, Harbaria, Kotka and beyond. Guided by locals who know every channel of the mangrove." },
      { property: "og:title", content: "Sundarbans Tour" },
      { property: "og:description", content: "Glide through the world's largest mangrove forest." },
      { property: "og:url", content: "/tour" },
      { property: "og:image", content: aerialImg },
    ],
    links: [{ rel: "canonical", href: "/tour" }],
  }),
  component: TourPage,
});

const TOUR_VIDEO = [
  { src: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-river-in-the-jungle-4892-large.mp4" },
  { src: "https://cdn.coverr.co/videos/coverr-aerial-view-of-mangrove-forest-9123/1080p.mp4" },
];

const ITINERARY = [
  ["06:00", "Sunrise tea on the deck. Boat boarding & safety briefing."],
  ["07:00", "Karamjal Wildlife Centre — crocodiles, deer, monkeys."],
  ["09:30", "Mangrove channel cruise. Bird watching with binoculars."],
  ["12:30", "Lunch on board — fresh-caught fish, rice, dal, vegetables."],
  ["14:00", "Harbaria Eco Park — watchtower & raised boardwalk."],
  ["16:00", "Sunset over the river. Tea & Bengali snacks on deck."],
  ["19:00", "Return. Bonfire & cultural evening at Pealy."],
];

const TOURS = [
  { t: "Half Day Boat Tour", d: "Karamjal + nearby channels. Perfect for first-time visitors who want a taste of the mangrove.", price: "৳ 2,500", duration: "5 hours", group: "1–8 guests", img: boatImg },
  { t: "Full Day Eco Tour", d: "Karamjal + Harbaria + lunch on boat. Our most popular journey through three protected zones.", price: "৳ 4,800", duration: "12 hours", group: "1–12 guests", img: aerialImg, popular: true },
  { t: "Two-Day Deep Forest", d: "Kotka, Kochikhali tiger zone. Overnight on boat with full crew, meals, and dawn safari.", price: "৳ 12,500", duration: "2 days", group: "2–10 guests", img: villageImg },
  { t: "Photographer's Tour", d: "Sunrise & sunset slots, slow boat, expert local guide who knows where the kingfishers nest.", price: "৳ 6,500", duration: "8 hours", group: "1–4 guests", img: wildlifeImg },
];

function TourPage() {
  return (
    <SiteLayout>
      {/* Cinematic video hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <VideoBackground sources={TOUR_VIDEO} poster={aerialImg} alt="Aerial view of the Sundarbans" />
        <div className="absolute inset-0 gradient-overlay-soft" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-20 text-beige">
          <div className="reveal text-[11px] uppercase tracking-[0.32em] text-gold">Sundarbans Tour</div>
          <h1 className="reveal reveal-delay-1 mt-4 max-w-4xl font-display text-5xl leading-[1.05] text-balance md:text-7xl">
            The forest moves like a story.
          </h1>
          <p className="reveal reveal-delay-2 mt-5 max-w-xl text-beige/85 md:text-lg">
            Six guided journeys, one river system, ten thousand species. Let a local lead.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <Link to="/booking" className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-foreground hover:-translate-y-0.5 transition-transform">Book a tour</Link>
            <a href="#tours" className="rounded-full border border-beige/30 px-7 py-3.5 text-sm text-beige hover:bg-beige/10">Explore options</a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-x py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Shield, t: "Safety First", d: "Licensed guides, life jackets, forest dept. permits." },
            { Icon: Compass, t: "Local Wisdom", d: "Born-and-raised guides who know every channel." },
            { Icon: Camera, t: "Photography", d: "Slow boats, golden hours, hides for wildlife." },
            { Icon: Trees, t: "Eco-Certified", d: "Quiet motors, no littering, low-impact routes." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="rounded-md border border-border bg-card p-6 hover-lift">
              <Icon className="text-gold" />
              <div className="mt-4 font-display text-xl text-forest">{t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample day */}
      <section className="bg-secondary py-28">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Sample Day</div>
            <h2 className="mt-5 font-display text-4xl text-balance md:text-5xl">A day in the Sundarbans.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Itineraries flex with tide and weather. This is a typical full-day boat journey from Pealy.
            </p>
            <img src={aerialImg} alt="Boat in Sundarbans channels" loading="lazy" className="mt-10 h-80 w-full rounded-md object-cover" />
          </div>
          <ol className="relative border-l border-mangrove/30 pl-8">
            {ITINERARY.map(([time, what]) => (
              <li key={time} className="relative mb-8">
                <span className="absolute -left-[37px] top-1 grid h-4 w-4 place-items-center rounded-full bg-gold ring-4 ring-secondary" />
                <div className="font-display text-2xl text-forest">{time}</div>
                <div className="mt-1 text-sm text-muted-foreground">{what}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tour options */}
      <section id="tours" className="container-x py-28">
        <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Tour Options</div>
        <h2 className="mt-5 font-display text-4xl md:text-5xl">Choose your journey.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {TOURS.map((t) => (
            <article key={t.t} className="group relative overflow-hidden rounded-md border border-border bg-card hover-lift">
              <div className="relative h-56 overflow-hidden">
                <img src={t.img} alt={t.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
                {t.popular && <div className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground">Most popular</div>}
              </div>
              <div className="p-7">
                <div className="font-display text-2xl text-forest">{t.t}</div>
                <p className="mt-3 text-sm text-muted-foreground">{t.d}</p>
                <div className="mt-5 flex flex-wrap gap-5 text-xs text-foreground/75">
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-mangrove" /> {t.duration}</span>
                  <span className="flex items-center gap-1.5"><Users size={14} className="text-mangrove" /> {t.group}</span>
                  <span className="flex items-center gap-1.5"><Map size={14} className="text-mangrove" /> Local guide</span>
                </div>
                <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
                  <div className="font-display text-2xl text-gold">{t.price}<span className="text-xs text-muted-foreground"> / person</span></div>
                  <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm text-beige hover:-translate-y-0.5 transition-transform">Book <ArrowRight size={14} /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="bg-secondary py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">What's Included</div>
            <h2 className="mt-5 font-display text-4xl">Everything is taken care of.</h2>
            <ul className="mt-8 grid gap-3">
              {["Forest department permits & guide fees", "Life jackets & safety gear", "All meals on board (breakfast, lunch, snacks)", "Binoculars for bird watching", "Fresh drinking water & refreshments", "Pickup from Pealy resort"].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground/85"><Check size={16} className="text-gold" /> {i}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">What to Bring</div>
            <h2 className="mt-5 font-display text-4xl">Pack light, stay ready.</h2>
            <ul className="mt-8 grid gap-3">
              {["Comfortable walking shoes", "Sun hat, sunglasses, sunscreen", "Light cotton clothing in earthy tones", "Camera with zoom lens (300mm+)", "Reusable water bottle", "Government-issued ID for permits"].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground/85"><Check size={16} className="text-gold" /> {i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Wildlife banner */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={wildlifeImg} alt="Royal Bengal Tiger" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/60" />
        <div className="container-x relative flex h-full items-center text-beige">
          <div className="max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Wildlife</div>
            <h3 className="mt-4 font-display text-4xl md:text-5xl">Home of the Royal Bengal Tiger.</h3>
            <p className="mt-5 text-beige/85">Spot saltwater crocodiles, spotted deer, rhesus macaques, kingfishers, and — if the river favours you — the elusive striped king of the mangrove.</p>
            <Link to="/booking" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-foreground">
              Plan your expedition <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
