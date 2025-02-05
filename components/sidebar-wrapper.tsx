'use client';

import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session?.user);
    };

    fetchSession();
  }, []);

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <Sidebar>
      <SidebarHeader className="flex justify-center items-center py-4">
        <Link href="/" className="block">
          <img
            src="/images/logo_brand.svg" // Replace this with the path to your logo
            alt="Skill Guru Logo"
            className="h-12 w-auto" // Adjust the height as needed
          />
        </Link>
      </SidebarHeader>

        <SidebarContent className="flex flex-col justify-center h-full space-y-4">
          {/* Dashboard Link - Only for Non-Authenticated Users */}
          {!isAuthenticated && (
            <Link href="/signin" className="block p-4 hover:bg-gray-100">
              Dashboard
            </Link>
          )}

          {/* Authenticated Links */}
          {isAuthenticated && (
            <>
              <Link href="/catalog" className="block p-4 hover:bg-gray-100">
                Gurulogue
              </Link>
              <Link href="/classes" className="block p-4 hover:bg-gray-100">
                Classes
              </Link>
              <Link href="/classes" className="block p-4 hover:bg-gray-100">
                Suivi pédagogique
              </Link>
              <Link href="/classes" className="block p-4 hover:bg-gray-100">
                Support
              </Link>
            </>
          )}
        </SidebarContent>

        <SidebarFooter>
          <hr />
          <div className="items-center justify-center flex flex-col">
            <p className="text-xs text-gray-500 mt-4">V0.1</p>
            <p className="text-xs text-gray-500 mt-4">© 2025 Skill Guru</p>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
    </SidebarProvider>
  );
}
