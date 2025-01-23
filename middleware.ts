import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next(); // Create response

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => response.cookies.set(name, value, options),
        remove: (name) => response.cookies.delete(name),
      },
    }
  );

  const { data: session, error } = await supabase.auth.getSession();

  if (!session) {
    console.error('No session or refresh token found:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}
