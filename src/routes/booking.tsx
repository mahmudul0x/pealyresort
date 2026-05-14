import { createFileRoute, useSearch } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useMemo, useState } from "react";
import { z } from "zod";
import cottageImg from "@/assets/cottage-river.jpg";
import { ROOMS, ADDONS } from "@/lib/rooms-data";
import { ArrowLeft, ArrowRight, Calendar, Check, CreditCard, Mail, MapPin, Phone, ShieldCheck, Sparkles, User, Users } from "lucide-react";

const searchSchema = z.object({
  room: z.string().optional(),
});

export const Route = createFileRoute("/booking")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Book Your Stay — Pealy Eco Resort" },
      { name: "description", content: "Reserve your Sundarbans journey in 4 simple steps. Real-time pricing, instant WhatsApp confirmation, secure mobile payments." },
      { property: "og:title", content: "Book Your Stay" },
      { property: "og:url", content: "/booking" },
      { property: "og:image", content: cottageImg },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: BookingPage,
});

type Step = 0 | 1 | 2 | 3 | 4;
const STEP_LABELS = ["Dates & Guests", "Choose Room", "Add Experiences", "Your Details", "Confirm"];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  country: z.string().trim().min(2, "Country required").max(60),
  notes: z.string().max(500).optional(),
});

const today = () => new Date().toISOString().split("T")[0];

