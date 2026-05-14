import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import villageImg from "@/assets/village-life.jpg";
import cottageImg from "@/assets/cottage-river.jpg";
import cultureImg from "@/assets/culture-baul.jpg";
import boatImg from "@/assets/boat-tour.jpg";
import potteryImg from "@/assets/culture-pottery.jpg";
import { Leaf, Users, Music2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Pealy Eco Resort & Culture Centre" },
      { name: "description", content: "Born of the Sundarbans, built by local hands. Our story, our values, our team, and our promise to nature and heritage." },
      { property: "og:title", content: "About Pealy Eco Resort" },
      { property: "og:description", content: "A sanctuary at the edge of the world's largest mangrove forest." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: villageImg },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const STATS = [
  { n: "12+", l: "Years rooted in Sundarbans" },
  { n: "48", l: "Villagers employed" },
  { n: "100%", l: "Solar & rainwater powered" },
  { n: "0", l: "Single-use plastics" },
];

const TIMELINE = [
  { y: "2012", t: "A dream by the river", d: "Founder Mahbub returns to his ancestral village with a vision: a resort that gives more than it takes." },
  { y: "2014", t: "First cottage rises", d: "Built entirely by village craftsmen using reclaimed teak from old fishing boats." },
  { y: "2017", t: "Culture Centre opens", d: "Baul singers, pottery masters, and jatra artists begin nightly performances." },
  { y: "2020", t: "Carbon-neutral milestone", d: "Solar panels and rainwater harvesting take the resort fully off-grid." },
  { y: "2023", t: "Recognised internationally", d: "Featured in National Geographic Traveller as one of South Asia's leading eco-stays." },
  { y: "2026", t: "A second decade begins", d: "New cultural fellowships, expanded conservation work, and — yet — the same quiet philosophy." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Story"
        title="Born of the river. Built by local hands."
        subtitle="Pealy is more than a resort — it's a love letter to the Sundarbans and the people who call it home."
        image={villageImg}
      />

      {/* Intro */}
      <section className="container-x grid gap-16 py-32 lg:grid-cols-2 lg:gap-24">
        <div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Who we are</div>
          <h2 className="mt-5 font-display text-4xl text-balance md:text-5xl">A sanctuary at the edge of the world.</h2>
          <p className="mt-8 leading-[1.85] text-muted-foreground">
            Pealy Eco Resort & Culture Centre was founded with a single belief —
            that travel should leave both the traveller and the land richer than
            it found them. Every cottage was built by craftsmen from neighbouring
            villages. Every meal is sourced within a few kilometres. Every cultural
            evening is performed by artists whose songs have echoed through these
            forests for generations.
          </p>
          <p className="mt-5 leading-[1.85] text-muted-foreground">
            We don't manufacture experiences. We open doors to ones already here.
          </p>
          <Link to="/booking" className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm text-beige hover:-translate-y-0.5 transition-transform">
            Plan your visit <ArrowRight size={16} />
          </Link>
        </div>
        <div className="relative">
          <img src={cottageImg} alt="Pealy resort by the river" loading="lazy" className="h-[560px] w-full rounded-md object-cover" />
          <img src={boatImg} alt="" loading="lazy" className="absolute -bottom-10 -left-10 hidden h-48 w-72 rounded-md object-cover ring-8 ring-background lg:block" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-forest py-20 text-beige">
        <div className="container-x grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="font-display text-5xl text-gold md:text-6xl">{s.n}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.25em] text-beige/75">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Our Values</div>
            <h2 className="mt-5 font-display text-4xl md:text-5xl">Three rivers. One philosophy.</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { Icon: Leaf, n: "01", t: "Honour the Land", d: "Solar power, rainwater harvesting, zero single-use plastic. Tourism that gives back to mangrove conservation." },
              { Icon: Users, n: "02", t: "Honour the People", d: "Every staff member is from a Sundarbans village. Fair wages, profit-sharing, and real ownership in what we build." },
              { Icon: Music2, n: "03", t: "Honour the Story", d: "We preserve and share Bengali folk heritage — Baul, Bhatiyali, jatra, nakshi kantha — through nightly programs." },
            ].map((v) => (
              <div key={v.n} className="rounded-md border border-border bg-card p-8 hover-lift">
                <v.Icon className="text-gold" size={28} />
                <div className="mt-6 font-display text-5xl text-gold/30">{v.n}</div>
                <div className="mt-2 font-display text-2xl text-forest">{v.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-x py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Our Journey</div>
            <h2 className="mt-5 font-display text-4xl text-balance md:text-5xl">A decade of slow, deliberate growth.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">From a single cottage in 2014 to a fully off-grid sanctuary recognised across South Asia.</p>
            <img src={potteryImg} alt="" loading="lazy" className="mt-10 h-72 w-full rounded-md object-cover" />
          </div>
          <ol className="relative space-y-10 border-l border-mangrove/30 pl-8 lg:col-span-8">
            {TIMELINE.map((t) => (
              <li key={t.y} className="relative">
                <span className="absolute -left-[37px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gold ring-4 ring-background" />
                <div className="font-display text-3xl text-forest">{t.y}</div>
                <div className="mt-1 font-display text-xl">{t.t}</div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{t.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* CTA */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={cultureImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/70" />
        <div className="container-x relative flex h-full flex-col items-center justify-center text-center text-beige">
          <h3 className="font-display text-4xl text-balance md:text-6xl">Come live our story for a few days.</h3>
          <Link to="/booking" className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-medium text-foreground hover:-translate-y-0.5 transition-transform">
            Book your stay <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
