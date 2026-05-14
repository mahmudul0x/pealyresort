import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden md:h-[68vh] md:min-h-[480px]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover ken-burns"
      />
      <div className="absolute inset-0 gradient-overlay-soft" />
      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-12 text-beige md:pb-20">
        {eyebrow && (
          <div className="reveal text-[11px] uppercase tracking-[0.32em] text-gold">{eyebrow}</div>
        )}
        <h1 className="reveal reveal-delay-1 mt-4 max-w-3xl font-display text-3xl leading-[1.05] text-balance md:text-5xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="reveal reveal-delay-2 mt-4 max-w-xl text-sm leading-relaxed text-beige/85 md:mt-5 md:text-base lg:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
