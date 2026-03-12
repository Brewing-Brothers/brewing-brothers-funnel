"use client";

import { useMemo, useState } from "react";
import { getTheme, themeClasses } from "@/lib/themes";

// ============================================================
// Brewing Brothers — Production Funnel Page
// Phase 2 — Pickup LIVE, Stripe pending (M3-M8)
// CF Patterns: P1 Hero, P3 Offer Stack, P4 Social Proof, P8 Sticky CTA
// ============================================================

export default function Home() {
  const theme = useMemo(() => getTheme(process.env.NEXT_PUBLIC_THEME), []);
  const t = themeClasses(theme);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [quantity, setQuantity] = useState("");

  async function submitPickup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name:     String(form.get("name")     || ""),
      email:    String(form.get("email")    || ""),
      phone:    String(form.get("phone")    || ""),
      quantity: String(form.get("quantity") || ""),
    };
    try {
      const res  = await fetch("/api/reserve-pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMsg(data.error || "Something went wrong. Please try again.");
      } else {
        window.location.href = "/thank-you?type=pickup";
      }
    } catch (err) {
      setMsg(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleOrderNow(priceId: string) {
    const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true";
    if (!stripeEnabled) {
      alert("Online ordering is coming soon — reserve a pickup instead!");
      return;
    }
    try {
      const res  = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout unavailable. Try again.");
      }
    } catch {
      alert("Checkout unavailable. Please try again.");
    }
  }

  const priceTiers = [
    {
      title: "Single Bottle",
      price: process.env.NEXT_PUBLIC_PRICE_SINGLE || "$---",
      note:  "Perfect first taste.",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE || "",
      featured: false,
    },
    {
      title: "6-Pack",
      price: process.env.NEXT_PUBLIC_PRICE_SIXPACK || "$---",
      note:  "Most popular — better value per bottle.",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SIXPACK || "",
      featured: true,
      badge: "Most Popular",
    },
    {
      title: "12-Pack",
      price: process.env.NEXT_PUBLIC_PRICE_TWELVE || "$---",
      note:  "Best value — stock up.",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_TWELVE || "",
      featured: false,
      badge: "Best Value",
    },
  ];

  const testimonials = [
    {
      quote:   "Best juice I've had. You can taste the freshness.",
      name:    "Sarah M.",
      location:"Sacramento, CA",
      product: "6-Pack",
      stars:   5,
    },
    {
      quote:   "Finally a local juice brand worth driving for.",
      name:    "James T.",
      location:"Orangevale, CA",
      product: "Pickup — 12-Pack",
      stars:   5,
    },
    {
      quote:   "Ordered twice already. Family loves it.",
      name:    "Lisa R.",
      location:"Folsom, CA",
      product: "12-Pack",
      stars:   5,
    },
  ];

  const faqs = [
    { q: "Do you ship internationally?",      a: "No — USA only for now." },
    { q: "Where exactly is pickup?",           a: "Orangevale, California. Address confirmed after reservation." },
    { q: "When does online ordering go live?", a: "Very soon — Stripe is being connected. Reserve a pickup in the meantime — no payment required until pickup." },
    { q: "How fresh is the juice?",            a: "Small batches, consumed fresh. Batch date shared at pickup." },
    { q: "Can I cancel my reservation?",       a: "Yes — reply to your confirmation email." },
    { q: "What ingredients do you use?",       a: "Organic, locally sourced produce. No preservatives, no fillers, no shortcuts." },
  ];

  return (
    <main className={`min-h-screen ${t.pageBg}`}>

      {/* CF-P5 Announcement Bar */}
      <div className="w-full bg-amber-700 text-white text-center py-2 text-sm font-medium">
        🧃 Fresh Batch Available — Orangevale Pickup + USA Shipping
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* CF-P1 HERO — Squeeze Page */}
        <div className={`rounded-3xl p-10 ${t.card}`}>
          <div className="flex flex-col gap-6">
            <span className={`inline-flex w-fit px-3 py-1 rounded-full text-sm ${t.badge}`}>
              🇺🇸 USA Shipping · 📍 Orangevale Pickup
            </span>
            <h1 className={`text-4xl sm:text-5xl font-bold ${t.accent}`}>
              Brewing Brothers Organic Juice
            </h1>
            <p className="text-lg text-slate-700">
              Farm-fresh, small-batch squeezed juice. Real ingredients. Real flavor.
              No preservatives, no shortcuts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#pickup" className={`inline-flex justify-center items-center px-6 py-3 rounded-2xl font-semibold ${t.button}`}>
                🧃 Reserve Pickup — Pay on Pickup
              </a>
              <a href="#order" className="inline-flex justify-center items-center px-6 py-3 rounded-2xl font-semibold border border-slate-300 bg-white hover:bg-slate-50">
                📦 Order Online (USA Shipping)
              </a>
            </div>
            {/* Trust badges row */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["🌱 100% Organic","🧊 Cold-Pressed","📍 Local CA Farm","🚫 No Preservatives","🇺🇸 USA Shipping"].map((b) => (
                <span key={b} className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">{b}</span>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              Pickup location: <strong>Orangevale, California</strong>
            </p>
          </div>
        </div>

        {/* BENEFITS */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: "🌱", h: "100% Organic",      p: "Certified organic ingredients — nothing synthetic, ever." },
            { icon: "🤝", h: "Small Batch",        p: "Made fresh in small runs so every bottle is at peak flavor." },
            { icon: "🚫", h: "No Preservatives",   p: "What you see on the label is everything in the bottle." },
          ].map((x) => (
            <div key={x.h} className={`rounded-2xl p-6 ${t.card}`}>
              <div className="text-2xl mb-3">{x.icon}</div>
              <h3 className="text-lg font-semibold">{x.h}</h3>
              <p className="mt-2 text-slate-700">{x.p}</p>
            </div>
          ))}
        </section>

        {/* CF-P4 SOCIAL PROOF — BEFORE pricing */}
        <section className="mt-10">
          <div className={`rounded-3xl p-8 ${t.card}`}>
            <h2 className="text-2xl font-semibold">What Customers Are Saying</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {testimonials.map((tm) => (
                <div key={tm.name} className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
                  <div className="text-amber-500 text-lg mb-2">{"★".repeat(tm.stars)}</div>
                  <p className="text-slate-700 italic leading-relaxed">"{tm.quote}"</p>
                  <p className="font-semibold mt-3 text-amber-900">{tm.name}</p>
                  <p className="text-sm text-slate-500">{tm.location}</p>
                  <p className="text-xs text-amber-700 mt-1 font-medium">{tm.product}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CF-P3 OFFER STACK / PRICING */}
        <section id="order" className="mt-10">
          <div className={`rounded-3xl p-8 ${t.card}`}>
            <h2 className="text-2xl font-semibold">📦 Order Now — USA Shipping</h2>
            <p className="mt-2 text-slate-700">
              {process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true"
                ? "Secure checkout via Stripe. Ships across the USA."
                : "Stripe checkout coming soon. Lock in your price today."}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {priceTiers.map((p) => (
                <div
                  key={p.title}
                  className={`rounded-2xl p-6 relative ${
                    p.featured
                      ? "border-2 border-amber-500 bg-white shadow-lg"
                      : "border border-slate-200 bg-white"
                  }`}
                >
                  {p.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="font-semibold">{p.title}</h3>
                  <div className="mt-2 text-2xl font-bold">{p.price}</div>
                  <p className="mt-2 text-slate-700 text-sm">{p.note}</p>
                  <button
                    onClick={() => handleOrderNow(p.priceId)}
                    className={`mt-4 w-full px-4 py-3 rounded-xl font-semibold ${t.button}`}
                  >
                    {process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true" ? "Order Now" : "Coming Soon"}
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600 text-center">
              🇺🇸 USA only shipping · 📍 Pickup available in Orangevale, CA
            </p>
          </div>
        </section>

        {/* PICKUP FORM — CF Lead Capture */}
        <section id="pickup" className="mt-10">
          <div className={`rounded-3xl p-8 ${t.card}`}>
            <h2 className="text-2xl font-semibold">🧃 Reserve Pickup — Orangevale</h2>
            <p className="mt-2 text-slate-700">
              Reserve now, pay on pickup. We'll confirm pickup timing via phone or email.
            </p>
            <form onSubmit={submitPickup} className="mt-6 grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <input
                name="phone"
                placeholder="Phone"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <select
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">Select quantity...</option>
                <option value="1 Bottle">1 Bottle</option>
                <option value="2 Bottles">2 Bottles</option>
                <option value="6-Pack">6-Pack</option>
                <option value="12-Pack">12-Pack</option>
                <option value="Custom">Custom — specify at pickup</option>
              </select>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-6 py-3 rounded-2xl font-semibold ${t.button} disabled:opacity-60`}
                >
                  {loading ? "Submitting..." : "✅ Reserve My Pickup"}
                </button>
              </div>
              {msg && (
                <div className="sm:col-span-2 text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3">
                  {msg}
                </div>
              )}
            </form>
            <p className="mt-4 text-sm text-slate-500">
              We'll reach out within 24 hours to confirm pickup timing.
            </p>
          </div>
        </section>

        {/* FAQ — Objection Handler */}
        <section className="mt-10">
          <div className={`rounded-3xl p-8 ${t.card}`}>
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <div className="mt-4 grid gap-4">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-slate-900">{f.q}</h3>
                  <p className="mt-1 text-slate-700">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA — Phase 3 */}
        <section className="mt-10">
          <div className={`rounded-3xl p-8 text-center ${t.card}`}>
            <h2 className="text-2xl font-semibold">Ready to taste the difference?</h2>
            <p className="mt-2 text-slate-700">Reserve your pickup or order online today.</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <a href="#pickup" className={`inline-flex justify-center items-center px-8 py-4 rounded-2xl font-semibold text-lg ${t.button}`}>
                🧃 Reserve Pickup
              </a>
              <a href="#order" className="inline-flex justify-center items-center px-8 py-4 rounded-2xl font-semibold text-lg border border-slate-300 bg-white hover:bg-slate-50">
                📦 Order Online
              </a>
            </div>
          </div>
        </section>

        <footer className="py-10 text-center text-sm text-slate-600">
          🍊 <strong>Brewing Brothers</strong> · Organic Juice · Orangevale, CA
        </footer>
      </div>

      {/* CF-P8 Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 ${t.button} py-4 text-center font-semibold md:hidden`}>
        <a href="#pickup" className="block w-full">🧃 Reserve Pickup — Free · Pay on Pickup</a>
      </div>
    </main>
  );
}
