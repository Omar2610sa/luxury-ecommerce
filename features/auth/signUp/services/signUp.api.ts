import { apiClient } from "@/services/useApiClient"

export async function signUpService(payload: SignUpPayload) {
        const getCookie = (name: string) => Cookies.get(name)
    const guestToken = getCookie("guest_token")
    return apiClient<SignUpResponse>("login", {
        method: "POST",
        body: form as unknown as Record<string, unknown>,)
}
