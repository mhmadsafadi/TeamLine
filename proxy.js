import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // تشغيل next-intl أولاً
  const response = intlMiddleware(request);

  // إنشاء Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // الصفحات المحمية
  const isAuthPage = pathname.includes('/login') || pathname.includes('/signup');
  const isDashboardPage = pathname.includes('/dashboard') ||
    pathname.includes('/projects') ||
    pathname.includes('/tasks') ||
    pathname.includes('/team') ||
    pathname.includes('/settings') ||
    pathname.includes('/workspaces');

  // لو مسجل ويحاول يدخل auth → حوله للـ dashboard
  if (user && isAuthPage) {
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // لو مش مسجل ويحاول يدخل dashboard → حوله للـ login
  if (!user && isDashboardPage) {
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)' 
};