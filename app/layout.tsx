import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RetireCalc — Retirement Projection with Life Events",
  description: "Plan your retirement with toggleable life events like buying a home, having children, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
