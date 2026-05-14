import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import cultureImg from "@/assets/culture-baul.jpg";
import villageImg from "@/assets/village-life.jpg";
import jatraImg from "@/assets/culture-jatra.jpg";
import potteryImg from "@/assets/culture-pottery.jpg";
import foodImg from "@/assets/food-bengali.jpg";
import { Music, Theater, Palette, Flame, Sparkles, Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/culture")({
  head: () => ({
    meta: [
      { title: "Cultural Programs — Pealy Eco Resort" },
      { name: "description", content: "Baul music, folk performances, jatra theatre, and Bengali heritage evenings — every night at Pealy." },
      { property: "og:title", content: "Cultural Programs" },
      { property: "og:description", content: "Where Baul songs rise with the firelight." },
      { property: "og:url", content: "/culture" },
      { property: "og:image", content: cultureImg },
    ],
    links: [{ rel: "canonical", href: "/culture" }],
  }),
  component: CulturePage,
});

const PROGRAMS = [
  { Icon: Music, t: "Baul Music Night", img: cultureImg, d: "Wandering minstrels with one-string ektaras share centuries-old mystic songs of Lalon Shah and his disciples.", time: "Daily · 8:00 PM" },
  { Icon: Music, t: "Bhatiyali Boatmen Songs", img: villageImg, d: "The river's own genre — slow, longing songs of the people who live by the water, performed from a moving boat at sunset.", time: "Sunset · By boat" },
  { Icon: Theater, t: "Jatra Folk Theatre", img: jatraImg, d: "Traditional Bengali open-air theatre, performed by a visiting troupe with painted faces, elaborate costumes, and live music.", time: "Saturdays · 9 PM" },
  { Icon: Palette, t: "Pottery & Nakshi Kantha", img: potteryImg, d: "Throw clay with a village master; learn nakshi kantha embroidery from a grandmother who learned it from hers.", time: "Mornings · Workshop" },
  { Icon: Flame, t: "Bonfire & Storytelling", img: foodImg, d: "Folk tales of the Sundarbans — Bonbibi the forest goddess, Dakshin Rai the tiger demon, and the songs sung to keep them at bay.", time: "Daily · 9:30 PM" },
  { Icon: Sparkles, t: "Festival Evenings", img: cultureImg, d: "Pohela Boishakh, Nabanna, Durga Puja, Eid — every Bengali festival brought to life on our grounds with feast, music, and ritual.", time: "Seasonal" },
];

const SCHEDULE = [
  { day: "Sunday", e: "Baul Music Night · Storytelling" },
  { day: "Monday", e: "Pottery Workshop · Bhatiyali Cruise" },
  { day: "Tuesday", e: "Nakshi Kantha · Baul Night" },
  { day: "Wednesday", e: "Folk Dance · Storytelling" },
  { day: "Thursday", e: "Cooking Class · Baul Night" },
  { day: "Friday", e: "BBQ + Live Music" },
  { day: "Saturday", e: "Jatra Theatre · Bonfire" },
];

function CulturePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Living Heritage"
        title="The soul of Bengal, performed nightly."
        subtitle="Cultural programs led by artists from the villages around us — not staged, not scripted."
        image={cultureImg}
      />

      {/* Manifesto */}
      <section className="container-x py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Our Cultural Mission</div>
          <h2 className="mt-5 font-display text-4xl text-balance md:text-5xl">
            Not a folk museum. A living tradition.
          </h2>
          <p className="mt-8 text-lg leading-[1.85] text-muted-foreground">
            Bengali folk culture survives where it's lived. At Pealy, every evening
            invites you into the hands and voices of the artists who carry these
            traditions forward — the Baul singer, the jatra performer, the potter,
            the storyteller. Their work is not a performance for tourists. It's the
            life of these villages, generously shared.
          </p>
        </div>
      </section>

      {/* Programs grid */}
      <section className="container-x pb-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <article key={p.t} className="group relative overflow-hidden rounded-md border border-border bg-card hover-lift">
              <div className="relative h-56 overflow-hidden">
                <img src={p.img} alt={p.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-gold text-foreground">
                  <p.Icon size={18} />
                </div>
              </div>
              <div className="p-6">
                <div className="font-display text-3xl text-gold/30">0{i + 1}</div>
                <div className="mt-1 font-display text-2xl text-forest">{p.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                <div className="mt-5 text-[11px] uppercase tracking-[0.25em] text-mangrove">{p.time}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Weekly schedule */}
      <section className="bg-secondary py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Calendar className="text-gold" />
            <div className="mt-5 text-[11px] uppercase tracking-[0.32em] text-mangrove">This Week</div>
            <h2 className="mt-4 font-display text-4xl text-balance md:text-5xl">Tonight, the river will sing.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">A different program every night, all included with your stay. Weekly rotations adjust with festival seasons and visiting troupes.</p>
            <Link to="/booking" className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm text-beige hover:-translate-y-0.5 transition-transform">
              Reserve cultural retreat <ArrowRight size={16} />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-border overflow-hidden rounded-md border border-border bg-card">
              {SCHEDULE.map((s) => (
                <div key={s.day} className="grid grid-cols-3 items-center gap-4 px-6 py-5">
                  <div className="font-display text-xl text-forest">{s.day}</div>
                  <div className="col-span-2 text-sm text-muted-foreground">{s.e}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative h-[70vh] min-h-[440px] overflow-hidden">
        <img src={villageImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/50 to-transparent" />
        <div className="container-x relative flex h-full max-w-2xl flex-col justify-center text-beige">
          <blockquote className="font-display text-3xl leading-snug text-balance md:text-5xl">
            "মাটি, নদী, গান — এই তিনটিই বাঙালির আত্মা।"
          </blockquote>
          <div className="mt-6 text-sm text-beige/70">"Earth, river, song — the three souls of every Bengali."</div>
        </div>
      </section>
    </SiteLayout>
  );
}
