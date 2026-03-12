import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brewing Brothers — Organic Juice",
  description: "Farm-fresh, small-batch organic juice. USA shipping + Orangevale, CA pickup.",
  openGraph: {
    title: "Brewing Brothers — Organic Juice",
    description: "Farm-fresh, small-batch organic juice. USA shipping + Orangevale, CA pickup.",
    type: "website",
    url: "https://brewing-brothers-funnel.vercel.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
