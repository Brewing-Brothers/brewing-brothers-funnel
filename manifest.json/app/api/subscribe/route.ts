import { NextResponse } from "next/server";

// ============================================================
// Brewing Brothers — Email Subscribe API Route
// Phase 4 — email capture popup / lead magnet
// Status: STUB — not yet wired to email provider
//
// SETUP: When ready, choose ONE:
//   Option A — Brevo (free 300/day):
//     npm install @getbrevo/brevo
//     Add BREVO_API_KEY to Vercel env vars
//   Option B — MailerLite (free 12k/month):
//     npm install mailerlite-universal
//     Add MAILERLITE_API_KEY to Vercel env vars
// ============================================================

export async function POST(req: Request) {
  try {
    const body  = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const source = String(body.source || "popup").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ── Option A: Brevo ───────────────────────────────────────
    // const brevoKey = process.env.BREVO_API_KEY;
    // if (brevoKey) {
    //   await fetch("https://api.brevo.com/v3/contacts", {
    //     method: "POST",
    //     headers: {
    //       "accept": "application/json",
    //       "content-type": "application/json",
    //       "api-key": brevoKey,
    //     },
    //     body: JSON.stringify({
    //       email,
    //       listIds: [2],
    //       attributes: { SOURCE: source },
    //       updateEnabled: true,
    //     }),
    //   });
    // }

    // ── Option B: Apps Script fallback ───────────────────────
    const appsScriptUrl = process.env.APPS_SCRIPT_WEB_APP_URL;
    if (appsScriptUrl) {
      await fetch(appsScriptUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, name: "", phone: "", quantity: "email-signup" }),
      });
    }

    return NextResponse.json({ ok: true, message: "Subscribed successfully." });

  } catch (err) {
    console.error("subscribe error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
