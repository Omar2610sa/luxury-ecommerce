"use client"

import { Options } from "@/types/type"
import Cookies from "js-cookie"
import { v4 as uuidv4 } from "uuid"



const guest_Token = "guest_token"
const auth_Token = "token_luxary"
const Language_Token = "NEXT_LOCALE"

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

export async function apiClientGeneral<T = unknown>(
    endpoint: string,
    options: Options = {}
): Promise<T> {
    const {
        method = "GET",
        body,
        headers = {},
    } = options

    let token: string | undefined
    let Language: string | undefined

    let guestToken: string | undefined

    try {
        token = Cookies.get(auth_Token)
        Language = Cookies.get(Language_Token)
        guestToken = ensureGuestTokenClient()
    } catch {
        token = undefined
        guestToken = uuidv4()
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/general/${endpoint}`,
        {
            method,
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(guestToken ? { "Guest-Token": guestToken } : {}),
                ...(headers ? { "Accept-Language": Language } : {}),
            },
            ...(body ? { body: JSON.stringify(body) } : {}),
        }
    )

    return res.json()
}