function BookingPage() {
  const search = useSearch({ from: "/booking" });
  const initialRoom = useMemo(() => ROOMS.find((r) => r.slug === search.room) ?? ROOMS[0], [search.room]);

  const [step, setStep] = useState<Step>(0);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(initialRoom);
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "", country: "Bangladesh", notes: "" });
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState("bKash");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const guests = adults + children;
  const nights = useMemo(() => {
    if (!checkin || !checkout) return 0;
    const d = (new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000;
    return Math.max(0, Math.round(d));
  }, [checkin, checkout]);

  const roomTotal = room.price * Math.max(1, nights);
  const addonTotal = ADDONS.filter((a) => addons[a.id]).reduce((s, a) => s + a.price * Math.max(1, guests), 0);
  const subtotal = roomTotal + addonTotal;
  const discount = coupon.trim().toUpperCase() === "PEALY10" ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + tax;
  const advance = Math.round(total * 0.3);

  function validateStep(s: Step): boolean {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!checkin) e.checkin = "Pick a check-in date";
      if (!checkout) e.checkout = "Pick a check-out date";
      if (checkin && checkout && nights < 1) e.checkout = "Check-out must be after check-in";
      if (adults < 1) e.adults = "At least 1 adult";
    }
    if (s === 3) {
      const res = contactSchema.safeParse(contact);
      if (!res.success) res.error.issues.forEach((i) => { e[String(i.path[0])] = i.message; });
    }
    if (s === 4 && !agree) e.agree = "Please accept the terms to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    setStep((s) => (Math.min(4, s + 1) as Step));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function back() {
    setStep((s) => (Math.max(0, s - 1) as Step));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function confirm() {
    if (!validateStep(4)) return;
    const ref = "PEALY-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setReference(ref);
    const lines = [
      `New booking inquiry — ${ref}`,
      ``,
      `Name: ${contact.name}`,
      `Phone: ${contact.phone}`,
      `Email: ${contact.email}`,
      `Country: ${contact.country}`,
      ``,
      `Room: ${room.name}`,
      `Check-in: ${checkin}`,
      `Check-out: ${checkout}`,
      `Nights: ${nights}`,
      `Guests: ${adults} adults, ${children} children`,
      ``,
      `Add-ons: ${ADDONS.filter((a) => addons[a.id]).map((a) => a.name).join(", ") || "—"}`,
      `Subtotal: ৳${subtotal.toLocaleString()}`,
      `Discount: ৳${discount.toLocaleString()}`,
      `Tax (5%): ৳${tax.toLocaleString()}`,
      `Total: ৳${total.toLocaleString()}`,
      `Advance (30%): ৳${advance.toLocaleString()} via ${payment}`,
      ``,
      `Notes: ${contact.notes || "—"}`,
    ].join("\n");
    const msg = encodeURIComponent(lines);
    if (typeof window !== "undefined") window.open(`https://wa.me/8801911040463?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  return (
    <SiteLayout>
      {/* Slim hero */}
      <section className="relative h-[36vh] min-h-[280px] w-full overflow-hidden">
        <img src={cottageImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 gradient-overlay-soft" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-12 text-beige">
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Reserve Your Journey</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-balance md:text-6xl">Book your stay at Pealy.</h1>
        </div>
      </section>

      {submitted ? (
        <ConfirmationView reference={reference} room={room} checkin={checkin} checkout={checkout} guests={guests} total={total} advance={advance} payment={payment} />
      ) : (
        <section className="container-x py-16">
          {/* Stepper */}
          <ol className="mb-12 flex flex-wrap items-center gap-3 text-xs">
            {STEP_LABELS.map((l, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <li key={l} className="flex items-center gap-3">
                  <div className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-medium ${done ? "bg-mangrove text-beige" : active ? "bg-gold text-foreground" : "bg-secondary text-muted-foreground"}`}>
                    {done ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={`uppercase tracking-[0.2em] ${active ? "text-foreground" : done ? "text-mangrove" : "text-muted-foreground"}`}>{l}</span>
                  {i < STEP_LABELS.length - 1 && <span className="hidden h-px w-10 bg-border md:block" />}
                </li>
              );
            })}
          </ol>

          <div className="grid gap-12 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              {step === 0 && <StepDates {...{ checkin, setCheckin, checkout, setCheckout, adults, setAdults, children, setChildren, nights, errors }} />}
              {step === 1 && <StepRoom selected={room} onSelect={setRoom} guests={guests} />}
              {step === 2 && <StepAddons addons={addons} setAddons={setAddons} />}
              {step === 3 && <StepContact contact={contact} setContact={setContact} errors={errors} />}
              {step === 4 && <StepReview {...{ room, checkin, checkout, nights, adults, children, addons, contact, coupon, setCoupon, payment, setPayment, agree, setAgree, errors }} />}

              <div className="flex items-center justify-between border-t border-border pt-8">
                <button type="button" onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground disabled:opacity-40">
                  <ArrowLeft size={14} /> Back
                </button>
                {step < 4 ? (
                  <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-sm text-beige hover:-translate-y-0.5 transition-transform">
                    Continue <ArrowRight size={14} />
                  </button>
                ) : (
                  <button type="button" onClick={confirm} className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-foreground hover:-translate-y-0.5 transition-transform">
                    Confirm via WhatsApp <Check size={14} />
                  </button>
                )}
              </div>
            </div>

            <aside className="lg:col-span-5">
              <Summary {...{ room, checkin, checkout, nights, adults, children, addons, subtotal, discount, tax, total, advance, payment }} />
            </aside>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

/* ============== Steps ============== */

