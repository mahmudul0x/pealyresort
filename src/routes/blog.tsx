import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import boatImg from "@/assets/boat-tour.jpg";
import cultureImg from "@/assets/culture-baul.jpg";
import foodImg from "@/assets/food-bengali.jpg";
import villageImg from "@/assets/village-life.jpg";
import wildlifeImg from "@/assets/wildlife-tiger.jpg";
import tentImg from "@/assets/tent-experience.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Stories — Pealy Eco Resort Journal" },
      { name: "description", content: "Travel guides, cultural essays, and field notes from the Sundarbans." },
      { property: "og:title", content: "Stories from the Sundarbans" },
      { property: "og:url", content: "/blog" },
      { property: "og:image", content: boatImg },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const POSTS = [
  { img: boatImg, cat: "Travel Guide", title: "First Time in the Sundarbans? Read This.", date: "May 2026", read: "8 min read" },
  { img: cultureImg, cat: "Culture", title: "Why Baul Music Still Matters in 2026", date: "Apr 2026", read: "6 min read" },
  { img: villageImg, cat: "Eco Tourism", title: "What Real Eco Tourism Looks Like", date: "Apr 2026", read: "5 min read" },
  { img: foodImg, cat: "Food", title: "Hilsa Season: A Love Letter to the King of Fish", date: "Mar 2026", read: "7 min read" },
  { img: wildlifeImg, cat: "Wildlife", title: "Tracking the Tiger You'll Probably Never See", date: "Mar 2026", read: "9 min read" },
  { img: tentImg, cat: "Stories", title: "A Night in a Tent by the River", date: "Feb 2026", read: "4 min read" },
];

function BlogPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Stories & Journal"
        title="Field notes from the river."
        subtitle="Travel guides, cultural essays, and quiet observations from our hosts and guests."
        image={villageImg}
      />

      <section className="container-x py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <Link to="/blog" key={i} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute left-4 top-4 rounded-full bg-beige/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-forest">{p.cat}</div>
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl leading-snug text-foreground transition-colors group-hover:text-forest">{p.title}</h3>
                <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.date} · {p.read}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
