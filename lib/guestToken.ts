"use server"

import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export async function ensureGuestToken(): Promise<string> {
    const cookieStore = await cookies()

    let guestToken = cookieStore.get("guest_token")?.value

    if (!guestToken) {
        guestToken = uuidv4()
        cookieStore.set("guest_token", guestToken, {
            path: "/",
        })
    }

    return guestToken
}