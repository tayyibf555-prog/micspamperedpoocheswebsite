"use client";

import { useState, type ReactNode, type CSSProperties } from "react";
import BookingModal from "../components/booking-modal";

/* ─── SHARED PRIMITIVES ───────────────────────────────────────── */
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

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="brand">
      <LogoMark
        size={44}
        ring={inverted ? "var(--gold-soft)" : "var(--ink)"}
        fill={inverted ? "transparent" : "var(--bg)"}
        glyph={inverted ? "var(--gold-soft)" : "var(--gold)"}
      />
      <div>
        <div className="name" style={{ color: inverted ? "var(--bg)" : "var(--ink)" }}>
          Mic&apos;s Pampered Pooches
        </div>
        <div className="sub" style={{ color: inverted ? "rgba(251,246,236,.6)" : "var(--muted)" }}>
          Est. Glasgow · Dog grooming
        </div>
      </div>
    </div>
  );
}

function Sticker({ children }: { children: ReactNode }) {
  return (
    <span className="sticker">
      <span className="pip" />
      {children}
    </span>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === "center" ? 720 : 880,
        margin: align === "center" ? "0 auto 56px" : "0 0 56px",
      }}
    >
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</div>}
      <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: 0, color: invert ? "var(--bg)" : "var(--ink)" }}>
        {title}
      </h2>
      {sub && (
        <p
          style={{
            marginTop: 18,
            fontSize: 18,
            color: invert ? "rgba(251,246,236,.7)" : "var(--ink-2)",
            maxWidth: 620,
            marginLeft: align === "center" ? "auto" : 0,
            marginRight: align === "center" ? "auto" : 0,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function CtaButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="btn btn-pill" onClick={onClick}>
      {children}
      <ArrowRight />
    </button>
  );
}

/* ─── TOP STRIP + NAV ─────────────────────────────────────────── */
function TopStrip() {
  return (
    <div className="topstrip">
      <div className="container">
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <span>
            <span className="gold">★</span> Fully qualified · Fully insured · Pet first-aid trained
          </span>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <span>
            <span className="dot" style={{ marginRight: 8 }} />
            Mic&apos;s free Mon — book now
          </span>
          <a href="tel:07900333223" className="gold" style={{ fontWeight: 700 }}>
            07900 333 223 →
          </a>
        </div>
      </div>
    </div>
  );
}

function Nav({ onBook }: { onBook: () => void }) {
  return (
    <nav className="nav">
      <div className="container row">
        <Brand />
        <ul>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#area">Visit</a></li>
        </ul>
        <CtaButton onClick={onBook}>Book</CtaButton>
      </div>
    </nav>
  );
}

/* ─── HERO (split) ────────────────────────────────────────────── */
function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="sec" style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div
        className="container hero-split-grid"
        style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center" }}
      >
        <div>
          <Sticker>Now booking June &amp; July &rsquo;26</Sticker>
          <h1 className="display" style={{ fontSize: "clamp(54px, 7vw, 104px)", margin: "26px 0 22px" }}>
            Glasgow&apos;s most
            <br />
            <span className="italic-accent" style={{ color: "var(--gold-deep)" }}>pampered</span> pooches.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 520, marginBottom: 32 }}>
            Hi, I&apos;m Mic — fully qualified, fully insured, pet-first-aid trained. I run a calm, one-dog-at-a-time grooming room on Clarkston Road. Tail-wag guaranteed.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <CtaButton onClick={onBook}>Book a groom</CtaButton>
            <a
              href="#services"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600, color: "var(--ink-2)" }}
            >
              See the services &amp; prices →
            </a>
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 56, alignItems: "center", flexWrap: "wrap" }}>
            <TrustChip k="9 yrs" v="Grooming dogs" />
            <TrustChip k="C&G L3" v="Qualified" />
            <TrustChip k="100%" v="Insured" />
            <TrustChip k="Pet first-aid" v="Trained" />
          </div>
        </div>

        <div className="hero-collage" style={{ position: "relative", height: 620 }}>
          <div style={{ position: "absolute", inset: "0 60px 60px 0", borderRadius: 24, boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
            <img
              src="/images/pup-poodle.png"
              alt="Honey the toy poodle after a full groom"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div
            className="float-slow"
            style={{
              position: "absolute", right: 0, bottom: 0,
              width: 240, height: 200,
              borderRadius: 18, overflow: "hidden",
              border: "4px solid var(--bg)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <img
              src="/images/pup-scottie.png"
              alt="Hamish the Scottie pup"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div
            className="float-fast"
            style={{
              position: "absolute", left: -28, top: 40,
              background: "var(--bg)", border: "1.5px solid var(--ink)",
              borderRadius: 999, padding: "14px 22px",
              boxShadow: "var(--shadow-chunk)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#39a96b", display: "inline-block" }} />
              <span style={{ fontWeight: 700, fontSize: 13 }}>Mic is grooming right now</span>
            </div>
          </div>
          <div
            style={{
              position: "absolute", left: 16, bottom: -10,
              background: "var(--ink)", color: "var(--bg)",
              borderRadius: 16, padding: "16px 22px",
              maxWidth: 240, transform: "rotate(-2deg)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div className="display" style={{ fontSize: 26, lineHeight: 1.1 }}>
              &ldquo;Bessie cried less here than at the vet.&rdquo;
            </div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 10, letterSpacing: ".06em", textTransform: "uppercase" }}>
              — Hannah, Newlands
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustChip({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div className="display" style={{ fontSize: 26, color: "var(--gold-deep)" }}>{k}</div>
      <div style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>{v}</div>
    </div>
  );
}

/* ─── ABOUT ───────────────────────────────────────────────────── */
function About() {
  return (
    <section className="sec cream2" id="about">
      <div
        className="container about-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "center" }}
      >
        <div style={{ position: "relative" }}>
          <div style={{ borderRadius: 24, boxShadow: "var(--shadow-md)", overflow: "hidden", aspectRatio: "4 / 5" }}>
            <img
              src="/images/mic-shopfront.png"
              alt="Mic outside Mic's Pampered Pooches on Clarkston Road, Glasgow"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>
          <div
            style={{
              position: "absolute", right: -20, top: -20,
              background: "var(--gold)", borderRadius: 999,
              padding: "14px 18px", fontWeight: 700, fontSize: 13,
              transform: "rotate(8deg)",
              border: "1.5px solid var(--gold-deep)",
              boxShadow: "3px 3px 0 var(--gold-deep)",
            }}
          >
            Hello, I&apos;m Mic 👋
          </div>
          <div
            style={{
              position: "absolute", left: -28, bottom: 40,
              width: 140, height: 140, borderRadius: "50%",
              background: "var(--bg)", border: "1.5px solid var(--ink)",
              display: "grid", placeItems: "center",
              textAlign: "center", padding: 14,
              transform: "rotate(-6deg)",
              boxShadow: "var(--shadow-chunk)",
            }}
          >
            <div>
              <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>Certified</div>
              <div className="display" style={{ fontSize: 22, lineHeight: 1.1, color: "var(--gold-deep)", margin: "4px 0" }}>
                City &amp; Guilds
              </div>
              <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>Level 3</div>
            </div>
          </div>
        </div>
        <div>
          <SectionHead eyebrow="About Michaela" title="A calm room. One dog at a time. Always." />
          <p style={{ fontSize: 18, color: "var(--ink-2)", marginBottom: 18 }}>
            Hi, I&apos;m Michaela — Mic to my friends — and this is my grooming room on Clarkston Road. I&apos;m fully qualified, fully insured, and pet-first-aid trained, and I&apos;ve been pampering Glasgow&apos;s pooches full-time since 2022. The salon is a single, quiet room: no other dogs barking, no crates, no waiting. Just me, your pup, and usually my wee dog Bear keeping an eye on proceedings.
          </p>
          <p style={{ fontSize: 18, color: "var(--ink-2)", marginBottom: 32 }}>
            Nervous rescues, wriggly puppies and seasoned showdogs all welcome. If your dog has had a rough time at a groomer before, give me a ring — we&apos;ll do a free meet-and-greet first and go at their pace.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, maxWidth: 520 }}>
            {([
              ["Fully qualified", "City & Guilds Level 3"],
              ["Fully insured", "Petplan Sanctuary"],
              ["First-aid trained", "Canine first-response"],
              ["Member", "British Dog Groomers' Association"],
            ] as const).map(([k, v]) => (
              <div
                key={k}
                style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 14, padding: "14px 16px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <CheckIcon />
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{k}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", paddingLeft: 26 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="var(--gold)" stroke="var(--gold-deep)" strokeWidth="1" />
      <path d="M7 12.4l3.2 3.2L17 8.8" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── SERVICES (matrix) ───────────────────────────────────────── */
const EXTRAS: Array<[string, string]> = [
  ["Nail Trim", "£7+"], ["Ears Cleaned", "£7"],
  ["Deep Cleanse Facial", "£10"], ["Mud Baths", "£10+"],
  ["Pawdicure", "£7"], ["Dry Face Trim", "£10"],
  ["Matting fee", "£10+"],
];

function Services({ onBook }: { onBook: () => void }) {
  return (
    <section className="sec" id="services">
      <div className="container">
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "end",
            gap: 40, flexWrap: "wrap", marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Services &amp; prices</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: 0 }}>
              Honest pricing.
              <br />
              No nasty surprises.
            </h2>
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 540, marginTop: 18 }}>
              Prices start &ldquo;from&rdquo; because they depend on coat condition, behaviour and how long it&apos;s been since the last groom. We&apos;ll confirm the final price before any clippers come out.
            </p>
          </div>
          <CtaButton onClick={onBook}>Book a groom</CtaButton>
        </div>

        <ServicesMatrix onBook={onBook} />

        <div style={{ marginTop: 64, background: "var(--bg-2)", borderRadius: 24, padding: "40px 44px" }}>
          <div
            style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "baseline", marginBottom: 24, flexWrap: "wrap", gap: 12,
            }}
          >
            <h3 className="display" style={{ fontSize: 36, margin: 0 }}>Little extras</h3>
            <span style={{ color: "var(--muted)", fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase" }}>
              Add to any groom
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 0,
              borderTop: "1px solid var(--line)",
            }}
          >
            {EXTRAS.map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "16px 18px",
                  borderBottom: "1px solid var(--line)",
                  borderRight: "1px solid var(--line)",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 15 }}>{k}</span>
                <span className="display" style={{ fontSize: 20, color: "var(--gold-deep)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesMatrix({ onBook }: { onBook: () => void }) {
  const sizes = ["Tiny", "Small", "Medium", "Large/XL"];
  const matrix: Array<[string, [string, string, string, string], string]> = [
    ["Full Groom", ["£40", "£45", "£50", "£60+"], "Yorkie → Retriever"],
    ["De-Shed Groom", ["—", "£30", "£35", "£40+"], "Pug → Labrador"],
    ["Puppy Intro", ["£30+", "£30+", "£30+", "£30+"], "Up to 6 months"],
    ["Wash & Fluff", ["£30", "£35", "£40", "£50+"], "Quick freshen up"],
  ];
  return (
    <div
      style={{
        background: "var(--card)", border: "1.5px solid var(--ink)",
        borderRadius: 24, padding: "28px 32px",
        boxShadow: "var(--shadow-chunk)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr repeat(4, 1fr) 1fr",
          gap: 8,
          paddingBottom: 16,
          borderBottom: "1.5px solid var(--ink)",
          alignItems: "end",
        }}
      >
        <span className="eyebrow">Service</span>
        {sizes.map((s) => (
          <span key={s} className="eyebrow" style={{ textAlign: "center" }}>{s}</span>
        ))}
        <span></span>
      </div>
      {matrix.map(([svc, prices, hint], i) => (
        <div
          key={svc}
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr repeat(4, 1fr) 1fr",
            gap: 8,
            padding: "20px 0",
            borderBottom: i === matrix.length - 1 ? "none" : "1px dashed var(--line)",
            alignItems: "center",
          }}
        >
          <div>
            <div className="display" style={{ fontSize: 24 }}>{svc}</div>
            <div className="italic-accent" style={{ fontSize: 12, color: "var(--muted)" }}>{hint}</div>
          </div>
          {prices.map((p, j) => (
            <div
              key={j}
              className="display"
              style={{ fontSize: 22, color: p === "—" ? "var(--muted)" : "var(--gold-deep)", textAlign: "center" }}
            >
              {p}
            </div>
          ))}
          <button className="btn btn-outline" style={{ padding: "10px 14px", fontSize: 12 }} onClick={onBook}>
            Book
          </button>
        </div>
      ))}
    </div>
  );
}

/* ─── GALLERY ─────────────────────────────────────────────────── */
type Kase = { src: string; name: string; breed: string; service: string; note: string };

const CASES: Kase[] = [
  { src: "/images/pup-poodle.png",      name: "Honey",  breed: "Toy Poodle",   service: "Full Groom",   note: "Teddy cut · signature smile" },
  { src: "/images/pup-labradoodle.png", name: "Bruno",  breed: "Labradoodle",  service: "Full Groom",   note: "Six-week catch-up · looking sharp" },
  { src: "/images/pup-jackrussell.png", name: "Pip",    breed: "Jack Russell", service: "De-Shed",      note: "Old man · still a heart-throb" },
  { src: "/images/pup-scottie.png",     name: "Hamish", breed: "Scottie pup",  service: "Puppy Intro",  note: "First salon visit · smashed it" },
  { src: "/images/pup-pug.png",         name: "Peggy",  breed: "Pug",          service: "Wash & Fluff", note: "Brave for her first big-girl bath" },
];

function Gallery() {
  return (
    <section className="sec cream2" id="gallery">
      <div className="container">
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "end",
            marginBottom: 56, gap: 24, flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Recent pooches</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: 0 }}>The graduating class.</h2>
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 540, marginTop: 18 }}>
              A few of the good kids who&apos;ve come through the salon. Every dog leaves with a bandana — Mic&apos;s house rule.
            </p>
          </div>
          <a href="#insta" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, color: "var(--gold-deep)" }}>
            See more on Instagram <ArrowRight />
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gridAutoRows: "minmax(280px, auto)",
            gap: 18,
          }}
        >
          <CaseCard kase={CASES[0]} featured style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }} />
          <CaseCard kase={CASES[1]} style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }} />
          <CaseCard kase={CASES[2]} style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }} />
          <CaseCard kase={CASES[3]} style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }} />
          <CaseCard kase={CASES[4]} style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }} />
        </div>

        <div
          style={{
            marginTop: 36,
            padding: "20px 26px",
            border: "1px dashed var(--line)",
            borderRadius: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: 16, flexWrap: "wrap",
          }}
        >
          <span style={{ color: "var(--ink-2)", fontSize: 14, fontWeight: 600 }}>
            <span style={{ color: "var(--gold-deep)" }}>132</span> happy pups groomed this year ·{" "}
            <span style={{ color: "var(--gold-deep)" }}>4.9★</span> average rating
          </span>
          <a href="#insta" style={{ color: "var(--ink)", fontWeight: 700, fontSize: 14 }}>
            Tag #micspamperedpooches →
          </a>
        </div>
      </div>
    </section>
  );
}

