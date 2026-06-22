"use client"

import Cookies from "js-cookie"
import { v4 as uuidv4 } from "uuid"



const guest_Token = "guest_token"
const auth_Token = "token_luxary"

function ensureGuestTokenClient(): string {
    let guestToken = Cookies.get(guest_Token)

    if (!guestToken) {
        guestToken = uuidv4()
        Cookies.set(guest_Token, guestToken, {
            expires: 365,
            sameSite: "lax",
        })
    }

    return guestToken
}

export async function apiClient<T = unknown>(
    endpoint: string,
    options: Options = {}
): Promise<T> {
    const {
        method = "GET",
        body,
        headers = {},
    } = options

    let token: string | undefined
    let guestToken: string | undefined

    try {
        token = Cookies.get(auth_Token)
        guestToken = ensureGuestTokenClient()
    } catch {
        token = undefined
        guestToken = uuidv4()
    }

    const isFormData = body instanceof FormData  // ضيف دي هنا
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/client/${endpoint}`,
        {
            method,
            cache: "no-store",
            headers: {
                ...(!isFormData ? { "Content-Type": "application/json" } : {}),
                "Accept": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(guestToken ? { "Guest-Token": guestToken } : {}),
                ...headers,
            },
            ...(body ? { body: isFormData ? body : JSON.stringify(body) } : {}),
        }
    )

    return res.json()
}