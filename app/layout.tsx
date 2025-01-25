// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

export const metadata: Metadata = {
  title: "Skill Guru",
  description: "Skill Guru is a platform to learn and share skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Delegate rendering logic to the client layout */}
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
