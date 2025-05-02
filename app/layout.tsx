// In Next.js, special layout.tsx files are for creating UI that is shared between multiple pages
// During re-rendering, only the page components update while the layout won't re-render (partian rendering)

import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

// Required in every Next.js application
// Any UI you add to the root layout will be shared across all pages in your application
// You can use the root layout to modify your <html> and <body> tags,
// and add metadata
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Antialiasing from Tailwind smooths out the Inter font */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
