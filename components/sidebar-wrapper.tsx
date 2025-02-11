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
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for toggling sidebar

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar collapse state

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
      <div className="flex">
        {/* Sidebar */}
        <Sidebar className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
          {/* Sidebar Header with Toggle Button */}
          <SidebarHeader className="flex justify-between items-center py-4 px-3">
            {!isCollapsed && (
              <Link href="/" className="block">
                <img
                  src="/images/logo_brand.svg"
                  alt="Skill Guru Logo"
                  className="h-12 w-auto transition-all duration-300"
                />
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-md hover:bg-gray-200"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent className="flex flex-col space-y-2">
            {!isAuthenticated && (
              <Link href="/signin" className="flex items-center p-4 hover:bg-gray-100">
                <img
                  src="/images/icons/dashboard.svg"
                  alt="Dashboard"
                  className="h-6 w-6"
                />
                {!isCollapsed && <span className="ml-3">Dashboard</span>}
              </Link>
            )}

            {isAuthenticated && (
              <>
                <Link href="/" className="flex items-center p-4 hover:bg-gray-100">
                  <img
                    src="/images/icons/home.svg"
                    alt="Accueil"
                    className="h-6 w-6"
                  />
                  {!isCollapsed && <span className="ml-3">Accueil</span>}
                </Link>

                <Link href="/catalog" className="flex items-center p-4 hover:bg-gray-100">
                  <img
                    src="/images/icons/catalog.svg"
                    alt="Catalogue"
                    className="h-6 w-6"
                  />
                  {!isCollapsed && <span className="ml-3">Gurulogue</span>}
                </Link>

                <Link href="/playlists" className="flex items-center p-4 hover:bg-gray-100">
                  <img
                    src="/images/icons/playlists.svg"
                    alt="Playlists"
                    className="h-6 w-6"
                  />
                  {!isCollapsed && <span className="ml-3">Playlist de jeux</span>}
                </Link>

                <Link href="/classes" className="flex items-center p-4 hover:bg-gray-100">
                  <img
                    src="/images/icons/classes.svg"
                    alt="Classes"
                    className="h-6 w-6"
                  />
                  {!isCollapsed && <span className="ml-3">Classes</span>}
                </Link>

                <Link href="/suivi" className="flex items-center p-4 hover:bg-gray-100">
                  <img
                    src="/images/icons/suivi.svg"
                    alt="Suivi pédagogique"
                    className="h-6 w-6"
                  />
                  {!isCollapsed && <span className="ml-3">Suivi pédagogique</span>}
                </Link>

                <Link href="/support" className="flex items-center p-4 hover:bg-gray-100">
                  <img
                    src="/images/icons/help.svg"
                    alt="Support"
                    className="h-6 w-6"
                  />
                  {!isCollapsed && <span className="ml-3">Support</span>}
                </Link>
              </>
            )}
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter>
            <hr />
            <div className="items-center justify-center flex flex-col">
              {!isCollapsed && <p className="text-xs text-gray-500 mt-4">V0.1</p>}
              <p className="text-xs text-gray-500 mt-4">© 2025 Skill Guru</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