function CaseCard({
  kase,
  featured = false,
  style,
}: {
  kase: Kase;
  featured?: boolean;
  style?: CSSProperties;
}) {
  return (
    <article
      style={{
        ...style,
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        background: "var(--ink)",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--line)",
      }}
    >
      <img
        src={kase.src}
        alt={`${kase.name}, ${kase.breed}, after ${kase.service}`}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(26,18,8,.78) 100%)",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "absolute", top: 14, right: 14,
          background: "var(--bg)", color: "var(--ink)",
          padding: "6px 12px", borderRadius: 999,
          fontSize: 11, fontWeight: 700,
          letterSpacing: ".06em", textTransform: "uppercase",
          border: "1px solid var(--ink)", boxShadow: "2px 2px 0 var(--ink)",
        }}
      >
        {kase.service}
      </span>
      <div
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          padding: featured ? "22px 24px 22px" : "18px 20px 18px",
          color: "var(--bg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <h3 className="display" style={{ fontSize: featured ? 40 : 26, margin: 0, color: "var(--bg)", lineHeight: 1 }}>
            {kase.name}
          </h3>
          <span className="italic-accent" style={{ color: "var(--gold-soft)", fontSize: featured ? 16 : 13 }}>
            {kase.breed}
          </span>
        </div>
        <div style={{ fontSize: featured ? 14 : 12, color: "rgba(251,246,236,.78)", marginTop: 6 }}>
          {kase.note}
        </div>
      </div>
    </article>
  );
}

