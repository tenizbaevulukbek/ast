import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./app/lib/session";

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public paths that do not require authentication
  const isPublicPath = path === "/login";

  // Read session cookie from request
  const sessionCookie = request.cookies.get("session")?.value;
  const session = sessionCookie ? decrypt(sessionCookie) : null;

  // Check if session is valid
  const isAuth = session && new Date(session.expiresAt) > new Date();

  // If not authenticated and trying to access a protected page, redirect to login
  if (!isAuth && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already authenticated and trying to access login, redirect to home
  if (isAuth && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Пропускаем мимо авторизации:
     * - api (руты API)
     * - _next/static и _next/image (сервисные файлы)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Графика: png, jpg, jpeg, gif, svg, webp, ico
     * - Видео: mp4, webm, mov, ogg
     */
    '/((?!api|_next/static|_next/image|favicon\.ico|sitemap\.xml|robots\.txt|.*\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|mov|ogg)$).*)',
  ],
};