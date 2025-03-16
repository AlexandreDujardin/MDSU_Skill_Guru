'use client';

import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { PageLayout } from "@/components/PageLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define the routes where the Sidebar and Navbar should not be visible
  const authRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/verify-email", "/offers"];
  const hideLayout = authRoutes.includes(pathname);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {hideLayout ? (
        // Render only the children, no Navbar or Sidebar
        <>{children}</>
      ) : (
        // Render Navbar and Sidebar for all other routes
        <>
          <Navbar />
          <SidebarWrapper>{children}</SidebarWrapper>
        </>
      )}
    </div>
  );
}
