export const config = {
  matcher: [
    /*
     * Cocokkan semua rute request KECUALI:
     * 1. /api (rute API internal & NextAuth)
     * 2. _next/static (file statis)
     * 3. _next/image (optimasi gambar)
     * 4. favicon.ico, sitemap.xml, robots.txt (file metadata)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}