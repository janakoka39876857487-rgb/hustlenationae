import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { ChevronDown, Dumbbell, Flame, Star, Zap, Apple, Play, Instagram, Linkedin } from "lucide-react";

import logo from "@/assets/hustle-nation-logo.jpg";
import heroImg from "@/assets/hero-training.jpg";
import catEndurance from "@/assets/cat-endurance.jpg";
import catStrength from "@/assets/cat-strength.jpg";
import catMindset from "@/assets/cat-mindset.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Start Now — Hustle Nation" },
      { name: "description", content: "Train that hits hard and lasts. Join Hustle Nation — personal training that builds strength, endurance, and mindset." },
      { property: "og:title", content: "Start Now — Hustle Nation" },
      { property: "og:description", content: "Train that hits hard and lasts. Join Hustle Nation." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: StartNowPage,
});

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
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        <a href="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Hustle Nation"
            width={48}
            height={48}
            className="h-12 w-12 rounded-md object-cover"
          />
          <span className="font-display text-2xl tracking-wide text-foreground">
            HUSTLE <span className="text-primary">NATION</span>
          </span>
        </a>
        <button className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-muted-foreground transition hover:border-primary hover:text-primary">
          EN
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Train that <span className="text-primary">hits hard</span><br />
            <span className="text-foreground">and lasts.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            Whether you want to get stronger, build endurance, or just move with intent — Hustle Nation has you covered.
          </p>

          <LeadForm />
        </div>

        {/* Right */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-brand-orange/30 via-brand-brown/30 to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-brand-orange/10">
            <img
              src={heroImg}
              alt="Athlete training hard at Hustle Nation"
              width={1280}
              height={1280}
              className="h-full w-full object-cover aspect-square lg:aspect-auto lg:h-[640px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80">
              <span className="h-px flex-1 bg-white/30" />
              No shortcuts. Just hustle.
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
      toast.error("Please fill in your name, phone, and email.");
      return;
    }
    toast.success("You're in. We'll be in touch shortly.");
  };

  const inputCls =
    "h-12 w-full rounded-md border border-primary/40 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";
  const selectCls = inputCls + " appearance-none pr-10";

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input className={inputCls} placeholder="First name" value={form.firstName} onChange={set("firstName")} />
        <input className={inputCls} placeholder="Last name" value={form.lastName} onChange={set("lastName")} />
      </div>

      <div className="grid grid-cols-[110px_1fr] gap-3 sm:grid-cols-[110px_1fr_1fr]">
        <div className="relative">
          <select className={selectCls} value={form.country} onChange={set("country")}>
            <option value="+971">+971</option>
            <option value="+966">+966</option>
            <option value="+20">+20</option>
            <option value="+44">+44</option>
            <option value="+1">+1</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        </div>
        <input className={inputCls + " col-span-1 sm:col-span-1"} placeholder="Phone number" value={form.phone} onChange={set("phone")} />
        <input className={inputCls + " col-span-2 sm:col-span-1"} placeholder="Email" type="email" value={form.email} onChange={set("email")} />
      </div>

      {[
        { k: "goal" as const, label: "Your Goal", options: ["Build muscle", "Lose fat", "Get stronger", "Improve endurance", "Move better"] },
        { k: "start" as const, label: "When would you like to start?", options: ["This week", "Next week", "This month", "Just exploring"] },
        { k: "speed" as const, label: "How quickly do you want results?", options: ["ASAP", "Within 1 month", "Within 3 months", "Steady & sustainable"] },
      ].map(({ k, label, options }) => (
        <div key={k} className="relative">
          <select className={selectCls} value={form[k]} onChange={set(k)}>
            <option value="" disabled>{label}</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        </div>
      ))}

      <button
        type="submit"
        className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-display text-lg tracking-wide text-primary-foreground transition hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30"
      >
        Start Now — It's on us!
        <Flame className="h-5 w-5 transition group-hover:rotate-12" />
      </button>
    </form>
  );
}

const categories = [
  { label: "ENDURANCE", img: catEndurance, copy: "It's not about quick fixes. It's about building habits that keep you moving, energized, and ready for years to come." },
  { label: "STRENGTH", img: catStrength, copy: "Build strength step by step. No pressure, no intimidation — just workouts that grow with you." },
  { label: "MINDSET", img: catMindset, copy: "Who said fitness has to be boring? With workouts that feel more like play, you'll actually look forward to it." },
];

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {categories.map(c => (
          <div key={c.label} className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
            <img
              src={c.img}
              alt={c.label}
              width={768}
              height={960}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
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
      <p className="font-display text-2xl text-primary tracking-wider">
        This is more than a workout. It's a lifestyle.
      </p>
      <p className="mt-2 font-display text-4xl text-foreground sm:text-5xl">Are you ready?</p>
      <button
        onClick={() => toast.success("Let's go. Scroll up and start your intake.")}
        className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 font-display text-lg tracking-wide text-primary-foreground transition hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30"
      >
        Own Your Strength
        <Dumbbell className="h-5 w-5" />
      </button>
    </section>
  );
}

const stats = [
  { tag: "since 2017", icon: Flame, big: "8+ years", text: "helping people train smarter, safer, and stronger." },
  { tag: "Proven impact", icon: Dumbbell, big: "1000+ success stories", text: "across the Emirates — and counting." },
  { tag: "Top-rated", icon: Star, big: "4.9/5 rating", text: "from clients who trust our coaching team." },
  { tag: "Built in-house", icon: Zap, big: "Our own fitness tech", text: "we track, guide, and optimize every step of your journey." },
];

function Trusted() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-10">
      <h2 className="font-display text-4xl sm:text-5xl">
        Trusted by the <span className="text-primary">Hustle Community</span>
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
        Starting out is hard enough — that's why we keep every session personal, supportive, and built to help you feel confident.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.big} className="relative rounded-2xl border border-white/10 bg-card/60 p-6 text-left transition hover:border-primary/50 hover:bg-card">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
              {s.tag}
            </div>
            <s.icon className="mt-5 h-7 w-7 text-primary" />
            <p className="mt-3 font-display text-xl text-foreground">{s.big.toUpperCase()}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const links = ["Home", "About Us", "Careers", "Privacy Policy", "Terms and Conditions", "Terms of Use", "Payment & Cancellation Policy", "Cookie Policy"];
  return (
    <footer className="border-t border-white/5 bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 lg:grid-cols-[1fr_2fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Hustle Nation" width={40} height={40} className="h-10 w-10 rounded object-cover" />
            <span className="font-display text-xl tracking-wide">
              HUSTLE <span className="text-primary">NATION</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Download the app</p>
          <div className="mt-3 flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-black px-3 py-2 text-xs text-white transition hover:border-primary">
              <Apple className="h-4 w-4" /> App Store
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-black px-3 py-2 text-xs text-white transition hover:border-primary">
              <Play className="h-4 w-4" /> Google Play
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-end">
            {links.map(l => (
              <a key={l} href="#" className="transition hover:text-primary">{l}</a>
            ))}
          </nav>
          <div className="flex gap-4 lg:justify-end">
            <a href="#" aria-label="Instagram" className="text-muted-foreground transition hover:text-primary"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground transition hover:text-primary"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hustle Nation. All rights reserved.
      </div>
    </footer>
  );
}
