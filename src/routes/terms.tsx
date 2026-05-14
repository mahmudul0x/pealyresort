import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import villageImg from "@/assets/village-life.jpg";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Pealy Eco Resort" },
      { name: "description", content: "Booking, cancellation, and stay policies at Pealy Eco Resort & Culture Centre." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Terms & Conditions" image={villageImg} />
      <article className="container-x max-w-3xl py-20 text-foreground/85">
        <p className="text-sm text-muted-foreground">Last updated: May 2026</p>
        {[
          ["Booking & Payment", "A 30% advance is required to confirm a booking. The balance is due on arrival. We accept bKash, Nagad, Rocket, and bank transfer."],
          ["Cancellation Policy", "Free cancellation up to 7 days before check-in. 50% refund between 3–7 days. No refund within 72 hours of check-in."],
          ["Check-in & Check-out", "Check-in 2:00 PM. Check-out 11:00 AM. Early check-in subject to availability."],
          ["Conduct & Safety", "Guests must follow safety guidelines for boat tours and forest excursions. Pealy is not liable for personal items lost during activities."],
          ["Environmental Policy", "We are a no single-use plastic property. Please respect our forest and river — leave no trace."],
          ["Force Majeure", "Pealy is not liable for cancellations caused by weather, natural disasters, or other events beyond our control. Rescheduling is offered free of charge."],
          ["Liability", "Guests participate in tours at their own risk. We strongly recommend personal travel insurance."],
        ].map(([t, d]) => (
          <section key={t} className="mt-10">
            <h2 className="font-display text-2xl text-forest">{t}</h2>
            <p className="mt-3 leading-relaxed">{d}</p>
          </section>
        ))}
      </article>
    </SiteLayout>
  ),
});