/* ─── TESTIMONIALS ────────────────────────────────────────────── */
type Review = { who: string; source: string; text: string; stars: number };

const REVIEWS: Review[] = [
  { who: "Mia Connolly", source: "Google · 5★", stars: 5, text: "I cannot recommend Mic enough. I phoned her Saturday about an incredibly matted rescue I'd just taken in and she squeezed me in the following Tuesday. Maggie can be very nervous of strangers but Mic worked her magic — removed all the matting and bathed her itchy sore skin. Maggie was calm and relaxed at pickup. I cannot thank her enough." },
  { who: "Emma Smith", source: "Google · 5★", stars: 5, text: "The best dog grooming salon I've visited. I've been twice with my new puppy for his first groom and she was so gentle and patient — explaining the process, letting me ask any questions. Michaela is so knowledgeable and the love she has for every dog is clear." },
  { who: "Charlie Sanders", source: "Google · 5★", stars: 5, text: "You can tell Mic really loves her job. She is amazing with dogs. My boy came out looking and smelling amazing and I loved her little finishing touches. Will definitely be back!" },
  { who: "Tasha Macdonald", source: "Google · 5★", stars: 5, text: "The best dog groomers on the Southside. Michaela is so professional when it comes to chows and she was amazing with my wee Cookie. Explained everything and kept in touch during the groom." },
];

