import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import heroImg from "@/assets/1.jpeg";
import hero2Img from "@/assets/3.jpeg";
import hero3Img from "@/assets/4.jpeg";
import hero4Img from "@/assets/5.jpeg";
import hero5Img from "@/assets/6.jpeg";
import wildlifeImg from "@/assets/wildlife-tiger.jpg";
import cottageImg from "@/assets/cottage-river.jpg";
import cultureImg from "@/assets/culture-baul.jpg";
import foodImg from "@/assets/food-bengali.jpg";
import boatImg from "@/assets/boat-tour.jpg";
import tentImg from "@/assets/tent-experience.jpg";
import villageImg from "@/assets/village-life.jpg";
import roomImg from "@/assets/room-interior.jpg";
import { useEffect, useState } from "react";
import { ArrowRight, Leaf, Waves, Compass, Tent, Utensils, Music2, MapPin, Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { VideoBackground } from "@/components/site/VideoBackground";

// Cinematic ambient footage. Swap with self-hosted /public/videos/*.mp4
// if you want full control. The component falls back to the poster image
// if any URL 404s, the network is slow, or autoplay is blocked.
const HERO_VIDEO = [
  { src: "https://cdn.coverr.co/videos/coverr-aerial-view-of-a-mangrove-forest-3041/1080p.mp4" },
  { src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-forest-and-river-1437-large.mp4" },
  { src: "https://assets.mixkit.co/videos/preview/mixkit-flight-over-a-jungle-river-2-large.mp4" },
  { src: "https://assets.mixkit.co/videos/preview/mixkit-rowing-a-boat-on-a-river-in-asia-4775-large.mp4" },
];
// Cinematic image rotation behind the hero — also acts as the video poster.
const HERO_SLIDES = [
  { img: heroImg, alt: "Pealy Eco Resort cottage in the mangrove forest" },
  { img: hero2Img, alt: "Pealy Eco Resort wooden sign" },
  { img: hero3Img, alt: "Riverside deck and swing at Pealy Eco Resort" },
  { img: hero4Img, alt: "Pealy Eco Resort cottage aerial view" },
  { img: hero5Img, alt: "Aerial view of Pealy Eco Resort on the river" },
  { img: wildlifeImg, alt: "Royal Bengal tiger in the Sundarbans" },
];
const CULTURE_VIDEO = [
  { src: "https://cdn.coverr.co/videos/coverr-bonfire-at-night-7686/1080p.mp4" },
  { src: "https://assets.mixkit.co/videos/preview/mixkit-bonfire-burning-at-night-1735-large.mp4" },
];
const HIGHLIGHTS_VIDEO = [
  { src: "https://cdn.coverr.co/videos/coverr-river-in-the-jungle-1572/1080p.mp4" },
  { src: "https://assets.mixkit.co/videos/preview/mixkit-flight-over-a-jungle-river-2-large.mp4" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pealy Eco Resort & Culture Centre — Sundarbans, Bangladesh" },
      { name: "description", content: "An eco-luxury retreat in the Sundarbans. Riverside cottages, mangrove tours, Bengali heritage, authentic food, and folk culture." },
      { property: "og:title", content: "Pealy Eco Resort & Culture Centre" },
      { property: "og:description", content: "Stay. Learn. Belong. Discover the hidden soul of the Sundarbans." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Welcome />
      <Highlights />
      <Experiences />
      <AccommodationPreview />
      <PackageStrip />
      <FoodSection />
      <CultureSection />
      <TourSection />
      <Testimonials />
      <GalleryPreview />
      <BookingCTA />
      <LocationStrip />
    </SiteLayout>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(id);
  }, [tick]);

  function prev() {
    setActive((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTick((t) => t + 1);
  }
  function next() {
    setActive((i) => (i + 1) % HERO_SLIDES.length);
    setTick((t) => t + 1);
  }

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Crossfading image slideshow — also serves as poster fallback */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((s, i) => (
          <img
            key={s.img}
            src={s.img}
            alt={s.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ken-burns ${i === active ? "opacity-100" : "opacity-0"}`}
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      {/* Cinematic video layer on top — fades in once ready, fails gracefully */}
      <VideoBackground
        sources={HERO_VIDEO}
        poster={HERO_SLIDES[0].img}
        alt=""
        imgClassName="opacity-0"
        className="mix-blend-luminosity opacity-70"
      />
      <div className="absolute inset-0 gradient-overlay" />

      <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-beige text-center">
        <div className="reveal text-[11px] uppercase tracking-[0.4em] text-gold">
          Sundarbans · Bangladesh
        </div>
        <h1 className="reveal reveal-delay-1 mt-6 max-w-5xl font-display text-[44px] leading-[1.02] text-balance md:text-7xl lg:text-[88px]">
          Discover the hidden <em className="text-gold not-italic">soul</em> of the Sundarbans
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-relaxed text-beige/85 md:text-lg">
          An eco-luxury retreat where rivers, mangrove forests, Bengali heritage,
          and folk culture become one unforgettable experience.
        </p>
        <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
          <Link to="/booking" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5">
            Book Your Stay <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/packages" className="inline-flex items-center gap-2 rounded-full border border-beige/40 bg-beige/5 px-7 py-3.5 text-sm font-medium text-beige backdrop-blur-md transition-colors hover:bg-beige/10">
            Explore Packages
          </Link>
        </div>

        {/* Floating booking widget */}
        <div className="reveal reveal-delay-4 glass-dark mt-14 hidden items-end gap-3 rounded-2xl p-4 md:inline-flex">
          <Field label="Check in" value="Select date" />
          <Divider />
          <Field label="Check out" value="Select date" />
          <Divider />
          <Field label="Guests" value="2 adults" />
          <Divider />
          <Field label="Package" value="Friends Stay" />
          <Link to="/booking" className="ml-2 rounded-xl bg-gold px-6 py-3 text-sm font-medium text-foreground">
            Check Availability
          </Link>
        </div>
      </div>


      {/* Prev / Next arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border border-beige/30 bg-beige/10 text-beige backdrop-blur-sm transition-colors hover:bg-beige/25 md:left-8 md:h-13 md:w-13"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border border-beige/30 bg-beige/10 text-beige backdrop-blur-sm transition-colors hover:bg-beige/25 md:right-8 md:h-13 md:w-13"
      >
        <ChevronRight size={22} />
      </button>

      {/* Slide progress dots (mobile) */}
      <div className="absolute inset-x-0 bottom-20 z-10 flex justify-center gap-2 lg:hidden">
        {HERO_SLIDES.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all ${i === active ? "w-8 bg-gold" : "w-2 bg-beige/40"}`} />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center text-beige/70">
        <ChevronDown className="float-slow" />
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[140px] flex-1 px-3 py-1">
      <div className="text-[10px] uppercase tracking-[0.2em] text-beige/60">{label}</div>
      <div className="mt-1 text-sm text-beige">{value}</div>
    </div>
  );
}
function Divider() { return <div className="h-10 w-px bg-beige/15" />; }

function Welcome() {
  return (
    <section className="relative py-32">
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Welcome to Pealy</div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance md:text-6xl">
            Where nature breathes & heritage sings.
          </h2>
          <p className="mt-8 max-w-lg text-[15px] leading-[1.85] text-muted-foreground">
            Tucked between the rivers and tigers of the world's largest mangrove
            delta, Pealy Eco Resort & Culture Centre is a sanctuary for travellers
            who seek more than a stay — a feeling, a story, a return to something
            real. Wake to fishermen's calls, drift through silent green channels,
            share Baul music by firelight.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-10">
            <Stat n="14" l="Eco Cottages" />
            <Stat n="07" l="Curated Tours" />
            <Stat n="100%" l="Locally Sourced" />
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-6 -top-6 hidden h-full w-full rounded-md border border-mangrove/30 lg:block" />
          <img src={cottageImg} alt="Wooden eco cottage by river" className="relative h-[560px] w-full rounded-md object-cover" loading="lazy" />
          <div className="glass absolute -bottom-8 left-6 right-6 rounded-md p-5 lg:-right-12 lg:left-auto lg:max-w-xs">
            <div className="font-display text-2xl text-forest">Stay. Learn. Belong.</div>
            <p className="mt-2 text-xs text-muted-foreground">Our promise to every guest who walks through our gates.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-4xl text-forest">{n}</div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{l}</div>
    </div>
  );
}

const HIGHLIGHTS = [
  { Icon: Leaf, title: "Eco-Conscious Living", text: "Solar-powered cottages built with reclaimed wood and local hands." },
  { Icon: Waves, title: "Riverside Tranquility", text: "Wake to mist on the water. Sleep to the sound of frogs and rain." },
  { Icon: Music2, title: "Living Culture", text: "Baul singers, folk theatre, and village rituals — woven into your stay." },
  { Icon: Compass, title: "Authentic Tours", text: "Local guides lead you deeper than any brochure ever could." },
];

function Highlights() {
  return (
    <section className="relative overflow-hidden bg-secondary py-28">
      <VideoBackground
        sources={HIGHLIGHTS_VIDEO}
        poster={boatImg}
        alt=""
        imgClassName=""
        className="opacity-[0.18] mix-blend-multiply"
      />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Why Choose Pealy</div>
          <h2 className="mt-5 font-display text-4xl text-balance md:text-5xl">
            Luxury rooted in nature, woven by tradition.
          </h2>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-md bg-border md:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ Icon, title, text }) => (
            <div key={title} className="group bg-secondary p-8 transition-colors hover:bg-card">
              <Icon className="text-gold transition-transform group-hover:scale-110" size={28} />
              <div className="mt-6 font-display text-xl text-forest">{title}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const EXPERIENCES = [
  { img: boatImg, title: "Mangrove Boat Journey", tag: "Half day" },
  { img: cultureImg, title: "Folk Music & Bonfire Nights", tag: "Evenings" },
  { img: villageImg, title: "Village Life Walks", tag: "Mornings" },
  { img: wildlifeImg, title: "Wildlife & Photography", tag: "Sunrise" },
  { img: tentImg, title: "Riverside Tent Stay", tag: "Overnight" },
  { img: foodImg, title: "Bengali Feast on Banana Leaf", tag: "Daily" },
];

function Experiences() {
  return (
    <section className="py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Experiences</div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-balance md:text-6xl">
              Crafted moments, from misty rivers to firelit nights.
            </h2>
          </div>
          <Link to="/packages" className="inline-flex items-center gap-2 text-sm text-forest underline-offset-4 hover:underline">
            View all packages <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((e) => (
            <article key={e.title} className="group relative h-[420px] overflow-hidden rounded-md hover-lift">
              <img src={e.img} alt={e.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-beige">
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{e.tag}</div>
                <div className="mt-2 font-display text-2xl">{e.title}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccommodationPreview() {
  return (
    <section className="relative overflow-hidden bg-forest py-32 text-beige">
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <img src={roomImg} alt="Eco cottage interior" loading="lazy" className="h-[600px] w-full rounded-md object-cover" />
          <div className="glass-dark absolute -bottom-6 -right-6 hidden rounded-md p-6 lg:block">
            <div className="font-display text-3xl text-gold">৳ 4,500<span className="text-sm text-beige/70"> / night</span></div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-beige/60">From — per cottage</div>
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Accommodation</div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance md:text-6xl">
            Wooden cottages. River views. <em className="text-gold not-italic">Pure quiet.</em>
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-beige/80">
            Five styles of stay, from intimate friends houses to canvas tents
            beside the water. Each room is built around comfort, climate, and
            character — handcrafted, locally rooted, never generic.
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-beige/85">
            {["River View Friends House", "Forest View Friends House", "Eco Wooden Cottage", "Riverside Tent Stay", "Group Accommodation"].map((r) => (
              <li key={r} className="flex items-center gap-3 border-b border-beige/15 py-3">
                <span className="h-1 w-1 rounded-full bg-gold" /> {r}
              </li>
            ))}
          </ul>
          <Link to="/rooms" className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-foreground hover:-translate-y-0.5 transition-transform">
            Explore Rooms <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const PACKAGES = [
  { name: "Friends Package", days: "2 days · 1 night", price: "৳ 3,500", img: tentImg },
  { name: "Couple Retreat", days: "2 days · 1 night", price: "৳ 5,800", img: cottageImg },
  { name: "Family Escape", days: "3 days · 2 nights", price: "৳ 12,500", img: roomImg },
  { name: "Cultural Retreat", days: "3 days · 2 nights", price: "৳ 9,800", img: cultureImg },
];

function PackageStrip() {
  return (
    <section className="py-32">
      <div className="container-x">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Curated Packages</div>
          <h2 className="mt-5 font-display text-4xl text-balance md:text-5xl">All-inclusive journeys, thoughtfully priced.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((p, i) => (
            <Link to="/packages" key={p.name} className="group relative block overflow-hidden rounded-md hover-lift">
              <div className="relative h-[320px] overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-beige">
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold">0{i + 1} · {p.days}</div>
                <div className="mt-2 font-display text-2xl">{p.name}</div>
                <div className="mt-3 text-sm text-beige/80">From <span className="text-gold">{p.price}</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoodSection() {
  return (
    <section className="bg-secondary py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Food & Dining</div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance md:text-5xl">
            From banana-leaf feasts to fish caught at dawn.
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Our kitchen is led by village cooks who learned recipes from their
            grandmothers. Expect hilsa cooked in mustard oil, smoky duck curry,
            sweet payesh by the river — and tea that tastes like home.
          </p>
          <Link to="/dining" className="mt-8 inline-flex items-center gap-2 text-sm text-forest underline-offset-4 hover:underline">
            <Utensils size={16} /> See full menu <ArrowRight size={16} />
          </Link>
        </div>
        <img src={foodImg} alt="Bengali feast" loading="lazy" className="order-1 h-[520px] w-full rounded-md object-cover lg:order-2" />
      </div>
    </section>
  );
}

function CultureSection() {
  return (
    <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
      <VideoBackground
        sources={CULTURE_VIDEO}
        poster={cultureImg}
        alt="Baul music around bonfire"
        imgClassName=""
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/60 to-transparent" />
      <div className="container-x relative z-10 flex h-full max-w-2xl flex-col justify-center text-beige">
        <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Cultural Evenings</div>
        <h2 className="mt-5 font-display text-4xl leading-tight text-balance md:text-6xl">
          Where Baul songs rise with the firelight.
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-beige/85">
          Every evening, our courtyard transforms. Folk musicians, traditional
          dancers, and storytellers from neighbouring villages gather under the
          stars to share centuries-old Bengali heritage with our guests.
        </p>
        <Link to="/culture" className="mt-8 inline-flex w-max items-center gap-2 rounded-full border border-beige/40 bg-beige/5 px-7 py-3.5 text-sm font-medium backdrop-blur-md hover:bg-beige/10">
          Discover Cultural Programs <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function TourSection() {
  return (
    <section className="py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <img src={boatImg} alt="Boat through mangrove channel" loading="lazy" className="h-[560px] w-full rounded-md object-cover" />
        </div>
        <div className="lg:col-span-5">
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Sundarbans Tour</div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-balance md:text-5xl">
            Glide through the world's largest mangrove forest.
          </h2>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {[
              ["Karamjal Wildlife Center", "Crocodiles, deer & monkey trails"],
              ["Harbaria Eco Park", "Watchtower & tidal walkways"],
              ["Kotka & Kochikhali", "Tiger territory, beach landing"],
              ["Dublar Char", "Fishermen's island & sunset"],
            ].map(([t, s]) => (
              <li key={t} className="flex items-start justify-between gap-6 py-5">
                <div>
                  <div className="font-display text-lg text-forest">{t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s}</div>
                </div>
                <ArrowRight className="mt-1 shrink-0 text-mangrove" size={18} />
              </li>
            ))}
          </ul>
          <Link to="/tour" className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-beige hover:-translate-y-0.5 transition-transform">
            Plan your tour <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { name: "Anika R.", from: "Dhaka", text: "Three days felt like a slow exhale. The boat ride at sunrise will live in me forever." },
  { name: "James W.", from: "London", text: "The most authentic eco-stay I've experienced anywhere in Asia. Real people, real food, real magic." },
  { name: "Tahmid I.", from: "Khulna", text: "Baul night around the fire — pure goosebumps. Our family is already planning the next trip." },
];

function Testimonials() {
  return (
    <section className="bg-forest py-32 text-beige">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Guest Stories</div>
          <h2 className="mt-5 font-display text-4xl text-balance md:text-5xl">Voices from the river.</h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-md border border-beige/15 bg-beige/[0.03] p-8">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <blockquote className="mt-6 font-display text-xl leading-snug text-beige">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-beige/60">
                {t.name} — {t.from}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const imgs = [heroImg, cottageImg, boatImg, cultureImg, villageImg, foodImg, tentImg, wildlifeImg];
  return (
    <section className="py-32">
      <div className="container-x mb-16 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Gallery</div>
          <h2 className="mt-5 font-display text-4xl text-balance md:text-5xl">Through the lens of Pealy.</h2>
        </div>
        <Link to="/gallery" className="hidden items-center gap-2 text-sm text-forest underline-offset-4 hover:underline md:inline-flex">
          Open full gallery <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {imgs.map((src, i) => (
          <div key={i} className={`relative overflow-hidden ${i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}>
            <img src={src} loading="lazy" alt="" className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-110" />
          </div>
        ))}
      </div>
    </section>
  );
}

function BookingCTA() {
  return (
    <section className="container-x py-20">
      <div className="relative overflow-hidden rounded-md bg-forest p-12 text-beige md:p-20">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Reserve Your Journey</div>
            <h2 className="mt-5 font-display text-4xl leading-tight text-balance md:text-6xl">
              Your Sundarbans story begins here.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p className="max-w-md text-beige/80 lg:text-right">
              Limited cottages. Seasonal pricing. Personal hosts. Book direct
              for our best rate and a complimentary boat ride at sunrise.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-foreground">
                Book Your Stay <ArrowRight size={16} />
              </Link>
              <a href="tel:+8801911040463" className="inline-flex items-center gap-2 rounded-full border border-beige/40 px-7 py-3.5 text-sm">
                Call us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationStrip() {
  return (
    <section className="container-x pb-32">
      <div className="grid gap-10 rounded-md border border-border bg-card p-10 md:grid-cols-2 md:p-16">
        <div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Find Us</div>
          <h3 className="mt-4 font-display text-3xl">West Dhangmari, Banishanta</h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Dakop, Mongla, Bangladesh. Easily reachable by boat from Mongla port.
            Pickup and drop arranged for all packages.
          </p>
        </div>
        <div className="flex items-center gap-4 md:justify-end">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-mangrove/10 text-mangrove">
            <MapPin size={20} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Coordinates</div>
            <div className="font-display text-lg">22.4793° N, 89.5836° E</div>
          </div>
        </div>
      </div>
    </section>
  );
}
