'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { logout } from '@/app/actions';
import { ChevronDown, Search } from 'lucide-react';

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setIsAuthenticated(true);

        // Fetch user profile (avatar & first_login)
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url, first_login')
          .eq('id', session.user.id)
          .single();

        setUserAvatar(profile?.avatar_url || null);
      }
    };

    fetchSession();
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center px-6 z-10">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img src="/images/logo_brand.svg" alt="Skill Guru Logo" className="h-10" />
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

        {/* User Actions */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative p-2 border border-border-active rounded-md hover:bg-primary/10">
            <img src="/images/icons/bell.svg" alt="Notification" className="h-6" />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </button>

          {/* User Account */}
          {isAuthenticated ? (
            <Button type='primary'>
              <Link href="/account" className="flex justify-evenly items-center text-white px-4 py-2 rounded-md gap-2">
                <img src="/images/icons/account.svg" alt="Mon compte" className="h-6" />
                Mon compte
                <ChevronDown size={18} />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/auth/sign-in">Connexion</Link>
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}
