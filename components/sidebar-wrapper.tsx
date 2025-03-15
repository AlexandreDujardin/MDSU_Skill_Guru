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
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        {/* Sidebar - Positioned Below Navbar */}
        <Sidebar 
          className={`fixed left-0 top-16 transition-all duration-300 ${isCollapsed ? "w-28" : "w-64"} h-[calc(100vh-4rem)] shadow-lg`}>
          {/* Sidebar Header with Toggle */}
          <SidebarHeader className="flex justify-between items-end py-4 px-0">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-l-md bg-button-tertiary ml-auto"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent className="flex space-y-2 text-border-default">
            {isAuthenticated ? (
              <>
                {isCollapsed ? (
                <div className="text-center">
                  <Link href="/" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/home.svg" alt="Accueil" className="h-6 w-6 " />
                    <span>Accueil</span>
                  </Link>

                  <Link href="/catalog" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/catalog.svg" alt="Catalogue" className="h-6 w-6" />
                    <span>Catalogue</span>
                  </Link>

                  <Link href="/playlists" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/playlists.svg" alt="Playlists" className="h-6 w-6" />
                    <span>Playlists</span>
                  </Link>
                  
                  <hr />
                  
                  <Link href="/classes" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/classes.svg" alt="Classes" className="h-6 w-6"/>
                    <span>Classes</span>
                  </Link>

                  <Link href="/suivi" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/suivi.svg" alt="Suivi pédagogique" className="h-6 w-6"/>
                    <span>Suivi</span>
                  </Link>

                  <hr />

                  <Link href="/support" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/help.svg" alt="Support" className="h-6 w-6"/>
                    <span>Support</span>
                  </Link>
                </div>
                
              ) : (
                <div className="flex flex-col justify-evenly space-y-4 gap-4">
                  <Link href="/" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/home.svg" alt="Accueil" className="h-6 w-6" />
                    <span className="ml-3">Accueil</span>
                  </Link>

                  <Link href="/catalog" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/catalog.svg" alt="Catalogue" className="h-6 w-6" />
                    <span className="ml-3">Catalogue</span>
                  </Link>

                  <Link href="/playlists" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/playlists.svg" alt="Playlists" className="h-6 w-6" />
                    <span className="ml-3">Playlists de jeux</span>
                  </Link>
                  
                  <hr />
                  
                  <Link href="/classes" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/classes.svg" alt="Classes" className="h-6 w-6"/>
                    <span className="ml-3">Mes classes</span>
                  </Link>

                  <Link href="/suivi" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/suivi.svg" alt="Suivi pédagogique" className="h-6 w-6"/>
                    <span className="ml-3">Suivi pédagogique</span>
                  </Link>

                  <hr />

                  <Link href="/support" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="/images/icons/help.svg" alt="Support" className="h-6 w-6"/>
                    <span className="ml-3">Support technique</span>
                  </Link>
                </div>
              )}
                
              </>
            ) : (
              <Link href="/signin" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                <img src="/images/icons/dashboard.svg" alt="Dashboard" className="h-6 w-6" />
                {!isCollapsed && <span className="ml-3">Dashboard</span>}
              </Link>
            )}
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter>
            <hr />
              {isCollapsed ? (
                <div className="items-center justify-center flex flex-col text-text-alternative text-xs gap-2">
                  <img src="/images/icon-poulp.svg" alt="logo" className="w-10" />
                  <div className="flex flex-col gap-1 text-center">
                    <p>Skill Guru - </p>
                    <p className="underline">Tous droits réservés</p>
                  </div>
                  <a href="#" className="underline">Mentions légales</a>
                </div>
                
              ) : (
                <div className="items-center justify-center flex flex-col text-text-alternative text-xs gap-2">
                  <img src="/images/logo_brand_white.svg" alt="logo" />
                  <div className="flex flex-row items-center">
                    <p>Skill Guru - </p>
                    <p className="underline">Tous droits réservés</p>
                  </div>
                  <a href="#" className="underline">Mentions légales</a>
                </div>
              )}
          </SidebarFooter>
        </Sidebar>

        {/* Main Content - Adjusting for Sidebar and Navbar */}
        <main className="flex-1 p-6 bg-white overflow-auto mt-16">{children}</main>
    </SidebarProvider>
  );
}
