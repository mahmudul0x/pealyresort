import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import foodImg from "@/assets/food-bengali.jpg";
import chefImg from "@/assets/dining-chef.jpg";
import bbqImg from "@/assets/dining-bbq.jpg";
import villageImg from "@/assets/village-life.jpg";
import { Flame, Leaf, MapPin, Sunrise, Sun, Moon, ArrowRight, Utensils } from "lucide-react";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Food & Dining — Pealy Eco Resort" },
      { name: "description", content: "Authentic Bengali village cooking — hilsa, duck curry, banana-leaf feasts, BBQ nights, and seasonal sweets." },
      { property: "og:title", content: "Food & Dining at Pealy" },
      { property: "og:description", content: "From banana-leaf feasts to fish caught at dawn." },
      { property: "og:url", content: "/dining" },
      { property: "og:image", content: foodImg },
    ],
    links: [{ rel: "canonical", href: "/dining" }],
  }),
  component: DiningPage,
});

const MENU = [
  {
    cat: "From the River",
    blurb: "Caught at dawn, on your plate by lunch.",
    items: [
      ["Sorshe Ilish", "Hilsa simmered in mustard sauce", "৳ 650"],
      ["Chingri Malai Curry", "River prawns in coconut cream", "৳ 580"],
      ["Pabda Jhol", "Pabda fish in light tomato broth", "৳ 420"],
      ["Bhetki Paturi", "Sea bass steamed in banana leaf", "৳ 540"],
    ],
  },
  {
    cat: "From the Village",
    blurb: "Slow recipes from grandmother's notebook.",
    items: [
      ["Hansh Bhuna", "Slow-cooked duck curry", "৳ 520"],
      ["Kosha Mangsho", "Spiced mutton, Bengali style", "৳ 680"],
      ["Aloo Posto", "Potatoes with poppy seed", "৳ 240"],
      ["Murgi'r Jhol", "Free-range chicken curry", "৳ 380"],
    ],
  },
  {
    cat: "From the Earth",
    blurb: "Vegetables picked from our own garden.",
    items: [
      ["Mocha'r Ghonto", "Banana flower curry", "৳ 220"],
      ["Shukto", "Bitter-sweet vegetable medley", "৳ 200"],
      ["Daal & Bhat", "Lentils, rice, ghee", "৳ 180"],
      ["Begun Bhaja", "Crisp eggplant fritters", "৳ 160"],
    ],
  },
  {
    cat: "Sweet Endings",
    blurb: "The Bengali sweet tradition, unchanged.",
    items: [
      ["Chaler Payesh", "Rice pudding with date jaggery", "৳ 180"],
      ["Mishti Doi", "Sweet earthen-pot yogurt", "৳ 120"],
      ["Pithe Puli", "Seasonal winter sweets", "৳ 200"],
      ["Roshogolla", "Spongy cheese in syrup", "৳ 140"],
    ],
  },
];

const TIMETABLE = [
  { Icon: Sunrise, t: "Breakfast", time: "07:00 — 10:00", desc: "Luchi, alur dom, fresh fruit, masala chai." },
  { Icon: Sun, t: "Lunch", time: "12:30 — 15:00", desc: "Banana-leaf thali — fish, rice, dal, vegetables, sweet." },
  { Icon: Moon, t: "Dinner", time: "19:30 — 22:00", desc: "Multi-course Bengali feast with regional specialities." },
  { Icon: Flame, t: "BBQ Nights", time: "Fri & Sat · 20:00", desc: "Charcoal grill, fresh catch, folk music by the river." },
];

function DiningPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Food & Dining"
        title="A grandmother's kitchen, opened to the world."
        subtitle="Recipes carried through generations, ingredients sourced within a few kilometres."
        image={foodImg}
      />

      {/* Philosophy */}
      <section className="container-x grid gap-16 py-28 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <img src={chefImg} alt="Pealy head chef cooking" loading="lazy" className="h-[600px] w-full rounded-md object-cover" />
        </div>
        <div className="lg:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Our Kitchen</div>
          <h2 className="mt-5 font-display text-4xl text-balance md:text-5xl">Cooked over wood. Served on banana leaf.</h2>
          <p className="mt-8 leading-[1.85] text-muted-foreground">
            Our head chef, Boishakhi Khatun, learned to cook in her mother's village
            kitchen on the banks of the Pasur river. Every meal at Pealy starts with
            what the morning brings — the fisherman's catch, the gardener's basket,
            the milkman at the gate. We do not have a fixed menu; we have a fixed
            promise: that what you eat tonight grew, swam, or walked within a few
            kilometres of where you sit.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <Pill Icon={MapPin} t="Hyper-local" />
            <Pill Icon={Leaf} t="Organic" />
            <Pill Icon={Utensils} t="Hand-made" />
          </div>
        </div>
      </section>

      {/* Timetable */}
      <section className="bg-secondary py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">When We Eat</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">A day at the table.</h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-md bg-border md:grid-cols-2 lg:grid-cols-4">
            {TIMETABLE.map(({ Icon, t, time, desc }) => (
              <div key={t} className="bg-card p-8">
                <Icon className="text-gold" />
                <div className="mt-5 font-display text-2xl text-forest">{t}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-mangrove">{time}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BBQ Feature */}
      <section className="relative h-[70vh] min-h-[460px] overflow-hidden">
        <img src={bbqImg} alt="Riverside BBQ at Pealy" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/60 to-transparent" />
        <div className="container-x relative flex h-full max-w-2xl flex-col justify-center text-beige">
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Friday & Saturday</div>
          <h3 className="mt-5 font-display text-4xl text-balance md:text-6xl">Riverside BBQ Nights.</h3>
          <p className="mt-5 max-w-xl text-beige/85">Fresh river prawns, hilsa fillets, marinated chicken — grilled over charcoal, eaten under string lights, with Baul music carrying across the water.</p>
          <Link to="/booking" className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-foreground hover:-translate-y-0.5 transition-transform">
            Reserve a BBQ table <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Menu */}
      <section className="container-x py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Today's Menu</div>
              <h2 className="mt-4 font-display text-4xl">Seasonal & local.</h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Our menu changes with the river and the season. What you'll find
                here is a snapshot of guest favourites — but the kitchen will
                surprise you nightly with whatever the day brought.
              </p>
              <img src={villageImg} alt="" loading="lazy" className="mt-8 h-64 w-full rounded-md object-cover" />
            </div>
          </aside>

          <div className="space-y-16 lg:col-span-8">
            {MENU.map((s) => (
              <div key={s.cat}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-3xl text-forest">{s.cat}</h3>
                  <div className="hidden text-xs uppercase tracking-[0.25em] text-mangrove sm:block">{s.blurb}</div>
                </div>
                <div className="mt-6 divide-y divide-border border-y border-border">
                  {s.items.map(([name, desc, price]) => (
                    <div key={name} className="flex items-baseline justify-between gap-6 py-5">
                      <div>
                        <div className="font-display text-lg">{name}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
                      </div>
                      <div className="font-display text-lg text-gold">{price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Pill({ Icon, t }: { Icon: typeof MapPin; t: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon size={16} className="text-mangrove" /> <span className="text-foreground">{t}</span>
    </div>
  );
}
