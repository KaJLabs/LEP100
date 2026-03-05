import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lithic Contracts Wizard • LEP100",
  description: "Generate LEP100-compliant Lithic smart contracts for Lithosphere.",
  metadataBase: new URL("https://lithiclang.ai"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
