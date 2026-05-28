import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import {
  ChevronDown, Dumbbell, Flame, Star, Zap,
  Home as HomeIcon, Mail, MessageCircle, Instagram, Linkedin, Twitter,
} from "lucide-react";

const SOCIAL_INSTAGRAM = "https://www.instagram.com/hustlenation.ae/";
const SOCIAL_LINKEDIN = "https://www.linkedin.com/in/elhussein-ibrahim-094116236";
const SOCIAL_X = "https://x.com/hustlenation_ae";

import logo from "@/assets/hustle-nation-logo.jpg";
import heroImg from "@/assets/hero-training.jpg";
import catEndurance from "@/assets/cat-endurance.jpg";
import catStrength from "@/assets/cat-strength.jpg";
import catMindset from "@/assets/cat-mindset.jpg";

const WHATSAPP = "971508152780";
const CONTACT_EMAIL = "contact@hustlenationae.com";
const HOME_URL = "https://www.hustlenationae.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Start Now — Hustle Nation" },
      { name: "description", content: "Train that hits hard and lasts. Join Hustle Nation — personal training that builds strength, endurance, and mindset." },
      { property: "og:title", content: "Start Now — Hustle Nation" },
      { property: "og:description", content: "Train that hits hard and lasts. Join Hustle Nation." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: StartNowPage,
});

const t = {
  h1a: "Train that ", h1b: "hits hard", h1c: " and lasts.",
  sub: "Whether you want to get stronger, build endurance, or just move with intent — Hustle Nation has you covered.",
  firstName: "First name", lastName: "Last name",
  phone: "Phone number", email: "Email",
  goal: "Your Goal",
  goals: ["Weight Loss","Bodybuilding","Tone","Strength","Injury Rehab","General Health","Yoga","Boxing","MMA","Krav Maga","Prenatal","Postnatal","Pilates","Kids PT","Body Conditioning"],
  start: "When would you like to start?",
  starts: ["This Week","Next Week","Not Sure Yet"],
  speed: "How quickly do you want results?",
  speeds: ["As fast as possible (8–12 weeks)","Steady and sustainable","No rush"],
  cta: "Start Now — It's on us!",
  catEnd: "ENDURANCE", catStr: "STRENGTH", catMind: "MINDSET",
  catEndCopy: "It's not about quick fixes. It's about building habits that keep you moving, energized, and ready for years to come.",
  catStrCopy: "Build strength step by step. No pressure, no intimidation — just workouts that grow with you.",
  catMindCopy: "Who said fitness has to be boring? With workouts that feel more like play, you'll actually look forward to it.",
  lifeKicker: "This is more than a workout. It's a lifestyle.",
  lifeQ: "Are you ready?",
  lifeCta: "Own Your Strength",
  trustedA: "Trusted by the ", trustedB: "Hustle Community",
  trustedSub: "Starting out is hard enough — that's why we keep every session personal, supportive, and built to help you feel confident.",
  stats: [
    { tag: "since 2017", big: "8+ YEARS", text: "helping people train smarter, safer, and stronger." },
    { tag: "Proven impact", big: "1000+ SUCCESS STORIES", text: "across the Emirates — and counting." },
    { tag: "Top-rated", big: "4.9/5 RATING", text: "from clients who trust our coaching team." },
    { tag: "Built in-house", big: "OUR OWN FITNESS TECH", text: "we track, guide, and optimize every step of your journey." },
  ],
  tagline: "No shortcuts. Just hustle.",
  toastErr: "Please fill in your name, phone, and email.",
  waMsg: (n: string) => `Hi Hustle Nation! I'm ${n || "interested"} and I'd like to start training.`,
};

