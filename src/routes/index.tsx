import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { ChevronDown, Dumbbell, Flame, Star, Zap } from "lucide-react";

import logo from "@/assets/hustle-nation-logo.jpg";
import heroImg from "@/assets/hero-training.jpg";
import catEndurance from "@/assets/cat-endurance.jpg";
import catStrength from "@/assets/cat-strength.jpg";
import catMindset from "@/assets/cat-mindset.jpg";

const WHATSAPP = "971508152780";
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
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: StartNowPage,
});

type Lang = "en" | "ar";

const T = {
  en: {
    dir: "ltr" as "ltr" | "rtl",
    langBtn: "العربية",
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
  },
  ar: {
    dir: "rtl" as "ltr" | "rtl",
    langBtn: "EN",
    h1a: "تدريب ", h1b: "يضرب بقوة", h1c: " ويدوم طويلاً.",
    sub: "سواء كنت تريد أن تصبح أقوى، أو تبني قدرتك على التحمل، أو ببساطة تتحرك بهدف — هاسل نيشن معك في كل خطوة.",
    firstName: "الاسم الأول", lastName: "اسم العائلة",
    phone: "رقم الهاتف", email: "البريد الإلكتروني",
    goal: "هدفك",
    goals: ["إنقاص الوزن","كمال الأجسام","شدّ الجسم","القوة","إعادة تأهيل الإصابات","الصحة العامة","اليوغا","الملاكمة","فنون القتال المختلطة","كراف ماغا","ما قبل الولادة","ما بعد الولادة","البيلاتس","تدريب الأطفال","تأهيل بدني"],
    start: "متى تودّ أن تبدأ؟",
    starts: ["هذا الأسبوع","الأسبوع القادم","لست متأكداً بعد"],
    speed: "ما السرعة التي تريد بها النتائج؟",
    speeds: ["بأسرع وقت ممكن (٨–١٢ أسبوعاً)","تقدّم ثابت ومستدام","لا استعجال"],
    cta: "ابدأ الآن — على حسابنا!",
    catEnd: "التحمّل", catStr: "القوة", catMind: "العقلية",
    catEndCopy: "لا نؤمن بالحلول السريعة. نؤمن ببناء عادات تُبقيك متحركاً، مفعماً بالطاقة، وجاهزاً لسنواتٍ قادمة.",
    catStrCopy: "ابنِ قوتك خطوةً بخطوة. لا ضغط ولا رهبة — فقط تمارين تكبر معك.",
    catMindCopy: "من قال إن اللياقة مملة؟ مع تمارين تشبه اللعب، ستنتظرها كل يوم بشوق.",
    lifeKicker: "هذه ليست مجرد تمارين، بل أسلوب حياة.",
    lifeQ: "هل أنت مستعد؟",
    lifeCta: "امتلك قوتك",
    trustedA: "ثقة ", trustedB: "مجتمع هاسل",
    trustedSub: "البداية صعبة بطبيعتها — لذلك نجعل كل جلسة شخصيةً وداعمة، مصممةً لتمنحك الثقة.",
    stats: [
      { tag: "منذ ٢٠١٧", big: "أكثر من ٨ سنوات", text: "نساعد الناس على التدرّب بذكاء وأمان وقوة." },
      { tag: "أثرٌ ملموس", big: "أكثر من ١٠٠٠ قصة نجاح", text: "في أنحاء الإمارات — والعدد في ازدياد." },
      { tag: "الأعلى تقييماً", big: "٤٫٩ / ٥", text: "من عملاء يثقون بفريق تدريبنا." },
      { tag: "صناعة داخلية", big: "تقنيتنا الخاصة للياقة", text: "نتابع ونوجّه ونطوّر كل خطوة في رحلتك." },
    ],
    tagline: "لا اختصارات. فقط اجتهاد.",
    toastErr: "يرجى إدخال الاسم ورقم الهاتف والبريد الإلكتروني.",
    waMsg: (n: string) => `مرحباً هاسل نيشن! أنا ${n || "مهتم"} وأرغب في بدء التدريب.`,
  },
};

function waLink(msg: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function StartNowPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];

  return (
    <div dir={t.dir} className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-center" richColors />
      <Header t={t} onToggleLang={() => setLang(lang === "en" ? "ar" : "en")} />
      <Hero t={t} />
      <Categories t={t} />
      <Lifestyle t={t} />
      <Trusted t={t} />
      <footer className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hustle Nation. {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
      </footer>
    </div>
  );
}

function Header({ t, onToggleLang }: { t: typeof T["en"]; onToggleLang: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        <a href={HOME_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
          <img src={logo} alt="Hustle Nation" width={48} height={48} className="h-12 w-12 rounded-md object-cover" />
          <span className="font-display text-2xl tracking-wide text-foreground">
            HUSTLE <span className="text-primary">NATION</span>
          </span>
        </a>
        <button
          onClick={onToggleLang}
          className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          {t.langBtn}
        </button>
      </div>
    </header>
  );
}

function Hero({ t }: { t: typeof T["en"] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            {t.h1a}<span className="text-primary">{t.h1b}</span><br />
            <span className="text-foreground">{t.h1c}</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">{t.sub}</p>
          <LeadForm t={t} />
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

function LeadForm({ t }: { t: typeof T["en"] }) {
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
    window.open(waLink(lines), "_blank", "noopener,noreferrer");
  };

  const inputCls = "h-12 w-full rounded-md border border-primary/40 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";
  const selectCls = inputCls + " appearance-none pr-10";

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input className={inputCls} placeholder={t.firstName} value={form.firstName} onChange={set("firstName")} />
        <input className={inputCls} placeholder={t.lastName} value={form.lastName} onChange={set("lastName")} />
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
          <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
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
            <option value="" disabled>{label}</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
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

function Categories({ t }: { t: typeof T["en"] }) {
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

function Lifestyle({ t }: { t: typeof T["en"] }) {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-background via-brand-brown/15 to-background py-20 text-center">
      <p className="font-display text-2xl text-primary tracking-wider">{t.lifeKicker}</p>
      <p className="mt-2 font-display text-4xl text-foreground sm:text-5xl">{t.lifeQ}</p>
      <a
        href={waLink(t.waMsg(""))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 font-display text-lg tracking-wide text-primary-foreground transition hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30"
      >
        {t.lifeCta}
        <Dumbbell className="h-5 w-5" />
      </a>
    </section>
  );
}

function Trusted({ t }: { t: typeof T["en"] }) {
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
