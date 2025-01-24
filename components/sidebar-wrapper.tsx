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
        <SidebarHeader>
          <Link href="/" className="block text-lg font-bold px-4 py-2">
            Skill Guru
          </Link>
        </SidebarHeader>

        <SidebarContent>
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
              <Link href="/offers" className="block p-4 hover:bg-gray-100">
                Offres
              </Link>
              <Link href="/account" className="block p-4 hover:bg-gray-100">
                Mon compte
              </Link>
              <Link href="/classes" className="block p-4 hover:bg-gray-100">
                Classes
              </Link>
            </>
          )}
        </SidebarContent>

        <SidebarFooter>
          <hr />
          <p className="text-xs text-gray-500 mt-4">© 2025 Skill Guru</p>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
    </SidebarProvider>
  );
}
