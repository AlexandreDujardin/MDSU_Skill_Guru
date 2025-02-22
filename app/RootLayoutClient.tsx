'use client';

import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// A function to dynamically map routes to titles
const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case "/":
      return "Accueil";
    case "/catalog":
      return "Gurulogue";
    case "/offers":
      return "Offers";
    case "/account":
      return "Mon compte";
    case "/classes":
      return "Classes";
    default:
      return "Skill Guru";
  }
};

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define the routes where the Sidebar and Navbar should not be visible
  const authRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/verify-email", "/offers"];
  const hideLayout = authRoutes.includes(pathname);

  // Get the page title based on the current route
  const pageTitle = getPageTitle(pathname);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {hideLayout ? (
        // Render only the children, no Navbar or Sidebar
        <>{children}</>
      ) : (
        // Render Navbar and Sidebar for all other routes
        <>
          <Navbar pageTitle={pageTitle} />
          <SidebarWrapper>{children}</SidebarWrapper>
        </>
      )}
    </div>
  );
}
