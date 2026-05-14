import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-forest text-beige">
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_25%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="container-x relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="font-display text-3xl">Pealy</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-beige/60">
            Eco Resort & Culture Centre
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-beige/75">
            Where mangrove rivers, Bengali heritage, and luxury hospitality
            become one unforgettable journey.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-beige/20 transition-colors hover:bg-beige hover:text-forest">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Explore</div>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["/about", "About Us"],
              ["/rooms", "Rooms"],
              ["/packages", "Packages"],
              ["/tour", "Sundarbans Tour"],
              ["/dining", "Food & Dining"],
              ["/culture", "Culture"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-beige/75 transition-colors hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Guests</div>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["/booking", "Book Your Stay"],
              ["/gallery", "Gallery"],
              ["/blog", "Stories"],
              ["/faq", "FAQ"],
              ["/privacy", "Privacy Policy"],
              ["/terms", "Terms & Conditions"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-beige/75 transition-colors hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Reach Us</div>
          <ul className="mt-5 space-y-4 text-sm text-beige/80">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>Sundarban, West Dhangmari, Banishanta, Dakop, Mongla, Bangladesh</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>
                <a href="tel:+8801911040463" className="block hover:text-gold">+880 1911-040463</a>
                <a href="tel:+8801758149495" className="block hover:text-gold">+880 1758-149495</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href="mailto:pealyecoresort@gmail.com" className="hover:text-gold">pealyecoresort@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col gap-3 border-t border-beige/15 py-6 text-xs text-beige/55 md:flex-row md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Pealy Eco Resort & Culture Centre. All rights reserved.</div>
        <div className="font-display italic text-beige/70">Stay. Learn. Belong.</div>
      </div>
    </footer>
  );
}
