import { NextResponse } from "next/server";

// ============================================================
// Brewing Brothers — Reserve Pickup API Route
// Validates → forwards to Apps Script → Google Sheet
// Status: LIVE
// ============================================================

export async function POST(req: Request) {
  try {
    const url = process.env.APPS_SCRIPT_WEB_APP_URL;
    if (!url) {
      return NextResponse.json(
        { ok: false, error: "Server configuration error. Contact support." },
        { status: 500 }
      );
    }

    const body = await req.json();

    // Validate required fields
    const name     = String(body.name     || "").trim();
    const email    = String(body.email    || "").trim();
    const phone    = String(body.phone    || "").trim();
    const quantity = String(body.quantity || "").trim();

    if (!name)     return NextResponse.json({ ok: false, error: "Name is required."     }, { status: 400 });
    if (!email)    return NextResponse.json({ ok: false, error: "Email is required."    }, { status: 400 });
    if (!phone)    return NextResponse.json({ ok: false, error: "Phone is required."    }, { status: 400 });
    if (!quantity) return NextResponse.json({ ok: false, error: "Quantity is required." }, { status: 400 });

    // Basic email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    // Forward to Apps Script
    const forward = await fetch(url, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, quantity, source: "reserve-pickup" }),
    });

    const text = await forward.text();
    let payload: { ok?: boolean; error?: string } = { ok: true };
    try { payload = JSON.parse(text); } catch { /* Apps Script returned non-JSON */ }

    if (!forward.ok || payload.ok === false) {
      return NextResponse.json(
        { ok: false, error: payload.error || "Failed to save reservation. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("reserve-pickup error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
