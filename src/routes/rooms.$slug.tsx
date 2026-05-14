import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ROOMS } from "@/lib/rooms-data";
import { ArrowLeft, ArrowRight, Bath, Bed, Check, Users, Wind } from "lucide-react";

export const Route = createFileRoute("/rooms/$slug")({
  loader: ({ params }) => {
    const room = ROOMS.find((r) => r.slug === params.slug);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.room;
    return {
      meta: [
        { title: r ? `${r.name} — Pealy Eco Resort` : "Room — Pealy Eco Resort" },
        { name: "description", content: r?.short ?? "Eco-luxury rooms at Pealy Eco Resort." },
        { property: "og:title", content: r?.name ?? "Pealy Eco Resort" },
        { property: "og:description", content: r?.short ?? "" },
        { property: "og:image", content: r?.img ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-4xl">Room not found</h1>
        <Link to="/rooms" className="mt-6 inline-block text-forest hover:text-gold">← Back to rooms</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <p className="text-destructive">{error.message}</p>
        <button onClick={reset} className="mt-4 rounded-full bg-forest px-5 py-2 text-sm text-beige">Retry</button>
      </div>
    </SiteLayout>
  ),
  component: RoomDetail,
});

function RoomDetail() {
  const { room } = Route.useLoaderData();
  const idx = ROOMS.findIndex((r) => r.slug === room.slug);
  const next = ROOMS[(idx + 1) % ROOMS.length];

  return (
    <SiteLayout>
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden">
        <img src={room.img} alt={room.name} className="absolute inset-0 h-full w-full object-cover ken-burns" />
        <div className="absolute inset-0 gradient-overlay-soft" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-16 text-beige">
          <Link to="/rooms" className="mb-8 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.3em] text-beige/80 hover:text-gold">
            <ArrowLeft size={14} /> All rooms
          </Link>
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">{room.size} · {room.view}</div>
          <h1 className="reveal mt-4 max-w-3xl font-display text-5xl text-balance md:text-7xl">{room.name}</h1>
          <p className="reveal reveal-delay-1 mt-5 max-w-xl text-beige/85 md:text-lg">{room.short}</p>
        </div>
      </section>

      <section className="container-x py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">About this stay</div>
            <h2 className="mt-4 font-display text-4xl text-balance md:text-5xl">A room with a river inside it.</h2>
            <p className="mt-6 leading-[1.85] text-muted-foreground">{room.long}</p>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Sleeps" value={room.occ.replace("Up to ", "")} Icon={Users} />
              <Stat label="Bath" value={room.bath} Icon={Bath} />
              <Stat label="Climate" value={room.ac} Icon={Wind} />
              <Stat label="Size" value={room.size} Icon={Bed} />
            </div>

            <div className="mt-14">
              <h3 className="font-display text-2xl text-forest">Amenities</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {room.amenities.map((a: string) => (
                  <li key={a} className="flex items-center gap-3 text-sm text-foreground/85">
                    <Check size={16} className="text-gold" /> {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {room.gallery.map((g: string, i: number) => (
                <img key={i} src={g} alt="" loading="lazy" className="h-44 w-full rounded-md object-cover sm:h-56" />
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-32 rounded-md border border-border bg-card p-8">
              <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Direct booking</div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="font-display text-4xl text-forest">৳ {room.price.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">/ night</div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Best-rate guarantee. Free cancellation up to 7 days before arrival.</p>
              <Link to="/booking" search={{ room: room.slug }} className="mt-6 flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm text-beige hover:-translate-y-0.5 transition-transform">
                Reserve this room <ArrowRight size={14} />
              </Link>
              <a href="https://wa.me/8801911040463" target="_blank" rel="noopener" className="mt-3 flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm text-foreground hover:bg-secondary">
                Ask on WhatsApp
              </a>
              <ul className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
                <li className="flex gap-2"><Check size={14} className="text-mangrove" /> All meals included</li>
                <li className="flex gap-2"><Check size={14} className="text-mangrove" /> Cultural evening every night</li>
                <li className="flex gap-2"><Check size={14} className="text-mangrove" /> Pickup from Mongla on request</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-mangrove">Next stay</div>
            <Link to="/rooms/$slug" params={{ slug: next.slug }} className="mt-2 block font-display text-3xl text-forest hover:text-gold md:text-4xl">{next.name} →</Link>
          </div>
          <Link to="/rooms" className="text-sm uppercase tracking-[0.3em] text-foreground hover:text-gold">All rooms</Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ label, value, Icon }: { label: string; value: string; Icon: typeof Users }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <Icon size={18} className="text-gold" />
      <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
