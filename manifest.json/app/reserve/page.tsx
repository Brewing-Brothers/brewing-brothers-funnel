"use client";

import { useState } from "react";

// ============================================================
// Standalone /reserve page — dedicated pickup funnel
// Phase 3 option: higher conversion via single-focus page
// ============================================================

export default function ReservePage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
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

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🧃</div>
          <h1 className="text-3xl font-bold text-amber-900">Reserve Your Pickup</h1>
          <p className="mt-2 text-slate-700">
            Orangevale, CA · No payment now · Pay on pickup
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {["🌱 Organic","🧊 Cold-Pressed","🚫 No Preservatives"].map((b) => (
              <span key={b} className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">{b}</span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-amber-200 rounded-3xl p-8 shadow-sm">
          <form onSubmit={submit} className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input
                name="name"
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <input
                name="email"
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
              <input
                name="phone"
                placeholder="916-555-0000"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Quantity *</label>
              <select
                name="quantity"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">Select quantity...</option>
                <option value="1 Bottle">1 Bottle</option>
                <option value="2 Bottles">2 Bottles</option>
                <option value="6-Pack">6-Pack</option>
                <option value="12-Pack">12-Pack</option>
                <option value="Custom">Custom — specify at pickup</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-lg disabled:opacity-60 transition-colors"
            >
              {loading ? "Submitting..." : "✅ Reserve My Pickup"}
            </button>
            {msg && (
              <div className="text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3">{msg}</div>
            )}
          </form>
          <p className="mt-4 text-center text-sm text-slate-500">
            We'll confirm pickup timing within 24 hours via email or phone.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          <a href="/" className="underline">← Back to main page</a>
        </p>
      </div>
    </main>
  );
}
