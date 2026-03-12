export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { type?: string; session_id?: string };
}) {
  const type = searchParams.type || "order";

  const config = {
    pickup: {
      title: "Pickup Reserved ✅",
      body:  "We received your Orangevale pickup reservation. We'll reach out within 24 hours to confirm pickup timing.",
      sub:   "Check your email for a confirmation message.",
    },
    order: {
      title: "Order Confirmed ✅",
      body:  "Thank you for your order! You'll receive a shipping confirmation email shortly.",
      sub:   "Questions? Reply to your confirmation email.",
    },
  };

  const content = config[type as keyof typeof config] || config.order;

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white border border-amber-200 rounded-3xl p-10 text-center shadow-sm">
        <div className="text-5xl mb-4">🧃</div>
        <h1 className="text-2xl font-bold text-amber-900">{content.title}</h1>
        <p className="mt-4 text-slate-700 leading-relaxed">{content.body}</p>
        <p className="mt-2 text-sm text-slate-500">{content.sub}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-2xl bg-amber-700 text-white font-semibold hover:bg-amber-800"
          >
            ← Back to Home
          </a>
          {type === "pickup" && (
            <a
              href="#"
              className="inline-block px-6 py-3 rounded-2xl border border-amber-200 text-amber-800 font-semibold hover:bg-amber-50"
            >
              Reserve Another
            </a>
          )}
        </div>
        <p className="mt-8 text-xs text-slate-400">
          Brewing Brothers · Organic Juice · Orangevale, CA
        </p>
      </div>
    </main>
  );
}