function Testimonials() {
  return (
    <section className="sec" id="reviews">
      <div className="container">
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "end",
            marginBottom: 56, flexWrap: "wrap", gap: 24,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>The good word</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: 0 }}>
              4.9★ from 132 happy pups
              <br />
              (and their humans).
            </h2>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <RatingBadge value="4.9" source="Google" />
            <RatingBadge value="4.9" source="Yell" />
            <RatingBadge value="100%" source="Facebook" />
          </div>
        </div>
        <div
          className="reviews-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}
        >
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              style={{
                background: i % 2 === 0 ? "var(--card)" : "var(--bg-2)",
                border: "1px solid var(--line)",
                borderRadius: 20, padding: "26px 22px",
                transform: i === 1 || i === 3 ? "translateY(-12px)" : "none",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Stars n={r.stars} />
              <p style={{ fontSize: 17, lineHeight: 1.5, marginTop: 14, marginBottom: 20, color: "var(--ink)" }}>
                <span className="display" style={{ fontSize: 30, color: "var(--gold)", lineHeight: 0, position: "relative", top: 10, marginRight: 4 }}>“</span>
                {r.text}
              </p>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  paddingTop: 16, borderTop: "1px dashed var(--line)",
                }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "var(--gold-soft)",
                    display: "grid", placeItems: "center",
                    fontWeight: 700, color: "var(--gold-deep)", fontSize: 14,
                  }}
                >
                  {r.who.split(" ")[0][0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{r.who}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".06em", textTransform: "uppercase" }}>
                    {r.source}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? "var(--gold)" : "var(--line)"}>
          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896 4.665 23.166l1.401-8.168L.132 9.211l8.2-1.193z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBadge({ value, source }: { value: string; source: string }) {
  return (
    <div
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "10px 16px",
        border: "1px solid var(--line)", borderRadius: 14,
        background: "var(--card)",
      }}
    >
      <div className="display" style={{ fontSize: 22, color: "var(--gold-deep)" }}>{value}</div>
      <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>{source}</div>
    </div>
  );
}

