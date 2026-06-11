import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/profile']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token_luxary')?.value
    const { pathname } = request.nextUrl


    const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
    

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api).*)'],
}