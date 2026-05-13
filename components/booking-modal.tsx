"use client";

import { useEffect, useMemo, useState } from "react";

type BookingService = { key: string; title: string; blurb: string; priceHint: string; durHint: string };

const BOOKING_SERVICES: BookingService[] = [
  { key: "full",   title: "Full Groom",    blurb: "Bath, shampoo, dry, brush, ears & nails.", priceHint: "from £40", durHint: "~2 hrs" },
  { key: "deshed", title: "De-Shed Groom", blurb: "Deshed treatment for double coats.",       priceHint: "from £30", durHint: "~90 min" },
  { key: "puppy",  title: "Puppy Intro",   blurb: "Gentle first salon visit.",                priceHint: "from £30", durHint: "~75 min" },
  { key: "wash",   title: "Wash & Fluff",  blurb: "Quick freshen up, no clip.",               priceHint: "from £30", durHint: "~60 min" },
];

type SizeRow = [string, string, string, string]; // [key, label, hint, price]

const SIZES: Record<string, SizeRow[]> = {
  full:   [["tiny","Tiny","Yorkie, Maltese","£40"], ["small","Small","Lhasa, Shih Tzu","£45"], ["medium","Medium","Cockapoo, Schnauzer","£50"], ["large","Large / XL","Lab, Retriever, GSD","£60+"], ["chow","Chow Chow","Specialist coat","£80"]],
  deshed: [["small","Small","Pug, Frenchie","£30"], ["medium","Medium","Beagle, Staffy","£35"], ["large","Large / XL","Lab, Dalmatian","£40+"]],
  puppy:  [["any","Up to 6 months","All breeds","£30+"]],
  wash:   [["tiny","Tiny","","£30"], ["small","Small","","£35"], ["medium","Medium","","£40"], ["large","Large / XL","","£50+"]],
};

const ADDONS: Array<[string, string, string]> = [
  ["nail",   "Nail Trim",          "£7"],
  ["ears",   "Ears Cleaned",       "£7"],
  ["facial", "Deep Cleanse Facial","£10"],
  ["mud",    "Mud Bath",           "£10"],
  ["paw",    "Pawdicure",          "£7"],
  ["dryface","Dry Face Trim",      "£10"],
];

