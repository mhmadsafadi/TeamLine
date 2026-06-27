import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)' 
};


// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export function proxy(request) {
//   return createMiddleware(routing)(request);
// }

// export const config = {
//   matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
// };