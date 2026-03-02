import Link from "next/link";
import Navbar from "@/app/components/Navbar";

// ─── Mock phone screenshot component ─────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[300px]">
      {/* Glow behind phone */}
      <div className="absolute inset-0 bg-emerald-400 opacity-20 blur-3xl rounded-full scale-75 translate-y-8" />
      {/* Phone shell */}
      <div className="relative bg-slate-900 rounded-[40px] p-3 shadow-2xl ring-1 ring-white/10">
        {/* Dynamic island */}
        <div className="mx-auto mb-2 w-20 h-6 bg-black rounded-full flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-slate-800 ring-1 ring-slate-700" />
        </div>
        {/* Screen */}
        <div className="bg-slate-50 rounded-[28px] overflow-hidden">
          {/* App header */}
          <div className="bg-white px-4 py-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-emerald-600" />
                <span className="text-sm font-bold text-slate-900">Chapter</span>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">3 events</span>
            </div>
          </div>
          {/* Summary cards */}
          <div className="p-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-emerald-50 rounded-xl p-2.5">
                <p className="text-xs text-emerald-600 font-medium">At Retirement</p>
                <p className="text-base font-bold text-emerald-800">$2.4M</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-2.5">
                <p className="text-xs text-slate-500 font-medium">Peak Worth</p>
                <p className="text-base font-bold text-slate-800">$3.1M</p>
              </div>
            </div>
            {/* Fake chart */}
            <div className="bg-white border border-slate-100 rounded-xl p-3">
              <p className="text-xs font-semibold text-slate-600 mb-2">Net Worth Over Time</p>
              <svg viewBox="0 0 200 80" className="w-full">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 75 C 30 72, 50 65, 70 55 C 85 48, 90 42, 100 30 C 115 18, 130 10, 150 6 C 165 3, 180 4, 200 5"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 0 75 C 30 72, 50 65, 70 55 C 85 48, 90 42, 100 30 C 115 18, 130 10, 150 6 C 165 3, 180 4, 200 5 L 200 80 L 0 80 Z"
                  fill="url(#chartGrad)"
                />
                {/* Retirement line */}
                <line x1="130" y1="0" x2="130" y2="80" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 2" />
                <text x="133" y="10" fontSize="7" fill="#6366f1">Retire</text>
              </svg>
            </div>
            {/* Life event chips */}
            <div className="space-y-1.5">
              {[
                { icon: "🏠", label: "Buy a Home", age: 32, color: "bg-blue-50 text-blue-700" },
                { icon: "👶", label: "Have a Child", age: 34, color: "bg-purple-50 text-purple-700" },
                { icon: "💍", label: "Get Married", age: 29, color: "bg-pink-50 text-pink-700" },
              ].map((e) => (
                <div key={e.label} className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg ${e.color}`}>
                  <span className="text-xs font-medium">{e.icon} {e.label}</span>
                  <span className="text-xs opacity-70">Age {e.age}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Fake tab bar */}
          <div className="bg-white border-t border-slate-100 flex">
            {["⚙️", "📅", "📈"].map((icon, i) => (
              <div key={i} className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 ${i === 2 ? "text-emerald-600" : "text-slate-400"}`}>
                <span className="text-base leading-none">{icon}</span>
                <div className={`w-1 h-1 rounded-full ${i === 2 ? "bg-emerald-600" : "bg-transparent"}`} />
              </div>
            ))}
          </div>
        </div>
        {/* Home bar */}
        <div className="mt-2 mx-auto w-24 h-1 bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