function StepDates({ checkin, setCheckin, checkout, setCheckout, adults, setAdults, children, setChildren, nights, errors }: any) {
  return (
    <Card title="When would you like to stay?" subtitle="Pick your dates and how many guests are travelling.">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Check-in" Icon={Calendar}>
          <input type="date" min={today()} value={checkin} onChange={(e) => setCheckin(e.target.value)} className={inputCls} />
          {errors.checkin && <ErrText>{errors.checkin}</ErrText>}
        </Field>
        <Field label="Check-out" Icon={Calendar}>
          <input type="date" min={checkin || today()} value={checkout} onChange={(e) => setCheckout(e.target.value)} className={inputCls} />
          {errors.checkout && <ErrText>{errors.checkout}</ErrText>}
        </Field>
      </div>
      {nights > 0 && (
        <div className="rounded-md bg-secondary px-4 py-3 text-sm text-forest">
          <span className="font-medium">{nights}</span> {nights === 1 ? "night" : "nights"} selected
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Adults" Icon={Users}>
          <Stepper value={adults} min={1} max={20} onChange={setAdults} />
          {errors.adults && <ErrText>{errors.adults}</ErrText>}
        </Field>
        <Field label="Children" Icon={User}>
          <Stepper value={children} min={0} max={10} onChange={setChildren} />
        </Field>
      </div>
    </Card>
  );
}

function StepRoom({ selected, onSelect, guests }: { selected: typeof ROOMS[0]; onSelect: (r: typeof ROOMS[0]) => void; guests: number }) {
  return (
    <Card title="Choose your room" subtitle="All rooms include meals, cultural evenings, and Wi-Fi in the lounge.">
      <div className="grid gap-4">
        {ROOMS.map((r) => {
          const active = selected.slug === r.slug;
          const maxGuests = parseInt(r.occ.replace(/\D/g, "")) || 99;
          const tooSmall = guests > maxGuests;
          return (
            <button
              key={r.slug}
              type="button"
              onClick={() => !tooSmall && onSelect(r)}
              disabled={tooSmall}
              className={`flex w-full items-stretch gap-5 rounded-md border p-3 text-left transition-all ${active ? "border-forest bg-secondary ring-2 ring-gold/30" : "border-border bg-card hover:border-mangrove"} ${tooSmall ? "opacity-40" : ""}`}
            >
              <img src={r.img} alt={r.name} loading="lazy" className="h-28 w-36 flex-none rounded object-cover sm:h-32 sm:w-44" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-xl text-forest">{r.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{r.size} · {r.view} · {r.occ}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg text-gold">৳ {r.price.toLocaleString()}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">/ night</div>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.short}</p>
                {tooSmall && <div className="mt-2 text-xs text-destructive">Capacity exceeded — choose a larger room.</div>}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function StepAddons({ addons, setAddons }: { addons: Record<string, boolean>; setAddons: (a: Record<string, boolean>) => void }) {
  return (
    <Card title="Add experiences" subtitle="Optional. Pricing is per guest per add-on.">
      <div className="grid gap-3 sm:grid-cols-2">
        {ADDONS.map((a) => {
          const on = !!addons[a.id];
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setAddons({ ...addons, [a.id]: !on })}
              className={`flex items-start gap-4 rounded-md border p-5 text-left transition-all ${on ? "border-forest bg-secondary ring-2 ring-gold/30" : "border-border bg-card hover:border-mangrove"}`}
            >
              <div className={`mt-0.5 grid h-6 w-6 flex-none place-items-center rounded ${on ? "bg-gold text-foreground" : "border border-border bg-background"}`}>
                {on && <Check size={14} />}
              </div>
              <div className="flex-1">
                <div className="font-display text-lg text-forest">{a.name}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-mangrove">৳ {a.price.toLocaleString()} / person</div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function StepContact({ contact, setContact, errors }: any) {
  const set = (k: string, v: string) => setContact({ ...contact, [k]: v });
  return (
    <Card title="Your details" subtitle="We'll send your confirmation here.">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" Icon={User}>
          <input value={contact.name} onChange={(e) => set("name", e.target.value)} placeholder="Anika Rahman" className={inputCls} />
          {errors.name && <ErrText>{errors.name}</ErrText>}
        </Field>
        <Field label="Phone" Icon={Phone}>
          <input value={contact.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+880 17xx-xxxxxx" className={inputCls} />
          {errors.phone && <ErrText>{errors.phone}</ErrText>}
        </Field>
        <Field label="Email" Icon={Mail}>
          <input type="email" value={contact.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" className={inputCls} />
          {errors.email && <ErrText>{errors.email}</ErrText>}
        </Field>
        <Field label="Country" Icon={MapPin}>
          <input value={contact.country} onChange={(e) => set("country", e.target.value)} placeholder="Bangladesh" className={inputCls} />
          {errors.country && <ErrText>{errors.country}</ErrText>}
        </Field>
      </div>
      <Field label="Special requests (optional)" Icon={Sparkles}>
        <textarea rows={4} value={contact.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Dietary preferences, anniversary celebrations, accessibility needs…" className={inputCls} />
      </Field>
    </Card>
  );
}

function StepReview({ room, checkin, checkout, nights, adults, children, addons, contact, coupon, setCoupon, payment, setPayment, agree, setAgree, errors }: any) {
  return (
    <>
      <Card title="Review your booking" subtitle="Confirm the details below — we'll send everything to your WhatsApp.">
        <div className="divide-y divide-border rounded-md border border-border bg-card text-sm">
          <ReviewRow label="Room" value={room.name} />
          <ReviewRow label="Stay" value={`${checkin} → ${checkout} (${nights} ${nights === 1 ? "night" : "nights"})`} />
          <ReviewRow label="Guests" value={`${adults} adults${children ? `, ${children} children` : ""}`} />
          <ReviewRow label="Add-ons" value={ADDONS.filter((a) => addons[a.id]).map((a) => a.name).join(", ") || "—"} />
          <ReviewRow label="Guest" value={`${contact.name} · ${contact.phone}`} />
        </div>
      </Card>

      <Card title="Promo & payment" subtitle="A 30% advance secures your booking. Balance on arrival.">
        <Field label="Coupon code" Icon={Sparkles}>
          <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Try PEALY10" className={inputCls} />
        </Field>
        <Field label="Pay advance via" Icon={CreditCard}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["bKash", "Nagad", "Rocket", "Bank Transfer"].map((m) => (
              <label key={m} className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-sm ${payment === m ? "border-forest bg-secondary" : "border-border bg-card"}`}>
                <input type="radio" name="payment" checked={payment === m} onChange={() => setPayment(m)} className="accent-forest" />
                <CreditCard size={16} className="text-mangrove" /> {m}
              </label>
            ))}
          </div>
        </Field>
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 accent-forest" />
          <span>I agree to the <a href="/terms" className="text-forest underline">terms</a> and <a href="/privacy" className="text-forest underline">privacy policy</a>. I understand a 30% advance is required to confirm this booking.</span>
        </label>
        {errors.agree && <ErrText>{errors.agree}</ErrText>}
      </Card>
    </>
  );
}

/* ============== Sidebar Summary ============== */

function Summary({ room, checkin, checkout, nights, adults, children, addons, subtotal, discount, tax, total, advance, payment }: any) {
  const selectedAddons = ADDONS.filter((a) => addons[a.id]);
  return (
    <div className="sticky top-32 overflow-hidden rounded-md border border-border bg-card">
      <img src={room.img} alt={room.name} className="h-44 w-full object-cover" />
      <div className="space-y-5 p-7">
        <div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-mangrove">Booking Summary</div>
          <div className="mt-2 font-display text-2xl text-forest">{room.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{room.size} · {room.view}</div>
        </div>
        <div className="space-y-2 border-y border-border py-4 text-sm">
          <Row l="Check-in" v={checkin || "—"} />
          <Row l="Check-out" v={checkout || "—"} />
          <Row l="Nights" v={String(nights || "—")} />
          <Row l="Guests" v={`${adults}A${children ? ` + ${children}C` : ""}`} />
        </div>
        <div className="space-y-2 text-sm">
          <Row l={`Room × ${Math.max(1, nights)} night${nights === 1 ? "" : "s"}`} v={`৳ ${(room.price * Math.max(1, nights)).toLocaleString()}`} />
          {selectedAddons.map((a) => (
            <Row key={a.id} l={a.name} v={`৳ ${(a.price * (adults + children)).toLocaleString()}`} muted />
          ))}
          <Row l="Subtotal" v={`৳ ${subtotal.toLocaleString()}`} />
          {discount > 0 && <Row l="Discount" v={`− ৳ ${discount.toLocaleString()}`} accent />}
          <Row l="Service & tax (5%)" v={`৳ ${tax.toLocaleString()}`} muted />
        </div>
        <div className="flex items-baseline justify-between border-t border-border pt-4">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total</div>
          <div className="font-display text-3xl text-gold">৳ {total.toLocaleString()}</div>
        </div>
        <div className="rounded-md bg-secondary p-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="uppercase tracking-[0.2em] text-mangrove">Advance (30%)</div>
            <div className="font-display text-lg text-forest">৳ {advance.toLocaleString()}</div>
          </div>
          <div className="mt-1 text-muted-foreground">via {payment} · Balance on arrival</div>
        </div>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex gap-2"><ShieldCheck size={14} className="text-mangrove" /> Free cancellation up to 7 days prior</li>
          <li className="flex gap-2"><Check size={14} className="text-mangrove" /> Best-rate guarantee</li>
          <li className="flex gap-2"><Check size={14} className="text-mangrove" /> Pickup from Mongla available</li>
        </ul>
      </div>
    </div>
  );
}

function ConfirmationView({ reference, room, checkin, checkout, guests, total, advance, payment }: any) {
  return (
    <section className="container-x py-24">
      <div className="mx-auto max-w-2xl rounded-md border border-border bg-card p-10 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mangrove text-beige">
          <Check size={32} />
        </div>
        <h2 className="mt-6 font-display text-4xl text-forest">Booking request sent!</h2>
        <p className="mt-3 text-sm text-muted-foreground">We've opened WhatsApp with your booking summary. Our team will confirm availability and share advance payment details within 30 minutes.</p>
        <div className="mt-8 rounded-md bg-secondary p-5 text-left text-sm">
          <Row l="Reference" v={reference} />
          <Row l="Room" v={room.name} />
          <Row l="Stay" v={`${checkin} → ${checkout}`} />
          <Row l="Guests" v={String(guests)} />
          <Row l="Total" v={`৳ ${total.toLocaleString()}`} />
          <Row l="Advance" v={`৳ ${advance.toLocaleString()} via ${payment}`} accent />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/8801911040463" target="_blank" rel="noopener" className="rounded-full bg-forest px-6 py-3 text-sm text-beige">Open WhatsApp again</a>
          <a href="/" className="rounded-full border border-border px-6 py-3 text-sm text-foreground">Back to home</a>
        </div>
      </div>
    </section>
  );
}

/* ============== UI primitives ============== */

const inputCls = "mt-2 block w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-gold/30";

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6 rounded-md border border-border bg-card p-7 md:p-9">
      <div>
        <h3 className="font-display text-2xl text-forest">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({ label, Icon, children }: { label: string; Icon: typeof Calendar; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <Icon size={12} /> {label}
      </label>
      {children}
    </div>
  );
}

function Stepper({ value, onChange, min, max }: { value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <div className="mt-2 flex items-center gap-3">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="grid h-10 w-10 place-items-center rounded-md border border-border bg-background text-lg hover:bg-secondary">−</button>
      <input type="number" min={min} max={max} value={value} onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || min)))} className="w-16 rounded-md border border-input bg-background px-3 py-2.5 text-center text-sm focus:border-forest focus:outline-none" />
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="grid h-10 w-10 place-items-center rounded-md border border-border bg-background text-lg hover:bg-secondary">+</button>
    </div>
  );
}

function Row({ l, v, accent, muted }: { l: string; v: string; accent?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className={muted ? "text-xs text-muted-foreground" : "text-muted-foreground"}>{l}</div>
      <div className={accent ? "text-mangrove" : muted ? "text-xs text-foreground" : "text-foreground"}>{v}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="text-right text-foreground">{value}</div>
    </div>
  );
}

function ErrText({ children }: { children: React.ReactNode }) {
  return <div className="mt-1 text-xs text-destructive">{children}</div>;
}