const TIME_SLOTS = ["9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];

function todayPlusDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}
function fmtFull(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

type Contact = { name: string; phone: string; dogName: string; breed: string; notes: string; pickup: boolean };

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<BookingService | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [addons, setAddons] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [contact, setContact] = useState<Contact>({
    name: "", phone: "", dogName: "", breed: "", notes: "", pickup: false,
  });

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep(0);
        setService(null);
        setSize(null);
        setAddons([]);
        setDate(null);
        setSlot(null);
        setContact({ name: "", phone: "", dogName: "", breed: "", notes: "", pickup: false });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);

  const totalEstimate = useMemo(() => {
    if (!service || !size) return null;
    const sizeRow = SIZES[service.key].find((s) => s[0] === size);
    if (!sizeRow) return null;
    const base = parseInt(sizeRow[3].replace(/[^0-9]/g, ""), 10);
    const addonSum = addons.reduce((acc, a) => {
      const row = ADDONS.find((x) => x[0] === a);
      if (!row) return acc;
      return acc + parseInt(row[2].replace(/[^0-9]/g, ""), 10);
    }, 0);
    return { base, addonSum, total: base + addonSum, plus: sizeRow[3].includes("+") };
  }, [service, size, addons]);

  if (!open) return null;

  const steps = ["Service", "Size", "Add-ons", "Date & time", "Your details", "Confirm"];

  const canNext = () => {
    if (step === 0) return !!service;
    if (step === 1) return !!size;
    if (step === 2) return true;
    if (step === 3) return !!date && !!slot;
    if (step === 4) return contact.name && contact.phone && contact.dogName;
    return true;
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(42, 29, 16, 0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "grid", placeItems: "center",
        padding: 24,
        animation: "mr-fade-in .25s ease",
      }}
      onClick={onClose}
    >
      <div
        className="booking-shell"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          width: "min(960px, 100%)",
          maxHeight: "calc(100vh - 48px)",
          borderRadius: 24,
          border: "1.5px solid var(--ink)",
          boxShadow: "0 30px 80px -10px rgba(0,0,0,.4)",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          overflow: "hidden",
          animation: "mr-slide-up .35s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <aside
          className="booking-aside"
          style={{
            background: "var(--ink)", color: "var(--bg)",
            padding: "32px 28px",
            display: "flex", flexDirection: "column",
          }}
        >
          <div className="brand" style={{ marginBottom: 32 }}>
            <LogoMark size={36} ring="var(--gold-soft)" fill="transparent" glyph="var(--gold-soft)" />
            <div>
              <div className="name" style={{ fontSize: 16, color: "var(--bg)" }}>Book a groom</div>
              <div className="sub" style={{ color: "rgba(251,246,236,.55)", fontSize: 9 }}>with Mic · Glasgow</div>
            </div>
          </div>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {steps.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li
                  key={s}
                  onClick={() => i < step && setStep(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "12px 14px",
                    borderRadius: 12,
                    cursor: i < step ? "pointer" : "default",
                    background: active ? "rgba(184,146,60,.18)" : "transparent",
                    color: active ? "var(--gold-soft)" : done ? "rgba(251,246,236,.85)" : "rgba(251,246,236,.45)",
                    fontWeight: 600, fontSize: 13,
                    transition: "background .2s",
                  }}
                >
                  <span
                    style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: active ? "var(--gold)" : done ? "var(--gold-soft)" : "transparent",
                      color: active || done ? "var(--ink)" : "rgba(251,246,236,.45)",
                      border: active || done ? "none" : "1px solid rgba(251,246,236,.25)",
                      display: "grid", placeItems: "center",
                      fontSize: 11, fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  {s}
                </li>
              );
            })}
          </ol>

          {totalEstimate && (
            <div
              style={{
                marginTop: 24, padding: 16,
                background: "rgba(184,146,60,.12)",
                borderRadius: 14,
                border: "1px solid rgba(184,146,60,.3)",
              }}
            >
              <div className="eyebrow" style={{ color: "var(--gold-soft)", marginBottom: 8 }}>Estimate</div>
              <div className="display" style={{ fontSize: 32, color: "var(--gold-soft)" }}>
                £{totalEstimate.total}{totalEstimate.plus ? "+" : ""}
              </div>
              <div style={{ fontSize: 11, color: "rgba(251,246,236,.55)", marginTop: 4 }}>
                Final price confirmed at your visit
              </div>
            </div>
          )}
        </aside>

        <main
          style={{
            padding: "36px 40px",
            display: "flex", flexDirection: "column",
            minHeight: 540, maxHeight: "calc(100vh - 48px)",
            overflow: "hidden",
          }}
        >
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div className="eyebrow">Step {step + 1} of {steps.length}</div>
            <button
              onClick={onClose}
              style={{
                all: "unset", cursor: "pointer",
                width: 32, height: 32, borderRadius: "50%",
                display: "grid", placeItems: "center",
                color: "var(--muted)", border: "1px solid var(--line)",
              }}
              aria-label="Close booking"
            >
              ×
            </button>
          </header>

          <div style={{ flex: 1, overflowY: "auto", paddingRight: 8 }}>
            {step === 0 && <StepService service={service} setService={setService} />}
            {step === 1 && service && <StepSize service={service} size={size} setSize={setSize} />}
            {step === 2 && <StepAddons addons={addons} setAddons={setAddons} />}
            {step === 3 && <StepDate date={date} setDate={setDate} slot={slot} setSlot={setSlot} />}
            {step === 4 && <StepContact contact={contact} setContact={setContact} />}
            {step === 5 && (
              <StepConfirm
                service={service}
                size={size}
                addons={addons}
                date={date}
                slot={slot}
                contact={contact}
                total={totalEstimate}
                onClose={onClose}
              />
            )}
          </div>

          {step < 5 && (
            <footer
              style={{
                display: "flex", justifyContent: "space-between",
                paddingTop: 20,
                borderTop: "1px solid var(--line)",
                marginTop: 12,
              }}
            >
              <button
                className="btn btn-outline"
                style={{ opacity: step === 0 ? 0.35 : 1 }}
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                ← Back
              </button>
              <button
                className="btn btn-pill"
                style={{ opacity: canNext() ? 1 : 0.4, pointerEvents: canNext() ? "auto" : "none" }}
                onClick={() => setStep((s) => s + 1)}
              >
                {step === 4 ? "Review booking" : "Continue"} <ArrowRight />
              </button>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}

/* ─── Step components ──────────────────────────────────────────── */
function StepHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 className="display" style={{ fontSize: 32, margin: 0, lineHeight: 1.1 }}>{title}</h3>
      {sub && <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{sub}</p>}
    </div>
  );
}

