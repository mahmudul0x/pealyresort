import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/rooms", label: "Rooms" },
  { to: "/packages", label: "Packages" },
  { to: "/dining", label: "Dining" },
  { to: "/culture", label: "Culture" },
  { to: "/tour", label: "Sundarbans Tour" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Stories" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-[0_8px_30px_-15px_rgba(0,0,0,0.2)]" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-forest text-beige transition-transform group-hover:rotate-12">
            <span className="font-display text-lg leading-none">P</span>
          </div>
          <div className="leading-tight">
            <div className={`font-display text-lg ${scrolled ? "text-foreground" : "text-beige"}`}>
              Pealy
            </div>
            <div className={`text-[10px] uppercase tracking-[0.22em] ${scrolled ? "text-muted-foreground" : "text-beige/70"}`}>
              Eco · Resort · Culture
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.slice(0, 8).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative px-3 py-2 text-[13px] tracking-wide transition-colors ${
                scrolled ? "text-foreground/80 hover:text-forest" : "text-beige/85 hover:text-beige"
              }`}
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-foreground shadow-lg shadow-gold/20 transition-transform hover:-translate-y-0.5"
          >
            Book Your Stay
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-beige"}`}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="glass border-t border-border lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-foreground/85 hover:bg-secondary"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-medium text-foreground"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