// ─── Feature card screenshot mockups ────────────────────────────────────────
function InputsMockup() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      <div className="bg-emerald-600 px-4 py-3">
        <p className="text-white text-xs font-semibold">Your Baseline</p>
      </div>
      <div className="p-4 space-y-3">
        {[
          { label: "Annual Income", value: "$80,000", prefix: true },
          { label: "Monthly Savings", value: "$1,000", prefix: true },
          { label: "Current Savings", value: "$52,400", prefix: true },
          { label: "Retirement Age", value: "65", suffix: "yrs" },
        ].map((f) => (
          <div key={f.label}>
            <p className="text-xs text-slate-500 mb-1 font-medium">{f.label}</p>
            <div className="flex items-center border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
              {f.prefix && <span className="text-slate-400 text-sm mr-1">$</span>}
              <span className="text-sm font-semibold text-slate-800 flex-1">{f.value.replace("$", "")}</span>
              {f.suffix && <span className="text-slate-400 text-xs">{f.suffix}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsMockup() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      <div className="bg-emerald-600 px-4 py-3">
        <p className="text-white text-xs font-semibold">Life Events</p>
      </div>
      <div className="p-4 space-y-2">
        {[
          { icon: "🏠", label: "Buy a Home", sub: "$60K upfront · +$12K/yr", on: true },
          { icon: "👶", label: "Have a Child", sub: "$15K upfront · +$15K/yr", on: true },
          { icon: "💍", label: "Get Married", sub: "$30K upfront · +$50K income", on: false },
          { icon: "🚗", label: "Buy a New Car", sub: "$35K upfront", on: false },
        ].map((e) => (
          <div key={e.label} className={`flex items-center justify-between rounded-xl border p-2.5 ${e.on ? "border-emerald-200 bg-emerald-50" : "border-slate-100"}`}>
            <div className="flex items-center gap-2">
              <span className="text-base">{e.icon}</span>
              <div>
                <p className={`text-xs font-semibold ${e.on ? "text-emerald-800" : "text-slate-700"}`}>{e.label}</p>
                <p className="text-xs text-slate-400">{e.sub}</p>
              </div>
            </div>
            <div className={`w-9 h-5 rounded-full flex items-center px-0.5 ${e.on ? "bg-emerald-500 justify-end" : "bg-slate-200 justify-start"}`}>
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectionMockup() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      <div className="bg-emerald-600 px-4 py-3">
        <p className="text-white text-xs font-semibold">Your Projection</p>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-emerald-50 rounded-xl p-3">
            <p className="text-xs text-emerald-600 font-medium">Peak Net Worth</p>
            <p className="text-lg font-bold text-emerald-800">$3.1M</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-500 font-medium">At Retirement</p>
            <p className="text-lg font-bold text-slate-800">$2.4M</p>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3">
          <p className="text-xs text-emerald-600 font-medium">✅ Funds last until age</p>
          <p className="text-lg font-bold text-emerald-700">90+</p>
        </div>
        <svg viewBox="0 0 200 70" className="w-full">
          <defs>
            <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 65 C 20 62, 40 56, 60 45 C 80 35, 95 20, 115 12 C 130 6, 150 5, 170 7 C 185 8, 195 10, 200 12 L 200 70 L 0 70 Z" fill="url(#g2)" />
          <path d="M 0 65 C 20 62, 40 56, 60 45 C 80 35, 95 20, 115 12 C 130 6, 150 5, 170 7 C 185 8, 195 10, 200 12" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "I used to spreadsheet obsessively every Sunday. Chapter replaced that habit in a week. Seeing my 'have a second kid' scenario play out in real numbers made the decision so much clearer.",
    name: "Sarah M.",
    title: "Software Engineer, 34",
    initials: "SM",
    color: "bg-violet-100 text-violet-700",
  },
  {
    quote:
      "I added my planned sabbatical and the app showed me exactly how 6 months off at 43 affects my retirement. Turns out I can afford it — if I bump contributions by $200/month now.",
    name: "Marcus T.",
    title: "Teacher, 41",
    initials: "MT",
    color: "bg-amber-100 text-amber-700",
  },
  {
    quote:
      "Other calculators ask for one number and spit out a date. Chapter actually understands that life isn't a straight line. Getting married and buying a house in the same model is a game changer.",
    name: "Priya K.",
    title: "Consultant, 29",
    initials: "PK",
    color: "bg-emerald-100 text-emerald-700",
  },
];

// ─── Main page ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Built for real life, not spreadsheets
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Life happens.{" "}
                <span className="text-emerald-600">We'll handle<br className="hidden sm:block" /> the math.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                Chapter models your biggest life decisions — buying a home, having kids, getting married — alongside your retirement, so you can see exactly what they cost and plan accordingly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/calculator"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold text-base px-6 py-3.5 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                >
                  Start planning free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 font-semibold text-base px-6 py-3.5 rounded-xl hover:bg-slate-50 border border-slate-200 transition-colors"
                >
                  See how it works
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-400">No account required · Free forever</p>
            </div>

            {/* Phone mockup */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "14,000+", label: "Plans created" },
              { value: "$340K", label: "Avg. extra savings modeled" },
              { value: "8", label: "Life events supported" },
              { value: "2 min", label: "Average setup time" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Planning built around your life
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Not the other way around. Chapter puts your decisions front and center.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Life-first planning",
                body:
                  "Toggle life events like buying a home, having a child, or taking a sabbatical. Watch your retirement curve update in real time.",
                bg: "bg-emerald-50",
                iconBg: "bg-emerald-100",
              },
              {
                icon: "📊",
                title: "Real-time projections",
                body:
                  "Compound growth, inflation adjustment, and withdrawal modeling — all calculated instantly as you tweak your numbers.",
                bg: "bg-blue-50",
                iconBg: "bg-blue-100",
              },
              {
                icon: "🔄",
                title: "Scenario modeling",
                body:
                  "Add custom events with any cost and timing. Compare your 'safe' plan to the life you actually want to live.",
                bg: "bg-violet-50",
                iconBg: "bg-violet-100",
              },
            ].map((f) => (
              <div key={f.title} className={`${f.bg} rounded-2xl p-6 sm:p-8`}>
                <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center text-2xl mb-5`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Up and running in 2 minutes
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              No financial jargon. No endless forms. Just answers.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-1 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">1</span>
                  <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Set your baseline</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Enter your numbers, not your life story.
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Income, savings, age — just the essentials. Chapter fills in smart defaults so you can start immediately and refine as you go.
                </p>
              </div>
              <div className="flex-1 order-1 md:order-2 max-w-sm mx-auto md:max-w-none">
                <InputsMockup />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-1 max-w-sm mx-auto md:max-w-none">
                <EventsMockup />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">2</span>
                  <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Add your life events</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Toggle the moments that matter.
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Pre-loaded with the most common life milestones. Each event includes realistic cost estimates that you can adjust — because your life is your own.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-1 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">3</span>
                  <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">See your future</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Your full financial story, visualized.
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Net worth curves, cash flow charts, retirement readiness score. Every toggle instantly updates every chart.
                </p>
              </div>
              <div className="flex-1 order-1 md:order-2 max-w-sm mx-auto md:max-w-none">
                <ProjectionMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Real decisions. Real clarity.
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              People use Chapter when life gets complicated.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 text-[15px]">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} font-bold text-sm flex items-center justify-center flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
            Your best chapter starts now.
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Stop wondering what your biggest life decisions will cost you. Start knowing.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-emerald-400 transition-colors shadow-xl shadow-emerald-900/30"
          >
            Try Chapter — it's free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <p className="mt-4 text-slate-500 text-sm">No sign-up. No credit card. No BS.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                  <path d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H6zm2 3h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                </svg>
              </div>
              <span className="text-white font-bold">Chapter</span>
            </div>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Chapter Financial, Inc. · For illustrative purposes only. Not financial advice.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Contact"].map((l) => (
                <a key={l} href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
