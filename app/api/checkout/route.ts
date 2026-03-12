import { NextResponse } from "next/server";

// ============================================================
// Brewing Brothers — Stripe Checkout Session Handler
// Phase 2 M5/M6 — STUB (safe to deploy, guarded by flag)
//
// SETUP STEPS:
//   1. Run: npm install stripe
//   2. Create Stripe account → 3 products → copy Price IDs
//   3. Add to Vercel env vars:
//      STRIPE_SECRET_KEY, STRIPE_PRICE_SINGLE,
//      STRIPE_PRICE_SIXPACK, STRIPE_PRICE_TWELVE
//   4. Set NEXT_PUBLIC_STRIPE_ENABLED=true in Vercel
//   5. Uncomment the Stripe block below
// ============================================================

// import Stripe from "stripe"; // Uncomment after: npm install stripe

export async function POST(req: Request) {
  try {
    const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true";

    if (!stripeEnabled) {
      return NextResponse.json(
        { ok: false, error: "Online ordering is coming soon. Reserve a pickup instead." },
        { status: 503 }
      );
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const baseUrl   = process.env.NEXT_PUBLIC_BASE_URL;

    if (!secretKey || !baseUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing configuration. Contact support." },
        { status: 500 }
      );
    }

    const body    = await req.json();
    const priceId = String(body.priceId || "").trim();

    if (!priceId) {
      return NextResponse.json({ ok: false, error: "Missing price selection." }, { status: 400 });
    }

    const validPrices = [
      process.env.STRIPE_PRICE_SINGLE,
      process.env.STRIPE_PRICE_SIXPACK,
      process.env.STRIPE_PRICE_TWELVE,
    ].filter(Boolean);

    if (!validPrices.includes(priceId)) {
      return NextResponse.json({ ok: false, error: "Invalid product selection." }, { status: 400 });
    }

    // ── UNCOMMENT AFTER: npm install stripe ───────────────────
    // const stripe  = new Stripe(secretKey, { apiVersion: "2024-04-10" });
    // const session = await stripe.checkout.sessions.create({
    //   mode: "payment",
    //   line_items: [{ price: priceId, quantity: 1 }],
    //   success_url: `${baseUrl}/thank-you?type=order&session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url:  `${baseUrl}/#order`,
    //   shipping_address_collection: { allowed_countries: ["US"] },
    //   metadata: { source: "order-now" },
    // });
    // return NextResponse.json({ ok: true, url: session.url });
    // ─────────────────────────────────────────────────────────

    return NextResponse.json(
      { ok: false, error: "Stripe not yet configured. Run: npm install stripe" },
      { status: 503 }
    );

  } catch (err) {
    console.error("checkout error:", err);
    return NextResponse.json(
      { ok: false, error: "Checkout unavailable. Please try again." },
      { status: 500 }
    );
  }
}
