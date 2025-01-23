'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/actions';
import { createClient } from '@/utils/supabase/client';

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session?.user);
    };

    fetchSession();
  }, []);

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 md:px-8">
        <Link href="/" className="text-xl font-bold">
          Skill Guru
        </Link>
        {isAuthenticated && (
          <div className="ml-8 flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href="/offers">Offres</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/account">Mon compte</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/classes">Classes</Link>
            </Button>
          </div>
        )}
        <div className="ml-auto flex items-center space-x-4">
          {isAuthenticated ? (
            <form action={logout}>
              <Button variant="ghost">
                Se déconnecter
              </Button>
            </form>
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
      </div>
    </nav>
  );
}