function waLink(msg: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

// Meta Pixel — fires Lead event before sending the user to WhatsApp
function trackLead(extra?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  try {
    w.fbq?.("track", "Lead", extra);
  } catch {
    /* ignore */
  }
}

function openWhatsApp(msg: string, extra?: Record<string, unknown>) {
  trackLead(extra);
  window.open(waLink(msg), "_blank", "noopener,noreferrer");
}

function StartNowPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-center" richColors />
      <Header />
      <Hero />
      <Categories />
      <Lifestyle />
      <Trusted />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        <a href={HOME_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
          <img src={logo} alt="Hustle Nation" width={48} height={48} className="h-12 w-12 rounded-md object-cover" />
          <span className="font-display text-2xl tracking-wide text-foreground">
            HUSTLE<span className="text-primary">NATION</span>
          </span>
        </a>
      </div>
    </header>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            {t.h1a}<span className="text-primary">{t.h1b}</span><br />
            <span className="text-foreground">{t.h1c}</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">{t.sub}</p>
          <LeadForm />
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-brand-orange/30 via-brand-brown/30 to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-brand-orange/10">
            <img src={heroImg} alt="Hustle Nation training" width={1280} height={1280} className="h-full w-full object-cover aspect-square lg:aspect-auto lg:h-[640px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80">
              <span className="h-px flex-1 bg-white/30" />
              {t.tagline}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", country: "+971", phone: "", email: "",
    goal: "", start: "", speed: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.phone || !form.email) {
      toast.error(t.toastErr);
      return;
    }
    const lines = [
      t.waMsg(`${form.firstName} ${form.lastName}`.trim()),
      `${t.phone}: ${form.country} ${form.phone}`,
      `${t.email}: ${form.email}`,
      form.goal && `${t.goal}: ${form.goal}`,
      form.start && `${t.start} ${form.start}`,
      form.speed && `${t.speed} ${form.speed}`,
    ].filter(Boolean).join("\n");
    openWhatsApp(lines, { source: "lead_form", goal: form.goal });
  };

  const inputCls = "h-12 w-full rounded-md border border-primary/40 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";
  // Native <option> uses OS palette; force readable colors with inline style on each option.
  const selectCls = inputCls + " appearance-none pr-10";
  const optStyle = { backgroundColor: "#3a3a3a", color: "#ffffff" } as const;
  const placeholderOptStyle = { backgroundColor: "#1f1f1f", color: "#9ca3af" } as const;

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input className={inputCls} placeholder={t.firstName} value={form.firstName} onChange={set("firstName")} />
        <input className={inputCls} placeholder={t.lastName} value={form.lastName} onChange={set("lastName")} />
      </div>

      <div className="grid grid-cols-[110px_1fr] gap-3 sm:grid-cols-[110px_1fr_1fr]">
        <div className="relative">
          <select className={selectCls} value={form.country} onChange={set("country")}>
            {["+971","+966","+20","+44","+1"].map(c => (
              <option key={c} value={c} style={optStyle}>{c}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        </div>
        <input className={inputCls} placeholder={t.phone} value={form.phone} onChange={set("phone")} />
        <input className={inputCls + " col-span-2 sm:col-span-1"} placeholder={t.email} type="email" value={form.email} onChange={set("email")} />
      </div>

      {[
        { k: "goal" as const, label: t.goal, options: t.goals },
        { k: "start" as const, label: t.start, options: t.starts },
        { k: "speed" as const, label: t.speed, options: t.speeds },
      ].map(({ k, label, options }) => (
        <div key={k} className="relative">
          <select className={selectCls} value={form[k]} onChange={set(k)}>
            <option value="" disabled style={placeholderOptStyle}>{label}</option>
            {options.map(o => (
              <option key={o} value={o} style={optStyle}>{o}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        </div>
      ))}

      <button
        type="submit"
        className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-display text-lg tracking-wide text-primary-foreground transition hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30"
      >
        {t.cta}
        <Flame className="h-5 w-5 transition group-hover:rotate-12" />
      </button>
    </form>
  );
}

function Categories() {
  const cats = [
    { label: t.catEnd, img: catEndurance, copy: t.catEndCopy },
    { label: t.catStr, img: catStrength, copy: t.catStrCopy },
    { label: t.catMind, img: catMindset, copy: t.catMindCopy },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cats.map(c => (
          <div key={c.label} className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
            <img src={c.img} alt={c.label} width={768} height={960} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display text-3xl tracking-wide text-primary">{c.label}</h3>
              <p className="mt-2 text-sm text-white/85">{c.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Lifestyle() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-background via-brand-brown/15 to-background py-20 text-center">
      <p className="font-display text-2xl text-primary tracking-wider">{t.lifeKicker}</p>
      <p className="mt-2 font-display text-4xl text-foreground sm:text-5xl">{t.lifeQ}</p>
      <button
        type="button"
        onClick={() => openWhatsApp(t.waMsg(""), { source: "lifestyle_cta" })}
        className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 font-display text-lg tracking-wide text-primary-foreground transition hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30"
      >
        {t.lifeCta}
        <Dumbbell className="h-5 w-5" />
      </button>
    </section>
  );
}

function Trusted() {
  const icons = [Flame, Dumbbell, Star, Zap];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-10">
      <h2 className="font-display text-4xl sm:text-5xl">
        {t.trustedA}<span className="text-primary">{t.trustedB}</span>
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">{t.trustedSub}</p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.stats.map((s, i) => {
          const Icon = icons[i];
          return (
            <div key={s.big} className="relative rounded-2xl border border-white/10 bg-card/60 p-6 text-start transition hover:border-primary/50 hover:bg-card">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
                {s.tag}
              </div>
              <Icon className="mt-5 h-7 w-7 text-primary" />
              <p className="mt-3 font-display text-xl text-foreground">{s.big}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  const socialBtn = "inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground transition hover:bg-primary-hover";
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-12 lg:px-10">
        {/* Brand */}
        <div className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
          <a href={HOME_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
            <img src={logo} alt="Hustle Nation" width={56} height={56} className="h-14 w-14 rounded-md object-cover" />
            <span className="font-display text-4xl tracking-wide sm:text-5xl">
              HUSTLE<span className="text-primary">NATION</span>
            </span>
          </a>
          <div className="mt-5 flex gap-3">
            <a aria-label="Instagram" href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer" className={socialBtn}><Instagram className="h-5 w-5" /></a>
            <a aria-label="LinkedIn" href={SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer" className={socialBtn}><Linkedin className="h-5 w-5" /></a>
            <a aria-label="X / Twitter" href={SOCIAL_X} target="_blank" rel="noopener noreferrer" className={socialBtn}><Twitter className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="font-display text-2xl tracking-wide text-foreground">Get in Touch</h3>
          <div className="mt-4 space-y-2 text-sm">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-muted-foreground transition hover:text-primary">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Mail className="h-4 w-4" />
              </span>
              {CONTACT_EMAIL}
            </a>
            <button
              type="button"
              onClick={() => openWhatsApp(t.waMsg(""), { source: "footer_whatsapp" })}
              className="flex items-center gap-3 text-muted-foreground transition hover:text-primary"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <MessageCircle className="h-4 w-4" />
              </span>
              +971 50 815 2780
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-display text-2xl tracking-wide text-foreground">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href={`${HOME_URL}/terms`} target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">Terms of use</a></li>
            <li><a href={`${HOME_URL}/privacy`} target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">Privacy policy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hustle Nation. All rights reserved.
      </div>
    </footer>
  );
}
