import { ensureGuestToken } from "@/lib/guestToken"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"



export async function serverApi<T = unknown>(
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
    let guestToken: string | undefined

    try {
        token = cookieStore.get("token_luxary")?.value
        guestToken = await ensureGuestToken()
    } catch {
        token = undefined
        guestToken = uuidv4() 
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/client/${endpoint}`,
        {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(guestToken ? { "Guest-Token": guestToken } : {}),
                ...headers,
            },
            ...(body ? { body: JSON.stringify(body) } : {}),
            ...(next ? { next } : {}),
        }
    )

    return res.json()
}