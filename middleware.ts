import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { routing } from './i18n/routing'
import { cookies } from 'next/headers'

const protectedRoutes = ['/profile', '/CheckOut']

const i18nMiddleware = createMiddleware(routing)
type Lang = 'ar' | 'en'
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Reomove /ar to /
    if (pathname.startsWith(`/ar`)) {
        const segments = pathname.split("/").filter(Boolean);
        const [, ...rest] = segments;
        const cleanedPath = "/" + rest.join("/");
        const url = new URL(cleanedPath, request.url);
        return NextResponse.redirect(url);
    }
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

    const token = request.cookies.get('token_luxary')?.value

    // Set locale at cookies
    const cookiesStore = await cookies()
    cookiesStore.set('NEXT_LOCALE', (cookiesStore.get("NEXT_LOCALE")?.value || (pathname.startsWith(`/en`) ? "en" : 'ar')) as Lang)
    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    const response = i18nMiddleware(request)

    const guestToken = request.cookies.get('guest_token')?.value
    if (!guestToken) {
        response.cookies.set('guest_token', uuidv4())
    }

    return response
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api).*)'],
}