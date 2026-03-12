import { NextResponse } from "next/server";

// ============================================================
// Brewing Brothers — Stripe Webhook Handler
// Phase 2 M7/M8 — STUB
//
// SETUP STEPS:
//   1. npm install stripe
//   2. Stripe Dashboard → Developers → Webhooks → Add endpoint
//      URL: https://brewing-brothers-funnel.vercel.app/api/webhook/stripe
//      Events: checkout.session.completed, payment_intent.succeeded
//   3. Copy signing secret → add STRIPE_WEBHOOK_SECRET to Vercel env vars
//   4. Uncomment the Stripe block below
//
// WHAT THIS DOES WHEN WIRED:
//   - Listens for successful Stripe payments
//   - Logs the order to Google Sheet (via Apps Script)
//   - Triggers confirmation email
//   - Sets up for future HubSpot CRM sync (Phase 3)
// ============================================================

export async function POST(req: Request) {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true";

    if (!stripeEnabled || !webhookSecret) {
      return NextResponse.json({ ok: false, message: "Webhook not configured." }, { status: 200 });
    }

    const body      = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    // ── UNCOMMENT AFTER: npm install stripe ───────────────────
    // import Stripe from "stripe";
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" });
    // let event: Stripe.Event;
    // try {
    //   event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    // } catch (err) {
    //   console.error("Webhook signature verification failed:", err);
    //   return NextResponse.json({ ok: false }, { status: 400 });
    // }
    //
    // if (event.type === "checkout.session.completed") {
    //   const session = event.data.object as Stripe.Checkout.Session;
    //   const appsScriptUrl = process.env.APPS_SCRIPT_WEB_APP_URL;
    //   if (appsScriptUrl) {
    //     await fetch(appsScriptUrl, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         name:     session.shipping_details?.name || "Online Order",
    //         email:    session.customer_details?.email || "",
    //         phone:    session.customer_details?.phone || "",
    //         quantity: String(session.amount_total ? session.amount_total / 100 : 0),
    //         source:   "stripe-webhook",
    //       }),
    //     });
    //   }
    // }
    // ─────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true, received: true });

  } catch (err) {
    console.error("stripe webhook error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Required: tell Next.js not to parse the body (Stripe needs raw bytes)
export const config = { api: { bodyParser: false } };
