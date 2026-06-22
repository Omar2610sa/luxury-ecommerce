import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const protectedRoutes = ['/profile', '/CheckOut']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token_luxary')?.value
    const guestToken = request.cookies.get('guest_token')?.value
    const { pathname } = request.nextUrl

    const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    const response = NextResponse.next()

    if (!guestToken) {
        response.cookies.set('guest_token', uuidv4(), {
            path: '/',
        })
    }

    return response
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api).*)'],
}