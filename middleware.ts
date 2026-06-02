import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // JIKA rute yang diakses mengandung '/api/auth', langsung loloskan tanpa periksa login
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // ... (Sisa kode cek token/session login Anda yang sudah ada di bawahnya)
}