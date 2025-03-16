'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { logout } from '@/app/actions';
import { ChevronDown, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const supabase = createClient();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState("auto");

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setIsAuthenticated(true);

        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', session.user.id)
          .single();

        setUserAvatar(profile?.avatar_url || null);
      }
    };

    fetchSession();
  }, []);

  // Mettre à jour la largeur du menu
  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(`${triggerRef.current.offsetWidth}px`);
    }
  }, [isAuthenticated]);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center px-6 z-50">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/logos/logo_brand.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvcy9sb2dvX2JyYW5kLnN2ZyIsImlhdCI6MTc0MjEwMTIzOSwiZXhwIjoxNzczNjM3MjM5fQ.Ei-Snon5D5S1kJjRUUlxSNqAj_IPEf9ES5vDa_rwPBA" alt="Skill Guru Logo" className="h-10" />
      </Link>

      {/* Search Bar */}
      <div className="flex flex-grow justify-center mx-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Rechercher"
            className="w-full h-12 pl-4 pr-10 border border-gray-300 rounded-md text-text-primary focus:border-primary focus:ring-primary focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        </div>
      </div>

      {/* Notification & Account */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button className="relative p-2 border border-border-active rounded-md hover:bg-primary/10">
          <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/bell.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9iZWxsLnN2ZyIsImlhdCI6MTc0MjEwMDg5MiwiZXhwIjoxNzczNjM2ODkyfQ.FZM7yQmEEUfe__ujbAYmr6GsDvD-8E28Oa5A6T4WxTM" alt="Notification" className="h-6" />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            0
          </span>
        </button>

        {/* Account Button with Dropdown */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button ref={triggerRef} variantType="primary" className="flex items-center gap-2">
                {userAvatar ? (
                  <img src={userAvatar} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-300" />
                ) : (
                  <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/icons/account.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpY29ucy9hY2NvdW50LnN2ZyIsImlhdCI6MTc0MjEwMDg4MCwiZXhwIjoxNzczNjM2ODgwfQ.d4zxcXJeJnPSBt465nDZ4MY7Z_d-GnzORc8sjP_HGY8" alt="Mon compte" className="h-6" />
                )}
                Mon compte
                <ChevronDown size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" style={{ minWidth: triggerWidth }} className='bg-button-primary text-text-alternative'>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/account">Infos compte</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/account/subscription">Mon abonnement</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await logout();
                  setIsAuthenticated(false);
                }}
                className="cursor-pointer"
              >
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/auth/sign-in">Connexion</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
