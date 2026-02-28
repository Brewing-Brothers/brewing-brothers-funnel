"use client";
import { useMemo, useState } from "react";
import { getTheme, themeClasses } from "@/lib/themes";
export default function Home() {
  const theme = useMemo(() => getTheme(process.env.NEXT_PUBLIC_THEME), []);
  const t = themeClasses(theme);
  const [form, setForm] = useState({ name:"", email:"", phone:"", quantity:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function submitPickup(e: React.FormEvent) {
    e.preventDefault(); setError(null); setLoading(true);
    try {
      const res = await fetch("/api/reserve-pickup", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok || !data.ok) { setError(data.error || "Something went wrong."); }
      else { window.location.href = "/thank-you?type=pickup"; }
    } catch(err) { setError("Network error. Try again."); }
    finally { setLoading(false); }
  }
  return (
    <main className={`min-h-screen ${t.pageBg}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className={`rounded-3xl p-8 sm:p-12 ${t.card} shadow-sm`}>
          <span className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold uppercase ${t.badge}`}>🇺🇸 USA Shipping · 📍 Orangevale Pickup</span>
          <h1 className={`mt-4 text-4xl sm:text-5xl font-extrabold leading-tight ${t.heading}`}>Brewing Brothers<br/><span className="text-amber-600">Organic Juice</span></h1>
          <p className="mt-4 text-lg text-amber-800 max-w-xl">Farm-fresh, small-batch squeezed juice. Real ingredients. Real flavor. No preservatives, no shortcuts.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#pickup" className={`inline-flex justify-center items-center px-7 py-3 rounded-2xl font-semibold text-lg ${t.button}`}>🧃 Reserve Pickup — Pay on Pickup</a>
            <a href="#order" className={`inline-flex justify-center items-center px-7 py-3 rounded-2xl font-semibold text-lg ${t.btnSecondary}`}>📦 Order Online (USA Shipping)</a>
          </div>
          <p className="mt-4 text-sm text-amber-700">📍 Pickup: <strong>Orangevale, California</strong></p>
        </section>
        <section className="grid gap-5 sm:grid-cols-3">
          {[{icon:"🌱",h:"100% Organic",p:"Certified organic ingredients — nothing synthetic, ever."},{icon:"🤝",h:"Small Batch",p:"Made fresh in small runs so every bottle is at peak flavor."},{icon:"🚫",h:"No Preservatives",p:"What you see on the label is everything in the bottle."}].map(x=>(
            <div key={x.h} className={`rounded-2xl p-6 ${t.card} shadow-sm`}>
              <div className="text-3xl mb-2">{x.icon}</div>
              <h3 className={`text-lg font-bold ${t.heading}`}>{x.h}</h3>
              <p className="mt-2 text-amber-700 text-sm">{x.p}</p>
            </div>
          ))}
        </section>
        <section id="order" className={`rounded-3xl p-8 ${t.card} shadow-sm`}>
          <h2 className={`text-2xl font-bold ${t.heading}`}>📦 Order Now — USA Shipping</h2>
          <p className="mt-2 text-amber-700">Stripe checkout coming soon. Lock in your price today.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[{title:"Single Bottle",price:"TBD",note:"Perfect first taste.",badge:""},{title:"6-Pack",price:"TBD",note:"Better value per bottle.",badge:"Most Popular"},{title:"12-Pack",price:"TBD",note:"Best value — stock up.",badge:"Best Value"}].map(p=>(
              <div key={p.title} className="rounded-2xl border border-amber-200 bg-white p-6 relative">
                {p.badge && <span className="absolute -top-3 left-4 bg-amber-600 text-white text-xs px-2 py-1 rounded-full font-semibold">{p.badge}</span>}
                <h3 className="font-bold text-amber-900">{p.title}</h3>
                <div className="mt-2 text-2xl font-extrabold text-amber-700">{p.price}</div>
                <p className="mt-2 text-sm text-amber-700">{p.note}</p>
                <button className={`mt-4 w-full px-4 py-3 rounded-xl font-semibold ${t.button} opacity-70`} onClick={()=>alert("Stripe coming soon!")}>Coming Soon</button>
              </div>
            ))}
          </div>
        </section>
        <section id="pickup" className={`rounded-3xl p-8 ${t.card} shadow-sm`}>
          <h2 className={`text-2xl font-bold ${t.heading}`}>🧃 Reserve Pickup — Orangevale</h2>
          <p className="mt-2 text-amber-700">No payment now — reserve your bottles and pay on pickup.</p>
          <form onSubmit={submitPickup} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-amber-800">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="John Smith" className={`w-full rounded-xl border ${t.input} bg-white px-4 py-3 focus:outline-none focus:ring-2`} required/>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-amber-800">Email *</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" type="email" className={`w-full rounded-xl border ${t.input} bg-white px-4 py-3 focus:outline-none focus:ring-2`} required/>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-amber-800">Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="916-555-0100" className={`w-full rounded-xl border ${t.input} bg-white px-4 py-3 focus:outline-none focus:ring-2`} required/>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-amber-800">Quantity *</label>
              <select name="quantity" value={form.quantity} onChange={handleChange} className={`w-full rounded-xl border ${t.input} bg-white px-4 py-3 focus:outline-none focus:ring-2`} required>
                <option value="">Select quantity...</option>
                <option value="1 bottle">1 Bottle</option>
                <option value="2 bottles">2 Bottles</option>
                <option value="6-pack">6-Pack</option>
                <option value="12-pack">12-Pack</option>
                <option value="Custom">Custom — specify at pickup</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" disabled={loading} className={`w-full px-6 py-4 rounded-2xl font-bold text-lg ${t.button} disabled:opacity-60`}>{loading?"⏳ Submitting...":"✅ Reserve My Pickup"}</button>
            </div>
            {error && <div className="sm:col-span-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">⚠️ {error}</div>}
          </form>
        </section>
        <section className={`rounded-3xl p-8 ${t.card} shadow-sm`}>
          <h2 className={`text-2xl font-bold ${t.heading}`}>FAQ</h2>
          <div className="mt-4 divide-y divide-amber-100">
            {[{q:"Do you ship internationally?",a:"No — USA only for now."},{q:"Where exactly is pickup?",a:"Orangevale, California. Address confirmed after reservation."},{q:"When does online ordering go live?",a:"Very soon — Stripe is being connected."},{q:"How fresh is the juice?",a:"Small batches, consumed fresh. Batch date shared at pickup."},{q:"Can I cancel my reservation?",a:"Yes — reply to your confirmation email."}].map(x=>(
              <div key={x.q} className="py-4">
                <h3 className="font-semibold text-amber-900">{x.q}</h3>
                <p className="mt-1 text-amber-700 text-sm">{x.a}</p>
              </div>
            ))}
          </div>
        </section>
        <footer className="py-8 text-center text-sm text-amber-600">
          <div className="text-2xl mb-2">🍊</div>
          <strong>Brewing Brothers</strong> · Organic Juice · Orangevale, CA
        </footer>
      </div>
    </main>
  );
}
