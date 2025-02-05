'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { logout } from '@/app/actions';

export function Navbar({ pageTitle }: { pageTitle: string }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setIsAuthenticated(true);

        // Fetch user avatar from profile if available
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

  return (
    <nav className="border-b bg-white shadow fixed top-0 left-4 w-full h-16 z-10 flex items-center px-6 md:pl-[250px] justify-between">
      {/* Page Title */}
      <h1 className="text-xl font-bold whitespace-nowrap">{pageTitle}</h1>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <div>
            <form action={logout}>
              <Button variant="ghost">
                Se déconnecter
              </Button>
            </form>
            <Link href="/account" className="rounded-full focus:outline-none">
              <img
                src={userAvatar || 'images/default-avatar.svg'} // Fallback to a default avatar
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover border"
              />
            </Link>
          </div>
        ) : (
          <>
            <Button asChild variant="ghost">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>

  );
}