/* ─── INSTAGRAM ──────────────────────────────────────────────── */
function Instagram() {
  const tiles = [
    { l: "MOCHI · cockapoo · teddy", d: false },
    { l: "OTIS · staffy · deshed",   d: true },
    { l: "BESSIE · spaniel",         d: false },
    { l: "COCO · maltese",           d: true },
    { l: "BENNY · pomeranian",       d: false },
    { l: "DAISY · golden",           d: true },
    { l: "STORY · grooming room",    d: false },
    { l: "REEL · nervous Otis day 1", d: true },
  ];
  return (
    <section className="sec dark" id="insta">
      <div className="container">
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "end",
            marginBottom: 48, gap: 24, flexWrap: "wrap",
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Follow along</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: 0, color: "var(--bg)" }}>
              <span style={{ color: "var(--gold-soft)" }}>@</span>micspamperedpooches
            </h2>
          </div>
          <a
            href="#"
            className="btn btn-outline"
            style={{ borderColor: "var(--gold-soft)", color: "var(--gold-soft)" }}
          >
            Open on Instagram →
          </a>
        </div>
        <div
          className="insta-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}
        >
          {tiles.map((t, i) => (
            <div key={i} className={"ph" + (t.d ? " dark" : "")} style={{ aspectRatio: "1 / 1" }}>
              <span className="lbl">{t.l}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 36,
            display: "flex", justifyContent: "space-between",
            color: "rgba(251,246,236,.65)", fontSize: 13,
            flexWrap: "wrap", gap: 16,
          }}
        >
          <span>238 posts · 374 followers · 400 following</span>
          <span>DM to book — or use the form below 👇</span>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICE AREA + FAUX MAP ────────────────────────────────── */
function ServiceArea() {
  const areas = [
    "Clarkston", "Cathcart", "Newlands", "Shawlands", "Battlefield",
    "Giffnock", "Muirend", "Mount Florida", "Strathbungo", "Pollokshields",
    "Pollokshaws", "Williamwood", "Netherlee", "Crosshill", "Croftfoot",
  ];
  return (
    <section className="sec" id="area">
      <div
        className="container area-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}
      >
        <div>
          <SectionHead
            eyebrow="Where to find me"
            title="687 Clarkston Road, Glasgow."
            sub="Parking right outside, two minutes from Clarkston train station. Drop-off & pickup, no cages, no waiting room — bookings only."
          />
          <div
            style={{
              background: "var(--card)",
              border: "1.5px solid var(--ink)",
              borderRadius: 18, padding: 24,
              boxShadow: "var(--shadow-chunk)",
              marginBottom: 28,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <InfoBlock label="Address">
                <a
                  href="https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=uk&sa=X&geocode=KVN18VyzR4hIMcd6qPnXNX3B&daddr=687+Clarkston+Rd,+Glasgow+G44+3SE"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", textDecorationColor: "var(--gold)", textUnderlineOffset: 3 }}
                >
                  687 Clarkston Road
                  <br />
                  Glasgow G44 3SE
                </a>
              </InfoBlock>
              <InfoBlock label="Phone">
                <a href="tel:07900333223">07900 333 223</a>
              </InfoBlock>
              <InfoBlock label="Opening">
                Tue–Fri · 9am–6pm
                <br />
                Saturday · 9am–4pm
                <br />
                Sun/Mon · Closed
              </InfoBlock>
              <InfoBlock label="Pickup & drop-off">
                Free within 2 miles
                <br />
                £6 within 5 miles
              </InfoBlock>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Serving these neighbourhoods</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {areas.map((a) => (
                <span
                  key={a}
                  style={{
                    padding: "8px 14px",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    fontSize: 13, fontWeight: 600,
                    background: "var(--card)",
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
        <FauxMap />
      </div>
    </section>
  );
}

function InfoBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 8, color: "var(--gold-deep)" }}>{label}</div>
      <div style={{ fontWeight: 600, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

function FauxMap() {
  return (
    <div
      style={{
        borderRadius: 24, overflow: "hidden",
        border: "1.5px solid var(--ink)",
        boxShadow: "var(--shadow-chunk)",
        aspectRatio: "4/5",
        position: "relative",
        background: "#e7ddc8",
      }}
    >
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(42,29,16,.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="#eddfbf" />
        <rect width="400" height="500" fill="url(#grid)" />
        <path d="M-20 360 Q60 320 120 360 T240 380 T400 350" fill="none" stroke="#a8c8c8" strokeWidth="22" strokeLinecap="round" opacity=".7" />
        <path d="M0 140 L400 180" stroke="rgba(42,29,16,.18)" strokeWidth="3" />
        <path d="M70 0 L210 500" stroke="rgba(42,29,16,.28)" strokeWidth="6" />
        <path d="M140 250 Q220 220 360 280" stroke="rgba(42,29,16,.18)" strokeWidth="3" />
        <path d="M250 60 L320 480" stroke="rgba(42,29,16,.18)" strokeWidth="2" />
        <ellipse cx="80" cy="80" rx="60" ry="40" fill="#c9d8a8" opacity=".8" />
        <ellipse cx="340" cy="120" rx="60" ry="50" fill="#c9d8a8" opacity=".8" />
        <ellipse cx="60" cy="430" rx="80" ry="60" fill="#c9d8a8" opacity=".8" />
        <g transform="translate(190, 230)">
          <circle r="50" fill="rgba(184,146,60,.18)" />
          <circle r="30" fill="rgba(184,146,60,.32)" />
          <g transform="translate(0,-22)">
            <path d="M0 0c-9 0-16 7-16 16 0 11 16 28 16 28s16-17 16-28c0-9-7-16-16-16z" fill="var(--gold)" stroke="var(--ink)" strokeWidth="1.5" />
            <circle cx="0" cy="16" r="6" fill="var(--ink)" />
          </g>
        </g>
        <text x="120" y="100" fontFamily="var(--mono-stack)" fontSize="9" fill="rgba(42,29,16,.5)">LINN PARK</text>
        <text x="290" y="140" fontFamily="var(--mono-stack)" fontSize="9" fill="rgba(42,29,16,.5)">CATHKIN BRAES</text>
        <text x="18" y="455" fontFamily="var(--mono-stack)" fontSize="9" fill="rgba(42,29,16,.5)">ROUKEN GLEN</text>
        <text x="170" y="120" fontFamily="var(--mono-stack)" fontSize="9" fill="rgba(42,29,16,.5)" transform="rotate(7 170 120)">CLARKSTON RD</text>
      </svg>
      <div
        style={{
          position: "absolute", left: 24, top: 24,
          background: "var(--bg)", border: "1.5px solid var(--ink)",
          borderRadius: 12, padding: "10px 14px",
          boxShadow: "var(--shadow-chunk)",
        }}
      >
        <div style={{ fontFamily: "var(--mono-stack)", fontSize: 10, letterSpacing: ".1em", color: "var(--muted)" }}>YOU ARE HERE</div>
        <div style={{ fontWeight: 700, marginTop: 2 }}>687 Clarkston Rd</div>
      </div>
      <div style={{ position: "absolute", right: 18, bottom: 18, display: "flex", gap: 8 }}>
        <a
          href="https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=uk&sa=X&geocode=KVN18VyzR4hIMcd6qPnXNX3B&daddr=687+Clarkston+Rd,+Glasgow+G44+3SE"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-pill"
          style={{ padding: "10px 16px", fontSize: 12 }}
        >
          Get directions
        </a>
      </div>
    </div>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS: Array<[string, string]> = [
  ["How long does a groom take?",
   "Most full grooms take 1.5–2.5 hours. Big or matted coats can take longer — I'll always quote upfront, no surprises. Because I only groom one dog at a time, your pup isn't sat in a cage waiting."],
  ["My dog is anxious / a rescue — is that okay?",
   "Absolutely. I work with a lot of nervous rescues. Pop in for a free meet-and-greet first so we can sniff each other out (figuratively, mostly). We'll go at your dog's pace."],
  ["Do I need to wash my dog before?",
   "No — please don't! It's much easier for me to work on a dirty coat. Just make sure they've had a wee and a wander before drop-off."],
  ["What if my dog's coat is badly matted?",
   "I'll always try to save the coat where I can, but welfare comes first — if matting is painful, the kindest thing is a short shave-down. There's a small £10+ matting fee for the extra time it takes."],
  ["Do you offer pickup & drop-off?",
   "Yes — free within 2 miles of Clarkston, £6 within 5. Just mention it when you book and we'll work out a window."],
  ["How do I pay?",
   "Card, cash or bank transfer at pickup. A £10 deposit holds your slot — refundable up to 24h before."],
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec cream2" id="faq">
      <div
        className="container faq-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80 }}
      >
        <div>
          <SectionHead
            eyebrow="The asked questions"
            title="Things people often want to know."
            sub="Anything else? Send me a DM or give me a ring on 07900 333 223 — I always pick up between grooms."
          />
          <a className="btn btn-outline" href="tel:07900333223">Call Mic →</a>
        </div>
        <div>
          {FAQS.map(([q, a], i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid var(--line)",
                borderBottom: i === FAQS.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  all: "unset", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "22px 4px", width: "100%", gap: 18,
                }}
              >
                <span className="display" style={{ fontSize: 24, color: "var(--ink)" }}>{q}</span>
                <span
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: open === i ? "var(--gold)" : "var(--bg)",
                    border: "1.5px solid var(--ink)",
                    display: "grid", placeItems: "center",
                    transition: "all .2s",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      transform: open === i ? "rotate(45deg)" : "none",
                      transition: "transform .2s",
                      fontSize: 22, lineHeight: 0, marginTop: -2,
                    }}
                  >
                    +
                  </span>
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? 240 : 0,
                  overflow: "hidden",
                  transition: "max-height .35s ease",
                }}
              >
                <p style={{ paddingBottom: 24, color: "var(--ink-2)", fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: 620 }}>
                  {a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA STRIP ──────────────────────────────────────────────── */
function CtaStrip({ onBook }: { onBook: () => void }) {
  return (
    <section className="sec dark" style={{ paddingTop: 90, paddingBottom: 90 }}>
      <div
        className="container cta-strip-grid"
        style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "center" }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 18, color: "var(--gold-soft)" }}>Ready when you are</div>
          <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 88px)", margin: 0, color: "var(--bg)" }}>
            Let&apos;s get your{" "}
            <span className="italic-accent" style={{ color: "var(--gold-soft)" }}>pooch</span> pampered.
          </h2>
          <p style={{ fontSize: 19, color: "rgba(251,246,236,.7)", maxWidth: 540, marginTop: 22 }}>
            Slots open up four weeks out. Pop a date in below and I&apos;ll confirm by text within the hour.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <button
            className="btn btn-pill"
            style={{ justifyContent: "center", padding: "18px 24px", fontSize: 15 }}
            onClick={onBook}
          >
            Book online <ArrowRight />
          </button>
          <a
            className="btn btn-outline"
            href="tel:07900333223"
            style={{ justifyContent: "center", padding: "18px 24px", fontSize: 15, borderColor: "var(--gold-soft)", color: "var(--gold-soft)" }}
          >
            Or call 07900 333 223
          </a>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8, color: "rgba(251,246,236,.55)", fontSize: 13, flexWrap: "wrap" }}>
            <span>· Free meet-and-greet ·</span>
            <span>£10 deposit ·</span>
            <span>Cancel 24h free ·</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
      <div
        className="container foot-grid"
        style={{
          padding: "80px 0 40px",
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(3, 1fr)",
          gap: 56,
        }}
      >
        <div>
          <Brand />
          <p style={{ color: "var(--ink-2)", marginTop: 18, maxWidth: 320, fontSize: 14 }}>
            One-dog-at-a-time grooming on Clarkston Road, Glasgow. Family-owned, City &amp; Guilds qualified, fully insured.
          </p>
        </div>
        <FootCol title="Visit">
          <div>687 Clarkston Road</div>
          <div>Glasgow G44 3SE</div>
          <div style={{ marginTop: 8 }}>Tue–Fri · 9–6</div>
          <div>Saturday · 9–4</div>
        </FootCol>
        <FootCol title="Reach">
          <div>07900 333 223</div>
          <div>hello@micspamperedpooches.co.uk</div>
          <div style={{ marginTop: 8 }}>@micspamperedpooches</div>
        </FootCol>
        <FootCol title="Browse">
          <a href="#services">Services &amp; pricing</a>
          <a href="#about">About Mic</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </FootCol>
      </div>
      <div
        className="container"
        style={{
          padding: "20px 0",
          borderTop: "1px solid var(--line)",
          display: "flex", justifyContent: "space-between",
          color: "var(--muted)", fontSize: 12,
          flexWrap: "wrap", gap: 12,
        }}
      >
        <span>© 2026 Mic&apos;s Pampered Pooches. Made with belly rubs in Glasgow.</span>
        <span>Site demo · not yet live</span>
      </div>
    </footer>
  );
}

function FootCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 18, color: "var(--gold-deep)" }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, color: "var(--ink-2)", fontSize: 14, fontWeight: 600 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── APP ─────────────────────────────────────────────────────── */
export default function Page() {
  const [bookOpen, setBookOpen] = useState(false);
  const onBook = () => setBookOpen(true);
  return (
    <>
      <TopStrip />
      <Nav onBook={onBook} />
      <Hero onBook={onBook} />
      <Services onBook={onBook} />
      <About />
      <Gallery />
      <Testimonials />
      <Instagram />
      <ServiceArea />
      <FAQ />
      <CtaStrip onBook={onBook} />
      <Footer />
      <BookingModal open={bookOpen} onClose={() => setBookOpen(false)} />
    </>
  );
}
