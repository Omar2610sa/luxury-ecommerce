import { ensureGuestToken } from "@/lib/guestToken"
import { Options } from "@/types/type"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"



export async function serverApiGeneral<T = unknown>(
    endpoint: string,
    options: Options = {}
): Promise<T> {
    const {
        method = "GET",
        body,
        headers = {},
        next
    } = options

    const cookieStore = await cookies()
    let token: string | undefined
    let Language: string | undefined
    let guestToken: string | undefined
    
    try {
        token = cookieStore.get("token_luxary")?.value
        Language = cookieStore.get("NEXT_LOCALE")?.value 
        guestToken = await ensureGuestToken()
    } catch {
        token = undefined
        guestToken = uuidv4()
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/general/${endpoint}`,
        {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(guestToken ? { "Guest-Token": guestToken } : {}),
                ...(headers ? { "Accept-Language": Language } : {}),
            },
            ...(body ? { body: JSON.stringify(body) } : {}),
            ...(next ? { next } : {}),
        }
    )

    return res.json()
}