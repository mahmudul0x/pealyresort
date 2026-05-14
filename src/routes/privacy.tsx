import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import villageImg from "@/assets/village-life.jpg";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Pealy Eco Resort" },
      { name: "description", content: "How we collect, use, and protect guest information at Pealy Eco Resort & Culture Centre." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Privacy Policy" image={villageImg} />
      <article className="container-x prose prose-stone max-w-3xl py-20 text-foreground/85">
        <p className="text-sm text-muted-foreground">Last updated: May 2026</p>
        <Section title="Information We Collect">
          We collect information you provide when booking — name, email, phone,
          payment method, and stay preferences. We collect anonymous analytics
          to improve our website.
        </Section>
        <Section title="How We Use It">
          To process bookings, communicate about your stay, send occasional
          updates (only if you opt in), and improve our services. We never sell
          guest data.
        </Section>
        <Section title="Data Retention">
          Booking records are kept for 5 years for accounting and regulatory
          purposes. Marketing data can be removed at any request.
        </Section>
        <Section title="Your Rights">
          You may request access, correction, or deletion of your data at
          pealyecoresort@gmail.com. We respond within 14 days.
        </Section>
        <Section title="Cookies">
          We use essential cookies for site functionality and anonymous
          analytics. No third-party advertising trackers.
        </Section>
        <Section title="Contact">
          Questions about this policy? Email pealyecoresort@gmail.com or call
          +880 1911-040463.
        </Section>
      </article>
    </SiteLayout>
  ),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl text-forest">{title}</h2>
      <p className="mt-3 leading-relaxed">{children}</p>
    </section>
  );
}
