import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.png";

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
        scrolled
          ? "bg-forest/95 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)] border-b border-mangrove/40"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <img
            src={logoImg}
            alt="Pealy Eco Resort"
            className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.slice(0, 8).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative px-3 py-2 text-[13px] tracking-wide text-beige/85 transition-colors hover:text-gold"
              activeProps={{ className: "!text-gold" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-forest shadow-lg shadow-gold/30 transition-all hover:-translate-y-0.5 hover:bg-gold/90"
          >
            Book Your Stay
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-beige lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-mangrove/40 bg-forest/97 backdrop-blur-md lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-beige/85 transition-colors hover:bg-mangrove/30 hover:text-gold"
                activeProps={{ className: "!text-gold" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-medium text-forest"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