function StepService({
  service, setService,
}: {
  service: BookingService | null;
  setService: (s: BookingService) => void;
}) {
  return (
    <div>
      <StepHead title="What does your pooch need?" sub="Pick the service that fits best — we can adjust at the salon if needed." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {BOOKING_SERVICES.map((s) => {
          const active = service?.key === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setService(s)}
              style={{
                all: "unset", cursor: "pointer", padding: 20, borderRadius: 18,
                background: active ? "var(--ink)" : "var(--card)",
                color: active ? "var(--bg)" : "var(--ink)",
                border: active ? "1.5px solid var(--ink)" : "1.5px solid var(--line)",
                boxShadow: active ? "var(--shadow-chunk)" : "var(--shadow-sm)",
                transition: "all .15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <h4 className="display" style={{ fontSize: 24, margin: 0 }}>{s.title}</h4>
                {active && <CheckIconSm dark />}
              </div>
              <p style={{ fontSize: 13, opacity: 0.75, marginTop: 6, marginBottom: 16, lineHeight: 1.45 }}>{s.blurb}</p>
              <div style={{ display: "flex", gap: 16, fontSize: 12, fontWeight: 600 }}>
                <span style={{ color: active ? "var(--gold-soft)" : "var(--gold-deep)" }}>{s.priceHint}</span>
                <span style={{ opacity: 0.65 }}>{s.durHint}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckIconSm({ dark }: { dark?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill={dark ? "var(--gold)" : "var(--ink)"} />
      <path
        d="M7 12.4l3.2 3.2L17 8.8"
        stroke={dark ? "var(--ink)" : "var(--bg)"}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepSize({
  service, size, setSize,
}: {
  service: BookingService;
  size: string | null;
  setSize: (s: string) => void;
}) {
  const sizes = SIZES[service.key];
  return (
    <div>
      <StepHead
        title={`How big is ${service.key === "puppy" ? "your puppy" : "your pooch"}?`}
        sub="Honest sizing helps Mic plan the day. We'll always reconfirm in person."
      />
      <div style={{ display: "grid", gap: 10 }}>
        {sizes.map((s) => {
          const active = size === s[0];
          return (
            <button
              key={s[0]}
              onClick={() => setSize(s[0])}
              style={{
                all: "unset", cursor: "pointer",
                padding: "18px 22px", borderRadius: 14,
                background: active ? "var(--gold)" : "var(--card)",
                border: active ? "1.5px solid var(--gold-deep)" : "1.5px solid var(--line)",
                boxShadow: active ? "var(--shadow-chunk)" : "none",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto",
                gap: 18, alignItems: "center",
              }}
            >
              <span
                style={{
                  width: 24, height: 24, borderRadius: "50%",
                  border: active ? "none" : "1.5px solid var(--line)",
                  background: active ? "var(--ink)" : "transparent",
                  display: "grid", placeItems: "center",
                }}
              >
                {active && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)" }} />}
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{s[1]}</div>
                {s[2] && (
                  <div style={{ fontFamily: "var(--accent-stack)", fontStyle: "italic", color: "var(--ink-2)", fontSize: 13 }}>
                    {s[2]}
                  </div>
                )}
              </div>
              <span className="display" style={{ fontSize: 24, color: "var(--gold-deep)" }}>{s[3]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepAddons({
  addons, setAddons,
}: {
  addons: string[];
  setAddons: (a: string[]) => void;
}) {
  const toggle = (key: string) =>
    setAddons(addons.includes(key) ? addons.filter((a) => a !== key) : [...addons, key]);
  return (
    <div>
      <StepHead title="Any little extras?" sub="Optional — Mic will mention them at drop-off too. Skip if you're not sure." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {ADDONS.map(([k, label, price]) => {
          const active = addons.includes(k);
          return (
            <button
              key={k}
              onClick={() => toggle(k)}
              style={{
                all: "unset", cursor: "pointer",
                padding: "16px 20px", borderRadius: 14,
                background: active ? "var(--ink)" : "var(--card)",
                color: active ? "var(--bg)" : "var(--ink)",
                border: active ? "1.5px solid var(--ink)" : "1.5px solid var(--line)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 600 }}>
                <span
                  style={{
                    width: 20, height: 20, borderRadius: 6,
                    border: active ? "none" : "1.5px solid var(--line)",
                    background: active ? "var(--gold)" : "transparent",
                    display: "grid", placeItems: "center",
                    fontSize: 12, color: "var(--ink)", fontWeight: 700,
                  }}
                >
                  {active ? "✓" : ""}
                </span>
                {label}
              </span>
              <span className="display" style={{ fontSize: 20, color: active ? "var(--gold-soft)" : "var(--gold-deep)" }}>{price}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDate({
  date, setDate, slot, setSlot,
}: {
  date: Date | null;
  setDate: (d: Date) => void;
  slot: string | null;
  setSlot: (s: string | null) => void;
}) {
  const days: Date[] = [];
  for (let i = 1; i <= 28; i++) {
    const d = todayPlusDays(i);
    const dow = d.getDay();
    if (dow === 0 || dow === 1) continue;
    days.push(d);
    if (days.length >= 14) break;
  }
  const selectedKey = date && date.toDateString();
  const bookedFor = (d: Date | null) => {
    if (!d) return [] as string[];
    const seed = d.getDate();
    return TIME_SLOTS.filter((_, i) => (seed * 7 + i * 3) % 5 === 0);
  };
  const booked = bookedFor(date);

  return (
    <div>
      <StepHead title="When works for you?" sub="Mic grooms Tue – Sat. Closed Sun & Mon." />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Pick a date</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {days.map((d) => {
              const active = d.toDateString() === selectedKey;
              return (
                <button
                  key={d.toDateString()}
                  onClick={() => {
                    setDate(d);
                    setSlot(null);
                  }}
                  style={{
                    all: "unset", cursor: "pointer",
                    padding: "12px 6px", textAlign: "center", borderRadius: 12,
                    background: active ? "var(--ink)" : "var(--card)",
                    color: active ? "var(--bg)" : "var(--ink)",
                    border: active ? "1.5px solid var(--ink)" : "1px solid var(--line)",
                  }}
                >
                  <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: active ? "var(--gold-soft)" : "var(--muted)" }}>
                    {d.toLocaleDateString("en-GB", { weekday: "short" })}
                  </div>
                  <div className="display" style={{ fontSize: 22, lineHeight: 1.1, marginTop: 2 }}>
                    {d.getDate()}
                  </div>
                  <div style={{ fontSize: 10, color: active ? "var(--gold-soft)" : "var(--muted)" }}>
                    {d.toLocaleDateString("en-GB", { month: "short" })}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Pick a time</div>
          {!date ? (
            <div
              style={{
                padding: "32px 16px", textAlign: "center",
                color: "var(--muted)", fontSize: 13,
                border: "1px dashed var(--line)", borderRadius: 14,
              }}
            >
              Pick a date first 🐾
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {TIME_SLOTS.map((t) => {
                const isBooked = booked.includes(t);
                const active = slot === t;
                return (
                  <button
                    key={t}
                    disabled={isBooked}
                    onClick={() => setSlot(t)}
                    style={{
                      all: "unset",
                      cursor: isBooked ? "not-allowed" : "pointer",
                      padding: "12px 10px",
                      textAlign: "center",
                      borderRadius: 10,
                      background: isBooked ? "transparent" : active ? "var(--gold)" : "var(--card)",
                      color: isBooked ? "var(--muted)" : "var(--ink)",
                      border: active ? "1.5px solid var(--gold-deep)" : "1px solid var(--line)",
                      textDecoration: isBooked ? "line-through" : "none",
                      fontWeight: 700, fontSize: 14,
                      opacity: isBooked ? 0.5 : 1,
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepContact({
  contact, setContact,
}: {
  contact: Contact;
  setContact: (c: Contact) => void;
}) {
  const upd = (k: keyof Contact, v: string | boolean) => setContact({ ...contact, [k]: v });
  return (
    <div>
      <StepHead
        title="Tell Mic about you (and your pooch)."
        sub="A quick text from Mic confirms the booking. Notes help her prep — anxious, matted, on meds, etc."
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Field label="Your name *" v={contact.name} on={(v) => upd("name", v)} ph="Jane Smith" />
        <Field label="Mobile *" v={contact.phone} on={(v) => upd("phone", v)} ph="07…" type="tel" />
        <Field label="Dog's name *" v={contact.dogName} on={(v) => upd("dogName", v)} ph="Bessie" />
        <Field label="Breed" v={contact.breed} on={(v) => upd("breed", v)} ph="Cockapoo" />
      </div>
      <div style={{ marginTop: 14 }}>
        <label className="eyebrow" style={{ display: "block", marginBottom: 8 }}>Anything Mic should know?</label>
        <textarea
          value={contact.notes}
          onChange={(e) => upd("notes", e.target.value)}
          placeholder="Behaviour, allergies, coat condition, previous bad grooms — anything goes."
          style={{
            width: "100%", minHeight: 90, padding: "14px 16px",
            border: "1.5px solid var(--line)", borderRadius: 14,
            background: "var(--card)", fontFamily: "var(--body-stack)",
            fontSize: 14, resize: "vertical", outline: "none", color: "var(--ink)",
          }}
        />
      </div>
      <label
        style={{
          display: "flex", alignItems: "center", gap: 12,
          marginTop: 18, padding: "14px 18px",
          border: "1.5px solid var(--line)", borderRadius: 14,
          cursor: "pointer",
          background: contact.pickup ? "rgba(184,146,60,.1)" : "var(--card)",
        }}
      >
        <input
          type="checkbox"
          checked={contact.pickup}
          onChange={(e) => upd("pickup", e.target.checked)}
          style={{ display: "none" }}
        />
        <span
          style={{
            width: 22, height: 22, borderRadius: 6,
            border: contact.pickup ? "none" : "1.5px solid var(--line)",
            background: contact.pickup ? "var(--gold)" : "transparent",
            display: "grid", placeItems: "center",
            fontSize: 13, color: "var(--ink)", fontWeight: 700,
          }}
        >
          {contact.pickup ? "✓" : ""}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>I'd like pickup & drop-off</div>
          <div style={{ color: "var(--muted)", fontSize: 12 }}>Free within 2 miles · £6 within 5 miles · Mic will text to arrange</div>
        </div>
      </label>
    </div>
  );
}

function Field({
  label, v, on, ph, type = "text",
}: {
  label: string;
  v: string;
  on: (v: string) => void;
  ph: string;
  type?: string;
}) {
  return (
    <label>
      <div className="eyebrow" style={{ marginBottom: 8 }}>{label}</div>
      <input
        type={type}
        value={v}
        placeholder={ph}
        onChange={(e) => on(e.target.value)}
        style={{
          width: "100%", padding: "13px 16px",
          border: "1.5px solid var(--line)", borderRadius: 12,
          background: "var(--card)", fontFamily: "var(--body-stack)",
          fontSize: 14, fontWeight: 500, color: "var(--ink)",
          outline: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--gold-deep)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--line)";
        }}
      />
    </label>
  );
}

function StepConfirm({
  service, size, addons, date, slot, contact, total, onClose,
}: {
  service: BookingService | null;
  size: string | null;
  addons: string[];
  date: Date | null;
  slot: string | null;
  contact: Contact;
  total: { base: number; addonSum: number; total: number; plus: boolean } | null;
  onClose: () => void;
}) {
  const sizeRow = service && size ? SIZES[service.key].find((s) => s[0] === size) : null;
  return (
    <div>
      <div style={{ textAlign: "center", padding: "8px 0 32px" }}>
        <div
          style={{
            width: 72, height: 72, margin: "0 auto 18px",
            borderRadius: "50%",
            background: "var(--gold)",
            display: "grid", placeItems: "center",
            boxShadow: "var(--shadow-chunk)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="display" style={{ fontSize: 36, margin: "8px 0 6px" }}>Booking received!</h3>
        <p style={{ color: "var(--ink-2)", fontSize: 16, margin: 0 }}>
          Mic will text you to confirm within the hour, {contact.name?.split(" ")[0] || "friend"} 🐾
        </p>
      </div>

      <div
        style={{
          background: "var(--card)",
          border: "1.5px solid var(--ink)",
          borderRadius: 18, padding: 24,
          boxShadow: "var(--shadow-chunk)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, paddingBottom: 18, borderBottom: "1px dashed var(--line)" }}>
          <Detail label="Service">
            {service?.title}
            <br />
            <span style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--accent-stack)", fontStyle: "italic" }}>
              {sizeRow?.[1]} · {sizeRow?.[2] || "—"}
            </span>
          </Detail>
          <Detail label="When">
            {date && fmtFull(date)}
            <br />
            <span style={{ color: "var(--muted)", fontSize: 12 }}>at {slot}</span>
          </Detail>
          <Detail label="Pooch">
            {contact.dogName}
            {contact.breed ? ` · ${contact.breed}` : ""}
          </Detail>
          <Detail label="Contact">
            {contact.name}
            <br />
            <span style={{ color: "var(--muted)", fontSize: 12 }}>{contact.phone}</span>
          </Detail>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 18 }}>
          <div>
            <div className="eyebrow">Estimated total</div>
            {addons.length > 0 && (
              <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>
                {sizeRow?.[3]} + {addons.map((a) => ADDONS.find((x) => x[0] === a)?.[1]).join(", ")}
              </div>
            )}
          </div>
          <div className="display" style={{ fontSize: 36, color: "var(--gold-deep)" }}>
            £{total?.total}{total?.plus ? "+" : ""}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
        <button className="btn btn-outline" onClick={() => window.print()}>Save / print</button>
        <button className="btn btn-pill" onClick={onClose}>Done</button>
      </div>
      <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 12, marginTop: 18 }}>
        £10 deposit due once Mic confirms · refundable up to 24h before
      </p>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 6, color: "var(--gold-deep)" }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>{children}</div>
    </div>
  );
}

/* ─── Shared icons used inside the modal ─────────────────────────── */
function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function LogoMark({
  size = 44,
  ring = "var(--ink)",
  fill = "var(--bg)",
  glyph = "var(--gold)",
}: {
  size?: number;
  ring?: string;
  fill?: string;
  glyph?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill={fill} stroke={ring} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke={glyph} strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="2 2.5" />
      <g fill={glyph}>
        <path d="M22 22c-2 0-4 1.6-4.4 4.2-.4 3 1.4 5 3.2 5.4l1.6-9.4c-.2 0-.3-.2-.4-.2z" />
        <path d="M34 18c-3.6 0-6.6 2.4-7.6 5.6l-2.2 13c-.5 2.8 1.4 5.4 4.2 5.8 1.1.1 2 .9 2 2v2.4c0 1.7 1.4 3.2 3.2 3.2h4.6c1.7 0 3-1.4 3-3l-.1-9.4c0-.7.4-1.4 1-1.8 2.4-1.5 3.9-4.2 3.9-7.2 0-5-4-10.6-12-10.6zm6.4 6.8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </g>
    </svg>
  );
}
