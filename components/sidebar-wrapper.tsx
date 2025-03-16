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
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/home.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9ob21lLnN2ZyIsImlhdCI6MTc0MjEwMDk4OCwiZXhwIjoxNzczNjM2OTg4fQ.QpZdpEOt5J_WhstRHZXQWB0qy8w5qEJaKCB5qxPi98g" alt="Accueil" className="h-6 w-6 " />
                    <span>Accueil</span>
                  </Link>

                  <Link href="/catalog" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/catalog.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9jYXRhbG9nLnN2ZyIsImlhdCI6MTc0MjEwMDkwOCwiZXhwIjoxNzczNjM2OTA4fQ.CyUvRWMqgQ42BMn1JOI1z8t8HHQFMesDQ3bs0BSl-fQ" alt="Catalogue" className="h-6 w-6" />
                    <span>Catalogue</span>
                  </Link>

                  <Link href="/playlists" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/playlists.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9wbGF5bGlzdHMuc3ZnIiwiaWF0IjoxNzQyMTAxMDEzLCJleHAiOjE3NzM2MzcwMTN9.vqEDfYQRHYJeV4MLrdUEa0z7CZiGd3ApXA6iY-0M4qo" alt="Playlists" className="h-6 w-6" />
                    <span>Playlists</span>
                  </Link>
                  
                  <hr />
                  
                  <Link href="/classes" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/classes.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9jbGFzc2VzLnN2ZyIsImlhdCI6MTc0MjEwMDkzMCwiZXhwIjoxNzczNjM2OTMwfQ.m-lbpgiJ01I9LRuzqxihXB90vMoWQeDsE_nrmE9r68c" alt="Classes" className="h-6 w-6"/>
                    <span>Classes</span>
                  </Link>

                  <Link href="/suivi" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/suivi.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9zdWl2aS5zdmciLCJpYXQiOjE3NDIxMDEwMzMsImV4cCI6MTc3MzYzNzAzM30.Vmlv8vx6yurlsYIe_cPQqDgvDv1cSsZm6HUANZAT2ys" alt="Suivi pédagogique" className="h-6 w-6"/>
                    <span>Suivi</span>
                  </Link>

                  <hr />

                  <Link href="/support" className="flex flex-col items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/help.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9oZWxwLnN2ZyIsImlhdCI6MTc0MjEwMDk3MCwiZXhwIjoxNzczNjM2OTcwfQ.TNGkPFgcXvqEhivX4koo2Z5PTIR8Jz9s0XD5geGtH3Q" alt="Support" className="h-6 w-6"/>
                    <span>Support</span>
                  </Link>
                </div>
                
              ) : (
                <div className="flex flex-col justify-evenly space-y-4 gap-4">
                  <Link href="/" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/home.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9ob21lLnN2ZyIsImlhdCI6MTc0MjEwMDk4OCwiZXhwIjoxNzczNjM2OTg4fQ.QpZdpEOt5J_WhstRHZXQWB0qy8w5qEJaKCB5qxPi98g" alt="Accueil" className="h-6 w-6" />
                    <span className="ml-3">Accueil</span>
                  </Link>

                  <Link href="/catalog" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/catalog.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9jYXRhbG9nLnN2ZyIsImlhdCI6MTc0MjEwMDkwOCwiZXhwIjoxNzczNjM2OTA4fQ.CyUvRWMqgQ42BMn1JOI1z8t8HHQFMesDQ3bs0BSl-fQ" alt="Catalogue" className="h-6 w-6" />
                    <span className="ml-3">Catalogue</span>
                  </Link>

                  <Link href="/playlists" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/playlists.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9wbGF5bGlzdHMuc3ZnIiwiaWF0IjoxNzQyMTAxMDEzLCJleHAiOjE3NzM2MzcwMTN9.vqEDfYQRHYJeV4MLrdUEa0z7CZiGd3ApXA6iY-0M4qo" alt="Playlists" className="h-6 w-6" />
                    <span className="ml-3">Playlists de jeux</span>
                  </Link>
                  
                  <hr />
                  
                  <Link href="/classes" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/classes.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9jbGFzc2VzLnN2ZyIsImlhdCI6MTc0MjEwMDkzMCwiZXhwIjoxNzczNjM2OTMwfQ.m-lbpgiJ01I9LRuzqxihXB90vMoWQeDsE_nrmE9r68c" alt="Classes" className="h-6 w-6"/>
                    <span className="ml-3">Mes classes</span>
                  </Link>

                  <Link href="/suivi" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/suivi.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9zdWl2aS5zdmciLCJpYXQiOjE3NDIxMDEwMzMsImV4cCI6MTc3MzYzNzAzM30.Vmlv8vx6yurlsYIe_cPQqDgvDv1cSsZm6HUANZAT2ys" alt="Suivi pédagogique" className="h-6 w-6"/>
                    <span className="ml-3">Suivi pédagogique</span>
                  </Link>

                  <hr />

                  <Link href="/support" className="flex items-center p-4 hover:border-border-default hover:border-l-4 focus:border-l-4 border-border-default">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/help.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9oZWxwLnN2ZyIsImlhdCI6MTc0MjEwMDk3MCwiZXhwIjoxNzczNjM2OTcwfQ.TNGkPFgcXvqEhivX4koo2Z5PTIR8Jz9s0XD5geGtH3Q" alt="Support" className="h-6 w-6"/>
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
                  <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/icon-poulp.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9pY29uLXBvdWxwLnN2ZyIsImlhdCI6MTc0MjEwMTE0OSwiZXhwIjoxNzczNjM3MTQ5fQ.x7tkYHsNPlma7f9PdK6fp1xu2Q7xtdDQccRMFC7rr4Q" alt="logo" className="w-10" />
                  <div className="flex flex-col gap-1 text-center">
                    <p>Skill Guru - </p>
                    <p className="underline">Tous droits réservés</p>
                  </div>
                  <a href="#" className="underline">Mentions légales</a>
                </div>
                
              ) : (
                <div className="items-center justify-center flex flex-col text-text-alternative text-xs gap-2">
                  <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/logos/logo_brand_white.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvcy9sb2dvX2JyYW5kX3doaXRlLnN2ZyIsImlhdCI6MTc0MjEwMTI1MSwiZXhwIjoxNzczNjM3MjUxfQ.ZAPw3QPTDocmSyp838L_gAtSpiPbhlILAjseWXO-hVA" alt="logo" />
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
