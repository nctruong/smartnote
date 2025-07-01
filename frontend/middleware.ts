// // middleware.ts
// import { NextRequest, NextResponse } from 'next/server'
//
// export function middleware(request: NextRequest) {
//     const token = request.cookies.get('token')?.value
//
//     // 🔐 List of protected routes
//     const protectedPaths = ['/dashboard', '/profile']
//
//     const path = request.nextUrl.pathname
//
//     const isProtected = protectedPaths.some(p => path.startsWith(p))
//
//     if (isProtected && !token) {
//         const loginUrl = new URL('/login', request.url)
//         return NextResponse.redirect(loginUrl)
//     }
//
//     return NextResponse.next()
// }
//
// export const config = {
//     matcher: ['/dashboard/:path*', '/profile/:path*'], // Add more as needed
// }
