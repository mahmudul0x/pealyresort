import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useState } from "react";
import { z } from "zod";
import villageImg from "@/assets/village-life.jpg";
import { Phone, Mail, MapPin, MessageCircle, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pealy Eco Resort & Culture Centre" },
      { name: "description", content: "Reach our hosts: phone, WhatsApp, email, and location in West Dhangmari, Banishanta, Dakop, Mongla, Bangladesh." },
      { property: "og:title", content: "Contact Pealy" },
      { property: "og:url", content: "/contact" },
      { property: "og:image", content: villageImg },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(5).max(1000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = schema.safeParse({ name: fd.get("name"), email: fd.get("email"), message: fd.get("message") });
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Get in Touch" title="We'd love to hear from you." subtitle="From inquiries to itineraries — our team replies within hours." image={villageImg} />

      <section className="container-x py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Reach us</div>
            <h2 className="mt-4 font-display text-4xl">Let's plan your journey.</h2>
            <div className="mt-10 space-y-6">
              {[
                { Icon: MapPin, t: "Location", v: "Sundarban, West Dhangmari, Banishanta, Dakop, Mongla, Bangladesh" },
                { Icon: Phone, t: "Phone", v: "+880 1911-040463 · +880 1758-149495" },
                { Icon: MessageCircle, t: "WhatsApp", v: "+880 1911-040463" },
                { Icon: Mail, t: "Email", v: "pealyecoresort@gmail.com" },
              ].map(({ Icon, t, v }) => (
                <div key={t} className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mangrove/10 text-mangrove">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{t}</div>
                    <div className="mt-1 text-sm">{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 rounded-md border border-border bg-card p-8 md:p-10 lg:col-span-7">
            <div>
              <Lbl>Your name</Lbl>
              <input name="name" className={cls} placeholder="Anika Rahman" />
              {errors.name && <Err msg={errors.name} />}
            </div>
            <div>
              <Lbl>Email</Lbl>
              <input name="email" type="email" className={cls} placeholder="you@email.com" />
              {errors.email && <Err msg={errors.email} />}
            </div>
            <div>
              <Lbl>Message</Lbl>
              <textarea name="message" rows={6} className={cls} placeholder="Tell us about your trip..." />
              {errors.message && <Err msg={errors.message} />}
            </div>
            <button className="w-full rounded-full bg-forest py-3.5 text-sm font-medium text-beige hover:-translate-y-0.5 transition-transform">
              Send Message
            </button>
            {sent && (
              <div className="flex items-center gap-2 rounded-md bg-mangrove/10 p-4 text-sm text-mangrove">
                <Check size={16} /> Thank you! We'll be in touch shortly.
              </div>
            )}
          </form>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="overflow-hidden rounded-md border border-border">
          <iframe
            title="Pealy Eco Resort Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=89.55%2C22.45%2C89.62%2C22.51&layer=mapnik&marker=22.4793,89.5836"
            className="h-[420px] w-full"
            loading="lazy"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

const cls = "mt-2 block w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold/30";
function Lbl({ children }: { children: React.ReactNode }) {
  return <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{children}</label>;
}
function Err({ msg }: { msg: string }) { return <div className="mt-1 text-xs text-destructive">{msg}</div>; }
