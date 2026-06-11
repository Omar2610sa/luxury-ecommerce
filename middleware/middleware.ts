import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const guestToken = request.cookies.get('guest_token')?.value

    if (!guestToken) {
        const newToken = uuidv4()
        response.cookies.set('guest_token', newToken, {
            httpOnly: false,     
            path: '/',
            maxAge: 60 * 60 * 24 * 365, // سنة
        })
    }

    return response
}

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'],
}