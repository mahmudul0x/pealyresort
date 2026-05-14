import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useState } from "react";
import cottageImg from "@/assets/cottage-river.jpg";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Pealy Eco Resort" },
      { name: "description", content: "Answers to common questions about booking, packages, transfers, food, and the Sundarbans experience." },
      { property: "og:title", content: "Frequently Asked Questions" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FaqPage,
});

const FAQS = [
  { q: "How do I reach Pealy Eco Resort?", a: "Most guests travel to Mongla by road or bus. From Mongla port, our team arranges a complimentary boat pickup as part of every package." },
  { q: "What's the best season to visit?", a: "October to March offers pleasant weather. June–September brings dramatic monsoon scenery with fewer guests and lower rates." },
  { q: "Is the resort family-friendly?", a: "Absolutely. We have family packages, child-safe boats, kid-friendly meals, and dedicated group cottages." },
  { q: "What food do you serve?", a: "Authentic Bengali cuisine: river fish, duck curry, banana-leaf feasts, BBQ nights. We accommodate vegetarian and dietary requirements." },
  { q: "Are there ATMs nearby?", a: "We recommend bringing cash from Mongla. We also accept bKash, Nagad, Rocket, and bank transfers." },
  { q: "Can I see a tiger?", a: "The Royal Bengal Tiger is elusive — most guests don't sight one, but every guest comes home with a story. Sunrise and deep-forest tours offer the best chance." },
  { q: "What's the cancellation policy?", a: "Free cancellation up to 7 days before check-in. 50% refund within 3–7 days. No refund within 72 hours." },
  { q: "Is Wi-Fi available?", a: "Wi-Fi is available in the central lounge. Cottages are intentionally screen-free to help you disconnect." },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <PageHero eyebrow="Help Centre" title="Frequently asked questions." image={cottageImg} />
      <section className="container-x max-w-3xl py-24">
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => (
            <div key={i} className="py-2">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-4 text-left"
              >
                <span className="font-display text-lg text-foreground">{f.q}</span>
                {open === i ? <Minus size={18} className="shrink-0 text-mangrove" /> : <Plus size={18} className="shrink-0 text-mangrove" />}
              </button>
              <div className={`grid overflow-hidden transition-all duration-500 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden text-sm leading-relaxed text-muted-foreground">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
